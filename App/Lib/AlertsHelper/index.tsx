import * as R from "ramda";
import * as RA from "ramda-adjunct";
import React from "react";
import { Alert, AlertButton, AlertOptions, Linking, Text } from "react-native";
import AppConfig from "~root/Config/AppConfig";
import { Colors, Fonts } from "~root/Themes";

export interface IAlertCallbacks {
  onSuccess?: (...args: any) => void;
  onFailure?: (...args: any) => void;
}
// Text constants used in the code
export const PLACE_ORDER = "Place order";
export const CONTINUE_PAYMENT = "Continue to Payment";
export const TOTAL_GST = "GST";
export const TOTAL_PRICE_GST = "Total excl. GST";
export const TOTAL_PRICE_INC_GST = "Total incl. GST";
export const FRONT_MOUNT_REQUIRED = "Front mount required";
export const EXTRA_TIME_SITE = "Extra Time on Site";
export const ADDITIONAL_CHARGES = "Additional charges:";
export const FIND_DELIVERY_OPTIONS = "Find out more about delivery options";
export const NOT_CHARGED_TODAY = "(not charged today)";
export const PRODUCTS = "Products";
export const REQUEST_ITEM = "Click here to request anything that you need to get the job done";
export const EXCLUDING_GST = "excluding Cartage and GST";
export const EXCLUDING_GST_DES = " | excl. GST";
export const ITEMS = "items";
export const CARTAGE = "Cartage";
export const TO_BE_CONFIRMED = "To be confirmed";
export const SO_POPUP_MSG = `Branch staff will advise estimated delivery timeframes upon callback.\n\nThese products are ordered directly from the supplier or another branch for you. Our branch team will confirm if we can source it for you and confirm delivery timeframe and costs (if any). Once you accept this you will be provided a payment link to complete your purchase.`;
export const LEARN_MORE_BTN = "Learn More";
export const SPECIAL_ORDER = "Special Order";
export const DELIVERY_REQUEST = "Delivery Request";
export const PAYON_CALLBACK = "Pay on Callback";
export const PAYNOW_TEXT = "Pay Now";
export const SO_DESCRIPTION = `Branch staff will advise estimated delivery timeframes upon callback.\n\nThese products are ordered directly from the supplier or another branch for you. Our branch team will confirm if we can source it for you and confirm delivery timeframe and costs (if any). Once you accept this you will be provided a payment link to complete your purchase.`;
export const SO1_DESCRIPTION_LINK = `‘Special Order’ items are specifically sourced for you, and cannot be returned unless faulty.`;
export const SPECIAL_ORDER_PROCESS = "Special Order Process";
export const SPECIAL_ORDER_PROCESS_DESCRIPTION = `Because of our partnership with suppliers delivery times are typically no longer than products directly from PlaceMakers.`;
export const SO1_TITLE = "1. Add the product to your cart";
export const SO2_TITLE = "2. Proceed to checkout";
export const SO3_TITLE = "3. Confirmation of supply";
export const SO4_TITLE = "4. Payment";
export const SO5_TITLE = "5. Receiving your product";
export const SO1_DECSCRIPTION = `Simply add them to your cart as you normally would.\n\nProducts that come direct from the supplier are marked with the following:`;
export const SO3_DECSCRIPTION = `We will be in touch with you to confirm availability and delivery timeframes and delivery costs (if any).`;
export const SO4_DECSCRIPTION = `Following step 3 for a payment link for your Special Order will be sent to you.`;
export const SO5_DECSCRIPTION = `We’ll discuss the best way for you to receive the product, this might be in-store, delivery, courier, or added to an existing order.\n\nDelivery times from checkout are typically no longer than products sourced directly from PlaceMakers.`;
export const SO2_FIRSTHALF_DEC = `In your cart these products will be clearly seperated from any other products you have added.\n\nYou will `;
export const SO2_SECONDHALF_DEC = ` for Special Order products today. After checking out a notification is sent to the team to confirm availability.`;
export const SPECIAL_ORDER_SCREEN = "SpecialOrderInfoScreenContainer";
export const SPECIAL_ORDER_TITLE = "Special Order";
export const SPECIAL_ORDER_DESCRIPTION = `Request this product | You will not be charged today`;
export const CARTAGE_DISCLOSURE_HEADING = "Unable to calculate freight";
export const DISCLOSURE_TEXT_CART_CARTAGE =
  "Unfortunately we were unable to calculate freight for your order. You can still place the order and a member of the team will be in touch to confirm your cartage costs.";
