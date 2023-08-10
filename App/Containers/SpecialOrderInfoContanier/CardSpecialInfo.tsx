import { Text } from "native-base";
import React from "react";
import { View } from "react-native";
import CourierGrayIcon from "~root/Images/courierGray/CourierGrayIcon.svg";
import PickupGrayIcon from "~root/Images/pickupGray/PickupGrayIcon.svg";
import { SO2_FIRSTHALF_DEC, SO2_SECONDHALF_DEC, SO2_TITLE } from "~root/Lib/AlertsHelper";
import styles from "./SpecialOrderInfoScreenContainerStyle";
import SpecialOrdertext from "./SpecialOrderText";

interface OwnProps {
  title?: string;
  description?: string;
  showMultipleIcons?: boolean;
  ImageSource?: any;
  showSpecialText?: boolean;
}

const CardSpecialInfo = ({ title, description, showMultipleIcons, ImageSource, showSpecialText }: OwnProps) => {
  return (
    <View style={styles.card}>
      <Text style={[styles.cardHeader, styles.headerCardText]}>{title}</Text>
      <View style={styles.cardChild}>
        <View style={[styles.column, { alignItems: "center" }]}>
          <ImageSource marginRight={8} />
          {showMultipleIcons && (
            <>
              <PickupGrayIcon marginRight={8} marginTop={5} />
              <CourierGrayIcon marginRight={8} marginTop={15} />
            </>
          )}
        </View>
        <View style={[styles.column, { flex: 1 }]}>
          {title === SO2_TITLE ? (
            <Text style={styles.textCardStyle}>
              {SO2_FIRSTHALF_DEC}
              <Text style={styles.textCardStyleBold}>not pay</Text>
              {SO2_SECONDHALF_DEC}
            </Text>
          ) : (
            <Text style={styles.textCardStyle}>{description}</Text>
          )}
          {showSpecialText && (
            <>
              <SpecialOrdertext infoSource={true} />
              <SpecialOrdertext infoSource={false} />
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default CardSpecialInfo;
