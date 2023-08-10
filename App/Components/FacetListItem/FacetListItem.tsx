import * as React from "react";
import { Text, TouchableOpacity } from "react-native";
import CustomIcon from "~root/Components/CustomIcon";
import { accessibility } from "~root/Lib/DataHelper";
import colors from "~root/Themes/Colors";
import styles from "./FacetListItemStyles";

interface Props {
  item: any;
  index: number;
  resetTapped: () => void;
  onPress: (filterName: string) => void;
}

const FacetsListItem: React.SFC<Props> = ({ item, index, resetTapped, onPress }: Props) => {
  if (index === 0) {
    return (
      <TouchableOpacity style={styles.facetIcon} onPress={() => onPress(item.name)} {...accessibility("allFilterButton")}>
        <CustomIcon name={"sliders-icon"} style={styles.icon} {...accessibility("allFilter")} />
      </TouchableOpacity>
    );
  } else if (item.name === "Reset") {
    return (
      <TouchableOpacity style={styles.resetFacet} onPress={resetTapped} {...accessibility("resetAllButton")}>
        <Text {...accessibility("resetAll")} style={styles.resetText}>
          {"Reset all"}
        </Text>
      </TouchableOpacity>
    );
  } else {
    let bgColor = colors.white;
    let txtStyles = styles.facetTxt;
    let text = item.name === "Fulfillment" ? "Delivery" : item.name;
    const isSelected = item?.selectedArr?.length > 0;
    if (isSelected) {
      bgColor = colors.black;
      txtStyles = styles.selectedFacetTxt;
      if (item?.selectedArr?.length > 1) {
        text = text + ` (${item?.selectedArr?.length})`;
      }
    }
    return (
      <TouchableOpacity style={[styles.facet, { backgroundColor: bgColor }]} onPress={() => onPress(item.name)} {...accessibility(text + "button")}>
        <Text {...accessibility(text)} style={txtStyles}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
};

export default FacetsListItem;
