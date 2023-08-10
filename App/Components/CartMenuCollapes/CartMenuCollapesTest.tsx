import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import CartMenuCollapes from "./CartMenuCollapes";

const mockStore = configureMockStore();
const store = mockStore({
  cart: { userCartDetail: "" },
});

describe("CartMenuCollapes UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <CartMenuCollapes />
      </Provider>,
    )
    .toJSON();
  it("renders CartMenuCollapes snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });

  it("renders CartMenuCollapes without crashing", () => {
    expect(component).toBeTruthy();
  });
});
