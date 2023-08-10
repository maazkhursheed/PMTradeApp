import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import JobAccount from "./JobAccount";

const mockStore = configureMockStore();
const store = mockStore({
  jobAccounts: [
    {
      SearchName: "ANDREWS Rename4 testing",
      JobName: "Andrews Rename4",
      JobNumber: "NNDLA004",
      Address1: "Thames",
      Address2: "Thames",
      JobId: "362NNDLA004",
    },
    {
      SearchName: "Andrews Landscaping Limited",
      JobName: "Andrews Landscaping Limited",
      JobNumber: "ANDLA001",
      Address1: "Thames",
      Address2: "Thames",
      JobId: "362ANDLA001",
    },
    {
      SearchName: "Andrews Landscaping Limited",
      JobName: "Andrews Landscaping Limited",
      JobNumber: "ANDLA000",
      Address1: "Thames",
      Address2: "Thames",
      JobId: "362ANDLA000",
    },
  ],
  selectedTradeAccount: {
    branch: {
      address: {
        country: {
          isocode: "NZ",
        },
        id: "8796617342999",
        line2: "73 KOPU RD",
        postalCode: "3500",
        region: {
          isocode: "NZ-BOP",
        },
        town: "Waikato and BOP",
      },
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
  userName: "Shashika",
  email: "shashika.abeysuriya@fbu.com",
  phone: "64272542871",
  branchEmail: "",
  isLoading: false,
  cartCount: 0,
  cartLoading: false,
});

describe("Company edit container UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <SafeAreaProvider>
          <JobAccount />
        </SafeAreaProvider>
      </Provider>,
    )
    .toJSON();
  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });

  it("renders without crashing", () => {
    expect(component).toBeTruthy();
  });
});
