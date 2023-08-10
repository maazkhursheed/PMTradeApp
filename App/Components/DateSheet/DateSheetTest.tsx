import moment from "moment";
import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import { DateSheet } from "~root/Components/DateSheet/index";

const mockStore = configureMockStore();
const store = mockStore({
  branchList: {
    selectedOrderType: {},
  },
});

describe("Card UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <DateSheet selectedDate={moment()} earliestDate={moment()} />
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
