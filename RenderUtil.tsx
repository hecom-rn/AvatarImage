import React from 'react';
import {
    ClipPath,
    Svg,
    Path,
    Image as SvgImage,
    Text as SvgText,
    Rect,
    Circle,
    Line,
    G,
    Defs,
} from 'react-native-svg';
import { User } from '@hecom/image-avatar';
import { View } from 'react-native';
import {
    calculatePath,
    regularPolygonCoordinates,
    regularPolygonCoordinatesWithRoundedCorner,
} from './PathUtil';

const BACK_COLOR_ARRAY = [
    '#3EAAFF',
    '#47C2E7',
    '#FD6364',
    '#FDC63F',
    '#BEE15D',
    '#28D9C1',
    '#FF9D50',
];

const OUTER_COLOR_ARRAY = [
    '#CBE7FF',
    '#DAF6FF',
    '#FFE1E1',
    '#FCF1D8',
    '#E6F5BE',
    '#D3F9F4',
    '#FFE4CD',
];

function renderSvgText(x: number, y: number, fontSize: number, value: string) {
    return (
        <SvgText x={x} y={y} textAnchor="middle" fontSize={fontSize} fill={'white'}>
            {value}
        </SvgText>
    );
}

function renderLine(x1: number, y1: number, x2: number, y2: number) {
    return (
        <Line x1={`${x1}`} y1={`${y1}`} x2={`${x2}`} y2={`${y2}`} stroke="white" strokeWidth="1" />
    );
}

function renderRect(color: string, clipPath: string) {
    return <Rect x="0" y="0" width="100%" height="100%" fill={color} clipPath={clipPath} />;
}

function getUserColor(user: User) {
    return BACK_COLOR_ARRAY[Number(user.code) % BACK_COLOR_ARRAY.length];
}

function getBorderColor(users: User[]) {
    let color = '#F1F1F1';
    if (users?.length === 1 && !users?.[0]?.avatar) {
        color = OUTER_COLOR_ARRAY[Number(users[0].code) % OUTER_COLOR_ARRAY.length];
    }
    return color;
}

function getUserText(user: User) {
    let text;
    if (/[\u4e00-\u9fa5]/.test(user.name)) {
        const matchs = user.name.match(/[\u4e00-\u9fa5]/g);
        text = matchs[matchs.length - 1];
    } else {
        text = user.name && user.name.charAt(0).toUpperCase();
    }
    return text || '?';
}

function renderTwoIcon(
    users: User[],
    inSideRadius: number,
    fontSize: number,
    cornerRadius: number,
    hasOuterBorder: boolean,
    outerBorderMargin: number
) {
    if (users.length != 2) {
        return <View />;
    }

    let size = inSideRadius;
    const borderSize = inSideRadius;
    if (hasOuterBorder) {
        size = borderSize - outerBorderMargin;
    }
    const centerX = borderSize / 2;
    const centerY = borderSize / 2;
    const center = { x: centerX, y: centerY };
    const textCenterXMargin = fontSize * 0.6;
    const textCenterYMargin = fontSize * 0.3;

    const pathBorderSixData = calculatePath(center, 6, borderSize / 2, cornerRadius, Math.PI / 6);

    const points = regularPolygonCoordinatesWithRoundedCorner(
        center,
        6,
        size / 2,
        cornerRadius,
        Math.PI / 6
    );

    const path1 = `M ${points[0].x}, ${points[0].y}, Q ${points[1].x}, ${points[1].y}, ${
        points[2].x
    }, ${points[2].y}, L ${points[4].x}, ${
        points[4].y
    },  L ${points[13].x}, ${points[13].y}, L ${
        points[15].x
    }, ${points[15].y},  Q ${points[16].x}, ${points[16].y}, ${points[17].x}, ${points[17].y}, Z`;

    const path2 = `M  ${points[9].x}, ${points[9].y}, Q ${points[10].x}, ${points[10].y}, ${
        points[11].x
    }, ${points[11].y}, L ${points[13].x}, ${
        points[13].y
    },  L ${points[4].x}, ${points[4].y}, L ${
        points[6].x
    }, ${points[6].y},  Q ${points[7].x}, ${points[7].y}, ${points[8].x}, ${points[8].y},  Z`;

    return (
        <Svg width={borderSize} height={borderSize}>
            <ClipPath id="clip1">
                <Path d={path1} />
            </ClipPath>
            <ClipPath id="clip2">
                <Path d={path2} />
            </ClipPath>

            {hasOuterBorder && (
                <Path
                    fill="none"
                    stroke={getBorderColor(users)}
                    strokeWidth={1}
                    d={pathBorderSixData}
                />
            )}
            {renderRect(getUserColor(users[0]), 'url(#clip1)')}
            {renderRect(getUserColor(users[1]), 'url(#clip2)')}
            {renderLine(
                centerX,
                centerY,
                points[4].x,
                points[4].y
            )}
            {renderLine(
                centerX,
                centerY,
                points[13].x ,
                points[13].y
            )}

            {renderSvgText(
                centerX - textCenterXMargin,
                centerY + textCenterYMargin,
                fontSize,
                getUserText(users[0])
            )}
            {renderSvgText(
                centerX + textCenterXMargin,
                centerY + textCenterYMargin,
                fontSize,
                getUserText(users[1])
            )}
        </Svg>
    );
}

