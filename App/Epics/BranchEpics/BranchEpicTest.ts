import { ActionsObservable } from "redux-observable";
import { epicGetBranchDetails, epicGetNearByBranchList } from "~root/Epics/BranchEpics";
import { BranchDetailsActions } from "~root/Reducers/BranchDetailReducers";
import Api from "~root/Services/Api";

const token = "";
const aceToken = "";
const auth0Token = "";
const email = "";

describe("Branches Epics", () => {
  const api = Api.create;

  beforeEach(() => {
    api.hybris.setAuthorization(token, aceToken, auth0Token, email);
  });

  test("call success type when call near by branches epic", done => {
    const requestAction = BranchDetailsActions.requestNearByBranches({
      query: "Auckland",
    });
    const action$ = ActionsObservable.of(requestAction);
    epicGetNearByBranchList(action$, null!, { api }).subscribe(actionReceived => {
      expect(actionReceived.type).toBe("NEARBY_BRANCHES_SUCCESS");
      done();
    });
  });

  test("call success type when call your branches epic", done => {
    const requestAction = BranchDetailsActions.getBranchDetails({
      latitude: -36.8033044,
      longitude: 174.6978991,
    });
    const action$ = ActionsObservable.of(requestAction);
    const state$ = {
      value: {
        connectTrade: {
          selectedTradeAccount: { branch: { branchID: "P362" } },
        },
      },
    };
    epicGetBranchDetails(action$, state$, { api }).subscribe(actionReceived => {
      expect(actionReceived.type).toBe("BRANCH_DETAIL_SUCCESS");
      done();
    });
  });
});
