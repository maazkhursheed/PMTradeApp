import * as React from "react";
import { Animated } from "react-native";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import MaterilasDetailsListing from "./MaterilasDetailsListing";

const mockStore = configureMockStore();
const store = mockStore({ quotes: { fetching: false, pagination: 1 } });
interface OwnProps {
  route: any;
  data: any[];
  scrollY: Animated.Value;
  onEndReached: () => void;
}

const onEndReached = jest.fn();

describe("MaterialsDetailsHeader UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <MaterilasDetailsListing route={undefined} data={[]} scrollY={new Animated.Value(0)} onEndReached={onEndReached} />
      </Provider>,
    )
    .toJSON();
  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });
});
