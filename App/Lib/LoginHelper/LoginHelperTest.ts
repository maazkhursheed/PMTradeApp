import {
  decodeJWTToken,
  extractDigitalIdFromJWTPayload,
  extractEmailFromJWTPayload,
  extractFirstNameFromJWTPayload,
  extractLastNameFromJWTPayload,
  extractPhoneNumberFromJWTPayload,
  extractSignUpFromJWTPayload,
  getFirstTradeAccount,
  getIndexedTradeAccount,
  getParameterFromURL,
  getTradeAccountCount,
  getTradeAccounts,
  hasTradeAccounts,
  isUserNotExistInHybris,
} from "~root/Lib/LoginHelper/index";
import { ExpectedTradeAccount, LoginData, TradeAccountData } from "~root/Lib/SampleResponses";
import { data, noCompanyData, noTradeCompany } from "~root/Lib/TradeAccountsHelper/TradeAccountHelperTest";

test("get token from url should extract correct tokens", () => {
  const url = "fletcherbuilding://placemakers.co.nz?code=U7EdMi-T8Eu5m423&test=1";

  expect(getParameterFromURL(url, "code")).toBe("U7EdMi-T8Eu5m423");
  expect(getParameterFromURL(url, "test")).toBe("1");
});

test("jwt token decoder testing", () => {
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9UbERPRVpDTnpFd1JqazJSRFl5T1VWRFJFTkRSVVF3T1VJeVJFTXdNMEV6TUVZME1qY3hRdyJ9.eyJuaWNrbmFtZSI6InJjLnNoYWl6eSIsIm5hbWUiOiJyYy5zaGFpenlAZ21haWwuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyL2RmZTM3ZTBlY2UwMjU1YzllMTVhOGZhZjA4ODYwNDU0P3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGcmMucG5nIiwidXBkYXRlZF9hdCI6IjIwMTktMDktMjNUMTQ6MDg6MTguNzIzWiIsImVtYWlsIjoicmMuc2hhaXp5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9uemRpc3RyaWJ1dGlvbi1lY29tbWVyY2UtZGV2LmF1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZDg4Y2ZlNTQzOGM5ZDBjNDljMTQ0ZmUiLCJhdWQiOiJUY3ZXWkRoN1V3WWF1bjNxZTg1RTNxeUE5a2dXOW9CaCIsImlhdCI6MTU2OTI0NzcxOSwiZXhwIjoxNTY5MjgzNzE5LCJhY3IiOiJodHRwOi8vc2NoZW1hcy5vcGVuaWQubmV0L3BhcGUvcG9saWNpZXMvMjAwNy8wNi9tdWx0aS1mYWN0b3IiLCJhbXIiOlsibWZhIl19.U1h0mn2ZqdtmO46qcVeDJycZ7sz61FSDIsjb9ZrwkpywwBWmjVUObGoAsak6bwaV1FyIxM9kC2YHIlJDGeAmDvBRB2AszTtvVdYeAx8WYX10iu3Asw2vJs-VHYJuSOO6u2fHakyG5ztn-2Xb1zly-yz9WsOVzHUALYDyMoBG7c1UekvX_wDL84yXfLELJxN_RXIIv8SzVjiBxQ8ZZu-rheFp5RTYr6ViUCcaUQVQ1P1w-L05t6KakW4nfGb1zCnwne29pJC-Xas94qDBVKAg17sknqfLGpGuLGYK70T5F8_Os3MtWRdfGBgev9cuIHgOb-fywV1_B6AjtT2K9RzFWQ";
  expect(decodeJWTToken(token)).toEqual({
    acr: "http://schemas.openid.net/pape/policies/2007/06/multi-factor",
    amr: ["mfa"],
    aud: "TcvWZDh7UwYaun3qe85E3qyA9kgW9oBh",
    email: "rc.shaizy@gmail.com",
    email_verified: false,
    exp: 1569283719,
    iat: 1569247719,
    iss: "https://nzdistribution-ecommerce-dev.au.auth0.com/",
    name: "rc.shaizy@gmail.com",
    nickname: "rc.shaizy",
    picture: "https://s.gravatar.com/avatar/dfe37e0ece0255c9e15a8faf08860454?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Frc.png",
    sub: "auth0|5d88cfe5438c9d0c49c144fe",
    updated_at: "2019-09-23T14:08:18.723Z",
  });
});

