import { firebase } from "@react-native-firebase/analytics";
import * as R from "ramda";
import * as RA from "ramda-adjunct";
import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { map, mergeMap, switchMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { getHeaders } from "~root/Epics/CartEpics";
import { getBranchTownRegion } from "~root/Lib/BranchHelper";
import { invokeOnPath, shouldInvokeFailure } from "~root/Lib/CommonHelper";
import {
  getProductListCategoryViewObject,
  getProductListSearchObject,
  getRequestParams,
  getSanitizedListOfAllSuggestions,
  getSanitizedListOfSuggestions,
  getSelectedAccountId,
  isResponseOk,
  mapSanitizedItems,
  sanitizeSolrSearchForDb,
} from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { getExpressParam, getSearchParameters, isExpressJourney } from "~root/Lib/ProductHelper";
import { IDependencies } from "~root/Reducers/CreateStore";
import { FrequentOrderActions } from "~root/Reducers/FrequentOrderReducers";
import { getEmail } from "~root/Reducers/LoginReducers";
import { MyListActions } from "~root/Reducers/MyListReducers";
import { ProductActions } from "~root/Reducers/ProductReducers";
import { SearchSuggestionsActions } from "~root/Reducers/SearchSuggestionsReducers";

export const epicSearchSolr: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(ProductActions.requestSearchSolr)),

    mergeMap(action => {
      const query = getExpressParam(state$)(action.payload);
      const params = getSearchParameters(state$.value);

      const page = R.pathOr(0, ["payload", "currentPage"], action);

      return api.hybris.solrSearch(action.payload, params).pipe(
        mergeMap(response => {
          if (isResponseOk(response) || RA.isNotNilOrEmpty(R.path(["data", "products"], response))) {
            const totalPages = R.pathOr(0, ["data", "pagination", "totalPages"], response);
            const productCount = R.pathOr(0, ["data", "pagination", "totalResults"], response);

            const breadcrumbs = R.pathOr([], ["data", "breadcrumbs"], response) as any;
            const facetValueName = breadcrumbs.length ? breadcrumbs[0].facetValueName : undefined;
            const isFromMarketingTile = action.payload.query?.includes(":relevance:category:");
            const actionMeta = isFromMarketingTile ? "" : action.payload.query;

            const data = R.compose(
              R.ifElse(
                R.always(page > 0),
                R.concat(
                  action.payload.query?.length > 0 && !isFromMarketingTile
                    ? R.pathOr([], ["value", "product", "dataSearch", "products"], state$)
                    : R.pathOr([], ["value", "product", "data", "products"], state$),
                ),
                R.identity,
              ),
              R.map(mapSanitizedItems(state$.value)),
              R.map(sanitizeSolrSearchForDb),
              R.prop("products"),
            )(response.data);
            const facets = R.compose(R.prop("facets"))(response.data)?.filter((item: any) => item.name !== "Categories");
            // Log analytics events
            const selectedAccountId = getSelectedAccountId(state$.value);
            const digitalId = extractDigitalIdFromJWTPayload(decodeJWTToken(state$.value.login.tempToken.idToken));
            const storeName = state$.value.branchList.selectedBranch?.name || "";
            const location = getBranchTownRegion(state$.value.branchList.selectedBranch);

            let eventLogObject;
            if (action.payload.query === "category:root") {
              eventLogObject = getProductListCategoryViewObject({
                event: "view_item_list",
                digitalId,
                selectedAccountId,
                sanitizedData: data,
                location,
                storeName,
              });
            } else {
              eventLogObject = getProductListSearchObject({
                event: "view_item_list",
                digitalId,
                selectedAccountId,
                sanitizedData: data,
                location,
                storeName,
                searchTerm: action.payload.query,
              });
            }

            firebase.analytics().logEvent("view_item_list", eventLogObject);
            // Log end

            const pageIncremented = Number(page) + 1;
            let isShowReset = false;
            const allFacets = facets?.map((item: any) => {
              const selectedArr = item?.values?.filter((facetItem: any) => facetItem?.selected) ?? [];
              if (selectedArr?.length > 0) {
                isShowReset = true;
              }
              return {
                ...item,
                selectedArr,
              };
            });
            if (action.meta && action.meta.onSuccess) {
              action.meta.onSuccess(pageIncremented);
            }
            return of(
              ProductActions.success(
                {
                  products: data,
                  pages: totalPages,
                  totalResults: productCount,
                  currentQuery: response.data.currentQuery?.query?.value,
                  facetValueName,
                },
                actionMeta,
              ),
              ProductActions.updateFacets({
                allFacets,
                isShowReset,
              }),
            );
          } else {
            return of(
              ProductActions.clearProducts(),
              ProductActions.updateFacets({
                allFacets: undefined,
                isShowReset: false,
              }),
              ProductActions.failure({ action, response }),
            );
          }
        }),
      );
    }),
  );

