import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import { SheetState } from "../BottomSheet/BottomSheet";
import SendQuoteEmailSheet from "./SendQuoteEmailSheet";
const mockStore = configureMockStore();
const store = mockStore({
  quotes: { quotesListDetails: { jobName: "Job Name" } },
});

describe("SendQuoteEmailSheet UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <SafeAreaProvider>
          <SendQuoteEmailSheet sheetState={SheetState.EXPANDED} sheetCloseTapped={() => {}} />
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
