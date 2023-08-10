/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>

#import <RNCPushNotificationIOS.h>
#import <UserNotifications/UserNotifications.h>
#import <MarketingCloudSDK/MarketingCloudSDK.h>
#import "ReactNativeConfig.h"
#import <NewRelic/NewRelic.h>
#import <Evergage/Evergage.h>
@import Pendo;
@import Firebase;
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  Evergage *evergage = [Evergage sharedInstance];

#ifdef DEBUG
    evergage.logLevel = EVGLogLevelWarn;
#endif

  // Recommended to set the authenticated user's ID as soon as known:
      evergage.userId = @"";
      evergage.accountId = [ReactNativeConfig envFor:@"EVERGAGE_IOS_APP_ID"];

  // Start Evergage with your Evergage Configuration:
      [evergage startWithClientConfiguration:^(EVGClientConfigurationBuilder * _Nonnull builder) {
        builder.account = [ReactNativeConfig envFor:@"EVERGAGE_ACCOUNT_ID"];
        builder.dataset = [ReactNativeConfig envFor:@"EVERGAGE_DATASET"];
          builder.usePushNotifications = YES;
  #ifdef DEBUG
          builder.useDesignMode = YES;
  #endif
      }];


  // Starting Location enablement of MC Salesforce for Geofencing.
  [[MarketingCloudSDK sharedInstance] sfmc_startWatchingLocation];

  if([UIApplication sharedApplication].backgroundRefreshStatus == UIBackgroundRefreshStatusAvailable) {
    [[UIApplication sharedApplication] setMinimumBackgroundFetchInterval:UIApplicationBackgroundFetchIntervalMinimum];
  }

  [NewRelic startWithApplicationToken:[ReactNativeConfig envFor:@"NEWRELIC_IOS_KEY"]];

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"FletcherBuilderTradeApp"
                                            initialProperties:nil];

  // Define UNUserNotificationCenter
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  if (@available(iOS 13, *)) {
      self.window.overrideUserInterfaceStyle = UIUserInterfaceStyleLight;
  }
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  [FIRApp configure];

  // MC With SIT Configuration

  [[MarketingCloudSDK sharedInstance] sfmc_setDebugLoggingEnabled:YES];

  MarketingCloudSDKConfigBuilder *mcsdkBuilder = [MarketingCloudSDKConfigBuilder new];
  [mcsdkBuilder sfmc_setApplicationId:[ReactNativeConfig envFor:@"MC_APPLICATION_ID"]]; // SIT
     [mcsdkBuilder sfmc_setAccessToken:[ReactNativeConfig envFor:@"MC_ACCESS_TOKEN"]]; //SIT
     [mcsdkBuilder sfmc_setAnalyticsEnabled:@(YES)];
     [mcsdkBuilder sfmc_setDelayRegistrationUntilContactKeyIsSet:[NSNumber numberWithInt:1]];
     [mcsdkBuilder sfmc_setMarketingCloudServerUrl:[ReactNativeConfig envFor:@"MC_CLOUD_SERVER_URL"]];
     [mcsdkBuilder sfmc_setLocationEnabled:[NSNumber numberWithInt:1]];
     [mcsdkBuilder sfmc_setInboxEnabled:[NSNumber numberWithInt:1]];
     NSError *error = nil;
     [[MarketingCloudSDK sharedInstance] sfmc_configureWithDictionary:[mcsdkBuilder sfmc_build]
                                                                    error:&error];

  [[MarketingCloudSDK sharedInstance] sfmc_refreshMessages];
  return YES;
}

//Called when a notification is delivered to a foreground app.
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  NSDictionary *userInfo = notification.request.content.userInfo;
   NSMutableDictionary *userInfoCopy = [userInfo mutableCopy];
   userInfoCopy[@"userInteraction"] = @false;
   [RNCPushNotificationIOS didReceiveRemoteNotification:userInfoCopy
                                 fetchCompletionHandler:^void (UIBackgroundFetchResult result){}];
  completionHandler(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge);
}

// Required to register for notifications
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
 [RNCPushNotificationIOS didRegisterUserNotificationSettings:notificationSettings];
}
// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  [[MarketingCloudSDK sharedInstance] sfmc_setDeviceToken:deviceToken];
 [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  NSMutableDictionary *userInfoCopy = [userInfo mutableCopy];
  userInfoCopy[@"userInteraction"] = @true;
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfoCopy fetchCompletionHandler:completionHandler];
}
// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
 [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)(void))completionHandler
{
  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
  // MarketingCloudSDK.sharedInstance().sfmc_setNotificationRequest(response.notification.request)
  MarketingCloudSDK *obj = [MarketingCloudSDK sharedInstance];
  [obj sfmc_setNotificationRequest: response.notification.request];
  completionHandler();
}

-(void)application:(UIApplication *)application performFetchWithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler{
  [[MarketingCloudSDK sharedInstance] sfmc_refreshWithFetchCompletionHandler:completionHandler];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{

  if ([[url scheme] containsString:@"pendo"]) {
          [[PendoManager sharedManager] initWithUrl:url];
          return YES;
  }

  if ([RCTLinkingManager application:app openURL:url options:options]) {
    return YES;
  }

  return NO;
}

@end
