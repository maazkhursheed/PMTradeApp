import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as R from "ramda";
import React from "react";
import { Platform, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { connect, useSelector } from "react-redux";
import BadgeButtonCount from "~root/Components/BadgeButtonCount";
import BranchDetail from "~root/Components/BranchDetail/BranchDetail";
import CustomIcon from "~root/Components/CustomIcon";
import GetInTouch from "~root/Components/GetInTouch/GetInTouch";
import SolutionsComponent from "~root/Components/SolutionsComponent";
import AccountDetailsContainer from "~root/Containers/AccountDetailsContainer/AccountDetailsContainer";
import AddToExisting from "~root/Containers/AddToExisting";
import BarCodeScannerContainer from "~root/Containers/BarCodeScannerContainer";
import CartView from "~root/Containers/CartView/CartView";
import ChangeDateContainer from "~root/Containers/ChangeDateContainer/ChangeDateContainer";
import ChangeOrderItemContainer from "~root/Containers/ChangeOrderItemsContainer";
import ChangeStatusContainer from "~root/Containers/ChangeStatusContainer";
import CompanyEditQuoteContainer from "~root/Containers/CompanyEditQuoteContainer/CompanyEditQuoteContainer";
import CustomerDetailsContainer from "~root/Containers/CustomerDetailsContainer";
import DeliveryOptionsContainer from "~root/Containers/DeliveryOptions/DeliveryOptionsContainer";
import EditTeamMemberContainer from "~root/Containers/EditTeamMemberContainer/EditTeamMemberContainer";
import FulfilmentDetailsContainer from "~root/Containers/FulfilmentDetailsContainer";
import JobAccountsContainer from "~root/Containers/JobAccountsContainer/JobAccountsContainer";
import JobsContainer from "~root/Containers/JobsContainer";
import LabourSectionContainer from "~root/Containers/LabourSectionContainer";
import LabourSectionDetailContainer from "~root/Containers/LabourSectionDetailContainer";
import LandingPage from "~root/Containers/LandingPageContainer/LandingPage";
import ManageTeamContainer from "~root/Containers/ManageTeamContainer";
import SelectContactContainer from "~root/Containers/ManageTeamContainer/SelectContactContainer";
import MaterialsListContainer from "~root/Containers/MaterialsListContainer/MaterialsListContainer";
import MaterialsSectionContainer from "~root/Containers/MaterialsSectionContainer/MaterialsSectionContainer";
import MaterialsSOBList from "~root/Containers/MaterialsSOBList";
import MyListDetailContainer from "~root/Containers/MyListDetailContainer/MyListDetailContainer";
import MyListSearchSuggestionContainer from "~root/Containers/MyListSearchSuggestionContainer/MyListSearchSuggestionContainer";
import MyProfileBranchSelection from "~root/Containers/MyProfileBranchSelection/MyProfileBranchSelection";
import MyProfileContainer from "~root/Containers/MyProfileContainer/MyProfileContainer";
import MyProfileJobAccountSelection from "~root/Containers/MyProfileJobAccountSelection/MyProfileJobAccountSelection";
import MyProfileSolutionDetailContainer from "~root/Containers/MyProfileSolutionDetailContainer/MyProfileSolutionDetailContainer";
import MyProfileSolutionsContainer from "~root/Containers/MyProfileSolutionsContainer/MyProfileSolutionsContainer";
import MyProfileTradeAccountSelection from "~root/Containers/MyProfileTradeAccountSelection";
import MyProfileUserDetailsContainer from "~root/Containers/MyProfileUserDetailsContainer/MyProfileUserDetailsContainer";
import NotificationsContainer from "~root/Containers/NotificationsContainer/NotificationsContainer";
import OptionalRequirements from "~root/Containers/OptionalRequirements";
import OrderAndDeliveries from "~root/Containers/OrderAndDeliveries/OrderAndDeliveries";
import OrderDetails from "~root/Containers/OrderDetails/OrderDetails";
import OrderProcessingContainer from "~root/Containers/OrderProcessingContainer/OrderProcessingContainer";
import OrderProduct from "~root/Containers/OrderProductContainer/OrderProduct";
import ProductDetails from "~root/Containers/ProductDetails/ProductDetails";
import ProductOverview from "~root/Containers/ProductOverviewContainer/ProductOverview";
import ProductSpecification from "~root/Containers/ProductOverviewContainer/ProductSpecification";
import ProductSupportingDocuments from "~root/Containers/ProductOverviewContainer/ProductSupportingDocuments";
import ProductWarranty from "~root/Containers/ProductOverviewContainer/ProductWarranty";
import QrCodeContainer from "~root/Containers/QrCodeContainer/QrCodeContainer";
import QuoteMediaContainer from "~root/Containers/QuoteMediaContainer/QuoteMediaContainer";
import QuotesDetailContainer from "~root/Containers/QuotesDetailContainer/QuotesDetailContainer";
import ReviewQuoteContainer from "~root/Containers/ReviewQuoteContainer/ReviewQuoteContainer";
import ReviewScreen from "~root/Containers/ReviewScreen/ReviewScreen";
import SearchSuggestionContainer from "~root/Containers/SearchSuggestionContainer/SearchSuggestionContainer";
import Solutions from "~root/Containers/SolutionsContainer/Solutions";
import SortAndFilter from "~root/Containers/SortAndFilterComponent/SortAndFilter";
import StagesOfBuildContainer from "~root/Containers/StagesOfBuildContainer";
import StagesOfBuildProductListContainer from "~root/Containers/StagesOfBuildProductListContainer/StagesOfBuildProductListContainer";
import STCConfirmOrderPurchaseProof from "~root/Containers/STCConfirmOrderPurchaseProof/STCConfirmOrderPurchaseProof";
import STCEnterDetails from "~root/Containers/STCEnterDetails/STCEnterDetails";
import STCGatePass from "~root/Containers/STCGatePassContainer/STCGatePass";
import STCOrderInProgress from "~root/Containers/STCOrderInProgress/STCOrderInProgress";
import STCReviewOrders from "~root/Containers/STCReviewOrderContainer/STCReviewOrders";
import SuperCategory from "~root/Containers/SuperCategoryContainer/SuperCategory";
import TermsAndConditionsView from "~root/Containers/TermsAndConditionsView/TermsAndConditionsView";
import { accessibility } from "~root/Lib/DataHelper";
import { useKeyboard } from "~root/Lib/KeyboardHelper";
import { hasPermissionFromArray } from "~root/Lib/PermissionHelperLib";
import { STCEventScreenNames } from "~root/Lib/STCHelper";
import { safeRender, withAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import colors from "~root/Themes/Colors";
import { PermissionTypes } from "~root/Types/Permissions";
import MyListsContainer from "../Containers/MyListsContainer";
import OrderConfirmationScreen from "../Containers/OrderConfirmationScreen/OrderConfirmationScreen";
import RelatedProductsDetailsContainer from "../Containers/RelatedProductsDetailsContainer";
import SendQuoteSuccessContainer from "../Containers/SendQuoteSuccessContainer/SendQuoteSuccessContainer";
import SpecialOrderInfoScreenContainer from "../Containers/SpecialOrderInfoContanier/SpecialOrderInfoScreenContainer";
import ViewQuoteContainer from "../Containers/ViewQuoteContainer/ViewQuoteContainer";
/**
 * This Stack Navigator contains order and deliveries list screen and order details screen with sort and filter screen.
 */

const OrderListStack = createNativeStackNavigator();

function OrderList() {
  return (
    <OrderListStack.Navigator initialRouteName="MainOrderList" screenOptions={{ headerShown: false }}>
      <OrderListStack.Screen name="MainOrderList" component={OrderAndDeliveries} />
      <OrderListStack.Screen name="Filter" component={SortAndFilter} />
    </OrderListStack.Navigator>
  );
}

/**
 * This Stack Navigator contains order details screen.
 */

const OrderDetailsStack = createNativeStackNavigator();

function OrderDetailsComp() {
  return (
    <OrderDetailsStack.Navigator initialRouteName="OrderDetails" screenOptions={{ headerShown: false }}>
      <OrderDetailsStack.Screen name="ChangeStatus" component={ChangeStatusContainer} />
      <OrderDetailsStack.Screen name="ChangeDate" component={ChangeDateContainer} />
      <OrderDetailsStack.Screen name="ChangeOrderItem" component={ChangeOrderItemContainer} />
      <OrderDetailsStack.Screen name="OrderDetails" component={OrderDetails} />
    </OrderDetailsStack.Navigator>
  );
}

/**
 * This stack navigator contains product details screen like product detail, overview, warranty, supportingDocument and specification of product item
 */

const ProductDetailsStack = createNativeStackNavigator();

function ProductDetailsComp() {
  return (
    <ProductDetailsStack.Navigator initialRouteName="MainPDP" screenOptions={{ headerShown: false }}>
      <ProductDetailsStack.Screen name="MainPDP" component={ProductDetails} />
      <ProductDetailsStack.Screen name="ProductOverview" component={ProductOverview} />
      <ProductDetailsStack.Screen name="ProductWarranty" component={ProductWarranty} />
      <ProductDetailsStack.Screen name="SupportingDocument" component={ProductSupportingDocuments} />
      <ProductDetailsStack.Screen name="ProductSpecification" component={ProductSpecification} />
    </ProductDetailsStack.Navigator>
  );
}

/**
 * This stack navigator contains more option screens like solution screen.
 */
const MoreStack = createNativeStackNavigator();

function More() {
  return (
    <MoreStack.Navigator initialRouteName="Solutions" screenOptions={{ headerShown: false }}>
      <MoreStack.Screen name="Solutions" component={Solutions} />
      <MoreStack.Screen name="SolutionsDetails" component={SolutionsComponent} />
      <MoreStack.Screen name="Jobs" component={JobAccountsContainer} />
    </MoreStack.Navigator>
  );
}

/**
 * This stack navigator contains main order journey for placing any type of order on app
 */
const LandingPageStack = createNativeStackNavigator();

function LandingPageComp() {
  return (
    <LandingPageStack.Navigator initialRouteName="LandingPage" screenOptions={{ headerShown: false }}>
      <LandingPageStack.Screen name="LandingPage" component={LandingPage} />
      <LandingPageStack.Screen name="SuperCategory" component={SuperCategory} />
      <LandingPageStack.Screen name="OrderProduct" component={OrderProduct} />
      <LandingPageStack.Screen name="Solutions" component={More} />
    </LandingPageStack.Navigator>
  );
}

const MaterialsSectionStack = createNativeStackNavigator();

function MaterialSectionPage() {
  return (
    <MaterialsSectionStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"MaterialsStageScreen"}>
      <MaterialsSectionStack.Screen name={"MaterialsStageScreen"} component={MaterialsSOBList} />
      <MaterialsSectionStack.Screen name={"MaterialsScreen"} component={MaterialsSectionContainer} />
      <MaterialsSectionStack.Screen name={"MaterialsList"} component={MaterialsListContainer} />
      <MaterialsSectionStack.Screen name="SearchSuggestion" component={SearchSuggestionContainer} />
      <MaterialsSectionStack.Screen name="SearchResults" component={OrderProduct} initialParams={{ hideAccountSelection: true, isQuotes: true }} />
    </MaterialsSectionStack.Navigator>
  );
}

/**
 * This stack navigator contains main order journey for placing any type of order on app
 */
const JobsPageStack = createNativeStackNavigator();

function JobsPage() {
  return (
    <JobsPageStack.Navigator initialRouteName="JobsLanding" screenOptions={{ headerShown: false }}>
      <JobsPageStack.Screen name="QuoteDetails" component={QuotesDetailContainer} />
      <JobsPageStack.Screen name="JobsLanding" component={JobsContainer} />
      <JobsPageStack.Screen name="StagesOfBuild" component={StagesOfBuildContainer} />
      <JobsPageStack.Screen name="StagesOfBuildProductList" component={StagesOfBuildProductListContainer} />
      <JobsPageStack.Screen name="SearchSuggestion" component={SearchSuggestionContainer} />
      <JobsPageStack.Screen name="SearchResults" component={OrderProduct} initialParams={{ hideAccountSelection: true }} />
      <JobsPageStack.Screen name="MaterialsScreen" component={MaterialSectionPage} />
      <JobsPageStack.Screen name={"LabourScreen"} component={LabourSectionContainer} />
      <JobsPageStack.Screen name={"LabourSectionDetailScreen"} component={LabourSectionDetailContainer} />
      <JobsPageStack.Screen name={"CustomerDetailsScreen"} component={CustomerDetailsContainer} />
      <JobsPageStack.Screen name="ReviewQuoteScreen" component={ReviewQuoteContainer} />
      <JobsPageStack.Screen name="ViewQuoteScreen" component={ViewQuoteContainer} />
      <JobsPageStack.Screen name="CompanyEditQuoteContainer" component={CompanyEditQuoteContainer} />
      <JobsPageStack.Screen name="TermsAndConditionsView" component={TermsAndConditionsView} />
      <JobsPageStack.Screen name={"MaterialsList"} component={MaterialsListContainer} />
      <JobsPageStack.Screen name="SendQuoteSuccessContainer" component={SendQuoteSuccessContainer} />
      <JobsPageStack.Screen name={"QuoteMediaContainer"} component={QuoteMediaContainer} />
    </JobsPageStack.Navigator>
  );
}

/**
 *  This stack navigator contains screens for managing the team member like send, update and edit invite screens.
 */

const ManageTeamStack = createNativeStackNavigator();

function ManageTeam() {
  return (
    <ManageTeamStack.Navigator initialRouteName="MainTeams" screenOptions={{ headerShown: false }}>
      <ManageTeamStack.Screen name="MainTeams" component={ManageTeamContainer} />
      <ManageTeamStack.Screen name="SelectContact" component={SelectContactContainer} />
      <ManageTeamStack.Screen name="EditMember" component={EditTeamMemberContainer} />
    </ManageTeamStack.Navigator>
  );
}

/**
 * This stack navigator contains my list screens for searching with in the list and detail of my list
 */
const MyListStack = createNativeStackNavigator();

function MyList() {
  return (
    <MyListStack.Navigator initialRouteName="MyLists" screenOptions={{ headerShown: false }}>
      <MyListStack.Screen name="MyLists" component={MyListsContainer} />
      <MyListStack.Screen name="MyListDetail" component={MyListDetailContainer} />
      <MyListStack.Screen name="MyListSearchSuggestion" component={MyListSearchSuggestionContainer} />
    </MyListStack.Navigator>
  );
}

const MyProfileStack = createNativeStackNavigator();

function MyProfile() {
  return (
    <MyProfileStack.Navigator initialRouteName="MyProfileSelection" screenOptions={{ headerShown: false }}>
      <MyProfileStack.Screen name="MyProfileSelection" component={MyProfileContainer} />
      <MyProfileStack.Screen name="GetInTouch" component={GetInTouch} />
      <MyProfileStack.Screen name="MyProfileBranchSelection" component={MyProfileBranchSelection} />
      <MyProfileStack.Screen name="MyProfileJobAccountSelection" component={MyProfileJobAccountSelection} />
      <MyProfileStack.Screen name="MyProfileTradeAccountSelection" component={MyProfileTradeAccountSelection} />
      <MyProfileStack.Screen name="UserDetails" component={MyProfileUserDetailsContainer} />
      <MyProfileStack.Screen name="MyProfileSolutionsContainer" component={MyProfileSolutionsContainer} />
      <MyProfileStack.Screen name="MyProfileSolutionDetailContainer" component={MyProfileSolutionDetailContainer} />
      <MyProfileStack.Screen name="OrderProduct" component={OrderProduct} />
    </MyProfileStack.Navigator>
  );
}

const CartStack = createNativeStackNavigator();

function MyCart() {
  return (
    <CartStack.Navigator initialRouteName={"CartMain"} screenOptions={{ headerShown: false }}>
      <CartStack.Screen name="CartMain" component={CartView} />
      <CartStack.Screen name="OrderProduct" component={OrderProduct} />
      <CartStack.Screen name="DeliveryOptions" component={DeliveryOptionsContainer} />
      <CartStack.Screen name="AddToExisting" component={AddToExisting} />
      <CartStack.Screen name="OrderReview" component={ReviewScreen} />
      <CartStack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
      <CartStack.Screen name="FulfilmentDetails" component={FulfilmentDetailsContainer} />
      <CartStack.Screen name="OptionalRequirements" component={OptionalRequirements} />
      <CartStack.Screen name="AccountDetails" component={AccountDetailsContainer} />
      <CartStack.Screen name="OrderProcessing" component={OrderProcessingContainer} />
    </CartStack.Navigator>
  );
}

/**
 * This navigator contains all possible screens from bottom bar navigation of app
 */
const DashboardTab = createBottomTabNavigator();

function DashboardTabNav() {
  const navigation = useNavigation();
  const { isKeyboardVisible } = useKeyboard();

  const { availablePermissions, cartCount, currentTabIndex } = useSelector((state: RootState) => ({
    availablePermissions: state.permission.availablePermissions,
    cartCount: state.cart.cartEntriesCount,
    currentTabIndex: state.appDetail.currentTabIndex,
  }));

  const getDashboardTabs = () => {
    const getState = R.path(["routes", "0", "state"], navigation.getState());
    const routeIndex = R.path(["index"], getState);
    const routesArray = R.path(["routeNames"], getState);

    if (routesArray) {
      // @ts-ignore
      const routeName = routesArray[routeIndex];
      if (
        (routeName === "Express" || routeName === "CartView") &&
        !hasPermissionFromArray([PermissionTypes.PlaceOrders, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner], availablePermissions)
      ) {
        setTimeout(() => navigation.navigate("OrderDeliveries"), 0);
      } else if (routeName === "ManageTeam" && !hasPermissionFromArray([PermissionTypes.UserAdmin, PermissionTypes.AccountOwner], availablePermissions)) {
        setTimeout(() => navigation.navigate("OrderDeliveries"), 0);
      } else if (
        routeName === "Jobs" &&
        !hasPermissionFromArray([PermissionTypes.UserAdmin, PermissionTypes.AccountOwner, PermissionTypes.ViewEstimatesGroup], availablePermissions)
      ) {
        setTimeout(() => navigation.navigate("OrderDeliveries"), 0);
      }
    }
    return (
      <>
        {hasPermissionFromArray([PermissionTypes.PlaceOrders, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner], availablePermissions) && (
          <DashboardTab.Screen name="Express" component={LandingPageComp} />
        )}
        <DashboardTab.Screen name="MyLists" component={MyList} />
        <DashboardTab.Screen name="OrderDeliveries" component={OrderList} />
        {hasPermissionFromArray([PermissionTypes.UserAdmin, PermissionTypes.AccountOwner, PermissionTypes.ViewEstimatesGroup], availablePermissions) && (
          <DashboardTab.Screen name="Jobs" component={JobsPage} />
        )}
        {hasPermissionFromArray([PermissionTypes.UserAdmin, PermissionTypes.AccountOwner], availablePermissions) && (
          <DashboardTab.Screen name="ManageTeam" component={ManageTeam} />
        )}
        {hasPermissionFromArray([PermissionTypes.PlaceOrders, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner], availablePermissions) && (
          <DashboardTab.Screen name="CartView" component={MyCart} options={{ unmountOnBlur: true }} />
        )}
      </>
    );
  };
  return (
    <DashboardTab.Navigator
      initialRouteName="OrderDeliveries"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: Platform.OS === "android",
        tabBarIcon: ({ focused }) => {
          const iconName =
            route.name === "Express"
              ? "store"
              : route.name === "MyLists"
              ? "my-list"
              : route.name === "OrderDeliveries"
              ? "orders"
              : route.name === "ManageTeam"
              ? "teams"
              : route.name === "CartView"
              ? "cart"
              : "Icon-Jobs";

          const accessibilityProps =
            route.name === "Express"
              ? { ...accessibility("shopIcon") }
              : route.name === "MyLists"
              ? { ...accessibility("myListIcon") }
              : route.name === "OrderDeliveries"
              ? { ...accessibility("dashboardIcon") }
              : route.name === "ManageTeam"
              ? { ...accessibility("teamIcon") }
              : route.name === "CartView"
              ? { ...accessibility("cartIcon") }
              : { ...accessibility("jobsIcon") };

          return (
            <View>
              <CustomIcon {...accessibilityProps} name={iconName} size={30} color={focused ? colors.darkBlue : colors.lightGrey} />
              {route.name === "CartView" && !!cartCount && (
                <BadgeButtonCount
                  {...accessibility("badgeCountContainer")}
                  style={{ borderColor: Colors.white, right: -15, top: isKeyboardVisible ? 0 : -8 }}
                  badgeCount={cartCount}
                />
              )}
            </View>
          );
        },
        tabBarLabel:
          route.name === "Express"
            ? "Shop"
            : route.name === "MyLists"
            ? "My Lists"
            : route.name === "OrderDeliveries"
            ? "My Orders"
            : route.name === "ManageTeam"
            ? "Team"
            : route.name === "CartView"
            ? "Cart"
            : route.name,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarActiveTintColor: colors.darkBlue,
        tabBarInactiveTintColor: colors.darkGrey,
      })}
    >
      {getDashboardTabs()}
    </DashboardTab.Navigator>
  );
}

