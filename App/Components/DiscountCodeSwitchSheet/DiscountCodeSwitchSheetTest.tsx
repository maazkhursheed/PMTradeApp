import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import DiscountCodeSwitchSheet from "./DiscountCodeSwitchSheet";

const mockStore = configureMockStore();
const store = mockStore({ cart: { isPromoAPIInProgress: false } });

describe("Discount code switch sheet UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <DiscountCodeSwitchSheet />
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
