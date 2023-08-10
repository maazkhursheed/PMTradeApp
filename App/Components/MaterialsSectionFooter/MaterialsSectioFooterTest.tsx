import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import MaterialsSectionFooter from "./MaterialsSectionFooter";

const mockStore = configureMockStore();
const store = mockStore({ quotes: {} });

describe("MaterialsSectionFooter UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <MaterialsSectionFooter />
      </Provider>,
    )
    .toJSON();
  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });
});
