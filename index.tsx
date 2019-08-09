import React from 'react';
import {Image, Platform, processColor, Text, View} from 'react-native';
import AvatarGroup from './AvatarGroup';

export interface User {
    code: number
    name: string
    avatar?: string
}

export interface Props {
    user: User,
    users: User[],
    size: number,
    colors: string[],
    renderAvatar: (user: User) => React.Element;
    getThumbUrl: (url: string) => string;
}

export default class AvatarImage extends React.PureComponent<Props> {
    static defaultProps = {
        colors: ['#3EAAFF', '#47C2E7', '#FD6364', '#FDC63F', '#BEE15D', '#28D9C1', '#FF9D50'],
        size: 48,
        radius: 6,
        users:[],
    };

    constructor(props) {
        super(props);
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

    getFillColor = (user, colors) => {
        return colors[Number(user.code) % colors.length];
    };

    renderDefaultAvatar = (user, index) => {
        const {users, size, colors, getThumbUrl = this.getThumbUrl} = this.props;
        if (user.avatar) {
            return (
                <Image style={this.getTextStyle(size, users.length, index)} source={{uri: getThumbUrl(user.avatar)}} />
            );
        } else {
            return (
                <Text style={[{
                    color: 'white',
                    backgroundColor: colors[Number(user.code) % colors.length],
                    textAlign: 'center',
                    textAlignVertical: 'center',
                }, this.getTextStyle(size, users.length, index)]}>
                    {this.getUserText(user)}
                </Text>
            );
        }
    };

    getTextStyle(size, count, index) {
        let fontSize, paddingLeft, paddingRight, paddingTop, paddingBottom, width, height, top, left, right, bottom,
            position = 'absolute';
        const padding = size / 2 * (1 - Math.sin(Math.PI * 2 / 6));
        if (count === 1) {
            fontSize = size * 0.4;
        } else if (count === 2) {
            fontSize = size * 0.3;
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
            fontSize = size * 0.2;
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
            fontSize = size * 0.15;
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
                top = 0;
            } else {
                paddingBottom = size / 8;
                bottom = 0;
            }
        }
        return {
            position,
            fontSize,
            paddingRight,
            paddingLeft,
            paddingTop,
            paddingBottom,
            width,
            height,
            top,
            left,
            bottom,
            right
        }
    }

    render() {
        const {users, user, size, style, colors, renderAvatar = this.renderDefaultAvatar} = this.props;
        const isIOS = Platform.OS === 'ios';
        if (users.length > 4) {
            users.length = 4;
        }
        if (users.length === 0 && user) {
            users.push(user)
        }
        return isIOS ? (
            <AvatarGroup
                users={
                    users.map(user => {
                        return {
                            name: this.getUserText(user),
                            color: processColor(this.getFillColor(user, colors)),
                            url: this.getThumbUrl(user.avatar)
                        }
                    })
                }
                sideLength={size / 2}
                style={[style]}
            />
        ) : (
            <AvatarGroup {...this.props} style={[{width: size, height: size}, style]}>
                {users.map(renderAvatar)}
            </AvatarGroup>
        );
    }
}