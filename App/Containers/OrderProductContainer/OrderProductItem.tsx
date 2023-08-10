import { Text } from "native-base";
import * as R from "ramda";
import React from "react";
import { Animated, TouchableOpacity, View, ViewStyle } from "react-native";
import { connect } from "react-redux";
import FacetsListView from "~root/Components/FacetsListView";
import HeaderWithSearchBarComponent from "~root/Components/HeaderWithSearchBarComponent";
import ListHeaderComponent from "~root/Components/ListHeaderComponent/ListHeaderComponent";
import LoadingView from "~root/Components/LoadingView";
import ScrollAnimatedHeaderComponent from "~root/Components/ScrollAnimatedHeaderComponent";
import SearchFieldWithTabComponent from "~root/Components/SearchFieldWithTabComponent/SearchFieldWithTabComponent";
import SearchProductListItem from "~root/Components/SearchProductList/SearchProductListItem";
import { noResultsFound } from "~root/Lib/AlertsHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import style from "./OrderProductStyles";

export interface OwnProps {
  style?: ViewStyle;
  onClickMore: (item: any) => void;
  handleMoreData: () => void;
  searchTerm: string;
  page: number;
  isSearch?: boolean;
  navigation: any;
  onUpdateCart: () => void;
  isFrequentOrderedList?: boolean;
  onPressFacet: (selectedName: string) => void;
  isCategory?: boolean;
  currentQuery?: string;
  resetAllTapped?: () => void;
  browseAllTapped: () => void;
  isAccountSelectionHidden?: boolean;
  isQuotes?: boolean;
}

export interface State {
  errorMessage: React.ReactElement | null;
}

export interface StateProps {
  data: any[];
  frequentlyOrderedList: any[];
  totalCount: number;
  loading: boolean;
  count: number;
  facets: any;
}

type Props = OwnProps & StateProps;

class OrderProductItem extends React.Component<Props, State> {
  public scroll: any;
  private onEndReachedCalledDuringMomentum = true;

  constructor(props: Props) {
    super(props);
    this.state = {
      errorMessage: null,
    };
  }

  public renderMessageForNoProducts() {
    return (
      <View style={style.noMatchTxtContainer}>
        <Text style={style.noMatchTxt}>{noResultsFound}</Text>
        <TouchableOpacity onPress={this.props.browseAllTapped}>
          <Text style={style.browseProducts}>{"Browse all products"}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  public isProductSearchOrFromQuotes = () => this.isProductSearch() || this.props.isQuotes;

  public isProductSearch = () => this.props.searchTerm.length > 0 && !this.props.isCategory;

  public searchListItem = ({ item, index }) => {
    return item ? (
      <SearchProductListItem item={item} isProductSearch={this.isProductSearchOrFromQuotes()} updateCart={this.props.onUpdateCart} index={index} />
    ) : undefined;
  };

  public renderFooter = () => {
    return this.props.loading && this.props.page > 0 ? (
      <LoadingView style={[style.loadingView, { marginBottom: this.props.facets.length > 0 ? 94 : 34 }]} isLoading={true} />
    ) : (
      <View style={{ marginBottom: this.props.facets.length > 0 ? 70 : 10 }} />
    );
  };

  public renderAnimatedHeader = (scrollY: Animated.Value) => {
    const childComp = this.isProductSearch() ? (
      <SearchFieldWithTabComponent
        style={style.containerNew}
        searchText={this.props.searchTerm?.replace(":relevance:category:", "")}
        navigation={this.props.navigation}
      />
    ) : (
      <HeaderWithSearchBarComponent navigation={this.props.navigation} />
    );
    return (
      <ScrollAnimatedHeaderComponent scrollY={scrollY}>
        <>
          {childComp}
          <FacetsListView
            onPress={(selectedName: string) => this.props.onPressFacet(selectedName)}
            currentQuery={this.props.currentQuery}
            resetAllTapped={this.props.resetAllTapped}
            isFrequentOrderedList={this.props.isFrequentOrderedList}
          />
        </>
      </ScrollAnimatedHeaderComponent>
    );
  };

  public render() {
    const scrollY = new Animated.Value(0);
    return (
      <>
        <LoadingView style={style.listContainer} isLoading={this.props.loading && this.props.page === 0}>
          {this.renderAnimatedHeader(scrollY)}
          <Animated.FlatList
            style={{
              paddingTop: this.props.facets.length > 0 && !this.props.isFrequentOrderedList && !this.props.isAccountSelectionHidden ? 70 : 10,
            }}
            key={this.isProductSearchOrFromQuotes() ? "lineItem" : "grid"}
            ListHeaderComponent={<ListHeaderComponent isProductSearch={this.isProductSearchOrFromQuotes()} />}
            keyExtractor={(item, index) => (item ? item.SKU + item.JobAccountId : index)}
            ListFooterComponent={this.renderFooter}
            onEndReachedThreshold={0.02}
            numColumns={this.isProductSearchOrFromQuotes() ? 1 : 2}
            onTouchStart={() => (this.onEndReachedCalledDuringMomentum = false)}
            onEndReached={() => {
              if (!this.onEndReachedCalledDuringMomentum && !this.props.isFrequentOrderedList) {
                this.props.handleMoreData();
                this.onEndReachedCalledDuringMomentum = true;
              }
            }}
            data={this.props.isFrequentOrderedList ? this.props.frequentlyOrderedList : this.props.data}
            bounces={false}
            contentContainerStyle={{
              flexGrow: 1,
              paddingTop: this.isProductSearchOrFromQuotes() ? 80 : 100,
            }}
            renderItem={(item, index) => this.searchListItem(item, index)}
            {...accessibility("orderItemsFlatList")}
            ListEmptyComponent={!this.props.loading ? this.renderMessageForNoProducts() : undefined}
            onScroll={e => scrollY.setValue(e.nativeEvent.contentOffset.y)}
          />
        </LoadingView>
      </>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  const data = R.pathOr([], ["product", "dataSearch", "products"], state);
  return {
    data,
    frequentlyOrderedList: state.frequentOrders.top40,
    count: state.cart.cartEntriesCount,
    loading: state.product.fetching || state.myList.fetching,
    facets: state.product.facets ?? [],
    // state.frequentOrders.fetching,
    totalCount: R.compose(R.reduce(R.add, 0), R.values, R.map(R.compose(parseFloat, R.prop("Quantity"))))(data) as number,
  };
};

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(OrderProductItem);
