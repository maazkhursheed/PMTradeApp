import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import FacetsListView from "./FacetsListView";

const mockStore = configureMockStore();
const store = mockStore({ product: {} });

describe("Facets list UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <FacetsListView onPress={() => {}} />
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
