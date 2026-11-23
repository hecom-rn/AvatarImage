import React from 'react';
import {View} from 'react-native';
import {renderGroupIcon, renderSixCornerImage, renderSixCornerText} from './RenderUtil';
import {getTextStyle} from './util';
import type AvatarImage from './index';

/**
 * HarmonyOS：没有原生 AvatarGroup 组件，用 react-native-svg 绘制正六边形头像。
 * 注意 react-native-svg 的 <Image> 只能绘制静态位图，GIF / 动态 WebP 不会动画。
 */
export default function renderAvatarImage(component: AvatarImage) {
    const {size, style, borderEnable, getThumbUrl = component.getThumbUrl} = component.props;
    const {users} = component.state;
    const isGroup = users.length > 1;
    const {fontSize} = getTextStyle(size, users.length, 0);

    // 外层 View 统一承接调用方传入的 style（如 marginLeft/marginTop），
    // 与 Android/iOS 路径（AvatarRenderer.tsx 把 style 透传给 AvatarGroup）保持一致，
    // 否则鸿蒙上调用方的定位样式全部失效（bug 71273607：评论头像太靠左）。
    const wrapWithStyle = (element: React.ReactElement) => (
        <View style={[{width: size, height: size}, style]}>{element}</View>
    );

    if (isGroup) {
        return wrapWithStyle(renderGroupIcon(users, size, fontSize, 4, borderEnable, size / 8));
    } else if (users?.[0]?.avatar) {
        return wrapWithStyle(
            renderSixCornerImage(getThumbUrl(users[0].avatar), size, 4, borderEnable, size / 8)
        );
    } else if (users?.[0]) {
        return wrapWithStyle(
            renderSixCornerText(users[0], size, fontSize, 4, borderEnable, size / 8)
        );
    } else {
        return <View />;
    }
}
