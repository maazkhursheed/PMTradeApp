import moment from "moment";
import R from "ramda";
import { isNilOrEmpty } from "~root/Lib/CommonHelper";
import colors from "~root/Themes/Colors";

export enum OrderTypes {
  PICKUP = "pickup",
  EXPRESS = "courier-delivery",
  STANDARD = "standard-delivery",
  ADD_TO_EXISTING = "Add to existing",
}

export enum OrderTypesCapital {
  DELIVERY = "Delivery",
  COURIER = "Courier",
  PICKUP = "PickUp",
}

export enum SMSFlags {
  SCHEDULE_FOR_DELIVERY = "Scheduled for delivery",
  LEFT_BRANCH = "Left Branch",
  ON_ITS_WAY = "On Its Way",
  MISSED_DELIVERY = "Missed Delivery",
  READY_FOR_PICKUP = "Ready for pickup",
}

export enum SMSLabels {
  SCHEDULE_FOR_DELIVERY = "Scheduled for delivery",
  LEFT_BRANCH = "Left branch",
  ON_ITS_WAY = "On its way",
  MISSED_DELIVERY = "Missed delivery",
  READY_FOR_PICKUP = "Ready for pickup",
}

export enum SMSFlagsDescription {
  SCHEDULE_FOR_DELIVERY = "Receive a reminder the day before delivery date.",
  LEFT_BRANCH = "Receive message notification when your order has left the branch.",
  ON_ITS_WAY = "Receive live tracking notification when your order is on its way.",
  MISSED_DELIVERY = "Receive re-scheduled notification when we were unable to deliver.",
  READY_FOR_PICKUP = "Receive ready for pickup along with re-schedule notification.",
}

/**
 * Enums for TradeAccounts
 */

export enum TradeAccounts {
  CASH = "CASH",
  CHARG = "CHARG",
}

export interface BranchDetailParam {
  branchId: string;
  fields?: string;
  depotsRequired: boolean;
}

export interface BranchDetailResponse {
  pointOfServices: BranchResponse[];
}

export interface BranchResponse {
  openingHours: object;
  address: Address[];
  branchID: string;
  branchCode: string;
  branchLegalName: string;
  branchRegionalCode: string;
  isActive: boolean;
  isBranch: boolean;
  name: string;
  parentBranchID: string;
  geoPoint: GeoPoint;
}

export interface Address {
  defaultAddress: boolean;
  formattedAddress: string;
  id: string;
  line1: string;
  line2: string;
  phone: string;
  country: any;
  town: any;
}

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

/**
 *
 * @description This function returns branch name of selected branch
 */

export const getOrderTypeValueForFirebaseLog = (orderType: OrderTypes) => {
  switch (orderType) {
    case OrderTypes.EXPRESS:
      return "Courier";
    case OrderTypes.PICKUP:
      return "Pickup";
    case OrderTypes.STANDARD:
      return "Delivery";
    default:
      return orderType;
  }
};

/**
 *
 * @description This function returns branch name of selected branch
 */

export const getBranchName = (data: BranchResponse): string => {
  if (data) {
    const a = R.toPairs(data).find(item => {
      return item[0] === "name";
    });
    return a[1] as string;
  }
};

/**
 *
 * @description This function returns branch address of selected branch
 */

export const getBranchAddress = (data: BranchResponse) => {
  if (data) {
    const a = R.toPairs(data).find(item => {
      return item[0] === "address";
    });
    return a[1].formattedAddress;
  }
};

/**
 *
 * @description This function returns branch geo code for location of selected branch
 */
export const getBranchGeoCode = (data: BranchResponse) => {
  if (data) {
    const a = R.toPairs(data).find(item => {
      return item[0] === "geoPoint";
    });
    return a[1];
  }
};

/**
 * @description This function returns branch name  & branch address for pick order type and for other order type it only returns branch name
 */
export const displayFromAddress = (branch: BranchResponse, orderType: OrderTypes) => {
  return orderType === OrderTypes.PICKUP ? `${getBranchName(branch)}${"\n"}${getBranchAddress(branch)}` : `${getBranchName(branch)}`;
};

/**
 *
 * @description This function returns branch phone number of selected branch
 */
export const getBranchPhone = (data: BranchResponse) => {
  if (data) {
    const a = R.toPairs(data).find(item => {
      return item[0] === "address";
    });
    return a[1].phone;
  }
};

/**
 *
 * @description This function returns branch email of selected branch
 */

export const getBranchEmail = (data: BranchResponse) => {
  if (data) {
    const a = R.toPairs(data).find(item => {
      return item[0] === "address";
    });
    return a[1].email;
  }
};

/**
 *
 * @description This function returns giving string into title case string
 */

export const titleCase = (str: string) => {
  const splitStr = str.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
};

export const getOpeningOrClosingTime = (keyStr: string, hoursObj: any) => {
  const timeStr = R.pathOr("", [keyStr, "formattedHour"], hoursObj);
  return timeStr;
};

export const getHoursObject = (item: any, day: string) => {
  const hoursObj = R.compose(R.head, R.filter(R.propEq("weekDay", day)), R.pathOr([], ["openingHours", "weekDayOpeningList"]))(item);
  return hoursObj;
};

