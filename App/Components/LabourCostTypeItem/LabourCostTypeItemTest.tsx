import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import { LabourCostType } from "~root/Types/LabourSection";
import LabourCostTypeItem from "./LabourCostTypeItem";

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

describe("LabourCostTypeItem UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <LabourCostTypeItem costType={LabourCostType.Labour} />
      </Provider>,
    )
    .toJSON();
  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });
});
