import * as React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { RootState } from "~root/Reducers";
import { Fonts } from "~root/Themes";
import styles from "./QuotesSummaryStyle";

interface OwnProps {}

interface StateProps {
  quoteDetails?: any;
}

type Props = OwnProps & StateProps;

interface SummaryItemProps {
  label: string;
  value: string;
}

const SummaryItem = ({ label, value }: SummaryItemProps) => (
  <View style={styles.summaryItemContainer}>
    <Text style={styles.itemLabel}>{label}</Text>
    <Text style={Fonts.style.openSans16Bold}>{value}</Text>
  </View>
);

const QuotesSummary: React.SFC<Props> = ({ quoteDetails }: Props) => {
  const markupLabel = React.useCallback(() => {
    return quoteDetails?.markupPercentage ? "(" + quoteDetails?.markupPercentage + "%)" : "";
  }, [quoteDetails?.markupPercentage]);
  return (
    <View style={styles.summaryContainer}>
      <Text style={Fonts.style.openSans16Bold}>{"Summary"}</Text>
      <View style={styles.separator} />
      <SummaryItem label="Materials" value={quoteDetails?.materialPrice?.formattedValue} />
      <SummaryItem label={"Mark-up " + markupLabel()} value={quoteDetails?.markupPrice?.formattedValue} />
      <SummaryItem label="Other costs" value={quoteDetails?.otherCostPrice?.formattedValue} />
      <View style={styles.separator2} />
      <SummaryItem label="Subtotal" value={quoteDetails?.totalPrice?.formattedValue} />
    </View>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  quoteDetails: state.quotes.quotesListDetails,
});

export default connect(mapStateToProps)(QuotesSummary);
