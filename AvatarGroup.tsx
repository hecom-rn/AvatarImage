import React from 'react';
import { requireNativeComponent } from 'react-native';

export default class AvatarGroup extends React.Component {
    render() {
        return <NativeAvatarGroup {...this.props} />
    }
}
const NativeAvatarGroup = requireNativeComponent('Avatar', AvatarGroup);