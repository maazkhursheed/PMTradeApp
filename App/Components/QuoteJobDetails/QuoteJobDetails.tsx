import * as R from "ramda";
import * as React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import GeneralQuoteItemComponent from "~root/Components/GeneralQuoteItemComponent/GeneralQuoteItemComponent";
import QuoteItemHeader from "~root/Components/QuoteItemHeader/QuoteItemHeader";
import ViewScopeOfWork from "~root/Components/ReadMoreTextView";
import { isNilOrEmpty } from "~root/Lib/CommonHelper";
import { RootState } from "../../Reducers/index";
import styles from "./QuoteJobDetailsStyle";

interface DispatchProps {}

interface StateProps {
  quotesDetails: any;
}

type Props = StateProps & DispatchProps;

const QuoteJobDetails: React.SFC<Props> = ({}: Props) => {
  const { quotesDetails } = useSelector((state: RootState) => ({
    quotesDetails: state.quotes.quotesListDetails,
  }));

  const quoteJobDetails = [
    {
      key: 1,
      label: "Reference:",
      value: quotesDetails?.code,
    },
    {
      key: 2,
      label: "Document type:",
      value: "Quote",
    },
    {
      key: 3,
      label: "Location:",
      value: R.replace(/,/g, "\n", quotesDetails?.jobAddress?.formattedAddress || ""),
    },
  ];

  return (
    <View style={styles.summaryContainer}>
      <QuoteItemHeader label={"Job details"} />
      <View style={styles.separator} />
      <GeneralQuoteItemComponent quoteItems={quoteJobDetails} />
      <View style={styles.separator2} />
      {!isNilOrEmpty(quotesDetails?.notes) && <ViewScopeOfWork text={quotesDetails?.notes} heading={"Notes"} />}
      {!isNilOrEmpty(quotesDetails?.scopeOfWork) && <ViewScopeOfWork text={quotesDetails?.scopeOfWork} heading={"Scope of work"} />}
    </View>
  );
};

export default QuoteJobDetails;
