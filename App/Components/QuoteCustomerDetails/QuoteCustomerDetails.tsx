import * as React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import GeneralQuoteItemComponent from "~root/Components/GeneralQuoteItemComponent/GeneralQuoteItemComponent";
import QuoteItemHeader from "~root/Components/QuoteItemHeader/QuoteItemHeader";
import { RootState } from "../../Reducers/index";
import styles from "./QuoteCustomerDetailsStyle";

interface StateProps {
  quotesDetails: any;
}

type Props = StateProps;

const QuoteCustomerDetails: React.SFC<Props> = ({}: Props) => {
  const { quotesDetails } = useSelector((state: RootState) => ({
    quotesDetails: state.quotes.quotesListDetails,
  }));

  const quoteCustomerDetails = [
    {
      key: 1,
      label: "Name:",
      value: quotesDetails?.consumerAddress?.firstName,
    },
    {
      key: 2,
      label: "Address:",
      value: quotesDetails?.consumerAddress?.formattedAddress?.replace(/,/g, "\n"),
    },
    {
      key: 3,
      label: "Phone:",
      value: quotesDetails?.consumerAddress?.phone,
    },
    {
      key: 4,
      label: "Email:",
      value: quotesDetails?.consumerAddress?.email,
    },
  ];
  return (
    <View style={styles.summaryContainer}>
      <QuoteItemHeader label={"Customer details"} />
      <View style={styles.separator} />
      <GeneralQuoteItemComponent quoteItems={quoteCustomerDetails} />
    </View>
  );
};

export default QuoteCustomerDetails;
