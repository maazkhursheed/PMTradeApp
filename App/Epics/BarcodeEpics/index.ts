import firebase from "@react-native-firebase/app";
import * as R from "ramda";
import { Platform } from "react-native";
import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { getBranchTownRegion } from "~root/Lib/BranchHelper";
import { getRequestParams, getSelectedAccountId, isResponseOk, mapSanitizedItems, sanitizeSolrSearchForDb } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { BarcodeActions } from "~root/Reducers/BarcodeScanReducers";
import { IDependencies } from "~root/Reducers/CreateStore";

export const epicBarcodeSearchSolr: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(BarcodeActions.requestSearchSolr)),
    mergeMap(action => {
      const params = getRequestParams(state$);

      return api.hybris.solrSearch({ ...action.payload, isFromBarcodeScan: true }, params).pipe(
        mergeMap(response => {
          let products: any;
          products = response.data;
          if (isResponseOk(response) || products) {
            let data: any;
            data = R.map(R.compose(mapSanitizedItems(state$.value), sanitizeSolrSearchForDb), response.data);

            let productMatched;
            if (data && data.length > 0) {
              if (data.length === 1) {
                productMatched = data[0];
              } else {
                const barcodeScanned = action.payload.query;
                const barCodesFilter = data.filter((product: any) => product.barcode === barcodeScanned);
                if (barCodesFilter.length > 0) {
                  productMatched = barCodesFilter[0];
                }

                const SKUFilter = data.filter((product: any) => product.SKU === barcodeScanned);
                if (SKUFilter.length > 0) {
                  productMatched = SKUFilter[0];
                }
                const supplierIdFilter = data.filter((product: any) => product.manufacturerId === barcodeScanned);
                if (supplierIdFilter.length > 0) {
                  productMatched = supplierIdFilter[0];
                }
              }
              const event = "add_to_cart";
              const itemType = "Barcode Scan";
              const items: any[] = [
                {
                  item_name: productMatched.ProductDescription,
                  item_id: productMatched.SKU,
                  item_brand: productMatched.Brand,
                  price: parseFloat(productMatched.Price) || 0,
                  item_list_name: itemType,
                  index: 1,
                },
              ];
              const eventLogObject = {
                event,
                feature_type: itemType,
                userId: extractDigitalIdFromJWTPayload(decodeJWTToken(state$.value.login.tempToken.idToken)),
                accountId: getSelectedAccountId(state$.value),
                location: getBranchTownRegion(state$.value.branchList.selectedBranch),
                searchTerm: action.payload.query,
                searchResults: data.length,
                device_type: Platform.OS,
                items,
              };
              firebase.analytics().logEvent(event, eventLogObject);
            }
            return of(BarcodeActions.success(productMatched, action.payload.query));
          } else {
            return of(BarcodeActions.failure({ action, response }));
          }
        }),
      );
    }),
  );
