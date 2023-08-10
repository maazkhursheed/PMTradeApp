import { Footer, Text } from "native-base";
import * as React from "react";
import { TextStyle, TouchableWithoutFeedback, View, ViewProps, ViewStyle } from "react-native";
import CustomIcon from "~root/Components/CustomIcon";
import { accessibility } from "~root/Lib/DataHelper";
import styles from "./LargeButtonStyle";

export const FooterOrView = ({ isFooter, children, ...props }) => {
  if (isFooter) {
    return <Footer {...props}>{children}</Footer>;
  } else {
    return <View {...props}>{children}</View>;
  }
};

interface OwnProps {
  onPress: any;
  disabled?: boolean;
  btnText: string;
  style?: ViewStyle;
  isFooter?: boolean;
  textStyle?: TextStyle;
  iconColor?: string;
  iconName?: string;
  iconStyle?: ViewProps;
  SVGIcon?: any;
}

type Props = OwnProps;

const LargeButton: React.SFC<Props> = ({ SVGIcon, onPress, disabled, btnText, style, isFooter, textStyle, iconColor, iconStyle, iconName }: Props) => {
  const [active, setActive] = React.useState(false);

  const onPressIn = React.useCallback((event: any) => {
    setActive(true);
  }, []);

  const onPressOut = React.useCallback((event: any) => {
    setActive(false);
  }, []);

  return (
    <FooterOrView isFooter={isFooter} style={[disabled ? styles.bgDisabled : active ? styles.bgActive : styles.bgInActive, { height: 60 }, style]}>
      <TouchableWithoutFeedback
        onPress={!disabled ? onPress : undefined}
        onPressIn={!disabled ? onPressIn : undefined}
        onPressOut={!disabled ? onPressOut : undefined}
        {...accessibility("largeButtonTouchable")}
      >
        <View style={[styles.textContainer, iconName || SVGIcon ? { flexDirection: "row", justifyContent: "center", alignContent: "center" } : {}]}>
          {SVGIcon ? (
            <SVGIcon alignSelf={"center"} />
          ) : (
            iconName && <CustomIcon style={[styles.icon, iconStyle, iconColor ? { color: iconColor } : {}]} name={iconName} />
          )}
          <Text style={[disabled ? styles.btnTextDisabled : styles.btnText, textStyle]}>{btnText}</Text>
        </View>
      </TouchableWithoutFeedback>
    </FooterOrView>
  );
};

export default LargeButton;
