import * as React from "react";
import { Text, View } from "react-native";
import { occludeSensitiveView } from "../../Lib/DataHelper";
import styles from "./QuoteItemStyle";

interface QuoteItemProps {
  label: string;
  value: string;
}

type Props = QuoteItemProps;

const QuoteItem: React.SFC<Props> = ({ label, value }: QuoteItemProps) => {
  return (
    <View style={styles.summaryItemContainer}>
      <Text style={styles.itemLabel}>{label}</Text>
      <Text ref={occludeSensitiveView} style={styles.itemValue}>
        {value}
      </Text>
    </View>
  );
};

export default QuoteItem;
