import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import AddToExistingItemComponent from "./AddToExistingItemComponent";

const mockStore = configureMockStore();
const store = mockStore();
const itemState = {
  selectedOrder: { orderNumber: "1419218" },
};

describe("Add to existing item UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <AddToExistingItemComponent item={{}} selectedOrder={itemState} cartLoading={false} />
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
