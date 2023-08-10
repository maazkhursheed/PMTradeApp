import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import AddToExisting from "./AddToExisting";

const mockStore = configureMockStore();
const store = mockStore();

describe("Add to existing UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <AddToExisting />
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
