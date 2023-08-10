import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { accessibility } from "~root/Lib/DataHelper";
import styles from "./SellOrderComponentStyle";

interface Props {
  orderMultiple: number;
  onSelectOrderMultiple: (value: number) => void;
}

const HARDCODED_LENGTHS = [3.0, 3.6, 4.8, 5.4, 6.0];

const SellOrderComponent: React.FunctionComponent<Props> = ({ orderMultiple, onSelectOrderMultiple }: Props) => {
  const [selectedOrderMultiple, setSelectedOrderMultiple] = React.useState(orderMultiple === 0 ? 0.0 : orderMultiple);
  return (
    <View>
      {!!orderMultiple && <Text style={[styles.unitStyleQuantity, styles.trimLengthText]}>Trim length {orderMultiple}</Text>}

      <View style={styles.sellOrderView}>
        {(!!orderMultiple ? [orderMultiple] : HARDCODED_LENGTHS).map(value => (
          <TouchableOpacity
            key={value}
            onPress={() => {
              setSelectedOrderMultiple(value);
              onSelectOrderMultiple(value);
            }}
            {...accessibility("multipleValueTouchable")}
          >
            {!!orderMultiple && (
              <View style={styles.lengthBoxViewSelectedNew}>
                <Text style={styles.lengthSelectedText}>{orderMultiple}m</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SellOrderComponent;
