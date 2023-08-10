import {
  expectedStep1BeginCheckoutEventObj,
  expectedStep1FeatureFlowEventObj,
  expectedStep2QrCodeEventObj,
  expectedStep3InProgressEventObj,
  expectedStep4ReviewEventObj,
  expectedStep4ReviewItemsEventObj,
  expectedStep5GatePassEventObj,
} from "~root/Lib/SampleResponses";
import {
  getStep1BeginCheckoutEventObj,
  getStep1FeatureFlowEventObj,
  getStep2QrCodeEventObj,
  getStep3InProgressEventObj,
  getStep4ItemReviewEventObj,
  getStep4ReviewEventObj,
  getStep5GatePassEventObj,
} from "~root/Lib/STCHelper";

const order = {
  accountName: "Ants General Job0",
  customerId: "ANTGA",
  accountId: "ANTGA000",
  customerPOReference: "truck details",
  deliveryAddress: {
    address1: "810 Great South Road",
    address2: "",
    city: "Auckland",
    suburb: "Penrose",
  },
  deliveryDate: "0001-01-01T00:00:00",
  deliveryRequirements: {
    additionalInformation: "Truck Needed",
    siteRequirements: ["Hiab Longreach"],
    truckRequirements: "Tipper",
  },
  deliveryType: "Standard Delivery",
  directShip: "N",
  dsp: "Specific Time 10:00",
  fulfilmentBranchId: "362",
  fulfilmentType: "Delivery",
  linkedInvoice: "",
  orderGSTAmt: "1.65",
  orderLines: [
    {
      description: "GIB STANDARD 2400X1200 10MM WALLBOARD",
      extLineTotalExcl: "11.00",
      gstAmount: "1.65",
      lineNumber: "1",
      qtyOrdered: "1.0000",
      sku: "2800027",
      supplier: {
        supplierName: "",
        supplierPODate: "0001-01-01T00:00:00",
      },
      unitDescription: "SHEET",
      unitOfMeasure: "ST",
      unitPrice: "11.0000",
    },
  ],
  orderNumber: "1417336",
  orderProcessed: {
    branch: "PLACEMAKERS THAMES",
    by: "pmanakat",
    when: "2021-01-22T00:00:00",
  },
  orderStatus: "PICKING",
  orderTotalExclGST: "11.00",
  packNumber: "",
  pdoNumber: "1417336-1",
  pickupTime: "00:00:00",
  requestDate: "2021-01-25T00:00:00",
  siteContact: [
    {
      email: "prasad.manakattil@fbu.com",
      name: "pRasad mAnakattil",
      phone: "0211859189",
    },
    {
      email: "shashika.abeysuriya@fbu.com",
      name: "Shashika Abeysuriya",
      phone: "0272542871",
    },
  ],
  stagingAreas: [],
  supplierDirectMessage: "",
  totalOrderLines: "1",
};

test("test step1 feature flow event", () => {
  const obj = getStep1FeatureFlowEventObj({
    locationStr: "",
    props: { selectedBranch: {} },
  });
  expect(obj).toEqual(expectedStep1FeatureFlowEventObj);
});

test("test step2 begin checkout event", () => {
  const obj = getStep1BeginCheckoutEventObj({
    locationStr: "",
    props: { selectedBranch: {} },
    state: {},
  });
  expect(obj).toEqual(expectedStep1BeginCheckoutEventObj);
});

test("test step2 begin checkout event", () => {
  const obj = getStep2QrCodeEventObj({
    locationStr: "",
    props: { selectedBranch: {}, orderItem: {} },
  });
  expect(obj).toEqual(expectedStep2QrCodeEventObj);
});

test("test step3 in progress event", () => {
  const obj = getStep3InProgressEventObj({
    locationStr: "",
    props: { selectedBranch: {} },
  });

  expect(obj).toEqual(expectedStep3InProgressEventObj);
});

test("test step4 review event", () => {
  const obj = getStep4ReviewEventObj({
    locationStr: "",
    props: { selectedBranch: {} },
  });

  expect(obj).toEqual(expectedStep4ReviewEventObj);
});

test("test step4 review items event", () => {
  const obj = getStep4ItemReviewEventObj({
    value: { stc: {}, stcConnectTrade: {} },
    props: {
      data: order,
      selectedBranch: {},
    },
  });
  expect(obj).toEqual(expectedStep4ReviewItemsEventObj);
});

test("test step5 gate pass event", () => {
  const obj = getStep5GatePassEventObj({
    locationStr: "",
    props: { userData: { uid: "shashika.abeysuriya@fbu.com", currency: {} }, selectedBranch: {} },
    orderLines: order.orderLines,
  });
  expect(obj).toEqual(expectedStep5GatePassEventObj);
});
