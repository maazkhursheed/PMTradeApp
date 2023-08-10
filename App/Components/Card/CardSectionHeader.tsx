import * as React from "react";
import { StyleSheet, Text, View, ViewProps, ViewStyle } from "react-native";
import { occludeSensitiveView } from "~root/Lib/DataHelper";
import { Colors, Fonts } from "~root/Themes";

interface Props extends ViewProps {
  text: string;
  containerStyle?: ViewStyle;
}

const CardSectionHeader: React.FunctionComponent<Props> = ({ text, containerStyle, style, ...props }: Props) => {
  return (
    <View style={containerStyle}>
      <Text {...props} style={[styles.text, style]} ref={occludeSensitiveView}>
        {text}
      </Text>
      <View style={[styles.divider, style]} />
    </View>
  );
};

export default CardSectionHeader;

const styles = StyleSheet.create({
  text: {
    ...Fonts.style.openSans14Bold,
    color: Colors.darkGrey,
  },
  divider: {
    marginTop: 18,
    height: 1,
    alignSelf: "stretch",
    backgroundColor: Colors.lightGrey,
  },
});
