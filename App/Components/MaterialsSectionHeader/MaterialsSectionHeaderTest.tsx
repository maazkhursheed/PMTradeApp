import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import MaterialsSectionHeader from "./MaterialsSectionHeader";

const mockStore = configureMockStore();
const store = mockStore({});

describe("MaterialsSectionHeader UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <MaterialsSectionHeader />
      </Provider>,
    )
    .toJSON();
  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });
});
