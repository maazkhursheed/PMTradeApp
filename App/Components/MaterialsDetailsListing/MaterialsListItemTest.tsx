import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import MaterialsListItem from "./MaterialsListItem";

const mockStore = configureMockStore();
const store = mockStore({
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

interface OwnProps {
  item: any;
  index: number;
}

jest.mock("~root/Components/SwiperComponent");

describe("MaterialsListItem UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <MaterialsListItem item={undefined} index={1} />
      </Provider>,
    )
    .toJSON();
  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });
});
