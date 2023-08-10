import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import TradeAccountComponent from "./TradeAccount";

const mockStore = configureMockStore();
const onSelect = jest.fn();
const store = mockStore({ cart: { fetching: false }, connectTrade: { dataTradeListUserInfo: [] } });

describe("Add to existing item UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <TradeAccountComponent onSelect={onSelect} />
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