export const DISCLOSURE_TEXT_CART_CONSTRAINED =
  "Your order contains items that may be heavily constrained. One of the team will be in touch regarding availability and ETA.";
export const COST_TYPE_ALREADY_EXISTS_MESSAGE = "Other cost name is already existed with specified Type and Quote";
export const COST_TYPE_ALREADY_EXISTS_DISPLAY_MESSAGE = "Cost name already exists. Please enter a different name";
export const DISCLOSURE_TEXT_CART =
  "PlaceMakers will endeavour to hold prices for 30 days from date of estimate. One of the team will be in touch to confirm your order.";
export const DISCLOSURE_TEXT_REVIEW =
  "PlaceMakers will endeavour to hold prices for 30 days from date of estimate. All orders are subject to PlaceMakers Terms of Trade. If you have any questions, please contact your branch.";
export const DISCLOSURE_TEXT_CART_BOTTOM =
  "Prices and availability may change due to industry shortages and supplier increases. All orders are subject to PlaceMakers Terms of Trade. If you have any questions, please contact your branch.";
export const FREQUENT_ORDERED = "Your top products";
export const lifeOnSite = "Lift on site";
export const hazardsAtSite = "Hazards at the site";
export const restrictedAccess = "Restricted access";
export const noTruckTypePreference = "No \npreference";
export const no_TruckTypePreference = "No preference";
export const truckTypeTipper = "Tipper";
export const truckTypeHiab = "Hiab";
export const truckTypeStandardHiab = "StandardHIAB";
export const cashdeliveryOptionBranchSwitchHeading = "As a trade cash customer all deliveries and pickups must come from your home branch";
export const cashdeliveryOptionBranchSwitchMessage = "Do you want to update the current branch of";
export const cashdeliveryOptionBranchSwitchMessageTail = " to your home branch of ";
export const deliveryOptionBranchSwitchHeading = "All deliveries come from your home branch";
export const deliveryOptionBranchSwitchMessage =
  "Selecting this option will change the location and update soonest availability for all options. Do you still want to select delivery?";
export const swipeLeftToArchive = "Swipe left to Archive";
export const SWIPE_LEFT_TO_REMOVE_TEXT = "Swipe Left to remove";
export const SWIPE_LEFT_TO_REMOVE_OR_EDIT_TEXT = "Swipe Left to remove or edit";
export const SWIPE_LEFT_FOR_OPTIONS = "Swipe Left for options";
export const pointCameraAtBarcode = "Point your camera at the barcode";
export const tryAgain = "Try again.";
export const productAddedToCart = "Product added to cart";
export const productAddedToQuote = "Added to Quote";
export const productSwapped = "Product swapped";
export const productSwappedFailed = "Product swap failed - Please try again";
export const ALTERNATIVE_PRODUCTS_SUBTITLE = "Products that can be used in place of this item";
export const noResultsFound = "No results were found.";
export const genericError = "Oops Something went wrong.";
export const loginErrBtnTxt = "Try Again";
export const orderListErrMsg =
  "Oh No! Unfortunately an error occurred and we couldn't update your order status. We will try that again (nothing more for you to do)!";
export const orderListErrBtnTxt = "Retry";
export const orderSubmitNetUnqueuedErrMsg =
  "Oh No! Your internet connection was lost and we were not able to submit your order. We apologize for any inconvenience, please either resubmit your order in the App or give us a call.";
