import * as R from "ramda";
import { isNilOrEmpty } from "~root/Lib/CommonHelper";

/**
 *
 * @param JobAccount response
 * @return Jobs from response
 */
export const fetchJobs = R.compose(R.ifElse(R.isNil, R.always(undefined), R.prop("Jobs")), R.prop("Customer"));

export const fetchHybrisJobs = R.compose(
  R.map(
    R.applySpec({
      SearchName: R.ifElse(R.has("searchName"), R.prop("searchName"), R.prop("jobName")),
      JobName: R.propOr("", "jobName"),
      JobNumber: R.propOr("", "jobNumber"),
      Address1: R.propOr("", "address1"),
      Address2: R.propOr("", "address2"),
      JobId: R.propOr("", "jobId"),
    }),
  ),
  R.ifElse(R.isNil, R.always(R.empty), R.propOr([], "jobs")),
  R.propOr([], "customer"),
);

/**
 * @param  job account item response
 * @return search name if exists otherwise it returns job name
 */
export const showJobSearchName = R.ifElse(R.prop("SearchName"), R.prop("SearchName"), R.prop("JobName"));

/**
 * @param job account item response
 * @return address of the job account
 */

export const showJobAddress = R.compose(R.join(", "), R.reject(isNilOrEmpty), R.values, R.juxt([R.propOr("", "Address1"), R.propOr("", "Address2")]));
