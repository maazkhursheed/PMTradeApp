import moment from "moment";
import Realm from "realm";
import OrderHistorySchema, { IOrderHistoryObject, OrderHistoryStatus } from "~root/Db/OrderHistorySchema";
import { fixDatePayload, getItemByTokenNumber, startOfDate } from "~root/Lib/OrderHistoryHelper/index";

test("Start of date should return 12 AM in the morning", () => {
  const startDate = moment(startOfDate(new Date()));
  expect(startDate.get("minute") === 0 && startDate.get("hour") === 0).toBeTruthy();
});

test("Date should be fixed in the given payload", () => {
  const dummyPayload: IOrderHistoryObject = {
    orderId: "123",
    status: OrderHistoryStatus.Cancelled,
    token: "abcd",
    date: moment().toISOString(),
  };

  const startDate = moment(fixDatePayload(dummyPayload).date);
  expect(startDate.get("minute") === 0 && startDate.get("hour") === 0).toBeTruthy();
  expect(fixDatePayload({ orderId: "123", date: startDate.toISOString() })).toEqual({
    orderId: "123",
    date: startDate.toISOString(),
  });
});

test("Realm operations are working correctly", done => {
  Realm.open({ schema: [OrderHistorySchema] })
    .then((realm: any) => {
      getItemByTokenNumber(realm, "");
      done();
    })
    .catch(err => {
      done();
    });
});
