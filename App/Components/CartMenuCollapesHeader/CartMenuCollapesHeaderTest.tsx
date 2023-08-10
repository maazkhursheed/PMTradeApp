import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import CartMenuCollapesHeader from "./CartMenuCollapesHeader";

const mockStore = configureMockStore();
const store = mockStore({
  cart: { userCartDetail: "" },
});

describe("CartMenuCollapesHeader UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <CartMenuCollapesHeader collapsed={true} onPressed={() => {}} headerText={`Cart (1)`} total={20} />
      </Provider>,
    )
    .toJSON();
  it("renders CartMenuCollapesHeader snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });

  it("renders CartMenuCollapesHeader without crashing", () => {
    expect(component).toBeTruthy();
  });
});
