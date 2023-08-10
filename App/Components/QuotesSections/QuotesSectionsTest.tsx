import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import QuotesSections from "./QuotesSections";

const mockStore = configureMockStore();
const store = mockStore({
  quotes: { quoteDetails: {} },
});

describe("MaterialsListItem UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <QuotesSections />
      </Provider>,
    )
    .toJSON();
  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });
});
