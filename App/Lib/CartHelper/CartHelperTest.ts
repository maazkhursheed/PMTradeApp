import { generateProductRequestForCart, getIndexedCart, isItemUpdatingOrDeleting, isVoucherApplied, removeDeletedCartItems } from "~root/Lib/CartHelper/index";
import { ExpectedSampleOrder, SampleOrder } from "~root/Lib/SampleResponses";

test("get indexed cart", () => {
  expect(getIndexedCart(SampleOrder)).toStrictEqual(ExpectedSampleOrder);
});

test("Cart API helper functions should work fine as expected", () => {
  expect(
    generateProductRequestForCart({
      product: {
        timberProductFlag: true,
        sellOrderMultiple: "6",
        length: 1,
        productPrice: 2.2,
        code: 123,
      },
    }),
  ).toEqual({
    timberProductFlag: true,
    length: 1,
    productPrice: 2.2,
    code: 123,
  });

  expect(
    generateProductRequestForCart({
      product: {
        timberProductFlag: false,
        length: 1,
        productPrice: 2.2,
        code: 123,
      },
    }),
  ).toEqual({
    code: 123,
  });
});

test("CartView helper function remove deleted items from cart entries should work fine as expected", () => {
  const deletedItems = { "123": true, "124": false, "125": true };
  const entries = [
    { product: { code: "123" } },
    { product: { code: "124" } },
    { product: { code: "125" } },
    { product: { code: "126" } },
    { product: { code: "127" } },
  ];
  expect(removeDeletedCartItems({ itemDeleteMap: deletedItems, entries })).toEqual([
    { product: { code: "124" } },
    { product: { code: "126" } },
    { product: { code: "127" } },
  ]);
});

test("CartView helper functions should work fine as expected", () => {
  expect(
    isItemUpdatingOrDeleting({
      itemUpdateMap: { "123": true, "124": false, "125": false },
      itemDeleteMap: { "123": true, "124": false, "125": false },
    }),
  ).toEqual(true);

  expect(
    isItemUpdatingOrDeleting({
      itemUpdateMap: { "123": false, "124": false, "125": false },
      itemDeleteMap: { "123": true, "124": false, "125": false },
    }),
  ).toEqual(true);

  expect(
    isItemUpdatingOrDeleting({
      itemUpdateMap: { "123": true, "124": false, "125": false },
      itemDeleteMap: { "123": false, "124": false, "125": false },
    }),
  ).toEqual(true);

  expect(
    isItemUpdatingOrDeleting({
      itemUpdateMap: { "123": false, "124": false, "125": false },
      itemDeleteMap: { "123": false, "124": false, "125": false },
    }),
  ).toEqual(false);
});
// /**
//  * This function returns true if a voucher is applied on cart
//  */

test("isVoucherApplied should work as expected", () => {
  let cartState = {
    userCart: undefined,
    fetching: false,
    cartEntriesCount: 0,
    voucherInfo: undefined,
    itemUpdateMap: {},
    itemDeleteMap: {},
    isPromoAPIInProgress: false,
    userCartDetail: undefined,
  };
  expect(isVoucherApplied(cartState)).toBeFalsy();
  cartState.userCartDetail = {
    appliedVouchers: [{ voucherCode: "abcVoucher" }],
  };
  expect(isVoucherApplied(cartState)).toBeTruthy();
});
