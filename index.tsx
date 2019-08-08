import React from 'react';
import {Image, Text, View} from 'react-native';
import AvatarGroup from './AvatarGroup';

interface User {
    code: number
    name: string
    avatar?: string
}

interface Props {
    users: User[],
    size: number,
    colors: string[],
    renderAvatar: (user: User) => React.Element;
    getThumbUrl: (url: string) => string;
    radius: number,
    numberOfSides: number
}

export default class AvatarImage extends React.PureComponent<Props> {
    static defaultProps = {
        colors: ['#3EAAFF', '#47C2E7', '#FD6364', '#FDC63F', '#BEE15D', '#28D9C1', '#FF9D50'],
        size: 48,
        radius: 6,
        numberOfSides: 6
    };

    constructor(props) {
        super(props);
    }

    getThumbUrl = (url) => {
        return url;
    };

    renderDefaultAvatar = (user) => {
        const {users, size, colors, getThumbUrl = this.getThumbUrl} = this.props;
        if (user.avatar) {
            return (
                <Image source={{uri: getThumbUrl(user.avatar)}} />
            );
        } else {
            let text;
            if (/[\u4e00-\u9fa5]/.test(user.name)) {
                const matchs = user.name.match(/[\u4e00-\u9fa5]/g);
                text = matchs[matchs.length - 1];
            } else {
                text = user.name.charAt(0).toUpperCase();
            }
            return (
                <View style={[{
                    backgroundColor: colors[Number(user.code) % colors.length],
                    alignItems: 'center',
                    justifyContent: 'center',
                }]}>
                    <Text style={{color: 'white', fontSize: size / users.length * 0.618}}>
                        {text || '?'}
                    </Text>
                </View>
            );
        }
    };

    render() {
        const {users = [], size, style, renderAvatar = this.renderDefaultAvatar} = this.props;
        return (
            <AvatarGroup {...this.props} style={[{width: size, height: size}, style]}>
                {users.map(user => renderAvatar(user))}
            </AvatarGroup>
        );
    }
}