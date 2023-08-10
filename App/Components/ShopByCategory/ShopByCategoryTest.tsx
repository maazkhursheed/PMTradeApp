import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import ShopByCategory from "./ShopByCategory";

const mockStore = configureMockStore();
const store = mockStore({
  marketingTile: {
    fetching: false,
  },
  subCategories: {
    fetching: false,
  },
});

describe("ShopByCategory UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <ShopByCategory />
      </Provider>,
    )
    .toJSON();
  it("renders ShopByCategory as expected", () => {
    expect(component).toMatchSnapshot();
  });

  it("renders without crashing", () => {
    expect(component).toBeTruthy();
  });
});
