import * as React from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import NativeWrapper from "~root/Components/NativeWrapper";
import { accessibility } from "~root/Lib/DataHelper";
import { Fonts } from "../../Themes";
import colors from "../../Themes/Colors";
import styles from "./TruckTypeComponentStyles";
interface Props {
  item: any;
  selected: boolean;
  style?: ViewStyle;
}

const TruckTypeComponent: React.SFC<Props> = ({ item, selected, style }: Props) => (
  <NativeWrapper onPress={item.onPress} style={styles.itemContainer} {...accessibility(item.label)}>
    <View style={[styles.truckInfoContainer, { shadowColor: selected ? "#000" : "#999" }]}>
      <Text style={[styles.labelStyle, selected ? Fonts.style.openSans16Bold : Fonts.style.openSans16Regular]} {...accessibility(item.label)}>
        {item.label}
      </Text>
      <TouchableOpacity
        onPress={item.onPress}
        style={[styles.circle, { borderColor: selected ? colors.lightBlue : colors.grey }]}
        {...accessibility(selected ? "radioBtnSelected" : "radioBtnUnSelected")}
      >
        {selected && <View style={styles.innerCircle} {...accessibility(selected ? "radioBtnSelected" : "radioBtnUnSelected")}></View>}
      </TouchableOpacity>
    </View>
  </NativeWrapper>
);

export default TruckTypeComponent;
