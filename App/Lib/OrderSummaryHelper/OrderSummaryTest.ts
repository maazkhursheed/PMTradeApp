import * as R from "ramda";
import { checkOrderCreditLimit, needAddressSelectionSkipping, validateOrderSummaryData } from "~root/Lib/OrderSummaryHelper/index";
import { OrderJson } from "~root/Lib/SampleResponses";

const props = {
  creditLimit: 50,
  subTotal: 100,
};

test("Order credit limit function should work expectedly", () => {
  expect(checkOrderCreditLimit(props)).toBeTruthy();
  expect(checkOrderCreditLimit(R.assoc("creditLimit", false, props))).toBeFalsy();
  expect(checkOrderCreditLimit(R.assoc("subTotal", 49, props))).toBeFalsy();
});

test("Order Summary data validation", async done => {
  const result = await validateOrderSummaryData({
    poNumber: "",
    phoneNumber: "1231",
    name: "",
    instructions: "asd",
  });
  done();
  expect(result).toBeUndefined();
});
test("Check whether address can be skipped or not", () => {
  expect(needAddressSelectionSkipping(OrderJson)).toBeFalsy();
  expect(needAddressSelectionSkipping(R.assocPath(["branchList", "selectedOrderType"], "pickup", OrderJson))).toBeFalsy();
  expect(
    needAddressSelectionSkipping(R.assocPath(["jobAccounts", "data"], [], R.assocPath(["branchList", "selectedOrderType"], "pickup", OrderJson))),
  ).toBeTruthy();
  expect(
    needAddressSelectionSkipping(
      R.assocPath(
        ["jobAccounts", "data"],
        [],
        R.assocPath(["branchList", "dataDepots"], [], R.assocPath(["branchList", "selectedOrderType"], "pickup", OrderJson)),
      ),
    ),
  ).toBeTruthy();
  expect(
    needAddressSelectionSkipping(
      R.assocPath(
        ["jobAccounts", "data"],
        [],
        R.assocPath(["branchList", "dataDepots"], [{}, {}], R.assocPath(["branchList", "selectedOrderType"], "pickup", OrderJson)),
      ),
    ),
  ).toBeFalsy();
  expect(needAddressSelectionSkipping(R.assocPath(["jobAccounts", "data"], [], R.assocPath(["branchList", "dataDepots"], [], OrderJson)))).toBeFalsy();
});
