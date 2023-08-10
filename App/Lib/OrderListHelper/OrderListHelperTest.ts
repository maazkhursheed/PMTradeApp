import moment from "moment";
import { isImportant } from "~root/Lib/OrderListHelper/index";
import OrderDetailModel from "~root/Types/OrderDetail";

test("Order list important date check should work as expected", () => {
  expect(isImportant({ requestDate: moment().format() } as OrderDetailModel)).toBeTruthy();
  expect(
    isImportant({
      requestDate: moment().add(1, "d").format(),
    } as OrderDetailModel),
  ).toBeTruthy();
  expect(
    isImportant({
      requestDate: moment().format(),
      original: { directShip: "Y" },
    } as OrderDetailModel),
  ).toBeFalsy();
  expect(
    isImportant({
      requestDate: moment().format(),
      original: { DirectShip: "N" },
    } as OrderDetailModel),
  ).toBeTruthy();

  expect(
    isImportant({
      requestDate: moment().add(2, "d").toString(),
    } as OrderDetailModel),
  ).toBeFalsy();
  expect(
    isImportant({
      requestDate: moment().add(-1, "d").toString(),
    } as OrderDetailModel),
  ).toBeFalsy();
});