function renderThreeIcon(
    users: User[],
    inSideRadius: number,
    fontSize: number,
    cornerRadius: number,
    hasOuterBorder: boolean,
    outerBorderMargin: number
) {
    if (users.length != 3) {
        return <View />;
    }

    let size = inSideRadius;
    const borderSize = inSideRadius;
    if (hasOuterBorder) {
        size = borderSize - outerBorderMargin;
    }
    const centerX = borderSize / 2;
    const centerY = borderSize / 2;
    const center = { x: centerX, y: centerY };
    const textCenterXMargin = fontSize * 0.7;
    const textCenterYUpMargin = fontSize * 0.2;
    const textCenterYDownMargin = fontSize * 1.3;

    const pathBorderSixData = calculatePath(center, 6, borderSize / 2, cornerRadius, Math.PI / 6);
    const pathSixData = calculatePath(center, 6, size / 2, cornerRadius, Math.PI / 6);
    const points = regularPolygonCoordinatesWithRoundedCorner(
        center,
        6,
        size / 2,
        cornerRadius,
        Math.PI / 6
    );

    const path1 = `M ${centerX}, ${centerY} L ${points[1].x}, ${points[1].y}, L ${points[3].x}, ${points[3].y}, Q ${points[4].x}, ${points[4].y}, ${points[5].x}, ${points[5].y} L ${points[7].x}, ${points[7].y} Z`;

    const path2 = `M ${centerX}, ${centerY} L ${points[7].x}, ${points[7].y}, L ${points[9].x}, ${points[9].y}, Q ${points[10].x}, ${points[10].y}, ${points[11].x}, ${points[11].y} L ${points[13].x}, ${points[13].y} Z`;

    const path3 = `M ${centerX}, ${centerY} L ${points[13].x}, ${points[13].y}, L ${points[15].x}, ${points[15].y}, Q ${points[16].x}, ${points[16].y}, ${points[17].x}, ${points[17].y} L ${points[1].x}, ${points[1].y} Z`;
    return (
        <Svg width={borderSize} height={borderSize}>
            <ClipPath id="clip">
                <Path d={pathSixData} />
            </ClipPath>
            <ClipPath id="clip1">
                <Path d={path1} />
            </ClipPath>
            <ClipPath id="clip2">
                <Path d={path2} />
            </ClipPath>
            <ClipPath id="clip3">
                <Path d={path3} />
            </ClipPath>
            {hasOuterBorder && (
                <Path
                    fill="none"
                    stroke={getBorderColor(users)}
                    strokeWidth={1}
                    d={pathBorderSixData}
                />
            )}
            {renderRect(getUserColor(users[0]), 'url(#clip1)')}
            {renderRect(getUserColor(users[1]), 'url(#clip2)')}
            {renderRect(getUserColor(users[2]), 'url(#clip3)')}
            {renderLine(centerX, centerY, points[1].x, points[1].y)}
            {renderLine(centerX, centerY, points[7].x, points[7].y)}
            {renderLine(centerX, centerY, points[13].x, points[13].y)}
            {renderSvgText(
                centerX - textCenterXMargin,
                centerX - textCenterYUpMargin,
                fontSize,
                getUserText(users[0])
            )}
            {renderSvgText(
                centerX + textCenterXMargin,
                centerX - textCenterYUpMargin,
                fontSize,
                getUserText(users[1])
            )}
            {renderSvgText(
                centerX,
                centerX + textCenterYDownMargin,
                fontSize,
                getUserText(users[2])
            )}
        </Svg>
    );
}