/**
 * This stack navigator contains screens for skip the counter feature of app
 */
const SkipTheCounterStack = createNativeStackNavigator();

const skipTheCounterStack = ({ nav }: { nav?: STCEventScreenNames }) => {
  if (!nav) {
    return null;
  }
  const getScreen = () => {
    switch (nav?.screen) {
      case STCEventScreenNames.GatePass:
        return <SkipTheCounterStack.Screen name="STCGatePass" component={STCGatePass} initialParams={nav?.params} />;
      case STCEventScreenNames.ConfirmOrderPurchaseProof:
        return <SkipTheCounterStack.Screen name="STCConfirmOrderPurchaseProof" component={STCConfirmOrderPurchaseProof} initialParams={nav?.params} />;
      case STCEventScreenNames.EnterDetails:
        return <SkipTheCounterStack.Screen name="MainSTC" component={STCEnterDetails} initialParams={nav?.params} />;
      case STCEventScreenNames.QrCode:
        return <SkipTheCounterStack.Screen name="QrCodeContainer" component={QrCodeContainer} initialParams={nav?.params} />;
      case STCEventScreenNames.InProgress:
        return <SkipTheCounterStack.Screen name="STCOrderInProgress" component={STCOrderInProgress} initialParams={nav?.params} />;
      case STCEventScreenNames.ReviewOrders:
        return <SkipTheCounterStack.Screen name="STCReviewOrders" component={STCReviewOrders} initialParams={nav?.params} />;
      default:
        return <SkipTheCounterStack.Screen name="MainSTC" component={STCEnterDetails} initialParams={nav?.params} />;
    }
  };

  return <SkipTheCounterStack.Navigator screenOptions={{ headerShown: false }}>{getScreen()}</SkipTheCounterStack.Navigator>;
};

