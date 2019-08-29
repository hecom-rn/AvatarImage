package cn.hecom.avatar;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.PointF;
import android.support.annotation.NonNull;
import android.view.View;

import com.facebook.react.views.view.ReactViewGroup;

public class AvatarGroup extends ReactViewGroup {

    private int numberOfSides = 6;
    private float radius = 2;
    /**
     * 顺时针旋转弧度
     */
    private float rotate = 0f;
    private int width;
    private int height;
    private boolean useBorder = false;
    private Border mBorder;
    private boolean needUpdatePath = true;
    /**
     * 头像区域分隔线画笔
     */
    private Paint sepPaint = new Paint();
    private Paint borderPaint = new Paint();
    /**
     * 边框路径
     */
    private Path borderPath = new Path();
    /**
     * 头像区域边界路径
     */
    private Path clipPath = new Path();
    /**
     * 中心点
     */
    private PointF center = new PointF();

    public AvatarGroup(@NonNull Context context) {
        super(context);
        init();
    }

    private void init() {
        sepPaint.setColor(Color.WHITE);
        borderPaint.setStyle(Paint.Style.STROKE);
    }

    protected float dpToPx(float dp) {
        return dp * this.getContext().getResources().getDisplayMetrics().density;
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        width = MeasureSpec.getSize(widthMeasureSpec);
        height = MeasureSpec.getSize(heightMeasureSpec);
        center.set(width / 2f, height / 2f);
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
            path.moveTo(padding, radius * 3 / 2f);
            path.lineTo(width / 2f, radius);
            path.lineTo(width - padding, radius * 3 / 2f);
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
            PathUtil.calculatePath(clipPath, center, numberOfSides, getSize(useBorder), radius, rotate);
            if (useBorder) {
                PathUtil.calculatePath(borderPath, center, numberOfSides, getSize(false), radius, rotate);
            }
            needUpdatePath = false;
        }
        if (useBorder && mBorder != null) {
            drawBorder(canvas);
        }
        canvas.save();
        canvas.clipPath(clipPath);
        super.dispatchDraw(canvas);
        drawSep(canvas);
        canvas.restore();

    }

    private float getSize(boolean useBorder) {
        float offset = useBorder && mBorder != null ? dpToPx((mBorder.getOuterBorderWidth() + mBorder
                .getBorderSpace() + mBorder.getInnerBorderWidth()) * 2) : 0;
        return (Math.min(width, height) - offset) / 2f;
    }

    private void drawBorder(Canvas canvas) {
        borderPaint.setStyle(Paint.Style.FILL);
        borderPaint.setColor(Color.parseColor(mBorder.getOuterBorderColor()));
        borderPaint.setAlpha(52);
        canvas.drawPath(borderPath, borderPaint);

        borderPaint.setStyle(Paint.Style.STROKE);
        borderPaint.setColor(Color.parseColor(mBorder.getOuterBorderColor()));
        borderPaint.setStrokeWidth(dpToPx(mBorder.getOuterBorderWidth()));
        canvas.drawPath(borderPath, borderPaint);

        borderPaint.setStrokeWidth(dpToPx(mBorder.getInnerBorderWidth()));
        borderPaint.setColor(Color.parseColor(mBorder.getInnerBorderColor()));
        canvas.drawPath(clipPath, borderPaint);


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

    void setRotate(float rotate) {
        this.rotate = (float) (rotate / 180 * Math.PI);
        updatePath();
    }

    void setRadius(float radius) {
        this.radius = dpToPx(radius);
        updatePath();
    }

    void setSepWidth(float width) {
        sepPaint.setStrokeWidth(dpToPx(width));
        updatePath();
    }

    void useBorder(boolean useBorder) {
        this.useBorder = useBorder;
        updatePath();
    }

    void setBorder(Border border) {
        this.mBorder = border;
        updatePath();
    }

    private void updatePath() {
        this.needUpdatePath = true;
        postInvalidate();
    }
}