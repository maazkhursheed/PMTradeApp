import { useRoute } from "@react-navigation/native";
import * as React from "react";
import { Text } from "react-native";
import styles from "./ListHeaderComponentStyle";

interface OwnProps {
  isProductSearch: boolean;
}

interface DispatchProps {}

interface StateProps {}

type Props = OwnProps & DispatchProps & StateProps;

const ListHeaderComponent: React.SFC<Props> = ({ isProductSearch }: Props) => {
  const route = useRoute();
  const isFromQuotes = route.params.isQuotes;
  return !isFromQuotes && isProductSearch && <Text style={styles.resultsText}>Product Results</Text>;
};

export default ListHeaderComponent;
