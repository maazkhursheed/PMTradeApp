import { ActionsObservable } from "redux-observable";
import { first } from "rxjs/operators";
import { epicAddUpdateDeliveryAddress, epicPlaceOrder } from "~root/Epics/AddressConfirmation/index";
import { AddressActions } from "~root/Reducers/AddressReducers";
import Api from "~root/Services/Api";

const token = "";
const aceToken = "";
const auth0Token = "";
const email = "";

describe("Address Epics", () => {
  const api = Api.create;

  beforeEach(() => {
    api.hybris.setAuthorization(token, aceToken, auth0Token, email);
  });

  test("call success type when call delivery address epic", done => {
    const requestAction = AddressActions.requestAddUpdateDeliveryAddress({
      address: "89 Seine road, Milford, Auckland 0620",
    });
    const action$ = ActionsObservable.of(requestAction);
    const state$ = {
      value: {
        login: {
          userData: { uid: "shashika.abeysuriya@fbu.com" },
        },
        cart: {
          userCart: { code: "01204000" },
        },
        branchList: {
          selectedBranch: { branchCode: "362" },
        },
        connectTrade: {
          selectedTradeAccount: {
            branch: { branchCode: "362" },
            uid: "362ANTGA",
          },
        },
        jobAccounts: {
          selectedJobAccount: { JobId: "362ANTGA002" },
        },
      },
    };

    epicAddUpdateDeliveryAddress(action$, state$, { api })
      .pipe(first())
      .subscribe(actionReceived => {
        expect(actionReceived.type).toBe("ADD_UPDATE_DELIVERY_ADDRESS_SUCCESS");
        done();
      });
  });

  test("get success type when call place order epic", done => {
    const payload = {
      conatct: {
        firstName: "shashika",
        lastName: "abeysuriya",
        mobile: "+64123456789",
        mail: "shashika.abeysuriya@fbu.com",
        smsFlags: ["Scheduled for delivery", "Left Branch", "On Its Way", "Missed Delivery"],
      },
      delivery: {
        poNumber: "TESTPO",
        deliveryMode: "standard-delivery",
        deliveryInstructions: "",
        requestedDate: "20/05/2021",
        requestedTime: "AM 7:00 AM to 12:00 PM",
      },
    };
    const requestAction = AddressActions.requestPlaceOrderApi(payload, {});
    const action$ = ActionsObservable.of(requestAction);
    const state$ = {
      value: {
        login: {
          userData: { uid: "shashika.abeysuriya@fbu.com" },
        },
        cart: {
          userCart: { code: "01204000" },
        },
        branchList: {
          selectedBranch: { branchCode: "362" },
        },
        connectTrade: {
          selectedTradeAccount: {
            branch: { branchCode: "362" },
            uid: "362ANTGA",
          },
        },
        jobAccounts: {
          selectedJobAccount: { JobId: "362ANTGA002" },
        },
      },
    };
    epicPlaceOrder(action$, state$, { api }).subscribe(actionReceived => {
      expect(actionReceived.type).toBe("PLACE_ORDER_SUCCESS");
      done();
    });
  });
});
