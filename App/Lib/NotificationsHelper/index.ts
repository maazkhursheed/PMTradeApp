import { OrderTypes, SMSFlags } from "../BranchHelper";

/**
 *
 * @param orderType the type of order select by user while checkout
 * @param smsFlags an array containing type of notifications that the user wants to enable
 * @description this function returns true if any notification is enabled depending on type of order selected.
 */

export const isNotificationOn = (orderType: OrderTypes, smsFlags: any[]) => {
  switch (orderType) {
    case OrderTypes.PICKUP:
      return smsFlags?.includes(SMSFlags.READY_FOR_PICKUP);
    case OrderTypes.STANDARD:
      return (
        smsFlags?.includes(SMSFlags.LEFT_BRANCH) ||
        smsFlags?.includes(SMSFlags.MISSED_DELIVERY) ||
        smsFlags?.includes(SMSFlags.ON_ITS_WAY) ||
        smsFlags?.includes(SMSFlags.SCHEDULE_FOR_DELIVERY)
      );
    default:
      return false;
  }
};
