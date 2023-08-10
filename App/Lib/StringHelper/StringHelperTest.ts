import { getSellOrderMultipleValue, isTimberFlag } from "~root/Lib/DataHelper";
import { getEstimatedPickupTime, getScreenNames } from "~root/Lib/OrderItemHelper";
import {
  convertToString,
  formatNumber,
  formatPhoneNumber,
  generateURIfromObject,
  generateUrlEncoded,
  getFileName,
  getInitials,
  getUrlExtension,
  isInvalidEmailPresent,
  stripNonNumbers,
  validateContactPhone,
  validateCreditLimit,
  validateEmail,
  validateFullName,
  validateImageName,
  validatePhone,
  validatePONumber,
  validateSTCPONumber,
  validateSurName,
  validateUserName,
} from "~root/Lib/StringHelper/index";

test("STC PO number should be properly validated", () => {
  expect(validateSTCPONumber("029,ABC")).toBeFalsy();
  expect(validateSTCPONumber("029|ABC")).toBeFalsy();
  expect(validateSTCPONumber("029;ABC")).toBeTruthy();
  expect(validateSTCPONumber("029:ABC")).toBeTruthy();
  expect(validateSTCPONumber(":029;ABC")).toBeTruthy();
  expect(validateSTCPONumber("029ABC")).toBeTruthy();
});

test("PO number should be properly validated", () => {
  expect(validatePONumber("029,ABC")).toBeTruthy();
  expect(validatePONumber("029|ABC")).toBeFalsy();
  expect(validatePONumber("029;ABC")).toBeFalsy();
  expect(validatePONumber("029:ABC")).toBeTruthy();
  expect(validatePONumber(":029;ABC")).toBeFalsy();
  expect(validatePONumber("029ABC")).toBeTruthy();
});

test("Phone number should be formatted properly", () => {
  expect(formatNumber("0277069321")).toBe("027 706 9321");
  expect(formatNumber("1234567")).toBe("123 4567");
  expect(formatNumber("12345678")).toBe("123 456 78");
  expect(formatNumber("123456789")).toBe("123 456 789");
  expect(formatNumber("1234567891")).toBe("123 456 7891");
  expect(formatNumber("12345678910")).toBe("123 456 78910");
  expect(formatNumber("027 706 9321")).toBe("027 706 9321");
  expect(formatNumber("(027) 706 9321")).toBe("027 706 9321");
});

test("Phone number must return empty for undefined values", () => {
  expect(formatNumber(undefined)).toBe("");
});

test("Phone number must return invalid number for Invalid Numbers", () => {
  expect(formatNumber("12341")).toBe("12341");
  expect(formatNumber("123456789102")).toBe("123456789102");
});

test("email address input should be validated properly", () => {
  expect(validateEmail("a111@gmail.co")).toBe(true);
  expect(validateEmail("hello@gmail.co.nz")).toBe(true);
  expect(validateEmail("hello.world@gmail.co.nz")).toBe(true);
  expect(validateEmail("1010")).toBe(false);
  expect(validateEmail("hello")).toBe(false);
  expect(validateEmail("1hello@gmail.com")).toBe(true);
});

test("phone number input should be validated properly", () => {
  expect(validatePhone("12345")).toBeFalsy();
  expect(validatePhone("123456")).toBeFalsy();
  expect(validatePhone("1234567")).toBe(true);
  expect(validatePhone("1234567891")).toBe(true);
  expect(validatePhone("123456789101")).toBeFalsy();
  // expect(validatePhone("+92 773739")).toBeFalsy();
  expect(validatePhone("12345q")).toBeFalsy();
});

test("site contact phone number input should be validated properly", () => {
  expect(validateContactPhone("12345")).toBeFalsy();
  expect(validateContactPhone("123456")).toBeFalsy();
  expect(validateContactPhone("1234567")).toBeFalsy();
  expect(validateContactPhone("1234567891")).toBe(true);
  expect(validateContactPhone("12345678912")).toBe(true);
  expect(validateContactPhone("123456789123")).toBeFalsy();
  expect(validateContactPhone("12345q")).toBeFalsy();
});

test("user name input should be validated properly", () => {
  expect(validateUserName("hello123")).toBe(true);
  expect(validateUserName("first123 last")).toBe(true);
  expect(validateUserName("first last")).toBe(true);
  expect(validateUserName("first++")).toBe(false);
  expect(validateUserName("frist last**")).toBe(false);
});
test("credit limit should contain numbers only", () => {
  expect(validateCreditLimit("1000")).toBeTruthy();
  expect(validateCreditLimit("1000q")).toBeFalsy();
  expect(validateCreditLimit("1000,")).toBeFalsy();
  expect(validateCreditLimit("1000")).toBeTruthy();
  expect(validateCreditLimit(undefined)).toBeFalsy();
  expect(validateCreditLimit("$ 1000")).toBeTruthy();
});

