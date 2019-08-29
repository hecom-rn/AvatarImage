package cn.hecom.avatar;

import com.facebook.react.bridge.ReadableMap;

/**
 * Created by kevin.bai on 2019-08-28.
 */
public class Border {
    private float innerBorderWidth = 1;
    private String innerBorderColor = "#FFFFFF";
    private float outerBorderWidth = 2;
    private String outerBorderColor = "#FFFFFF";
    private String imageBorderColor = "#F1F1F1";
    private float borderSpace = 5;

    public float getInnerBorderWidth() {
        return innerBorderWidth;
    }

    public void setInnerBorderWidth(float innerBorderWidth) {
        this.innerBorderWidth = innerBorderWidth;
    }

    public String getInnerBorderColor() {
        return innerBorderColor;
    }

    public void setInnerBorderColor(String innerBorderColor) {
        this.innerBorderColor = innerBorderColor;
    }

    public float getOuterBorderWidth() {
        return outerBorderWidth;
    }

    public void setOuterBorderWidth(float outerBorderWidth) {
        this.outerBorderWidth = outerBorderWidth;
    }

    public String getOuterBorderColor() {
        return outerBorderColor;
    }

    public void setOuterBorderColor(String outerBorderColor) {
        this.outerBorderColor = outerBorderColor;
    }

    public String getImageBorderColor() {
        return imageBorderColor;
    }

    public void setImageBorderColor(String imageBorderColor) {
        this.imageBorderColor = imageBorderColor;
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
            result.setInnerBorderColor(border.getString("innerBorderColor"));
        }
        if (border.hasKey("outerBorderWidth")) {
            result.setOuterBorderWidth((float) border.getDouble("outerBorderWidth"));
        }
        if (border.hasKey("outerBorderColor")) {
            result.setOuterBorderColor(border.getString("outerBorderColor"));
        }
        if (border.hasKey("imageBorderColor")) {
            result.setImageBorderColor(border.getString("imageBorderColor"));
        }
        if (border.hasKey("borderSpace")) {
            result.setBorderSpace((float) border.getDouble("borderSpace"));
        }
        return result;
    }
}
