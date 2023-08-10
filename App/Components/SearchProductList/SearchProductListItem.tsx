import { useRoute } from "@react-navigation/native";
import * as React from "react";
import { TouchableOpacityProps } from "react-native";
import OrderProductListItem from "~root/Components/OrderProductListItem/OrderProductListItem";
import QuoteSearchProductListItem from "~root/Components/QuoteSearchProductListItem/QuoteSearchProductListItem";

interface OwnProps extends TouchableOpacityProps {
  item: any;
  isProductSearch?: any;
  updateCart?: any;
  index?: any;
}

interface DispatchProps {}

interface StateProps {}

type Props = OwnProps & DispatchProps & StateProps;

const SearchProductListItem: React.SFC<Props> = ({ item, isProductSearch, updateCart, index }: Props) => {
  const route = useRoute();
  const isFromQuote = route.params?.isQuotes;
  return isFromQuote ? (
    <QuoteSearchProductListItem item={item} />
  ) : (
    <OrderProductListItem isGridView={!isProductSearch} item={item} onUpdateCart={updateCart} index={index} />
  );
};

export default SearchProductListItem;
