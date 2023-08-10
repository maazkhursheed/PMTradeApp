import { ActionsObservable } from "redux-observable";
import { epicGetSubCategories } from "~root/Epics/SubCategoriesEpics/index";
import { SubCategoriesActions } from "~root/Reducers/SubCategoriesReducers";
import Api from "~root/Services/Api";

const token = "";
const aceToken = "";
const auth0Token = "";
const email = "";

describe("SubCategories Epics", () => {
  const api = Api.create;

  beforeEach(() => {
    api.hybris.setAuthorization(token, aceToken, auth0Token, email);
  });

  test("test response when calling subCategories epic", done => {
    const requestAction = SubCategoriesActions.requestSubCategories("WDN40P1", {});
    const action$ = ActionsObservable.of(requestAction);
    const state$ = {
      value: {
        login: {
          userData: { uid: "prasadadmin@yopmail.com" },
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
    epicGetSubCategories(action$, state$, { api }).subscribe(actionReceived => {
      if (actionReceived.type.includes("SUB_CATEGORIES_SUCCESS")) {
        expect(actionReceived.type).toBe("SUB_CATEGORIES_SUCCESS");
      } else {
        expect(actionReceived.type).toBe("SUB_CATEGORIES_FAILURE");
      }
      done();
    });
  });
});
