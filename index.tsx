import React from 'react';
import {Image, Text} from 'react-native';
import renderAvatarImage from './AvatarRenderer';
import {getTextStyle, processBorder} from './util';

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
    user?: User
    /**
     * 群头像员工列表，优先于user属性
     */
    users?: User[]
    /**
     * 视图大小，正六边形的直径
     */
    size?: number
    /**
     * 圆角大小
     */
    radius?: number
    /**
     * 分隔线宽度
     */
    sepWidth?: number
    /**
     * 默认头像背景色
     */
    colors?: string[]
    defOuterBorderColors?: string[]
    /**
     * 自定义头像绘制方法
     * @param {User} user
     * @returns {React.Element}
     */
    renderAvatar?: (user: User) => React.Element
    /**
     * 缩略图
     * @param {string} url
     * @returns {string}
     */
    getThumbUrl?: (url: string) => string
    /**
     * 正多边形边数，默认6
     */
    numberOfSides?: number
    /**
     * 是否使用边框
     */
    borderEnable?: boolean
    border?: Border

    /**
     * 超过两人的群组是否使用图片
     * 默认false，无论有无头像都直接显示文字
     */
    useAvatarGroup: boolean
}

interface State {
    users: User[]
    radius: number
}

export default class AvatarImage extends React.PureComponent<Props, State> {
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
        useAvatarGroup: false
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

    static processBorder = processBorder;

    state: State;

    constructor(props: Props) {
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
            text = user.name && user.name.charAt(0).toUpperCase();
        }
        return text || '?';
    };

    renderDefaultAvatar = (isGroup, user, index) => {
        const {size, colors, getThumbUrl = this.getThumbUrl, useAvatarGroup} = this.props;
        const {users} = this.state;
        if (user.avatar && ((isGroup && useAvatarGroup) || !isGroup)) {
            const {fontWeight, fontSize, lineHeight, ...others} = AvatarImage.getTextStyle(size, users.length, index);
            return (
                <Image
                    key={index}
                    style={others}
                    source={{uri: getThumbUrl(user.avatar)}}
                    defaultSource={require('./image/Placeholder.png')}
                    backgroundColor={isGroup ? '#999999' : 'transparent'}
                />
            );
        } else {
            return (
                <Text key={index} allowFontScaling={false} style={[{
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

    static getTextStyle = getTextStyle;

    render() {
        return renderAvatarImage(this);
    }
}
