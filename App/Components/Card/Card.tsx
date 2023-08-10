import * as React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { Colors } from "~root/Themes";

interface Props extends ViewProps {
  children?: any;
}

const Card: React.FunctionComponent<Props> = ({ children, style, ...props }: Props) => {
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginBottom: 8,
  },
  padded: {
    paddingLeft: 18,
  },
});
