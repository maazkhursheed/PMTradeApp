import { ActionsObservable, StateObservable } from "redux-observable";
import { of, Subject } from "rxjs";
import { combineAll, map } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { epicGetDeliveryRequirements, epicSwapCartProduct, epicUserCartRequest } from "~root/Epics/CartEpics";
import { RootState } from "~root/Reducers";
import { CartActions } from "~root/Reducers/CartReducer";
import Api from "~root/Services/Api";

const token = "";
const aceToken = "";
const auth0Token = "";
const email = "";

const rootState = {
  address: { addressSuggestions: [], fetchingAddress: false, fetching: false },
  nav: {
    key: "StackRouterRoot",
    isTransitioning: false,
    index: 0,
    routes: [
      {
        routes: [
          {
            key: "OrderDeliveries",
            isTransitioning: false,
            index: 0,
            routes: [{ routeName: "Main", key: "id-1615204630947-26" }],
            routeName: "OrderDeliveries",
          },
          {
            key: "MyLists",
            isTransitioning: false,
            index: 0,
            routes: [{ routeName: "MyLists", key: "MyLists" }],
            routeName: "MyLists",
          },
          {
            key: "Express",
            isTransitioning: false,
            index: 0,
            routes: [{ routeName: "LandingPage", key: "id-1615204630947-27" }],
            routeName: "Express",
          },
          {
            key: "ManageTeam",
            isTransitioning: false,
            index: 0,
            routes: [{ routeName: "Main", key: "id-1615204630947-28" }],
            routeName: "ManageTeam",
          },
          {
            key: "CartView",
            isTransitioning: false,
            index: 0,
            routes: [{ routeName: "Main", key: "id-1615204630947-29" }],
            routeName: "CartView",
          },
        ],
        index: 0,
        routeName: "Dashboard",
        key: "id-1615204630947-38",
      },
    ],
  },
  login: {
    userData: {
      type: "userWsDTO",
      name: "prasad",
      uid: "prasad.manakattil@fbu.com",
      cimSubscriberKey: "003O000001PZESJIA5",
      companies: [
        {
          addresses: [{ id: "8800495042583" }],
          name: "A ESTATE SOLUTIONS LIMITED",
          tradeAccounts: [
            {
              branch: {
                branchCode: "362",
                branchID: "P362",
                branchLegalName: "Mcgill Building Supplies Ltd",
                name: "Thames",
              },
              custId: "ANTGA",
              masterOnHold: false,
              name: "Ants General Contracting",
              uid: "362ANTGA",
            },
          ],
          uid: "CIM-04160",
        },
        {
          addresses: [{ id: "8800275496983" }],
          name: "Andrews Landscaping Limited",
          tradeAccounts: [
            {
              branch: {
                branchCode: "362",
                branchID: "P362",
                branchLegalName: "Mcgill Building Supplies Ltd",
                name: "Thames",
              },
              custId: "ADITA",
              masterOnHold: false,
              name: "Andrews Landscaping Limited",
              uid: "362ADITA",
            },
          ],
          uid: "CIM-158540",
        },
        {
          addresses: [{ id: "8805956222999" }],
          name: "Arjun Construction Ltd",
          tradeAccounts: [
            {
              branch: {
                branchCode: "362",
                branchID: "P362",
                branchLegalName: "Mcgill Building Supplies Ltd",
                name: "Thames",
              },
              custId: "A1JUN",
              masterOnHold: false,
              name: "Arjun Construction Ltd",
              uid: "362A1JUN",
            },
            {
              branch: {
                branchCode: "362",
                branchID: "P362",
                branchLegalName: "Mcgill Building Supplies Ltd",
                name: "Thames",
              },
              custId: "TWI7h",
              masterOnHold: false,
              name: "Dragos Test",
              uid: "362TWI7h",
            },
          ],
          uid: "CIM-158621",
        },
        {
          addresses: [{ id: "8800375144471" }],
          name: "Aa Drainage Limited",
          uid: "CIM-06992",
        },
        {
          addresses: [{ id: "8799063736343" }],
          name: "4 SITE BUILDERS LIMITED",
          tradeAccounts: [],
          uid: "CIM-04954",
        },
        {
          addresses: [{ id: "8804420517911" }],
          name: "Ace Plumbing And Drainage Limited",
          uid: "CIM-107955",
        },
        {
          addresses: [{ id: "8804540612631" }],
          tradeAccounts: [
            {
              branch: {
                branchCode: "362",
                branchID: "P362",
                branchLegalName: "Mcgill Building Supplies Ltd",
                name: "Thames",
              },
              custId: "ADARA",
              masterOnHold: false,
              name: "Ronald Adams",
              uid: "362ADARA",
            },
          ],
          uid: "CIM-158567",
        },
        {
          addresses: [{ id: "8799082020887" }],
          name: "ANDREWS LANDSCAPING LIMITED",
          tradeAccounts: [
            {
              branch: {
                branchCode: "362",
                branchID: "P362",
                branchLegalName: "Mcgill Building Supplies Ltd",
                name: "Thames",
              },
              custId: "ANDLA",
              masterOnHold: false,
              name: "Andrews Landscaping Limited",
              uid: "362ANDLA",
            },
          ],
          uid: "CIM-04628",
        },
        {
          addresses: [{ id: "8800323436567" }],
          name: "A G BLATCH LIMITED",
          tradeAccounts: [
            {
              branch: {
                branchCode: "146",
                branchID: "P146",
                branchLegalName: "Davis And Casey Building Supplies",
                name: "Wanaka",
              },
              custId: "BLAAE",
              masterOnHold: false,
              name: "A G Blatch Limited",
              uid: "146BLAAE",
            },
          ],
          uid: "CIM-07015",
        },
        {
          addresses: [{ id: "8805956648983" }],
          name: "Newac Ltd.",
          tradeAccounts: [
            {
              branch: {
                branchCode: "473",
                branchID: "P473",
                branchLegalName: "Placemakers Westgate",
                name: "Westgate",
              },
              custId: "NEWAC",
              masterOnHold: false,
              name: "Newac Ltd.",
              uid: "473NEWAC",
            },
          ],
          uid: "CIM-158638",
        },
      ],
      currency: {
        active: false,
        isocode: "NZD",
        name: "New Zeland Dollar",
        symbol: "$",
      },
      displayUid: "prasad.manakattil@fbu.com",
      isLicenseUpdated: true,
      mobileNumber: "64211859189",
      roles: ["b2bcustomergroup"],
    },
    fetching: false,
    checkingLogin: false,
    tempToken: {
      accessToken:
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVVkdRMEpGT0RaQ05qVXhOVGxHTUVFM1JESXdRakkzUlVWRE5qTXhSa1pHUVRjeFJVTTJSZyJ9.eyJodHRwczovL2Vjb21tZXJjZS5wbGFjZW1ha2Vycy5jby5uei9lbWFpbCI6InByYXNhZC5tYW5ha2F0dGlsQGZidS5jb20iLCJodHRwczovL2Vjb21tZXJjZS5wbGFjZW1ha2Vycy5jby5uei9mcm9tU2lnbnVwIjpmYWxzZSwiaHR0cHM6Ly9lY29tbWVyY2UucGxhY2VtYWtlcnMuY28ubnovcGhvbmVOdW1iZXIiOiIrNjQyMTE4NTkxODkiLCJodHRwczovL2Vjb21tZXJjZS5wbGFjZW1ha2Vycy5jby5uei9zdXJuYW1lIjoibWFuYWthdHRpbCIsImh0dHBzOi8vZWNvbW1lcmNlLnBsYWNlbWFrZXJzLmNvLm56L2ZpcnN0TmFtZSI6InByYXNhZCIsImh0dHBzOi8vZWNvbW1lcmNlLnBsYWNlbWFrZXJzLmNvLm56L3RyYWRlQWNjb3VudHMiOnsidHJhZGVBY2NvdW50cyI6W3siYnJhbmNoQ29kZSI6IjM2MiIsImN1c3RJZCI6IkFOVEdBIiwidWlkIjoiMzYyQU5UR0EifSx7ImJyYW5jaENvZGUiOiIzNjIiLCJjdXN0SWQiOiJBRElUQSIsInVpZCI6IjM2MkFESVRBIn0seyJicmFuY2hDb2RlIjoiMzYyIiwiY3VzdElkIjoiQTFKVU4iLCJ1aWQiOiIzNjJBMUpVTiJ9LHsiYnJhbmNoQ29kZSI6IjM2MiIsImN1c3RJZCI6IlRXSTdoIiwidWlkIjoiMzYyVFdJN2gifSx7ImJyYW5jaENvZGUiOiI0NzMiLCJjdXN0SWQiOiJBQURSQSIsInVpZCI6IjQ3M0FBRFJBIn0seyJicmFuY2hDb2RlIjoiMzYyIiwiY3VzdElkIjoiNFNJQUEiLCJ1aWQiOiIzNjI0U0lBQSJ9LHsiYnJhbmNoQ29kZSI6IjQ5MSIsInVpZCI6IjQ5MUFDRVBMIn0seyJicmFuY2hDb2RlIjoiMzYyIiwiY3VzdElkIjoiQURBUkEiLCJ1aWQiOiIzNjJBREFSQSJ9LHsiYnJhbmNoQ29kZSI6IjM2MiIsImN1c3RJZCI6IkFORExBIiwidWlkIjoiMzYyQU5ETEEifSx7ImJyYW5jaENvZGUiOiIxNDYiLCJjdXN0SWQiOiJCTEFBRSIsInVpZCI6IjE0NkJMQUFFIn0seyJicmFuY2hDb2RlIjoiMTg3IiwiY3VzdElkIjoiQkxBQUUiLCJ1aWQiOiIxODdCTEFBRSJ9LHsiYnJhbmNoQ29kZSI6IjQ3MyIsImN1c3RJZCI6Ik5FV0FDIiwidWlkIjoiNDczTkVXQUMifV19LCJpc3MiOiJodHRwczovL3RzdC1hdXRoLnBsYWNlbWFrZXJzLmNvLm56LyIsInN1YiI6ImF1dGgwfDVlYWE5N2JjYTk5YTk4MGMwMGZlODFmOSIsImF1ZCI6WyJodHRwczovL3Rlc3QtYXBpc2VydmljZXMuZmJuemQuY28ubnovYXBpIiwiaHR0cHM6Ly9uemRpc3RyaWJ1dGlvbi1lY29tbWVyY2UtdHN0LmF1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2MTUyMDQ2MzQsImV4cCI6MTYxNTI5MTAzNCwiYXpwIjoiQmdXbGVGa09MdmI0eUZHQnBZbE9DQTV3czNFVWczVUIiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG9mZmxpbmVfYWNjZXNzIn0.pilduuiyT-nvx9AS3C4Uj0BFQDR3oeVFQ2ykvYezBMLUCpzSHJW4wXOvWFiO-0LvryW87-zYSlm7xYsFDche39Zkr48mKXJsxG24VVX-W8YlzYmgTa8z1w9E2Qw5N4AXSuwSS08nLBloCU4rRaKspHtyZ8_tJhWs0IHlpGtP6kqlcbiTmMK9SGlli8q5q1chc5tsI63kKi81gbi4tx7L97-QRp6Ne44zE4ILxMciBH-wVOwCjsyH1NoqQ00oZuKQzRy0aLkNhVHlZGHJrEToTcLALKH7vhTfGsSAA5m5oO0ZAhE5FaL6yIEZIQQ_7wSYPBb8kMJBQSCCpmfNnA0YQw",
      idToken:
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVVkdRMEpGT0RaQ05qVXhOVGxHTUVFM1JESXdRakkzUlVWRE5qTXhSa1pHUVRjeFJVTTJSZyJ9.eyJodHRwczovL2Vjb21tZXJjZS5wbGFjZW1ha2Vycy5jby5uei9lbWFpbCI6InByYXNhZC5tYW5ha2F0dGlsQGZidS5jb20iLCJodHRwczovL2Vjb21tZXJjZS5wbGFjZW1ha2Vycy5jby5uei9mcm9tU2lnbnVwIjpmYWxzZSwiaHR0cHM6Ly9lY29tbWVyY2UucGxhY2VtYWtlcnMuY28ubnovcGhvbmVOdW1iZXIiOiIrNjQyMTE4NTkxODkiLCJodHRwczovL2Vjb21tZXJjZS5wbGFjZW1ha2Vycy5jby5uei9zdXJuYW1lIjoibWFuYWthdHRpbCIsImh0dHBzOi8vZWNvbW1lcmNlLnBsYWNlbWFrZXJzLmNvLm56L2ZpcnN0TmFtZSI6InByYXNhZCIsImh0dHBzOi8vZWNvbW1lcmNlLnBsYWNlbWFrZXJzLmNvLm56L3RyYWRlQWNjb3VudHMiOnsidHJhZGVBY2NvdW50cyI6W3siYnJhbmNoQ29kZSI6IjM2MiIsImN1c3RJZCI6IkFOVEdBIiwidWlkIjoiMzYyQU5UR0EifSx7ImJyYW5jaENvZGUiOiIzNjIiLCJjdXN0SWQiOiJBRElUQSIsInVpZCI6IjM2MkFESVRBIn0seyJicmFuY2hDb2RlIjoiMzYyIiwiY3VzdElkIjoiQTFKVU4iLCJ1aWQiOiIzNjJBMUpVTiJ9LHsiYnJhbmNoQ29kZSI6IjM2MiIsImN1c3RJZCI6IlRXSTdoIiwidWlkIjoiMzYyVFdJN2gifSx7ImJyYW5jaENvZGUiOiI0NzMiLCJjdXN0SWQiOiJBQURSQSIsInVpZCI6IjQ3M0FBRFJBIn0seyJicmFuY2hDb2RlIjoiMzYyIiwiY3VzdElkIjoiNFNJQUEiLCJ1aWQiOiIzNjI0U0lBQSJ9LHsiYnJhbmNoQ29kZSI6IjQ5MSIsInVpZCI6IjQ5MUFDRVBMIn0seyJicmFuY2hDb2RlIjoiMzYyIiwiY3VzdElkIjoiQURBUkEiLCJ1aWQiOiIzNjJBREFSQSJ9LHsiYnJhbmNoQ29kZSI6IjM2MiIsImN1c3RJZCI6IkFORExBIiwidWlkIjoiMzYyQU5ETEEifSx7ImJyYW5jaENvZGUiOiIxNDYiLCJjdXN0SWQiOiJCTEFBRSIsInVpZCI6IjE0NkJMQUFFIn0seyJicmFuY2hDb2RlIjoiMTg3IiwiY3VzdElkIjoiQkxBQUUiLCJ1aWQiOiIxODdCTEFBRSJ9LHsiYnJhbmNoQ29kZSI6IjQ3MyIsImN1c3RJZCI6Ik5FV0FDIiwidWlkIjoiNDczTkVXQUMifV19LCJnaXZlbl9uYW1lIjoicHJhc2FkIiwiZmFtaWx5X25hbWUiOiJtYW5ha2F0dGlsIiwibmlja25hbWUiOiJwcmFzYWQubWFuYWthdHRpbCIsIm5hbWUiOiJwcmFzYWQubWFuYWthdHRpbEBmYnUuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzI5ZmFiMTE3Y2M5N2M2Zjg2MWM3OWI1MmJjY2QwZWM4P3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGcHIucG5nIiwidXBkYXRlZF9hdCI6IjIwMjEtMDMtMDhUMDM6MTY6MjQuNTM0WiIsImVtYWlsIjoicHJhc2FkLm1hbmFrYXR0aWxAZmJ1LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly90c3QtYXV0aC5wbGFjZW1ha2Vycy5jby5uei8iLCJzdWIiOiJhdXRoMHw1ZWFhOTdiY2E5OWE5ODBjMDBmZTgxZjkiLCJhdWQiOiJCZ1dsZUZrT0x2YjR5RkdCcFlsT0NBNXdzM0VVZzNVQiIsImlhdCI6MTYxNTIwNDYzNCwiZXhwIjoxNjE1MjQwNjM0fQ.JpMZhsoes58bI2p4rmXim9NKKddWrfvgwzJYkiD8bEW10wlncx5-Wu5U_fVPnG_29OZk70Xb3551iZ8m6sokQZHja06B6lfWCH4Zo-3T-zVo6-KNiJn0jrh33mz89ZrKziJL0lPWQ8piY7sRO4ePFcChwSPzPXJ2uo91dfVP0gEq_sEb8pcY9d-LEIUq0H70CTD9Pqp5i9KIm5lh6BRkV3naADfCPwrDzYy1-0MEw_4eN8ekDjQZKTb-REMLr-yelSSxzJEfLSOmJ8xfsoOcka8U2w44esRWh5x2FT7oO6gaHbEGNaTJ8IbUAC9bX3jqznQ44TWQrcvrrJ-6c_tthQ",
      scope: "openid profile email offline_access",
      expiresIn: 86400,
      tokenType: "Bearer",
    },
  },
  notification: { token: "", landedOnScreen: true, isFromNotification: false },
  connectTrade: {
    fetching: false,
    dataFiltered: [],
    selectedTradeAccount: {
      branch: {
        branchCode: "362",
        branchID: "P362",
        branchLegalName: "Mcgill Building Supplies Ltd",
        name: "Thames",
      },
      custId: "ANTGA",
      masterOnHold: false,
      name: "Ants General Contracting",
      uid: "362ANTGA",
    },
    dataTradeListUserInfo: [
      {
        title: "Thames",
        data: [
          {
            branch: {
              branchCode: "362",
              branchID: "P362",
              branchLegalName: "Mcgill Building Supplies Ltd",
              name: "Thames",
            },
            custId: "ANTGA",
            masterOnHold: false,
            name: "Ants General Contracting",
            uid: "362ANTGA",
          },
          {
            branch: {
              branchCode: "362",
              branchID: "P362",
              branchLegalName: "Mcgill Building Supplies Ltd",
              name: "Thames",
            },
            custId: "ADITA",
            masterOnHold: false,
            name: "Andrews Landscaping Limited",
            uid: "362ADITA",
          },
          {
            branch: {
              branchCode: "362",
              branchID: "P362",
              branchLegalName: "Mcgill Building Supplies Ltd",
              name: "Thames",
            },
            custId: "A1JUN",
            masterOnHold: false,
            name: "Arjun Construction Ltd",
            uid: "362A1JUN",
          },
          {
            branch: {
              branchCode: "362",
              branchID: "P362",
              branchLegalName: "Mcgill Building Supplies Ltd",
              name: "Thames",
            },
            custId: "TWI7h",
            masterOnHold: false,
            name: "Dragos Test",
            uid: "362TWI7h",
          },
          {
            branch: {
              branchCode: "362",
              branchID: "P362",
              branchLegalName: "Mcgill Building Supplies Ltd",
              name: "Thames",
            },
            custId: "ADARA",
            masterOnHold: false,
            name: "Ronald Adams",
            uid: "362ADARA",
          },
          {
            branch: {
              branchCode: "362",
              branchID: "P362",
              branchLegalName: "Mcgill Building Supplies Ltd",
              name: "Thames",
            },
            custId: "ANDLA",
            masterOnHold: false,
            name: "Andrews Landscaping Limited",
            uid: "362ANDLA",
          },
        ],
      },
      {
        title: "Wanaka",
        data: [
          {
            branch: {
              branchCode: "146",
              branchID: "P146",
              branchLegalName: "Davis And Casey Building Supplies",
              name: "Wanaka",
            },
            custId: "BLAAE",
            masterOnHold: false,
            name: "A G Blatch Limited",
            uid: "146BLAAE",
          },
        ],
      },
      {
        title: "Westgate",
        data: [
          {
            branch: {
              branchCode: "473",
              branchID: "P473",
              branchLegalName: "Placemakers Westgate",
              name: "Westgate",
            },
            custId: "NEWAC",
            masterOnHold: false,
            name: "Newac Ltd.",
            uid: "473NEWAC",
          },
        ],
      },
    ],
    searchTerm: "",
    filteredAccounts: [
      {
        title: "Thames",
        data: [
          {
            branch: {
              branchCode: "362",
              branchID: "P362",
              branchLegalName: "Mcgill Building Supplies Ltd",
              name: "Thames",
            },
            custId: "ANTGA",
            masterOnHold: false,
            name: "Ants General Contracting",
            uid: "362ANTGA",
          },
          {
            branch: {
              branchCode: "362",
              branchID: "P362",
              branchLegalName: "Mcgill Building Supplies Ltd",
              name: "Thames",
            },
            custId: "ADITA",
            masterOnHold: false,
            name: "Andrews Landscaping Limited",
            uid: "362ADITA",
          },
          {
            branch: {
              branchCode: "362",
              branchID: "P362",
              branchLegalName: "Mcgill Building Supplies Ltd",
              name: "Thames",
            },
            custId: "A1JUN",
            masterOnHold: false,
            name: "Arjun Construction Ltd",
            uid: "362A1JUN",
          },
          {
            branch: {
              branchCode: "362",
              branchID: "P362",
              branchLegalName: "Mcgill Building Supplies Ltd",
              name: "Thames",
            },
            custId: "TWI7h",
            masterOnHold: false,
            name: "Dragos Test",
            uid: "362TWI7h",
          },
          {
            branch: {
              branchCode: "362",
              branchID: "P362",
              branchLegalName: "Mcgill Building Supplies Ltd",
              name: "Thames",
            },
            custId: "ADARA",
            masterOnHold: false,
            name: "Ronald Adams",
            uid: "362ADARA",
          },
          {
            branch: {
              branchCode: "362",
              branchID: "P362",
              branchLegalName: "Mcgill Building Supplies Ltd",
              name: "Thames",
            },
            custId: "ANDLA",
            masterOnHold: false,
            name: "Andrews Landscaping Limited",
            uid: "362ANDLA",
          },
        ],
      },
      {
        title: "Wanaka",
        data: [
          {
            branch: {
              branchCode: "146",
              branchID: "P146",
              branchLegalName: "Davis And Casey Building Supplies",
              name: "Wanaka",
            },
            custId: "BLAAE",
            masterOnHold: false,
            name: "A G Blatch Limited",
            uid: "146BLAAE",
          },
        ],
      },
      {
        title: "Westgate",
        data: [
          {
            branch: {
              branchCode: "473",
              branchID: "P473",
              branchLegalName: "Placemakers Westgate",
              name: "Westgate",
            },
            custId: "NEWAC",
            masterOnHold: false,
            name: "Newac Ltd.",
            uid: "473NEWAC",
          },
        ],
      },
    ],
    dataTemporaryAccess: { temporaryAccess: false, endDate: "-" },
    linkableConnectAccountsCount: 0,
  },
  jobAccounts: {
    fetching: false,
    error: false,
    data: [
      {
        SearchName: "ANTS GENERAL002",
        JobName: "Ants General Contracting2",
        JobNumber: "ANTGA002",
        Address1: "Tairua",
        Address2: "Tairua",
      },
      {
        SearchName: "ANTS Job0",
        JobName: "Ants General Job0",
        JobNumber: "ANTGA000",
        Address1: "Tairua",
        Address2: "Tairua",
      },
      {
        SearchName: "ANTS GENERAL001",
        JobName: "Ants General Contracting1",
        JobNumber: "ANTGA001",
        Address1: "Tairua",
        Address2: "Tairua",
      },
    ],
  },
  cart: {
    userCart: {
      code: "012345",
    },
  },
};

