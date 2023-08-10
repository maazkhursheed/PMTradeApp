import moment, { Moment } from "moment";
import * as R from "ramda";
import { Keyboard } from "react-native";
import UXCam from "react-native-ux-cam";
import { OrderTypes } from "~root/Lib/BranchHelper";
import { isNotNilOrEmpty } from "~root/Lib/CommonHelper";
import { isTimberFlag } from "~root/Lib/DataHelper";
import { Colors } from "~root/Themes";
import { RequestedTime } from "~root/Types/CommonTypes";
import { OrderTypesCapital } from "../BranchHelper";
export const estimatedTimeForCourier = "Expected delivery 60 - 120 minutes";

export const removeCartItem = (value: any, updateCart: any, dispatchAlert: any) => {
  return new Promise((resolve, reject) => {
    Keyboard.dismiss();
    setTimeout(() => {
      UXCam.setAutomaticScreenNameTagging(false);
      dispatchAlert?.({
        visible: true,
        heading: "Remove" + " " + value.product.name,
        msg: "Are you sure you want to remove this item from your cart?",
        iconName: "trash",
        button1Text: "Remove",
        button2Text: "Cancel",
        onButton2Press: () => {
          dispatchAlert?.({ visible: false });
          reject();
        },
        onButton1Press: () => {
          updateCart({ entry: value, quantity: 0, isUpdate: true });
          dispatchAlert?.({ visible: false });
          resolve();
        },
      });
    }, 50);
  });
};

export const calculatePrice = (isTimber: boolean, price: number, quantity: number, selectedMultiple: number) => {
  if (!isTimber) {
    return price * quantity;
  } else {
    return price * quantity * selectedMultiple;
  }
};

export const getIndexedCart = R.compose(
  R.map(R.assoc("Availability", "Available")),
  R.filter(R.compose(R.gte(R.__, 0), R.prop("Quantity"))),
  R.values,
  R.mapObjIndexed((num, key, obj) => R.assoc("index", parseFloat(key), num)),
);

/**
 * Expecting cart entry item, If cart entry item is timber product then create an objcet with price and length
 */

export const generateProductRequestForCart = R.compose(
  R.ifElse(
    isTimberFlag,
    R.applySpec({
      code: R.prop("code"),
      timberProductFlag: R.T,
      productPrice: R.prop("productPrice"),
      length: R.prop("length"),
    }),
    R.applySpec({ code: R.prop("code") }),
  ),
  R.prop("product"),
);

export const addIfEstimatedParams = R.curry((params, payload) => {
  if (isNotNilOrEmpty(payload.estimateNumber) && isNotNilOrEmpty(payload.lineNumber)) {
    return R.mergeRight(params, {
      lineNumber: payload.lineNumber,
      estimateProductPrice: isNaN(payload.estimateProductPrice) ? 0 : payload.estimateProductPrice,
      estimateProductFlag: payload.estimateProductFlag,
      estimateProductDesc: payload.estimateProductDesc,
      estimateProductUnit: payload.estimateProductUnit,
      estimateNumber: payload.estimateNumber,
    });
  } else {
    return params;
  }
});

export const setupForEstimatedProducts = R.curry((bodyParams: any, payload: any) => {
  if (isNotNilOrEmpty(payload?.estimateNumber)) {
    return R.mergeRight(bodyParams, {
      lineNumber: payload?.entry?.lineNumber,
      estimateProductPrice: isNaN(payload?.entry?.estimateProductPrice) ? 0 : payload?.entry?.estimateProductPrice,
      estimateProductFlag: payload?.entry?.estimateProductFlag,
      estimateProductDesc: payload?.entry?.estimateProductDesc,
      estimateProductUnit: payload?.entry?.estimateProductUnit,
      estimateNumber: payload?.estimateNumber,
    });
  } else {
    return bodyParams;
  }
});

/**
 * This function returns true if any cart item is being updated or deleted.
 */
export const isItemUpdatingOrDeleting = ({ itemUpdateMap, itemDeleteMap }) => {
  let isItemUpdating = false;
  let isItemDeleting = false;
  Object.keys(itemUpdateMap).map(productCode => {
    if (itemUpdateMap[productCode]) {
      isItemUpdating = true;
    }
  });
  Object.keys(itemDeleteMap).map(productCode => {
    if (itemDeleteMap[productCode]) {
      isItemDeleting = true;
    }
  });
  return isItemUpdating || isItemDeleting;
};

/**
 * This function returns list of entries that are passed to it eliminating deleted items passed in itemDeleteMap object
 */

export const removeDeletedCartItems = ({ itemDeleteMap, entries }) => {
  const deletedSKUs = R.compose(
    R.filter(item => itemDeleteMap[item] == true),
    R.keys,
  )(itemDeleteMap);

  return R.compose(R.filter(deletedItem => !R.contains(deletedItem.product.code)(deletedSKUs)))(entries);
};

