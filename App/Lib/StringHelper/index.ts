import * as R from "ramda";
import * as RA from "ramda-adjunct";
import { Platform } from "react-native";
import { EnumQuoteType } from "~root/Lib/QuoteHelper";

/**
 *
 * @param phone Phone number to be formatted.
 * @description formats and returns the given number by adding + at the beginning and adds first space after two digits
 * second space after four digits third space after 7 digits.
 */

export const formatPhoneNumber = (phone: string) => {
  if (phone) {
    phone = stripNonNumbers(phone);
    const clean = phone.replace(/\D+/g, "").match(/([^\d]*\d[^\d]*){1,12}$/);

    if (clean) {
      let match = clean[0];
      if (match.substring(0, 2) === "64") {
        match = match.substring(2, match.length);
      }
      if (match.substring(0, 1) !== "0") {
        match = "0" + match;
      }
      const part1 = match.length > 3 ? `${match.substring(0, 3)}` : match;
      const part2 = match.length > 3 ? ` ${match.substring(3, 6)}` : "";
      const part3 = match.length > 4 ? ` ${match.substring(6, 11)}` : "";
      return `${part1}${part2}${part3}`;
    } else {
      return phone;
    }
  } else {
    return "";
  }
};

/**
 *
 * @param phone Phone number to be formatted.
 * @description formats the given number based on the length of the number. If length is less than 7 or greater than 11, then the number
 * is returned as is, otherise it will format the number in readable form.
 */

export const formatNumber = (phone: string) => {
  if (phone) {
    phone = stripNonNumbers(phone);
    if (phone.length < 7 || phone.length > 11) {
      return phone;
    } else {
      return phone.length === 11 ? phone.toString().replace(/((\d{3})(?=(\d{3,})))/g, "$1 ") : phone.toString().replace(/((\d{3})(?=(\d{2,})))/g, "$1 ");
    }
  } else {
    return "";
  }
};

/**
 * @description removes all non numeric characters from a given string
 */

export const stripNonNumbers = (phNumber: string) => R.replace(/[^\d]/g, "")(phNumber || "");

/**
 * @description validates the email from given string
 */

export const validateEmail = (text: string) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(text) && text.length !== 0;
};

/**
 * @description returns true if contains invalid email
 */

export const isInvalidEmailPresent = (emails: string[]) => emails.reduce((acc, emailItem) => !validateEmail(emailItem) || acc, false);

/**
 * @description validates the phone number from given string
 */

export const validatePhone = (text: string) => {
  const phoneRegex = /^([0-9]){7,11}$/;
  return phoneRegex.test(text.replace(/\s/g, "")) && text.length !== 0;
};

export const validateContactPhone = (text: string) => {
  const phoneRegex = /^([0-9]){10,11}$/;
  return phoneRegex.test(text) && text.length !== 0;
};

export const validatePhoneHybris = (text: string) => {
  const hybrisRegex = /^[+]?(64|0)2\\d ?\\d{3,4} ?\\d{3,4}$/;
  return hybrisRegex.test(text) && text.length !== 0;
};

/**
 * @description validates the user name from given string
 */

export const validateUserName = (text: string) => {
  const userNameRegex = /^(?!\d*$)[a-z\d ]*$/i;
  return text && userNameRegex.test(text) && text.length !== 0;
};
/**
 * @description validates the creditLimit from given string
 */

export const validateCreditLimit = text => /(\$ )?[\d]+$/.test(text);

/**
 * @description validates the full Name from given string
 */
export const validateFullName = (text: string) => {
  const regex = /^[a-zA-Z ]+$/;
  return regex.test(text);
};

/**
 * @description validates the SurName from given string
 */
export const validateSurName = (text: string) => {
  const regex = Platform.OS === "ios" ? /^[a-zA-Z ‘’'\-]+$/ : /^[a-zA-Z '\-]+$/;
  return regex.test(text);
};

/**
 * @description validates the product order number from given string
 */
export const validatePONumber = (text: string) => {
  const poRegex = Platform.OS === "ios" ? /^\S[ A-Za-z0-9.,‘’'/!&:\-]*$/ : /^\S[ A-Za-z0-9.,'/!&:\-]*$/;
  return poRegex.test(text);
};

/**
 * @description validates the product order number for stc from given string
 */
