import { ApisauceInstance, create as apicreate } from "apisauce";
import { from } from "rxjs";
import AppConfig from "~root/Config/AppConfig";
import { IEditPermissionReq } from "~root/Lib/ManageTeamHelper";
import { Api } from "~root/Services/Api";

var api: ApisauceInstance | undefined = undefined;
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

export default {
  stcToggleFeature: {
    getSTCToggleFeature: () =>
      from(
        Promise.resolve({
          ok: false,
          data: undefined,
        }),
      ),
  },
  ace: {
    getOrderList: params =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/OrderDetailsData.json"),
        }),
      ),
    getProductList: (code, branch) =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/Top40.json"),
        }),
      ),
    getInventory: param =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/GetInventory.json"),
        }),
      ),
    getPrice: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/CustomerPricing.json"),
        }),
      ),
  },
  addressValidation: {
    getAddressSuggestions: text =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/AddressSuggestions.json"),
        }),
      ),
    getGeoCode: address =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/GeoCode.json"),
        }),
      ),
  },
  hybrisSolr: {
    solrSearch: param =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/SolrSearch.json"),
        }),
      ),
    getProductDetails: (sku, params) =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/ProductDetails.json"),
        }),
      ),
  },
  hybris: {
    solrSearch: () =>
      from(
        Promise.resolve({
          ok: true,
          status: 200,
          data: require("../Fixtures/GetSolarSearch.json"),
        }),
      ),
    getFrequentlyOrderedList: () =>
      from(
        Promise.resolve({
          ok: true,
          status: 200,
          data: require("../Fixtures/GetFrequentlyOrderedList.json"),
        }),
      ),
    getMarketingTile: () =>
      from(
        Promise.resolve({
          ok: true,
          status: 200,
          data: require("../Fixtures/GetMarketingTile.json"),
        }),
      ),
    getCartDetails: () =>
      from(
        Promise.resolve({
          ok: true,
          status: 200,
          data: require("../Fixtures/GetCartDetails.json"),
        }),
      ),
    getOrderList: params =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/OrderDetailsData.json"),
        }),
      ),

    setAuthorization: (token: string, aceToken: string, auth0Token: string, email: string) => {
      const api = getApi();
      api.setHeader("Authorization", "Bearer " + token);
      api.setHeader("hybristoken", aceToken);
      api.setHeader("email", email);
    },

    getRelatedAndSubstituteProducts: params =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/substituteProducts.json"),
        }),
      ),
    getUserCart: (email, headers) =>
      from(
        Promise.resolve({
          ok: true,
          status: 200,
          data: require("../Fixtures/GetUserCart.json"),
        }),
      ),
    searchSuggestions: term =>
      from(
        Promise.resolve({
          ok: true,
          status: 200,
          data: require("../Fixtures/Suggestions.json"),
        }),
      ),
    getJobAccounts: parms =>
      from(
        Promise.resolve({
          ok: true,
          status: 200,
          data: require("../Fixtures/JobAccounts.json"),
        }),
      ),
    getBranchList: branchOnly =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/BranchList.json"),
        }),
      ),
    getNearByBranchList: requestParams =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/NearByBranchesList.json"),
        }),
      ),
    getPermissionList: (id, accountId) =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/PermissionResponse.json"),
        }),
      ),
    updateUserPermission: (updateReq: IEditPermissionReq) =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/UpdatePermissions.json"),
        }),
      ),
    getSubscriptionKey: () =>
      from(
        Promise.resolve({
          ok: true,
          data: {
            access_token:
              "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjU4a2RxYl9LdksxNjJqeHZodHUteCJ9.eyJodHRwczovL2Vjb21tZXJjZS5wbGFjZW1ha2Vycy5jby5uei9lbWFpbCI6InNoYXNoaWthLmFiZXlzdXJpeWFAZmJ1LmNvbSIsImh0dHBzOi8vZWNvbW1lcmNlLnBsYWNlbWFrZXJzLmNvLm56L2Zyb21TaWdudXAiOmZhbHNlLCJodHRwczovL2Vjb21tZXJjZS5wbGFjZW1ha2Vycy5jby5uei9waG9uZU51bWJlciI6Iis2NDIyMzAwOTQ1OCIsImh0dHBzOi8vZWNvbW1lcmNlLnBsYWNlbWFrZXJzLmNvLm56L3N1cm5hbWUiOiJBYmV5c3VyaXlhIiwiaHR0cHM6Ly9lY29tbWVyY2UucGxhY2VtYWtlcnMuY28ubnovZmlyc3ROYW1lIjoic2hhc2hpa2EiLCJodHRwczovL2Vjb21tZXJjZS5wbGFjZW1ha2Vycy5jby5uei90cmFkZUFjY291bnRzIjp7InRyYWRlQWNjb3VudHMiOlt7ImJyYW5jaENvZGUiOiIxNTAiLCJjdXN0SWQiOiJKRU5DQSIsInVpZCI6IjE1MEpFTkNBIn0seyJicmFuY2hDb2RlIjoiMzYyIiwiY3VzdElkIjoiQTFKVU4iLCJ1aWQiOiIzNjJBMUpVTiJ9LHsiYnJhbmNoQ29kZSI6IjM2MiIsImN1c3RJZCI6IlRXSTdoIiwidWlkIjoiMzYyVFdJN2gifSx7ImJyYW5jaENvZGUiOiIzNjIiLCJjdXN0SWQiOiJBUkk5RiIsInVpZCI6IjM2MkFSSTlGIn0seyJicmFuY2hDb2RlIjoiMzYyIiwiY3VzdElkIjoiQU5UR0EiLCJ1aWQiOiIzNjJBTlRHQSJ9LHsiYnJhbmNoQ29kZSI6IjQ3MyIsImN1c3RJZCI6IkFBRFJBIiwidWlkIjoiNDczQUFEUkEifSx7ImJyYW5jaENvZGUiOiIzNjIiLCJjdXN0SWQiOiJIQURBQSIsInVpZCI6IjM2MkhBREFBIn0seyJicmFuY2hDb2RlIjoiMzYyIiwiY3VzdElkIjoiQU5ETEEiLCJ1aWQiOiIzNjJBTkRMQSJ9LHsiYnJhbmNoQ29kZSI6IjE0NiIsImN1c3RJZCI6IkJMQUFFIiwidWlkIjoiMTQ2QkxBQUUifSx7ImJyYW5jaENvZGUiOiIxODciLCJjdXN0SWQiOiJCTEFBRSIsInVpZCI6IjE4N0JMQUFFIn1dfSwiaXNzIjoiaHR0cHM6Ly90c3QtYXV0aC5wbGFjZW1ha2Vycy5jby5uei8iLCJzdWIiOiJhdXRoMHw1ZmIxYjg0NjUwODhmODAwNzVjZDIxOTIiLCJhdWQiOlsiaHR0cHM6Ly90ZXN0LWFwaXNlcnZpY2VzLmZibnpkLmNvLm56L2FwaSIsImh0dHBzOi8vbnpkaXN0cmlidXRpb24tZWNvbW1lcmNlLXRzdC5hdS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjY0NDUwNzA5LCJleHAiOjE2NjQ1MzcxMDksImF6cCI6IkJnV2xlRmtPTHZiNHlGR0JwWWxPQ0E1d3MzRVVnM1VCIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyJ9.pbXeSBfHiIsMZrVTsyldroYoNI9C_R9tJdNvSdx57MJ14hxKG5OxamoNgO_HK7OlsC98tm2MGw0xmhDLE8RL_5leDXVNgBk_iNrCqu90iYg5vLa8VQx8HGtgt31MoH3MDhEUw22To7SGvdXX8ieh-vbN4GU2DGzCPwL2O5gKZMzo6ScaIIbWiXUGLmuAUKREYzPlZQ9MMpT0q7V7uGG426IO1t5GvXKXmA4Wy9oQDHCJ_noI2KLv-XupEk33JgrxG-WwSNpvhKnaKvRTfbiLDQHf18FewURcNcHw3z55_VFpM1HetHPm7HpqTELXyvsk8e58wNARip6Mv6BG1or6cA",
            token_type: "bearer",
            id_token:
              "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjU4a2RxYl9LdksxNjJqeHZodHUteCJ9.eyJodHRwczovL2Vjb21tZXJjZS5wbGFjZW1ha2Vycy5jby5uei9lbWFpbCI6InNoYXNoaWthLmFiZXlzdXJpeWFAZmJ1LmNvbSIsImh0dHBzOi8vZWNvbW1lcmNlLnBsYWNlbWFrZXJzLmNvLm56L2Zyb21TaWdudXAiOmZhbHNlLCJodHRwczovL2Vjb21tZXJjZS5wbGFjZW1ha2Vycy5jby5uei9waG9uZU51bWJlciI6Iis2NDIyMzAwOTQ1OCIsImh0dHBzOi8vZWNvbW1lcmNlLnBsYWNlbWFrZXJzLmNvLm56L3N1cm5hbWUiOiJBYmV5c3VyaXlhIiwiaHR0cHM6Ly9lY29tbWVyY2UucGxhY2VtYWtlcnMuY28ubnovZmlyc3ROYW1lIjoic2hhc2hpa2EiLCJodHRwczovL2Vjb21tZXJjZS5wbGFjZW1ha2Vycy5jby5uei90cmFkZUFjY291bnRzIjp7InRyYWRlQWNjb3VudHMiOlt7ImJyYW5jaENvZGUiOiIxNTAiLCJjdXN0SWQiOiJKRU5DQSIsInVpZCI6IjE1MEpFTkNBIn0seyJicmFuY2hDb2RlIjoiMzYyIiwiY3VzdElkIjoiQTFKVU4iLCJ1aWQiOiIzNjJBMUpVTiJ9LHsiYnJhbmNoQ29kZSI6IjM2MiIsImN1c3RJZCI6IlRXSTdoIiwidWlkIjoiMzYyVFdJN2gifSx7ImJyYW5jaENvZGUiOiIzNjIiLCJjdXN0SWQiOiJBUkk5RiIsInVpZCI6IjM2MkFSSTlGIn0seyJicmFuY2hDb2RlIjoiMzYyIiwiY3VzdElkIjoiQU5UR0EiLCJ1aWQiOiIzNjJBTlRHQSJ9LHsiYnJhbmNoQ29kZSI6IjQ3MyIsImN1c3RJZCI6IkFBRFJBIiwidWlkIjoiNDczQUFEUkEifSx7ImJyYW5jaENvZGUiOiIzNjIiLCJjdXN0SWQiOiJIQURBQSIsInVpZCI6IjM2MkhBREFBIn0seyJicmFuY2hDb2RlIjoiMzYyIiwiY3VzdElkIjoiQU5ETEEiLCJ1aWQiOiIzNjJBTkRMQSJ9LHsiYnJhbmNoQ29kZSI6IjE0NiIsImN1c3RJZCI6IkJMQUFFIiwidWlkIjoiMTQ2QkxBQUUifSx7ImJyYW5jaENvZGUiOiIxODciLCJjdXN0SWQiOiJCTEFBRSIsInVpZCI6IjE4N0JMQUFFIn1dfSwiZ2l2ZW5fbmFtZSI6InNoYXNoaWthIiwiZmFtaWx5X25hbWUiOiJBYmV5c3VyaXlhIiwibmlja25hbWUiOiJzaGFzaGlrYS5hYmV5c3VyaXlhIiwibmFtZSI6InNoYXNoaWthLmFiZXlzdXJpeWFAZmJ1LmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8wOGFkMzM4OWQ1OTc4ZWY1MjhkZmRmMmJmMDhiYmM4ZD9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRnNoLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDIyLTA5LTI5VDExOjI1OjA4LjA5OFoiLCJlbWFpbCI6InNoYXNoaWthLmFiZXlzdXJpeWFAZmJ1LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly90c3QtYXV0aC5wbGFjZW1ha2Vycy5jby5uei8iLCJzdWIiOiJhdXRoMHw1ZmIxYjg0NjUwODhmODAwNzVjZDIxOTIiLCJhdWQiOiJCZ1dsZUZrT0x2YjR5RkdCcFlsT0NBNXdzM0VVZzNVQiIsImlhdCI6MTY2NDQ1MDkzMiwiZXhwIjoxNjY0NDg2OTMyfQ.fS7OUPLCnrOl_1GQThDv_xw4aQFoFDkjg7Dm4Syyddw6XirOgA3tzoR308YxQigCH3oeyVOKHG4rG-3l775ACqWNLzBwmQVP9wB3WmKy9VA5xqtO-EM0Vw3vOM5RRYf1BsXJQVWtUIe_rp6qGODofvNUBAFibudxxrEOqvx0aGAtfA9DXu2S9XdgFbaMFvTxhOHcBoYbQSBwtFI0WCbokbjsxAYbPI8lUs4NoRDw-r5LS2baVhAm8qU6RYhwdEH20kw22sZp62gpI5SnNqIIM9y50twjGbR78i-LNJuB9G8JSXqjg6kSQs8jj5dtY55wrh_tkWqagDtGNtsDpvo5QA",

            expires_in: 86400,
            scope: "openid profile email offline_access",
          },
        }),
      ),
    getUserInfo: token =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/UserInfo.json"),
        }),
      ),
    getAllList: email =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/AllList.json"),
        }),
      ),
    getListDetails: (email, name) =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/ListDetail.json"),
        }),
      ),
    addItemList: param =>
      from(
        Promise.resolve({
          ok: true,
          data: {},
        }),
      ),
    getCountriesList: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/GetCountries.json"),
        }),
      ),
    getBranchDetails: param =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/YourBranchesList.json"),
        }),
      ),
    createProductList: param =>
      from(
        Promise.resolve({
          ok: true,
          data: {},
        }),
      ),
    deleteList: param =>
      from(
        Promise.resolve({
          ok: true,
          data: {},
        }),
      ),
    getTeamMembers: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/GetTeamMembers.json"),
        }),
      ),
    getInviteDetails: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/GetInviteDetail.json"),
        }),
      ),
    getQuotesList: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/GetInviteDetail.json"),
        }),
      ),
    getQuoteProducts: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/RequestQuoteProducts.json"),
        }),
      ),
    addOwnProduct: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/AddOwnProduct.json"),
        }),
      ),
    getQuotesListDetails: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/RequestQuotesListDetails.json"),
        }),
      ),
    updateQuoteProductQuantity: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/UpdateQuoteProductQuantity.json"),
        }),
      ),
    updateQuoteMarkupPercent: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/UpdateQuoteMarkupPercent.json"),
        }),
      ),
    deleteQuoteProduct: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/DeleteQuoteProduct.json"),
        }),
      ),
    deleteQuote: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/DeleteQuote.json"),
        }),
      ),
    getDefaultDisplayOptionsForQuotes: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/DeleteQuote.json"),
        }),
      ),
    updateQuoteDetails: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/UpdateQuoteDetails.json"),
        }),
      ),
    updateQuoteJobStatus: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/UpdateQuoteJobStatus.json"),
        }),
      ),
    updateQuoteCompanyDetails: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/UpdateQuoteCompanyDetails.json"),
        }),
      ),
    addNewJob: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/AddNewJob.json"),
        }),
      ),
    requestLabourCost: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/LabourCosts.json"),
        }),
      ),
    createLabourCostAndOtherCosts: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/LabourCosts.json"),
        }),
      ),
    sendEmailQuote: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/SendEmailQuotes.json"),
        }),
      ),
    deleteLabourCostAndOtherCosts: () =>
      from(
        Promise.resolve({
          ok: true,
        }),
      ),
    getCompanyDetails: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/GetCompanyDetails.json"),
        }),
      ),
    updateLabourCostAndOtherCosts: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/UpdateLabourCosts.json"),
        }),
      ),
    viewQuote: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/ViewQuote.json"),
        }),
      ),
    markAsCompleted: () =>
      from(
        Promise.resolve({
          ok: true,
        }),
      ),
    changeQuoteStatus: () =>
      from(
        Promise.resolve({
          ok: true,
        }),
      ),
    uploadImageFileToQuote: () =>
      from(
        Promise.resolve({
          ok: true,
        }),
      ),
    getQuoteMedia: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/GetQuoteMedia.json"),
        }),
      ),
    deleteQuoteMedia: () =>
      from(
        Promise.resolve({
          ok: true,
        }),
      ),
    updateQuoteMedia: () =>
      from(
        Promise.resolve({
          ok: true,
        }),
      ),
    deleteCartEntry: () => from(Promise.resolve({ ok: true, data: require("../Fixtures/DeleteCartEntry.json") })),
    addProductToCart: () => from(Promise.resolve({ ok: true, data: require("../Fixtures/AddProductToCart.json") })),
    getDeliveryRequirements: () => from(Promise.resolve({ ok: true, data: require("../Fixtures/GetDeliveryRequirements.json") })),
    getSOBQuotes: () => from(Promise.resolve({ ok: true, data: require("../Fixtures/MaterialSectionSOBQuotes.json") })),
    deleteSectionsSOBQuotes: () => from(Promise.resolve({ ok: true, data: require("../Fixtures/DeleteSectionSOBQuotes.json") })),
    createSectionsSOBQuotes: () => from(Promise.resolve({ ok: true, data: require("../Fixtures/CreateSectionSOBQuotes.json") })),
    placeOrderApi: () => from(Promise.resolve({ ok: true, data: require("../Fixtures/PlaceOrder.json") })),
    siteContactApi: () => from(Promise.resolve({ ok: true, data: require("../Fixtures/SiteContact.json") })),
    saveDeliveryInfoToUserSessionCart: () => from(Promise.resolve({ ok: true, data: require("../Fixtures/SaveDeliveryInfoSessionCart.json") })),
    getEstimatesListDetails: () => from(Promise.resolve({ ok: true, data: require("../Fixtures/GetEstimateDetails.json") })),
    getEstimatesList: () => from(Promise.resolve({ ok: true, data: require("../Fixtures/GetEstimateList.json") })),
    requestEstimatesList: () => from(Promise.resolve({ ok: true, data: require("../Fixtures/GetEstimateDetails.json") })),
    addUpdateDeliveryAddress: () => from(Promise.resolve({ ok: true, data: require("../Fixtures/AddUpdateDeliveryAddress.json") })),
    requestSubCategories: () => from(Promise.resolve({ ok: true, data: require("../Fixtures/RequestSubCategories.json") })),
  },
  appstore: {
    getAppStoreVersion: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/GetQuotesList.json"),
        }),
      ),
  },
  stc: {
    getOrdersForReview: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/GetOrdersForReview.json"),
        }),
      ),
  },
  orderProductlistItem: {
    getOrderProductListingItem: () =>
      from(
        Promise.resolve({
          ok: true,
          data: require("../Fixtures/OrderProductListIten.json"),
        }),
      ),
  },
} as Api;
