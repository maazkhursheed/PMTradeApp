import * as React from "react";
import QuoteItem from "~root/Components/QuoteItem/QuoteItem";

interface QuoteItemProps {
  quoteItems: any;
}

type Props = QuoteItemProps;

const GeneralQuoteItemComponent: React.SFC<Props> = ({ quoteItems }: QuoteItemProps) => {
  return quoteItems.map(item => <QuoteItem key={item.key} label={item.label} value={item.value} />);
};

export default GeneralQuoteItemComponent;
