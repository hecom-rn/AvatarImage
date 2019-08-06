import React from 'react';
import {Image, Text, View} from 'react-native';
import AvatarGroup from './AvatarGroup';

interface User {
    code: number
    name: string
    avatar?: string
}

interface Props {
    uri?: string,
    user: User,
    size: number,
    colors: string[],
    renderAvatar: (user: User) => React.Element;
    getThumbUrl: (url: string) => string;
    renderDefaultAvatar: (user: User) => number;
}

export default class AvatarImage extends React.PureComponent<Props> {
    static defaultProps = {
        colors: ['#3EAAFF', '#47C2E7', '#FD6364', '#FDC63F', '#BEE15D', '#28D9C1', '#FF9D50'],
        size: 48,
    };

    constructor(props) {
        super(props);
    }

    getThumbUrl = (url) => {
        return url;
    };

    renderDefaultAvatar = () => {
        const {user, size, colors, style} = this.props;
        let text;
        if (/[\u4e00-\u9fa5]/.test(user.name)) {
            const matchs = user.name.match(/[\u4e00-\u9fa5]/g);
            text = matchs[matchs.length - 1];
        } else {
            text = user.name.charAt(0);
        }
        return (
            <AvatarGroup style={[{
                height: size,
                width: size,
                borderRadius: size / 2,
                backgroundColor: colors[Number(user.code) % colors.length],
                alignItems: 'center',
                justifyContent: 'center',
            }, style]}>
                <Text style={{color: 'white', fontSize: size * 0.618}}>
                    {text || '?'}
                </Text>
            </AvatarGroup>
        );
    };

    render() {
        const {user, url, getThumbUrl, renderDefaultAvatar, size, style, ...other} = this.props;
        const defStyle = {height: size, width: size, borderRadius: size / 2};
        const uri = url || user.avatar;
        const renderDefault = renderDefaultAvatar || this.renderDefaultAvatar;
        const processThumbUrl = getThumbUrl || this.getThumbUrl;
        if (uri) {
            return (
                <Image
                    source={{uri: processThumbUrl(uri)}}
                    style={[defStyle, style]}
                    {...other}
                />
            );
        } else {
            return renderDefault(user)
        }
    }
}