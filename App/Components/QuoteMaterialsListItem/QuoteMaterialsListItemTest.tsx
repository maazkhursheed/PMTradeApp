import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import QuoteMaterialsListItem from "./QuoteMaterialsListItem";

const mockStore = configureMockStore();
const store = mockStore({});

const item = {
  BranchId: 362,
  AccountCustomerId: "ADITA",
  JobAccountId: "ADITA",
  SKU: "1015262",
  ProductDescription: "Radiata SG8 Kiln Dried H1.2 Treated 100 x 50mm (90 x 45mm) 6.0m",
  UOM: "LM",
  Availability: "22523 in stock",
  Price: 4.6,
  Image: "https://pimstorageaueuat.blob.core.windows.net/placemakers/media-assets/1169332_100X50(90X45)RAD-SG8-H1.2-PG-KD.jpg",
  Brand: "",
  IsTimberProduct: true,
  SelectedMultiple: 6,
  UniqueId: "1015262-6",
  uomFormat: 7.2,
  sellOrderMultiple: 6,
  timberProductFlag: true,
  IsExpressOrder: false,
  StockQuantity: 22523,
  IsSpecial: false,
  pmStockQuantity: 22523,
  statusCode: 1,
  stockLevelStatus: "inStock",
};

describe("Quote Materials Item UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <QuoteMaterialsListItem item={item} />
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
