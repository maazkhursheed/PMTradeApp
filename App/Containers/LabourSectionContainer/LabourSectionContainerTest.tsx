import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import LabourSectionContainer from "./LabourSectionContainer";

const mockStore = configureMockStore();
const store = mockStore({
  isLoading: true,
  quoteId: {
    code: "02677091",
    consumerAddress: {
      defaultAddress: false,
      shippingAddress: false,
      visibleInAddressBook: false,
    },
    createdby: "shashika.abeysuriya@fbu.com",
    creationTime: "2022-04-11T04:38:32+0000",
    estimateFlag: false,
    jobAddress: {
      country: {
        isocode: "NZ",
        name: "New Zealand",
      },
      defaultAddress: false,
      firstName: "JobRef",
      formattedAddress: "Auckland Road, St Heliers, Auckland, 1071",
      id: "8861498015767",
      line1: "Auckland Road",
      line2: "St Heliers",
      postalCode: "1071",
      shippingAddress: false,
      town: "Auckland",
      visibleInAddressBook: false,
    },
    jobName: "JobRef",
    markupPercentage: 0,
    markupPrice: {
      currencyIso: "NZD",
      formattedValue: "$0.00",
      value: 0,
    },
    materialPrice: {
      currencyIso: "NZD",
      formattedValue: "$0.00",
      value: 0,
    },
    materialsAddedFlag: false,
    materialsCount: 0,
    mediaFormats: "PDF,JPEG,PNG,MP4,MOV,WMV,docx,gdoc,txt,xlsx,xlsm,xls,pptx,JPG,gslides,Gsheet,Pages,numbers,key,doc,ppt,tiff,zip",
    mediaIncluded: true,
    notes: "Notes",
    otherCostPrice: {
      currencyIso: "NZD",
      formattedValue: "$0.00",
      value: 0,
    },
    otherCostsAddedFlag: false,
    scopeOfWork: "",
    status: "NOTSENT",
    totalPrice: {
      currencyIso: "NZD",
      formattedValue: "$0.00",
      value: 0,
    },
    totalPriceWithTax: {
      currencyIso: "NZD",
      formattedValue: "$0.00",
      value: 0,
    },
    totalTax: {
      currencyIso: "NZD",
      formattedValue: "$0.00",
      value: 0,
    },
    updatedTime: "2022-06-27T06:32:42+0000",
  },
});

describe("Company edit container UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <SafeAreaProvider>
          <LabourSectionContainer />
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
