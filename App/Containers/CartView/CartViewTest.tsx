import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import CartView from "./CartView";

const mockStore = configureMockStore();
const store = mockStore({
  branchList: {},
  jobAccounts: {},
  connectTrade: { selectedTradeAccount: { name: "test" } },
  cart: {},
  orderDeliveries: {},
  marketingScreens: {},
  permission: {
    availablePermissions: {
      viewOrderGroup: false,
      placeOrderGroup: false,
      restrictPriceGroup: false,
      accountAdminGroup: true,
      accountOwnerGroup: false,
      viewEstimatesGroup: false,
      tempAccess: false,
      creditLimit: false,
    },
  },
});

describe("New Account switch sheet UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <CartView />
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
