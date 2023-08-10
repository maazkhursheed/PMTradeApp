import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import TeamContactsSwitchSheet from "./TeamContactsSwitchSheet";

const mockStore = configureMockStore();
const store = mockStore({
  contactStreamline: {
    contactList: {},
  },
  branchList: {
    selectedOrderType: {},
  },
});

describe("Team contacts switch sheet UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <TeamContactsSwitchSheet />
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
