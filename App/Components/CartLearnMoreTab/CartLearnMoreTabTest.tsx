import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import { Colors } from "~root/Themes";
import CartLearnMoreTab from "./CartLearnMoreTab";

const mockStore = configureMockStore();
const store = mockStore({});

describe("CartLearnMoreTab UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <CartLearnMoreTab
          title={"Hellow"}
          subtitle={"Welcome in Test Cases."}
          onPress={() => {}}
          iconColor={Colors.lightGreen}
          iconName={"info"}
          containerStyle={{ marginTop: -10, marginBottom: 10 }}
        />
      </Provider>,
    )
    .toJSON();
  it("renders CartLearnMoreTab snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });

  it("renders CartLearnMoreTab without crashing", () => {
    expect(component).toBeTruthy();
  });
});