export const orderSubmitNetQueuedErrBtnTxt = "OK";
export const netErrMsg = "Oh No! We have lost internet connection while you were in the App, please connect to internet and retry.";
export const apiErrorMsg = "Oh No! There was an error processing your request, please retry.";
export const apiErrorBtnTxt = "Retry";
export const cancelBtnTxt = "Cancel";
export const confirmBtnTxt = "Confirm";
export const cameraBtnTxt = "Camera";
export const galleryBtnTxt = "Gallery";
export const chooseText = "Choose File";
export const permissionMessage = "We need your permission to use your camera phone";
export const permissionTitle = "Permission to use camera";
export const imageTypeMessage = "Sorry, we don't support that image type. Please upload either a PNG or JPEG";
export const settingsBtnTxt = "Settings";
export const titleErr = "Error";
export const titleGenericError = "Something went wrong";
export const titleSuccess = "Success";
export const titleInfo = "Info";
export const logoutError = "Unable to sign out. Please try again.";
export const connectTradeAccError = "Oh No! We couldn't process your request. Please try again later.";
export const addTradeAccError =
  "No account has been found matching your provided information. Please check your account code is correct or contact our support team.";
export const addTradeAccSuccess = "Account(s) added.";
export const connectTradeAcc = "Your trade account is successfully connected";
export const sendInviteTitle = "INVITATION SENT";
export const OKButton = "OK";
export const inviteUpdateTitle = "INVITATION UPDATED";
export const permissionUpdateTitle = "PERMISSION UPDATED";
export const removeTitle = "REMOVE MEMBER";
export const removeBtnText = "REMOVE";
export const alertTypeRemove = "Remove";
export const alertTypeFailure = "Failure";
export const alertTypeRemoveSuccess = "RemoveSuccess";
export const changePickupAddress =
  "If you change pickup address now, your cart will be cleared and order process will start again. Are you sure you want to proceed?";
export const removeCartItemMsg = "Are you sure you want to remove this item?";
export const enterListNameMsg = "Please enter a list name to create a list";
export const enterTradeAccAndBranchMsg = "Please enter trade account and select branch";
export const phoneUnavailableErr = "Oh No! Phone number for this branch is not available. Please try again later";
export const emailUnavailableErr = "Oh No! Email address for this branch is not available. Please try again later";
export const NEWLIST = "Create New List";
export const SEARCHLIST = "Search List";
export const allProductsSearchText = "Search for products";
export const allProductsShopSearchText = "Search Shop for products";
export const branchEmailError =
  "Oh No! Unfortunately we could not place your order, because email address for this branch/depot is unavailable. Please try again later.";
export const creditLimitError =
  "Oh No! Unfortunately we could not place your order, because your credit limit has been exceeded. Please visit your local branch to continue purchasing.";
const genericErrorMessageWithoutEmail = "Oops! Something went wrong. If problem persists, contact us at ";
export const genericErrorMessage = genericErrorMessageWithoutEmail + AppConfig.SUPPORT_EMAIL;
export const jobAccountsUnavailable =
  "There are no Job Accounts associated with this Trade Account. If this is an issue, please contact us at tradeapp@placemakers.co.nz";