test("Full name must contain alphabets only", () => {
  expect(validateFullName(" abc ")).toBe(true);
  expect(validateFullName(" abc abc ")).toBe(true);
  expect(validateFullName(" abc")).toBe(true);
  expect(validateFullName("abc ")).toBe(true);
  expect(validateFullName("abc")).toBe(true);
  expect(validateFullName("abc abc")).toBe(true);
  expect(validateFullName("12abc221")).toBe(false);
  expect(validateFullName(" abc +")).toBe(false);
  expect(validateFullName("+abc")).toBe(false);
});

test("non numeric characters should be removed from a string", () => {
  expect(stripNonNumbers("A  998   C")).toBe("998");
  expect(stripNonNumbers("AB998DF   ")).toBe("998");
  expect(stripNonNumbers("  998 DF  123 DF  DD")).toBe("998123");
  expect(stripNonNumbers("  9VC9S8A12A 3 ")).toBe("998123");
  expect(stripNonNumbers("998+123=")).toBe("998123");
  expect(stripNonNumbers("@1  2  22  32--")).toBe("122232");
  expect(stripNonNumbers("abc")).toBe("");
});

test("surname should only contain alphabets separated by a hyphen or quotation mark", () => {
  expect(validateSurName("AA")).toBe(true);
  expect(validateSurName("aa")).toBe(true);
  expect(validateSurName("AAaa")).toBe(true);
  expect(validateSurName("aaAA")).toBe(true);
  expect(validateSurName("AA-aa")).toBe(true);
  expect(validateSurName("aa-AA")).toBe(true);
  expect(validateSurName("AA---")).toBe(true);
  expect(validateSurName("AA-'")).toBe(true);
  expect(validateSurName("AA's")).toBe(true);
  expect(validateSurName("AA-1")).toBe(false);
  expect(validateSurName("AA'#")).toBe(false);
  expect(validateSurName("AA1")).toBe(false);
});

test("object to query uri should work as expected", () => {
  expect(
    generateURIfromObject({
      testData: "any data",
      anotherData: "some more data",
    }),
  ).toEqual("testData=any data&anotherData=some more data");
});

test("status of timberProductFlag should be returned as true or false", () => {
  expect(
    isTimberFlag({
      product: { timberProductFlag: true, sellOrderMultiple: 1 },
    }),
  ).toBe(true);
  expect(isTimberFlag({ product: { timberProductFlag: false } })).toBe(false);
});

test("value of sellOrderMultipleValue should be returned as any number or 0", () => {
  expect(getSellOrderMultipleValue({ sellOrderMultiple: 2.4 })).toBe(2.4);
  expect(getSellOrderMultipleValue({ sellOrderMultiple: 4 })).toBe(4);
  expect(getSellOrderMultipleValue(undefined)).toBe(0);
  expect(getSellOrderMultipleValue({ sellOrderMultiple: undefined })).toBe(0);
});

test("initals of first and last name populated from full name", () => {
  expect(getInitials("My Full Name")).toBe("MN");
});

test("Phone number should be formatted properly", () => {
  expect(formatPhoneNumber("0277069321")).toBe("027 706 9321");
  expect(formatPhoneNumber("1234567")).toBe("012 345 67");
  expect(formatPhoneNumber("12345678")).toBe("012 345 678");
  expect(formatPhoneNumber("123456789")).toBe("012 345 6789");
  expect(formatPhoneNumber("1234567891")).toBe("012 345 67891");
  expect(formatPhoneNumber("027 706 9321")).toBe("027 706 9321");
  expect(formatPhoneNumber("(027) 706 9321")).toBe("027 706 9321");
});

test("Phone number must return empty for undefined values", () => {
  expect(formatNumber(undefined)).toBe("");
});

test("Url encoding should work as expected", () => {
  expect(generateUrlEncoded("fbu/testdata/abc%123")).toEqual("fbu/testdata/abc%25123");
});

test("Convert given any value to string", () => {
  expect(typeof convertToString(123)).toBe("string");
});

test("combined job_orders array should be returned on providing jobAccounts array", () => {
  expect(getEstimatedPickupTime("")).toBe("");
  expect(getEstimatedPickupTime("15:30:00")).toBe("03:30 PM");
  expect(getEstimatedPickupTime("00:00:00")).toBe("12:00 AM");
  expect(getEstimatedPickupTime("11:46:00")).toBe("11:46 AM");
  expect(getEstimatedPickupTime("08:00:00")).toBe("08:00 AM");
});

test("Get transformed screen names from navigation for UXCam screen tagging", () => {
  expect(getScreenNames(undefined)).toBe("");
  expect(getScreenNames("LandingPage")).toBe("Shop Screen");
});

