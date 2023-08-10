import { Text } from "native-base";
import React from "react";
import { View, ViewStyle } from "react-native";
import RNUxcam from "react-native-ux-cam";
import { accessibility } from "~root/Lib/DataHelper";
import styles from "./STCHeaderStyles";

interface OwnProps {
  title: string;
  titleStyle?: any;
  leftItem?: React.ReactElement;
  rightItem?: React.ReactElement;
  style?: any;
  headerContainerStyle?: ViewStyle;
  uxCamTitleHide?: boolean;
}

type Props = OwnProps;

const STCHeader: React.SFC<Props> = ({ title, titleStyle, leftItem, rightItem, style, headerContainerStyle, uxCamTitleHide, ...remaining }: Props) => {
  return (
    <View style={[style]} {...remaining}>
      <View style={styles.headerStyle}>
        <View style={styles.viewStyle} />
      </View>
      <View style={[styles.header, headerContainerStyle]}>
        <View style={[styles.items, styles.viewMinWidth]}>{leftItem}</View>
        <Text
          ref={view => {
            if (view && uxCamTitleHide) {
              RNUxcam.occludeSensitiveView(view);
            }
          }}
          style={[styles.headerTitle, titleStyle]}
          {...accessibility("commonHeaderLabel")}
        >
          {title && title.length > 23 ? title.substr(0, 22) + "..." : title}
        </Text>
        <View style={[styles.items, styles.viewMinWidth]}>{rightItem}</View>
      </View>
    </View>
  );
};

export default STCHeader;
