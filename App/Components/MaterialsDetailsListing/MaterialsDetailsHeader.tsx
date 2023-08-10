import * as React from "react";
import { Text, View } from "react-native";
import { useQuoteWonOrLostStatus } from "~root/Lib/QuoteHelper";
import styles from "./MaterialsDetailsListingStyle";

interface OwnProps {
  dataLength: number;
}

type Props = OwnProps;

export const MaterialsDetailsHeader: React.SFC<Props> = ({ dataLength }: Props) => {
  const isQuoteWonOrLost = useQuoteWonOrLostStatus();
  return (
    <View style={styles.headerContainer}>
      {dataLength > 0 && <Text style={[styles.productCount, { marginTop: isQuoteWonOrLost ? 10 : 155 }]}>Products added ({dataLength})</Text>}
    </View>
  );
};
