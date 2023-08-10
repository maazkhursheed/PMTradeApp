package com.fbu.placemakerstrade;

import android.os.Build;
import android.view.WindowManager;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Objects;

public class HelperModule extends ReactContextBaseJavaModule {

  public HelperModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @NonNull
  @Override
  public String getName() {
    return "RNHelperModule";
  }

  @ReactMethod
  public void getAPIVersion(Promise promise) {
    promise.resolve(Build.VERSION.SDK_INT);
  }

  @ReactMethod
  public void changeSoftInputMethod(String type) {
    int softInputMethod = 0;
    if (type.equals("resize")) {
      softInputMethod = WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE;
    } else if (type.equals("pan")) {
      softInputMethod = WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN;
    }

    if (softInputMethod != 0) {
      Objects.requireNonNull(getCurrentActivity()).getWindow().setSoftInputMode(softInputMethod);
    }
  }
}
