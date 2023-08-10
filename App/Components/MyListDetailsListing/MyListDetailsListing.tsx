import * as R from "ramda";
import * as React from "react";
import { Animated, Text } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { connect } from "react-redux";
import LoadingView from "~root/Components/LoadingView";
import OrderProductListItem from "~root/Components/OrderProductListItem/OrderProductListItem";
import SwiperComponent from "~root/Components/SwiperComponent";
import styles from "~root/Containers/MyListDetailContainer/MyListDetailContainerStyle";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import { MyListActions } from "~root/Reducers/MyListReducers";
import { IItemListRequestParam } from "~root/Types/SearchAPITypes";
import RemoveButton from "../SwiperComponent/RemoveButton";
import localStyle from "./MyListDetailsListingStyle";

interface OwnProps {
  navigation: any;
  route: any;
  data: any[];
  scrollY: Animated.Value;
}

interface StateProps {
  isLoading: boolean;
  selectedBranch: string;
  selectedTradeAccount: string;
  selectedJobAccount: string;
}

interface DispatchProps {
  deleteItem: (param: IItemListRequestParam, callback: IAlertCallbacks) => void;
  resetList: () => void;
  requestList: () => void;
  requestListDetail: (name: string, index: number) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

const MyListDetailsListing: React.SFC<Props> = ({
  data,
  deleteItem,
  resetList,
  isLoading,
  navigation,
  route,
  requestList,
  requestListDetail,
  selectedJobAccount,
  selectedBranch,
  selectedTradeAccount,
  scrollY,
}: Props) => {
  const listName = route.params?.item?.listName;
  const isSearchedNav = !!route.params?.searchText ?? undefined;
  const renderHeader = R.always(
    <Text style={localStyle.productCount}>
      Products <Text style={localStyle.productCountItems}>({data.length} items)</Text>
    </Text>,
  );

  const itemRef = React.useRef(undefined);

  const listItem = ({ item, index }: any) => {
    let swiperRef;
    const deleteItemFunc = () =>
      deleteItem(
        { listName, skuList: [item.SKU] },
        {
          onSuccess: () =>
            Toast.show({
              text1: "Product removed",
              text2: "",
              type: "info",
              visibilityTime: 3000,
            }),
          onFailure: () =>
            Toast.show({
              type: "error",
              text1: "Failed to remove product",
              text2: "",
              visibilityTime: 3000,
            }),
        },
      );

    return (
      <SwiperComponent
        ref={ref => {
          swiperRef = ref;
        }}
        onFullSwipe={() => {
          deleteItemFunc();
        }}
        backView={
          <RemoveButton
            onPress={() => {
              swiperRef?.swipe?.();
              deleteItemFunc();
            }}
          />
        }
      >
        <OrderProductListItem ref={itemRef} isMyList={true} isGridView={false} item={item} index={index} removeItem={deleteItemFunc} />
      </SwiperComponent>
    );
  };

  React.useEffect(() => {
    const item = route.params?.item ?? {};
    requestListDetail(item?.listName);
    resetList();
  }, [selectedTradeAccount, selectedBranch, selectedJobAccount]);

  React.useEffect(() => {
    if (!isSearchedNav) {
      const item = route.params?.item ?? {};
      if (!isSearchedNav) {
        requestListDetail(item?.listName);
      }
      resetList();
    }
  }, []);

  return (
    <>
      <LoadingView style={styles.loadingView} isLoading={isLoading}>
        <KeyboardAwareFlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => (item ? item.SKU + "-" + item.JobAccountId : index)}
          onEndReachedThreshold={0.02}
          ListHeaderComponent={renderHeader}
          numColumns={1}
          data={data || []}
          renderItem={listItem}
          bounces={false}
          onScroll={e => scrollY.setValue(e.nativeEvent.contentOffset.y)}
          {...accessibility("orderItemsFlatList")}
        />
      </LoadingView>
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  isLoading: state.myList.fetching,
  selectedJobAccount: state.jobAccounts.selectedJobAccount?.JobName || "",
  selectedBranch: state.branchList.selectedBranch?.branchID || "",
  selectedTradeAccount: state.connectTrade.selectedTradeAccount.custId,
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  requestListDetail: name => dispatch(MyListActions.requestMyList(name)),
  deleteItem: (item, callback) => dispatch(MyListActions.deleteItem(item, callback)),
  requestList: () => dispatch(MyListActions.getAllList(undefined, {})),
  resetList: () => dispatch(MyListActions.clearNewList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyListDetailsListing);
