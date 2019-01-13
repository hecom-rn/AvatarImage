import React from 'react';
import { Image } from 'react-native';
import DefaultHeadImage from '@hecom/image-default-head';
import Aliyun from '@hecom/aliyun';

export default class AvatarImage extends React.PureComponent {
    static getAvatarUrl = (user) => {
        if (user.avatar) {
            return {uri: Aliyun.getDefSizeAvatarUrl(user.avatar)};
        } else {
            return DefaultHeadImage.get(user.code);
        }
    };

    render() {
        const {user} = this.props;
        const source = AvatarImage.getAvatarUrl(user);
        return (
            <Image
                defaultSource={DefaultHeadImage.get(user.code)}
                source={source}
                {...this.props}
            />
        );
    }
}