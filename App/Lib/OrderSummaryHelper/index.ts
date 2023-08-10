import * as R from "ramda";
import * as RA from "ramda-adjunct";
import * as yup from "yup";
import { OrderTypes } from "~root/Lib/BranchHelper";

/**
 * This helper function returns true if subtotal of order is not greater than credit limit allowed to team member user
 */
export const checkOrderCreditLimit = R.allPass([
  R.propSatisfies(R.complement(RA.isFalse), "creditLimit"),
  R.compose(R.apply(R.gt), R.values, R.pick(["subTotal", "creditLimit"])),
]);

const schemaOrderSummaryPage = yup.object({
  poNumber: yup.string().required("Required"),
  phoneNumber: yup.string().required("Required").min(7, "Requires a phone number of 7-11 digits").max(11),
  name: yup.string().required("Required"),
  instructions: yup.string().required("Required"),
});

export const validateOrderSummaryData = async data => {
  const validation = await new Promise(resolve => {
    schemaOrderSummaryPage
      .validate(data, { abortEarly: false })
      .then(result => resolve(true))
      .catch(err => {
        resolve(R.compose(R.map(R.compose(R.fromPairs, R.of, R.values, R.pick(["path", "message"]))), R.prop("inner"))(err));
      });
  });

  return validation;
};

export const needAddressSelectionSkipping = R.allPass([
  R.pathSatisfies(R.equals(OrderTypes.PICKUP), ["branchList", "selectedOrderType"]),
  R.pathSatisfies(R.compose(R.equals(0), R.length), ["jobAccounts", "data"]),
  R.pathSatisfies(R.compose(R.lte(R.__, 1), R.length), ["branchList", "dataDepots"]),
]);

export const generateHash = (val: string) => {
  let hash = 0;
  let i;
  let chr;
  for (i = 0; i < val.length; i++) {
    chr = val.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};