export const masterOnHoldMessage = "The account you have selected is currently on hold. You cannot purchase against this account";
export const checkoutMasterOnHoldMessage = "Your account is on hold. Please contact the PlaceMakers credit team to continue purchasing.";
const ALERT_BUTTONS = [{ text: OKButton }];
export const cameraPermissionTitle = '"Placemakers" would like to access the camera';
export const cameraPermissionMsg = "To use camera scan, allow the Placemakers Trade app to access your camera";
export const locationPermissionMsg = "Allow us to know your location so that we can show you the closest branches for quickest pickup.";
export const locationPermissionTitle = "Turn on location services";
export const titleNearByYou = "Nearby you";
export const titleYourBranches = "Your branches";
export const titleAllowLocation = "Allow current location";
export const outOfStockMessage = "Available in 5+ days";
export const unableToAddContactTitle = "Contact was unable to be added";
export const addContactErrorMsg = "This contact has an invalid phone number. Please select a different contact.";
export const deliveriesInProgress = "Deliveries in progress";
export const TITLE_CHANGE_ACCOUNT = "Change Account";
export const STC_NOT_AVAILABLE = "STC is not available for Cash account as of yet";
export const MESSAGE_CHANGE_ACCOUNT =
  "If you change your Account while there are items in your cart, these will be removed and you will have to start a new cart. Are you sure you want to change Account?";
export const TITLE_CHANGE_ESTIMATE = "Change Estimate";
export const MESSAGE_CHANGE_ESTIMATE =
  "You have already added items to the cart from another estimate. If you add products from this estimate, all previously added items will be removed. Are you sure you want to proceed?";
export const JOB_WON_DESCRIPTION = "Congratulations, you have won";
export const JOB_WON_DESCRIPTION_MESSAGE1 = "This quote will move to the “won” section in quotes so you can review it at any time and will become uneditable.";
export const JOB_WON_DESCRIPTION_MESSAGE2 = "We will also send the details to PlaceMakers";
export const JOB_WON_DESCRIPTION_MESSAGE3 =
  "so they can load this into your “Active Jobs” section so you can simply order from it at any time. Please allow us some time to enter this for you.";
export const JOB_WON_CONFIRMATION = "Confirm the job is won by selecting 'Confirm' above.";
export const JOB_LOST_DESCRIPTION = "Sorry to hear you were not successful on";
export const JOB_LOST_DESCRIPTION_MESSAGE = "This quote will move to the “lost” section in quotes so you can review it at any time and will become uneditable.";
export const JOB_LOST_CONFRIMATION = "Confirm the job is lost by selecting 'Confirm' above.";
export const JOB_STATUS_ERROR = "We were unable to change the job status, please try again";
export const MAX_QUOTE_SIZE_REACHED = "Maximum quote size reached.";
export const EDIT_JOB_ALERT_MESSAGE =
  "You are about to edit this quote. Making changes will set the quote status to ‘In Progress’. You will need to resend the quote to your customer. Do you want to continue?";
export const EDIT_JOB_ALERT_TITLE = "Edit quote?";
export const RELATED_PRODUCTS = "Related Products";
export const RELATED_PRODUCTS_SUBTITLE = "Products that should be purchased with this item";
export const SO1_DESCRIPTION_LINK_MSG = "Your order contains items that are sourced directly from the supplier or another branch, you will";
export const DELIVERY_REQUEST_DESCRIPTION_MESSAGE =
  "Please select your preferred delivery option below. This is a request and delivery costs will be confirmed on callback.";
export const SO1_CART_DESC_LINK_MSG = "These items that are sourced directly from the supplier or another branch, you will";
export const SO1_DESCRIPTION_LINK_MSG1 = "not be charged today for these items.";
export const LEARN_MORE = "Learn more.";
export const DIRECT_FROM_SUPPLIER = "Direct from Supplier";
export const CART_PAY_ON_CALL_SUB_TITLE = "Following a callback (Pay on Callback) a payment link will be provided to confirm purchase of the following:";

export const GENERIC_MESSAGE_POPUP = (buttons: AlertButton[] = ALERT_BUTTONS, options?: AlertOptions) =>
  Alert.alert(titleGenericError, genericErrorMessage, buttons, options);
export const QUESTION_MESSAGE_LAUNCH_SCREEN = "Do you have a Trade Account (Charge or Cash) and are you new to the Trade App?";
export const CLICK_TO_REGISTER = "Click here to Register";
export const ALREADY_USER_MESSAGE_LAUNCH_SCREEN = "Already registered on the app?";
export const ACCOUNT_LINKER_MESSAGE_LAUNCH_SCREEN = "Don’t have an account?";
export const CLICK_HERE = "Click here";
export const LAUNCH_SCREEN_MESSAGE = "The PlaceMakers Trade App is only available for customers with registered Trade charge or Trade cash account";