const skip = connect((state: RootState) => ({ nav: state.stc.navigation }))(skipTheCounterStack);

// Manifest of possible screens
/**
 * This is primary app navigation of whole app
 */
const PrimaryStack = createNativeStackNavigator();

function PrimaryNav() {
  return (
    <PrimaryStack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
      <PrimaryStack.Screen name="SpecialOrderInfoScreenContainer" component={SpecialOrderInfoScreenContainer} />
      <PrimaryStack.Screen name="MyProfileContainer" component={MyProfile} />
      <PrimaryStack.Screen name="BranchDetail" component={BranchDetail} />
      <PrimaryStack.Screen name="Dashboard" component={DashboardTabNav} />
      <PrimaryStack.Screen name="STCDetail" component={skip} />
      <PrimaryStack.Screen name="NotificationsContainer" component={NotificationsContainer} />
      <PrimaryStack.Screen name="OrderDetails" component={OrderDetailsComp} />

      <PrimaryStack.Screen name="BarCodeScanner" component={BarCodeScannerContainer} />

      <PrimaryStack.Screen name="STCGatePass" component={STCGatePass} />
      <PrimaryStack.Screen name="STCConfirmOrderPurchaseProof" component={STCConfirmOrderPurchaseProof} />

      {/*Search*/}
      <PrimaryStack.Screen name="SearchSuggestion" component={SearchSuggestionContainer} />
      <PrimaryStack.Screen name="SearchResults" component={OrderProduct} />

      <PrimaryStack.Screen name="ProductDetails" component={ProductDetailsComp} />
      <PrimaryStack.Screen name="RelatedProductsDetails" component={RelatedProductsDetailsContainer} />

      <PrimaryStack.Screen name="GetInTouch" component={GetInTouch} />
    </PrimaryStack.Navigator>
  );
}

export default withAppender(safeRender(PrimaryNav, "Dashboard"));
