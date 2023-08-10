import * as React from "react";
import { Linking, Text, View } from "react-native";
import NativeWrapper from "~root/Components/NativeWrapper";
import AppConfig from "~root/Config/AppConfig";
import { accessibility } from "~root/Lib/DataHelper";
import styles from "./MyProfileContainerStyle";

const TermsView = () => {
  const onPressURL = React.useCallback(() => {
    Linking.openURL(AppConfig.TERMS_TRADE_LINK);
  }, []);

  return (
    <>
      <View style={styles.item}>
        <NativeWrapper style={styles.accountsView} {...accessibility("termsOfTradeView")} onPress={onPressURL}>
          <Text style={styles.linkItem}>Terms of use</Text>
        </NativeWrapper>
      </View>
    </>
  );
};

export default TermsView;
