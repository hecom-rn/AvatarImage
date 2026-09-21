interface PointF {
    x: number;
    y: number;
}

export function calculatePath(
    center: PointF,
    side: number,
    size: number,
    corner: number,
    offset: number
) {
    if (corner > 0) {
        return calculatePathWithCorner(center, side, size, corner, offset);
    } else {
        return calculatePathWithoutCorner(center, side, size, offset);
    }
}

function calculatePathWithoutCorner(
    center: PointF,
    side: number,
    size: number,
    offset: number
): string {
    const points: Array<PointF> = regularPolygonCoordinates(center, side, size, offset);
    let path: string = '';
    for (let i = 0; i < points.length; i++) {
        const p: PointF = points[i];
        if (i == 0) {
            // path.moveTo(point.x, point.y);
            path = `${path} M ${p.x}, ${p.y} `;
        } else {
            // path.lineTo(point.x, point.y);
            path = `${path} L ${p.x}, ${p.y} `;
        }
    }
    // path.close();
    path = `${path} Z `;

    return path;
}

function calculatePathWithCorner(
    center: PointF,
    side: number,
    size: number,
    corner: number,
    offset: number
): string {
    const points: Array<PointF> = regularPolygonCoordinatesWithRoundedCorner(
        center,
        side,
        size,
        corner,
        offset
    );
    let path: string = '';
    let temPoint: PointF = null;
    for (let i = 0; i < points.length; i++) {
        const p: PointF = points[i];
        if (i == 0) {
            // path.moveTo(p.x, p.y);
            path = `${path} M ${p.x}, ${p.y} `;
        } else {
            switch (i % 3) {
                case 0:
                    // path.lineTo(p.x, p.y);
                    path = `${path} L ${p.x}, ${p.y} `;
                    break;
                case 1:
                    temPoint = p;
                    break;
                case 2:
                    // path.quadTo(temPoint.x, temPoint.y, p.x, p.y);
                    path = `${path} Q ${temPoint.x}, ${temPoint.y}, ${p.x}, ${p.y} `;
                    break;
                default:
                    break;
            }
        }
    }
    // path.close();
    path = `${path} Z `;
    return path;
}

export function regularPolygonCoordinatesWithRoundedCorner(
    center: PointF,
    side: number,
    radius: number,
    corner: number,
    offset: number
): Array<PointF> {
    const points: Array<PointF> = [];
    const CAB = (2 * Math.PI) / side;
    const EC = radius * Math.sin(CAB / 2);
    const AE = radius * Math.cos(CAB / 2);
    const ED = EC - corner;
    const EAD = Math.atan(ED / AE);
    const DAC = CAB / 2 - EAD;
    const AD = Math.sqrt(AE ** 2 + ED ** 2);
    for (let i = 0; i < side; i++) {
        const angle = i * CAB;
        const point = vertexCoordinates(center, radius, angle, offset);
        const leftPoint = vertexCoordinates(center, AD, angle - DAC, offset);
        const rightPoint = vertexCoordinates(center, AD, angle + DAC, offset);
        points.push(leftPoint);
        points.push(point);
        points.push(rightPoint);
    }
    return points;
}

export function regularPolygonCoordinates(
    center: PointF,
    side: number,
    radius: number,
    offset: number
): Array<PointF> {
    const points: Array<PointF> = [];
    for (let i = 0; i < side; i++) {
        const angle = ((i * (360.0 / side)) / 180) * Math.PI;
        const point: PointF = vertexCoordinates(center, radius, angle, offset);
        points.push(point);
    }
    return points;
}

function vertexCoordinates(center: PointF, radius: number, angle: number, offset: number): PointF {
    return {
        x: center.x + radius * Math.cos(angle + offset),
        y: center.y + radius * Math.sin(angle + offset),
    };
}
