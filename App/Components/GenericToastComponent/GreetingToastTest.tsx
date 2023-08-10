import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import GreetingToast from "./GreetingToast";

const mockStore = configureMockStore();
const store = mockStore({});

describe("Greeting Toast UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <GreetingToast internalStateText1={"This is greeting toast testing"} internalStateText2={"This is greeting toast testing 2"} />
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
