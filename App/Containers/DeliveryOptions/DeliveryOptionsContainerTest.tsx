import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import DeliveryOptionsContainer from "./DeliveryOptionsContainer";

const mockStore = configureMockStore();
const store = mockStore({
  selectedBranch: {
    statusArr: ["Open", "#02B382", "5:00 PM"],
    branchName: "Thames",
    branchAddress: "73 KOPU RD, Waikato and BOP, 3500",
    branchDistance: "10,464.2 Km",
    address: {
      country: {
        isocode: "NZ",
        name: "New Zealand",
      },
      defaultAddress: false,
      email: "testthamesorders@placemakers.co.nz",
      formattedAddress: "73 KOPU RD, Waikato and BOP, 3500",
      id: "8796617342999",
      line2: "73 KOPU RD",
      phone: "(07)868-0130",
      postalCode: "3500",
      region: {
        countryIso: "NZ",
        isocode: "NZ-BOP",
        isocodeShort: "BOP",
        name: "Bay of Plenty",
      },
      shippingAddress: false,
      town: "Waikato and BOP",
      visibleInAddressBook: true,
    },
    branchCode: "362",
    branchID: "P362",
    branchLegalName: "MCGILL BUILDING SUPPLIES LTD",
    branchRegionalCode: "NZ-BOP",
    features: {},
    formattedDistance: "10,464.2 Km",
    geoPoint: {
      latitude: -37.1882934,
      longitude: 175.55693826,
    },
    isActive: true,
    isBranch: true,
    name: "Thames",
    openingHours: {
      code: "362-Working Hours",
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
            hour: 0,
            minute: 0,
          },
          openingTime: {
            hour: 0,
            minute: 0,
          },
          closed: false,
          weekDay: "Sat",
        },
        {
          closingTime: {
            hour: 0,
            minute: 0,
          },
          openingTime: {
            hour: 0,
            minute: 0,
          },
          closed: false,
          weekDay: "Sun",
        },
      ],
    },
    parentBranchID: "P362",
    storeImages: [],
  },
  eligibility: [
    {
      deliveryType: "Delivery",
      earliestDate: "2022-10-26",
    },
    {
      deliveryType: "Courier",
      earliestTime: "NOT AVAILABLE FOR THIS ORDER",
      eligibleToOrder: false,
    },
    {
      deliveryType: "PickUp",
      earliestDate: "2022-10-26",
      earliestTime: "08:00 AM",
    },
  ],
  // myBranches: state.branchList.dataDepots,
  contacts: [8851045142055],
  orderType: "",
  isFetchingCart: true,
  isDeletingContact: true || false,
  existingData: [
    {
      DSP: "Specific Time 19:16",
      PDONumber: "1531834-1",
      address: {
        addressLine1: "810 Great South Road",
        addressLine2: "",
        postCode: "1061",
        suburb: "Penrose",
        town: "Auckland",
      },
      deliveryDate: "0001-01-01T00:00:00",
      deliveryType: "Standard Delivery",
      orderNumber: "1531834",
      packNumber: "",
      requestDate: "2022-10-21T00:00:00",
    },
  ],
  digitalId: "",
  selectedAccountId: "362ANDLA",
  selectedAddress: undefined,
  cartDetail: {
    type: "cartWsDTO",
    appliedOrderPromotions: [],
    appliedProductPromotions: [],
    appliedVouchers: [],
    calculated: true,
    code: "03452000",
    deliveryAddress: {
      country: {
        isocode: "NZ",
        name: "New Zealand",
      },
      defaultAddress: false,
      formattedAddress: "810 Great South Road,  Penrose,  Auckland,  1061",
      id: "8880700030999",
      line1: "810 Great South Road",
      line2: " Penrose",
      postalCode: " 1061",
      shippingAddress: true,
      town: " Auckland",
      visibleInAddressBook: true,
    },
    deliveryCost: {
      currencyIso: "NZD",
      formattedValue: "$86.00",
      priceType: "BUY",
      value: 86,
    },
    deliveryItemsQuantity: 1,
    deliveryMode: {
      code: "standard-delivery",
      deliveryCost: {
        currencyIso: "NZD",
        formattedValue: "$86.00",
        priceType: "BUY",
        value: 86,
      },
      name: "Delivery",
    },
    deliveryOrderGroups: [
      {
        entries: [
          {
            availableForPickup: true,
            basePrice: {
              currencyIso: "NZD",
              formattedValue: "$6.14",
              priceType: "BUY",
              value: 6.14,
            },
            configurationInfos: [],
            customProductFlag: false,
            decimalQty: 1,
            deliveryOrder: true,
            entryNumber: 0,
            estimateProductStock: 0,
            product: {
              appUomFormat: "7.2",
              availableForPickup: true,
              baseOptions: [],
              categories: [
                {
                  code: "AB01DA",
                  name: "Sg8 H1.2 Rad PG Kd Scantlings 75Mm-100Mm",
                  url: "/timber-panels/structural-grade-timber-kiln-dried/sg-h12-radiata-kd/sg8-h12-rad-pg-kd-scantlings-75mm-100mm/c/AB01DA",
                },
              ],
              code: "1015262",
              configurable: true,
              display: "PURCHASABLE",
              expressOrder: false,
              hasNoQuantity: 0,
              name: "100 X 50 (90X45) RAD SG8 H1.2 PLANER GAUGED KD 6.0M",
              pmExclusive: true,
              price: {
                currencyIso: "NZD",
                formattedValue: "$6.14",
                priceType: "BUY",
                value: 6.14,
              },
              purchasable: true,
              retailPrice: {
                currencyIso: "NZD",
                formattedValue: "$8.60",
                priceType: "BUY",
                value: 8.6,
              },
              retailPriceGstInclusive: {
                currencyIso: "NZD",
                formattedValue: "$9.89",
                priceType: "BUY",
                value: 9.89,
              },
              sellOrderMultiple: 6,
              specialProdWithAlphaSkuFlag: false,
              specialProduct: false,
              stock: {
                isValueRounded: false,
                pmStockQuantity: "0",
                statusCode: "3",
                stockLevelStatus: "outOfStock",
              },
              timberProductFlag: true,
              unitCode: "LM",
              uomFormat: "7.2",
              url: "/timber-panels/structural-grade-timber-kiln-dried/sg-h12-radiata-kd/sg8-h12-rad-pg-kd-scantlings-75mm-100mm/100-x-50-90x45-rad-sg8-h12-planer-gauged-kd-60m/p/1015262",
            },
            quantity: 1,
            retailPrice: {
              currencyIso: "NZD",
              formattedValue: "$0.00",
              priceType: "BUY",
              value: 0,
            },
            selectedConfiguration: [
              {
                price: "36.84",
                quantity: "1",
                size: "6.0",
              },
            ],
            totalPrice: {
              currencyIso: "NZD",
              formattedValue: "$36.84",
              priceType: "BUY",
              value: 36.84,
            },
            totalSize: "6.00",
            unit: "LM",
            updateable: true,
          },
        ],
        totalPriceWithTax: {
          currencyIso: "NZD",
          formattedValue: "$42.37",
          priceType: "BUY",
          value: 42.370000000000005,
        },
      },
    ],
    deliveryPOS: {
      address: {
        country: {
          isocode: "NZ",
          name: "New Zealand",
        },
        defaultAddress: false,
        email: "testthamesorders@placemakers.co.nz",
        formattedAddress: "73 KOPU RD, Waikato and BOP, 3500",
        id: "8796617342999",
        line2: "73 KOPU RD",
        phone: "(07)868-0130",
        postalCode: "3500",
        region: {
          countryIso: "NZ",
          isocode: "NZ-BOP",
          isocodeShort: "BOP",
          name: "Bay of Plenty",
        },
        shippingAddress: false,
        town: "Waikato and BOP",
        visibleInAddressBook: true,
      },
      branchCode: "362",
      branchID: "P362",
      branchLegalName: "MCGILL BUILDING SUPPLIES LTD",
      branchRegionalCode: "NZ-BOP",
      features: {},
      geoPoint: {
        latitude: -37.1882934,
        longitude: 175.55693826,
      },
      isActive: true,
      isBranch: true,
      name: "Thames",
      openingHours: {
        code: "362-Working Hours",
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
              hour: 0,
              minute: 0,
            },
            openingTime: {
              hour: 0,
              minute: 0,
            },
            closed: false,
            weekDay: "Sat",
          },
          {
            closingTime: {
              hour: 0,
              minute: 0,
            },
            openingTime: {
              hour: 0,
              minute: 0,
            },
            closed: false,
            weekDay: "Sun",
          },
        ],
      },
      parentBranchID: "P362",
      storeImages: [],
    },
    entries: [
      {
        availableForPickup: true,
        basePrice: {
          currencyIso: "NZD",
          formattedValue: "$6.14",
          priceType: "BUY",
          value: 6.14,
        },
        configurationInfos: [],
        customProductFlag: false,
        decimalQty: 1,
        deliveryOrder: true,
        entryNumber: 0,
        estimateProductStock: 0,
        product: {
          appUomFormat: "7.2",
          availableForPickup: true,
          baseOptions: [],
          categories: [
            {
              code: "AB01DA",
              name: "Sg8 H1.2 Rad PG Kd Scantlings 75Mm-100Mm",
              url: "/timber-panels/structural-grade-timber-kiln-dried/sg-h12-radiata-kd/sg8-h12-rad-pg-kd-scantlings-75mm-100mm/c/AB01DA",
            },
          ],
          code: "1015262",
          configurable: true,
          display: "PURCHASABLE",
          expressOrder: false,
          hasNoQuantity: 0,
          name: "100 X 50 (90X45) RAD SG8 H1.2 PLANER GAUGED KD 6.0M",
          pmExclusive: true,
          price: {
            currencyIso: "NZD",
            formattedValue: "$6.14",
            priceType: "BUY",
            value: 6.14,
          },
          purchasable: true,
          retailPrice: {
            currencyIso: "NZD",
            formattedValue: "$8.60",
            priceType: "BUY",
            value: 8.6,
          },
          retailPriceGstInclusive: {
            currencyIso: "NZD",
            formattedValue: "$9.89",
            priceType: "BUY",
            value: 9.89,
          },
          sellOrderMultiple: 6,
          specialProdWithAlphaSkuFlag: false,
          specialProduct: false,
          stock: {
            isValueRounded: false,
            pmStockQuantity: "0",
            statusCode: "3",
            stockLevelStatus: "outOfStock",
          },
          timberProductFlag: true,
          unitCode: "LM",
          uomFormat: "7.2",
          url: "/timber-panels/structural-grade-timber-kiln-dried/sg-h12-radiata-kd/sg8-h12-rad-pg-kd-scantlings-75mm-100mm/100-x-50-90x45-rad-sg8-h12-planer-gauged-kd-60m/p/1015262",
        },
        quantity: 1,
        retailPrice: {
          currencyIso: "NZD",
          formattedValue: "$0.00",
          priceType: "BUY",
          value: 0,
        },
        selectedConfiguration: [
          {
            price: "36.84",
            quantity: "1",
            size: "6.0",
          },
        ],
        totalPrice: {
          currencyIso: "NZD",
          formattedValue: "$36.84",
          priceType: "BUY",
          value: 36.84,
        },
        totalSize: "6.00",
        unit: "LM",
        updateable: true,
      },
    ],
    guid: "d7a796c8-cec1-45c3-86bf-7337acb19168",
    net: true,
    orderDiscounts: {
      currencyIso: "NZD",
      formattedValue: "$0.00",
      priceType: "BUY",
      value: 0,
    },
    pickupItemsQuantity: 0,
    pickupOrderGroups: [],
    productDiscounts: {
      currencyIso: "NZD",
      formattedValue: "$0.00",
      priceType: "BUY",
      value: 0,
    },
    site: "placemakers",
    store: "placemakers",
    subTotal: {
      currencyIso: "NZD",
      formattedValue: "$36.84",
      priceType: "BUY",
      value: 36.84,
    },
    totalDiscounts: {
      currencyIso: "NZD",
      formattedValue: "$0.00",
      priceType: "BUY",
      value: 0,
    },
    totalItems: 1,
    totalPrice: {
      currencyIso: "NZD",
      formattedValue: "$122.84",
      priceType: "BUY",
      value: 122.84,
    },
    totalPriceWithTax: {
      currencyIso: "NZD",
      formattedValue: "$122.84",
      priceType: "BUY",
      value: 122.84,
    },
    totalTax: {
      currencyIso: "NZD",
      formattedValue: "$0.00",
      priceType: "BUY",
      value: 0,
    },
    unit: {
      uid: "362ANDLA",
    },
    user: {
      name: "Shashika",
      uid: "shashika.abeysuriya@fbu.com",
    },
    additionalInfo: "",
    constrainedProductExist: true,
    courierEligible: false,
    deliveryEligible: false,
    dspCharges: {
      currencyIso: "NZD",
      formattedValue: "$86.00",
      priceType: "BUY",
      value: 86,
    },
    estimatesIncluded: false,
    freightAgreementApplied: false,
    freightAgreementDescription: "ANDLA:  Orders over $1000 free testing purpose only xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    freightCalculated: true,
    hasFreightAgreement: true,
    lastSelectedTradeAccount: "362ANDLA",
    pickupEligible: false,
    potentialOrderPromotions: [],
    potentialProductPromotions: [],
    purchaseOrderNumber: "23234234234",
    remoteBranchSelected: false,
    requestedDate: "2022-10-26T11:00:00+0000",
    requestedTime: "ANYTIME",
    siteCharges: {
      currencyIso: "NZD",
      formattedValue: "$0.00",
      priceType: "BUY",
      value: 0,
    },
    siteContacts: [
      {
        code: 8851045142055,
        firstName: "Shashika",
        lastName: "",
        mail: "shashika.abeysuriya@fbu.com",
        mailFlags: [],
        mobile: "64272542871",
        smsFlags: ["Scheduled for delivery", "Left Branch", "On Its Way", "Missed Delivery"],
      },
    ],
    siteRequirements: [],
    totalUnitCount: 1,
    travelDistance: 99.5,
    travelTime: 66,
    truckCharges: {
      currencyIso: "NZD",
      formattedValue: "$0.00",
      priceType: "BUY",
      value: 0,
    },
    truckRequirements: ["StandardHIAB"],
  },
  selectedJobAccount: {
    SearchName: "ANDREWS Rename4 testing",
    JobName: "Andrews Rename4",
    JobNumber: "NNDLA004",
    Address1: "Thames",
    Address2: "Thames",
    JobId: "362NNDLA004",
  },
});

describe("Company edit container UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <SafeAreaProvider>
          <DeliveryOptionsContainer />
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
