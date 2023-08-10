import { Text } from "native-base";
import * as R from "ramda";
import React, { Component } from "react";
import { Animated, FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CustomIcon from "~root/Components/CustomIcon";
import HeaderWithSearchBarComponent from "~root/Components/HeaderWithSearchBarComponent";
import LoadingView from "~root/Components/LoadingView";
import MainContainer from "~root/Components/MainContainer";
import OfflineNotice from "~root/Components/OfflineNotice";
import OrderProductListItem from "~root/Components/OrderProductListItem";
import ScrollAnimatedHeaderComponent from "~root/Components/ScrollAnimatedHeaderComponent";
import SmallHeader from "~root/Components/SmallHeader";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { BranchResponse } from "~root/Lib/BranchHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { withAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { ProductActions } from "~root/Reducers/ProductReducers";
import style from "./SuperCategoryStyle";

interface DispatchProps {
  requestFrequentOrderedProducts: (id: string, callback: IAlertCallbacks) => void;
}

interface StateProps {
  isFetchingFrequentlyOrdered: boolean;
  selectedTradeAccount: any;
  selectedJobAccount: any;
  selectedBranch: BranchResponse;
}

interface State {
  topProducts: any[];
  listData: any[];
}

type Props = StateProps & DispatchProps & NavigationScreenProps<{ data: any }>;

class SuperCategory extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      listData: [],
      topProducts: [],
    };
  }

  public componentDidMount() {
    this.getFrequentOrders();
    const subCats = this.props.route.params?.subCategories;
    const listData = [];
    if (subCats?.subcategories?.length > 0) {
      listData.push({
        type: subCats?.type,
        id: subCats?.id,
        name: `All ${subCats?.name}`,
        url: subCats?.url,
      });
    }
    listData.push(...subCats?.subcategories);
    this.setState({
      listData,
    });
  }

  public componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    if (this.props.selectedBranch?.branchCode !== nextProps.selectedBranch?.branchCode) {
      this.getFrequentOrders();
    }
  }

  public getFrequentOrders = () => {
    this.props.requestFrequentOrderedProducts(this.props.route.params.subCategories.id, {
      onSuccess: (products: any[]) => {
        this.setState({
          topProducts: products,
        });
      },
    });
  };

  public renderAnimatedHeader = (scrollY: Animated.Value) => {
    return (
      <ScrollAnimatedHeaderComponent scrollY={scrollY}>
        <HeaderWithSearchBarComponent navigation={this.props.navigation} />
      </ScrollAnimatedHeaderComponent>
    );
  };

  public renderItems = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[style.categoryItemStyle, index + 1 === this.state.listData.length ? { borderBottomWidth: 0 } : undefined]}
        onPress={() => {
          if (index === 0) {
            this.props.navigation.navigate("OrderProduct", {
              categoryId: `:Sort By:category:${item?.id}`,
              categoryName: item?.name,
            });
          } else {
            const hasNoMoreCategories = R.compose(R.any(R.compose(R.equals(0), R.length, R.prop("subcategories"))), R.prop("subcategories"))(item);
            if (!hasNoMoreCategories) {
              this.props.navigation.push("SuperCategory", {
                subCategories: item,
              });
            } else {
              this.props.navigation.navigate("OrderProduct", {
                categoryId: `:Sort By:category:${item?.id}`,
                categoryName: item?.name,
              });
            }
          }
        }}
      >
        <Text style={style.catName}>{item.name}</Text>
        <CustomIcon style={style.icon} name={"chevron-right"} />
      </TouchableOpacity>
    );
  };

  public render() {
    const scrollY = new Animated.Value(0);
    const isLoading = this.props.isFetchingFrequentlyOrdered;

    return (
      <MainContainer style={style.containerStyle}>
        <SmallHeader title={this.props.route.params.subCategories.name} navigation={this.props.navigation} style={style.smallHeaderStyle} />
        <OfflineNotice />
        <ScrollView>
          {this.renderAnimatedHeader(scrollY)}
          <View style={style.frequentlyOrderContainer}>
            <Text style={style.headingPlain}>Top Products</Text>
            <LoadingView isLoading={isLoading}>
              <FlatList
                data={this.state.topProducts}
                renderItem={({ item, index }) => {
                  return (
                    <OrderProductListItem
                      isLoading={isLoading}
                      isGridView={true}
                      item={item}
                      isFrequentlyOrderedItem={true}
                      index={index}
                      productDescriptionProps={{
                        numberOfLines: 3,
                      }}
                    />
                  );
                }}
                horizontal={true}
                nestedScrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => (item ? item.SKU + item.JobAccountId : index)}
                key={"frequentlyOrderedList"}
                {...accessibility("frequentlyOrderedList")}
                contentContainerStyle={style.frequentlyOrderedList}
                ListEmptyComponent={props => {
                  if (!isLoading) {
                    return <Text style={style.frequentlyOrderedMessage}>Your top products will show up here - place an order today and see!</Text>;
                  } else {
                    return null;
                  }
                }}
              />
            </LoadingView>
          </View>
          <FlatList data={this.state.listData} renderItem={this.renderItems} />
        </ScrollView>
      </MainContainer>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  isFetchingFrequentlyOrdered: state.product.fetchingTopCategoryProducts,
  selectedBranch: state.branchList.selectedBranch,
  selectedJobAccount: state.jobAccounts.selectedJobAccount,
  selectedTradeAccount: state.connectTrade.selectedTradeAccount,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  requestFrequentOrderedProducts: (id, callback) => dispatch(ProductActions.requestTopCategoryProducts(id, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withAppender(SuperCategory));
