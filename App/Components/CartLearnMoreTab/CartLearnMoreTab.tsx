import * as React from "react";
import { Text, View, ViewProps } from "react-native";
import CustomIcon from "~root/Components/CustomIcon";
import NativeWrapper from "~root/Components/NativeWrapper";
import { isNotNilOrEmpty } from "~root/Lib/CommonHelper";
import { accessibility } from "~root/Lib/DataHelper";
import styles from "./CartLearnMoreTabStyle";

interface Props {
  title: string;
  subtitle: string;
  onPress: () => void;
  iconName?: any;
  iconColor?: string;
  iconStyle?: ViewProps;
  containerStyle?: ViewProps;
  linkUrlTitle?: string;
  onClickLinkUrl?: () => void;
}

const CartLearnMoreTab = ({ title, subtitle, onPress, iconName, iconColor, iconStyle, containerStyle, linkUrlTitle, onClickLinkUrl }: Props) => (
  <NativeWrapper onPress={onClickLinkUrl} style={[styles.headerRowInstructionsConstrained, containerStyle]} {...accessibility("learn_more_text")}>
    {isNotNilOrEmpty(iconName) && <CustomIcon style={[styles.infoIconConstrained, iconStyle, iconColor ? { color: iconColor } : {}]} name={iconName} />}
    <View style={styles.contentWrapper}>
      {title && <Text style={styles.disclosureTitleText}>{title}</Text>}
      <View style={styles.subTextWrap} {...accessibility("learn_more_text")}>
        {subtitle && (
          <Text style={styles.disclosureSubTitleText}>
            {subtitle}
            {linkUrlTitle && (
              <Text style={styles.linkUrlText} onPress={onClickLinkUrl} {...accessibility("learn_more_text")}>
                {linkUrlTitle}
              </Text>
            )}
          </Text>
        )}
      </View>
    </View>
  </NativeWrapper>
);

export default CartLearnMoreTab;
