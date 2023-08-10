import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import { FlatList, Image, InteractionManager, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { useDispatch, useSelector } from "react-redux";
import BigBlueHeader from "~root/Components/BigBlueHeader/BigBlueHeader";
import FbIcon from "~root/Components/FbIcon";
import GenericSearchFieldComponent from "~root/Components/GenericSearchFieldComponent";
import LoadingView from "~root/Components/LoadingView";
import MarketingTileCarousel from "~root/Components/MarketingTileCarouselComponent/MarketingTileCarousel";
import OfflineNotice from "~root/Components/OfflineNotice";
import OrderProductListItem from "~root/Components/OrderProductListItem";
import ShopByCategory from "~root/Components/ShopByCategory/ShopByCategory";
import { allProductsSearchText, FREQUENT_ORDERED } from "~root/Lib/AlertsHelper";
import { navigationalScreens } from "~root/Lib/BranchHelper";
import { accessibility, marketingTileInfoExtractor } from "~root/Lib/DataHelper";
import { onCameraPermission } from "~root/Lib/PermissionHelperLib";
import { useCashCustomerStatus } from "~root/Lib/QuoteHelper";
import { AnimationProvider } from "~root/Provider/AnimationProvider";
import { safeRender, withAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { FrequentOrderActions } from "~root/Reducers/FrequentOrderReducers";
import { MarketingTileActions } from "~root/Reducers/MarketingTileReducer";
import { OrderHistoryActions } from "~root/Reducers/OrderHistoryReducers";
import { Images } from "~root/Themes";
import style from "./LandingPageStyle";

interface StateProps {
  frequentlyOrderedList: any[];
  isFetchingFrequentlyOrdered: boolean;
  marketingTileData: any;
  stcToggleFlag: boolean;
}

const LandingPageScrollView = () => {
  const { stcToggleFlag, frequentlyOrderedList, isFetchingFrequentlyOrdered, marketingTileData } = useSelector<RootState, StateProps>(state => ({
    frequentlyOrderedList: state.frequentOrders?.top40,
    isFetchingFrequentlyOrdered: state.frequentOrders?.fetching,
    marketingTileData: state.marketingTile?.data,
    stcToggleFlag: state.stc?.stcToggleFlag,
  }));
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { CashCustomerStatus } = useCashCustomerStatus();

  const onHelp = useCallback(() => {
    Linking.openURL("https://placemakers.force.com/s/");
  }, []);

  const getItems = React.useCallback(() => {
    const features = [];
    if (stcToggleFlag && !CashCustomerStatus) {
      features.push({
        label: "Skip the counter",
        image: Images.stcLandingPageIcon,
        onPress: () => {
          dispatch(OrderHistoryActions.checkOrderStatusInDb());
        },
        testID: "skipTheCounterBtn",
      });
    }

    features.push({
      label: "Barcode Scan",
      image: Images.barcodeScanImage,
      onPress: () => {
        onCameraPermission().then(() => navigation.navigate("BarCodeScanner"));
      },
      testID: "barcodeButton",
    });

    features.push({
      label: "App Support",
      image: Images.appSupport,
      onPress: onHelp,
      testID: "helpButton",
    });
    return features;
  }, [stcToggleFlag, CashCustomerStatus]);

  const onTapAllProducts = useCallback(() => {
    navigation.navigate("OrderProduct", {
      categoryId: ":Sort By:category:root",
    });
  }, []);

  const renderItem = useCallback((accumulate: any[], item: any) => {
    accumulate.push(
      <TouchableOpacity onPress={item.onPress} style={style.itemStyle} {...accessibility(item.testID)} key={item.testID}>
        <Image style={style.imageStyle} resizeMode={"contain"} source={item.image} />
        <Text style={style.featureItemText}>{item.label}</Text>
      </TouchableOpacity>,
    );
    return accumulate;
  }, []);

  const onNavigate = useCallback(() => {
    navigation.navigate("OrderProduct", {
      isFrequentOrder: true,
    });
  }, []);

  const renderFrequentlyOrderedList = useCallback(() => {
    const isLoading = isFetchingFrequentlyOrdered;
    const data = frequentlyOrderedList;
    return (
      <View style={style.frequentlyOrderContainer}>
        <Text style={style.headingPlain}>{FREQUENT_ORDERED}</Text>
        <LoadingView isLoading={isLoading && data.length === 0}>
          <FlatList
            data={data ? data.slice(0, 10) : []}
            renderItem={({ item, index }) => {
              return <OrderProductListItem isLoading={isLoading} isGridView={true} item={item} isFrequentlyOrderedItem={true} index={index} />;
            }}
            horizontal={true}
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => (item ? item.SKU + item.JobAccountId : index)}
            key={"frequentlyOrderedList"}
            {...accessibility("frequentlyOrderedList")}
            contentContainerStyle={style.frequentlyOrderedList}
          />
        </LoadingView>
        {!isLoading && data?.length === 0 && (
          <Text style={style.frequentlyOrderedMessage}>Your top products will show up here - place an order today and see!</Text>
        )}
        {!isLoading && data?.length > 10 && (
          <TouchableOpacity onPress={onNavigate}>
            <Text style={style.viewAllFrequentlyOrdered}>View all</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }, [isFetchingFrequentlyOrdered, frequentlyOrderedList]);

  return (
    <ScrollView bounces={false} scrollEventThrottle={16}>
      <View style={style.marketingTileView}>
        {marketingTileInfoExtractor(marketingTileData).length > 0 && <MarketingTileCarousel marketingTileInfo={marketingTileData} />}
        <View style={style.frequentlyOrderContainer}>
          <ScrollView horizontal={true} style={style.featureList} showsHorizontalScrollIndicator={false}>
            {getItems().reduce((item, acc) => renderItem(item, acc), [])}
          </ScrollView>
        </View>
        {renderFrequentlyOrderedList()}
        <ShopByCategory />
        <TouchableOpacity {...accessibility("AllProductsBtn")} style={style.allProductsStyle} onPress={onTapAllProducts}>
          <View style={style.item}>
            <Text style={style.itemText} {...accessibility("AllProductsTxt")}>
              {"All products"}
            </Text>
            <FbIcon name={"ic_chevron"} style={style.iconStyle} />
          </View>
          <Divider />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const LandingPage: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      dispatch(MarketingTileActions.requestMarketingTiles());
    });
    return navigation.addListener("focus", () => {
      InteractionManager.runAfterInteractions(() => {
        dispatch(FrequentOrderActions.requestFrequentOrder());
      });
    });
  }, []);

  return (
    <AnimationProvider style={style.container}>
      <BigBlueHeader title={"Shop"}>
        <View style={style.searchFieldContainer}>
          <GenericSearchFieldComponent
            onPress={() => {
              navigation.navigate("SearchSuggestion");
            }}
            style={style.searchField}
            placeHolderText={allProductsSearchText}
            hasBarcodeIcon={true}
          />
        </View>
      </BigBlueHeader>
      <OfflineNotice />
      <LandingPageScrollView />
    </AnimationProvider>
  );
};

export default withAppender(safeRender(LandingPage, navigationalScreens.ShopScreen));
