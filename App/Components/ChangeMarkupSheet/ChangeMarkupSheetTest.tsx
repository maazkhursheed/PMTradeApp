import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import { SheetState } from "../BottomSheet/BottomSheet";
import ChangeMarkupSheet from "./ChangeMarkupSheet";

const mockStore = configureMockStore();
const store = mockStore({
  login: { email: "" },
  branchList: { selectedBranch: {} },
  jobAccounts: { selectedJobAccount: {} },
  connectTrade: { selectedTradeAccount: {} },
  quotes: require("./quotes.json"),
});

describe("ChangeMarkupSheet UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <SafeAreaProvider>
          <ChangeMarkupSheet sheetState={SheetState.CLOSED} sheetCloseTapped={() => {}} />
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