test("get file name and extension from file url", () => {
  expect(getUrlExtension("")).toBe("");
  expect(
    getUrlExtension(
      "https://api.crre-fletcherb1-s2-public.model-t.cc.commerce.ondemand.com/medias/sys_master/quotes/hda/ha8/9025898020894/Mo-03-22-10-53-BE8D3CC8-4958-4774-B43B-2DF0E695B813/Mo-03-22-10-53-BE8D3CC8-4958-4774-B43B-2DF0E695B813.jpg?attachment=true",
    ),
  ).toBe("jpg");
  expect(
    getFileName(
      "https://api.crre-fletcherb1-s2-public.model-t.cc.commerce.ondemand.com/medias/sys_master/quotes/hda/ha8/9025898020894/Mo-03-22-10-53-BE8D3CC8-4958-4774-B43B-2DF0E695B813/Mo-03-22-10-53-BE8D3CC8-4958-4774-B43B-2DF0E695B813.jpg?attachment=true",
    ),
  ).toBe("Mo-03-22-10-53-BE8D3CC8-4958-4774-B43B-2DF0E695B813.jpg");
  expect(getFileName("")).toBe("");
  expect(
    getFileName(
      "https://api.crre-fletcherb1-s2-public.model-t.cc.commerce.ondemand.com/medias/sys_master/quotes/hda/ha8/9025898020894/Mo-03-22-10-53-BE8D3CC8-4958-4774-B43B-2DF0E695B813/Mo-03-22-10-53-BE8D3CC8-4958-4774-B43B-2DF0E695B813.jpg",
    ),
  ).toBe("Mo-03-22-10-53-BE8D3CC8-4958-4774-B43B-2DF0E695B813.jpg");
  expect(
    getFileName(
      "api.crre-fletcherb1-s2-public.model-t.cc.commerce.ondemand.com/medias/sys_master/quotes/hda/ha8/9025898020894/Mo-03-22-10-53-BE8D3CC8-4958-4774-B43B-2DF0E695B813/Mo-03-22-10-53-BE8D3CC8-4958-4774-B43B-2DF0E695B813.jpg",
    ),
  ).toBe("Mo-03-22-10-53-BE8D3CC8-4958-4774-B43B-2DF0E695B813.jpg");
  expect(
    getFileName("quotes/hda/ha8/9025898020894/Mo-03-22-10-53-BE8D3CC8-4958-4774-B43B-2DF0E695B813/Mo-03-22-10-53-BE8D3CC8-4958-4774-B43B-2DF0E695B813.jpg"),
  ).toEqual("");
  expect(getFileName("Mo-03-22-10-53-BE8D3CC8-4958-4774-B43B-2DF0E695B813.jpg")).toBe("Mo-03-22-10-53-BE8D3CC8-4958-4774-B43B-2DF0E695B813.jpg");
  expect(
    getUrlExtension(
      "https://api.crre-fletcherb1-s2-public.model-t.cc.commerce.ondemand.com/medias/sys_master/quotes/hda/ha8/9025898020894/Mo-03-22-10-53-BE8D3CC8-4958-4774-B43B-2DF0E695B813/Mo-03-22-10-53-BE8D3CC8-4958-4774-B43B-2DF0E695B813.jpg",
    ),
  ).toBe("jpg");
  expect(
    getUrlExtension(
      "/sys_master/quotes/hda/ha8/9025898020894/Mo-03-22-10-53-BE8D3CC8-4958-4774-B43B-2DF0E695B813/Mo-03-22-10-53-BE8D3CC8-4958-4774-B43B-2DF0E695B813.jpg",
    ),
  ).toBe("");
  expect(getUrlExtension("Mo-03-22-10-53-BE8D3CC8-4958-4774-B43B-2DF0E695B813.jpg")).toBe("jpg");
  expect(getUrlExtension("Mo-03-22-10-53-BE8D3CC8-4958-4774-B43B-2DF0E695B813.jpgg")).toBe("jpgg");
});

test("isInvalidEmailPresent function should work as expected", () => {
  expect(isInvalidEmailPresent(["a111@gmail.co", "hello@gmail.co.nz", "hello.world@gmail.co.nz"])).toBeFalsy();
  expect(isInvalidEmailPresent(["a111@gmail.co", "hello@gmail.co.nz", "hello.world@gmail.co.nz", "ddd"])).toBeTruthy();
});

test("image name input should be validated properly", () => {
  expect(validateImageName("hello123")).toBe(true);
  expect(validateImageName("first123 last")).toBe(true);
  expect(validateImageName("first last")).toBe(true);
  expect(validateImageName("first!")).toBe(true);
  expect(validateImageName("first last**")).toBe(false);
});
