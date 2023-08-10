import * as React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import FilterImageComponent from "~root/Components/FilterImageComponent";
import FilterNameComponent from "~root/Components/FilterNameComponent";
import CustomIcon from "../CustomIcon";
import styles from "./FilterSwitchItemStyles";

interface Props {
  facet: any;
  onFacetTapped: (queryStr: string) => void;
  selectedName: string;
}

const FilterSwitchItem: React.SFC<Props> = ({ facet, onFacetTapped, selectedName }: Props) => {
  const isFromAllFilters = selectedName === "Filters";
  const [isShowMore, setShowMore] = React.useState(true);
  const [showMoreBtn, setShowMoreBtn] = React.useState(facet?.values?.length > 5);

  React.useEffect(() => {
    setShowMoreBtn(facet?.values?.length > 5);
  }, [facet]);

  return (
    <View>
      {isFromAllFilters && (
        <>
          <Text style={styles.sectionHeader}>{facet.name === "Fulfillment" ? "Delivery options" : facet.name}</Text>
          <View style={styles.subSeparator} />
        </>
      )}
      <FlatList
        data={isFromAllFilters && isShowMore ? facet.values?.slice(0, 5) : facet.values}
        renderItem={({ item }) =>
          facet.name === "Fulfillment" ? (
            <FilterImageComponent item={item} onFacetTap={(queryStr: string) => onFacetTapped(queryStr)} />
          ) : (
            <FilterNameComponent item={item} onFacetTap={(queryStr: string) => onFacetTapped(queryStr)} />
          )
        }
        keyExtractor={(_, index) => index.toString()}
      />
      {isFromAllFilters && showMoreBtn && (
        <TouchableOpacity style={styles.buttonViewMore} onPress={() => setShowMore(!isShowMore)}>
          <CustomIcon name={isShowMore ? "add" : "substract"} style={styles.icon} />
          <Text style={styles.viewMore}>{isShowMore ? "View more" : "View less"}</Text>
        </TouchableOpacity>
      )}
      {isFromAllFilters && <View style={styles.sectionSeparator} />}
    </View>
  );
};

export default FilterSwitchItem;
