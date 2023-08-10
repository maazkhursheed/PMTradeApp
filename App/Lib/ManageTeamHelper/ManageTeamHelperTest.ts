import R from "ramda";
import {
  formatCreditLimitText,
  getPermissionList,
  hasCreditLimitAPI,
  isCreditLimitEnabled,
  isSwitchOn,
  isTemporaryAccessEnabled,
  isValidEndDate,
} from "~root/Lib/ManageTeamHelper/index";
import SwitchValues from "~root/Lib/ManageTeamHelper/SwitchValues";

const permissions = {
  viewOrderGroup: "locked",
  placeOrderGroup: "off",
  restrictPriceGroup: "off",
  tempAccess: "off",
  creditLimit: "off",
};

test("end date should not be undefined or greater than access date", () => {
  expect(isValidEndDate(new Date(2019, 9, 2), new Date(2019, 9, 1))).toBe(true);
  expect(isValidEndDate(new Date(2019, 9, 1), new Date(2019, 9, 1))).toBe(true);
  expect(isValidEndDate(new Date(2018, 9, 1), new Date(2019, 9, 1))).toBe(false);
});

test("credit limit check", () => {
  expect(isCreditLimitEnabled({ creditLimit: SwitchValues.ON })).toBeTruthy();
  expect(isCreditLimitEnabled({ creditLimit: SwitchValues.DISABLED })).toBeFalsy();
  expect(isCreditLimitEnabled({ creditLimit: SwitchValues.OFF })).toBeFalsy();
});

test("returns list of permissions", () => {
  expect(getPermissionList(permissions)).toStrictEqual(["viewOrderGroup"]);
  expect(getPermissionList(R.assoc("viewOrderGroup", "unlocked", permissions))).toStrictEqual([]);
  expect(getPermissionList(R.assoc("placeOrderGroup", "on", permissions))).toStrictEqual(["viewOrderGroup", "placeOrderGroup"]);
});

test("check whether a particular permission is granted or not", () => {
  expect(isSwitchOn(permissions.viewOrderGroup)).toBeTruthy();
  expect(isSwitchOn(R.assoc("placeOrderGroup", "on", permissions).placeOrderGroup)).toBeTruthy();
  expect(isSwitchOn(permissions.placeOrderGroup)).toBeFalsy();
});

test("format credit limit in required format", () => {
  expect(formatCreditLimitText("25000")).toBe("$ 25000");
  expect(formatCreditLimitText("")).toBe("");
  expect(formatCreditLimitText(undefined)).toBe("");
});

test("check whether creditLimit is given or not", () => {
  expect(hasCreditLimitAPI(permissions)).toBeFalsy();
  expect(hasCreditLimitAPI(R.assoc("creditLimit", "0", permissions))).toBeFalsy();
  expect(hasCreditLimitAPI(R.assoc("creditLimit", "25.96", permissions))).toBeTruthy();
});

test("check whether temporary access is enabled or not", () => {
  expect(isTemporaryAccessEnabled(permissions)).toBeFalsy();
  expect(isTemporaryAccessEnabled(R.assoc("tempAccess", SwitchValues.ON, permissions))).toBeTruthy();
  expect(isTemporaryAccessEnabled(R.assoc("tempAccess", SwitchValues.DISABLED, permissions))).toBeFalsy();
});
