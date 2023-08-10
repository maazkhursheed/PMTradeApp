import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import QuotesProductTabView from "./QuotesProductTabView";
const mockStore = configureMockStore();
const store = mockStore({});

describe("Quotes Products tabview", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <QuotesProductTabView />
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
