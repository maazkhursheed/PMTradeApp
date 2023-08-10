import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import PriceComponent from "~root/Components/PriceComponent";
import { getLabourAndOtherCostsTotal } from "~root/Lib/LabourSectionHelper";
import { useQuoteWonOrLostStatus } from "~root/Lib/QuoteHelper";
import { RootState } from "~root/Reducers";
import styles from "./LabourSectionFooterStyle";

const LabourSectionFooter: React.SFC = ({}) => {
  const { labourAndOtherCost } = useSelector((state: RootState) => ({
    labourAndOtherCost: state.quotes?.labourOtherCost?.otherCostList,
  }));

  const navigation = useNavigation();
  const isQuoteWonOrLost = useQuoteWonOrLostStatus();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.changeText}>Labour costs</Text>
        <PriceComponent style={styles.value} value={getLabourAndOtherCostsTotal(labourAndOtherCost)} ignorePOA={true} />
      </View>
      <TouchableOpacity style={styles.buttonStyle} onPress={navigation.goBack}>
        <Text style={styles.buttonText}>{isQuoteWonOrLost ? "Back to job details" : "All Labour Added"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LabourSectionFooter;
