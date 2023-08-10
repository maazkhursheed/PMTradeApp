import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import { LabourCostType } from "~root/Types/LabourSection";
import AddLabourCostSwitchSheet from ".";
import { SheetState } from "../BottomSheet/BottomSheet";
const mockStore = configureMockStore();
const store = mockStore({
  login: { email: "" },
  branchList: { selectedBranch: {} },
  jobAccounts: { selectedJobAccount: {} },
  connectTrade: { selectedTradeAccount: {} },
  quotes: require("../ChangeMarkupSheet/quotes.json"),
});

describe("Add Labour Cost Switch Sheet UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <AddLabourCostSwitchSheet costType={LabourCostType.Labour} sheetState={SheetState.EXPANDED} sheetCloseTapped={() => {}} />,
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
