import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import MaterialDeleteSheet from "./MaterialDeleteSheet";

const mockStore = configureMockStore();
const store = mockStore({
  login: { email: "" },
  branchList: { selectedBranch: {} },
  jobAccounts: { selectedJobAccount: {} },
  connectTrade: { selectedTradeAccount: {} },
});

describe("Material Delete sheet UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <MaterialDeleteSheet />
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
