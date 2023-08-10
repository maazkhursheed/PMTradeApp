import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import { SheetState } from "../BottomSheet/BottomSheet";
import { EnumQuotesStatusType } from "../QuotesInfo/QuotesStatusSegment";
import QuotesWonSwitchSheet from "./QuotesWonSwitchSheet";

const mockStore = configureMockStore();
const store = mockStore({
  login: { email: "" },
  branchList: { selectedBranch: {} },
  jobAccounts: { selectedJobAccount: {} },
  connectTrade: { selectedTradeAccount: {} },
  quotes: require("../ChangeMarkupSheet/quotes.json"),
});

describe("Job Status Switch Sheet UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <QuotesWonSwitchSheet sheetState={SheetState.EXPANDED} sheetCloseTapped={() => {}} jobStatus={EnumQuotesStatusType.Pending} />,
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
