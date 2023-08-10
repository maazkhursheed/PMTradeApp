import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import CartSectionHeader from "./CartSectionHeader";

const mockStore = configureMockStore();
const store = mockStore({});

describe("CartSectionHeader UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <CartSectionHeader isSpecial={true} numberOfProducts={3} title={"Special orders"} subTitle={"Checking msg"} />
      </Provider>,
    )
    .toJSON();
  it("renders CartSectionHeader snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });

  it("renders CartSectionHeader without crashing", () => {
    expect(component).toBeTruthy();
  });
});
