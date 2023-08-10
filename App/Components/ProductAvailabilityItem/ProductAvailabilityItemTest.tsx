import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import ProductAvailabilityItem from "./ProductAvailabilityItem";

const mockStore = configureMockStore();
const store = mockStore({});
const item = {
  item: { product: { manufacturer: "GATOR" } },
};

describe("Products availability item switch sheet UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <ProductAvailabilityItem item={item} />
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
