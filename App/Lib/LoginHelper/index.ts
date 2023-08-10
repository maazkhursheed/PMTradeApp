import * as R from "ramda";

const jwt = require("jwt-decode");

export const getParameterFromURL = (url, param) =>
  R.compose(R.ifElse(R.includes("&"), R.compose(R.head, R.split("&")), R.identity), R.last, R.split(R.__, url), R.join(""), R.append("="))(param);

export const isUserNotExistInHybris = payload => payload.status === 400;

export const decodeJWTToken = (data: string) => {
  return jwt(data);
};

export const extractEmailFromJWTPayload = R.prop("email");
export const extractFirstNameFromJWTPayload = R.prop("https://ecommerce.placemakers.co.nz/firstName");
export const extractLastNameFromJWTPayload = R.prop("https://ecommerce.placemakers.co.nz/surname");
export const extractSignUpFromJWTPayload = R.prop("https://ecommerce.placemakers.co.nz/fromSignup");
export const extractPhoneNumberFromJWTPayload = R.prop("https://ecommerce.placemakers.co.nz/phoneNumber");
export const extractTradeAccountsFromJWTPayload = R.pathOr([], ["https://ecommerce.placemakers.co.nz/tradeAccounts", "tradeAccounts"]);
export const extractDigitalIdFromJWTPayload = R.prop("sub");

/**
 * @param login user response
 * @return length of trade account if trade accounts are available in companies object user login response
 */

export const hasTradeAccounts = R.compose(R.length, R.flatten, R.map(R.propOr([], "tradeAccounts")), R.propOr([], ["companies"]));

/**
 * @param login user response
 * @return trade account if trade accounts are available in companies object user login response
 */
export const getTradeAccounts = R.compose(R.flatten, R.map(R.propOr([], "tradeAccounts")), R.propOr([], "companies"));

/**
 * @param login user response
 * @return  first trade account if trade accounts are available in companies object user login response
 */
export const getFirstTradeAccount = R.path(["companies", "0", "tradeAccounts", "0"]);

export const getIndexedTradeAccount = R.curry((index, data) => R.compose(R.view(R.lensIndex(index)), getTradeAccounts)(data));

/**
 * @param login user response
 * @return length of trade account if trade accounts are available in companies object user login response
 */
export const getTradeAccountCount = R.compose(R.length, getTradeAccounts);