export const getBranchStatusText = (item: any) => {
  const weekDay = moment().format("ddd");
  const hoursObj = getHoursObject(item, weekDay);

  const closingTime = getOpeningOrClosingTime("closingTime", hoursObj);
  const closingDate = moment(closingTime, "HH:mm");
  const closingSoonDate = moment(closingTime, "HH:mm").subtract({
    minutes: 60,
  });

  const openingTime = getOpeningOrClosingTime("openingTime", hoursObj);
  const openingDate = moment(openingTime, "HH:mm");

  const currentDate = moment();

  let txtStatus = "Closed";
  let colorStatus = colors.darkRed;
  if (currentDate >= closingSoonDate && currentDate <= closingDate) {
    txtStatus = "Closing soon";
    colorStatus = colors.ochre;
  } else if (currentDate >= openingDate && currentDate <= closingDate) {
    txtStatus = "Open";
    colorStatus = colors.greenCheck;
  }
  let closingTimeStr = "";
  if (!isNilOrEmpty(closingTime)) {
    closingTimeStr = moment(closingDate).format("h:mm A");
  }

  return [txtStatus, colorStatus, closingTimeStr];
};

export const getDayWiseOpeningHours = (branchData: any, day: string) => {
  const hoursObj = getHoursObject(branchData, day);
  const openingTime = getOpeningOrClosingTime("openingTime", hoursObj);
  const closingTime = getOpeningOrClosingTime("closingTime", hoursObj);
  const openingDate = moment(openingTime, "HH:mm").format("h:mm A");
  const closingDate = moment(closingTime, "HH:mm").format("h:mm A");
  let status = "Closed";
  if (!isNilOrEmpty(openingTime) && !isNilOrEmpty(closingTime)) {
    status = `${openingDate} - ${closingDate}`;
  }
  return status;
};

export const sanitizeBranches = R.map(item =>
  R.mergeDeepRight(
    {
      statusArr: getBranchStatusText(item),
      branchName: R.propOr("", "name", item),
      branchAddress: R.pathOr("", ["address", "formattedAddress"], item),
      branchDistance: R.propOr("", "formattedDistance", item),
    },
    item,
  ),
);

export const getBranchTownRegion = (selBranch: any) => {
  if (selBranch?.address) {
    const town = selBranch?.address?.town ?? "";
    const region = selBranch?.address?.region?.name ?? "";
    return `${town}, ${region}`;
  } else {
    return "";
  }
};

export enum SiteRequirements {
  OnSiteLift = "Lift on site",
  OnSiteHazards = "Hazards at the site",
  RestrictedAccess = "Restricted access",
}

export enum navigationalScreens {
  ShopScreen = "Shop Screen",
  MyListsScreen = "MyLists Screen",
  MyListDetailsScreen = "My List Details Screen",
  MyOrdersScreen = "My Orders Screen",
  MyOrderDetailsScreen = "My Order Details Screen",
  JobsScreen = "Jobs Screen",
  TeamScreen = "Team Screen",
  SelectContactScreen = "Select contact Screen",
  TeamMemberAdd_EditScreen = "Team member Add/Edit Screen",
  CartScreen = "Cart Screen",
  DeliveryOptionsScreen = "Delivery options Screen",
  DeliveryOptionDetailsScreen = "Delivery option Details Screen",
  OptionalRequirementsScreen = "Optional requirements Screen",
  AccountDetailsScreen = "Account details Screen",
  OrderReviewScreen = "Order Review Screen",
  UserMenuScreen = "User Menu Screen",
  UserDetailsScreen = "User Details Screen",
  AccountsScreen = "Accounts Screen",
  JobAccountsScreen = "Job accounts Screen",
  BranchesScreen = "Branches Screen",
  BranchDetailsScreen = "Branch Details Screen",
  PlaceMakersSolutionScreen = "PlaceMakers Solutions Screen",
  PlaceMakersSolutionDetailsScreen = "PlaceMakers Solution Details Screen",
  GetInTouchScreen = "Get in touch Screen",
  Launch_Screen = "Launch Screen",
  NotificationsScreen = "Notifications Screen",
  SearchScreen = "Search Screen",
  SearchResultsScreen = "Search results Screen",
  ConnectedTradeAccountScreen = "Connected Trade Account Screen",
  ProductListingScreen = "Product Listing Screen",
  ProductDetailsScreen = "Product Details Screen",
  ProductOverviewScreen = "Product Overview Screen",
  ProductSpecificationScreen = "Product Specification Screen",
  ProductWarrantyScreen = "Product Warranty Screen",
  ProductDocumentScreen = "Product Document Screen",
  STCEnterDetailsScreen = "STC Enter Details Screen",
  STCQRCodeScreen = "STC QR Code Screen",
  STCOrderInProgressScreen = "STC Order In Progress Screen",
  STCReviewOrdersScreen = "STC Review Orders Screen",
  STCConfirmOrderPurchaseProofScreen = "STC Confirm Order Purchase Proof Screen",
  STCGatePassScreen = "STC Gate Pass Screen",
  BarCodeScanningScreen = "Bar code Scanning Screen",
  ProductCategoryScreen = "Product Category Screen",
  MaterialsSectionScreen = "MaterialsScreen",
  CustomerDetailsScreen = "CustomerDetailsScreen",
  LabourSectionScreen = "LabourScreen",
  MaterialsListScreen = "Materials List Screen",
}
