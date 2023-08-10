import { Text } from "native-base";
import React from "react";
import NativeWrapper from "~root/Components/NativeWrapper";
import InfoBoxIcon from "~root/Images/infoBox/InfoBoxIcon.svg";
import InfoGrayIcon from "~root/Images/infoGray/InfoGrayIcon.svg";
import TickCircleIcon from "~root/Images/tickCircle/TickCircleIcon.svg";
import { SPECIAL_ORDER_TITLE } from "../../Lib/AlertsHelper";
import styles from "./SpecialOrderInfoScreenContainerStyle";

interface Props {
  infoSource: any;
  onPress?: () => void;
  style?: any;
}

const SpecialOrdertext = ({ infoSource, onPress, style }: Props) => (
  <NativeWrapper onPress={onPress} style={[styles.specialOrderTextBox, style]}>
    <TickCircleIcon marginRight={5} />
    <Text style={styles.specialOrderText}>{SPECIAL_ORDER_TITLE}</Text>
    {infoSource ? <InfoBoxIcon /> : <InfoGrayIcon />}
  </NativeWrapper>
);

export default SpecialOrdertext;
