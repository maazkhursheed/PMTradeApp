import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import RelatedProductsCarousal from "./RelatedProductsCarousal";

const topProducts = [
  {
    SKU: "123123123",
    JobAccountId: "13212312312",
    Brand: "Testing",
    ProductDescription: "Product description",
    login: {},
    Price: "123",
    Image: "https://pimstorageaueuat.blob.core.windows.net/placemakers/media-assets/No-image-found_v2.jpg",
    uomFormat: "1",
  },
  {
    SKU: "123123133",
    JobAccountId: "13212312312",
    Brand: "Testing1",
    ProductDescription: "Product description",
    login: {},
    Price: "123",
    Image: "https://pimstorageauesit.blob.core.windows.net/placemakers/media-assets/1033233_Timber.jpg",
    uomFormat: "1",
  },
  {
    SKU: "123123124",
    JobAccountId: "13212312312",
    Brand: "Testing3",
    ProductDescription: "Product description",
    login: {},
    Price: "123",
    Image: "https://pimstorageauesit.blob.core.windows.net/placemakers/media-assets/1198433_4548816-0024778.jpg",
    uomFormat: "1",
  },
  {
    SKU: "123123125",
    JobAccountId: "13212312312",
    Brand: "Testing4",
    ProductDescription: "Product description",
    login: {},
    Price: "123",
    Image: "https://pimstorageauesit.blob.core.windows.net/placemakers/media-assets/1198560_3540317-0027918.jpg",
    uomFormat: "1",
  },
];

const mockStore = configureMockStore();
const store = mockStore({
  login: {},
  permission: {
    availablePermissions: {
      viewOrderGroup: false,
      placeOrderGroup: false,
      restrictPriceGroup: false,
      accountAdminGroup: true,
      accountOwnerGroup: false,
      viewEstimatesGroup: false,
      tempAccess: false,
      creditLimit: false,
    },
  },
  jobAccounts: { selectedJobAccount: {} },
  connectTrade: { selectedTradeAccount: {} },
  selectedAccountId: "362HADAA",
  digitalId: "auth0|5fb1b8465088f80075cd2192",
  selectedBranch: {
    statusArr: ["Closed", "#CE1141", "5:00 PM"],
    branchName: "Mt Wellington",
    branchAddress: "102 LUNN AVE, Auckland",
    branchDistance: "2.3 Km",
    address: {
      country: {
        isocode: "NZ",
        name: "New Zealand",
      },
      defaultAddress: false,
      email: "p485telesales@placemakers.co.nz",
      formattedAddress: "102 LUNN AVE, Auckland",
      id: "8796093186071",
      line2: "102 LUNN AVE",
      phone: "(09)5708300",
      region: {
        countryIso: "NZ",
        isocode: "NZ-AKL",
        isocodeShort: "AKL",
        name: "Auckland",
      },
      shippingAddress: false,
      town: "Auckland",
      visibleInAddressBook: true,
    },
    branchCode: "485",
    branchID: "P485",
    branchLegalName: "PLACEMAKERS MT WELLINGTON",
    branchRegionalCode: "NZ-AKL",
    features: {},
    formattedDistance: "2.3 Km",
    geoPoint: {
      latitude: -36.889232,
      longitude: 174.83160813,
    },
    isActive: true,
    isBranch: true,
    name: "Mt Wellington",
    openingHours: {
      code: "485-Working Hours",
      specialDayOpeningList: [],
      weekDayOpeningList: [
        {
          closingTime: {
            formattedHour: "17:00",
            hour: 5,
            minute: 0,
          },
          openingTime: {
            formattedHour: "07:00",
            hour: 7,
            minute: 0,
          },
          closed: false,
          weekDay: "Mon",
        },
        {
          closingTime: {
            formattedHour: "17:00",
            hour: 5,
            minute: 0,
          },
          openingTime: {
            formattedHour: "07:00",
            hour: 7,
            minute: 0,
          },
          closed: false,
          weekDay: "Tue",
        },
        {
          closingTime: {
            formattedHour: "17:00",
            hour: 5,
            minute: 0,
          },
          openingTime: {
            formattedHour: "07:00",
            hour: 7,
            minute: 0,
          },
          closed: false,
          weekDay: "Wed",
        },
        {
          closingTime: {
            formattedHour: "17:00",
            hour: 5,
            minute: 0,
          },
          openingTime: {
            formattedHour: "07:00",
            hour: 7,
            minute: 0,
          },
          closed: false,
          weekDay: "Thu",
        },
        {
          closingTime: {
            formattedHour: "17:00",
            hour: 5,
            minute: 0,
          },
          openingTime: {
            formattedHour: "07:00",
            hour: 7,
            minute: 0,
          },
          closed: false,
          weekDay: "Fri",
        },
        {
          closingTime: {
            formattedHour: "16:00",
            hour: 4,
            minute: 0,
          },
          openingTime: {
            formattedHour: "08:00",
            hour: 8,
            minute: 0,
          },
          closed: false,
          weekDay: "Sat",
        },
        {
          closingTime: {
            formattedHour: "16:00",
            hour: 4,
            minute: 0,
          },
          openingTime: {
            formattedHour: "09:00",
            hour: 9,
            minute: 0,
          },
          closed: false,
          weekDay: "Sun",
        },
      ],
    },
    parentBranchID: "P485",
    storeImages: [],
    url: "/store/Mt Wellington?lat=-36.910284&long=174.83088118893605",
  },
});
describe("Related Product Carousal UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <RelatedProductsCarousal />
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
