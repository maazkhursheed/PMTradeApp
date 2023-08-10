import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import CustomerDetailsEditSheet from "./CustomerDetailsEditSheet";

const mockStore = configureMockStore();
const store = mockStore({
  quotes: { quoteIdSent: "1234", quoteDetails: {}, quotesListDetails: {}, loading: false },
});

describe("New Account switch sheet UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <SafeAreaProvider>
          <CustomerDetailsEditSheet />
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
