package com.fbu.placemakerstrade;

import android.app.Application;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Parcel;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;

import com.dieam.reactnativepushnotification.modules.RNPushNotificationHelper;
import com.evergage.android.ClientConfiguration;
import com.evergage.android.Evergage;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import com.salesforce.marketingcloud.MCLogListener;
import com.salesforce.marketingcloud.MarketingCloudConfig;
import com.salesforce.marketingcloud.MarketingCloudSdk;
import com.salesforce.marketingcloud.notifications.NotificationCustomizationOptions;
import com.salesforce.marketingcloud.notifications.NotificationManager;
import com.salesforce.marketingcloud.notifications.NotificationMessage;
import com.salesforce.marketingcloud.sfmcsdk.SFMCSdk;
import com.salesforce.marketingcloud.sfmcsdk.SFMCSdkModuleConfig;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;
import java.util.Random;

import kotlin.Unit;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      List<ReactPackage> packages = new PackageList(this).getPackages();
      packages.add(new HelperPackage());
      return packages;
    }


    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();

    // Initialize Evergage:
    Evergage.initialize(this);
    Evergage evergage = Evergage.getInstance();
    // Recommended to set the authenticated user's ID as soon as known:
    evergage.setUserId("");
    evergage.setAccountId(BuildConfig.EVERGAGE_ANDROID_APP_ID);

    // Start Evergage with your Evergage Configuration:
    evergage.start(new ClientConfiguration.Builder()
      .account(BuildConfig.EVERGAGE_ACCOUNT_ID)
      .dataset(BuildConfig.EVERGAGE_DATASET)
      .usePushNotifications(true)
      .build());

    if (BuildConfig.DEBUG) {
      MarketingCloudSdk.setLogLevel(MCLogListener.VERBOSE);
      MarketingCloudSdk.setLogListener(new MCLogListener.AndroidLogListener());
    }

    SFMCSdk.configure(this, SFMCSdkModuleConfig.build(builder -> {
      builder.setPushModuleConfig(MarketingCloudConfig.builder() //
        .setApplicationId(BuildConfig.MC_APPLICATION_ID) // SIT App ID from MC
        .setAccessToken(BuildConfig.MC_ACCESS_TOKEN) // SIT Access Token from MC
        .setSenderId(BuildConfig.SENDER_ID) // Firebase ID
        .setDelayRegistrationUntilContactKeyIsSet(true)
        .setMarketingCloudServerUrl(BuildConfig.MC_CLOUD_SERVER_URL)// MC Endpoint
        .setInboxEnabled(true)
        .setAnalyticsEnabled(true)
        // .setGeofencingEnabled(true)
        // ENABLE MARKETING CLOUD FEATURES
        .setNotificationCustomizationOptions(
          NotificationCustomizationOptions.create((context, notificationMessage) -> {
            Intent intent = new Intent(context, MainActivity.class);
            intent.putExtra("data", notificationMessage);
            NotificationCompat.Builder notificationBuilder = NotificationManager.getDefaultNotificationBuilder(
              context,
              notificationMessage,
              NotificationManager.createDefaultNotificationChannel(context),
              R.drawable.logo);
            notificationBuilder.setContentIntent(
              NotificationManager.redirectIntentForAnalytics(context,
                PendingIntent.getActivity(
                  context,
                  new Random().nextInt(),
                  intent,
                  PendingIntent.FLAG_IMMUTABLE
                ), notificationMessage, true)
            );
            return notificationBuilder;
          })
        )
        .build(this));
      return null;
    }), initializationStatus -> {
      Log.d("Initialization Status", initializationStatus.toString());
      return Unit.INSTANCE;
    });

    SFMCSdk.requestSdk(sfmcSdk -> sfmcSdk.mp(pushModuleInterface -> {
      pushModuleInterface.getInboxMessageManager().refreshInbox(b -> Log.v("Inbox Refresh: ", "" + b));
      pushModuleInterface.getNotificationManager().setShouldShowNotificationListener(notificationMessage -> {
        Log.d("Should notification", notificationMessage.toString());
        if (notificationMessage.customKeys().get("NotifyType") != null && notificationMessage.customKeys().get("NotifyType").equals("STC")) {
          Bundle bundle = new Bundle();
          try {
            JSONObject data = new JSONObject();
            data.put("NotifyType", "STC");
            bundle.putString("data", data.toString());
          } catch (JSONException e) {
            e.printStackTrace();
          }


          bundle.putString("id", new Random(System.currentTimeMillis()).nextInt() + "");
          bundle.putBoolean("ignoreInForeground", false);
          bundle.putString("title", notificationMessage.title());
          bundle.putString("message", notificationMessage.alert());
          bundle.putString("smallIcon", "logo");


          new RNPushNotificationHelper((Application) getApplicationContext()).sendToNotificationCentre(bundle);
          return false;
        } else {
          return true;
        }
      });
    }));

    SoLoader.init(this, /* native exopackage */ false);
  }
}
