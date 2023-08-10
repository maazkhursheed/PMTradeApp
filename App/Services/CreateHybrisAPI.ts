// a library to wrap and simplify api calls
import { ApisauceInstance, create as apicreate } from "apisauce";
import qs from "qs";
import * as R from "ramda";
import { from } from "rxjs";
import AppConfig from "~root/Config/AppConfig";
import { generateTransactionId } from "~root/Lib/CommonHelper";
import { IEditPermissionReq } from "~root/Lib/ManageTeamHelper";
import { generateURIfromObject } from "~root/Lib/StringHelper";
import { HybrisAPI } from "~root/Services/Api";
import { ConnectTradeParams } from "~root/Types/BranchDetail";
import { EstimatesDetailParams, EstimatesListByIdParams } from "~root/Types/Estimates";
import { JopDetailParams } from "~root/Types/OrderDetail";
import { IConfirmOrderRequestBody, IItemListRequestParam, IListRequestParam, ISearchSolrParams } from "~root/Types/SearchAPITypes";

const FB_PATH = "/fbcommercewebservices/v2/placemakers";

// our "constructor"
export default (): HybrisAPI => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //

  let api: ApisauceInstance | undefined = undefined;
  const getApi = () => {
    if (api) {
      return api;
    }
    api = apicreate({
      baseURL: AppConfig.CCV2_ENDPOINT,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 20000,
    });
    return api;
  };
  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  // Users

  const getPermissionList = (id, accountId) => from(getApi().get(FB_PATH + "/userpermissions/" + id + "/" + accountId));

  const getUserInfo = userId =>
    from(
      getApi().get(FB_PATH + "/users", {
        userId,
        fields: "FULL",
      }),
    );

  // Team Members

  const getInviteDetails = param =>
    from(
      getApi().get(FB_PATH + "/invite/invitedetails", {
        mobileNumber: param.mobileNumber,
        selectedTradeAccount: param.selectedTradeAccount,
      }),
    );

  const getTeamMembers = (email, selectedTradeAccount) =>
    from(
      getApi().get(FB_PATH + "/invite", {
        userId: email,
        selectedTradeAccount,
      }),
    );

  const updateUserPermission = (updateReq: IEditPermissionReq) =>
    from(
      getApi().post(
        `${FB_PATH}/userpermissions` +
          qs.stringify({
            accountId: updateReq.accountId,
            userId: updateReq.userId,
            permissionList: R.join(",", updateReq.permissionList),
            temporaryAccess: updateReq.temporaryAccess,
            startDate: updateReq.startDate,
            endDate: updateReq.endDate,
            isAdmin: updateReq.isAdmin,
          }),
      ),
    );

  const updateUserInvite = (updateInvite: IEditPermissionReq) =>
    from(
      getApi().patch(`${FB_PATH}/invite/`, {
        creditLimit: updateInvite.creditLimit,
        mobileNumber: updateInvite.mobileNumber,
        permissionList: updateInvite.permissionList,
        selectedTradeAccount: updateInvite.selectedTradeAccount,
        temporaryAccess: updateInvite.temporaryAccess,
        startDate: updateInvite.startDate,
        endDate: updateInvite.endDate,
        isAdmin: updateInvite.isAdmin,
        invitedBy: updateInvite.invitedBy,
      }),
    );

  const sendInvite = (sendInvites: IEditPermissionReq) =>
    from(
      getApi().post(`${FB_PATH}/invite/`, {
        creditLimit: sendInvites.creditLimit,
        mobileNumber: sendInvites.mobileNumber,
        permissionList: sendInvites.permissionList,
        selectedTradeAccount: sendInvites.selectedTradeAccount,
        temporaryAccess: sendInvites.temporaryAccess,
        startDate: sendInvites.startDate,
        endDate: sendInvites.endDate,
        isAdmin: sendInvites.isAdmin,
        name: sendInvites.name,
        invitedBy: sendInvites.invitedBy,
      }),
    );

  const deleteUserInvite = (updateInvite: IEditPermissionReq) =>
    from(
      getApi().delete(`${FB_PATH}/invite/`, undefined, {
        data: {
          mobileNumber: updateInvite.mobileNumber,
          selectedTradeAccount: updateInvite.selectedTradeAccount,
        },
      }),
    );

  // Authorization

  const getSubscriptionKey = () => {
    return from(
      getApi().post(
        "/authorizationserver/oauth/token?client_id=" +
          AppConfig.CLIENT_ID +
          "&grant_type=" +
          AppConfig.GRANT_TYPE +
          "&client_secret=" +
          AppConfig.CLIENT_SECRET,
      ),
    );
  };

  const setAuthorization = (token: string, aceToken: string, auth0Token: string, email: string) => {
    const api = getApi();
    api.setHeader("Authorization", "Bearer " + token);
    api.setHeader("hybristoken", aceToken);
    api.setHeader("email", email);
  };

  const deleteToken = () => {
    const api = getApi();
    delete api.headers.Authorization;
    delete api.headers.hybristoken;
    delete api.headers.email;
  };
  // Hybris OCC API's
  // INTHYB2 & INTHYB3 Branch List/Details
  const getBranchList = (branchOnly: boolean) =>
    from(
      getApi().get(FB_PATH + "/branches", {
        branchesOnly: branchOnly,
      }),
    );

  const getNearByBranchList = (params: any) =>
    from(
      getApi().get(FB_PATH + "/stores", {
        fields: "FULL",
        pageSize: 5,
        ...params,
      }),
    );

  const getRelatedAndSubstituteProducts = (params: any, headers: any) =>
    from(
      getApi().get(
        FB_PATH + `/products/${params.productCode}/references`,
        {
          referenceType: params.referenceType,
          fields: "FULL",
        },
        {
          headers: { ...api.headers, ...headers },
        },
      ),
    );

  const getStockAvailability = (params: any, headers: any) => {
    const api = getApi();
    return from(
      api.get(
        FB_PATH + "/stores/stockavailability?",
        {
          ...params,
          fields: "DEFAULT",
        },
        {
          headers: { ...api.headers, ...headers },
        },
      ),
    );
  };

  // 1.3 Update User – Trade account mapping
  // TODO WAQAS Clean up the code ......
  const connectTradeAccount = (params: ConnectTradeParams) => from(getApi().post(FB_PATH + "/users/" + params.email + "/addtradeaccounts", params));

  const getTradeAccountList = (params: any) => from(getApi().get(FB_PATH + "/users/" + params.user + "/" + params.tradeID + "/tradeaccounts"));

  const getCountriesList = () => from(getApi().get(FB_PATH + "/countries"));
  const createUser = params => from(getApi().post(FB_PATH + "/users", params));
  const updateUser = params => from(getApi().post(FB_PATH + "/users", params));
  const updateTradeAccount = params => from(getApi().post(FB_PATH + "/users/" + params.email + "/addtradeaccounts", params));

  const getBranchDetails = params =>
    from(
      getApi().get(FB_PATH + `/branches/${params.branchId}`, {
        ...params,
      }),
    );

  // My Lists
  const getAllList = (email: string, headers: any) => {
    const api = getApi();
    return from(
      api.get(
        FB_PATH + "/mylist/" + email,
        {},
        {
          headers: { ...api.headers, ...headers },
        },
      ),
    );
  };

  const getListDetails = (param: any, headers: any) => {
    const api = getApi();
    return from(api.post(FB_PATH + "/mylist", param, { headers: { ...api.headers, ...headers } }));
  };

  const addItemList = (param: IItemListRequestParam, headers: any) => {
    const api = getApi();
    return from(api.post(FB_PATH + "/mylist/addproducts", param, { headers: { ...api.headers, ...headers } }));
  };

  const updateList = (param: any, headers: any) => {
    const api = getApi();
    return from(api.patch(FB_PATH + "/mylist", param, { headers: { ...api.headers, ...headers } }));
  };

  const createProductList = (param: IListRequestParam, headers: any) => {
    const api = getApi();
    return from(api.post(FB_PATH + "/mylist/addlist", param, { headers: { ...api.headers, ...headers } }));
  };

  const deleteList = (param: IListRequestParam, headers: any) => {
    const api = getApi();
    return from(api.post(FB_PATH + "/mylist/deletelist", param, { headers: { ...api.headers, ...headers } }));
  };

  const removeItemsFromList = (param: any, headers: any) => {
    const api = getApi();
    return from(api.post(FB_PATH + "/mylist/removeproducts", param, { headers: { ...api.headers, ...headers } }));
  };

  const getPurchaseToken = (param: any) => from(getApi().post(FB_PATH + "/stc/purchaseToken", param));

  const getJobAccounts = (email: string, accountCode: string) => from(getApi().get(FB_PATH + "/" + email + "/" + accountCode + "/jobaccounts"));

  const showConnectableTradeAccounts = (params: ConnectTradeParams) => from(getApi().post(FB_PATH + "/users/" + params.email + "/listTradeaccounts", params));

  const linkConnectableTradeAccounts = (params: ConnectTradeParams) => from(getApi().post(FB_PATH + "/users/" + params.email + "/linktradeaccounts", params));

  const searchSuggestions = (term: string) => from(getApi().get(FB_PATH + "/products/suggestions", { term }));

  const validateToken = (token: string, event: string) =>
    from(
      getApi().post(FB_PATH + "/stc/validateToken", {
        tokenId: token,
        event,
      }),
    );

  // Cart Integration

  const deleteCart = (userId: string, cartId: string, headers: any) => {
    const api = getApi();
    return from(api.delete(FB_PATH + `/users/${userId}/carts/${cartId}`, {}, { headers: { ...api.headers, ...headers } }));
  };

  const deleteCartEntry = (userId: string, cartId: string, entryNumber: string, headers: any) => {
    const api = getApi();
    return from(api.delete(FB_PATH + `/users/${userId}/carts/${cartId}/entries/${entryNumber}`, {}, { headers: { ...api.headers, ...headers } }));
  };

  const getUserCart = (id: string, headers: any) => {
    const api = getApi();
    return from(
      getApi().get(
        FB_PATH + "/users/" + id + "/carts",
        {
          fields: "FULL",
        },
        {
          headers: { ...api.headers, ...headers },
        },
      ),
    );
  };

  const createUserCart = (id: string, headers: any) => {
    const api = getApi();
    return from(
      getApi().post(
        FB_PATH + "/users/" + id + "/carts",
        {
          fields: "BASIC",
        },
        { headers: { ...headers, ...api.headers } },
      ),
    );
  };

  const updateCartItemQuantity = (urlParams: any, bodyParams: any, headers: any) => {
    const api = getApi();
    return from(
      getApi().patch(FB_PATH + "/users/" + urlParams.uid + "/carts/" + urlParams.cartId + "/entries/" + urlParams.entryId, bodyParams, {
        headers: { ...headers, ...api.headers },
      }),
    );
  };

  const addProductToCart = (uid: string, cartId: string, bodyParams: any, headers: any) => {
    const api = getApi();
    return from(api.post(FB_PATH + "/users/" + uid + "/carts/" + cartId + "/entries", bodyParams, { headers: { ...headers, ...api.headers } }));
  };

  const getCartDetails = (userId: string, cartId: string, headers: any) => {
    return from(
      api.get(
        FB_PATH + "/users/" + userId + "/carts/" + cartId,
        {
          fields: "FULL",
        },
        {
          headers: { ...api.headers, ...headers },
        },
      ),
    );
  };

  const applyVoucher = (userId: string, cartId: string, bodyParams: any, headers: any) => {
    const api = getApi();
    return from(
      api.post(FB_PATH + "/users/" + userId + "/carts/" + cartId + "/vouchers?fields=FULL", bodyParams, {
        headers: {
          ...headers,
          ...api.headers,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
    );
  };

  const deleteAppliedVoucher = (userId: string, cartId: string, voucherId: string, headers: any) => {
    const api = getApi();
    return from(
      api.delete(
        FB_PATH + "/users/" + userId + "/carts/" + cartId + "/vouchers/" + voucherId,
        {
          fields: "BASIC",
        },
        {
          headers: { ...api.headers, ...headers },
        },
      ),
    );
  };

  const getDeliveryRequirements = (userId: string, cartId: string, headers: any) => {
    const api = getApi();
    return from(
      api.get(
        `${FB_PATH}/users/${userId}/carts/${cartId}/deliveryrequirements`,
        {},
        {
          headers: { ...api.headers, ...headers },
        },
      ),
    );
  };

  // Solr API with ACE Tokens required
  const solrSearch = (query: ISearchSolrParams, params: any) => {
    const api = getApi();
    if (query.isFromBarcodeScan) {
      const body = {
        barcodeInfo: query && query.query,
        priceAndStockRequestData: params,
      };
      return from(api.post(FB_PATH + "/products/productsByBarcodeInfo", body));
    } else {
      return from(
        api.post(
          FB_PATH +
            "/products/search?" +
            generateURIfromObject({
              query: R.compose(R.ifElse(R.isNil, R.identity, R.compose(encodeURIComponent, R.replace(/[+]/g, " "), decodeURIComponent, R.prop("query"))))(
                query,
              ),
              currentPage: query && query.currentPage,
              fields: "FULL",
            }),
          params,
        ),
      );
    }
  };

  const getFrequentlyOrderedList = (params: any) => from(api.post(FB_PATH + "/products/frequentlyorder", params));

  const orderConfirm = (param: IConfirmOrderRequestBody) =>
    from(
      getApi().post(FB_PATH + "/stc/confirmOrder", {
        ...param,
        transactionId: generateTransactionId(),
        transactionSource: "YardAppSTC",
        orderType: "SU",
        state: "CONFIRM",
      }),
    );

  const getProductDetails = (sku, param) => from(getApi().get(FB_PATH + "/products/" + sku, param));

  const getStockAndPrice = params => from(getApi().post(FB_PATH + "/integeration/priceandstock", params));

  const getMarketingTile = params => from(getApi().get(FB_PATH + "/cms/pages?pagetype=ContentPage&pageLabelOrId=mobileLandingPage"));

  const getOrderList = (params: JopDetailParams) =>
    from(
      getApi().get(
        FB_PATH + "/pmOrders",
        R.mergeRight(
          {
            transactionSource: "TradeApp",
            includeOrderDetails: "Y",
            includeClosedOrders: "Y",
            orderType: "OR",
            closedOrdersNumberOfDays: 30,
          },
          params,
        ),
      ),
    );

  const getOrderListDetails = (params: JopDetailParams) =>
    from(
      getApi().get(
        FB_PATH + "/pmOrders/" + params.orderId + "?",
        R.mergeRight(
          {
            transactionSource: "TradeApp",
            includeOrderDetails: "Y",
            includeClosedOrders: "Y",
            orderType: "OR",
            closedOrdersNumberOfDays: 30,
          },
          params,
        ),
      ),
    );

  const getEstimatesList = (params: any, headers: any) => {
    const api = getApi();
    return from(
      api.get(
        FB_PATH + "/estimates/estimatesList?pageNo=" + params?.pageNo + "&numberOfLines=" + params?.numberOfLines + "&fields=BASIC",
        {},
        {
          headers: { ...api.headers, ...headers },
        },
      ),
    );
  };

  const getEstimatesListDetails = (params: EstimatesListByIdParams | EstimatesDetailParams, headers: any) => {
    const api = getApi();
    return from(
      api.get(
        FB_PATH + "/estimates/details",
        {
          pageNo: "1",
          numberOfLines: AppConfig.NUMBER_OF_LINES,
          fields: "FULL",
          ...params,
        },
        {
          headers: { ...api.headers, ...headers },
        },
      ),
    );
  };

  const fulfilmentEligibility = (userId: string, cartId: string, headers: any) => {
    const api = getApi();
    return from(
      api.get(
        `${FB_PATH}/users/${userId}/carts/${cartId}/getfulfillments`,
        {},
        {
          headers: { ...api.headers, ...headers },
        },
      ),
    );
  };

  const addUpdateDeliveryAddress = (uid: string, cartId: string, bodyParams: any, headers: any) => {
    const api = getApi();
    return from(api.post(FB_PATH + "/users/" + uid + "/carts/" + cartId + "/addresses/delivery", bodyParams, { headers: { ...headers, ...api.headers } }));
  };

  const siteContactApi = (body: any, userId: string, cartId: string, headers: any) => {
    const api = getApi();
    return from(
      api.post(`${FB_PATH}/users/${userId}/carts/${cartId}/siteContacts`, body, {
        headers: { ...api.headers, ...headers },
      }),
    );
  };

  const saveDeliveryInfoToUserSessionCart = (uid: string, cartId: string, bodyParams: any, headers: any) => {
    const api = getApi();
    return from(
      api.post(FB_PATH + "/users/" + uid + "/carts/" + cartId + "/saveDeliveryInfo?fields=BASIC", bodyParams, { headers: { ...headers, ...api.headers } }),
    );
  };
  const placeOrderApi = (userId: string, cartId: string, headers: any) => {
    const api = getApi();
    return from(
      api.post(
        `${FB_PATH}/users/${userId}/orders?fields=DEFAULT&cartId=${cartId}`,
        {},
        {
          headers: {
            ...api.headers,
            ...headers,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      ),
    );
  };

  const requestPreviouslyUsedAddresses = (userId: string, cartId: string, headers: any) => {
    const api = getApi();
    return from(
      api.get(
        FB_PATH + "/users/" + userId + "/carts/" + cartId + "/siteAddresses",
        {
          fields: "FULL",
        },
        {
          headers: { ...api.headers, ...headers },
        },
      ),
    );
  };

  const requestContactsList = (params: any, userId: string, cartId: string, headers: any) => {
    const api = getApi();
    api.deleteHeader("jobaccount");
    return from(
      api.get(`${FB_PATH}/users/${userId}/carts/${cartId}/contactsList`, params, {
        headers: { ...api.headers, ...headers },
      }),
    );
  };

  const deleteSiteContactDetails = (contactCode: string[], userId: string, cartId: string, headers: any) => {
    const api = getApi();
    return from(
      api.delete(
        `${FB_PATH}/users/${userId}/carts/${cartId}/siteContacts`,
        {},
        {
          headers: { ...api.headers, ...headers },
          data: {
            siteContacts: R.map(R.applySpec({ code: R.identity }), contactCode),
          },
        },
      ),
    );
  };

  const requestExistingOrdersList = (userId: string, cartId: string, headers: any) => {
    const api = getApi();
    return from(
      api.get(
        `${FB_PATH}/users/${userId}/carts/${cartId}/getExistingOrdersList`,
        {},
        {
          headers: { ...api.headers, ...headers },
        },
      ),
    );
  };

  const requestSubCategories = (categoryId: string, headers: any) => {
    const api = getApi();
    return from(
      api.get(
        `${FB_PATH}/catalogs/${AppConfig.SUBCATEGORIES_CATALOG_ID}/${AppConfig.SUBCATEGORIES_CATALOG_VERSION_ID}/categories/${categoryId}`,
        {},
        {
          headers: { ...api.headers, ...headers },
        },
      ),
    );
  };

  const saveCartInfo = (body: any, userId: string, cartId: string, headers: any) => {
    const api = getApi();
    return from(
      api.post(`${FB_PATH}/users/${userId}/carts/${cartId}/saveCartInfo`, body, {
        headers: { ...api.headers, ...headers },
      }),
    );
  };

  const getQuotesList = (params: any, headers: any) => {
    const api = getApi();
    return from(
      api.get(
        FB_PATH + "/quotes",
        {
          ...params,
          fields: "DEFAULT",
        },
        {
          headers: { ...api.headers, ...headers },
        },
      ),
    );
  };
  const getQuotesListDetails = (quoteId: any, headers: any) => {
    const api = getApi();
    return from(
      api.get(
        `${FB_PATH}/quotes/${quoteId}?`,
        {
          fields: "FULL",
        },
        {
          headers: { ...api.headers, ...headers },
        },
      ),
    );
  };

  // miscellaneous to be replaced with {sobname} parameter when api is available

  const getQuoteProducts = (params: any, headers: any) => {
    const api = getApi();
    return from(
      api.get(
        `${FB_PATH}/quotes/${params.quoteId}/sob/${params.sobId}/entries?`,
        {
          currentPage: params.currentPage,
          pageSize: "10",
          fields: "FULL",
        },
        {
          headers: { ...api.headers, ...headers },
        },
      ),
    );
  };

  const updateQuoteProductQuantity = (urlParams: any, bodyParams: any, headers: any) => {
    const api = getApi();
    return from(
      api.patch(`${FB_PATH}/quotes/${urlParams.quoteId}/sob/${urlParams.sobId}/entries/${urlParams.entryNumber}?fields=FULL`, bodyParams, {
        headers: { ...api.headers, ...headers },
      }),
    );
  };

  const addOwnProduct = (urlParams: any, bodyParams: any, headers: any) => {
    const api = getApi();
    return from(
      api.post(`${FB_PATH}/quotes/${urlParams.quoteId}/sob/${urlParams.sobId}/entries?fields=DEFAULT`, bodyParams, {
        headers: { ...api.headers, ...headers },
      }),
    );
  };

  const deleteQuoteProduct = (urlParams: any, headers: any) => {
    const api = getApi();
    return from(
      api.delete(`${FB_PATH}/quotes/${urlParams.quoteId}/sob/miscellaneous/entries/${urlParams.entryNumber}`, undefined, {
        data: JSON.stringify({ fields: "BASIC" }),
        headers: {
          ...api.headers,
          ...headers,
          "Content-Type": "application/json",
        },
      }),
    );
  };

  const updateQuoteMarkupPercent = (params: any, headers: any) => {
    const api = getApi();
    return from(
      api.post(
        `${FB_PATH}/quotes/${params.code}/markup`,
        {
          fields: "BASIC",
          markupPercent: params.markupPercent,
        },
        {
          headers: {
            ...api.headers,
            ...headers,
          },
        },
      ),
    );
  };

  const requestLabourCost = (urlParams: any, headers: any) => {
    const api = getApi();
    return from(
      api.get(
        `${FB_PATH}/quotes/${urlParams.quoteId}/other-costs/${urlParams.costType}`,
        {},
        {
          headers: {
            ...api.headers,
            ...headers,
          },
        },
      ),
    );
  };
  const addNewJob = (urlParams: any, bodyParams: any, headers: any) => {
    const api = getApi();
    return from(
      api.post(`${FB_PATH}/quotes`, bodyParams, {
        headers: { ...api.headers, ...headers },
      }),
    );
  };

  const updateQuoteDetails = (bodyParams: any, headers: any) => {
    const api = getApi();
    return from(
      api.patch(`${FB_PATH}/quotes`, bodyParams, {
        headers: { ...api.headers, ...headers },
      }),
    );
  };

  const updateQuoteJobStatus = (urlParams: any, bodyParams: any, headers: any) => {
    const api = getApi();
    return from(
      api.post(`${FB_PATH}/quotes/${urlParams.quoteId}/status`, bodyParams, {
        headers: { ...api.headers, ...headers },
      }),
    );
  };

  const updateQuoteCompanyDetails = (bodyParams: any, headers: any) => {
    const formdata = new FormData();
    if (bodyParams.file) {
      formdata.append("companyLogo", bodyParams.file);
    }
    formdata.append("profile", { string: JSON.stringify(bodyParams.profile), type: "application/json" });
    return from(
      getApi().post(`${FB_PATH}/quotes/company-profile`, formdata, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      }),
    );
  };

  const createLabourCostAndOtherCosts = (urlParams: any, bodyParams: any, headers: any) => {
    const api = getApi();
    return from(
      api.post(`${FB_PATH}/quotes/${urlParams.quoteId}/other-costs/${urlParams.costType}`, bodyParams, {
        headers: {
          ...api.headers,
          ...headers,
        },
      }),
    );
  };

  const sendEmailQuote = (urlParams: any, bodyParams: any, headers: any) => {
    const api = getApi();
    return from(
      api.post(`${FB_PATH}/quotes/${urlParams.quoteId}/email`, bodyParams, {
        headers: {
          ...api.headers,
          ...headers,
        },
      }),
    );
  };

  const deleteLabourCostAndOtherCosts = (urlParams: any, headers: any) => {
    const api = getApi();
    return from(
      api.delete(
        `${FB_PATH}/quotes/${urlParams.quoteId}/other-costs/${urlParams.costType}/${urlParams.name}`,
        {},
        {
          headers: {
            ...api.headers,
            ...headers,
          },
        },
      ),
    );
  };

  const getCompanyDetails = (urlParams: any, headers: any) => {
    const api = getApi();
    return from(
      api.get(
        `${FB_PATH}/quotes/${urlParams.quoteId}/company-profile`,
        {},
        {
          headers: {
            ...api.headers,
            ...headers,
          },
        },
      ),
    );
  };

  const updateLabourCostAndOtherCosts = (urlParams: any, bodyParams: any, headers: any) => {
    const api = getApi();
    return from(
      api.patch(`${FB_PATH}/quotes/${urlParams.quoteId}/other-costs/${urlParams.costType}`, bodyParams, {
        headers: {
          ...api.headers,
          ...headers,
        },
      }),
    );
  };

  const viewQuote = (urlParams: any, headers: any) => {
    const api = getApi();
    return from(
      api.post(
        `${FB_PATH}/quotes/${urlParams.quoteId}/report`,
        {},
        {
          headers: {
            ...api.headers,
            ...headers,
          },
        },
      ),
    );
  };

  const getMaterialsReprice = (quoteId: any, headers: any) => {
    const api = getApi();
    return from(
      api.get(
        `${FB_PATH}/quotes/${quoteId}/reprice`,
        {},
        {
          headers: { ...api.headers, ...headers },
        },
      ),
    );
  };

  const markAsCompleted = (params: any, headers: any) => {
    const api = getApi();
    return from(
      api.post(
        `${FB_PATH}/quotes/${params.quoteId}/materialsCompleted`,
        { materialsCompleted: params.allProductsAdded },
        {
          headers: { ...api.headers, ...headers },
        },
      ),
    );
  };

  const changeQuoteStatus = (params: any, headers: any) => {
    const api = getApi();
    return from(
      api.post(
        `${FB_PATH}/quotes/${params.quoteId}/status`,
        { status: params.status },
        {
          headers: { ...api.headers, ...headers },
        },
      ),
    );
  };

  const getSOBQuotes = (params: any, headers: any) => {
    const api = getApi();
    return from(
      api.get(
        `${FB_PATH}/quotes/${params.quoteId}/sob?`,
        {
          fields: "FULL",
        },
        {
          headers: { ...api.headers, ...headers },
        },
      ),
    );
  };

  const deleteSectionsSOBQuotes = (urlParams: any, headers: any) => {
    const api = getApi();
    return from(
      api.delete(`${FB_PATH}/quotes/${urlParams.quoteId}/sob/${urlParams.sobPk}`, undefined, {
        headers: {
          ...api.headers,
          ...headers,
        },
      }),
    );
  };

  const createSectionsSOBQuotes = (params: any, headers: any) => {
    const api = getApi();
    return from(
      api.post(
        `${FB_PATH}/quotes/${params.quoteId}/sob`,
        { name: params.name },
        {
          headers: { ...api.headers, ...headers },
        },
      ),
    );
  };

  const uploadImageFileToQuote = (bodyParams: any, headers: any) => {
    const formdata = new FormData();
    formdata.append("quoteMedia", bodyParams.file);
    return from(
      getApi().post(`${FB_PATH}/quotes/${bodyParams.quoteId}/quotemedia`, formdata, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      }),
    );
  };

  const getQuoteMedia = (params: any, headers: any) => {
    const api = getApi();
    return from(
      api.get(`${FB_PATH}/quotes/${params.quoteId}/quotemedia`, undefined, {
        headers: { ...api.headers, ...headers },
      }),
    );
  };

  const getDefaultDisplayOptionsForQuotes = (params: any, headers: any) => {
    const api = getApi();
    return from(
      api.get(
        `${FB_PATH}/quotes/${params.quoteId}/displayOptions`,
        {},
        {
          headers: { ...api.headers, ...headers },
        },
      ),
    );
  };

  const updateDisplayOptionsForQuotes = (params: any, bodyParams: any, headers: any) => {
    const api = getApi();
    return from(
      api.patch(`${FB_PATH}/quotes/${params.quoteId}/displayOptions?fields=BASIC`, bodyParams, {
        headers: { ...api.headers, ...headers },
      }),
    );
  };

  const deleteQuoteMedia = (urlParams: any, headers: any) => {
    const api = getApi();
    return from(
      api.delete(`${FB_PATH}/quotes/${urlParams.quoteId}/quotemedia/${urlParams.quoteMediaPK}`, undefined, {
        data: JSON.stringify({ fields: "BASIC" }),
        headers: {
          ...api.headers,
          ...headers,
          "Content-Type": "application/json",
        },
      }),
    );
  };

  const updateQuoteMedia = (params: any, headers: any) => {
    const api = getApi();
    return from(
      api.patch(`${FB_PATH}/quotes/${params.quoteId}/quotemedia/${params.quoteMediaPK}`, params.bodyParams, {
        headers: {
          ...api.headers,
          ...headers,
        },
      }),
    );
  };

  const deleteQuote = (urlParams: any, headers: any) => {
    const api = getApi();
    return from(
      api.delete(
        `${FB_PATH}/quotes/${urlParams.quoteId}`,
        {},
        {
          headers: {
            ...api.headers,
            ...headers,
          },
        },
      ),
    );
  };

  const getPaymentStatus = (userId: string, cartId: string, headers: any, sessionId: string) => {
    const api = getApi();
    return from(
      api.get(
        `${FB_PATH}/users/${userId}/carts/${cartId}/payment-sessions/${sessionId}`,
        {},
        {
          headers: { ...api.headers, ...headers },
        },
      ),
    );
  };

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    setAuthorization,
    deleteToken,
    getPermissionList,
    getSubscriptionKey,
    getUserInfo,
    getBranchList,
    getNearByBranchList,
    getStockAvailability,
    getCountriesList,
    createUser,
    updateUser,
    getTeamMembers,
    updateUserPermission,
    updateUserInvite,
    sendInvite,
    deleteUserInvite,
    connectTradeAccount,
    getTradeAccountList,
    getInviteDetails,
    updateTradeAccount,
    getBranchDetails,
    getAllList,
    updateList,
    createProductList,
    deleteList,
    removeItemsFromList,
    getPurchaseToken,
    getJobAccounts,
    showConnectableTradeAccounts,
    linkConnectableTradeAccounts,
    validateToken,
    searchSuggestions,
    updateCartItemQuantity,
    solrSearch,
    getFrequentlyOrderedList,
    addItemList,
    orderConfirm,
    getListDetails,
    getProductDetails,
    getStockAndPrice,
    addProductToCart,
    getUserCart,
    createUserCart,
    getCartDetails,
    applyVoucher,
    deleteAppliedVoucher,
    deleteCart,
    deleteCartEntry,
    getOrderListDetails,
    getOrderList,
    getMarketingTile,
    fulfilmentEligibility,
    siteContactApi,
    addUpdateDeliveryAddress,
    saveDeliveryInfoToUserSessionCart,
    placeOrderApi,
    requestPreviouslyUsedAddresses,
    requestContactsList,
    deleteSiteContactDetails,
    deleteSectionsSOBQuotes,
    requestExistingOrdersList,
    requestSubCategories,
    saveCartInfo,
    getEstimatesList,
    getEstimatesListDetails,
    getQuotesList,
    getQuotesListDetails,
    getQuoteProducts,
    updateQuoteProductQuantity,
    addOwnProduct,
    deleteQuoteProduct,
    updateQuoteMarkupPercent,
    requestLabourCost,
    updateQuoteDetails,
    updateQuoteJobStatus,
    updateQuoteCompanyDetails,
    addNewJob,
    getRelatedAndSubstituteProducts,
    createLabourCostAndOtherCosts,
    deleteLabourCostAndOtherCosts,
    getCompanyDetails,
    updateLabourCostAndOtherCosts,
    viewQuote,
    markAsCompleted,
    getMaterialsReprice,
    sendEmailQuote,
    changeQuoteStatus,
    getSOBQuotes,
    createSectionsSOBQuotes,
    uploadImageFileToQuote,
    getQuoteMedia,
    getDefaultDisplayOptionsForQuotes,
    updateDisplayOptionsForQuotes,
    deleteQuoteMedia,
    updateQuoteMedia,
    deleteQuote,
    getDeliveryRequirements,
    getPaymentStatus,
  };
};
