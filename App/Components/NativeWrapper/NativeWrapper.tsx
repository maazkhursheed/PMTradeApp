import * as React from "react";
import { Platform, TouchableNativeFeedback, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { accessibility } from "~root/Lib/DataHelper";

interface OwnProps {
  children?: React.ReactElement;
}

type Props = OwnProps & TouchableOpacityProps;

const NativeWrapper: React.SFC<Props> = ({ children, onPress, ...props }: Props) => {
  if (Platform.OS === "ios") {
    return (
      <TouchableOpacity onPress={onPress} {...props} {...accessibility("nativeWrapperIOSTouchable")}>
        {children}
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableNativeFeedback onPress={onPress} disabled={props.disabled} {...accessibility("nativeWrapperTouchable")}>
        <View {...props}>{children}</View>
      </TouchableNativeFeedback>
    );
  }
};

export default NativeWrapper;
