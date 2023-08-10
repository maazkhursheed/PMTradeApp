import moment from "moment";
import * as R from "ramda";
import * as RA from "ramda-adjunct";
import { stripNonNumbers } from "~root/Lib/StringHelper";
import { PermissionTypes } from "~root/Types/Permissions";
import SwitchValues from "./SwitchValues";

/**
 * @param end date
 * @return true if end date is after the start date
 */
export const isValidEndDate = R.curry((endDate?: Date, startDate?: Date) => {
  return endDate ? moment(endDate).isSameOrAfter(startDate, "d") : false;
});

/**
 * @param start date
 * @return true if start date is same or after today
 */
export const isValidStartDate = (startDate?: Date) => moment(startDate).isSameOrAfter(moment(), "d");

export const isSwitchOn = R.either(R.equals(SwitchValues.ON), R.equals(SwitchValues.LOCKED));

/**
 * @description Permission helper class used to get the different permission and description of the roles for invite team members
 */

export default class PermissionHelper {
  public readonly permission: PermissionTypes;

  constructor(permission: PermissionTypes) {
    this.permission = permission;
  }

  public getTitle() {
    switch (this.permission) {
      case PermissionTypes.ViewOrdersAndDeliveries:
        return "View orders and deliveries";
      case PermissionTypes.PlaceOrders:
        return "Place orders";
      case PermissionTypes.ViewPricing:
        return "View pricing";
      case PermissionTypes.TemporaryAccess:
        return "Temporary access";
      case PermissionTypes.CreditLimit:
        return "Purchasing credit limit";
      case PermissionTypes.ViewEstimatesGroup:
        return "View jobs";
    }
  }

  public getDescription() {
    switch (this.permission) {
      case PermissionTypes.ViewOrdersAndDeliveries:
        return "All team members will have access to all linked accounts";
      case PermissionTypes.PlaceOrders:
        return "On all your linked accounts";
      case PermissionTypes.ViewPricing:
        return "On all linked accounts";
      case PermissionTypes.TemporaryAccess:
        return "Grant access until a certain date only";
      case PermissionTypes.CreditLimit:
        return "Can only purchase up to the credit limit on each order";
      case PermissionTypes.ViewEstimatesGroup:
        return "Must have place order access to view and order from jobs";
    }
  }
}

export interface IEditPermissionReq {
  userId?: string;
  accountId?: string;
  name?: string;
  permissionList?: string[];
  temporaryAccess?: boolean;
  creditLimit?: string;
  startDate?: Date;
  selectedTradeAccount?: string;
  endDate?: Date;
  mobileNumber?: string;
  invitedBy?: string;
  isAdmin?: boolean;
}

/**
 *
 * @return selected permission list for invite team member
 */

export const getPermissionList = R.compose(
  R.map(R.head),
  R.filter(R.compose(isSwitchOn, R.last)),
  R.reject(R.compose(R.either(R.equals(PermissionTypes.TemporaryAccess), R.equals(PermissionTypes.CreditLimit)), R.head)),
  R.toPairs,
);

export const isTemporaryAccessEnabled = R.compose(isSwitchOn, R.prop(PermissionTypes.TemporaryAccess));

export const isCreditLimitEnabled = R.compose(isSwitchOn, R.prop(PermissionTypes.CreditLimit));

export const hasCreditLimitAPI = R.compose(R.gt(R.__, 0), parseFloat, R.prop("creditLimit"));

export const formatCreditLimitText = R.ifElse(RA.isNilOrEmpty, R.always(""), R.compose(R.join(""), R.prepend("$ "), stripNonNumbers));
