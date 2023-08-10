package com.fbu.placemakerstrade;

import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.os.Handler;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.salesforce.marketingcloud.notifications.NotificationMessage;
import com.newrelic.agent.android.NewRelic;

import java.util.Map;
import java.util.Objects;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "FletcherBuilderTradeApp";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
    new Handler().postDelayed(new Runnable() {
      @Override
      public void run() {
        getWindow().setBackgroundDrawable(new ColorDrawable(Color.WHITE));
        checkIntentAndProcess(getIntent());
      }
    }, 5000);
    NewRelic.withApplicationToken(BuildConfig.NEWRELIC_ANDROID_KEY).start(this.getApplicationContext());
  }

  @Override
  public void onNewIntent(Intent intent) {
    checkIntentAndProcess(intent);
    super.onNewIntent(intent);
  }
  private void checkIntentAndProcess(Intent intent) {
    if (intent.hasExtra("data")) {
      final NotificationMessage message = intent.getParcelableExtra("data");
      final WritableMap map = new WritableNativeMap();
      for (Map.Entry<String, String> entry : Objects.requireNonNull(message.payload()).entrySet()) {
        map.putString(entry.getKey(), entry.getValue());
      }
      ReactContext reactContext = getReactNativeHost().getReactInstanceManager().getCurrentReactContext();
      if (reactContext != null){
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("onNotificationData", map);
      }
    }
  }
}
