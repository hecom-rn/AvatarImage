import {Platform, processColor} from 'react-native';
import type {Border, User} from './index';

export function processBorder(size: number, defOuterBorderColors: string[], border: Border = {}, users: User[]) {
    let color = '#F1F1F1';
    if (users.length === 1 && !users[0].avatar) {
        color = defOuterBorderColors[Number(users[0].code) % defOuterBorderColors.length]
    }
    return {
        innerBorderWidth: 1,
        outerBorderWidth: 2,
        borderSpace: size / 24,
        outerBorderColor: processColor(color),
        innerBorderColor: processColor('#FFF'),
        ...border,
    }
}

export function getTextStyle(size: number, count: number, index: number) {
    let fontSize, paddingLeft = 0, paddingRight = 0, paddingTop = 0, paddingBottom = 0, width, height, top, left,
        right, bottom, fontWeight, position = 'absolute', lineHeight;
    const padding = size / 2 * (1 - Math.sin(Math.PI * 2 / 6));
    if (count === 1) {
        fontSize = size * 5 / 12;
        width = size;
        height = size;
    } else if (count === 2) {
        fontSize = size / 3;
        width = size / 2;
        height = size;
        if (index === 0) {
            paddingLeft = padding;
            left = 0;
        } else {
            paddingRight = padding;
            right = 0;
        }
    } else if (count === 3) {
        fontWeight = 'bold';
        fontSize = size * 10 / 35;
        if (index === 0) {
            width = size / 2;
            height = size * 0.75;
            left = 0;
            paddingLeft = padding
        } else if (index === 1) {
            width = size / 2;
            height = size * 0.75;
            right = 0;
            paddingRight = padding
        } else {
            width = size;
            height = size / 2;
            bottom = 0;
        }
    } else {
        fontWeight = 'bold';
        fontSize = size * 10 / 40;
        width = size / 2;
        height = size / 2;
        if (index % 2 === 0) {
            paddingLeft = padding;
            left = 0;
        } else {
            paddingRight = padding;
            right = 0;
        }
        if (index < 2) {
            paddingTop = size / 8;
            lineHeight = size / 3;
            top = 0;
        } else {
            paddingBottom = size / 8;
            lineHeight = size / 3;
            bottom = 0;
        }
    }
    lineHeight = Platform.OS === 'ios' ? lineHeight || height : undefined;
    return {
        position,
        fontWeight,
        fontSize,
        paddingRight,
        paddingLeft,
        paddingTop,
        paddingBottom,
        width,
        height,
        lineHeight,
        top,
        left,
        bottom,
        right
    }
}
