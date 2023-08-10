import { useNavigation } from "@react-navigation/native";
import * as R from "ramda";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "~root/Reducers";
import { Colors, Fonts } from "~root/Themes";
import styles from "./SOBQuotesFooterStyle";

const SOBQuotesFooter: React.SFC = () => {
  const navigation = useNavigation();
  const { selectedSob } = useSelector((state: RootState) => ({
    quoteDetails: state.quotes.quotesListDetails,
    selectedSob: R.propOr({}, "0")(R.filter(R.propEq("id", state.sectionSOBQuotes?.sobId), state.sectionSOBQuotes?.SOBQuotesList?.pmQuoteSobList)),
  }));

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.buttonStyle} onPress={navigation.goBack}>
          <Text style={styles.buttonText}>Back to Materials</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.totalContainer}>
        <Text style={[Fonts.style.openSans12, { color: Colors.darkGrey }]}>{"Total excl. GST"}</Text>
        <Text style={[Fonts.style.openSans16Bold, { textAlign: "right" }]}>{selectedSob?.totalPrice?.formattedValue}</Text>
      </View>
    </View>
  );
};

export default SOBQuotesFooter;
