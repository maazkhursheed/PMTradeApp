import * as React from "react";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";
import CustomIcon from "~root/Components/CustomIcon";
import NativeWrapper from "~root/Components/NativeWrapper";
import PriceComponent from "~root/Components/PriceComponent";
import { accessibility } from "~root/Lib/DataHelper";
import { Colors } from "~root/Themes";
import styles from "./CartMenuCollapesHeaderStyle";

interface CartMenuCollapesHeaderProps extends ViewProps {
  collapsed: boolean;
  onPressed: (selected: any) => void;
  headerText?: string;
  total?: number;
  cntainerStyle?: ViewStyle;
}
const CartMenuCollapesHeader = ({ collapsed, onPressed, headerText, total, cntainerStyle }: CartMenuCollapesHeaderProps) => {
  return (
    <Animated.View>
      <NativeWrapper style={[styles.collapesHeaderWrapper, cntainerStyle]} onPress={onPressed} {...accessibility("cartMenucollapsNativeWrapper")}>
        <View style={styles.collapesHeaderLeft}>
          <CustomIcon name={"cart"} size={25} color={Colors.darkBlue} />
          <Text style={styles.cartText}>{headerText}</Text>
          <CustomIcon size={12} color={Colors.darkGrey} name={collapsed ? "chevron-down" : "chevron-up"} />
        </View>
        <View style={styles.totalPrizeWraper}>
          <PriceComponent style={[styles.subTotalText]} value={total} {...accessibility("totalPrice")} />
        </View>
      </NativeWrapper>
    </Animated.View>
  );
};

export default CartMenuCollapesHeader;
