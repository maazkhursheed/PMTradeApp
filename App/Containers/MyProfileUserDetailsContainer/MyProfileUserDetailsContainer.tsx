import firebase from "@react-native-firebase/app";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import CustomIcon from "~root/Components/CustomIcon";
import SmallHeader from "~root/Components/SmallHeader";
import { logoutError, showAlertMessage } from "~root/Lib/AlertsHelper";
import { getBranchTownRegion } from "~root/Lib/BranchHelper";
import { getLoginAnalyticsObj, getSelectedAccountId, getShortPermissionsString, occludeSensitiveView, returnMemberType } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { formatPhoneNumber, getInitials } from "~root/Lib/StringHelper";
import { RootState } from "~root/Reducers";
import { getEmail, getFullName, getPhoneNumber, LoginActions } from "~root/Reducers/LoginReducers";
import AppThemeContext from "~root/Themes/AppThemeContext";
import styles from "./MyProfileUserDetailsContainerStyle";

const MyProfileUserDetailsContainer = () => {
  const { userName, email, phone, state } = useSelector((stateGet: RootState) => ({
    userName: getFullName(stateGet.login.userData),
    email: getEmail(stateGet.login.userData),
    phone: getPhoneNumber(stateGet.login.userData),
    state: stateGet,
  }));

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { dispatchAlert } = useCustomAlert();
  const sendLogOutAnalytics = useCallback(
    (event: any) => {
      const params = {
        event,
        userId: extractDigitalIdFromJWTPayload(decodeJWTToken(state.login?.tempToken?.idToken)) as string,
        accountId: getSelectedAccountId(state),
        location: state.branchList?.selectedBranch ? getBranchTownRegion(state.branchList?.selectedBranch) : "",
        device_type: Platform.OS,
        delegated_member: returnMemberType(state.permission.availablePermissions),
        delegated_permissions: getShortPermissionsString(state.permission.availablePermissions),
      };
      const eventLogObject = getLoginAnalyticsObj(params);
      firebase.analytics().logEvent(event, eventLogObject);
    },
    [state],
  );

  const onFailureLogout = useCallback(() => {
    showAlertMessage("", logoutError, dispatchAlert);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(
      LoginActions.logoutRequest(undefined, {
        onSuccess: () => {
          navigation.navigate("Dashboard");
          sendLogOutAnalytics("user_logout");
        },
        onFailure: onFailureLogout,
      }),
    );
  }, []);

  return (
    <AppThemeContext.Provider value={"light"}>
      <SmallHeader
        actionItem={<CustomIcon name={"close"} style={styles.close} onPress={() => navigation.goBack()} />}
        title={userName}
        navigation={navigation}
        uxCamTitleHide={true}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.topViewContainer}>
          <Text ref={occludeSensitiveView} style={styles.initials}>
            {getInitials(userName)}
          </Text>
        </View>
        <View style={styles.infoItemView}>
          <Text style={styles.itemLabel}>Name</Text>
          <Text ref={occludeSensitiveView} style={styles.itemValue}>
            {userName}
          </Text>
        </View>
        <View style={styles.subSeparator} />
        <View style={styles.infoItemView}>
          <Text style={styles.itemLabel}>Email</Text>
          <Text ref={occludeSensitiveView} style={styles.itemValue}>
            {email}
          </Text>
        </View>
        <View style={styles.subSeparator} />
        <View style={styles.infoItemView}>
          <Text style={styles.itemLabel}>Phone</Text>
          <Text ref={occludeSensitiveView} style={styles.itemValue}>
            {formatPhoneNumber(phone)}
          </Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.bottomViewContainer}>
          <TouchableOpacity onPress={onLogout}>
            <View style={styles.infoItemView}>
              <Text style={styles.signout}>{"Sign out"}</Text>
            </View>
            <View style={styles.subSeparator} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppThemeContext.Provider>
  );
};

export default MyProfileUserDetailsContainer;
