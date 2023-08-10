import * as React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import GeneralQuotePriceItemComponent from "~root/Components/GeneralQuotePriceItemComponent/GeneralQuotePriceItemComponent";
import QuotePriceItem from "~root/Components/QuotePriceItem/QuotePriceItem";
import { RootState } from "../../Reducers/index";
import styles from "./QuoteTotalStyle";

interface StateProps {
  quotesDetails: any;
}

type Props = StateProps;

const QuoteTotal: React.SFC<Props> = ({}: Props) => {
  const { quotesDetails } = useSelector((state: RootState) => ({
    quotesDetails: state.quotes.quotesListDetails,
  }));

  const GST = (quotesDetails?.totalPrice?.value * 15) / 100;
  const quoteValue = quotesDetails?.totalPrice?.value + GST;
  const quoteTotalList = [
    {
      key: 1,
      label: "Subtotal:",
      value: quotesDetails?.totalPrice?.value,
    },
    {
      key: 2,
      label: "GST:",
      value: GST,
    },
  ];

  return (
    <View style={styles.summaryContainer}>
      <GeneralQuotePriceItemComponent quotePriceItems={quoteTotalList} />
      <View style={styles.separator2} />
      <QuotePriceItem label={"Total"} value={quoteValue} />
    </View>
  );
};

export default QuoteTotal;
