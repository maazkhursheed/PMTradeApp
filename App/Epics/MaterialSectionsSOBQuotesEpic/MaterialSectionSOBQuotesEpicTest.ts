import { ActionsObservable } from "redux-observable";
import { first, last } from "rxjs/operators";
import { epicCreateSectionsSOBQuotes, epicDeleteSectionsSOBQuotes, epicGetSOBQuotes } from "~root/Epics/MaterialSectionsSOBQuotesEpic";
import { SectionSOBQuotesActions } from "~root/Reducers/MaterialSectionsSOBQuotesReducers";
import Api from "~root/Services/Api";

const token = "";
const aceToken = "";
const auth0Token = "";
const email = "";

describe("SOB Quote Epics", () => {
  const api = Api.create;
  beforeEach(() => {
    api.hybris.setAuthorization(token, aceToken, auth0Token, email);
  });

  test("call when user get sob quote list", done => {
    const requestAction = SectionSOBQuotesActions.getSOBQuotes({
      urlParams: { quoteId: "01985019" },
      bodyParams: {},
    });
    const action$ = ActionsObservable.of(requestAction);
    const state$ = {};
    epicGetSOBQuotes(action$, state$, { api })
      .pipe(last())
      .subscribe(actionReceived => {
        expect(actionReceived.type).toBe("SOB_QUOTE_SUCCESS");
        done();
      });
  });

  test("call when user create sob quote", done => {
    const requestAction = SectionSOBQuotesActions.createSectionsSOBQuotes({
      urlParams: { quoteId: "01985019", name: "Wall and Roof Hardware" },
      bodyParams: {},
    });
    const action$ = ActionsObservable.of(requestAction);
    const state$ = {};
    epicCreateSectionsSOBQuotes(action$, state$, { api })
      .pipe(first())
      .subscribe(actionReceived => {
        expect(actionReceived.type).toBe("CREATE_SECTION_SOB_QUOTE_SUCCESS");
        done();
      });
  });

  test("call when user delete sob quote", done => {
    const requestAction = SectionSOBQuotesActions.deleteSectionsSOBQuotes({
      urlParams: { quoteId: "01985019", sobId: "Testing" },
      bodyParams: {},
    });
    const action$ = ActionsObservable.of(requestAction);
    const state$ = {};
    epicDeleteSectionsSOBQuotes(action$, state$, { api })
      .pipe(first())
      .subscribe(actionReceived => {
        expect(actionReceived.type).toBe("DELETE_SECTION_SOB_QUOTE_SUCCESS");
        done();
      });
  });
});
