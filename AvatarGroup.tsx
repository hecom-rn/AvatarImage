import React from 'react';
import {Platform} 'react-native';
import {requireNativeComponent, processColor} from 'react-native';

export default class AvatarGroup extends React.Component {
    render() {
        const isIOS = Platform.OS === 'ios';
        if (isIOS) {
            const {style, fillColor, ...other} = this.props;
            return <HEXView style={style} param={{fillColor: processColor(fillColor) , ...other}} />;
        } else {
            return <NativeAvatarGroup {...this.props} />
        }
    }
}
const HEXView = requireNativeComponent('Avatar', AvatarGroup);
const NativeAvatarGroup = requireNativeComponent('Avatar', AvatarGroup);