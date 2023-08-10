import * as React from "react";
import { View } from "react-native";
import CopyRightView from "./CopyRightView";
import styles from "./MyProfileContainerStyle";
import PrivacyView from "./PrivacyView";
import TermsView from "./TermsView";
const MyProfileFooter = () => {
  return (
    <>
      <PrivacyView />
      <View style={styles.smallSeparator} />
      <TermsView />
      <View style={styles.smallSeparator} />
      <CopyRightView />
    </>
  );
};

export default MyProfileFooter;
