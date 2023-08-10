import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { isNilOrEmpty } from "~root/Lib/CommonHelper";
import { occludeSensitiveView } from "~root/Lib/DataHelper";
import styles from "./CustomerDetailsContainerStyle";

interface OwnProps {
  userName?: string;
  email?: string;
  address?: string;
  phone?: string;
}

interface LabelProps {
  label: string;
  text?: string;
}

const LabelView = ({ label, text }: LabelProps) => (
  <View style={styles.infoItemView}>
    <Text style={styles.itemLabel}>{label}</Text>
    <Text ref={occludeSensitiveView} style={styles.itemValue}>
      {isNilOrEmpty(text) ? "-" : text}
    </Text>
  </View>
);
/* If empty fields should be replaced with "-" this is approved by PO */
const LabelViews = ({ userName, email, address, phone }: OwnProps) => {
  return (
    <ScrollView style={styles.scrollView}>
      <LabelView label={"Name"} text={userName} />
      <LabelView label={"Address"} text={address} />
      <LabelView label={"Phone"} text={phone} />
      <LabelView label={"Email"} text={email} />
    </ScrollView>
  );
};

export default LabelViews;
