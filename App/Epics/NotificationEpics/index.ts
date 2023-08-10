import moment from "moment";
import * as R from "ramda";
import MCReactModule from "react-native-marketingcloudsdk";
import PushNotification from "react-native-push-notification";
import { Epic, ofType } from "redux-observable";
import { from, of, Subscription } from "rxjs";
import { delay, distinctUntilChanged, filter, map, mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import NavigationService from "~root/Navigation/NavigationService";
import { NotificationActions } from "~root/Reducers/NotificationReducers";
import { OrderDetailsActions } from "~root/Reducers/OrderDetailsReducers";
import { OrderHistoryActions } from "~root/Reducers/OrderHistoryReducers";

let subscription: Subscription;

export const epicNotificationReceived: Epic = (action$, state$, dependencies) =>
  action$.pipe(
    filter(
      R.compose(
        // @ts-ignore
        R.includes(R.__, R.map(getType, [NotificationActions.notificationReceived, NotificationActions.notificationInboxItemPressed])),
        R.prop("type"),
      ),
    ),
    mergeMap(action => {
      const actions = [];
      if (state$.value.login.userData) {
        actions.push(NotificationActions.landOnScreen(false));
        if (action.payload.notifyType === "STC") {
          actions.push(OrderHistoryActions.checkOrderStatusInDb());
        } else if (action.payload.notifyType === "ORDER_DETAIL") {
          if (state$.value.orderDetails.data) {
            NavigationService.goBack();
            return from([OrderDetailsActions.clearOrderDetailsData(false), NotificationActions.notificationInboxItemPressed(action.payload)]);
          } else {
            NavigationService.navigate("OrderDetails", {
              screen: "OrderDetails",
              params: { data: action.payload },
            });
          }
        }
      } else {
        subscription?.unsubscribe();
        subscription = state$
          .pipe(
            map(value => value.notification.landedOnScreen),
            distinctUntilChanged(),
            filter(R.identity),
            delay(100),
          )
          .subscribe(val => {
            subscription?.unsubscribe();
            actions.push(NotificationActions.landOnScreen(false));
            if (action.payload.notifyType === "STC") {
              actions.push(OrderHistoryActions.checkOrderStatusInDb());
            } else if (action.payload.notifyType === "ORDER_DETAIL") {
              if (state$.value.orderDetails.data) {
                NavigationService.goBack();
                return from([OrderDetailsActions.clearOrderDetailsData(false), NotificationActions.notificationInboxItemPressed(action.payload)]);
              } else {
                NavigationService.navigate("OrderDetails", {
                  screen: "OrderDetails",
                  params: { data: action.payload },
                });
              }
            }
          });
      }
      return actions.length > 0 ? from(actions) : of(NotificationActions.voidAction());
    }),
  );

export const sortedMessages = messages => {
  const descend = R.descend(val => moment(val.sendDateUtc));
  return R.sort(descend, messages);
};

export const epicGetInboxMessages: Epic = (action$, state$, dependencies) =>
  action$.pipe(
    ofType(getType(NotificationActions.getInboxMessages)),
    mergeMap(async action => {
      const actions = [];
      const messages = await MCReactModule.getInboxMessages();

      const unreadMessagesCount = await MCReactModule.getUnreadMessageCount();
      actions.push(NotificationActions.getInboxMessagesSuccess(sortedMessages(messages)));
      actions.push(NotificationActions.setUnreadMessagesCount(unreadMessagesCount));
      return from(actions);
    }),
    mergeMap(obj => from(obj)),
  );

export const epicNotificationsViewed: Epic = (action$, state$, dependencies) =>
  action$.pipe(
    ofType(getType(NotificationActions.notificationsViewed)),
    mergeMap(action => {
      MCReactModule.markAllMessagesRead();
      PushNotification.setApplicationIconBadgeNumber(0);
      return of(NotificationActions.setUnreadMessagesCount(0));
    }),
  );
