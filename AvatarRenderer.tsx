import React from 'react';
import AvatarGroup from './AvatarGroup';
import {processBorder} from './util';
import type AvatarImage from './index';

/**
 * Android / iOS：原生 AvatarGroup 组件绘制正六边形与边框，子元素为 RN Image / Text。
 * 图片加载走 RN Image（Fresco / RCTImageLoader），GIF、动态 WebP 均可正常显示。
 */
export default function renderAvatarImage(component: AvatarImage) {
    const {size, style, renderAvatar = component.renderDefaultAvatar, defOuterBorderColors, border} = component.props;
    const {users, radius} = component.state;
    const isGroup = users.length > 1;
    return (
        <AvatarGroup
            {...component.props}
            key={users.map(user => user.name).join('')}
            radius={radius}
            border={processBorder(size, defOuterBorderColors, border, users)}
            style={[{width: size, height: size}, style]}
        >
            {users.map(renderAvatar.bind(component, isGroup))}
        </AvatarGroup>
    );
}
