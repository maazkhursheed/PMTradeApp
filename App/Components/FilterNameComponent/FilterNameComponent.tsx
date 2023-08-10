import * as R from "ramda";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { accessibility } from "~root/Lib/DataHelper";
import LargeCheckBox from "../LargeCheckBox";
import styles from "./FilterNameStyles";

interface Props {
  item: any;
  onFacetTap: (query: string) => void;
}

const FilterNameComponent: React.SFC<Props> = ({ item, onFacetTap }: Props) => (
  <View style={styles.siteDetailItemContainer} {...accessibility(item?.name)}>
    <Text style={item?.selected ? styles.labelSelectedStyle : styles.labelStyle} {...accessibility(item?.name)}>
      {item?.name === "root" ? "Browse Products" : item?.name}
    </Text>
    <TouchableOpacity onPress={() => R.compose(onFacetTap, R.pathOr("", ["query", "query", "value"]))(item)}>
      <LargeCheckBox selected={item?.selected} disabled={true} style={styles.siteItemTickContainer} {...accessibility(item?.name)} />
    </TouchableOpacity>
  </View>
);

export default FilterNameComponent;
