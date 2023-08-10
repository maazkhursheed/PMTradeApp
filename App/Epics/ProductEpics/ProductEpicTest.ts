import { ActionsObservable, StateObservable } from "redux-observable";
import { Subject } from "rxjs";
import { epicRelatedAndSubstituteProducts } from "~root/Epics/ProductEpics/index";
import { EnumRelatedAndAlternateReferenceType } from "~root/Lib/ProductHelper";
import { AppState } from "~root/Lib/TestHelper";
import { RootState } from "~root/Reducers";
import { ProductActions } from "~root/Reducers/ProductReducers";
import Api from "~root/Services/Api";

const token = "";
const aceToken = "";
const auth0Token = "";
const email = "";

describe("Product Epics", () => {
  const api = Api.create;

  beforeEach(() => {
    api.hybris.setAuthorization(token, aceToken, auth0Token, email);
  });

  test("call success type when call Substitute list epic", done => {
    const requestAction = ProductActions.requestRelatedAndSubstituteProducts(
      { productCode: "4525613", referenceType: EnumRelatedAndAlternateReferenceType.SIMILAR },
      { onSuccess: () => {}, onFailure: () => {} },
    );
    const action$ = ActionsObservable.of(requestAction);
    epicRelatedAndSubstituteProducts(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api }).subscribe(actionReceived => {
      expect(actionReceived.type).toBe("RELATED_SUBSTITUTE_RELATED_PRODUCTS_SUCCESS");
      done();
    });
  });
});
