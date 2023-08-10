import { sanitizeProductItems } from "~root/Lib/DataHelper";

const props = {
  data: {
    Brand: "Golden Bay",
    Description: "Placemakers General Purpose Portland Cement Premium 20kg",
    Image: "",
    IsTimberProduct: false,
    Price: "7.82",
    SelectedMultiple: 0,
    Sku: "3200038",
    Stock: "162 in stock",
    UnitOfMeasure: "BG",
    availableForPickup: true,
    barcodesPM: "9417004000027",
    expressOrder: false,
    hasNoQuantity: 20,
    kitProductFlag: false,
    manufacturer: "Golden Bay",
    perpetualFlag: true,
    price: {
      currencyIso: "NZD",
      formattedValue: "$7.82",
      priceType: "BUY",
      value: 7.82,
    },
    priceRange: {},
    productTypeCodeEnum: "N",
    sellOrderMultiple: 0,
    stock: {
      pmStockQuantity: "162",
      statusCode: "1",
      stockLevelStatus: "inStock",
    },
    timberProductFlag: false,
    uomFormat: "11",
    url: "/c/Placemakers-General-Purpose-Portland-Cement-Premium-20kg/p/3200038",
    volumePricesFlag: false,
  },
};

const state = {
  quantity: 1,
  selectedMultiple: 0,
};

test("sanitizeProductItem PDP Should have isExpressOrder: false in products", () => {
  expect(sanitizeProductItems(state, props)).toEqual(
    expect.objectContaining({
      IsExpressOrder: false,
    }),
  );
});

test("sanitizeProductItem PDP Should have StockQuantity: 162 in product", () => {
  expect(sanitizeProductItems(state, props)).toEqual(
    expect.objectContaining({
      StockQuantity: "162",
    }),
  );
  expect(sanitizeProductItems(state, props)).toMatchSnapshot();
});
