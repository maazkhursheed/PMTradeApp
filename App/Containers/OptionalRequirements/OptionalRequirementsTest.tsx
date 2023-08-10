import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import OptionalRequirements from "./OptionalRequirements";

const mockStore = configureMockStore();
const store = mockStore({
  cartData: {},
  selectedBranch: {},
  availableTruckRequirements: [],
  availableSiteRequirements: [],
});

describe("Optional Requirements UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <OptionalRequirements />
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
