package cn.hecom.avatar;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.Path;
import android.support.annotation.NonNull;
import android.view.View;

import com.github.florent37.shapeofview.ShapeOfView;
import com.github.florent37.shapeofview.manager.ClipPathManager;

public class AvatarGroup extends ShapeOfView {

    private int numberOfSides = 6;
    private int radius = 6;
    private int width;
    private int height;
    private Paint sepPaint;

    public AvatarGroup(@NonNull Context context) {
        super(context);
        init();
    }

    private void init() {
        sepPaint = new Paint();
        sepPaint.setColor(Color.WHITE);
        sepPaint.setStrokeWidth(radius);
        super.setClipPathCreator(new ClipPathManager.ClipPathCreator() {
            @Override
            public Path createClipPath(int width, int height) {

                final float section = (float) (2.0 * Math.PI / numberOfSides);
                final int polygonSize = Math.min(width, height);
                final int radius = polygonSize / 2;
                final int centerX = width / 2;
                final int centerY = height / 2;

                final Path polygonPath = new Path();
                polygonPath.moveTo((centerX + radius * (float) Math.cos(0)), (centerY + radius * (float) Math.sin(0)));

                for (int i = 1; i < numberOfSides; i++) {
                    polygonPath.lineTo((centerX + radius * (float) Math.cos(section * i)),
                            (centerY + radius * (float) Math.sin(section * i)));
                }

                polygonPath.close();
                Matrix matrix = new Matrix();
                matrix.postRotate(90, centerX, centerY);
                polygonPath.transform(matrix);
                return polygonPath;
            }

            @Override
            public boolean requiresBitmap() {
                return true;
            }
        });
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        width = MeasureSpec.getSize(widthMeasureSpec);
        height = MeasureSpec.getSize(heightMeasureSpec);
        int count = getChildCount();
        if (count == 2) {
            measureChildren(MeasureSpec.makeMeasureSpec(width / 2, MeasureSpec.EXACTLY), heightMeasureSpec);
        } else if (count == 3) {
            measureChild(getChildAt(0), MeasureSpec.makeMeasureSpec(width / 2, MeasureSpec.EXACTLY),
                    MeasureSpec.makeMeasureSpec(height - getSubHeight(width, height), MeasureSpec.EXACTLY));
            measureChild(getChildAt(1), MeasureSpec.makeMeasureSpec(width / 2, MeasureSpec.EXACTLY),
                    MeasureSpec.makeMeasureSpec(height - getSubHeight(width, height), MeasureSpec.EXACTLY));
            measureChild(getChildAt(2), widthMeasureSpec,
                    MeasureSpec.makeMeasureSpec(height / 2, MeasureSpec.EXACTLY));
        } else if (count == 4) {
            measureChildren(MeasureSpec.makeMeasureSpec(width / 2, MeasureSpec.EXACTLY), MeasureSpec
                    .makeMeasureSpec(height / 2, MeasureSpec.EXACTLY));
        }
    }

    private int getSubHeight(int width, int height) {
        final float section = (float) (2.0 * Math.PI / numberOfSides);
        final int radius = Math.min(width, height) / 2;
        return (int) (radius - Math.cos(section) * radius);
    }

    @Override
    protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
        int childrenCount = getChildCount();
        if (childrenCount == 2) {
            getChildAt(0).layout(0, 0, width / 2, height);
            getChildAt(1).layout(width / 2, 0, width, height);
        } else if (childrenCount == 3) {
            getChildAt(0).layout(0, 0, width / 2, height - getSubHeight(width, height));
            getChildAt(1).layout(width / 2, 0, width, height - getSubHeight(width, height));
            getChildAt(2).layout(0, height / 2, width, height);
        } else if (childrenCount == 4) {
            getChildAt(0).layout(0, 0, width / 2, height / 2);
            getChildAt(1).layout(width / 2, 0, width, height / 2);
            getChildAt(2).layout(0, height / 2, width / 2, height);
            getChildAt(3).layout(width / 2, height / 2, width, height);
        } else {
            super.onLayout(changed, left, top, right, bottom);
        }
        if (changed) {
            requiresShapeUpdate();
        }
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
    public void draw(Canvas canvas) {
        super.draw(canvas);
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

    public int getNoOfSides() {
        return numberOfSides;
    }

    public void setNoOfSides(int numberOfSides) {
        this.numberOfSides = numberOfSides;
        requiresShapeUpdate();
    }

    void setRadius(int radius) {
        this.radius = radius;
    }
}