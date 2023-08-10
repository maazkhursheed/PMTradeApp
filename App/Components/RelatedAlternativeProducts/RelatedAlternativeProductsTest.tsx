import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import RelatedAlternativeProducts from "./RelatedAlternativeProducts";
const mockStore = configureMockStore();
const store = mockStore({});

describe("RelatedAlternative Products sheet ", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <RelatedAlternativeProducts />
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