function renderFourIcon(
    users: User[],
    inSideRadius: number,
    fontSize: number,
    cornerRadius: number,
    hasOuterBorder: boolean,
    outerBorderMargin: number
) {
    if (users.length != 4) {
        return <View />;
    }

    let size = inSideRadius;
    const borderSize = inSideRadius;
    if (hasOuterBorder) {
        size = borderSize - outerBorderMargin;
    }
    const centerX = borderSize / 2;
    const centerY = borderSize / 2;
    const center = { x: centerX, y: centerY };
    const textCenterXMargin = fontSize * 0.7;
    const textCenterYUpMargin = fontSize * 0.5;
    const textCenterYDownMargin = fontSize * 1.2;

    const pathBorderSixData = calculatePath(center, 6, borderSize / 2, cornerRadius, Math.PI / 6);

    const pathSixData = calculatePath(center, 6, size / 2, cornerRadius, Math.PI / 6);

    const points = regularPolygonCoordinatesWithRoundedCorner(
        center,
        6,
        size / 2,
        cornerRadius,
        Math.PI / 6
    );

    const path1 = `M ${centerX}, ${centerY} L ${(points[0].x + points[17].x) / 2}, ${
        (points[0].y + points[17].y) / 2
    }, L ${points[0].x}, ${points[0].y}, Q ${points[1].x}, ${points[1].y}, ${points[2].x}, ${
        points[2].y
    } L ${points[4].x}, ${points[4].y} Z`;

    const path2 = `M ${centerX}, ${centerY} L ${points[4].x}, ${points[4].y}, L ${points[6].x}, ${points[6].y}, Q ${points[7].x}, ${points[7].y}, ${points[8].x}, ${
        points[8].y
    } L ${(points[8].x + points[9].x) / 2}, ${(points[8].y + points[9].y) / 2} Z`;

    const path3 = `M ${centerX}, ${centerY} L ${(points[8].x + points[9].x) / 2}, ${
        (points[8].y + points[9].y) / 2
    }, L ${points[9].x}, ${points[9].y}, Q ${points[10].x}, ${points[10].y}, ${points[11].x}, ${
        points[11].y
    } L ${points[13].x}, ${points[13].y} Z`;

    const path4 = `M  ${centerX}, ${centerY} L ${points[13].x}, ${points[13].y}, L ${points[15].x}, ${points[15].y}, Q ${points[16].x}, ${points[16].y}, ${points[17].x}, ${
        points[17].y
    } L ${(points[0].x + points[17].x) / 2}, ${(points[0].y + points[17].y) / 2}  Z`;

    return (
        <Svg width={borderSize} height={borderSize}>
            <ClipPath id="clip">
                <Path d={pathSixData} />
            </ClipPath>
            <ClipPath id="clip1">
                <Path d={path1} />
            </ClipPath>
            <ClipPath id="clip2">
                <Path d={path2} />
            </ClipPath>
            <ClipPath id="clip3">
                <Path d={path3} />
            </ClipPath>
            <ClipPath id="clip4">
                <Path d={path4} />
            </ClipPath>

            {hasOuterBorder && (
                <Path
                    fill="none"
                    stroke={getBorderColor(users)}
                    strokeWidth={1}
                    d={pathBorderSixData}
                />
            )}
            {renderRect(getUserColor(users[0]), 'url(#clip1)')}
            {renderRect(getUserColor(users[1]), 'url(#clip2)')}
            {renderRect(getUserColor(users[2]), 'url(#clip3)')}
            {renderRect(getUserColor(users[3]), 'url(#clip4)')}
            {renderLine(centerX, centerY, points[8].x, (points[8].y + points[9].y) / 2)}
            {renderLine(centerX, centerY, points[0].x, (points[0].y + points[17].y) / 2)}
            {renderLine(
                centerX,
                centerY,
                points[4].x,
                points[4].y
            )}
            {renderLine(
                centerX,
                centerY,
                points[13].x ,
                points[13].y
            )}

            {renderSvgText(
                centerX - textCenterXMargin,
                centerY - textCenterYUpMargin,
                fontSize,
                getUserText(users[0])
            )}
            {renderSvgText(
                centerX + textCenterXMargin,
                centerY - textCenterYUpMargin,
                fontSize,
                getUserText(users[1])
            )}
            {renderSvgText(
                centerX - textCenterXMargin,
                centerY + textCenterYDownMargin,
                fontSize,
                getUserText(users[2])
            )}
            {renderSvgText(
                centerX + textCenterXMargin,
                centerY + textCenterYDownMargin,
                fontSize,
                getUserText(users[3])
            )}
        </Svg>
    );
}

