import * as React from "react";
import { Text } from "react-native";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import CartExtended from "./CartExtended";

const mockStore = configureMockStore();
const store = mockStore({});

describe("Cart Extended Toast UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <CartExtended
          internalStateText1={"Greetings"}
          children={
            <>
              <Text>test case</Text>
            </>
          }
        />
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
