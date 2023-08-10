import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import RequestItemInputSheet from "./RequestItemInputSheet";

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

describe("RequestItemInputSheet UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <RequestItemInputSheet />
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
