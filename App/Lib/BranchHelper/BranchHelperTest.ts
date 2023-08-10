import R from "ramda";
import {
  displayFromAddress,
  getBranchAddress,
  getBranchEmail,
  getBranchGeoCode,
  getBranchName,
  getBranchPhone,
  getDayWiseOpeningHours,
  getHoursObject,
  getOpeningOrClosingTime,
  getOrderTypeValueForFirebaseLog,
  OrderTypes,
  sanitizeBranches,
  titleCase,
} from "~root/Lib/BranchHelper/index";
import { BranchDataArr, BranchDetails, ExpectedBranchDataArr, ExpectedHoursObj } from "~root/Lib/SampleResponses";

test("returns name in title case", () => {
  expect(titleCase("thames thames")).toBe("Thames Thames");
  expect(titleCase("thames")).toBe("Thames");
  expect(titleCase("ThAmes Thames")).toBe("Thames Thames");
});

test("returns name of branch", () => {
  expect(getBranchName(BranchDetails)).toBe("THAMES");
  expect(getBranchName(R.assoc("name", "", BranchDetails))).toBe("");
});

test("returns address of branch", () => {
  expect(getBranchAddress(BranchDetails)).toBe("P O BOX 510, 73 KOPU RD, Bay of Plenty");
  expect(getBranchAddress(R.assocPath(["address", "formattedAddress"], "", BranchDetails))).toBe("");
});

test("returns phone of branch", () => {
  expect(getBranchPhone(BranchDetails)).toBe("(07)868-0130");
  expect(getBranchPhone(R.assocPath(["address", "phone"], "", BranchDetails))).toBe("");
});

test("returns email of branch", () => {
  expect(getBranchEmail(BranchDetails)).toBe("sales.thames@placemakers.co.nz");
  expect(getBranchEmail(R.assocPath(["address", "email"], "", BranchDetails))).toBe("");
});

test("returns geolocation of branch", () => {
  expect(getBranchGeoCode(BranchDetails)).toStrictEqual({
    latitude: -37.18755,
    longitude: 175.566355,
  });
  expect(getBranchGeoCode(R.assoc("geoPoint", {}, BranchDetails))).toStrictEqual({});
});

test("display properly formatted sender's address", () => {
  expect(displayFromAddress(BranchDetails, OrderTypes.EXPRESS)).toBe(getBranchName(BranchDetails));
  expect(displayFromAddress(BranchDetails, OrderTypes.PICKUP)).toBe(`${getBranchName(BranchDetails)}${"\n"}${getBranchAddress(BranchDetails)}`);
});

test("sanitize branches list", () => {
  expect(sanitizeBranches(BranchDataArr)).toStrictEqual(ExpectedBranchDataArr);
});

test("day wise branch opening and closing hours", () => {
  expect(getDayWiseOpeningHours(BranchDataArr[0], "Wed")).toEqual("7:00 AM - 5:30 PM");
  expect(getDayWiseOpeningHours(BranchDataArr[0], "Tue")).toEqual("7:00 AM - 5:30 PM");
  expect(getDayWiseOpeningHours(BranchDataArr[0], "Sun")).toEqual("9:00 AM - 5:00 PM");
});

test("branch status text and color", () => {
  expect(BranchDataArr[0].statusArr).toStrictEqual(["Open", "#02B382", "5:30 PM"]);
});

test("test hours object for particular day and opening and closing time", () => {
  const hoursObj = getHoursObject(BranchDataArr[0], "Wed");
  expect(hoursObj).toStrictEqual(ExpectedHoursObj);
  expect(getOpeningOrClosingTime("closingTime", hoursObj)).toEqual("17:30");
  expect(getOpeningOrClosingTime("openingTime", hoursObj)).toEqual("07:00");
});

test("getOrderTypeValueForFirebaseLog function should return value as expected", () => {
  expect(getOrderTypeValueForFirebaseLog(OrderTypes.EXPRESS)).toEqual("Courier");
  expect(getOrderTypeValueForFirebaseLog(OrderTypes.PICKUP)).toEqual("Pickup");
  expect(getOrderTypeValueForFirebaseLog(OrderTypes.STANDARD)).toEqual("Delivery");
});
