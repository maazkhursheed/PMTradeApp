import moment from "moment";
import { estimatesResponseData, expectedLinesData } from "~root/Lib/EstimatesHelper/EstimatesTestData";
import { getEstimatedProductList, getEstimatedProductListCount, isExpiring } from ".";

test("isExpiring function should work as expected", () => {
  expect(isExpiring(moment().add(1, "days"))).toBeTruthy();
  expect(isExpiring(moment().add(5, "days"))).toBeTruthy();
  expect(isExpiring(moment().add(6, "days"))).toBeTruthy();
  // expect(isExpiring(moment().add(7, "days"))).toBeFalsy();
  expect(isExpiring(moment().add(8, "days"))).toBeFalsy();
});

test("check if lines are being fetched or return empty", () => {
  expect(getEstimatedProductList(4900, estimatesResponseData)).toEqual(expectedLinesData);
  expect(getEstimatedProductList(4901, estimatesResponseData)).toEqual([]);
  expect(getEstimatedProductList(24900, estimatesResponseData)).toEqual([]);
});

test("getEstimatedProductListCount should work as expected", () => {
  expect(getEstimatedProductListCount(3000, estimatesResponseData)).toEqual("2");
  expect(getEstimatedProductListCount(4000, estimatesResponseData)).toEqual("4");
  expect(getEstimatedProductListCount(1000, estimatesResponseData)).toEqual("2");
});
