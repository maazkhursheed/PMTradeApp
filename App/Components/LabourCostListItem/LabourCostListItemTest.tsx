import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import LabourCostListItem from "./LabourCostListItem";

const mockStore = configureMockStore();
const store = mockStore({
  quotes: {},
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

describe("LabourCostListItem UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <LabourCostListItem
          item={{
            name: "Rusty",
            notes: "",
            price: 75,
            quantity: 17,
            subTotal: { currencyIso: "NZD", formattedValue: "$1,275.00", value: 1275 },
            type: "Labour",
          }}
        />
      </Provider>,
    )
    .toJSON();
  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });
});
