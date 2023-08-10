import * as R from "ramda";
import {
  isStateForTradeAccountOwnerEmpty,
  tradeListTransform,
  transformTradeList,
  transformTradeListForView,
  updateSelectedTradeAccountFromUserInfo,
} from "~root/Lib/TradeAccountsHelper/index";

export const data = {
  type: "userWsDTO",
  name: "Chris Rook",
  uid: "chris.rook@placemakers.co.nz",
  companies: [
    {
      name: "Hybris Company",
      tradeAccounts: [
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
      ],
      uid: "HYB012008",
    },
    {
      name: "Hybris Company",
      tradeAccounts: [
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
      ],
      uid: "HYB012009",
    },
  ],
  currency: {
    active: false,
    isocode: "NZD",
    name: "New Zeland Dollar",
    symbol: "$",
  },
  displayUid: "chris.rook@placemakers.co.nz",
  isLicenseUpdated: true,
  mobileNumber: "64212613116",
  roles: ["b2bcustomergroup"],
};
export const noCompanyData = {
  type: "userWsDTO",
  name: "Chris Rook",
  uid: "chris.rook@placemakers.co.nz",
  companies: [],
  currency: {
    active: false,
    isocode: "NZD",
    name: "New Zeland Dollar",
    symbol: "$",
  },
  displayUid: "chris.rook@placemakers.co.nz",
  isLicenseUpdated: true,
  mobileNumber: "64212613116",
  roles: ["b2bcustomergroup"],
};
export const noTradeCompany = {
  type: "userWsDTO",
  name: "Chris Rook",
  uid: "chris.rook@placemakers.co.nz",
  companies: [
    {
      name: "Hybris Company",
      tradeAccounts: [],
      uid: "HYB012008",
    },
    {
      name: "Hybris Company",
      tradeAccounts: [],
      uid: "HYB012009",
    },
  ],
  currency: {
    active: false,
    isocode: "NZD",
    name: "New Zeland Dollar",
    symbol: "$",
  },
  displayUid: "chris.rook@placemakers.co.nz",
  isLicenseUpdated: true,
  mobileNumber: "64212613116",
  roles: ["b2bcustomergroup"],
};
test("returns list of branches alongwith their details", () => {
  expect(tradeListTransform(data)).toBeTruthy();
  expect(transformTradeList(noCompanyData)).toHaveLength(0);
  expect(transformTradeList(noTradeCompany)).toHaveLength(0);
});
test("Trade account selection helper function work as expected", () => {
  const state = {
    selected: "1",
    accountID: "",
    branchID: "",
  };
  expect(isStateForTradeAccountOwnerEmpty(state)).toBeTruthy();
  expect(isStateForTradeAccountOwnerEmpty(R.mergeRight(state, { accountID: undefined, branchID: undefined }))).toBeTruthy();
  expect(isStateForTradeAccountOwnerEmpty(R.mergeRight(state, { selected: "2" }))).toBeFalsy();
  expect(isStateForTradeAccountOwnerEmpty(R.mergeRight(state, { accountID: undefined }))).toBeTruthy();
  expect(isStateForTradeAccountOwnerEmpty(R.mergeRight(state, { branchID: undefined }))).toBeTruthy();
  expect(isStateForTradeAccountOwnerEmpty(R.mergeRight(state, { branchID: "123" }))).toBeTruthy();
  expect(isStateForTradeAccountOwnerEmpty(R.mergeRight(state, { accountID: "123" }))).toBeTruthy();
  expect(isStateForTradeAccountOwnerEmpty(R.mergeRight(state, { accountID: "123", branchID: "123" }))).toBeFalsy();
});

test("An object should be returned having title and data, with title being name of branch and data being its details", () => {
  expect(transformTradeList(data)).toBeTruthy();
  expect(transformTradeList(noCompanyData)).toHaveLength(0);
  expect(transformTradeList(noTradeCompany)).toHaveLength(0);
});
test("Branch details should be returned in a list fashion", () => {
  const branchDetails = [
    {
      title: "THAMES",
      data: [
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
      ],
    },
    {
      title: "WESTGATE",
      data: [
        {
          branch: {
            branchCode: "473",
            branchID: "P473",
            branchLegalName: "PLACEMAKERS WESTGATE",
            name: "WESTGATE",
          },
          custId: "AADRA",
          name: "Aa Drainage Limited",
          uid: "473AADRA",
        },
      ],
    },
  ];
  const expectedDetails = [
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
        branchCode: "473",
        branchID: "P473",
        branchLegalName: "PLACEMAKERS WESTGATE",
        name: "WESTGATE",
      },
      custId: "AADRA",
      name: "Aa Drainage Limited",
      uid: "473AADRA",
    },
  ];

  expect(transformTradeListForView(branchDetails)).toStrictEqual(expectedDetails);
});

test("Get updated selected trade account info from userinfo", () => {
  const data = [
    {
      title: "Antigua Street",
      data: [{ custId: "JENCA", masterOnHold: true, name: "Jendon Construction Limited", uid: "150JENCA" }],
    },
    {
      title: "Thames",
      data: [
        { custId: "A1JUN", masterOnHold: true, name: "Arjun Construction Ltd", uid: "362A1JUN" },
        { custId: "TWI7h", masterOnHold: false, name: "Dragos Test", uid: "362TWI7h" },
        { custId: "ARI9F", masterOnHold: false, name: "David Test", uid: "362ARI9F" },
        { custId: "ANTGA", masterOnHold: true, name: "Ants General Contracting", uid: "362ANTGA" },
      ],
    },
    {
      title: "Wanaka",
      data: [{ custId: "BLAAE", masterOnHold: true, name: "A G Blatch Limited", uid: "146BLAAE" }],
    },
  ];

  expect(updateSelectedTradeAccountFromUserInfo("362TWI7h", data)).toEqual({ custId: "TWI7h", masterOnHold: false, name: "Dragos Test", uid: "362TWI7h" });
  expect(updateSelectedTradeAccountFromUserInfo("362ULLOW", data)).toEqual(undefined);
  expect(updateSelectedTradeAccountFromUserInfo("362ULLOW", undefined)).toEqual(undefined);
  expect(updateSelectedTradeAccountFromUserInfo(undefined, data)).toEqual(undefined);
  expect(updateSelectedTradeAccountFromUserInfo(undefined, undefined)).toEqual(undefined);
});
