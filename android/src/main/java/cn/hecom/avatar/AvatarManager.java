package cn.hecom.avatar;

import android.view.View;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by kevin.bai on 2019-08-06.
 */
public class AvatarManager extends ViewGroupManager<AvatarGroup> {
    @Override
    public String getName() {
        return "Avatar";
    }

    @Override
    public AvatarGroup createViewInstance(ThemedReactContext reactContext) {
        return new AvatarGroup(reactContext);
    }

    @Override
    public void addView(AvatarGroup parent, View child, int index) {
        if (getChildCount(parent) < 4) {
            super.addView(parent, child, index);
        }
    }

    @Override
    public boolean needsCustomLayoutForChildren() {
        return true;
    }

    @ReactProp(name = "numberOfSides", defaultInt = 6)
    public void setNumberOfSides(AvatarGroup view, int numberOfSides) {
        view.setNoOfSides(numberOfSides);
    }

    @ReactProp(name = "radius", defaultInt = 6)
    public void setRadius(AvatarGroup view, int raduis) {
        view.setRadius(raduis);
    }
}
