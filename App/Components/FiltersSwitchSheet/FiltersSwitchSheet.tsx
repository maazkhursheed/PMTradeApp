import { useNavigation } from "@react-navigation/native";
import { Button } from "native-base";
import * as React from "react";
import { FlatList, Platform, Text, View } from "react-native";
import { connect } from "react-redux";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import FilterSwitchItem from "~root/Components/FilterSwitchItem/FilterSwitchItem";
import LoadingView from "~root/Components/LoadingView";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { DispatchProps } from "~root/Containers/OrderProductContainer/OrderProduct";
import { accessibility, addOcclusionForTextFields, removeOcclusionFromTextFields, tagScreenName } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import { ProductActions } from "~root/Reducers/ProductReducers";
import { Colors, Fonts } from "~root/Themes";
import { ISearchSolrParams } from "~root/Types/SearchAPITypes";
import BranchSelectSheetContainer from "../BranchSelectSheetContainer/BranchSelectSheetContainer";
import styles from "./FiltersSwitchSheetStyles";

interface OwnProps {
  sheetState: SheetState;
  closeSheet: (updatedQuery: string) => void;
  selectedName: string;
  navigation: any;
  categoryId: string;
  currentQuery: string;
}

interface StateProps {
  facets: any;
  loading: boolean;
}

interface DispatchProps {
  solrSearch: (param: ISearchSolrParams, callback: (page: number) => void) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

const FiltersSwitchSheet: React.SFC<Props> = ({ sheetState, closeSheet, facets, selectedName, solrSearch, loading, categoryId, currentQuery }: Props) => {
  const [sheetStateInternal, setSheetStateInternal] = React.useState(sheetState);
  const [facetsArr, setFacetsArr] = React.useState([]);
  const [updatedQuery, setUpdatedQuery] = React.useState(currentQuery);

  React.useEffect(() => {
    setSheetStateInternal(sheetState);
    setFilterValues();
  }, [sheetState]);

  React.useEffect(() => {
    setFilterValues();
  }, [facets]);

  React.useEffect(() => {
    if (sheetStateInternal === SheetState.EXPANDED) {
      tagScreenName("Filters Screen");
      addOcclusionForTextFields();
    }
  }, [sheetStateInternal]);

  const setFilterValues = () => {
    if (selectedName !== "Filters") {
      setFacetsArr(facets?.filter((item: any) => item.name === selectedName));
    } else {
      setFacetsArr(facets);
    }
  };

  const closeSheetTapped = () => {
    setSheetStateInternal(SheetState.CLOSED);
    closeSheet(updatedQuery);
    removeOcclusionFromTextFields();
  };

  const onFacetTapped = (queryStr: string) => {
    setUpdatedQuery(queryStr);
    // tslint:disable-next-line:no-empty
    solrSearch({ query: queryStr, currentPage: "0" }, page => {});
  };

  const resetTapped = () => {
    setUpdatedQuery("");
    // tslint:disable-next-line:no-empty
    solrSearch({ query: categoryId, currentPage: "0" }, page => {});
  };
  const navigation = useNavigation();
  return (
    <>
      <BottomSheet
        content={
          <View style={styles.contentContainer}>
            <STCHeader
              title={selectedName === "Fulfillment" ? "Delivery options" : selectedName}
              titleStyle={{ ...Fonts.style.openSans18Bold }}
              style={[
                styles.headerStyle,
                {
                  backgroundColor: sheetStateInternal === SheetState.EXPANDED ? Colors.darkBlue : Colors.cloud,
                },
              ]}
              leftItem={
                selectedName === "Filters" && (
                  <Button transparent={true} onPress={resetTapped} {...accessibility("leftItemBtn")}>
                    <Text style={styles.resetText}>{"Reset"}</Text>
                  </Button>
                )
              }
              rightItem={
                <Button transparent={true} onPress={closeSheetTapped} {...accessibility("rightItemBtn")}>
                  <Text
                    style={{
                      ...Fonts.style.openSans16,
                      marginRight: 18,
                      color: Colors.lightBlue,
                    }}
                  >
                    {"Done"}
                  </Text>
                </Button>
              }
            />
            <LoadingView
              isLoading={loading}
              style={{
                paddingBottom: Platform.select({ android: 56, ios: 110 }),
              }}
            >
              <FlatList
                data={facetsArr}
                renderItem={({ item }) => (
                  <FilterSwitchItem facet={item} onFacetTapped={(queryStr: string) => onFacetTapped(queryStr)} selectedName={selectedName} />
                )}
                keyExtractor={(_, index) => index.toString()}
              />
            </LoadingView>
            {selectedName === "Fulfillment" && (
              <Text style={styles.pickupMsg}>
                {"Pickup location will give you branch specific stock availability. "}
                <BranchSelectSheetContainer>
                  <Text {...accessibility("changePickupLocation")} style={styles.highlightedText}>
                    {"Change pickup location"}
                  </Text>
                </BranchSelectSheetContainer>
              </Text>
            )}
          </View>
        }
        sheetState={sheetStateInternal}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  solrSearch: (param, callback) => dispatch(ProductActions.requestSearchSolr(param, callback)),
});

const mapStateToProps = (state: RootState): StateProps => {
  return {
    facets: state.product.facets ?? [],
    loading: state.product.fetching,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersSwitchSheet);
