import * as R from "ramda";
import * as RA from "ramda-adjunct";
import React, { ReactElement } from "react";
import { View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import CustomIcon from "~root/Components/CustomIcon";
import FiltersSwitchSheet from "~root/Components/FiltersSwitchSheet";
import MainContainer from "~root/Components/MainContainer";
import OfflineNotice from "~root/Components/OfflineNotice";
import SmallHeader from "~root/Components/SmallHeader";
import { FREQUENT_ORDERED } from "~root/Lib/AlertsHelper";
import { BranchResponse, OrderTypes } from "~root/Lib/BranchHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { needAddressSelectionSkipping } from "~root/Lib/OrderSummaryHelper";
import { withAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { FrequentOrderActions } from "~root/Reducers/FrequentOrderReducers";
import { PixelActions } from "~root/Reducers/PixelReducer";
import { ProductActions } from "~root/Reducers/ProductReducers";
import { SearchSuggestionsActions } from "~root/Reducers/SearchSuggestionsReducers";
import { ApplicationStyles } from "~root/Themes";
import AppThemeContext from "~root/Themes/AppThemeContext";
import { ModalButtons } from "~root/Types/ComponentTypes/ModalView";
import { ISearchSolrParams } from "~root/Types/SearchAPITypes";
import OrderProductList from "./OrderProductItem";
import style from "./OrderProductStyles";

export interface OwnProps {}

export interface DispatchProps {
  clearProducts: () => void;
  frequentOrder: () => void;
  solrSearch: (param: ISearchSolrParams, callback: (page: number) => void) => void;
  reset: () => void;
  setTerm: (term: string) => void;
  logPixelEvent: (event: string, params: any) => void;
}

export interface StateProps {
  branches: BranchResponse[];
  currentQuery?: string;
  jobAccounts: any[];
  cartCount: number;
  orderType: OrderTypes;
  loadingSearch: boolean;
  searchPageCount: number;
  skipped: boolean;
  selectedTradeAccount: any;
  selectedJobAccount: any;
  selectedBranch: BranchResponse;
  facetValueName?: string;
  facets: any;
  isShowReset: boolean;
  loading: boolean;
}

export interface State {
  showBtn?: boolean;
  modalVisible: boolean;
  modalLabel: string;
  modalContent: ReactElement | undefined;
  modalButton: ModalButtons[];
  listText: string;
  currentPage: number;
  isFrequentOrder?: boolean;
  filtersSwitchSheet: SheetState;
  selectedFilterName: string;
  facetQuery: string;
  categoryId: string;
  isApiRefresh: boolean;
}

type Props = OwnProps & DispatchProps & StateProps & NavigationScreenProp<any, any>;

export const OrderProductContext = React.createContext({ setIsApiRefresh: () => {} });

class OrderProduct extends React.Component<Props, State> {
  private orderList: any;
  private focusSubscription: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      showBtn: true,
      modalVisible: false,
      modalButton: [],
      modalContent: undefined,
      modalLabel: "",
      listText: "",
      currentPage: 0,
      isFrequentOrder: props.route.params?.isFrequentOrder ?? false,
      filtersSwitchSheet: SheetState.CLOSED,
      selectedFilterName: "",
      facetQuery: "",
      categoryId: "",
      isApiRefresh: true,
    };
  }
  public setIsApiRefresh = value => this.setState(prevState => ({ isApiRefresh: value }));

  public componentDidMount() {
    this.focusSubscription = this.props.navigation.addListener("focus", (payload: any) => {
      if (this.state.isApiRefresh) {
        this.setState({
          categoryId: this.props.route.params?.categoryId ?? "",
        });

        if (!this.state.isFrequentOrder) {
          this.props.clearProducts();
          this.performSearch(this.props.route.params?.categoryId ?? "");
        }
      }
      this.setIsApiRefresh(true);
    });
  }

  public componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    if (
      nextProps.selectedJobAccount !== this.props.selectedJobAccount ||
      nextProps.selectedTradeAccount !== this.props.selectedTradeAccount ||
      nextProps.selectedBranch.branchID !== this.props.selectedBranch.branchID
    ) {
      this.performSearch(this.props.currentQuery || "", true);
    }
  }

  public componentWillUnmount() {
    this.focusSubscription();
  }

  public performSearch(categoryIdOrSearch: string, isReplaceSearchTerm?: boolean) {
    if (this.isSearchTextPassed()) {
      const searchTerm = this.props.route.params?.searchText ?? "";
      this.props.logPixelEvent("pageview", {
        title: "Search",
        ptype: "search",
        search_term: searchTerm,
      });
      this.props.solrSearch(
        {
          query: isReplaceSearchTerm ? categoryIdOrSearch : searchTerm,
          currentPage: "0",
        },
        page => this.setState({ currentPage: page }),
      );
    } else if (this.state.isFrequentOrder) {
      this.props.frequentOrder();
    } else {
      this.showAllProducts(categoryIdOrSearch);
    }
  }

  public isSearchTextPassed(): boolean {
    return R.hasPath(["route", "params", "searchText", "length"], this.props);
  }

  public isFromQuotes(): boolean {
    return R.pathOr(false, ["route", "params", "isQuotes"], this.props);
  }

  public isCategoryPassed(): boolean {
    return R.hasPath(["route", "params", "categoryId", "length"], this.props);
  }

  public getCategoryName(): string {
    return R.pathOr("", ["route", "params", "categoryName"], this.props);
  }

  public showAllProducts(categoryId: string) {
    const temp = categoryId?.split(":");
    // FIXME fix analytics after requirement completion
    this.props.logPixelEvent("pageview", {
      ptype: "category",
      cat: "root",
      cat_id: temp[temp?.length - 1],
    });
    this.props.clearProducts();
    this.props.solrSearch({ query: categoryId, currentPage: "0" }, page => this.setState({ currentPage: page }));
  }

  public searchResultCheck = () => {
    if (this.isSearchTextPassed()) {
      return (
        <AppThemeContext.Provider value={"light"}>
          <SmallHeader
            onBackPress={this.isFromQuotes() ? () => this.props.navigation.pop(2) : undefined}
            style={ApplicationStyles.noShadow}
            actionItem={
              <View {...accessibility("searchIcon")}>
                <CustomIcon
                  name={"close"}
                  style={style.rightItemStyle}
                  onPress={() => {
                    const popCount = this.props.route.params?.popCount;
                    this.props.navigation.pop(popCount ? popCount : 2);
                  }}
                />
              </View>
            }
            title={"Search"}
          />
        </AppThemeContext.Provider>
      );
    } else {
      let title = "Products";

      if (this.state.isFrequentOrder) {
        title = FREQUENT_ORDERED;
      } else if (this.isCategoryPassed() && this.props.facetValueName !== "root") {
        title = this.props.facetValueName || this.getCategoryName() || title;
      }

      title = this.props.loading ? "" : title;
      return <SmallHeader style={ApplicationStyles.noShadow} navigation={this.props.navigation} title={title} />;
    }
  };

  public render() {
    const searchTerm = this.props.route.params?.searchText;
    const { setIsApiRefresh } = this;
    return (
      <OrderProductContext.Provider value={{ setIsApiRefresh }}>
        <MainContainer>
          {this.searchResultCheck()}
          <OfflineNotice />
          <OrderProductList
            ref={ref => (this.orderList = ref)}
            navigation={this.props.navigation}
            page={this.state.currentPage}
            isQuotes={this.isFromQuotes()}
            searchTerm={this.isSearchTextPassed() ? R.pathOr("", ["route", "params", "searchText"], this.props) : ""}
            handleMoreData={() => {
              if (this.state.currentPage < this.props.searchPageCount) {
                let queryStr = "";
                if (this.props.isShowReset && this.state.facetQuery.length > 0) {
                  queryStr = this.state.facetQuery;
                } else if (this.state.categoryId?.length > 0) {
                  queryStr = this.state.categoryId;
                } else {
                  queryStr = searchTerm;
                }
                this.props.solrSearch(
                  {
                    query: queryStr,
                    currentPage: (this.state.currentPage + 1).toString(),
                  },
                  RA.noop,
                );

                this.setState({ currentPage: this.state.currentPage + 1 });
              }
            }}
            isAccountSelectionHidden={this.props.route.params?.hideAccountSelection}
            isFrequentOrderedList={this.state.isFrequentOrder}
            onPressFacet={(selectedName: string) =>
              this.setState({
                selectedFilterName: selectedName,
                filtersSwitchSheet: SheetState.EXPANDED,
              })
            }
            isCategory={!!this.state.categoryId}
            currentQuery={!!this.state.categoryId ? this.state.categoryId : searchTerm}
            resetAllTapped={() =>
              this.setState({
                facetQuery: "",
              })
            }
            browseAllTapped={() => {
              const categoryId = ":Sort By:category:root";
              this.setState({
                categoryId,
              });
              this.props.navigation.setParams({
                searchText: undefined,
                categoryId,
              });
              setTimeout(() => {
                this.performSearch(categoryId);
              });
            }}
          />
          <FiltersSwitchSheet
            sheetState={this.state.filtersSwitchSheet}
            closeSheet={(updatedQuery: string) => {
              this.setState({
                filtersSwitchSheet: SheetState.CLOSED,
                facetQuery: updatedQuery,
              });
            }}
            selectedName={this.state.selectedFilterName}
            navigation={this.props.navigation}
            categoryId={this.state.categoryId?.length > 0 ? this.state.categoryId : searchTerm}
            currentQuery={this.state.facetQuery}
          />
        </MainContainer>
      </OrderProductContext.Provider>
    );
  }
}

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  solrSearch: (param, callback) => dispatch(ProductActions.requestSearchSolr(param, callback)),
  clearProducts: () => dispatch(ProductActions.clearProducts()),
  reset: () => dispatch(SearchSuggestionsActions.resetFields()),
  setTerm: term => dispatch(SearchSuggestionsActions.setTerm(term)),
  frequentOrder: () => dispatch(FrequentOrderActions.requestFrequentOrder()),
  logPixelEvent: (event, params) => dispatch(PixelActions.pixelRequest(event, params)),
});

const mapStateToProps = (state: RootState, ownProps: Props): StateProps => ({
  facetValueName: state.product.data?.facetValueName || state.product.dataSearch?.facetValueName || "",
  cartCount: state.cart.cartEntriesCount,
  skipped: needAddressSelectionSkipping(state),
  searchPageCount: R.pathOr(0, ["product", "dataSearch", "pages"], state),
  orderType: state.branchList.selectedOrderType,
  loadingSearch: state.product.fetching,
  branches: state.branchList.dataDepots || [],
  jobAccounts: state.jobAccounts.data || [],
  selectedBranch: state.branchList.selectedBranch,
  selectedJobAccount: state.jobAccounts.selectedJobAccount,
  selectedTradeAccount: state.connectTrade.selectedTradeAccount,
  marketingCategoryTitle: state.product.facetValueName || undefined,
  facets: state.product.facets,
  currentQuery: state.product.dataSearch?.currentQuery,
  isShowReset: state.product.isShowReset,
  loading: state.product.fetching,
});
export default connect(mapStateToProps, mapDispatchToProps)(withAppender(OrderProduct));
