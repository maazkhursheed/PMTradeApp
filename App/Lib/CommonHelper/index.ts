import moment, { MomentInput } from "moment";
import * as R from "ramda";
import { Dimensions, Platform } from "react-native";
import { getDigitsNumberLength, getFractionNumberLength } from "../ProductHelper";

/**
 *
 * @description This file contains common functions used in the app.
 * like: Formats the date in the given format,
 * checking the Device size greater than 350,
 * checking strings if the string null
 */

export const isToday = (date: string | MomentInput | undefined) => moment(date).isSame(new Date(), "D");

/**
 * Creates a new object with the own properties of the provided object, but the
 * keys renamed according to the keysMap object as `{oldKey: newKey}`.
 * When some key is not found in the keysMap, then it's passed as-is.
 *
 * Keep in mind that in the case of keys conflict is behaviour undefined and
 * the result may vary between various JS engines!
 */

export const renameKeys = <T>(param: T) =>
  R.curry((keysMap, obj) => R.reduce((acc, key) => R.assoc(keysMap[key] || key, obj[key], acc), {}, R.keys(obj)))(param);

export const isValidDate = (date: number | string) => moment(date).isValid();

/**
 * Formats a date in a given format.
 */

/**
 *
 * @description generates transaction ID using the current timestamp expressed in milliseconds.
 */
export const isIOS = Platform.select({ ios: true, android: false });

export const curryMomentFormat = R.curry((format, date) => moment(date, "MMM DD, YYYY LT").format(format));

export const tapRamda = R.tap(val => console.log(val));

export const momentFn = date => moment(date).format("lll");

/**
 *
 * @param api reference of the api
 * @description generates transaction ID using the current timestamp expressed in milliseconds.
 */

export const generateTransactionId = () => moment().valueOf().toString();

export const isNilOrEmpty = R.either(R.isNil, R.isEmpty);

export const isNotNilOrEmpty = R.complement(isNilOrEmpty);

export const bindToArray = R.curry((a: any, b: any) => [a, b]);

export const isLargeDevice = () => {
  return Dimensions.get("window").width >= 350;
};

export const alwaysNull = R.always(undefined);

export const invokeOnPath = R.curry((path, item) => R.compose(R.ifElse(isNilOrEmpty, R.empty, R.call), R.path(path))(item));

export const shouldInvokeFailure = R.propSatisfies(R.complement(R.includes(R.__, [401, 503])), "status");

export const isDateNil = R.anyPass([R.isNil, R.isEmpty, R.equals("0001-01-01T00:00:00")]);

/**
 * Re initializes setState in it's callback
 * @param func bind function for setState
 * @param initialValue First value
 * @param finalValue Next value
 */
export const setDoubleState = (func: any, initialValue: any, finalValue: any) => func(initialValue, () => func(finalValue));

export const getDateSheetHeaderTitle = (currentScreen: number) => {
  let title = "Date";
  if (currentScreen === 2) {
    title = "Time";
  } else if (currentScreen === 3) {
    title = "Specific time";
  }
  return title;
};

export const getFormattedAddresses = (addresses: any[]) => {
  return addresses.map(address => {
    return getFullAddress(address);
  });
};

export const getFullAddress = (address: {}) => {
  const { addressLine1, addressLine2, postCode, suburb, town } = address;
  return R.compose(R.join(", "), R.reject(isNilOrEmpty))([addressLine1, addressLine2, suburb, town, postCode]);
};

export const getAddressLineTwo = (address: any) => {
  if (address) {
    const { line2, postalCode, suburb, town } = address;

    return R.compose(R.join(", "), R.map(R.trim), R.reject(isNilOrEmpty))([line2, suburb, town, postalCode]);
  }
  return "";
};

export const getTrimmedUserName = (firstName?: string, lastName?: string) => {
  return firstName?.trim() + " " + lastName?.trim();
};

export const isNumberRangeValid = (number: Number, maxDigits: Number, maxPrecision: Number) => {
  const length = getDigitsNumberLength(number);
  const precision = getFractionNumberLength(number);
  return !(Number(length) > maxDigits || precision > maxPrecision);
};
