import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import AddLabourCostSwitchSheet from "../../Components/AddLabourCostSheet";
import { SheetState } from "../../Components/BottomSheet/BottomSheet";
import { LabourCostType } from "../../Types/LabourSection";

const mockStore = configureMockStore();

const store = mockStore({});

jest.mock("~root/Lib/DataHelper");

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
