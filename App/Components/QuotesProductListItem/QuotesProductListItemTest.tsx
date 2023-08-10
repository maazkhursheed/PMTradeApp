import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import QuotesProductListItem from "./QuotesProductListItem";

const mockStore = configureMockStore();
const store = mockStore({
  jobAccounts: { selectJobAccount: {} },
  branchList: { selectedBranch: {} },
  quotes: { quoteId: "", quotesListDetails: { code: "" } },
  connectTrade: { selectedTradeAccount: {} },
  cart: { cartEntriesCount: 0 },
  permission: {
    availablePermissions: {
      viewOrderGroup: false,
      placeOrderGroup: false,
      restrictPriceGroup: false,
      accountAdminGroup: false,
      accountOwnerGroup: true,
      viewEstimatesGroup: false,
      tempAccess: false,
      creditLimit: false,
    },
  },
});

const item = {
  entriesCount: 6,
  entry: [
    {
      availableForPickup: true,
      basePrice: {
        currencyIso: "NZD",
        formattedValue: "$25.00",
        priceType: "BUY",
        value: 25.0,
      },
      configurationInfos: [],
      customProductFlag: false,
      decimalQty: 2.0,
      deliveryOrder: true,
      entryNumber: 5,
      product: {
        availableForPickup: true,
        baseOptions: [],
        categories: [],
        code: 1012466,
        configurable: false,
        expressOrder: false,
        hasNoQuantity: 0.0,
        manufacturer: "GOLDEN BAY",
        manufacturerId: "PM20/GP20",
        name: "SELLEYS BBQ TOUGH CLEAN 400G AEROSOL WHITE",
        purchasable: true,
        sellOrderMultiple: 0.0,
        description: "Premium quality NZ grown Radiata pine decking with minimal defects. Features a smooth face on both sides.",
        stock: {
          stockLevel: 0,
          stockLevelStatus: "outOfStock",
        },
        timberProductFlag: false,
        unitCode: "BG",
        uomFormat: "zz,zzz,zzz,zz9-",
        url: "/c/SELLEYS-BBQ-TOUGH-CLEAN-400G-AEROSOL-WHITE/p/3200038",
      },
      quantity: 1,
      retailPrice: {
        currencyIso: "NZD",
        formattedValue: "$0.00",
        priceType: "BUY",
        value: 0.0,
      },
      selectedConfiguration: [],
      totalPrice: {
        currencyIso: "NZD",
        formattedValue: "$50.00",
        priceType: "BUY",
        value: 50.0,
      },
      unit: "BG",
      updateable: true,
    },
  ],
  isCustomProduct: false,
  quantity: 0,
  quantityAdded: 0,
  statusCode: "success",
  subTotal: {
    currencyIso: "NZD",
    value: 215.8,
  },
};

describe("MaterialsListItem UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <QuotesProductListItem item={item.entry[0]} index={0} />
      </Provider>,
    )
    .toJSON();
  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });
});
