package cn.hecom.avatar;

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

    @ReactProp(name = "radius", defaultInt = 2)
    public void setRadius(AvatarGroup view, int raduis) {
        view.setRadius(raduis);
    }

    @ReactProp(name = "sepWidth", defaultInt = 1)
    public void setSepWidth(AvatarGroup view, int width) {
        view.setSepWidth(width);
    }

    @ReactProp(name = "rotate", defaultInt = 90)
    public void setRotate(AvatarGroup view, int rotate) {
        view.setRotate(rotate);
    }

    @ReactProp(name = "borderEnable", defaultBoolean = false)
    public void setBorderEnable(AvatarGroup view, boolean useBorder){
        view.useBorder(useBorder);
    }
    @ReactProp(name = "border")
    public void setBorderProps(AvatarGroup view, ReadableMap border) {
        
    }
}
