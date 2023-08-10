import { ApiResponse } from "apisauce";
import { Observable } from "rxjs";
import DebugConfig from "~root/Config/DebugConfig";
import { BranchDetailParam } from "~root/Lib/BranchHelper";
import { IEditPermissionReq } from "~root/Lib/ManageTeamHelper";
import { ConnectTradeParams } from "~root/Types/BranchDetail";
import { EstimatesDetailParams, EstimatesListByIdParams } from "~root/Types/Estimates";
import { JopDetailParams } from "~root/Types/OrderDetail";
import { IConfirmOrderRequestBody, IItemListRequestParam, IListRequestParam, ISearchSolrParams } from "~root/Types/SearchAPITypes";
import { SignUpParams } from "~root/Types/SignUpDetails";
import createAddressDistanceDriveTimeAPI from "./CreateAddressDistanceDriveTimeAPI";
import createAddressValidationAPI from "./CreateAddressValidationAPI";
import createHybrisAPI from "./CreateHybrisAPI";
import CreatePixelAPI from "./CreatePixelAPI";
import createToggleFeatureApi from "./CreateSTCToggleFeatureApi";
import FixtureApi from "./FixtureApi";

export default {
  create: DebugConfig.useFixtures
    ? FixtureApi
    : {
        addressValidation: createAddressValidationAPI(),
        hybris: createHybrisAPI(),
        stcToggleFeature: createToggleFeatureApi(),
        pixel: CreatePixelAPI(),
        addressDistanceDriveTimeAPI: createAddressDistanceDriveTimeAPI(),
      },
};

export interface CartRequestHeaders {
  tradeaccount: string;
  jobaccount: string;
  parentbranch: string;
  fulfillmentbranch: string;
}

export interface ISignupRequestParam {
  email: string;
  mobileNumber: string;
  countryOfOrgin?: string;
  firstName: string;
  lastName: string;
  updateLicense?: boolean;
}

export interface Api {
  addressValidation: AddressValidationAPI;
  hybris: HybrisAPI;
  stcToggleFeature: ToggleFeatureAPI;
  pixel: PixelAPI;
  addressDistanceDriveTimeAPI: AddressDistanceDriveTimeAPI;
}

export interface PixelAPI {
  logEvent: (params: any) => Observable<ApiResponse<any>>;
}

export interface HybrisAPI {
  // Hybris Specific to ACE Token
  solrSearch: (query: ISearchSolrParams, params: any) => Observable<ApiResponse<any>>;
  getFrequentlyOrderedList: (params: any) => Observable<ApiResponse<any>>;
  addItemList: (param: IItemListRequestParam, headers: any) => Observable<ApiResponse<any>>;
  orderConfirm: (param: IConfirmOrderRequestBody) => Observable<ApiResponse<any>>;
  getListDetails: (param: any, headers: any) => Observable<ApiResponse<any>>;
  getProductDetails: (sku: string, params: any) => Observable<ApiResponse<any>>;
  getStockAndPrice: (params: any) => Observable<ApiResponse<any>>;
  getMarketingTile: (params: any) => Observable<ApiResponse<any>>;
  getOrderList: (params: JopDetailParams) => Observable<ApiResponse<any>>;
  getOrderListDetails: (params: JopDetailParams) => Observable<ApiResponse<any>>;

  // Cart Integration

  deleteCart: (userId: string, cartId: string, headers: any) => Observable<ApiResponse<any>>;
  deleteCartEntry: (userId: string, cartId: string, entryNumber: string, headers: any) => Observable<ApiResponse<any>>;
  updateCartItemQuantity: (urlParams: any, bodyParams: any, headers: any) => Observable<ApiResponse<any>>;
  addProductToCart: (uid: string, cartId: string, bodyParams: any, headers: any) => Observable<ApiResponse<any>>;
  getUserCart: (uid: string, headers: any) => Observable<ApiResponse<any>>;
  createUserCart: (uid: string, headers: any) => Observable<ApiResponse<any>>;
  getCartDetails: (userId: string, cartId: string, headers: any) => Observable<ApiResponse<any>>;
  applyVoucher: (userId: string, cartId: string, bodyParams: any, headers: any) => Observable<ApiResponse<any>>;
  deleteAppliedVoucher: (userId: string, cartId: string, voucherId: string, headers: any) => Observable<ApiResponse<any>>;

