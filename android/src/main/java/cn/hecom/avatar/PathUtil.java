package cn.hecom.avatar;

import android.graphics.Path;
import android.graphics.PointF;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by kevin.bai on 2019-08-28. 计算过程参考{@see <a href="https://www.jianshu.com/p/edbe67f14751">博客</a>}
 */
public class PathUtil {
    public static void calculatePath(Path path, PointF center, int side, float size, float corner, float offset) {
        if (corner > 0) {
            calculatePathWithCorner(path, center, side, size, corner, offset);
        } else {
            calculatePath(path, center, side, size, offset);
        }
    }

    private static void calculatePath(Path path, PointF center, int side, float size, float offset) {
        List<PointF> points = regularPolygonCoordinates(center, side, size, offset);
        path.reset();
        for (int i = 0; i < points.size(); i++) {
            PointF point = points.get(i);
            if (i == 0) {
                path.moveTo(point.x, point.y);
            } else {
                path.lineTo(point.x, point.y);
            }
        }
        path.close();
    }

    private static void calculatePathWithCorner(Path path, PointF center, int side, float size, float corner,
                                                float offset) {
        List<PointF> points = regularPolygonCoordinatesWithRoundedCorner(center, side, size, corner, offset);
        PointF temPoint = null;
        for (int i = 0; i < points.size(); i++) {
            PointF p = points.get(i);
            if (i == 0) {
                path.moveTo(p.x, p.y);
            } else {
                switch (i % 3) {
                    case 0:
                        path.lineTo(p.x, p.y);
                        break;
                    case 1:
                        temPoint = p;
                        break;
                    case 2:
                        path.quadTo(temPoint.x, temPoint.y, p.x, p.y);
                        break;
                }
            }
        }
        path.close();
    }

    private static List<PointF> regularPolygonCoordinatesWithRoundedCorner(PointF center, int side, float radius,
                                                                           float corner, float offset) {
        List<PointF> points = new ArrayList<>();
        double CAB = 2 * Math.PI / side;
        double EC = radius * Math.sin((CAB / 2));
        double AE = radius * Math.cos((CAB / 2));
        double ED = EC - corner;
        double EAD = Math.atan(ED / AE);
        float DAC = (float) (CAB / 2 - EAD);
        float AD = (float) Math.sqrt(Math.pow(AE, 2) + Math.pow(ED, 2));
        for (int i = 0; i < side; i++) {
            float angle = (float) (i * CAB);
            PointF point = vertexCoordinates(center, radius, angle, offset);
            PointF leftPoint = vertexCoordinates(center, AD, angle - DAC, offset);
            PointF rightPoint = vertexCoordinates(center, AD, angle + DAC, offset);
            points.add(leftPoint);
            points.add(point);
            points.add(rightPoint);
        }
        return points;
    }

    private static List<PointF> regularPolygonCoordinates(PointF center, int side, float radius, float offset) {
        List<PointF> points = new ArrayList<>();
        for (int i = 0; i < side; i++) {
            float angle = (float) (i * (360.0f / side) / 180 * Math.PI);
            PointF point = vertexCoordinates(center, radius, angle, offset);
            points.add(point);
        }
        return points;
    }

    private static PointF vertexCoordinates(PointF center, float radius, float angle, float offset) {
        return new PointF(center.x + radius * (float) Math.cos(angle + offset), center.y + radius * (float) Math
                .sin(angle + offset));
    }
}
