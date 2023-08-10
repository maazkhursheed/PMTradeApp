import * as React from "react";
import { Switch, SwitchProps } from "react-native-switch";
import { accessibility } from "~root/Lib/DataHelper";
import { Colors } from "~root/Themes";

const SwitchComponent: React.SFC<Props> = ({ testID, ...props }: SwitchProps) => {
  return (
    <Switch
      circleSize={22}
      barHeight={28}
      backgroundActive={Colors.lightBlue}
      backgroundInactive={Colors.lightGrey}
      circleActiveColor={Colors.white}
      circleInActiveColor={Colors.white}
      circleBorderActiveColor={Colors.transparent}
      circleBorderInactiveColor={Colors.transparent}
      changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
      switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
      switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
      switchWidthMultiplier={2.3} // multiplied by the `circleSize` prop to calculate total width of the Switch
      switchBorderRadius={24} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
      renderActiveText={false}
      renderInActiveText={false}
      {...accessibility(testID)}
      {...props}
    />
  );
};

export default SwitchComponent;
