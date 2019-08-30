import React from 'react';
import {Image, ImageBackground, Platform, processColor, StyleSheet, Text, View} from 'react-native';
import AvatarGroup from './AvatarGroup';

export interface User {
    code: number
    name: string
    avatar?: string
}

export interface Border {
    innerBorderWidth?: number
    innerBorderColor?: string
    outerBorderWidth?: number
    outerBorderColor?: string
    borderSpace?: number
}

export interface Props {
    /**
     * 员工，如果users有值则无效
     */
    user: User
    /**
     * 群头像员工列表，优先于user属性
     */
    users: User[]
    /**
     * 视图大小，正六边形的直径
     */
    size: number
    /**
     * 圆角大小
     */
    radius: number
    /**
     * 分隔线宽度
     */
    sepWidth: number
    /**
     * 默认头像背景色
     */
    colors: string[]
    defOuterBorderColors: string[]
    /**
     * 自定义头像绘制方法
     * @param {User} user
     * @returns {React.Element}
     */
    renderAvatar: (user: User) => React.Element
    /**
     * 缩略图
     * @param {string} url
     * @returns {string}
     */
    getThumbUrl: (url: string) => string
    /**
     * 正多边形边数，默认6
     */
    numberOfSides: number
    /**
     * 是否使用边框
     */
    borderEnable: boolean
    border?: Border
}

export default class AvatarImage extends React.PureComponent<Props> {
    static defaultProps = {
        colors: ['#3EAAFF', '#47C2E7', '#FD6364', '#FDC63F', '#BEE15D', '#28D9C1', '#FF9D50'],
        defOuterBorderColors: ['#CBE7FF', '#DAF6FF', '#FFE1E1', '#FCF1D8', '#E6F5BE', '#D3F9F4', '#FFE4CD'],
        size: 48,
        sepWidth: 1,
        color: '#FF9D50',
        users: [],
        numberOfSides: 6,
        rotate: 90,
        borderEnable: false,
    };

    static getDerivedStateFromProps(nextProp) {
        return AvatarImage.convertProp(nextProp);
    }

    static convertProp({users, user, size, radius}) {
        let stateUsers;
        if (users.length === 0 && user) {
            stateUsers = [user];
        } else if (users.length > 4) {
            stateUsers = [...users];
            stateUsers.length = 4;
        } else {
            stateUsers = users;
        }
        return {users: stateUsers, radius: radius || size / 12};
    }

    static processBorder(size, defOuterBorderColors, border: Border = {}, users) {
        let color = '#F1F1F1';
        if (users.length === 1 && !users[0].avatar) {
            color = defOuterBorderColors[Number(users[0].code) % defOuterBorderColors.length]
        }
        return {
            innerBorderWidth: 1,
            outerBorderWidth: 2,
            borderSpace: size / 24,
            outerBorderColor: processColor(color),
            innerBorderColor: processColor('#FFF'),
            ...border,
        }
    }

    constructor(props) {
        super(props);
        this.state = AvatarImage.convertProp(props)
    }

    getThumbUrl = (url) => {
        return url;
    };

    getUserText = (user) => {
        let text;
        if (/[\u4e00-\u9fa5]/.test(user.name)) {
            const matchs = user.name.match(/[\u4e00-\u9fa5]/g);
            text = matchs[matchs.length - 1];
        } else {
            text = user.name.charAt(0).toUpperCase();
        }
        return text || '?';
    };

    renderDefaultAvatar = (user, index) => {
        const {size, colors, getThumbUrl = this.getThumbUrl} = this.props;
        const {users} = this.state;
        if (user.avatar) {
            const {fontWeight, fontSize, lineHeight, ...others} = AvatarImage.getTextStyle(size, users.length, index);
            return (
                <Image 
                    key={index} 
                    style={others} 
                    source={{uri: getThumbUrl(user.avatar)}} 
                    defaultSource={require('./image/Placeholder.png')}
                />
            );
        } else {
            return (
                <Text key={index} style={[{
                    color: 'white',
                    backgroundColor: colors[Number(user.code) % colors.length],
                    textAlign: 'center',
                    textAlignVertical: 'center',
                }, AvatarImage.getTextStyle(size, users.length, index)]}>
                    {this.getUserText(user)}
                </Text>
            );
        }
    };

    static getTextStyle(size, count, index) {
        let fontSize, paddingLeft = 0, paddingRight = 0, paddingTop = 0, paddingBottom = 0, width, height, top, left,
            right, bottom, fontWeight, position = 'absolute', lineHeight;
        const padding = size / 2 * (1 - Math.sin(Math.PI * 2 / 6));
        if (count === 1) {
            fontSize = size / 3;
            fontWeight = 'bold';
            width = size;
            height = size;
        } else if (count === 2) {
            fontSize = size / 3;
            width = size / 2;
            height = size;
            if (index === 0) {
                paddingLeft = padding;
                left = 0;
            } else {
                paddingRight = padding;
                right = 0;
            }
        } else if (count === 3) {
            fontWeight = 'bold';
            fontSize = size * 10 / 48;
            if (index === 0) {
                width = size / 2;
                height = size * 0.75;
                left = 0;
                paddingLeft = padding
            } else if (index === 1) {
                width = size / 2;
                height = size * 0.75;
                right = 0;
                paddingRight = padding
            } else {
                width = size;
                height = size / 2;
                bottom = 0;
            }
        } else {
            fontWeight = 'bold';
            fontSize = size * 10 / 48;
            width = size / 2;
            height = size / 2;
            if (index % 2 === 0) {
                paddingLeft = padding;
                left = 0;
            } else {
                paddingRight = padding;
                right = 0;
            }
            if (index < 2) {
                paddingTop = size / 8;
                lineHeight = size / 3;
                top = 0;
            } else {
                paddingBottom = size / 8;
                lineHeight = size / 3;
                bottom = 0;
            }
        }
        lineHeight = Platform.OS === 'ios' ? lineHeight || height : undefined;
        return {
            position,
            fontWeight,
            fontSize,
            paddingRight,
            paddingLeft,
            paddingTop,
            paddingBottom,
            width,
            height,
            lineHeight,
            top,
            left,
            bottom,
            right
        }
    }

    render() {
        const {size, style, renderAvatar = this.renderDefaultAvatar, defOuterBorderColors, border} = this.props;
        const {users, radius} = this.state;
        return (
            <AvatarGroup
                {...this.props}
                radius={radius}
                border={AvatarImage.processBorder(size, defOuterBorderColors, border, users)}
                style={[{width: size, height: size}, style]}
            >
                {users.map(renderAvatar)}
            </AvatarGroup>
        );
    }
}