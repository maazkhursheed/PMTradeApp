import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import { Fonts } from "~root/Themes";
import PercentageSelector from "./PercentageSelector";

const mockStore = configureMockStore();
const store = mockStore({
  login: { email: "" },
  branchList: { selectedBranch: {} },
  jobAccounts: { selectedJobAccount: {} },
  connectTrade: { selectedTradeAccount: {} },
});

describe("PercentageSelector UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <PercentageSelector
          percentage={"10"}
          containerStyle={{
            width: "50%",
            alignItems: "center",
            paddingHorizontal: 20,
            justifyContent: "space-evenly",
          }}
          style={Fonts.style.openSans18Bold}
          onChange={() => {}}
        />
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
