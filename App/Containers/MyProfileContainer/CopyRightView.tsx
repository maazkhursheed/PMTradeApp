import * as React from "react";
import { Text, View } from "react-native";
import VersionInfo from "react-native-version-info";
import styles from "./MyProfileContainerStyle";

const CopyRightView = () => {
  return (
    <>
      <View style={styles.copyrightView}>
        <Text style={styles.copyrightText}>
          PlaceMakers Trade App v{VersionInfo.appVersion} ({VersionInfo.buildVersion})
        </Text>
        <Text style={styles.copyrightText}>Copyright © 2020 PlaceMakers Ltd. All rights reserved</Text>
      </View>
    </>
  );
};

export default CopyRightView;
