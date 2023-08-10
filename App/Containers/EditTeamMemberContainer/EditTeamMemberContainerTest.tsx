import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import EditTeamMemberContainer from "./EditTeamMemberContainer";

const mockStore = configureMockStore();
const store = mockStore({
  showDatePicker: false,
  isStartDateClicked: false,
  deleteModal: false,
  name: "Kate Bell",
  phone: "6445677786898",
  nameError: undefined,
  phoneError: undefined,
  alertTitle: "",
  alertContent: undefined,
  alertBtn: [],
  viewAlert: false,
  permissionState: "",
  contactsAllowed: true,
  digitalId: "",
  userData: "",
  selectedAccountId: "",
  selectedBranch: "",
  IPermissionState: {
    startDate: "2022-10-07T05:33:39.074Z",
    endDate: undefined,
    dateError: undefined,
    creditLimit: "",
    creditError: undefined,
    isAdmin: false,
    switches: { viewOrderGroup: "locked", restrictPriceGroup: "on", placeOrderGroup: "on", viewEstimatesGroup: "on", tempAccess: "off", creditLimit: "off" },
  },
  memberInfo: {
    response: {
      inviteStatus: "INVITE_SENT",
      invitedBy: "shashika.abeysuriya@fbu.com",
      invitedByName: "Shashika",
      invitedOn: "2022-10-07T05:06:21+0000",
      mobileNumber: "6445677786898",
      name: "Kate Bell",
      permissionList: [
        {
          name: "View Orders group",
          uid: "viewOrderGroup",
        },
        {
          name: "Place Order User Group",
          uid: "placeOrderGroup",
        },
        {
          name: "Restrict Price Group",
          uid: "restrictPriceGroup",
        },
        {
          name: "View Estimates group",
          uid: "viewEstimatesGroup",
        },
        {
          name: "Quotes group",
          uid: "quotesGroup",
        },
      ],
      selectedTradeAccount: "362ANDLA",
      temporaryAccess: false,
      userType: "TEAMMEMEBER",
    },
    name: "Kate Bell",
    phone: "6445677786898",
    status: "INVITE_SENT",
    invitedOn: "2022-10-07T05:06:21+0000",
    invitedBy: "shashika.abeysuriya@fbu.com",
    invitedByName: "Shashika",
  },
});

describe("Company edit container UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <SafeAreaProvider>
          <EditTeamMemberContainer />
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
