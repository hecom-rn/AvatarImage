package cn.hecom.avatar;

import com.facebook.react.bridge.ReadableMap;

/**
 * Created by kevin.bai on 2019-08-28.
 */
public class Border {
    private float innerBorderWidth = 1;
    private int innerBorderColor = 0xffffff;
    private float outerBorderWidth = 2;
    private int outerBorderColor = 0xffffff;
    private float borderSpace = 5;

    public float getInnerBorderWidth() {
        return innerBorderWidth;
    }

    public void setInnerBorderWidth(float innerBorderWidth) {
        this.innerBorderWidth = innerBorderWidth;
    }

    public int getInnerBorderColor() {
        return innerBorderColor;
    }

    public void setInnerBorderColor(int innerBorderColor) {
        this.innerBorderColor = innerBorderColor;
    }

    public float getOuterBorderWidth() {
        return outerBorderWidth;
    }

    public void setOuterBorderWidth(float outerBorderWidth) {
        this.outerBorderWidth = outerBorderWidth;
    }

    public int getOuterBorderColor() {
        return outerBorderColor;
    }

    public void setOuterBorderColor(int outerBorderColor) {
        this.outerBorderColor = outerBorderColor;
    }

    public float getBorderSpace() {
        return borderSpace;
    }

    public void setBorderSpace(float borderSpace) {
        this.borderSpace = borderSpace;
    }

    public static Border fromReadableMap(ReadableMap border) {
        Border result = new Border();
        if (border.hasKey("innerBorderWidth")) {
            result.setInnerBorderWidth((float) border.getDouble("innerBorderWidth"));
        }
        if (border.hasKey("innerBorderColor")) {
            result.setInnerBorderColor(border.getInt("innerBorderColor"));
        }
        if (border.hasKey("outerBorderWidth")) {
            result.setOuterBorderWidth((float) border.getDouble("outerBorderWidth"));
        }
        if (border.hasKey("outerBorderColor")) {
            result.setOuterBorderColor(border.getInt("outerBorderColor"));
        }
        if (border.hasKey("borderSpace")) {
            result.setBorderSpace((float) border.getDouble("borderSpace"));
        }
        return result;
    }
}
