import { LabourCostType } from "~root/Types/LabourSection";
import {
  addLabourCost,
  addLabourCostMsg1,
  addLabourCostMsg2,
  addOtherCost,
  addOtherCostMsg1,
  addOtherCostMsg2,
  addOverheads,
  addOverheadsMsg1,
  addOverheadsMsg2,
  addSubcontractorCost,
  addSubcontractorCostMsg1,
  addSubcontractorCostMsg2,
  getAddCostButtonText,
  getLabourAndOtherCostsTotal,
  getLabourCostData,
  getLabourCostEmptyStateMsg1,
  getLabourCostEmptyStateMsg2,
  getLabourCostTitle,
  getTotalForCostType,
  labourCosts,
  otherCosts,
  overheads,
  subcontractorCost,
} from "./index";

const data = {
  otherCostList: [
    {
      costAdded: true,
      costType: "Labour",
      entries: [
        {
          name: "test",
          notes: "",
          price: 1,
          quantity: 100,
          subTotal: {
            currencyIso: "NZD",
            formattedValue: "$100.00",
            value: 100,
          },
          type: "Labour",
        },
        {
          name: "test2",
          notes: "",
          price: 200,
          quantity: 1,
          subTotal: {
            currencyIso: "NZD",
            formattedValue: "$200.00",
            value: 200,
          },
          type: "Labour",
        },
      ],
      total: {
        currencyIso: "NZD",
        formattedValue: "$300.00",
        value: 300,
      },
    },
    {
      costAdded: false,
      costType: "SubContractor",
      entries: [],
      total: {
        currencyIso: "NZD",
        formattedValue: "$100.00",
        value: 100,
      },
    },
    {
      costAdded: false,
      costType: "Overheads",
      entries: [],
      total: {
        currencyIso: "NZD",
        formattedValue: "$50.00",
        value: 50,
      },
    },
    {
      costAdded: false,
      costType: "OtherCosts",
      entries: [],
      total: {
        currencyIso: "NZD",
        formattedValue: "$0.00",
        value: 0,
      },
    },
  ],
};

const labourEntriesParams = [
  {
    name: "test",
    notes: "",
    price: 1,
    quantity: 100,
    subTotal: {
      currencyIso: "NZD",
      formattedValue: "$100.00",
      value: 100,
    },
    type: "Labour",
  },
  {
    name: "test2",
    notes: "",
    price: 200,
    quantity: 1,
    subTotal: {
      currencyIso: "NZD",
      formattedValue: "$200.00",
      value: 200,
    },
    type: "Labour",
  },
];

const subEntriesParams: any = [];
const overheadEntriesParams: any = [];
const otherCostEntriesParams: any = [];

test("Get the total of labour and other costs", () => {
  expect(getLabourAndOtherCostsTotal(data.otherCostList)).toEqual(450);
});

test("Get total for each cost type", () => {
  expect(getTotalForCostType(data.otherCostList, LabourCostType.Labour)).toEqual(300);
  expect(getTotalForCostType(data.otherCostList, LabourCostType.SubContractor)).toEqual(100);
  expect(getTotalForCostType(data.otherCostList, LabourCostType.Overheads)).toEqual(50);
  expect(getTotalForCostType(data.otherCostList, LabourCostType.OtherCosts)).toEqual(0);
});

test("Get each cost data", () => {
  expect(getLabourCostData(data.otherCostList, LabourCostType.Labour)).toEqual(labourEntriesParams);
  expect(getLabourCostData(data.otherCostList, LabourCostType.SubContractor)).toEqual(subEntriesParams);
  expect(getLabourCostData(data.otherCostList, LabourCostType.Overheads)).toEqual(overheadEntriesParams);
  expect(getLabourCostData(data.otherCostList, LabourCostType.OtherCosts)).toEqual(otherCostEntriesParams);
});

test("getLabourCostTitle function should work as expected", () => {
  expect(getLabourCostTitle(LabourCostType.Labour)).toEqual(labourCosts);
  expect(getLabourCostTitle(LabourCostType.SubContractor)).toEqual(subcontractorCost);
  expect(getLabourCostTitle(LabourCostType.Overheads)).toEqual(overheads);
  expect(getLabourCostTitle(LabourCostType.OtherCosts)).toEqual(otherCosts);
});

test("getAddCostButtonText function should work as expected", () => {
  expect(getAddCostButtonText(LabourCostType.Labour)).toEqual(addLabourCost);
  expect(getAddCostButtonText(LabourCostType.SubContractor)).toEqual(addSubcontractorCost);
  expect(getAddCostButtonText(LabourCostType.Overheads)).toEqual(addOverheads);
  expect(getAddCostButtonText(LabourCostType.OtherCosts)).toEqual(addOtherCost);
});

test("getLabourCostEmptyStateMsg1 function should work as expected", () => {
  expect(getLabourCostEmptyStateMsg1(LabourCostType.Labour)).toEqual(addLabourCostMsg1);
  expect(getLabourCostEmptyStateMsg1(LabourCostType.SubContractor)).toEqual(addSubcontractorCostMsg1);
  expect(getLabourCostEmptyStateMsg1(LabourCostType.Overheads)).toEqual(addOverheadsMsg1);
  expect(getLabourCostEmptyStateMsg1(LabourCostType.OtherCosts)).toEqual(addOtherCostMsg1);
});

test("getLabourCostEmptyStateMsg2 function should work as expected", () => {
  expect(getLabourCostEmptyStateMsg2(LabourCostType.Labour)).toEqual(addLabourCostMsg2);
  expect(getLabourCostEmptyStateMsg2(LabourCostType.SubContractor)).toEqual(addSubcontractorCostMsg2);
  expect(getLabourCostEmptyStateMsg2(LabourCostType.Overheads)).toEqual(addOverheadsMsg2);
  expect(getLabourCostEmptyStateMsg2(LabourCostType.OtherCosts)).toEqual(addOtherCostMsg2);
});
