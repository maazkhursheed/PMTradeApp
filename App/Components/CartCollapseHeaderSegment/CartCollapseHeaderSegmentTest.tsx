import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import CartCollapseHeaderSegment from "./CartCollapseHeaderSegment";

const mockStore = configureMockStore();
const store = mockStore({});
const headerOptions = [
  {
    title: "Pay Now",
    count: 2,
  },
  {
    title: "Pay on Callback",
    count: 1,
  },
];
describe("CartCollapseHeaderSegment UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <CartCollapseHeaderSegment selected={headerOptions[0]?.title} onSelected={() => headerOptions[1]?.title} values={headerOptions} />
      </Provider>,
    )
    .toJSON();
  it("renders CartCollapseHeaderSegment snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });

  it("renders CartCollapseHeaderSegment without crashing", () => {
    expect(component).toBeTruthy();
  });
});