export function renderSixCornerText(
    user: User,
    inSideRadius: number,
    fontSize: number,
    cornerRadius: number,
    hasOuterBorder: boolean,
    outerBorderMargin: number
) {
    let size = inSideRadius;
    const borderSize = inSideRadius;
    if (hasOuterBorder) {
        size = borderSize - outerBorderMargin;
    }
    const centerX = borderSize / 2;
    const centerY = borderSize / 2;
    const center = { x: centerX, y: centerY };
    const textCenterXMargin = fontSize;
    const textCenterYMargin = fontSize * 0.35;

    const pathBorderSixData = calculatePath(center, 6, borderSize / 2, cornerRadius, Math.PI / 6);
    const pathSixData = calculatePath(center, 6, size / 2, cornerRadius, Math.PI / 6);

    return (
        <Svg width={borderSize} height={borderSize}>
            <ClipPath id="clip">
                <Path d={pathSixData} />
            </ClipPath>
            {hasOuterBorder && (
                <Path
                    fill="none"
                    stroke={getBorderColor([user])}
                    strokeWidth={1}
                    d={pathBorderSixData}
                />
            )}
            {renderRect(getUserColor(user), 'url(#clip)')}
            {renderSvgText(centerX, centerY + textCenterYMargin, fontSize, getUserText(user))}
        </Svg>
    );
}

export function renderSixCornerImage(
    url,
    inSideRadius: number,
    cornerRadius: number,
    hasOuterBorder: boolean,
    outerBorderMargin: number
) {
    let size = inSideRadius;
    const borderSize = inSideRadius;
    if (hasOuterBorder) {
        size = borderSize - outerBorderMargin;
    }
    const centerX = borderSize / 2;
    const centerY = borderSize / 2;
    const center = { x: centerX, y: centerY };
    const pathBorderSixData = calculatePath(center, 6, borderSize / 2, cornerRadius, Math.PI / 6);

    const pathSixData = calculatePath(center, 6, size / 2, cornerRadius, Math.PI / 6);

    return (
        <Svg height={borderSize} width={borderSize}>
            <ClipPath id="clip">
                <Path d={pathSixData} />
            </ClipPath>
            {hasOuterBorder && (
                <Path
                    fill="none"
                    stroke={getBorderColor(undefined)}
                    strokeWidth={1}
                    d={pathBorderSixData}
                />
            )}
            <SvgImage
                x="0"
                y="0"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
                href={url}
                clipPath="url(#clip)"
            />
        </Svg>
    );
}

export function renderGroupIcon(
    users: User[],
    inSideRadius: number,
    fontSize: number,
    cornerRadius: number,
    hasOuterBorder: boolean,
    outerBorderMargin: number
) {
    if (users?.length === 2) {
        return renderTwoIcon(
            users,
            inSideRadius,
            fontSize,
            cornerRadius,
            hasOuterBorder,
            outerBorderMargin
        );
    } else if (users?.length === 3) {
        return renderThreeIcon(
            users,
            inSideRadius,
            fontSize,
            cornerRadius,
            hasOuterBorder,
            outerBorderMargin
        );
    } else if (users?.length === 4) {
        return renderFourIcon(
            users,
            inSideRadius,
            fontSize,
            cornerRadius,
            hasOuterBorder,
            outerBorderMargin
        );
    } else {
        return <View />;
    }
}
