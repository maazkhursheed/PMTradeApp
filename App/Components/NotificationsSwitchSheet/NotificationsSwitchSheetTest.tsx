import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import NotificationsSwitchSheet from "./NotificationsSwitchSheet";

const mockStore = configureMockStore();
const store = mockStore({
  branchList: {
    selectedOrderType: {},
  },
});

describe("Notifications switch sheet UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <NotificationsSwitchSheet />
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
