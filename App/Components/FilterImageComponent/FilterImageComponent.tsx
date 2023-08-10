import * as R from "ramda";
import * as React from "react";
import { Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { accessibility, getFilterImageParams } from "~root/Lib/DataHelper";
import LargeCheckBox from "../LargeCheckBox";
import styles from "./FilterImageStyles";

interface Props {
  item: any;
  onFacetTap: (query: string) => void;
}

const FilterImageComponent: React.SFC<Props> = ({ item, onFacetTap }: Props) => {
  const { name, desc, source } = getFilterImageParams(item?.name);
  return (
    <View style={styles.siteDetailItemContainer} {...accessibility(item?.name)}>
      <View style={styles.imageView}>
        <FastImage source={source} style={styles.image} resizeMode={FastImage.resizeMode.contain} />
        <View style={styles.nameView}>
          <Text style={item?.selected ? styles.labelSelectedStyle : styles.labelStyle} {...accessibility(item?.name)}>
            {name}
          </Text>
          <Text style={styles.siteItemDesc} {...accessibility(desc)}>
            {desc}
          </Text>
        </View>
      </View>
      <LargeCheckBox
        onPress={() => R.compose(onFacetTap, R.pathOr("", ["query", "query", "value"]))(item)}
        selected={item?.selected}
        style={styles.siteItemTickContainer}
        {...accessibility(item?.name)}
      />
    </View>
  );
};

export default FilterImageComponent;
