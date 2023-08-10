import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import RequestAnItem from "./RequestAnItem";

const mockStore = configureMockStore();
const store = mockStore({
  cart: {
    userCartDetail: {
      requestItem: "",
    },
  },
  savingCartInfo: false,
  fetching: false,
});

describe("RequestAnItem UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <RequestAnItem />
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