export const epicFrequentProducts: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(FrequentOrderActions.requestFrequentOrder)),
    mergeMap(action => {
      const params = getSearchParameters(state$.value);
      return api.hybris.getFrequentlyOrderedList(params).pipe(
        mergeMap(response => {
          if (isResponseOk(response) || RA.isNotNilOrEmpty(R.path(["data", "customer", "products"], response))) {
            const data = R.compose(R.map(mapSanitizedItems(state$.value)), R.map(sanitizeSolrSearchForDb), R.prop("products"))(response.data.customer);

            return of(
              FrequentOrderActions.successFrequentOrder({
                products: data,
              }),
            );
          } else {
            return of(FrequentOrderActions.successFrequentOrder({ products: [] }), FrequentOrderActions.failure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicListDetail: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(MyListActions.requestMyList)),
    mergeMap(action => {
      // @ts-ignore
      const params = R.compose(
        R.mergeRight({
          listName: action.payload,
          expressOrder: isExpressJourney(state$),
          userID: R.path(["login", "userData", "uid"], state$.value),
        }),
        getSearchParameters,
      )(state$.value);

      return api.hybris.getListDetails(params, getHeaders(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            const result = R.compose(R.map(mapSanitizedItems(state$.value)), R.map(sanitizeSolrSearchForDb), R.prop("productList"))(response.data);

            invokeOnPath(["meta", "onSuccess"], action);
            return of(MyListActions.successListDetail(result));
          } else {
            return of(MyListActions.failure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicGetAllList: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(MyListActions.getAllList)),
    mergeMap(action => {
      const id = getEmail(state$.value.login.userData) as string;
      return api.hybris.getAllList(id, getHeaders(state$)).pipe(
        map(response => {
          if (isResponseOk(response)) {
            if (action.meta?.onSuccess) {
              action.meta.onSuccess(R.pathOr([], ["data", "PMMyProductListWsDTOList"], response));
            }
            return MyListActions.successAllLists(R.pathOr([], ["data", "PMMyProductListWsDTOList"], response));
          } else {
            if (response.status === 400) {
              invokeOnPath(["meta", "onSuccess"], action);
              return MyListActions.successAllLists([]);
            }
            return MyListActions.failure({ action, response });
          }
        }),
      );
    }),
  );

export const epicAddItemForNewList: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(MyListActions.addItemToNewList)),
    mergeMap(action => {
      const email = getEmail(state$.value.login.userData);

      return api.hybris
        .createProductList(
          {
            userID: email,
            ...action.payload,
          },
          getHeaders(state$),
        )
        .pipe(
          mergeMap((response: any) => {
            if (isResponseOk(response)) {
              return of(MyListActions.addItemToList(action.payload, action.meta));
            } else {
              invokeOnPath(["meta", "onFailure"], action);
              return of(MyListActions.failure({ action, response }));
            }
          }),
        );
    }),
  );

export const epicAddItemToList: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(MyListActions.addItemToList)),
    mergeMap(action => {
      const userID = getEmail(state$.value.login.userData);

      const params = getRequestParams(state$);

      return api.hybris
        .addItemList(
          {
            ...params,
            userID,
            ...action.payload,
          },
          getHeaders(state$),
        )
        .pipe(
          mergeMap(response => {
            if (isResponseOk(response)) {
              return of(MyListActions.success(), MyListActions.getAllList(undefined, action.meta));
            } else {
              if (shouldInvokeFailure(response)) {
                invokeOnPath(["meta", "onFailure"], action);
              }
              return of(MyListActions.failure({ action, response }));
            }
          }),
        );
    }),
  );

export const epicRemoveItemFromList: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(MyListActions.removeItemFromList)),
    mergeMap(action =>
      api.hybris.removeItemsFromList(action.payload, getHeaders(state$)).pipe(
        map(response => {
          if (isResponseOk(response)) {
            return MyListActions.success();
          } else {
            return MyListActions.failure({ action, response });
          }
        }),
      ),
    ),
  );

export const epicAddList: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(MyListActions.addList)),
    mergeMap(action => {
      const userID = getEmail(state$.value.login.userData);
      return api.hybris
        .createProductList(
          {
            listName: action.payload,
            userID,
          },
          getHeaders(state$),
        )
        .pipe(
          mergeMap(response => {
            if (isResponseOk(response)) {
              invokeOnPath(["meta", "onSuccess"], action);

              return of(MyListActions.getAllList(undefined, {}));
            } else {
              invokeOnPath(["meta", "onFailure"], action);
              return of(MyListActions.failure({ action, response }));
            }
          }),
        );
    }),
  );

export const epicRemoveList: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(MyListActions.removeList)),
    mergeMap((action: any) => {
      const userID = getEmail(state$.value.login.userData) as string;
      return api.hybris
        .deleteList(
          {
            listName: action.payload,
            userID,
          },
          getHeaders(state$),
        )
        .pipe(
          mergeMap(response => {
            if (isResponseOk(response)) {
              invokeOnPath(["meta", "onSuccess"], action);
              return of(MyListActions.getAllList(undefined, {}));
            } else {
              invokeOnPath(["meta", "onFailure"], action);
              return of(MyListActions.failure({ action, response }));
            }
          }),
        );
    }),
  );

