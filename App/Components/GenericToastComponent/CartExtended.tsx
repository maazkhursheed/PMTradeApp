import { StackActions, useNavigation } from "@react-navigation/native";
import { debounce } from "lodash";
import React from "react";
import { Text, View, ViewProps } from "react-native";
import CustomIcon from "~root/Components/CustomIcon";
import styles from "./GenericToastComponentStyle";

interface Props extends ViewProps {
  children?: any;
  internalStateText1?: any;
}

const CartExtended: React.FC<Props> = ({ children, internalStateText1 }: Props) => {
  const navigation = useNavigation();
  const cartHandler = React.useCallback(
    debounce(() => {
      navigation.navigate("CartView");
      setTimeout(() => {
        navigation.dispatch(StackActions.popToTop());
        // navigation.popToTop();
      }, 10);
    }, 500),
    [],
  );
  return (
    <View style={styles.extendedContainer}>
      <View style={styles.cartExtendedInner}>
        <View style={styles.iconContainer}>
          <CustomIcon name={"success"} style={styles.successToast} />
        </View>
        <View style={styles.contentContainer}>
          <View>
            <View>
              <Text style={styles.text1} numberOfLines={1}>
                {internalStateText1}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.viewCartTextExtended} onPress={cartHandler}>
          View Cart
        </Text>
      </View>
      {children && <View style={styles.extendedView}>{children}</View>}
    </View>
  );
};

export default CartExtended;
