import firebase from "@react-native-firebase/app";
import * as R from "ramda";
import { Alert } from "react-native";
import UXCam from "react-native-ux-cam";
import { Epic, ofType, StateObservable } from "redux-observable";
import { of } from "rxjs";
import { debounceTime, filter, first, mergeMap, switchMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { genericError } from "~root/Lib/AlertsHelper";
import { getBranchTownRegion } from "~root/Lib/BranchHelper";
import { addIfEstimatedParams, generateProductRequestForCart, setupForEstimatedProducts } from "~root/Lib/CartHelper";
import { invokeOnPath, shouldInvokeFailure } from "~root/Lib/CommonHelper";
import { findPricesForHybris, getCartViewsObj, getRemoveFromCartObject, getSelectedAccountId, isResponseOk, isTimberFlag } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { getAddToCartLogEventObj, getSpecialProducts } from "~root/Lib/ProductHelper";
import { generateURIfromObject } from "~root/Lib/StringHelper";
import { AppActions } from "~root/Reducers/AppReducers";
import { CartActions } from "~root/Reducers/CartReducer";
import { ConnectTradeActions } from "~root/Reducers/ConnectTradeReducers";
import { IDependencies } from "~root/Reducers/CreateStore";
import { JobAccountsActions } from "~root/Reducers/JobAccountsReducers";
import { getEmail } from "~root/Reducers/LoginReducers";
import { MyListActions } from "~root/Reducers/MyListReducers";
import { PixelActions } from "~root/Reducers/PixelReducer";
import { ProductActions } from "~root/Reducers/ProductReducers";
import { StcActions } from "~root/Reducers/StcReducers";

export const epicClearCart: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(ProductActions.clearCart)),
    mergeMap(action => {
      const email = getEmail(state$.value.login.userData) as string;
      const cartId = state$.value.cart.userCart?.code;
      return api.hybris.deleteCart(email, cartId, getHeaders(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            return of(CartActions.requestUserCart());
          } else {
            return of(CartActions.failure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicUpdateCart: Epic = (action$, state$, { db }: IDependencies) =>
  action$.pipe(
    ofType(getType(ProductActions.cartChange)),
    mergeMap(action => {
      let entry = action.payload.entry;

      // Changing Estimated Products quantity from cart
      action.payload.entry = addIfEstimatedParams(entry, action.payload);
      if (R.hasPath(["payload", "entry", "UniqueId"], action)) {
        entry = {
          product: {
            code: action.payload.entry.SKU,
            productPrice: action.payload.entry.Price,
            name: action.payload.entry.ProductDescription,
            timberProductFlag: isTimberFlag(action.payload.entry),
            length: action.payload.entry.sellOrderMultiple,
            sellOrderMultiple: action.payload.entry.sellOrderMultiple,
            manufacturer: action.payload.entry.Brand,
          },
        };
        // Adding products from within the Stages of Build
        if (action?.payload?.estimateNumber) {
          entry = R.mergeRight(entry, {
            estimateNumber: action.payload.estimateNumber,
            lineNumber: action.payload.entry.EstimateLineNumber,
            estimateProductPrice: isNaN(action.payload.entry.Price) ? 0 : action.payload.entry.Price,
            estimateProductFlag: action.payload.entry.EstimateProductFlag,
            estimateProductDesc: action.payload.entry.estimateProductDesc,
            estimateProductUnit: action.payload.entry.UOM,
          });
        }
        action.payload.entry = entry;
      }
      const digitalId = extractDigitalIdFromJWTPayload(decodeJWTToken(state$.value.login.tempToken.idToken)) || "";
      const selectedAccountId = getSelectedAccountId(state$.value) || "";
      const location = getBranchTownRegion(state$.value.branchList.selectedBranch) || "";
      const title = action.payload.entry.product.name || "Product detail";
      const prodCode = action.payload.entry.product.code || "0";
      const quantity = Math.abs(Number(action.payload.quantity || 0) - Number(action.payload.entry.decimalQty || 0));
      const price = Number(Number(action.payload.entry.product.productPrice).toFixed(2));
      const item_brand = action.payload.entry.product.manufacturer || "";

      if (Number(action.payload.quantity) === 0) {
        const eventLogObject = getRemoveFromCartObject({
          event: "remove_from_cart",
          digitalId,
          selectedAccountId,
          location,
          item_name: title,
          item_id: prodCode,
          item_brand,
          price,
          quantity,
          storeName: state$.value.branchList.selectedBranch?.name || "",
        });
        firebase.analytics().logEvent("remove_from_cart", eventLogObject);

        return of(CartActions.deleteCartEntry(action.payload, action.meta));
      } else if (action.payload.isUpdate) {
        return of(CartActions.updateItemQuantityRequest(action.payload, action.meta));
      } else {
        firebase.analytics().logEvent(
          "add_to_cart",
          getAddToCartLogEventObj({
            storeName: state$.value.branchList.selectedBranch?.name || "",
            location,
            quantity,
            title,
            prodCode,
            digitalId,
            selectedAccountId,
            price,
            item_brand,
          }),
        );
        return of(
          CartActions.addProductToCartRequest(action.payload, action.meta),
          PixelActions.pixelRequest("event", {
            title: action.payload.pixelTitle || title,
            ptype: "product",
            prod_id: prodCode,
            prod_name: title,
            sku: prodCode,
            etype: "click-add",
            group: "cart",
          }),
        );
      }
    }),
  );

export const epicDeleteItem: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(MyListActions.deleteItem)),
    mergeMap(action => {
      const email = state$.value.login.userData.uid;
      return api.hybris
        .removeItemsFromList(
          {
            userID: email,
            ...action.payload,
          },
          getHeaders(state$),
        )
        .pipe(
          mergeMap(response => {
            if (isResponseOk(response)) {
              invokeOnPath(["meta", "onSuccess"], action);
              return of(MyListActions.deleteItemSuccess(action.payload.skuList[0]));
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

export const epicUserCartRequest: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(CartActions.requestUserCart)),
    debounceTime(500),
    switchMap(action => {
      const email = getEmail(state$.value.login.userData) as string;
      return api.hybris.getUserCart(email, getHeaders(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            if (response.data.carts.length === 0) {
              return api.hybris.createUserCart(email, getHeaders(state$)).pipe(
                mergeMap(responseCart => {
                  if (isResponseOk(responseCart)) {
                    return of(CartActions.userCartSuccess(responseCart.data), CartActions.requestUserCartDetail());
                  } else {
                    return of(CartActions.failure({ action, response: responseCart }));
                  }
                }),
              );
            } else {
              return of(CartActions.userCartSuccess(response.data.carts[0]), CartActions.requestUserCartDetail());
            }
          } else {
            return of(CartActions.failure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicDeleteCartItem: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(CartActions.deleteCartEntry)),
    mergeMap(action => {
      const email = getEmail(state$.value.login.userData) as string;
      const cartId = state$.value.cart.userCart?.code;
      return api.hybris.deleteCartEntry(email, cartId, action.payload.entry.entryNumber, getHeaders(state$)).pipe(
        mergeMap(response => {
          const actions: any[] = [];
          if (isResponseOk(response)) {
            return api.hybris.getCartDetails(email, state$.value.cart.userCart?.code, getHeaders(state$)).pipe(
              mergeMap(responseCart => {
                if (isResponseOk(responseCart)) {
                  invokeOnPath(["meta", "onSuccess"], action);
                  actions.push(CartActions.userCartDetailSuccess(responseCart.data));
                } else {
                  invokeOnPath(["meta", "onFailure"], action);
                  actions.push(CartActions.failure({ action, response: responseCart }));
                }
                actions.push(
                  CartActions.cartItemDeleteMap({
                    code: action.payload.entry.product.code,
                    value: false,
                  }),
                );
                return R.apply(of, actions);
              }),
            );
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            actions.push(CartActions.failure({ action, response }));
            actions.push(
              CartActions.cartItemDeleteMap({
                code: action.payload.entry.product.code,
                value: false,
                failure: true,
              }),
            );
          }
          return R.apply(of, actions);
        }),
      );
    }),
  );

export const epicDeleteCartItemMap: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(CartActions.deleteCartEntry)),
    mergeMap(action => {
      return of(
        CartActions.cartItemDeleteMap({
          code: action.payload.entry.product.code,
          value: true,
        }),
      );
    }),
  );

export const epicSwapCartProduct: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(CartActions.swapCartProduct)),
    mergeMap(action => {
      const email = getEmail(state$.value.login.userData) as string;
      let bodyParams = {
        quantity: action?.payload?.quantity?.toString(),
        decimalQty: action?.payload?.quantity,
        product: {
          code: action?.payload?.entry?.SKU,
          productPrice: action?.payload?.entry?.Price,
          name: action?.payload?.entry?.name,
          timberProductFlag: isTimberFlag(action?.payload?.entry),
          length: action?.payload?.entry?.SelectedMultiple,
        },
      };
      bodyParams = setupForEstimatedProducts(bodyParams, action.payload);
      const item = action?.payload?.existingCartItem;
      const deleteCart = {
        entry: {
          product: {
            code: item?.product?.code,
            productPrice: item?.basePrice?.value,
            name: item?.product?.name,
            timberProductFlag: isTimberFlag(item),
            length: item?.product?.sellOrderMultiple,
            sellOrderMultiple: item?.product?.sellOrderMultiple,
          },
          entryNumber: item?.entryNumber,
          decimalQty: item?.decimalQty,
        },
        quantity: 0,
        isUpdate: true,
      };
      return api.hybris.addProductToCart(email, state$.value.cart.userCart?.code, bodyParams, getHeaders(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            const actions = [];
            actions.push(CartActions.addProductToCartSuccess(response.data?.entriesCount || 0));
            const cartId = state$.value.cart.userCart?.code;
            return api.hybris.deleteCartEntry(email, cartId, deleteCart.entry.entryNumber, getHeaders(state$)).pipe(
              mergeMap(response => {
                const actions: any[] = [];
                if (isResponseOk(response)) {
                  return api.hybris.getCartDetails(email, state$.value.cart.userCart?.code, getHeaders(state$)).pipe(
                    mergeMap(responseCart => {
                      action.meta?.onSuccess?.();
                      actions.push(CartActions.swapCartProductSuccess());
                      if (isResponseOk(responseCart)) {
                        actions.push(CartActions.userCartDetailSuccess(responseCart.data));
                      } else {
                        actions.push(CartActions.failure({ action, response: responseCart }));
                      }
                      actions.push(
                        CartActions.cartItemDeleteMap({
                          code: deleteCart.entry.product.code,
                          value: false,
                        }),
                      );
                      return R.apply(of, actions);
                    }),
                  );
                } else {
                  invokeOnPath(["meta", "onFailure"], action);
                  actions.push(CartActions.swapCartProductFailure());
                  actions.push(CartActions.failure({ action, response }));
                  actions.push(
                    CartActions.cartItemDeleteMap({
                      code: action.payload.entry.product.code,
                      value: false,
                      failure: true,
                    }),
                  );
                }
                return R.apply(of, actions);
              }),
            );
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(CartActions.failure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicAddProductToCart: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(CartActions.addProductToCartRequest)),
    mergeMap(action => {
      const email = getEmail(state$.value.login.userData) as string;

      let bodyParams = {
        quantity: "1",
        decimalQty: action.payload.quantity,
        // @ts-ignore
        product: generateProductRequestForCart(action.payload.entry),
      };
      bodyParams = setupForEstimatedProducts(bodyParams, action.payload);
      return api.hybris.addProductToCart(email, state$.value.cart.userCart?.code, bodyParams, getHeaders(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            action.meta?.onSuccess?.();
            const actions = [];
            actions.push(CartActions.addProductToCartSuccess(response.data?.entriesCount || 0), CartActions.requestUserCartDetail());
            return R.apply(of, actions);
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(CartActions.failure({ action, response }));
          }
        }),
      );
    }),
  );

export const getCartDetailsRequest: Epic = (action$, state$, { api, store }: IDependencies) =>
  action$.pipe(
    ofType(getType(CartActions.requestUserCartDetail)),
    debounceTime(1500),
    mergeMap(action => {
      return state$.pipe(
        filter(state => state.cart.userCart !== null),
        first(),
        mergeMap(state => {
          const userId = getEmail(state.login.userData) as string;
          return api.hybris.getCartDetails(userId, state.cart.userCart?.code, getHeaders(state$)).pipe(
            mergeMap(response => {
              if (isResponseOk(response)) {
                const prevTradeAccount = response.data.lastSelectedTradeAccount;
                const prevJobAccount = response.data.lastSelectedJobAccount;
                const actions = [];
                if (state$.value.connectTrade.selectedTradeAccount.accountTypeEnum === "CASH") {
                  const specialProductsEntries = R.filter(getSpecialProducts)(response.data?.entries) as any[];
                  const standardProductsEntries = R.reject(getSpecialProducts)(response.data?.entries) as any[];
                  actions.push(CartActions.payNowAndPayCallBackSuccess({ payNowDetails: standardProductsEntries, payCallBackDetails: specialProductsEntries }));
                }

                actions.push(CartActions.userCartDetailSuccess(response.data));
                // log firebase analytics for Cart View
                const event = "view_cart";
                const params = {
                  event,
                  userId: extractDigitalIdFromJWTPayload(decodeJWTToken(state$.value.login.tempToken.idToken)),
                  accountId: getSelectedAccountId(state$.value),
                  location: getBranchTownRegion(state$.value.branchList.selectedBranch),
                  itemList: response.data,
                };
                const eventLogObject = getCartViewsObj(params);
                firebase.analytics().logEvent(event, eventLogObject);
                // log end

                /*if (prevJobAccount && prevJobAccount !== state$.value.jobAccounts?.selectedJobAccount?.JobId) {
                  prevJobId = prevJobAccount;
                  prevSelectionAction = ConnectTradeActions.onSelectedTradeAccount(
                    { ...state$.value.connectTrade.selectedTradeAccount, prevJobId },
                    action.meta,
                  );
                }*/

                if (prevTradeAccount && prevTradeAccount !== state$.value.connectTrade?.selectedTradeAccount?.uid) {
                  const selectedTradeAccount = R.compose(
                    R.find(R.propEq("uid", prevTradeAccount)),
                    R.flatten,
                    R.map(R.prop("data")),
                  )(state$.value.connectTrade.dataTradeListUserInfo);
                  actions.push(
                    ConnectTradeActions.onSelectedTradeAccount(
                      {
                        ...selectedTradeAccount,
                        prevJobId: prevJobAccount,
                      },
                      action.meta,
                    ),
                  );
                } else if (prevJobAccount && prevJobAccount !== state$.value.jobAccounts.selectedJoobAccount?.JobId) {
                  state$
                    .pipe(
                      filter(value => value.connectTrade.selectedTradeAccount?.uid === prevTradeAccount && value.jobAccounts.data.length > 0),
                      first(),
                      mergeMap(value => of(value.jobAccounts.data)),
                    )
                    .subscribe(value => {
                      // @ts-ignore
                      store().dispatch(JobAccountsActions.selectJobAccount(R.find(R.propEq("JobId", prevJobAccount), value)));
                    });
                  // const email = getEmail(state$.value.login.userData);
                  // api.hybris.getJobAccounts(email, prevTradeAccount).;
                }

                invokeOnPath(["meta", "onSuccess"], action);
                return R.apply(of, actions);
              } else {
                invokeOnPath(["meta", "onFailure"], action);
                return of(CartActions.failure({ action, response }));
              }
            }),
          );
        }),
      );
    }),
  );

export const epicApplyVoucher: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(CartActions.requestApplyVoucher)),
    mergeMap(action => {
      return state$.pipe(
        filter(state => state.cart.userCart !== null),
        first(),
        mergeMap(state => {
          const userId = getEmail(state.login.userData) as string;
          return api.hybris.applyVoucher(userId, state.cart.userCart?.code, generateURIfromObject(action.payload), getHeaders(state$)).pipe(
            mergeMap(response => {
              if (isResponseOk(response)) {
                const applyVoucherSuccessResponse = response;
                const actions: any[] = [];
                return api.hybris.getCartDetails(userId, state.cart.userCart?.code, getHeaders(state$)).pipe(
                  mergeMap(responseCart => {
                    if (isResponseOk(responseCart)) {
                      invokeOnPath(["meta", "onSuccess"], action);
                      actions.push(CartActions.userCartDetailSuccess(responseCart.data));
                    } else {
                      invokeOnPath(["meta", "onFailure"], action);
                      actions.push(
                        CartActions.failure({
                          action,
                          response: responseCart,
                        }),
                      );
                    }
                    actions.push(CartActions.applyVoucherSuccess(applyVoucherSuccessResponse.data));
                    return R.apply(of, actions);
                  }),
                );
              } else {
                invokeOnPath(["meta", "onFailure"], action);
                return of(CartActions.failure({ action, response }));
              }
            }),
          );
        }),
      );
    }),
  );

export const epicDeleteAppliedVoucher: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(CartActions.requestDeleteAppliedVoucher)),
    mergeMap(action => {
      return state$.pipe(
        filter(state => state.cart.userCart !== null),
        first(),
        mergeMap(state => {
          const userId = getEmail(state.login.userData) as string;
          return api.hybris.deleteAppliedVoucher(userId, state.cart.userCart?.code, action.payload.voucherId, getHeaders(state$)).pipe(
            mergeMap(response => {
              if (isResponseOk(response)) {
                const deleteVoucherData = response.data;
                const actions: any[] = [];
                return api.hybris.getCartDetails(userId, state.cart.userCart?.code, getHeaders(state$)).pipe(
                  mergeMap(responseCart => {
                    if (isResponseOk(responseCart)) {
                      invokeOnPath(["meta", "onSuccess"], action);
                      actions.push(CartActions.userCartDetailSuccess(responseCart.data));
                    } else {
                      invokeOnPath(["meta", "onFailure"], action);
                      actions.push(
                        CartActions.failure({
                          action,
                          response: responseCart,
                        }),
                      );
                    }
                    actions.push(CartActions.deleteAppliedVoucherSuccess(deleteVoucherData));
                    return R.apply(of, actions);
                  }),
                );
              } else {
                invokeOnPath(["meta", "onFailure"], action);
                return of(CartActions.failure({ action, response }));
              }
            }),
          );
        }),
      );
    }),
  );

export const epicCartItemQuantity: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(CartActions.updateItemQuantityRequest)),
    mergeMap(action => {
      const email = getEmail(state$.value.login.userData) as string;
      const digitalId = extractDigitalIdFromJWTPayload(decodeJWTToken(state$.value.login.tempToken.idToken)) || "";
      const selectedAccountId = getSelectedAccountId(state$.value) || "";
      const location = getBranchTownRegion(state$.value.branchList.selectedBranch) || "";
      const title = action.payload.entry.product.name || "Product detail";
      const prodCode = action.payload.entry.product.code || "0";
      const quantity = Math.abs(Number(action.payload.quantity || 0) - Number(action.payload.entry.decimalQty || 0));
      const price = Number(Number(action.payload.entry.product.productPrice).toFixed(2));
      const item_brand = action.payload.entry.product.manufacturer || "";

      if (action.payload.quantity - action.payload.entry.decimalQty > 0) {
        firebase.analytics().logEvent(
          "add_to_cart",
          getAddToCartLogEventObj({
            storeName: state$.value.branchList.selectedBranch?.name || "",
            location,
            quantity,
            title,
            prodCode,
            digitalId,
            selectedAccountId,
            price,
            item_brand,
          }),
        );
      } else {
        firebase.analytics().logEvent(
          "remove_from_cart",
          getRemoveFromCartObject({
            event: "remove_from_cart",
            digitalId,
            selectedAccountId,
            location,
            item_name: title,
            item_id: prodCode,
            item_brand,
            price,
            quantity,
            storeName: state$.value.branchList.selectedBranch?.name || "",
          }),
        );
      }

      let params = {
        quantity: 1,
        decimalQty: action.payload.quantity - action.payload.entry.decimalQty,
        // @ts-ignore
        product: generateProductRequestForCart(action.payload.entry),
      };
      params = addIfEstimatedParams(params, action.payload);
      return api.hybris
        .updateCartItemQuantity(
          {
            uid: email,
            cartId: state$.value.cart.userCart?.code,
            entryId: action.payload.entry.entryNumber,
          },
          params,
          getHeaders(state$),
        )
        .pipe(
          mergeMap(response => {
            const actions: any[] = [];
            if (isResponseOk(response)) {
              return api.hybris.getCartDetails(email, state$.value.cart.userCart?.code, getHeaders(state$)).pipe(
                mergeMap(responseCart => {
                  if (isResponseOk(responseCart)) {
                    invokeOnPath(["meta", "onSuccess"], action);
                    actions.push(CartActions.userCartDetailSuccess(responseCart.data));
                  } else {
                    invokeOnPath(["meta", "onFailure"], action);
                    actions.push(CartActions.failure({ action, response: responseCart }));
                  }
                  actions.push(
                    CartActions.cartItemUpdateMap({
                      code: action.payload.entry.product.code,
                      value: false,
                    }),
                  );
                  return R.apply(of, actions);
                }),
              );
            } else {
              actions.push(CartActions.failure({ action, response }));
              actions.push(
                CartActions.cartItemUpdateMap({
                  code: action.payload.entry.product.code,
                  value: false,
                }),
              );
              return R.apply(of, actions);
            }
          }),
        );
    }),
  );

export const epicCartItemUpdateMap: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(CartActions.updateItemQuantityRequest)),
    mergeMap(action => {
      return of(
        CartActions.cartItemUpdateMap({
          code: action.payload.entry.product.code,
          value: true,
        }),
      );
    }),
  );

export const epicFulfilmentEligibility: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(CartActions.checkFulfilmentEligibility),
    mergeMap(action => {
      const cartId = state$.value.cart.userCart?.code;
      const userId = getEmail(state$.value.login.userData) as string;
      return api.hybris.fulfilmentEligibility(userId, cartId, getHeaders(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(CartActions.successFulfilmentEligibility(response.data.fulfillmentTypes));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(CartActions.failure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicSTCCartStockPrice: Epic = (action$, state$, { api, db }: IDependencies) =>
  action$.pipe(
    ofType(getType(StcActions.requestSTCStockPrice)),
    mergeMap(action => {
      return api.hybris
        .getStockAndPrice({
          skus: action.payload.skuList,
          branchId: R.prop("branchId", action.payload.item),
          stocksBranchId: R.prop("fulfilmentBranchId", action.payload.item),
          jobAccountId: R.prop("jobAccount", action.payload.item),
          tradeAccountId: R.prop("clientId", action.payload.item),
        })
        .pipe(
          mergeMap(response => {
            if (isResponseOk(response) && response.data?.serviceResult?.code === "0") {
              const updatedPriceStock = R.map(value => findPricesForHybris(value, response), action.payload.skuList);
              return of(StcActions.successSTCCart(updatedPriceStock));
            } else {
              return of(ProductActions.failure({ action, response }));
            }
          }),
        );
    }),
  );

export const epicSaveDeliveryInfoToUserSessionCart: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(CartActions.requestSaveDeliveryInfoToUserSessionCart),
    debounceTime(500),
    mergeMap(action => {
      const cartId = state$.value.cart.userCart?.code;
      const userId = R.path(["login", "userData", "uid"], state$.value) as string;
      return api.hybris
        .saveDeliveryInfoToUserSessionCart(
          userId,
          cartId,
          {
            deliveryMode: state$.value.branchList.selectedOrderType,
            requestedDate: state$.value.cart.requestDate,
            requestedTime: state$.value.cart.requestTime,
            ...action.payload,
          },
          getHeaders(state$),
        )
        .pipe(
          mergeMap(response => {
            if (isResponseOk(response)) {
              invokeOnPath(["meta", "onSuccess"], action);
              return of(CartActions.saveDeliveryInfoToUserSessionCartSuccess(response.data), CartActions.requestUserCartDetail());
            } else {
              invokeOnPath(["meta", "onFailure"], action);
              return of(CartActions.failureDeliveryInfo({ action, response }));
            }
          }),
        );
    }),
  );

export const epicSaveCartContactDetails: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(CartActions.requestSaveCartContactDetails),
    debounceTime(500),
    mergeMap(action => {
      const cartId = state$.value.cart.userCart?.code;
      const userId = R.path(["login", "userData", "uid"], state$.value) as string;
      return api.hybris.siteContactApi(action.payload, userId, cartId, getHeaders(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(CartActions.saveCartContactDetailsSuccess(response.data), CartActions.requestUserCartDetail());
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(CartActions.saveCartContactDetailsFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicDeleteContactDetails: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(CartActions.deleteSiteContactDetails),
    debounceTime(500),
    mergeMap(action => {
      const cartId = state$.value.cart.userCart?.code;
      const userId = R.path(["login", "userData", "uid"], state$.value) as string;
      return api.hybris
        .deleteSiteContactDetails(R.ifElse(R.compose(R.equals("Array"), R.type), R.identity, R.of)(action.payload), userId, cartId, getHeaders(state$))
        .pipe(
          mergeMap(response => {
            if (isResponseOk(response)) {
              // invokeOnPath(["meta", "onSuccess"], action);
              return of(CartActions.deleteSiteContactDetailsSuccess(), CartActions.requestUserCartDetail(undefined, action.meta));
            } else {
              invokeOnPath(["meta", "onFailure"], action);
              return of(
                CartActions.deleteSiteContactDetailsFailure({
                  action,
                  response,
                }),
              );
            }
          }),
        );
    }),
  );

export const getHeaders = (state$: StateObservable<any>) => {
  const tradeAccount = state$.value.connectTrade.selectedTradeAccount;
  const jobAccount = state$.value.jobAccounts.selectedJobAccount;
  return {
    fulfillmentbranch: state$.value.branchList?.selectedBranch?.branchCode,
    parentbranch: tradeAccount?.branch?.branchCode,
    tradeaccount: tradeAccount?.uid,
    jobaccount: jobAccount ? jobAccount.JobId : tradeAccount?.uid,
  };
};

export const epicCartFailure: Epic = (action$, state$, { api, store }: IDependencies) =>
  action$.pipe(
    ofType(getType(CartActions.failure)),
    mergeMap(actionReceived => {
      const { action, response } = actionReceived.payload;
      if (response?.status === 400 && action?.type === getType(CartActions.addProductToCartRequest)) {
        const errors = response.data?.errors;
        if (errors?.length > 0) {
          UXCam.setAutomaticScreenNameTagging(false);
          Alert.alert("Error", errors[0].message || genericError, [
            {
              text: "Retry",
              onPress: async () => {
                store().dispatch(action);
              },
            },
            {
              text: "Cancel",
            },
          ]);
        }
        return of(CartActions.requestUserCart());
      } else {
        return of(AppActions.voidAction());
      }
    }),
  );

export const epicSaveCartInfo: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(CartActions.requestSaveCartInfo),
    debounceTime(500),
    mergeMap(action => {
      const cartId = state$.value.cart.userCart?.code;
      const userId = R.path(["login", "userData", "uid"], state$.value) as string;
      return api.hybris.saveCartInfo(action.payload, userId, cartId, getHeaders(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(CartActions.saveCartInfoSuccess(response.data), CartActions.requestUserCartDetail());
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(CartActions.saveCartInfoFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicGetDeliveryRequirements: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(CartActions.requestDeliveryRequirements),
    mergeMap(action => {
      const cartId = state$.value.cart.userCart?.code;
      const userId = R.path(["login", "userData", "uid"], state$.value) as string;
      return api.hybris.getDeliveryRequirements(userId, cartId, getHeaders(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            // action.meta?.onSuccess?.();
            return of(CartActions.deliveryRequirementsSuccess(response.data));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(CartActions.deliveryRequirementsFailure({ action, response }));
          }
        }),
      );
    }),
  );
