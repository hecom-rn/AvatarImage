package cn.hecom.avatar;
import String;
/**
 * Created by kevin.bai on 2019-08-28.
 */
public class Border {
    private int innerBorderWidth;
    private String innerBorderColor;
    private int outerBorderWidth;
    private String[] defOuterBorderColors;
    private String imageBorderColor;
    private int borderSpace;

    public int getInnerBorderWidth() {
        return innerBorderWidth;
    }

    public void setInnerBorderWidth(int innerBorderWidth) {
        this.innerBorderWidth = innerBorderWidth;
    }

    public String getInnerBorderColor() {
        return innerBorderColor;
    }

    public void setInnerBorderColor(String innerBorderColor) {
        this.innerBorderColor = innerBorderColor;
    }

    public int getOuterBorderWidth() {
        return outerBorderWidth;
    }

    public void setOuterBorderWidth(int outerBorderWidth) {
        this.outerBorderWidth = outerBorderWidth;
    }

    public String[] getDefOuterBorderColors() {
        return defOuterBorderColors;
    }

    public void setDefOuterBorderColors(String[] defOuterBorderColors) {
        this.defOuterBorderColors = defOuterBorderColors;
    }

    public String getImageBorderColor() {
        return imageBorderColor;
    }

    public void setImageBorderColor(String imageBorderColor) {
        this.imageBorderColor = imageBorderColor;
    }

    public int getBorderSpace() {
        return borderSpace;
    }

    public void setBorderSpace(int borderSpace) {
        this.borderSpace = borderSpace;
    }
}
