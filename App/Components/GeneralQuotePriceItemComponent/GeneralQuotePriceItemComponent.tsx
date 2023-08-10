import * as React from "react";
import QuotePriceItem from "../QuotePriceItem/QuotePriceItem";

interface QuotePriceItemProps {
  quotePriceItems: any;
  quoteCode?: any;
}

type Props = QuotePriceItemProps;

const GeneralQuotePriceItemComponent: React.SFC<Props> = ({ quotePriceItems, quoteCode }: Props) => {
  return quotePriceItems.map(item => <QuotePriceItem key={item.key} label={item.label} value={item.value} quoteCode={quoteCode} />);
};

export default GeneralQuotePriceItemComponent;
