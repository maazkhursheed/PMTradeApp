import { LabourCostType } from "~root/Types/LabourSection";

export const labourCosts = "Labour costs";
export const subcontractorCost = "Sub contractor costs";
export const overheads = "Overheads";
export const otherCosts = "Other costs";

export const addLabourCost = "Add labour cost";
export const addSubcontractorCost = "Add Sub Contractor Cost";
export const addOverheads = "Add overheads";
export const addOtherCost = "Add other costs";

export const addLabourCostMsg1 = "Add labour costs for you and your team";
export const addSubcontractorCostMsg1 = "Add Sub Contractor costs";
export const addOverheadsMsg1 = "Add overheads for you and your team";
export const addOtherCostMsg1 = "Add Other costs";

export const addLabourCostMsg2 = "Remember to make sure you consider allowing for holiday, sickness and overheads.";
export const addSubcontractorCostMsg2 = "Add any Sub Contractor costs required for you to complete the job";
export const addOverheadsMsg2 = "Add Overheads to the quote to cover the day to day running of your business";
export const addOtherCostMsg2 = "Add any other costs you might incur whilst completing this job";

export const addInfoContentLabourCost = "Add 30% to your labour cost or use the Overhead section to cover your day to day running costs.";
export const addInfoContentSubcontractorCost = "Add any sub contracting costs that are needed to complete this job.";
export const addInfoContentOverheadCost = "Add overhead costs to cover your day to day running costs.";
export const addInfoContentOtherCost = "Add any other costs that are needed to complete this job.";

export const addLabelLabourCost = "Labour cost name";
export const addLabelSubcontractorCost = "Sub Contractor name";
export const addLabelOverheadCost = "Overheads name";
export const addLabelOtherCost = "Other cost name";

export const addLabourCostNamePlaceHolder = "Enter name e.g Apprentice, Builder";
export const addSubcontractorCostNamePlaceHolder = "Enter name";
export const addOverheadCostNamePlaceHolder = "Enter name";
export const addOtherCostNamePlaceHolder = "Enter type of cost. e.g Site services";

export const addLabourCostTitle = "Add Labour Cost";
export const addSubcontractorCostTitle = "Add Sub Contractor\nCost";
export const addOverheadsTitle = "Add Overheads";
export const addOtherCostTitle = "Add Other Cost";

export const removeCostMsg = "Are you sure you want to remove this ";
export const removeLabourCostMsg = removeCostMsg + "Labour cost?";
export const removeSubcontractorCostMsg = removeCostMsg + "Sub contractor cost?";
export const removeOverheadCostMsg = removeCostMsg + "Overhead cost?";
export const removeOtherCostMsg = removeCostMsg + "Other cost?";

export const getRemoveCostWarningMsg = (costType: LabourCostType) => {
  switch (costType) {
    case LabourCostType.Labour:
      return removeLabourCostMsg;
    case LabourCostType.SubContractor:
      return removeSubcontractorCostMsg;
    case LabourCostType.Overheads:
      return removeOverheadCostMsg;
    case LabourCostType.OtherCosts:
      return removeOtherCostMsg;
    default:
      return "";
  }
};

export const getLabourAndOtherCostsTotal = (otherCostList: any) => {
  let total = 0;
  otherCostList?.map((otherCost: any) => {
    total += otherCost.total?.value;
  });
  return total;
};

export const getLabourCostTitle = (costType: LabourCostType) => {
  switch (costType) {
    case LabourCostType.Labour:
      return labourCosts;
    case LabourCostType.SubContractor:
      return subcontractorCost;
    case LabourCostType.Overheads:
      return overheads;
    case LabourCostType.OtherCosts:
      return otherCosts;
    default:
      return "";
  }
};

export const getLabourCostEmptyStateMsg1 = (costType: LabourCostType) => {
  switch (costType) {
    case LabourCostType.Labour:
      return addLabourCostMsg1;
    case LabourCostType.SubContractor:
      return addSubcontractorCostMsg1;
    case LabourCostType.Overheads:
      return addOverheadsMsg1;
    case LabourCostType.OtherCosts:
      return addOtherCostMsg1;
    default:
      return "";
  }
};

export const getLabourCostEmptyStateMsg2 = (costType: LabourCostType) => {
  switch (costType) {
    case LabourCostType.Labour:
      return addLabourCostMsg2;
    case LabourCostType.SubContractor:
      return addSubcontractorCostMsg2;
    case LabourCostType.Overheads:
      return addOverheadsMsg2;
    case LabourCostType.OtherCosts:
      return addOtherCostMsg2;
    default:
      return "";
  }
};

export const getAddCostButtonText = (costType: LabourCostType) => {
  switch (costType) {
    case LabourCostType.Labour:
      return addLabourCost;
    case LabourCostType.SubContractor:
      return addSubcontractorCost;
    case LabourCostType.Overheads:
      return addOverheads;
    case LabourCostType.OtherCosts:
      return addOtherCost;
    default:
      return "";
  }
};

export const getTotalForCostType = (otherCostList: any, costType: LabourCostType) => {
  let total = "";
  otherCostList?.forEach((cost: any) => {
    if (cost.costType === costType) {
      total = cost.total?.value;
    }
  });
  return total;
};

export const getLabourCostData = (otherCostList: any, costType: LabourCostType) => {
  let data: any = [];
  otherCostList?.forEach((cost: any) => {
    if (cost.costType === costType) {
      data = cost.entries;
    }
  });
  return data;
};

export const getTipsSectionText = (costType: LabourCostType) => {
  switch (costType) {
    case LabourCostType.Labour:
      return addInfoContentLabourCost;
    case LabourCostType.SubContractor:
      return addInfoContentSubcontractorCost;
    case LabourCostType.Overheads:
      return addInfoContentOverheadCost;
    case LabourCostType.OtherCosts:
      return addInfoContentOtherCost;
    default:
      return "";
  }
};

export const getCostTypeNameLabel = (costType: LabourCostType) => {
  switch (costType) {
    case LabourCostType.Labour:
      return addLabelLabourCost;
    case LabourCostType.SubContractor:
      return addLabelSubcontractorCost;
    case LabourCostType.Overheads:
      return addLabelOverheadCost;
    case LabourCostType.OtherCosts:
      return addLabelOtherCost;
    default:
      return "";
  }
};

export const getCostTypeNamePlaceHolder = (costType: LabourCostType) => {
  switch (costType) {
    case LabourCostType.Labour:
      return addLabourCostNamePlaceHolder;
    case LabourCostType.SubContractor:
      return addSubcontractorCostNamePlaceHolder;
    case LabourCostType.Overheads:
      return addOverheadCostNamePlaceHolder;
    case LabourCostType.OtherCosts:
      return addOtherCostNamePlaceHolder;
    default:
      return "";
  }
};

export const getAddCostSheetTitle = (costType: LabourCostType) => {
  switch (costType) {
    case LabourCostType.Labour:
      return addLabourCostTitle;
    case LabourCostType.SubContractor:
      return addSubcontractorCostTitle;
    case LabourCostType.Overheads:
      return addOverheadsTitle;
    case LabourCostType.OtherCosts:
      return addOtherCostTitle;
    default:
      return "";
  }
};
