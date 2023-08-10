import * as React from "react";
import { FlatList, View } from "react-native";
import { connect } from "react-redux";
import FacetsListItem from "~root/Components/FacetListItem/FacetListItem";
import { RootState } from "~root/Reducers";
import { ProductActions } from "~root/Reducers/ProductReducers";
import { ISearchSolrParams } from "~root/Types/SearchAPITypes";
import styles from "./FacetsListStyles";

interface OwnProps {
  onPress: (selectedName: string) => void;
  currentQuery: string;
  resetAllTapped: () => void;
  isFrequentOrderedList: boolean | undefined;
}

interface StateProps {
  facets: any;
  isShowReset: boolean;
}

interface DispatchProps {
  solrSearch: (param: ISearchSolrParams, callback: (page: number) => void) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

const FacetsListView: React.SFC<Props> = ({ onPress, facets, isShowReset, solrSearch, currentQuery, resetAllTapped, isFrequentOrderedList }: Props) => {
  const allFacets = facets ? [{ name: "Filters" }, ...facets] : [];
  if (isShowReset) {
    allFacets.push({ name: "Reset" });
  }

  const resetTapped = () => {
    resetAllTapped();
    solrSearch({ query: currentQuery, currentPage: "0" }, page => {});
  };

  return !isFrequentOrderedList && facets?.length > 0 ? (
    <FlatList
      style={styles.list}
      data={allFacets}
      horizontal={true}
      renderItem={({ item, index }) => (
        <FacetsListItem item={item} index={index} resetTapped={resetTapped} onPress={(filterName: string) => onPress(filterName)} />
      )}
      keyExtractor={(_, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
    />
  ) : (
    <View />
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  solrSearch: (param, callback) => dispatch(ProductActions.requestSearchSolr(param, callback)),
});

const mapStateToProps = (state: RootState): StateProps => {
  return {
    facets: state.product.facets ?? [],
    isShowReset: state.product.isShowReset,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FacetsListView);
