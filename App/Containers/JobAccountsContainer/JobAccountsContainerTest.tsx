import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import JobAccountsContainer from "./JobAccountsContainer";

const mockStore = configureMockStore();
const store = mockStore({
  userName: "",
  email: "",
  phone: "",
  selectedAccount: "",
  jobAccounts: "",
  branchEmail: "",
  jobAccountIndex: "",
});

describe("Company edit container UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <SafeAreaProvider>
          <JobAccountsContainer />
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
