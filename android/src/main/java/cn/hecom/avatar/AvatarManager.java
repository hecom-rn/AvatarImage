package cn.hecom.avatar;

import android.graphics.Color;
import android.util.Log;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ReactViewManager;

/**
 * Created by kevin.bai on 2019-08-06.
 */
public class AvatarManager extends ReactViewManager {
    @Override
    public String getName() {
        return "Avatar";
    }

    @Override
    public AvatarGroup createViewInstance(ThemedReactContext reactContext) {
        return new AvatarGroup(reactContext);
    }

    @ReactProp(name = "numberOfSides", defaultInt = 6)
    public void setNumberOfSides(AvatarGroup view, int numberOfSides) {
        view.setNoOfSides(numberOfSides);
    }

    @ReactProp(name = "backColor")
    public void setBackColor(AvatarGroup view, int backColor) {
        view.setBackColor(backColor);
    }

    @ReactProp(name = "radius", defaultFloat = 2f)
    public void setRadius(AvatarGroup view, float raduis) {
        view.setRadius(raduis);
    }

    @ReactProp(name = "sepWidth", defaultFloat = 1f)
    public void setSepWidth(AvatarGroup view, float width) {
        view.setSepWidth(width);
    }

    @ReactProp(name = "rotate", defaultFloat = 90)
    public void setRotate(AvatarGroup view, float rotate) {
        view.setRotate(rotate);
    }

    @ReactProp(name = "borderEnable", defaultBoolean = false)
    public void setBorderEnable(AvatarGroup view, boolean useBorder){
        view.useBorder(useBorder);
    }
    @ReactProp(name = "border")
    public void setBorderProps(AvatarGroup view, ReadableMap border) {
        view.setBorder(Border.fromReadableMap(border));
    }
}
