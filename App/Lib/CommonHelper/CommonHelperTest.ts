import {
  alwaysNull,
  bindToArray,
  curryMomentFormat,
  getAddressLineTwo,
  getDateSheetHeaderTitle,
  getFormattedAddresses,
  getTrimmedUserName,
  invokeOnPath,
  isDateNil,
  isNilOrEmpty,
  isToday,
  isValidDate,
  momentFn,
  shouldInvokeFailure,
} from "~root/Lib/CommonHelper/index";

test("bindToArray function should work as expected", () => {
  expect(bindToArray(1, 2)).toEqual([1, 2]);
  expect(bindToArray(1)(2)).toEqual([1, 2]);
});

test("Invoke a function on specified path", () => {
  const obj = {
    action: {
      meta: {
        onSuccess: () => "abc",
      },
    },
  };

  expect(invokeOnPath(["action", "meta", "onSuccess"], obj)).toEqual("abc");
  expect(invokeOnPath(["action", "meta2", "onSuccess"], obj)).toBeUndefined();
  // expect(invokeOnPath(["action", "meta"], obj)).toThrowError();
});

test("Is given date valid", () => {
  expect(isValidDate("11/12/2020")).toBeTruthy();
  expect(isValidDate("")).toBeFalsy();
});

test("Is nil or empty check", () => {
  expect(isNilOrEmpty("")).toBeTruthy();
  expect(isNilOrEmpty(null)).toBeTruthy();
});

test("Is date empty", () => {
  expect(isDateNil("")).toBeTruthy();
});

test("is given date is today", () => {
  expect(isToday(new Date()));
});

test("expected date should be in given format for given date", () => {
  expect(curryMomentFormat("lll", "Nov 12, 2020 12:00 AM")).toEqual("Nov 12, 2020 12:00 AM");
});

test("convert date to lll format", () => {
  expect(momentFn("11/12/2020")).toEqual("Nov 12, 2020 12:00 AM");
});

const successObj = {
  status: 200,
};

const failureObj = {
  status: 401,
};

test("shouldInvokeFailure test", () => {
  expect(shouldInvokeFailure(successObj)).toBeTruthy();
  expect(shouldInvokeFailure(failureObj)).toBeFalsy();
});

test("result should be undefined always", () => {
  expect(alwaysNull("123")).toBe(undefined);
});

test("test delivery date sheet title", () => {
  expect(getDateSheetHeaderTitle(2)).toBe("Time");
});

const addressInput = {
  country: { isocode: "NZ", name: "New Zealand" },
  defaultAddress: false,
  formattedAddress: "Tamaki Avenue, Otahuhu, Auckland, 1062",
  id: "8834367160343",
  line1: "Tamaki Avenue",
  line2: " Otahuhu",
  postalCode: " 1062",
  shippingAddress: true,
  town: " Auckland",
  visibleInAddressBook: true,
};

const addressLine2 = "Otahuhu, Auckland, 1062";

test("function getAddressLineTwo should work as expected", () => {
  expect(getAddressLineTwo(addressInput)).toBe(addressLine2);
  expect(getAddressLineTwo(undefined)).toBe("");
});

const addressArrayInput = [
  {
    addressLine1: "79 Kopu Road",
    addressLine2: "",
    postCode: "3578",
    suburb: "Kopu",
    town: "Thames-Coromandel District",
  },
  {
    addressLine1: "109 Casement Road",
    addressLine2: "",
    postCode: "3620",
    suburb: "Whangamata",
    town: "Thames-Coromandel District",
  },
  {
    addressLine1: "23 Barbara Grove",
    addressLine2: "",
    postCode: "3118",
    suburb: "Papamoa Beach",
    town: "Tauranga City",
  },
  {
    addressLine1: "105 Ash Street",
    addressLine2: "",
    postCode: "3500",
    suburb: "Thames",
    town: "Thames-Coromandel District",
  },
  {
    addressLine1: "29 Redcastle Drive",
    addressLine2: "",
    postCode: "2013",
    suburb: "East Tamaki",
    town: "Auckland",
  },
];
const formattedAddresses = [
  "79 Kopu Road, Kopu, Thames-Coromandel District, 3578",
  "109 Casement Road, Whangamata, Thames-Coromandel District, 3620",
  "23 Barbara Grove, Papamoa Beach, Tauranga City, 3118",
  "105 Ash Street, Thames, Thames-Coromandel District, 3500",
  "29 Redcastle Drive, East Tamaki, Auckland, 2013",
];

test("function getFormattedAddresses should work as expected", () => {
  expect(getFormattedAddresses(addressArrayInput)).toEqual(formattedAddresses);
  expect(getFormattedAddresses([])).toEqual([]);
});

test("get trimmed user name work as expected", () => {
  expect(getTrimmedUserName("Srilatha", "Thatikonda")).toEqual("Srilatha Thatikonda");
});
