import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import FiltersSwitchSheet from "./FiltersSwitchSheet";

const mockStore = configureMockStore();
const store = mockStore({ product: {} });

describe("Filters switch sheet UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        {/* tslint:disable-next-line:no-empty */}
        <FiltersSwitchSheet sheetState={SheetState.CLOSED} closeSheet={() => {}} selectedName={"Filters"} />
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
