import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import QuotesSummary from "./QuotesSummary";

const mockStore = configureMockStore();
const store = mockStore({
  quotes: { quoteDetails: {} },
});

describe("MaterialsListItem UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <QuotesSummary />
      </Provider>,
    )
    .toJSON();
  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });
});
