import { useNavigation } from "@react-navigation/native";
import { Text } from "native-base";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import LoadingView from "~root/Components/LoadingView";
import PriceComponent from "~root/Components/PriceComponent";
import InfoBoxIcon from "~root/Images/infoBox/InfoBoxIcon.svg";
import { isItemUpdatingOrDeleting } from "~root/Lib/CartHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import styles from "./CartViewStyle";

interface OwnProps {
  title?: string;
  description?: string;
  amount?: any;
}

const CardPayLaterInfo = ({ title, description, amount }: OwnProps) => {
  const navigation = useNavigation();
  const { itemDeleteMap, itemUpdateMap }: any = useSelector<RootState>(state => {
    return {
      itemUpdateMap: state.cart.itemUpdateMap,
      itemDeleteMap: state.cart.itemDeleteMap,
    };
  });

  const isLoading = isItemUpdatingOrDeleting({
    itemUpdateMap,
    itemDeleteMap,
  });

  return (
    <View style={styles.card}>
      <LoadingView isLoading={isLoading} hideViewOnLoading={true} style={isLoading && styles.loadingViewStyleCash}>
        <View style={styles.topBar}>
          <View style={styles.leftView}>
            <Text style={styles.subTotalTextCash}>{title}</Text>
          </View>
          <View style={styles.rightView}>
            <TouchableOpacity onPress={() => navigation.navigate("SpecialOrderInfoScreenContainer")}>
              <InfoBoxIcon marginRight={8} marginBottom={2} />
            </TouchableOpacity>
            <PriceComponent style={styles.subDescTextCash} value={amount} {...accessibility("totalProductPricePayLater")} />
          </View>
        </View>
        <Text style={styles.subTotalIlaticCash}>{description}</Text>
      </LoadingView>
    </View>
  );
};

export default CardPayLaterInfo;
