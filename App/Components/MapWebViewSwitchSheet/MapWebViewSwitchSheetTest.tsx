import * as React from "react";
import * as renderer from "react-test-renderer";
import { SheetState } from "../BottomSheet/BottomSheet";
import MapWebViewSwitchSheet from "./MapWebViewSwitchSheet";

describe("MapWebView switch sheet UI Testing", () => {
  const component = renderer
    .create(
      <MapWebViewSwitchSheet sheetState={SheetState.CLOSED} closeSheet={() => {}} />,
    )
    .toJSON();
  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });

  it("renders without crashing", () => {
    expect(component).toBeTruthy();
  });
});
