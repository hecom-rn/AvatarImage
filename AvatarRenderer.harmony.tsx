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
    const {size, borderEnable, getThumbUrl = component.getThumbUrl} = component.props;
    const {users} = component.state;
    const isGroup = users.length > 1;
    const {fontSize} = getTextStyle(size, users.length, 0);

    if (isGroup) {
        return renderGroupIcon(users, size, fontSize, 4, borderEnable, size / 8);
    } else if (users?.[0]?.avatar) {
        return renderSixCornerImage(getThumbUrl(users[0].avatar), size, 4, borderEnable, size / 8);
    } else if (users?.[0]) {
        return renderSixCornerText(users[0], size, fontSize, 4, borderEnable, size / 8);
    } else {
        return <View />;
    }
}
