import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import ProductsAvailabiltySwitchSheet from "./ProductsAvailabiltySwitchSheet";

const mockStore = configureMockStore();
const store = mockStore({
  selectedBranch: { branchCode: "362" },
});

describe("Products availability switch sheet UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <ProductsAvailabiltySwitchSheet />
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
