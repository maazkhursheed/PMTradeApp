import { ActionsObservable } from "redux-observable";
import { epicGetTradeAccountList } from "~root/Epics/TradeAccountEpics";
import { ConnectTradeActions } from "~root/Reducers/ConnectTradeReducers";
import Api from "~root/Services/Api";

const token = "";
const aceToken = "";
const auth0Token = "";
const email = "";

describe("Trade Account Epics", () => {
  const api = Api.create;

  beforeEach(() => {
    api.hybris.setAuthorization(token, aceToken, auth0Token, email);
  });

  test("call onSetupTradeAccountListUserInfo type when call get trade account list epic", done => {
    const requestAction = ConnectTradeActions.requestTradeAccList();
    const action$ = ActionsObservable.of(requestAction);
    const state$ = { value: { login: { userData: { uid: "abc@gmail.com" } } } };
    epicGetTradeAccountList(action$, state$, { api }).subscribe(actionReceived => {
      expect(actionReceived.type).toBe("SET_TRADE_ACCOUNT_LIST_USERINFO");
      done();
    });
  });
});
