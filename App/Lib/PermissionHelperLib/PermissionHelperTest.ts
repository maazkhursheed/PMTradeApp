import { checkPermission, hasPermissionFromArray, shouldHideView, transformResponseToAvailablePermission } from "~root/Lib/PermissionHelperLib/index";
import { GetPermissionResponse } from "~root/Lib/SampleResponses";
import { PermissionTypes } from "~root/Types/Permissions";

test("Should hide view function in PermissionLib should work as expected", () => {
  expect(shouldHideView(true, true)).toBeFalsy();
  expect(shouldHideView(true, false)).toBeFalsy();
  expect(shouldHideView(false, true)).toBeTruthy();
  expect(shouldHideView(false, false)).toBeFalsy();
});

test("checkPermission function should work as expected", () => {
  expect(checkPermission(GetPermissionResponse, "placeOrderGroup")).toBeTruthy();
  expect(checkPermission(GetPermissionResponse, "restrictPriceGroup")).toBeTruthy();
  expect(checkPermission(GetPermissionResponse, "PlaceOrderUsrGroupNoPermission")).toBeTruthy();
});

test("Check if hasPermissionFromArray work as expected", () => {
  const map = {
    [PermissionTypes.AccountOwner]: false,
    [PermissionTypes.UserAdmin]: true,
    [PermissionTypes.PlaceOrders]: true,
  };

  expect(hasPermissionFromArray([PermissionTypes.AccountOwner, PermissionTypes.UserAdmin], map)).toBeTruthy();
  expect(hasPermissionFromArray([PermissionTypes.AccountOwner], map)).toBeFalsy();
  expect(hasPermissionFromArray([PermissionTypes.PlaceOrders, PermissionTypes.UserAdmin], map)).toBeTruthy();
  expect(hasPermissionFromArray(PermissionTypes.UserAdmin, map)).toBeTruthy();
});

test("Transformation of API works as expected", () => {
  expect(transformResponseToAvailablePermission(GetPermissionResponse)).toEqual({
    placeOrderGroup: true,
    restrictPriceGroup: true,
    viewOrderGroup: true,
    accountOwnerGroup: true,
    accountAdminGroup: true,
    viewEstimatesGroup: true,
    creditLimit: 1000,
    tempAccess: {
      endDate: "2019-12-11T11:00:00+0000",
      startDate: "2018-11-11T11:00:00+0000",
    },
  });
});
