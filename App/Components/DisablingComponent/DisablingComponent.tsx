import * as React from "react";
import { View, ViewProps } from "react-native";

interface OwnProps {
  isDisabled: boolean;
  children: React.ReactElement;
}

type Props = OwnProps & ViewProps;

const DisablingComponent: React.FC<Props> = ({ isDisabled, style, children, ...remaining }: Props) => (
  <View accessible={false} style={[style, isDisabled ? { opacity: 1 } : null]} {...remaining} pointerEvents={isDisabled ? "none" : "auto"}>
    {children}
  </View>
);

export default DisablingComponent;
