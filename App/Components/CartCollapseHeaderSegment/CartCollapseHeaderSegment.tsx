import React from "react";
import { Text, View, ViewProps, ViewStyle } from "react-native";
import NativeWrapper from "~root/Components/NativeWrapper";
import styles from "./CartCollapseHeaderSegmentStyles";

interface HeaderSegmentProps extends ViewProps {
  values: any;
  selected: string;
  onSelected: (selected: any) => void;
  selectedButtonStyle?: ViewStyle;
  selectedButtonTextStyle?: ViewStyle;
  unSelectedTextStyle?: ViewStyle;
}
const CartCollapseHeaderSegment = ({
  values,
  selected,
  onSelected,
  style,
  selectedButtonStyle,
  selectedButtonTextStyle,
  unSelectedTextStyle,
}: HeaderSegmentProps) => {
  return (
    <View style={[styles.container, style]}>
      {values?.length > 0 &&
        values.map((val, index) => (
          <>
            {val?.count > 0 && (
              <NativeWrapper
                onPress={() => {
                  onSelected(val?.title);
                }}
                style={[
                  styles.tabViewContainer,
                  val?.title === selected ? styles.selTabView : styles.unSelectedTabView,
                  val?.title === selected && selectedButtonStyle,
                ]}
                key={index}
              >
                <Text
                  suppressHighlighting={true}
                  key={val?.title}
                  style={[
                    val?.title === selected ? styles.selTabViewText : styles.unSelectedTabViewText,
                    val?.title === selected ? selectedButtonTextStyle : unSelectedTextStyle,
                  ]}
                >
                  {`${val?.title} (${val?.count})`}
                </Text>
              </NativeWrapper>
            )}
          </>
        ))}
    </View>
  );
};

export default CartCollapseHeaderSegment;
