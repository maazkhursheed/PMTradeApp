import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { isNilOrEmpty } from "~root/Lib/CommonHelper";
import { RootState } from "~root/Reducers";
import Fonts from "~root/Themes/Fonts";
import PriceComponent from "../PriceComponent/index";
import styles from "./QuoteReviewTotalStyle";

const QuoteReviewTotal: React.SFC = () => {
  const { quotesDetails, companyDetails } = useSelector((state: RootState) => ({
    quotesDetails: state.quotes.quotesListDetails,
    companyDetails: state.quotes.companyDetails,
  }));

  const navigation = useNavigation();
  const GST = (quotesDetails?.totalPrice?.value * 15) / 100;
  const total = quotesDetails?.totalPrice?.value + GST;
  const quoteLabel = "Quote total incl. GST";
  const quoteValue = total;

  const isDisabled = React.useCallback(() => isNilOrEmpty(companyDetails), [companyDetails]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={isDisabled()}
        style={[styles.buttonSendStyle, isDisabled() ? styles.buttonDisabled : {}]}
        onPress={() => {
          navigation.navigate("ViewQuoteScreen", {});
        }}
      >
        <Text style={[styles.buttonSendText, isDisabled() ? styles.buttonDisabled : {}]}>View Quote</Text>
      </TouchableOpacity>
      <View style={styles.totalItemContainer}>
        <Text style={styles.itemLabel}>{quoteLabel}</Text>
        <PriceComponent ignorePOA={true} style={Fonts.style.openSans16Bold} value={quoteValue} />
      </View>
    </View>
  );
};

export default QuoteReviewTotal;
