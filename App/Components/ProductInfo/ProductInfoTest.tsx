import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import ProductInfo from "./ProductInfo";

const mockStore = configureMockStore();
const store = mockStore({});
const item = {
  brand: "GIT",
  description: "Planer gauged",
  price: "29",
  uom: "ST",
  SKU: 123121,
};

describe("Products availability item switch sheet UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <ProductInfo productBrand={item.brand} productDescription={item.description} productPrize={item.price} UOM={item.uom} SKU={item.SKU} />
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
