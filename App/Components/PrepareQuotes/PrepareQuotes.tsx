import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { useQuoteStatusDisabled, useQuoteWonOrLostStatus } from "~root/Lib/QuoteHelper";
import { RootState } from "~root/Reducers";
import { Fonts } from "~root/Themes";
import styles from "./PrepareQuotesStyle";

const QuotesInfo: React.SFC = () => {
  const { isLoading, quoteDetails } = useSelector((state: RootState) => ({
    isLoading: state.quotes.fetching || state.cart.fetching,
    quoteDetails: state.quotes.quotesListDetails,
  }));
  const navigation = useNavigation();
  const isQuoteDisabled = useQuoteStatusDisabled();
  const isQuoteWonOrLost = useQuoteWonOrLostStatus();

  const prepareQuote = React.useCallback(() => {
    navigation.navigate("ReviewQuoteScreen", {});
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={Fonts.style.openSans12}>Total excl. GST</Text>
        <Text style={Fonts.style.openSans16Bold}>{quoteDetails?.totalPrice?.formattedValue}</Text>
      </View>
      {!isLoading && isQuoteWonOrLost ? (
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            navigation.navigate("Jobs", {});
          }}
        >
          <Text style={styles.buttonText}>Back to Jobs List</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={isQuoteDisabled}
          style={isQuoteDisabled ? styles.buttonStyleDisabled : styles.buttonStyle}
          onPress={isQuoteDisabled ? undefined : prepareQuote}
        >
          <Text style={styles.buttonText}>Prepare quote</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default QuotesInfo;