export const epicSearchSuggestions: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(SearchSuggestionsActions.requestSearchSuggestions)),
    mergeMap(action => {
      return api.hybris.searchSuggestions(action.payload).pipe(
        switchMap(response => {
          if (isResponseOk(response)) {
            return of(
              SearchSuggestionsActions.successSearchSuggestions({
                all: getSanitizedListOfAllSuggestions(response.data),
                data: getSanitizedListOfSuggestions(response.data),
              }),
            );
          } else {
            return of(
              SearchSuggestionsActions.failureSearchSuggestions({
                action,
                response,
              }),
            );
          }
        }),
      );
    }),
  );

export const epicRenameList: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(MyListActions.renameList)),
    mergeMap(action => {
      const email = getEmail(state$.value.login.userData);
      const param = {
        userID: email,
        ...action.payload,
      };
      return api.hybris.updateList(param, getHeaders(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            if (shouldInvokeFailure(response)) {
              invokeOnPath(["meta", "onSuccess"], action);
            }
            return of(MyListActions.renameListSuccess());
          } else {
            return of(MyListActions.failure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicTopCategoryProducts: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(ProductActions.requestTopCategoryProducts)),
    mergeMap(action => {
      const params = getSearchParameters(state$.value);

      return api.hybris.solrSearch({ query: ":Sort By:category:" + action.payload, currentPage: "0" }, params).pipe(
        mergeMap(response => {
          if (isResponseOk(response) || RA.isNotNilOrEmpty(R.path(["data", "products"], response))) {
            if (action.meta && action.meta.onSuccess) {
              const data = R.compose(R.map(mapSanitizedItems(state$.value)), R.map(sanitizeSolrSearchForDb), R.prop("products"))(response.data);

              action.meta.onSuccess(data);
            }
            return of(ProductActions.topCategoryProductsSuccess());
          } else {
            return of(ProductActions.topCategoryProductsfailure({ action, response }));
          }
        }),
      );
    }),
  );
