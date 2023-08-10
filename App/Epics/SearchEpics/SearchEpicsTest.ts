import * as R from "ramda";
import { sanitizeSolrSearchForDb } from "~root/Lib/DataHelper";

const data = {
  products: [
    {
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
  ],
};

const epicSearchSolrTest = (response: any) => {
  const result = R.compose(
    R.map(value => {
      return {
        SKU: value.Sku,
        ProductDescription: value.Description,
        UOM: value.UnitOfMeasure || "",
        Availability: value.Stock,
        Price: value.Price,
        IsExpressOrder: value?.expressOrder ?? false,
        StockQuantity: value.stock?.pmStockQuantity ?? "0",
        Image: value.Image,
        Brand: value.Brand,
        IsTimberProduct: value.IsTimberProduct,
        SelectedMultiple: value.IsTimberProduct && value.SelectedMultiple === 0 ? "3" : value.SelectedMultiple.toString(),
        uomFormat: value.uomFormat.toString(),
        sellOrderMultiple: value.IsTimberProduct && value.SelectedMultiple === 0 ? "3" : value.SelectedMultiple.toString(),
        timberProductFlag: value.IsTimberProduct,
      };
    }),
    R.map(sanitizeSolrSearchForDb),
    R.prop("products"),
  )(response.data);
  return result;
};
expect(epicSearchSolrTest({ data })).toMatchSnapshot();

test("epicSearchSolrIsExpressOrderTest PLP Should have isExpressOrder: false in products", () => {
  expect(epicSearchSolrTest({ data })).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        IsExpressOrder: false,
      }),
    ]),
  );
});

test("epicSearchSolrStockQtyTest PLP Should have StockQuantity: 162 in products", () => {
  expect(epicSearchSolrTest({ data })).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        StockQuantity: "162",
      }),
    ]),
  );
});
