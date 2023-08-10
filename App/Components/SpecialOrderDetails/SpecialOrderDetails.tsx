import * as React from "react";
import { Text, View } from "react-native";
import NativeWrapper from "~root/Components/NativeWrapper";
import SpecialOrderIcon from "~root/Images/specialOrderCart/specialOrderIcon.svg";
import { accessibility } from "~root/Lib/DataHelper";
import { SPECIAL_ORDER_DESCRIPTION, SPECIAL_ORDER_TITLE } from "../../Lib/AlertsHelper";
import CustomIcon from "../CustomIcon";
import styles from "./SpecialOrderDetailsStyle";

interface Props {
  onPress: () => void;
}

const SpecialOrderDetails = ({ onPress }: Props) => (
  <NativeWrapper onPress={onPress} style={styles.specialOrderContainer} {...accessibility("specialOrder")}>
    <SpecialOrderIcon marginRight={10} />
    <View style={styles.specialOrderTextStyle}>
      <Text style={styles.specialOrderText}>{SPECIAL_ORDER_TITLE}</Text>
      <Text style={styles.specialOrderMessage}>{SPECIAL_ORDER_DESCRIPTION}</Text>
    </View>
    <View {...accessibility("iconDirectionRight")}>
      <CustomIcon style={styles.icon} name={"chevron-right"} />
    </View>
  </NativeWrapper>
);

export default SpecialOrderDetails;
