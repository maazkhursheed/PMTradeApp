import { isNotificationOn } from ".";
import { OrderTypes, SMSFlags } from "../BranchHelper";

test("isNotificationOn should return value as expected", () => {
  expect(isNotificationOn(OrderTypes.PICKUP, [SMSFlags.READY_FOR_PICKUP])).toBeTruthy();
  expect(isNotificationOn(OrderTypes.PICKUP, [SMSFlags.LEFT_BRANCH])).toBeFalsy();

  expect(isNotificationOn(OrderTypes.EXPRESS, [SMSFlags.LEFT_BRANCH])).toBeFalsy();
  expect(isNotificationOn(OrderTypes.EXPRESS, [SMSFlags.READY_FOR_PICKUP])).toBeFalsy();

  expect(isNotificationOn(OrderTypes.PICKUP, [])).toBeFalsy();
  expect(isNotificationOn(OrderTypes.EXPRESS, [])).toBeFalsy();
  expect(isNotificationOn(OrderTypes.STANDARD, [])).toBeFalsy();

  expect(isNotificationOn(OrderTypes.STANDARD, [SMSFlags.LEFT_BRANCH])).toBeTruthy();
  expect(isNotificationOn(OrderTypes.STANDARD, [SMSFlags.MISSED_DELIVERY])).toBeTruthy();
  expect(isNotificationOn(OrderTypes.STANDARD, [SMSFlags.ON_ITS_WAY])).toBeTruthy();
  expect(isNotificationOn(OrderTypes.STANDARD, [SMSFlags.SCHEDULE_FOR_DELIVERY])).toBeTruthy();
  expect(isNotificationOn(OrderTypes.STANDARD, [SMSFlags.READY_FOR_PICKUP])).toBeFalsy();
});
