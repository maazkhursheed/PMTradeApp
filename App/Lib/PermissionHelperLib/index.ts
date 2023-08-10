import * as R from "ramda";
import { Alert, Linking, Platform } from "react-native";
import RNPermissions, { checkMultiple, openSettings, PERMISSIONS, requestMultiple, RESULTS } from "react-native-permissions";
import UXCam from "react-native-ux-cam";
import AppConfig from "~root/Config/AppConfig";
import { bindToArray } from "~root/Lib/CommonHelper";
import { hasCreditLimitAPI } from "~root/Lib/ManageTeamHelper";
import { AvailablePermissionType, PermissionTypes } from "~root/Types/Permissions";

export const DATE_FORMAT_HYBRIS = "YYYY-MM-DD";

/**
 * Decide weather the view should be hidden in the Permission Container or not
 * @param permission Has the given permission or not?
 * @param shouldHide Should hide the view or not?
 * @return boolean
 */

export const shouldHideView: (permission: boolean | undefined, shouldHide: boolean | undefined) => boolean = (permission, shouldHide) =>
  !permission && !!shouldHide;

/*
Helper function for checkPermission only. Mentioned below
 */
const hasUid = R.curry((uid, list) => R.compose(R.complement(R.isNil), R.find(R.propEq("uid", uid)))(list));
/**
 * Check if user permission with the param uid exist in the data model.
 *
 *  @param data Data response for Permission API
 *  @param uid Permission group identifier
 *  @return boolean
 */
export const checkPermission = R.curry((data: any, uid: string) =>
  R.compose(
    R.ifElse(
      R.compose(
        // Check if data object has uid for Owner or Admin.
        R.any(R.equals(true)),
        R.juxt([hasUid(PermissionTypes.AccountOwner), hasUid(PermissionTypes.UserAdmin)]),
      ),
      R.T, // Always true for any value for Admin and Owner accounts.
      hasUid(uid), // Check for individual uid in data object
    ),
    R.prop("permissionList"),
  )(data),
);

/**
 * Check if any of permission in the list is present or not
 *
 * @param permissions List of permissions to check into
 * @param availablePermissions Variable from state where all the permissions are stored
 * @return boolean
 */

const getPermission = data => R.curry((permissions, permission) => R.complement(R.equals(false))(permissions[permission]))(data || "");

export const hasPermissionFromArray = R.curry((permissions: PermissionTypes[] | PermissionTypes, availablePermissions: AvailablePermissionType) =>
  R.ifElse(R.compose(R.equals("Array"), R.type), R.any(getPermission(availablePermissions)), getPermission(availablePermissions))(permissions),
);

/**
 * transformation Of Permissions to available in Immutable state for the app process
 * @param data Api response from Get Permissions API
 */

export const transformResponseToAvailablePermission = (data: any) =>
  R.compose(
    R.fromPairs,
    // @ts-ignore
    R.map(key =>
      R.compose(
        bindToArray(key),
        R.cond([
          [R.equals(PermissionTypes.TemporaryAccess), R.always(R.ifElse(R.propEq("temporaryAccess", true), R.pick(["endDate", "startDate"]), R.F)(data))],
          [R.equals(PermissionTypes.CreditLimit), R.always(R.ifElse(hasCreditLimitAPI, R.prop("creditLimit"), R.F)(data))],
          [R.T, checkPermission(data)],
        ]),
      )(key),
    ),
    R.values,
  )(PermissionTypes);

export const onCameraPermission = async () => {
  const permission = Platform.select({
    ios: [PERMISSIONS.IOS.CAMERA],
    android: [PERMISSIONS.ANDROID.CAMERA],
  });

  const checkerFunction = R.ifElse(R.isNil, R.always([]), R.values);
  const grantedFunction = R.all(R.either(R.equals(RESULTS.GRANTED), R.equals(RESULTS.UNAVAILABLE)));
  const checkBlockerFunction = R.any(R.equals(RESULTS.BLOCKED));

  const permissionResults = checkerFunction(await checkMultiple(permission));

  return new Promise((resolve, reject) => {
    if (grantedFunction(permissionResults)) {
      return resolve();
    } else {
      UXCam.setAutomaticScreenNameTagging(false);
      Alert.alert(
        "Permission to use camera",
        "We need your permission to use your camera phone",
        [
          {
            text: "OK",
            onPress: () => {
              if (checkBlockerFunction(permissionResults)) {
                openSettings();
                reject();
              } else {
                requestMultiple(permission)
                  .then(result => {
                    const requestedPermissions = checkerFunction(result);
                    if (grantedFunction(requestedPermissions)) {
                      resolve();
                    } else {
                      reject();
                    }
                  })
                  .then(() => {
                    resolve();
                  });
              }
            },
          },
          {
            text: "Cancel",
            onPress: reject,
          },
        ],
        {
          cancelable: false,
        },
      );
    }
  });
};

export const getLocationPermission = async () => {
  const locationPermissions = Platform.select({
    android: [RNPermissions.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
    ios: [RNPermissions.PERMISSIONS.IOS.LOCATION_ALWAYS, RNPermissions.PERMISSIONS.IOS.LOCATION_WHEN_IN_USE],
  });

  if (Platform.OS === "ios") {
    await RNPermissions.requestMultiple(locationPermissions);
  } else {
    const givenPermissions = await RNPermissions.checkMultiple(locationPermissions);
    const allPermission = R.compose(R.all(R.equals(RNPermissions.RESULTS.GRANTED)), R.values)(givenPermissions);

    if (!allPermission && givenPermissions[RNPermissions.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] !== RNPermissions.RESULTS.BLOCKED) {
      UXCam.setAutomaticScreenNameTagging(false);
      Alert.alert(
        "Please allow PlaceMakers to know your location",
        "This app will collect location data to suggest branches closest to you for quickest pickup.",
        [
          {
            text: "OK",
            onPress: async () => {
              if (R.compose(R.any(R.equals(RNPermissions.RESULTS.BLOCKED)), R.values)(givenPermissions)) {
                await RNPermissions.openSettings();
              } else {
                await RNPermissions.requestMultiple(locationPermissions);
              }
            },
          },
          {
            text: "Show privacy policy",
            onPress: () => {
              Linking.openURL(AppConfig.PRIVACY_POLICY_LINK);
              setTimeout(getLocationPermission, 1000);
            },
          },
        ],
        {
          cancelable: false,
        },
      );
    }
  }
};
