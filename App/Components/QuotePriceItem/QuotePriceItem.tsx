import * as React from "react";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import LoadingView from "~root/Components/LoadingView";
import { materialPriceUpdated, Materials, updatedPrice, updateWithLatestPrice } from "~root/Lib/StringHelper";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import { Images } from "~root/Themes";
import PriceComponent from "../PriceComponent";
import styles from "./QuotePriceItemStyle";

interface QuotePriceItemProps {
  label: string;
  value: number;
  quoteCode?: any;
}

type Props = QuotePriceItemProps;

const QuotePriceItem: React.SFC<Props> = ({ label, value, quoteCode }: QuotePriceItemProps) => {
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state: RootState) => ({
    isFetching: state.quotes.fetching,
  }));
  const updateLabelView = React.useCallback(() => {
    dispatch(
      QuotesActions.requestMaterialsReprice(quoteCode, {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: materialPriceUpdated,
            topOffset: Platform.OS === "ios" ? 50 : 30,
            visibilityTime: 3000,
          });
        },
      }),
    );
  }, [quoteCode]);
  return (
    <LoadingView isLoading={isFetching}>
      <View style={styles.summaryItemContainer}>
        <Text style={styles.itemLabel}>{label}</Text>
        <PriceComponent prefix={"$"} value={value} ignorePOA={true} style={styles.itemValue} />
      </View>
      {label.includes(Materials) && !isFetching && (
        <TouchableOpacity style={styles.updatePriceContainer} onPress={updateLabelView}>
          <Image style={styles.loader} source={Images.update} resizeMode={"contain"} />
          <Text style={styles.updatePriceLabel}>{updateWithLatestPrice}</Text>
        </TouchableOpacity>
      )}
      {label.includes(Materials) && isFetching && (
        <View style={styles.updatedPriceContainer}>
          <Text style={styles.updatePriceLabel}>{updatedPrice}</Text>
          <Image style={styles.loaderRight} source={Images.update} resizeMode={"contain"} />
        </View>
      )}
    </LoadingView>
  );
};

export default QuotePriceItem;
