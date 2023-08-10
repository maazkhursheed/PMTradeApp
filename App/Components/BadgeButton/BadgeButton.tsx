import { Badge, Button } from "native-base";
import * as React from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import FbIcon from "~root/Components/FbIcon";
import { accessibility } from "~root/Lib/DataHelper";
import styles from "./BadgeButtonStyle";

interface Props {
  badgeCount: number;
  icon: string;
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  rightButtonPress?: () => void;
  rightButtonText?: string;
}

const BadgeButton: React.SFC<Props> = ({ style, rightButtonPress, rightButtonText, title, icon, badgeCount, onPress }: Props) => (
  <Button style={[styles.filterContainer, style]} rounded={true} light={true} onPress={onPress} {...accessibility("bottomButton")}>
    <FbIcon {...accessibility("badgeBtn")} style={styles.filterButtonIcon} name={icon} />
    <Text {...accessibility("badgeBtnText")} style={styles.filterButtonText}>
      {title}
    </Text>

    {badgeCount > 0 && (
      <View style={styles.mainView}>
        <Badge style={styles.badgeContainer} primary={true}>
          <Text style={styles.badgeContainerText}>{badgeCount}</Text>
        </Badge>
      </View>
    )}
    {!!rightButtonPress && (
      <TouchableOpacity style={styles.rightButton} onPress={rightButtonPress} {...accessibility("badgeRightButton")}>
        <Text style={styles.rightButtonText}>{rightButtonText}</Text>
      </TouchableOpacity>
    )}
  </Button>
);

export default BadgeButton;
