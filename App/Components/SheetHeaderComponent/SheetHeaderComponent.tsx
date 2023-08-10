import { Button } from "native-base";
import * as React from "react";
import { Text } from "react-native";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import styles from "~root/Components/SheetHeaderComponent/SheetHeaderComponentStyle";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { accessibility } from "~root/Lib/DataHelper";
import { Colors } from "~root/Themes";

interface OwnProps {
  title?: string;
  leftPressText?: string;
  rightPressText?: string;
  leftPress?: () => void;
  rightPress?: () => void;
  sheetState?: SheetState;
}

type Props = OwnProps;

const SheetHeaderComponent: React.SFC<Props> = ({ title, sheetState, leftPressText, rightPressText, leftPress, rightPress }: Props) => {
  return (
    <STCHeader
      title={title}
      titleStyle={styles.headerTitleStyle}
      style={[
        styles.headerStyle,
        {
          backgroundColor: sheetState === SheetState.EXPANDED ? Colors.darkBlue : Colors.cloud,
        },
      ]}
      leftItem={
        leftPress && (
          <Button transparent={true} onPress={leftPress} {...accessibility("leftItemBtn")}>
            <Text style={styles.cancelStyle}>{leftPressText}</Text>
          </Button>
        )
      }
      rightItem={
        rightPress && (
          <Button transparent={true} onPress={rightPress} {...accessibility("rightItemBtn")}>
            <Text style={styles.saveStyle}>{rightPressText}</Text>
          </Button>
        )
      }
    />
  );
};
export default SheetHeaderComponent;
