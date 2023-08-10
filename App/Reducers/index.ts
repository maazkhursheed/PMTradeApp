/// <reference types="@types/webpack-env" />
import Realm from "realm";
import { combineReducers } from "redux";
import OrderHistorySchema from "~root/Db/OrderHistorySchema";
import root from "~root/Epics/";
import AddressReducer, { ImmutableAddressState } from "~root/Reducers/AddressReducers";
import AppReducer, { AppState } from "~root/Reducers/AppReducers";
import BarcodeScanReducer, { ImmutableBarcodeScanState } from "~root/Reducers/BarcodeScanReducers";
import BranchDetailsReducer, { BranchDetailsListState } from "~root/Reducers/BranchDetailReducers";
import { ConnectTradeReducer, ConnectTradeState } from "~root/Reducers/ConnectTradeReducers";
import ContactStreamlineReducers, { ImmutableContactStreamlineState } from "~root/Reducers/ContactStreamlineReducers";
import CountryListReducer, { CountryListState } from "~root/Reducers/CountryListReducers";
import EditPermissionReducers, { EditPermissionState } from "~root/Reducers/EditPermissionsReducers";
import EmailReducer, { ImmutableEmailState } from "~root/Reducers/EmailReducers";
import FrequentOrderReducer, { FrequentOrderState } from "~root/Reducers/FrequentOrderReducers";
import JobAccountsReducer, { ImmutableJobAccountsState } from "~root/Reducers/JobAccountsReducers";
import ManageTeamReducers, { TeamState } from "~root/Reducers/ManageTeamReducers";
import MarketingReducer, { MarketingState } from "~root/Reducers/MarketingReducers";
import MarketingTileReducer, { ImmutableMarketingTileState } from "~root/Reducers/MarketingTileReducer";
import MaterialSectionsSOBQuotesReducers, { ImmutableSectionSOBQuotesState } from "~root/Reducers/MaterialSectionsSOBQuotesReducers";
import MyListReducer, { MyListState } from "~root/Reducers/MyListReducers";
import OrderDeliveriesReducer, { ImmutableOrderDeliveriesState } from "~root/Reducers/OrderDeliveriesReducers";
import OrderDetailsReducer, { ImmutableOrderDetailsState } from "~root/Reducers/OrderDetailsReducers";
import OrderHistoryReducer, { OrderHistoryState } from "~root/Reducers/OrderHistoryReducers";
import OrderJourneyReducer, { ImmutableOrderJourneyState } from "~root/Reducers/OrderJourneyReducers";
import PermissionReducer, { ImmutablePermissionState } from "~root/Reducers/PermissionReducers";
import PixelReducer, { ImmutablePixelState } from "~root/Reducers/PixelReducer";
import ProductReducer, { ImmutableProductState } from "~root/Reducers/ProductReducers";
import QuotesReducer, { ImmutableQuotesState } from "~root/Reducers/QuotesReducer";
import SearchSuggestionsReducer, { SearchSuggestionsState } from "~root/Reducers/SearchSuggestionsReducers";
import SignUpReducer, { SignUpState } from "~root/Reducers/SignUpReducers";
import STCConnectTradeReducer, { STCConnectTradeState } from "~root/Reducers/STCConnectTradeReducers";
import StcReducer, { StcState } from "~root/Reducers/StcReducers";
import StcReviewOrderReducer, { StcReviewOrderState } from "~root/Reducers/StcReviewOrderReducers";
import SubCategoriesReducer, { ImmutableSubCategoriesState } from "~root/Reducers/SubCategoriesReducers";
import Api from "~root/Services/Api";
import CartReducer, { ImmutableCartState } from "./CartReducer";
import configureStore from "./CreateStore";
import EstimatesReducer, { ImmutableEstimatesState } from "./EstimatesReducer";
import ExistingOrdersReducer, { ImmutableExistingOrdersState } from "./ExistingOrdersReducer";
import LoginReducer, { ImmutableLoginState } from "./LoginReducers";
import NotificationReducer, { ImmutableNotificationState } from "./NotificationReducers";
import PaymentReducer from "./PaymentReducers";
import ProductDetailsReducer, { ImmutableProductDetaiState } from "./ProductDetailsReducers";
/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  login: LoginReducer,
  notification: NotificationReducer,
  orderDeliveries: OrderDeliveriesReducer,
  product: ProductReducer,
  orderDetails: OrderDetailsReducer,
  address: AddressReducer,
  orderJourney: OrderJourneyReducer,
  jobAccounts: JobAccountsReducer,
  email: EmailReducer,
  permission: PermissionReducer,
  manageTeam: ManageTeamReducers,
  marketingScreens: MarketingReducer,
  countryList: CountryListReducer,
  signUp: SignUpReducer,
  branchList: BranchDetailsReducer,
  editPermission: EditPermissionReducers,
  connectTrade: ConnectTradeReducer,
  myList: MyListReducer,
  frequentOrders: FrequentOrderReducer,
  appDetail: AppReducer,
  stc: StcReducer,
  orderHistory: OrderHistoryReducer,
  stcConnectTrade: STCConnectTradeReducer,
  stcReviewOrder: StcReviewOrderReducer,
  suggestions: SearchSuggestionsReducer,
  productDetail: ProductDetailsReducer,
  barcode: BarcodeScanReducer,
  marketingTile: MarketingTileReducer,
  pixel: PixelReducer,
  cart: CartReducer,
  estimates: EstimatesReducer,
  contactStreamline: ContactStreamlineReducers,
  existingOrders: ExistingOrdersReducer,
  subCategories: SubCategoriesReducer,
  quotes: QuotesReducer,
  sectionSOBQuotes: MaterialSectionsSOBQuotesReducers,
  paymentStatus: PaymentReducer,
});

