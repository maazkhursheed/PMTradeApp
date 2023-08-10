import * as R from "ramda";
import * as RA from "ramda-adjunct";
import { isNotNilOrEmpty } from "~root/Lib/CommonHelper";

/**
 *
 * @param data Array of objects containing branch title and details of all its branches.
 * @description this helper functions returns array of objects with objects being details of all the branches.
 */

export const transformTradeListForView = (data: any) => {
  return R.compose(R.flatten, R.map(R.prop("data")))(data);
};

/**
 *
 * @param data Object having list of trade accounts and other user details.
 * @description this is a helper function that separates list of trade accounts and segregates them based on their title and
 * branch details.
 */

export const transformTradeList = (data: any) => {
  return R.compose(
    R.map(
      R.applySpec({
        title: R.head,
        data: R.last,
      }),
    ),
    R.toPairs,
    R.groupBy(R.path(["branch", "name"])),
    tradeListTransform,
  )(data);
};

/**
 * This helper functions returns array of objects with objects being details of branches holding trade accounts.
 */

export const tradeListTransform = R.compose(R.flatten, R.map(R.prop("tradeAccounts")), R.filter(R.has("tradeAccounts")), R.prop("companies"));

/**
 * Check if the Owner tab is selected and also trade account and branch is selected by providing the state as parameter.
 *
 * @param state - Connect trade account screen state
 * @return boolean - Check if trade account and branch id is selected returns true if either field is empty
 */

export const isStateForTradeAccountOwnerEmpty = R.both(
  R.propSatisfies(R.equals("1"), "selected"),
  R.anyPass([R.propSatisfies(RA.isNilOrEmpty, "accountID"), R.propSatisfies(RA.isNilOrEmpty, "branchID")]),
);

export const transformTradeConnectableList = R.compose(
  R.map(
    R.applySpec({
      title: R.head,
      data: R.last,
    }),
  ),
  R.toPairs,
  R.groupBy(R.path(["branch", "name"])),
  R.propOr([], "connectedTradeAccounts"),
);

export const connectableListCount = R.compose(R.length, R.propOr([], "connectedTradeAccounts"));

/**
 *
 * @description This function returns account name of selected account
 */

export const getAccountName = (selectedTradeAccount: any, selectedJobAccount: any) => {
  return selectedJobAccount ? selectedJobAccount.SearchName : selectedTradeAccount ? selectedTradeAccount.custId + " " + selectedTradeAccount.name : undefined;
};

export const updateSelectedTradeAccountFromUserInfo = R.curry((uid, accounts) => {
  if (isNotNilOrEmpty(uid) && accounts?.length > 0) {
    return R.compose(
      R.last,
      R.filter(v => v?.uid === uid),
      R.flatten,
      R.map(v => v?.data),
    )(accounts);
  } else {
    return undefined;
  }
});
