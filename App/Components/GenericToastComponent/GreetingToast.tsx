import * as React from "react";
import { Text, View, ViewProps } from "react-native";
import { occludeSensitiveView } from "~root/Lib/DataHelper";
import { getInitials } from "~root/Lib/StringHelper";
import styles from "./GenericToastComponentStyle";
interface Props extends ViewProps {
  children?: any;
  internalStateText1?: any;
  toastType?: string;
  getIconType?: any;
  internalStateText2?: string;
}

const GreetingToast: React.SFC<Props> = ({ internalStateText1, internalStateText2 }: Props) => {
  return (
    <View style={styles.base}>
      <View style={styles.iconContainer}>
        <View style={styles.profileBtn}>
          <Text ref={occludeSensitiveView} style={styles.profileBtnTxt}>
            {getInitials(internalStateText2)}
          </Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text ref={occludeSensitiveView} style={styles.text1} numberOfLines={1}>
          {internalStateText1 + internalStateText2}
        </Text>
      </View>
    </View>
  );
};

export default GreetingToast;