// This logic is used to check the error message when AuthO user cancel the session
export const isAuth0UserCancel = R.ifElse(
  RA.isNilOrEmpty,
  R.always(false),
  R.compose(R.includes(R.__, ["a0.session.user_cancelled", "a0.state.invalid"]), R.head, R.values, R.pick(["error", "name"])),
);

export enum ERROR_ELEMENTS {
  ERROR_GENERIC_ELEMENT = "ERROR_GENERIC_ELEMENT",
  ERROR_503_ELEMENT = "ERROR_503_ELEMENT",
}

export const getModalContent = (element: any) => {
  switch (element) {
    case ERROR_ELEMENTS.ERROR_GENERIC_ELEMENT:
      return ERROR_GENERIC_ELEMENT;
    case ERROR_ELEMENTS.ERROR_503_ELEMENT:
      return ERROR_503_ELEMENT;
    default:
      return null;
  }
};
// This is generic error message with email
export const ERROR_GENERIC_ELEMENT = (
  <Text
    style={{
      alignSelf: "flex-start",
      marginBottom: 20,
      fontFamily: Fonts.type.OpenSansRegular,
      fontSize: 14,
      color: Colors.wedgeBlue,
    }}
  >
    {genericErrorMessageWithoutEmail}
    <Text style={{ color: Colors.facebook }} onPress={() => Linking.openURL(`mailto:${AppConfig.SUPPORT_EMAIL}`)}>
      {"\n" + AppConfig.SUPPORT_EMAIL}
    </Text>
  </Text>
);

// This error message used when there is a server unavailability or there is a problem from server side
export const ERROR_503_ELEMENT = (
  <Text
    style={{
      alignSelf: "flex-start",
      marginBottom: 20,
      ...Fonts.style.subtitleLowlight,
    }}
  >
    Service unavailable, try again later. If the problem persists, please contact
    <Text style={{ color: Colors.facebook }} onPress={() => Linking.openURL(`mailto:${AppConfig.SUPPORT_EMAIL}`)}>
      {"\n" + AppConfig.SUPPORT_EMAIL}
    </Text>
  </Text>
);

export const showAlertToClearCart = (onPress: () => void, isEstimate = false, dispatchAlert) => {
  dispatchAlert?.({
    heading: isEstimate ? TITLE_CHANGE_ESTIMATE : TITLE_CHANGE_ACCOUNT,
    msg: isEstimate ? MESSAGE_CHANGE_ESTIMATE : MESSAGE_CHANGE_ACCOUNT,
    visible: true,
    button1Text: "OK",
    button2Text: "Cancel",
    onButton1Press: () => {
      dispatchAlert?.({ visible: false });
      onPress();
    },
    onButton2Press: () => dispatchAlert?.({ visible: false }),
  });
};

export const productNamePH = "Enter name of product";
export const pricePH = "Enter GST exclusive price";
export const descriptionPH = "Product description";
export const uomPH = "Enter UOM e.g LM or Roll";
export const quantityPH = "Quantity";
export const customerNamePH = "Customer name";
export const phoneNumberPH = "Phone number";
export const addressPH = "Address";
export const emailPH = "Email";

export const showAlertMessage = (title: string, subTitle: string, dispatchAlert) => {
  dispatchAlert?.({
    heading: title,
    msg: subTitle,
    visible: true,
    button1Text: OKButton,
    onButton1Press: () => {
      dispatchAlert?.({ visible: false });
    },
  });
};

export const BoldText = ({ children }) => {
  return <Text style={{ fontFamily: Fonts.type.OpenSansBold, fontSize: 12 }}>{children}</Text>;
};
