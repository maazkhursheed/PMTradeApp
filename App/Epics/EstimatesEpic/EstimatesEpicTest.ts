import { ActionsObservable, StateObservable } from "redux-observable";
import { Subject } from "rxjs";
import AppConfig from "~root/Config/AppConfig";
import { epicEstimatesList, epicEstimatesListById, epicEstimatesListDetails } from "~root/Epics/EstimatesEpic";
import { AppState } from "~root/Lib/TestHelper";
import { RootState } from "~root/Reducers";
import { EstimatesActions } from "~root/Reducers/EstimatesReducer";
import Api from "~root/Services/Api";

const token = "";
const aceToken = "";
const auth0Token = "";
const email = "";

describe("Estimates Epics", () => {
  const api = Api.create;

  beforeEach(() => {
    api.hybris.setAuthorization(token, aceToken, auth0Token, email);
  });

  test("call success type when call estimates list epic", done => {
    const requestAction = EstimatesActions.requestEstimatesList({ pageNo: 1, numberOfLines: 500 }, { onSuccess: () => {}, onFailure: () => {} });
    const action$ = ActionsObservable.of(requestAction);
    epicEstimatesList(action$, null!, { api }).subscribe(actionReceived => {
      expect(actionReceived.type).toBe("ESTIMATES_LIST_SUCCESS");
      done();
    });
  });

  test("call success type when request estimates list by id epic", done => {
    const requestAction = EstimatesActions.requestEstimatesListById(
      { pageNo: 1, numberOfLines: AppConfig.NUMBER_OF_LINES, estimateNumber: 35396 },
      { onSuccess: () => {}, onFailure: () => {} },
    );
    const action$ = ActionsObservable.of(requestAction);
    epicEstimatesListById(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api }).subscribe(actionReceived => {
      expect(actionReceived.type).toBe("ESTIMATES_LIST_BY_ID_SUCCESS");
      done();
    });
  });

  test("call success type when call estimates list details epic", done => {
    const requestAction = EstimatesActions.requestEstimatesListDetails(
      { pageNo: 1, numberOfLines: AppConfig.NUMBER_OF_LINES, estimateNumber: 35396, sectionId: 10000, sectionDescription: "Ground Decking" },
      { onSuccess: () => {}, onFailure: () => {} },
    );
    const action$ = ActionsObservable.of(requestAction);
    epicEstimatesListDetails(action$, null!, { api }).subscribe(actionReceived => {
      expect(actionReceived.type).toBe("ESTIMATES_LIST_DETAILS_SUCCESS");
      done();
    });
  });
});