describe("Cart Epics", () => {
  const api = Api.create;

  beforeEach(() => {
    api.hybris.setAuthorization(token, aceToken, auth0Token, email);
  });

  test("call success type when call user cart", done => {
    const requestAction = CartActions.requestUserCart();
    const action$ = ActionsObservable.of(requestAction);

    epicUserCartRequest(action$, new StateObservable<RootState>(new Subject<RootState>(), rootState), { api })
      .pipe(
        map(value => of(value)),
        combineAll(),
      )
      .subscribe(actionReceived => {
        expect(actionReceived[0].type).toBe(getType(CartActions.userCartSuccess));
        expect(actionReceived[1].type).toBe(getType(CartActions.requestUserCartDetail));
        done();
      });
  });

  test("call success type when call get delivery requirements", done => {
    const requestAction = CartActions.requestDeliveryRequirements();
    const action$ = ActionsObservable.of(requestAction);

    epicGetDeliveryRequirements(action$, new StateObservable<RootState>(new Subject<RootState>(), rootState), { api })
      .pipe(
        map(value => of(value)),
        combineAll(),
      )
      .subscribe(actionReceived => {
        expect(actionReceived[0].type).toBe(getType(CartActions.deliveryRequirementsSuccess));
        done();
      });
  });

  test("call success type when swap alternate prodcut in cart", done => {
    const requestAction = CartActions.swapCartProduct();
    const action$ = ActionsObservable.of(requestAction);

    epicSwapCartProduct(action$, new StateObservable<RootState>(new Subject<RootState>(), rootState), { api })
      .pipe(
        map(value => of(value)),
        combineAll(),
      )
      .subscribe(actionReceived => {
        expect(actionReceived[0].type).toBe(getType(CartActions.swapCartProductSuccess));
        done();
      });
  });
});
