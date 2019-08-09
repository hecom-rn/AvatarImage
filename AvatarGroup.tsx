import React from 'react';
import { requireNativeComponent, Platform } from 'react-native';

export default class AvatarGroup extends React.Component {
    render() {
        const isIOS = Platform.OS === 'ios';
        if (isIOS) {
            const {style, ...other} = this.props;
            return <NativeAvatarGroup style={style} param={{...other}} />;
        } else {
            return <NativeAvatarGroup {...this.props} />
        }
    }
}
const NativeAvatarGroup = requireNativeComponent('Avatar', AvatarGroup);