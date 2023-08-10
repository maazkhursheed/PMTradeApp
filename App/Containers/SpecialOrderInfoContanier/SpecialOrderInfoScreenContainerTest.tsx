import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import SpecialOrderInfoScreenContainer from "./SpecialOrderInfoScreenContainer";

const mockStore = configureMockStore();
const store = mockStore({
  notification: { messages: {} },
});

describe("NotificationsContainer UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <SpecialOrderInfoScreenContainer />
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
