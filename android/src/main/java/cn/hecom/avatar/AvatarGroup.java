package cn.hecom.avatar;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.PointF;
import android.graphics.Path;
import android.support.annotation.NonNull;
import android.view.View;

import com.facebook.react.views.view.ReactViewGroup;

public class AvatarGroup extends ReactViewGroup {

    private int numberOfSides = 6;
    private float radius = 2;
    private int rotate = 90;
    private int width;
    private int height;
    private boolean useBorder = false;
    private boolean needUpdatePath = true;
    private Paint sepPaint = new Paint();
    private Path clipPath = new Path();

    public AvatarGroup(@NonNull Context context) {
        super(context);
        init();
    }

    private void init() {
        sepPaint.setColor(Color.WHITE);
    }

    protected float dpToPx(float dp) {
        return dp * this.getContext().getResources().getDisplayMetrics().density;
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        width = MeasureSpec.getSize(widthMeasureSpec);
        height = MeasureSpec.getSize(heightMeasureSpec);
    }

    @Override
    protected boolean drawChild(Canvas canvas, View child, long drawingTime) {
        final int count = getChildCount();
        boolean needProcess = count == 3 && child.equals(getChildAt(2));
        if (needProcess) {
            canvas.save();
            final float section = (float) (2.0 * Math.PI / numberOfSides);
            int radius = height / 2;
            int padding = (int) (radius - Math.sin(section) * radius);
            Path path = new Path();
            path.moveTo(padding, radius * 3 / 2);
            path.lineTo(width / 2, radius);
            path.lineTo(width - padding, radius * 3 / 2);
            path.lineTo(width - padding, height);
            path.lineTo(padding, height);
            path.close();
            canvas.clipPath(path);
        }
        boolean result = super.drawChild(canvas, child, drawingTime);
        if (needProcess) {
            canvas.restore();
        }
        return result;
    }

    @Override
    public void dispatchDraw(Canvas canvas) {
        if (needUpdatePath) {
            final int polygonSize = Math.min(width, height);
            final float size = polygonSize / 2f;
            PointF center = new PointF(width / 2f, height / 2f);
            PathUtil.calculatePath(clipPath, center, numberOfSides, size, radius, (float) (rotate / 180.0 * Math.PI));
            needUpdatePath = false;
        }
        canvas.save();
        canvas.clipPath(clipPath);
        super.dispatchDraw(canvas);
        drawSep(canvas);
        canvas.restore();
    }

    private float getSize() {
        float offset = useBorder
        if (useBorder) {

        } else {

        }
        return (Math.min(width, height) - offset) / 2f;
    }

    private void drawSep(Canvas canvas) {
        int count = getChildCount();
        final int centerX = width / 2;
        final int centerY = height / 2;
        final float section = (float) (2.0 * Math.PI / numberOfSides);
        if (count == 2) {
            canvas.drawLine(centerX, 0, centerX, height, sepPaint);
        } else if (count == 3) {
            canvas.save();
            for (int i = 0; i < 3; i++) {
                canvas.drawLine(centerX, centerY, centerX, 0, sepPaint);
                canvas.rotate(120, centerX, centerY);
            }
            canvas.restore();
        } else if (count == 4) {
            canvas.drawLine(centerX, 0, centerX, height, sepPaint);
            int radius = height / 2;
            int padding = (int) (radius - Math.sin(section) * radius);
            canvas.drawLine(padding, centerY, width - padding, centerY, sepPaint);
        }
    }

    void setNoOfSides(int numberOfSides) {
        this.numberOfSides = numberOfSides;
        updatePath();
    }

    void setRotate(int rotate) {
        this.rotate = rotate;
        updatePath();
    }

    void setRadius(int radius) {
        this.radius = dpToPx(radius);
        updatePath();
    }

    void setSepWidth(int width) {
        sepPaint.setStrokeWidth(dpToPx(width));
        updatePath();
    }

    void useBorder(boolean useBorder) {
        this.useBorder = useBorder;
        updatePath();
    }

    private void updatePath() {
        this.needUpdatePath = true;
        postInvalidate();
    }
}