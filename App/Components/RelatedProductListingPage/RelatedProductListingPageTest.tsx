import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import RelatedProductListingPage from "./RelatedProductListingPage";

const mockStore = configureMockStore();
const store = mockStore({});
const item = {
  availableForPickup: true,
  code: "1015262",
  configurable: true,
  description: "",
  display: "SPECIAL",
  expressOrder: false,
  hasNoQuantity: 0,
  images: [
    {
      format: "product",
      imageType: "PRIMARY",
      url: "https://pimstorageauesit.blob.core.windows.net/placemakers/media-assets/1169332_100X50(90X45)RAD-SG8-H1.2-PG-KD.jpg",
    },
  ],
  manufacturer: "GIB-Test",
  name: "100 X 50 (90X45) RAD SG8 H1.2 PLANER GAUGED KD 6.0M",
  pmExclusive: true,
  price: {
    currencyIso: "NZD",
    formattedValue: "$8.60",
    priceType: "BUY",
    value: 8.6,
  },
  retailPrice: {
    currencyIso: "NZD",
    formattedValue: "$8.60",
    priceType: "BUY",
    value: 8.6,
  },
  retailPriceGstInclusive: {
    currencyIso: "NZD",
    formattedValue: "$9.89",
    priceType: "BUY",
    value: 9.89,
  },
  sellOrderMultiple: 6,
  stock: {
    isValueRounded: false,
    pmStockQuantity: "0",
    statusCode: "3",
    stockLevelStatus: "outOfStock",
  },
  timberProductFlag: true,
  unitCode: "LM",
  uomFormat: "7.2",
  url: "http://middleearthexpress.co.nz/timber-panels/structural-grade-timber-kiln-dried/sg-h12-radiata-kd/sg8-h12-rad-pg-kd-scantlings-75mm-100mm/100-x-50-90x45-rad-sg8-h12-planer-gauged-kd-60m/p/1015262",
};

describe("Products availability item switch sheet UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <RelatedProductListingPage item={item} />
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