/**
 * This function returns true if a voucher is applied on cart
 */

export const isVoucherApplied = (cart: any) => {
  return cart.userCartDetail && cart.userCartDetail.appliedVouchers.length > 0 && cart.userCartDetail.appliedVouchers[0].voucherCode.length > 0;
};

export const getSelectedTimeRange = (selectedTimeRange?: string, selectedDate?: Moment, orderType?: OrderTypes, forDisplay: boolean) => {
  if (orderType === OrderTypesCapital.COURIER) {
    return estimatedTimeForCourier;
  } else if (selectedTimeRange) {
    if (forDisplay) {
      if (selectedTimeRange === RequestedTime.AM) {
        return selectedTimeRange + " - In the Morning";
      } else if (selectedTimeRange === RequestedTime.PM) {
        return selectedTimeRange + " - In the Afternoon";
      } else if (selectedTimeRange === RequestedTime.ANYTIME) {
        return "Anytime";
      }
    }
    return selectedTimeRange;
  } else {
    return selectedDate?.format("hh:mm A");
  }
};

export const isSameContact = (contactA: any, contactB: any) => {
  return (
    contactA.mail === contactB.mail &&
    contactA.mobile === contactB.mobile &&
    contactA.firstName === contactB.firstName &&
    contactA.lastName === contactB.lastName
  );
};

export const myBranch = (myBranches: any) => R.always(R.head(myBranches || []));

export const isNotHomeBranch = (selectedBranch: any, myBranches: any) => {
  return !R.includes(R.prop("branchID", selectedBranch), R.map(R.prop("branchID"), myBranches || []));
};

export const checkIsOptionAvailable = (value: any, selectedBranch: any, myBranches: any) => {
  // as per the 1909 bug this implementation is done, The courier option we have disable based on the order is eligible or not.
  // Srilatha tested this bug and accepted.
  if (value?.deliveryType === "Courier") {
    return R.has("eligibleToOrder", value) ? value.eligibleToOrder : true;
  } else {
    return R.has("eligibleToOrder", value) && !isNotHomeBranch(selectedBranch, myBranches) ? value.eligibleToOrder : true;
  }
};

export const getTime = (deliveryType: string, time: string, date: string, eligibleToOrder: any, selectedBranch: any, myBranches: any) => {
  const momentDate = moment(date, "yyyy-MM-DD");
  switch (deliveryType) {
    case "Delivery":
      return isNotHomeBranch(selectedBranch, myBranches) || !momentDate.isValid() ? "" : "ANYTIME " + momentDate.format("Do MMMM").toUpperCase();
    case "Courier":
      if (isNotHomeBranch(selectedBranch, myBranches)) {
        if (!eligibleToOrder) {
          return date;
        }
        return "";
      } else if (date === "NOT AVAILABLE FOR THIS ORDER") {
        return date;
      } else {
        return moment(time, "hh:mm A").isValid() ? estimatedTimeForCourier : time;
      }
    case "PickUp":
      return momentDate.isSame(moment(), "d") ? time + " TODAY" : time + " " + moment(date, "yyyy-MM-DD").format("Do MMMM").toUpperCase();
  }
};

export const branchSwitchAlert = (deliveryOptionBranchSwitchHeading: string, deliveryOptionBranchSwitchMessage: string, onPress: any, dispatchAlert) => {
  dispatchAlert?.({
    heading: deliveryOptionBranchSwitchHeading,
    msg: deliveryOptionBranchSwitchMessage,
    visible: true,
    button1Text: "Yes",
    button2Text: "No",
    onButton1Press: () => {
      dispatchAlert?.({ visible: false });
      onPress();
    },
    onButton2Press: () => dispatchAlert?.({ visible: false }),
  });
};

export const CashCustomerBranchSwitchAlert = (
  deliveryOptionBranchSwitchHeading: string,
  deliveryOptionBranchSwitchMessage: string,
  onPress: any,
  onCancel: any,
  button1Text: string,
  branchSwitchText: string,
  homeBranch: string,
  selectedBranch: string,
  branchSwitchTextSuffix: string,
  dispatchAlert,
) => {
  dispatchAlert?.({
    heading: deliveryOptionBranchSwitchHeading,
    msg: deliveryOptionBranchSwitchMessage,
    visible: true,
    button1Text,
    iconColor: Colors.darkBlue,
    button2Text: "Cancel",
    button1Color: Colors.darkBlueHeader,
    branchSwitchText,
    homeBranch,
    selectedBranch,
    branchSwitchTextSuffix,
    onButton1Press: () => {
      dispatchAlert?.({ visible: false });
      onPress();
    },
    onButton2Press: () => {
      dispatchAlert?.({ visible: false });
      onCancel();
    },
  });
};