export interface RootState {
  productDetail: ImmutableProductDetaiState;
  login: ImmutableLoginState;
  notification: ImmutableNotificationState;
  orderDeliveries: ImmutableOrderDeliveriesState;
  product: ImmutableProductState;
  orderDetails: ImmutableOrderDetailsState;
  jobAccounts: ImmutableJobAccountsState;
  orderJourney: ImmutableOrderJourneyState;
  address: ImmutableAddressState;
  email: ImmutableEmailState;
  permission: ImmutablePermissionState;
  manageTeam: TeamState;
  marketingScreens: MarketingState;
  countryList: CountryListState;
  signUp: SignUpState;
  branchList: BranchDetailsListState;
  editPermission: EditPermissionState;
  connectTrade: ConnectTradeState;
  myList: MyListState;
  frequentOrders: FrequentOrderState;
  appDetail: AppState;
  stc: StcState;
  orderHistory: OrderHistoryState;
  stcConnectTrade: STCConnectTradeState;
  stcReviewOrder: StcReviewOrderState;
  suggestions: SearchSuggestionsState;
  barcode: ImmutableBarcodeScanState;
  marketingTile: ImmutableMarketingTileState;
  pixel: ImmutablePixelState;
  cart: ImmutableCartState;
  estimates: ImmutableEstimatesState;
  contactStreamline: ImmutableContactStreamlineState;
  existingOrders: ImmutableExistingOrdersState;
  subCategories: ImmutableSubCategoriesState;
  quotes: ImmutableQuotesState;
  sectionSOBQuotes: ImmutableSectionSOBQuotesState;
}

export default async () => {
  const realm = await Realm.open({
    // path: copyPath,
    schema: [OrderHistorySchema],
    schemaVersion: 33,
    deleteRealmIfMigrationNeeded: true,
  });

  let store;
  const api = Api.create;
  // tslint:disable-next-line:prefer-const
  const objStore = configureStore(reducers, root, {
    api,
    db: realm,
    store: () => store,
  });
  store = objStore.store;
  return store;
};
