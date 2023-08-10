import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import RenameImageSwitchSheet from "~root/Components/RenameImageSwitchSheet/RenameImageSwitchSheet";
import { SheetState } from "../BottomSheet/BottomSheet";
const mockStore = configureMockStore();
const store = mockStore({
  login: { email: "" },
  branchList: { selectedBranch: {} },
  jobAccounts: { selectedJobAccount: {} },
  connectTrade: { selectedTradeAccount: {} },
});

describe("Rename Image Sheet UI Testing", () => {
  const data = {
    name: "rn_image_picker_lib_temp_5f6e9708-cced-4c9a-84fc-5087977e2c74.jpg",
    source: {
      uri: "https://api.crre-fletcherb1-s2-public.model-t.cc.commerce.ondemand.com/medias/sys_master/quotes/h64/hda/9044081508382/rn_image_picker_lib_temp_5f6e9708-cced-4c9a-84fc-5087977e2c74/rn-image-picker-lib-temp-5f6e9708-cced-4c9a-84fc-5087977e2c74.jpg",
    },
    type: "image/jpeg",
    mediaSelected: false,
    quoteMediaPK: "9044081475614",
  };

  const component = renderer
    .create(
      <Provider store={store}>
        <RenameImageSwitchSheet data={data} sheetState={SheetState.EXPANDED} sheetCloseTapped={() => {}} />,
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