export const validateSTCPONumber = (text: string) => {
  const poRegex = Platform.OS === "ios" ? /^[ A-Za-z0-9.‘’'/!&:;\-]*$/ : /^[ A-Za-z0-9.'/!&:\-]*$/;
  return poRegex.test(text);
};

export const generateURIfromObject = R.compose(R.join("&"), R.map(R.join("=")), R.reject(R.compose(RA.isNilOrEmpty, R.last)), R.toPairs);

export const convertToString = R.ifElse(R.compose(R.equals("String"), R.type), R.identity, R.toString);

export const getInitials: (name: string) => string = R.compose(
  R.toUpper,
  R.join(""),
  R.map(R.head),
  array => (array.length > 1 ? [R.head(array), R.last(array)] : [R.head(array)]),
  R.split(" "),
  R.ifElse(R.isNil, R.always(""), R.identity),
);

/**
 * Create a url encoded string for the last path only
 * @param url
 */
export const generateUrlEncoded = url => {
  const splittedSource = R.split("/", url);
  const lastParam = R.compose(encodeURI, R.last)(splittedSource);
  return R.compose(R.join("/"), R.flip(R.concat)([lastParam]), R.dropLast(1))(splittedSource);
};

export const showAlert = (dispatchAlert, alertTitle: string, alertMessage: string, buttonText: string, buttonPress?: () => void, isCancelButton?: boolean) => {
  dispatchAlert?.({
    heading: alertTitle,
    msg: alertMessage,
    visible: true,
    button1Text: buttonText ? buttonText : "OK",
    button2Text: isCancelButton && "Cancel",
    onButton1Press: () => {
      dispatchAlert?.({ visible: false });
      buttonPress();
    },
    onButton2Press: () => {
      if (isCancelButton) {
        dispatchAlert?.({ visible: false });
      }
    },
  });
};

export const quoteJobDetailsText =
  "Cras justo odio, dapibus ac facilisis in, egestas eget quam. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.";

export const isFormValid = (firstName: string, phoneNumber: string, email: string) => {
  return firstName?.length > 2 && validateContactPhone(stripNonNumbers(phoneNumber)) && (email === "" || validateEmail(email));
};

export const tradeAccountConnectPageLoad = "Trade Account Connect Page Load";
export const tradeAccountConnectSubmit = "Trade Account Connect Submit";
export const registrationStart = "Registration Start";
export const updateWithLatestPrice = "Update with latest prices";
export const updatedPrice = "Update pricing";
export const materialPriceUpdated = "Material prices updated!";
export const Materials = "Materials:";

export function validURL(str: string) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i",
  ); // fragment locator
  return pattern.test(str);
}

export const getUrlExtension = (url: string) => R.compose(R.last, R.split("."), getFileName)(url);

export const getFileName = (url: string) =>
  R.compose(
    R.ifElse(
      R.anyPass([RA.isNilOrEmpty, R.complement(validURL)]), // Condition for empty url or invalid url
      R.always(""), // Always return empty if invalid
      R.compose(R.last, R.split("/"), R.head, R.split("?")), // Split query parameter if any take the first item then split the path of url and take the last item
    ),
  )(url);

export const quotesWonText = "Won jobs can be viewed but are uneditable.";
export const quotesLostText = "Lost jobs can be viewed but are uneditable.";

export const isWonOrLostQuote = (status: string) => {
  return status === EnumQuoteType.Won || status === EnumQuoteType.Lost || status === EnumQuoteType.Integrated;
};

export const isConstrained = (products: any) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].product?.pmExclusive) {
      return true;
    }
  }
};

export const displayOptionsText = "Edit visibility of costs, material sections, and attachment types in the quote.";

export const getSOBMaterialList = R.compose(R.flatten, R.map(R.prop("entries")), R.path(["pmQuoteSobList"]));

// validate image name in quotes that accepts letters, numbers and some special characters except these \ / : * ? ” < > |
export const validateImageName = (text: string) => {
  const poRegex = /^((?![\\/:*?"<>|“”]).)*$/;
  return poRegex.test(text) /**/;
};

export const getInTouch = "Get in touch";
export const gotConfirmation = "We’ve got your order and have sent confirmation to";
export const confirmationProgress = "See all the details and follow the progress of your order in real time in the ‘My Orders’ tab.";
export const wishToContact = "If you wish to cancel your order or have any questions, please contact your branch.";
export const note =
  " - your order may not appear in the ‘My Orders’ tab right away as there could be a small delay while this order is entered through the system.";
