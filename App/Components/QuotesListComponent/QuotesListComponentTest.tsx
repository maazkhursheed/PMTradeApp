import * as React from "react";
import { Animated } from "react-native";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import QuotesListComponent from "./QuotesListComponent";

const mockStore = configureMockStore();
const store = mockStore({
  estimates: { isLoading: false, data: [], hasMorePages: 0, visibleItemsCount: 0, totalItemsCount: 0, cartCount: 0 },
  quotes: { fetching: false },
  jobAccounts: { selectedJobAccount: undefined },
  connectTrade: { selectedTradeAccount: undefined },
  cart: { cartEntriesCount: 0 },
});

interface OwnProps {
  scrollY: Animated.Value;
}

describe("QuotesListComponent UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <QuotesListComponent scrollY={new Animated.Value(0)} />
      </Provider>,
    )
    .toJSON();
  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });
});
