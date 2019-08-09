import React from 'react';
import { requireNativeComponent, processColor, Platform } from 'react-native';

export default class AvatarGroup extends React.Component {
    render() {
        const isIOS = Platform.OS === 'ios';
        if (isIOS) {
            const {style, fillColor, ...other} = this.props;
            return <NativeAvatarGroup style={style} param={{fillColor: processColor(fillColor) , ...other}} />;
        } else {
            return <NativeAvatarGroup {...this.props} />
        }
    }
}
const NativeAvatarGroup = requireNativeComponent('Avatar', AvatarGroup);