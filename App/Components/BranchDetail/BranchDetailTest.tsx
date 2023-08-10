import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import YourBranchesList from "~root/Fixtures/YourBranchesList.json";
import BranchDetail from "./BranchDetail";

const mockStore = configureMockStore();
const store = mockStore({});
const navState = {
  params: { branch: YourBranchesList.pointOfServices[0], dismiss: undefined },
};
const navigation = {
  getParam: (key, val) => navState?.params[key] ?? val,
};

describe("BranchDetails UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <BranchDetail navigation={navigation} route={navState} />
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
