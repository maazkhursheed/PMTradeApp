import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import BranchesList from "./BranchesList";

const mockStore = configureMockStore();
const store = mockStore({
  branchList: {
    dataDepots: [],
    nearbyBranches: [],
    productStockData: [],
    fetching: false,
    selectedBranch: {},
  },
});

describe("BranchesList UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <BranchesList />
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
