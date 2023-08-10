import AsyncStorage from "@react-native-async-storage/async-storage";
import * as R from "ramda";
import { Epic, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import AppConfig from "~root/Config/AppConfig";
import { AppActions } from "~root/Reducers/AppReducers";
import { IDependencies } from "~root/Reducers/CreateStore";
import { KEY_IS_RETURNING_USER, PixelActions } from "~root/Reducers/PixelReducer";

export const epicLogPixelEvent: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(PixelActions.pixelRequest)),
    mergeMap(async (action: any) => {
      if (!AppConfig.IS_PRODUCTION) {
        return of(AppActions.voidAction());
      }

      const clientId = "uid=" + state$.value.notification.token; //+ (await firebase.messaging().getToken().catch(console.log)) || "";
      const isReturning = await AsyncStorage.getItem(KEY_IS_RETURNING_USER);
      const hitCount = isReturning ? "2" : "1";
      const cookie2 = clientId + ":v=app:ts=0:hc=" + hitCount;
      if (!isReturning) {
        await AsyncStorage.setItem(KEY_IS_RETURNING_USER, "true");
      }
      let params = R.mergeRight(action.meta, { cookie2, type: action.payload });
      if (action.payload === "pageview") {
        const pixelURL = AppConfig.PIXEL_REFERRAL_URL + action.meta.ptype + "/" + action.meta.title;
        params = R.mergeRight(params, {
          ref: state$.value.pixel.url.length > 0 ? state$.value.pixel.url : "",
          url: pixelURL,
        });
      }
      return api.pixel.logEvent(params).pipe(
        mergeMap(response => {
          if (response.ok) {
            if (action.payload === "pageview") {
              return of(PixelActions.pixelSuccess(), PixelActions.setPixelUrl(decodeURIComponent(params.url)));
            } else {
              return of(PixelActions.pixelSuccess());
            }
          }
          return of(PixelActions.failure());
        }),
      );
    }),
    mergeMap(obj => from(obj)),
  );