  addUpdateDeliveryAddress: (uid: string, cartId: string, bodyParams: any, headers: any) => Observable<ApiResponse<any>>;
  saveDeliveryInfoToUserSessionCart: (uid: string, cartId: string, bodyParams: any, headers: any) => Observable<ApiResponse<any>>;
  getPermissionList: (id: string | unknown, accountId: string | unknown) => Observable<ApiResponse<any>>;
  getSubscriptionKey: () => Observable<ApiResponse<any>>;
  getUserInfo: (uerId: string | unknown) => Observable<ApiResponse<any>>;
  getTeamMembers: (email: string, selectedTradeAccount: string) => Observable<ApiResponse<any>>;
  sendInvite: (sendInvite: IEditPermissionReq) => Observable<ApiResponse<any>>;
  updateUserPermission: (updateReq: IEditPermissionReq) => Observable<ApiResponse<any>>;
  updateUserInvite: (updateInvite: IEditPermissionReq) => Observable<ApiResponse<any>>;
  deleteUserInvite: (updateInvite: IEditPermissionReq) => Observable<ApiResponse<any>>;
  getBranchList: (branchOnly: boolean) => Observable<ApiResponse<any>>;
  getNearByBranchList: (requestParams: any) => Observable<ApiResponse<any>>;
  getRelatedAndSubstituteProducts: (requestParams: any, headers: any) => Observable<ApiResponse<any>>;
  getStockAvailability: (requestParams: any, headers: any) => Observable<ApiResponse<any>>;
  getCountriesList: () => Observable<ApiResponse<any>>;
  createUser: (params: ISignupRequestParam) => Observable<ApiResponse<any>>;
  updateUser: (params: SignUpParams) => Observable<ApiResponse<any>>;
  updateTradeAccount: (params: ConnectTradeParams) => Observable<ApiResponse<any>>;
  connectTradeAccount: (params: any) => Observable<ApiResponse<any>>;
  getTradeAccountList: (params: any) => Observable<ApiResponse<any>>;
  getInviteDetails: (data: any) => Observable<ApiResponse<any>>;
  getBranchDetails: (param: BranchDetailParam) => Observable<ApiResponse<any>>;
  getAllList: (email: string, headers: any) => Observable<ApiResponse<any>>;
  updateList: (param: any, headers: any) => Observable<ApiResponse<any>>;
  createProductList: (param: IListRequestParam, headers: any) => Observable<ApiResponse<any>>;
  deleteList: (param: IListRequestParam, headers: any) => Observable<ApiResponse<any>>;
  removeItemsFromList: (param: IItemListRequestParam, headers: any) => Observable<ApiResponse<any>>;
  setAuthorization: (token: string, aceToken: string, auth0Token: string, email: string) => void;
  deleteToken: () => void;
  getPurchaseToken: (param: any) => Observable<ApiResponse<any>>;
  getJobAccounts: (email: string, accountCode: string) => Observable<ApiResponse<any>>;
  showConnectableTradeAccounts: (params: ConnectTradeParams) => Observable<ApiResponse<any>>;
  linkConnectableTradeAccounts: (params: ConnectTradeParams) => Observable<ApiResponse<any>>;
  validateToken: (token: string, event?: string) => Observable<ApiResponse<any>>;
  searchSuggestions: (term: string) => Observable<ApiResponse<any>>;
  fulfilmentEligibility: (userId: string, cartId: string, headers: any) => Observable<ApiResponse<any>>;
  siteContactApi: (body: any, userId: string, cartId: string, headers: any) => Observable<ApiResponse<any>>;
  placeOrderApi: (userId: string, cartId: string, headers: any) => Observable<ApiResponse<any>>;

