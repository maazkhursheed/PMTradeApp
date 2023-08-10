import * as React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import GeneralQuotePriceItemComponent from "~root/Components/GeneralQuotePriceItemComponent/GeneralQuotePriceItemComponent";
import { Fonts } from "~root/Themes";
import { RootState } from "../../Reducers/index";
import styles from "./QuoteCostsStyle";

const QuoteCosts: React.SFC = () => {
  const { quotesDetails } = useSelector((state: RootState) => ({
    quotesDetails: state.quotes.quotesListDetails,
  }));

  const markupLabel = React.useCallback(() => {
    return quotesDetails?.markupPercentage ? "(" + quotesDetails?.markupPercentage + "%)" : "";
  }, [quotesDetails?.markupPercentage]);

  const quoteCostDetails = [
    {
      key: 1,
      label: "Materials:",
      value: quotesDetails?.materialPrice?.formattedValue,
    },
    {
      key: 2,
      label: "Mark-up " + markupLabel(),
      value: quotesDetails?.markupPrice?.formattedValue,
    },
    {
      key: 3,
      label: "Labour:",
      value: quotesDetails?.otherCostPrice?.formattedValue,
    },
  ];

  return (
    <View style={styles.summaryContainer}>
      <Text style={Fonts.style.openSans16Bold}>{"Costs"}</Text>
      <View style={styles.separator} />
      <GeneralQuotePriceItemComponent quotePriceItems={quoteCostDetails} quoteCode={quotesDetails?.code} />
    </View>
  );
};

export default QuoteCosts;
