import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import CartPayOnCallBack from "./CartPayOnCallBack";

const mockStore = configureMockStore();
const store = mockStore({});

describe("CartPayOnCallBack UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <CartPayOnCallBack values={[]} entries={[]} direction={"payNowDetails"} />
      </Provider>,
    )
    .toJSON();
  it("renders CartPayOnCallBack snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });

  it("renders CartPayOnCallBack without crashing", () => {
    expect(component).toBeTruthy();
  });
});