  requestPreviouslyUsedAddresses: (userId: string, cartId: string, headers: any) => Observable<ApiResponse<any>>;
  saveCartInfo: (body: any, userId: string, cartId: string, headers: any) => Observable<ApiResponse<any>>;
  // Contact streamlining api
  requestContactsList: (body: any, userId: string, cartId: string, headers: any) => Observable<ApiResponse<any>>;
  deleteSiteContactDetails: (contactCode: string, userId: string, cartId: string, headers: any) => Observable<ApiResponse<any>>;
  deleteSectionsSOBQuotes: (params: any, headers: any) => Observable<ApiResponse<any>>;
  requestExistingOrdersList: (userId: string, cartId: string, headers: any) => Observable<ApiResponse<any>>;
  requestSubCategories: (params: any, headers: any) => Observable<ApiResponse<any>>;
  getEstimatesList: (params: any, headers: any) => Observable<ApiResponse<any>>;
  getEstimatesListDetails: (params: EstimatesListByIdParams | EstimatesDetailParams, headers: any) => Observable<ApiResponse<any>>;
  getQuotesList: (params: any, headers: any) => Observable<ApiResponse<any>>;
  getQuotesListDetails: (params: any, headers: any) => Observable<ApiResponse<any>>;
  getQuoteProducts: (params: any, headers: any) => Observable<ApiResponse<any>>;
  updateQuoteProductQuantity: (urlParams: any, bodyParams: any, headers: any) => Observable<ApiResponse<any>>;
  addOwnProduct: (urlParams: any, bodyParams: any, headers: any) => Observable<ApiResponse<any>>;
  deleteQuoteProduct: (params: any, headers: any) => Observable<ApiResponse<any>>;
  updateQuoteMarkupPercent: (params: any, headers: any) => Observable<ApiResponse<any>>;
  requestLabourCost: (urlParams: any, headers: any) => Observable<ApiResponse<any>>;
  updateQuoteDetails: (bodyParams: any, headers: any) => Observable<ApiResponse<any>>;
  updateQuoteJobStatus: (urlParams: any, bodyParams: any, headers: any) => Observable<ApiResponse<any>>;
  updateQuoteCompanyDetails: (bodyParams: any, headers: any) => Observable<ApiResponse<any>>;
  addNewJob: (urlParams: any, bodyParams: any, headers: any) => Observable<ApiResponse<any>>;
  createLabourCostAndOtherCosts: (urlParams: any, bodyParams: any, headers: any) => Observable<ApiResponse<any>>;
  deleteLabourCostAndOtherCosts: (urlParams: any, headers: any) => Observable<ApiResponse<any>>;
  getCompanyDetails: (urlParams: any, headers: any) => Observable<ApiResponse<any>>;
  updateLabourCostAndOtherCosts: (urlParams: any, bodyParams: any, headers: any) => Observable<ApiResponse<any>>;
  viewQuote: (urlParams: any, headers: any) => Observable<ApiResponse<any>>;
  markAsCompleted: (params: any, headers: any) => Observable<ApiResponse<any>>;
  getMaterialsReprice: (params: any, headers: any) => Observable<ApiResponse<any>>;
  sendEmailQuote: (urlParams: any, bodyParams: any, headers: any) => Observable<ApiResponse<any>>;
  changeQuoteStatus: (params: any, headers: any) => Observable<ApiResponse<any>>;
  createSectionsSOBQuotes: (params: any, headers: any) => Observable<ApiResponse<any>>;
  getSOBQuotes: (params: any, headers: any) => Observable<ApiResponse<any>>;
  uploadImageFileToQuote: (bodyParams: any, headers: any) => Observable<ApiResponse<any>>;
  getQuoteMedia: (params: any, headers: any) => Observable<ApiResponse<any>>;
  getDefaultDisplayOptionsForQuotes: (params: any, headers: any) => Observable<ApiResponse<any>>;
  updateDisplayOptionsForQuotes: (params: any, bodyParams: any, headers: any) => Observable<ApiResponse<any>>;
  deleteQuoteMedia: (params: any, headers: any) => Observable<ApiResponse<any>>;
  updateQuoteMedia: (params: any, headers: any) => Observable<ApiResponse<any>>;
  deleteQuote: (urlParams: any, headers: any) => Observable<ApiResponse<any>>;
  getDeliveryRequirements: (userId: string, cartId: string, headers: any) => Observable<ApiResponse<any>>;
  getPaymentStatus: (userId: string, cartId: string, headers: any, sessionId: string) => Observable<ApiResponse<any>>;
}

export interface ToggleFeatureAPI {
  getSTCToggleFeature: () => Observable<ApiResponse<any>>;
}

export interface AddressValidationAPI {
  getAddressSuggestions: (text: string) => Observable<ApiResponse<any>>;
  getGeoCode: (address: string) => Observable<ApiResponse<any>>;
}

export interface AddressDistanceDriveTimeAPI {
  getDistanceDriveTime: (params: any) => Observable<ApiResponse<any>>;
}
