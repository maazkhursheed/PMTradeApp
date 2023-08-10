import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import ContactDetailsSwitchSheet from "./ContactDetailsSwitchSheet";

const mockStore = configureMockStore();
const store = mockStore({
  branchList: {
    selectedOrderType: {},
  },
});

describe("Contact Details switch sheet UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <ContactDetailsSwitchSheet />
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
