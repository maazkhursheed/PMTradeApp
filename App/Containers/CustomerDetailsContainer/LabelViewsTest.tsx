import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import LabelViews from "./LabelViews";

const mockStore = configureMockStore();

const store = mockStore({});

jest.mock("~root/Lib/DataHelper");

describe("Customer details switch sheet UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <LabelViews userName={"Test"} email={"test@gmail.com"} address={"test"} phone={"1234"} />
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
