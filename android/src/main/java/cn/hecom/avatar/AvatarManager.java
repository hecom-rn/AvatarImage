package cn.hecom.avatar;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.views.view.ReactViewGroup;
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
    public ReactViewGroup createViewInstance(ThemedReactContext reactContext) {
        return new Group(reactContext);
    }
}
