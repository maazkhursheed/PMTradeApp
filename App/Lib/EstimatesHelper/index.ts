import moment from "moment";
import * as R from "ramda";
import { sanitizeEstimateProducts } from "~root/Lib/DataHelper";

/**
 * Helper function to that returns true if job estimate is about to expire soon
 *
 * @param estimateExpire date on which the estimate will expire
 * @return true if 7 or less days are left to estimateExpire
 */

export const isExpiring = (estimateExpire: any) => {
  return moment(estimateExpire).isBefore(moment().add(7, "days"));
};

export const getEstimatedProductList = R.curry((sectionId, data) =>
  R.compose(
    R.map(sanitizeEstimateProducts),
    R.propOr([], "lines"),
    R.find(R.propEq("sectionId", sectionId)),
    R.pathOr([], ["estimateList", "0", "section"]),
  )(data),
);

export const getEstimatedProductListCount = R.curry((sectionId, data) =>
  R.compose(
    R.propOr(0, "lineCount"),
    R.find(R.propEq("sectionId", sectionId)),
    R.pathOr([], ["estimateList", "0", "section"]),
  )(data),
);
