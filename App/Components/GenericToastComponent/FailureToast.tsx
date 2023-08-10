import * as React from "react";
import { Text, View, ViewProps } from "react-native";
import styles from "./GenericToastComponentStyle";

interface Props extends ViewProps {
  internalStateText1?: any;
  getIconType?: any;
}

const FailureToast: React.FC<Props> = ({ internalStateText1, getIconType }: Props) => {
  return (
    <View style={[styles.base]}>
      <View style={styles.failureContainer}>{getIconType()}</View>
      <View style={styles.contentContainer}>
        <Text style={styles.text1} numberOfLines={2}>
          {internalStateText1}
        </Text>
      </View>
    </View>
  );
};

export default FailureToast;
