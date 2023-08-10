import moment from "moment";
import * as React from "react";
import { Provider } from "react-redux";
import ShallowRenderer from "react-test-renderer/shallow";
import configureMockStore from "redux-mock-store";
import { DateTimeSelector } from "~root/Components/DateTimeSelector/index";

const mockStore = configureMockStore();

const store = mockStore({});

describe("Card UI Testing", () => {
  const component = new ShallowRenderer().render(
    <Provider store={store}>
      {" "}
      <DateTimeSelector selectedDate={moment()} />
    </Provider>,
  );

  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });

  it("renders without crashing", () => {
    expect(component).toBeTruthy();
  });
});
