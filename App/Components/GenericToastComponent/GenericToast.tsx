import { StackActions, useNavigation } from "@react-navigation/native";
import { debounce } from "lodash";
import * as React from "react";
import { Text, View, ViewProps } from "react-native";
import Toast from "react-native-toast-message";
import CustomIcon from "~root/Components/CustomIcon";
import styles from "./GenericToastComponentStyle";

interface Props extends ViewProps {
  internalStateText1?: any;
  toastType?: string;
  getIconType?: any;
  internalStateText2?: string;
}

const GenericToast: React.FC<Props> = ({ internalStateText1, toastType, getIconType, internalStateText2 }: Props) => {
  const navigation = useNavigation();

  const cartHandler = React.useCallback(
    debounce(() => {
      navigation.navigate("CartView");
      setTimeout(() => navigation.dispatch(StackActions.popToTop()), 10);
    }, 500),
    [],
  );

  return (
    <View style={[toastType === "error" ? styles.baseError : toastType === "inputError" ? styles.inputErrorStyle : styles.base]}>
      <View style={toastType !== "error" && styles.iconContainer}>{getIconType()}</View>
      <View style={styles.contentContainer}>
        <View>
          <View>
            {toastType !== "error" ? (
              <Text style={[toastType === "inputError" ? styles.inputErrorTxt : styles.text1]} numberOfLines={1}>
                {internalStateText1}
              </Text>
            ) : (
              <Text style={styles.errorTxt}>{internalStateText1 + internalStateText2}</Text>
            )}
          </View>
        </View>
      </View>
      {toastType === "inputError" && <CustomIcon name={"close"} style={styles.iconClose} onPress={Toast.hide} />}
      {toastType === "cart" && (
        <Text style={styles.viewCartText} onPress={cartHandler}>
          View Cart
        </Text>
      )}
    </View>
  );
};

export default GenericToast;
