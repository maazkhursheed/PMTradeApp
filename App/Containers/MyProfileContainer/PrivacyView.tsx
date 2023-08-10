import * as React from "react";
import { Linking, Text, View } from "react-native";
import NativeWrapper from "~root/Components/NativeWrapper";
import AppConfig from "~root/Config/AppConfig";
import { accessibility } from "~root/Lib/DataHelper";
import styles from "./MyProfileContainerStyle";

const PrivacyView = () => {
  const callURL = React.useCallback(() => {
    Linking.openURL(AppConfig.PRIVACY_POLICY_LINK);
  }, []);

  return (
    <>
      <View style={styles.item}>
        <NativeWrapper style={styles.accountsView} {...accessibility("privacyPolicyView")} onPress={callURL}>
          <Text style={styles.linkItem}>Privacy Policy</Text>
        </NativeWrapper>
      </View>
    </>
  );
};

export default PrivacyView;
