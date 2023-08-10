import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import { allProductsShopSearchText } from "~root/Lib/AlertsHelper";
import GenericSearchFieldComponent from "./GenericSearchFieldComponent";

const mockStore = configureMockStore();
const store = mockStore({});

describe("Generic Search Field UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <GenericSearchFieldComponent placeHolderText={allProductsShopSearchText} navigatingScreen={"SearchSuggestion"} hasBarcodeIcon={true} />
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
