import moment, { MomentInput } from "moment";
import * as R from "ramda";
import * as RA from "ramda-adjunct";
import OrderHistorySchema, { OrderHistoryStatus } from "~root/Db/OrderHistorySchema";

export const startOfDate = (date: MomentInput) => moment(date).startOf("d").toISOString();

export const fixDatePayload = R.over(R.lensProp("date"), R.compose(startOfDate, R.prop("date")));

export const getItemByTokenNumber = R.curry((db: any, token: string) => {
  return R.head(db.objects(OrderHistorySchema.name).filtered("token = $0", token));
});

export const isNavigableStatus = R.flip(R.includes)([OrderHistoryStatus.Confirmed]);

export const parseOrder = R.ifElse(
  R.pathSatisfies(RA.isNotNilOrEmpty, ["tradeAccount", "orders"]),
  R.prop("tradeAccount"),
  R.compose(R.find(R.propSatisfies(RA.isNotNilOrEmpty, "orders")), R.propOr([], "jobAccount")),
);
