import moment from "moment";
import * as R from "ramda";
import { isDirectSupplier } from "~root/Lib/OrderItemHelper";
import OrderDetailModel from "~root/Types/OrderDetail";

/**
 * This helper function returns true for important order flag if there is order to be delivered today or tomorrow but not from direct supplier else it returns false
 */

export function isImportant(item: OrderDetailModel) {
  const momentDate = moment(item.requestDate);
  const today = moment();
  const tomorrow = moment().add(1, "day");
  const isDateSame = (date: moment.MomentInput) => momentDate.isSame(date, "d");

  return (isDateSame(today) || isDateSame(tomorrow)) && !isDirectSupplier(R.prop("original", item));
}
