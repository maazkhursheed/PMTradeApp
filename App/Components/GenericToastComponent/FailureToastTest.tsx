import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import FailureToast from "./FailureToast";

const mockStore = configureMockStore();
const store = mockStore({});

describe("Generic Toast UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <FailureToast internalStateText1={"Porduct Swapped failed"} internalStateText2={"Welcome to the nature"} toastType={"quoteFailure"} />
      </Provider>,
    )
    .toJSON();
  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });

  it("renders without crashing", () => {
    expect(component).toBeTruthy();
  });
});
