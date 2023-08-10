import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import AllBranchesList from "./AllBranchesList";

const mockStore = configureMockStore();
const store = mockStore({ branchList: { fetching: false, allBranches: [] } });

describe("All Branches UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <AllBranchesList />
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
