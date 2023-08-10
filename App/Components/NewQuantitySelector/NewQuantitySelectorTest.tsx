import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import NewQuantitySelector from "./NewQuantitySelector";

const mockStore = configureMockStore();
const store = mockStore();
const itemState = {
  selectedOrder: { orderNumber: "1419218" },
};

describe("NewQuantitySelector UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <NewQuantitySelector quantity={"2"} estimatedQuantity={"1"} isTimber={true} />
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
