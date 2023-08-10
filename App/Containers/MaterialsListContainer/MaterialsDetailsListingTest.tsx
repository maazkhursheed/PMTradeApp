import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import MaterialsDetailsListing from "../../Components/MaterialsDetailsListing/MaterilasDetailsListing";

const mockStore = configureMockStore();

const store = mockStore(require("~root/Containers/MaterialsListContainer/MaterialsDetailsListingTest.json"));

describe("MaterialsDetailsListing UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <SafeAreaProvider>
          <MaterialsDetailsListing />
        </SafeAreaProvider>
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
