import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, TouchableOpacity, View, ViewProps } from "react-native";
import InfoTextIcon from "../../Images/SpecialOrderProductIcons/infoTextIcon.svg";
import CustomIcon from "../CustomIcon";
import styles from "./CartSectionHeaderStyle";

interface Props extends ViewProps {
  numberOfProducts?: number;
  isSpecial: boolean;
  title: string;
  subTitle: string;
  isInfoTag: boolean;
}

const CartSectionHeader: React.SFC<Props> = ({ numberOfProducts, isSpecial, title, subTitle, isInfoTag }: Props) => {
  const navigation = useNavigation();
  const openModal = React.useCallback(() => navigation.navigate("SpecialOrderInfoScreenContainer"));

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.productHeaderWrap}>
          {isSpecial && <CustomIcon style={styles.iconStyle} name={"Icon_SpecialOrderProduct_Subtract"} />}
          <Text style={styles.titleStyle}>{title}</Text>
          <Text style={styles.smallTitle}>
            {"(" + numberOfProducts + " "}
            {numberOfProducts === 1 ? "item)" : "items)"}
          </Text>
        </View>
        {isInfoTag && (
          <TouchableOpacity onPress={openModal}>
            <InfoTextIcon />
          </TouchableOpacity>
        )}
      </View>
      {subTitle && (
        <View style={styles.subTitleWrap}>
          <Text style={styles.subTitleText}>{subTitle}</Text>
        </View>
      )}
    </View>
  );
};

export default CartSectionHeader;