test("trade accounts are present or not", () => {
  expect(hasTradeAccounts(data)).toBeTruthy();
  expect(hasTradeAccounts(noTradeCompany)).toBeFalsy();
  expect(hasTradeAccounts(noCompanyData)).toBeFalsy();
});

test("returns count of trade accounts", () => {
  expect(getTradeAccountCount(data)).toBe(2);
  expect(getTradeAccountCount(noCompanyData)).toBe(0);
  expect(getTradeAccountCount(noTradeCompany)).toBe(0);
});

test("returns first account from the list", () => {
  expect(getFirstTradeAccount(data)).toStrictEqual({
    branch: {
      branchCode: "362",
      branchID: "P362",
      branchLegalName: "MCGILL BUILDING SUPPLIES LTD",
      name: "THAMES",
    },
    custId: "HADAA",
    name: "Aaron Haddon Builders Limited",
    uid: "362HADAA",
  });
  expect(getFirstTradeAccount(noTradeCompany)).toBe(undefined);
  expect(getFirstTradeAccount(noCompanyData)).toBe(undefined);
});

test("returns list of trade accounts", () => {
  expect(getTradeAccounts(noCompanyData)).toStrictEqual([]);
  expect(getTradeAccounts(noTradeCompany)).toStrictEqual([]);
  expect(getTradeAccounts(data)).toStrictEqual([
    {
      branch: {
        branchCode: "362",
        branchID: "P362",
        branchLegalName: "MCGILL BUILDING SUPPLIES LTD",
        name: "THAMES",
      },
      custId: "HADAA",
      name: "Aaron Haddon Builders Limited",
      uid: "362HADAA",
    },
    {
      branch: {
        branchCode: "362",
        branchID: "P362",
        branchLegalName: "MCGILL BUILDING SUPPLIES LTD",
        name: "THAMES",
      },
      custId: "A1COR",
      name: "Home and Bach Construction Limited t/a A1 Homes - Coromandel",
      uid: "362A1COR",
    },
  ]);
});

const payload1 = {
  status: 400,
  data: {},
};
const payload2 = {
  status: 200,
  data: {},
};
test("test is user exist in hybris or not", () => {
  expect(isUserNotExistInHybris(payload1)).toBeTruthy();
  expect(isUserNotExistInHybris(payload2)).toBeFalsy();
});

test("extractEmailFromJWTPayload", () => {
  expect(extractEmailFromJWTPayload(LoginData)).toEqual("shashika.abeysuriya@fbu.com");
});

test("extractFirstNameFromJWTPayload", () => {
  expect(extractFirstNameFromJWTPayload(LoginData)).toEqual("shashika");
});

test("extractLastNameFromJWTPayload", () => {
  expect(extractLastNameFromJWTPayload(LoginData)).toEqual("Abeysuriya");
});

test("extractSignUpFromJWTPayload", () => {
  expect(extractSignUpFromJWTPayload(LoginData)).toBeFalsy();
});

test("extractPhoneNumberFromJWTPayload", () => {
  expect(extractPhoneNumberFromJWTPayload(LoginData)).toEqual("+64272542871");
});

test("extractDigitalIdFromJWTPayload", () => {
  expect(extractDigitalIdFromJWTPayload(LoginData)).toEqual("auth0|5fb1b9056dd905006f719129");
});

test("getIndexedTradeAccount", () => {
  expect(getIndexedTradeAccount(0, TradeAccountData)).toStrictEqual(ExpectedTradeAccount);
});
