import { useCallback, useEffect, useState } from "react";
import { Alert, Dimensions, Keyboard, Platform } from "react-native";
import UXCam from "react-native-ux-cam";
import { useDispatch, useSelector } from "react-redux";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import { Colors } from "~root/Themes";
import { getFileNameWithoutExtension } from "../DataHelper";

export const removeQuoteItem = () => {
  return new Promise((resolve, reject) => {
    Keyboard.dismiss();
    setTimeout(() => {
      UXCam.setAutomaticScreenNameTagging(false);
      Alert.alert(
        "",
        "Are you sure you want to remove this item?",
        [
          {
            text: "Yes",
            onPress: resolve,
          },
          {
            text: "Cancel",
            onPress: reject,
          },
        ],
        { cancelable: false },
      );
    }, 50);
  });
};

export enum EnumQuoteType {
  All = "All",
  InProgress = "CREATED",
  NotSent = "NOTSENT",
  Pending = "PENDING",
  Won = "WON",
  Integrated = "INTEGRATED",
  Lost = "LOST",
}

export const useQuoteIsPending = () => {
  const { quoteDetails } = useSelector((state: RootState) => ({
    quoteDetails: state.quotes?.quotesListDetails,
  }));

  return quoteDetails?.status === EnumQuoteType.Pending;
};

export const useQuoteIsNotSent = () => {
  const { quoteDetails } = useSelector((state: RootState) => ({
    quoteDetails: state.quotes?.quotesListDetails,
  }));

  return quoteDetails?.status === EnumQuoteType.NotSent;
};

export const useQuoteStatusDisabled = () => {
  const { quoteDetails } = useSelector((state: RootState) => ({
    quoteDetails: state.quotes?.quotesListDetails,
  }));

  return !(quoteDetails?.status === EnumQuoteType.InProgress || quoteDetails?.status === EnumQuoteType.NotSent);
};

export const useQuoteStatusChecker = () => {
  const { quoteDetails } = useSelector((state: RootState) => ({
    quoteDetails: state?.quotes?.quotesListDetails,
  }));
  const dispatch = useDispatch();
  const { dispatchAlert } = useCustomAlert();

  return (confirm: () => void, cancel?: () => void) => {
    if (quoteDetails?.status === EnumQuoteType.Pending) {
      dispatchAlert?.({
        heading: "Edit this quote?",
        msg: "You are about to edit this quote. Making changes will set the quote status to ‘In Progress’. You will need to resend the quote to your customer. Do you want to continue?",
        iconColor: Colors.darkBlueHeader,
        iconName: "edit",
        visible: true,
        button1Color: Colors.darkBlueHeader,
        button1Text: "Confirm",
        button2Text: "Cancel",
        onButton1Press: () => {
          dispatch(
            QuotesActions.changeQuoteStatus(
              { quoteId: quoteDetails?.code, status: EnumQuoteType.NotSent },
              {
                onSuccess: () => {
                  if (confirm) {
                    confirm();
                  }
                  dispatchAlert?.({ visible: false });
                },
                onFailure: () =>
                  dispatchAlert?.({
                    visible: true,
                    heading: "Something went wrong!",
                    msg: "Oops, something went wrong. Please try again.",
                    button1Text: "OK",
                    onButton1Press: () => dispatchAlert?.({ visible: false }),
                  }),
              },
            ),
          );
        },
        onButton2Press: () => {
          dispatchAlert?.({ visible: false });
          if (cancel) {
            cancel();
          }
        },
      });
    } else if (quoteDetails?.status === EnumQuoteType.InProgress || quoteDetails?.status === EnumQuoteType.NotSent) {
      confirm();
    }
  };
};

export const useQuoteWonOrLostStatus = () => {
  const { quoteDetails } = useSelector((state: RootState) => ({
    quoteDetails: state.quotes?.quotesListDetails,
  }));

  return quoteDetails?.status === EnumQuoteType.Won || quoteDetails?.status === EnumQuoteType.Lost || quoteDetails?.status === EnumQuoteType.Integrated;
};

export const useQuoteInProgressStatus = () => {
  const { quoteDetails } = useSelector((state: RootState) => ({
    quoteDetails: state.quotes?.quotesListDetails,
  }));

  return quoteDetails?.status === EnumQuoteType.NotSent || quoteDetails?.status === EnumQuoteType.InProgress;
};

export const useTabBar = (navigation: any, display: string, level: number) => {
  return level
    ? navigation.getParent()?.setOptions({
        tabBarStyle: { display },
      })
    : navigation.getParent()?.getParent()?.setOptions({
        tabBarStyle: { display },
      });
};

export const isIphone11orMini = () => {
  const dimen = Dimensions.get("window");
  return Platform.OS === "ios" && !Platform.isPad && !Platform.isTVOS && (dimen.height === 896 || dimen.height === 812);
};

export const useFileNameHelper = (mediaItem: any) => {
  const getFileName = useCallback(() => {
    if (mediaItem.type !== "image/jpeg" && mediaItem.type !== "image/png" && mediaItem.type !== "image/jpg") {
      return mediaItem.name;
    }
    return getFileNameWithoutExtension(mediaItem.name);
  }, [mediaItem]);
  return getFileName();
};

export const getFileExtension = (fileName: string) => {
  let indexOfDot = fileName.lastIndexOf(".");
  return fileName.substring(indexOfDot + 1, fileName.length);
};

export const useIconNameHelper = (mediaItem: any) => {
  const getIconName = useCallback(() => {
    switch (getFileExtension(mediaItem.name)) {
      case "pdf":
        return "file-pdf1";
      case "zip":
        return "file-zip";
      case "doc":
      case "docx":
        return "file-word";
      case "xls":
      case "xlsx":
        return "file-excel";
      case "ppt":
      case "pptx":
        return "file-powerpoint";
      case "mov":
      case "mp4":
      case "wmv":
      case "avi":
        return "file-video";
      case "dwg":
        return "file-cad";
      case "txt":
        return "file-notepad";
      case "numbers":
      case "num":
        return "file-numbers";
      case "pages":
        return "file-pages";
      case "keynote":
      case "key":
        return "file-keynote";
      case "csv":
        return "file-csv";
      default:
        return "file-attachment";
    }
  }, [mediaItem]);

  return getIconName();
};

export const useCashCustomerStatus = () => {
  const { selectedTradeAccount } = useSelector((state: RootState) => ({
    selectedTradeAccount: state.connectTrade?.selectedTradeAccount,
  }));
  const [CashCustomerStatus, setCashCustomerStatus] = useState(false);

  useEffect(() => {
    setCashCustomerStatus(selectedTradeAccount?.accountTypeEnum === "CASH" ? true : false);
  }, [selectedTradeAccount]);
  return { CashCustomerStatus };
};

export const SpecialProductStatus = (item: any) => {
  return (
    !item?.PmExclusive &&
    (item?.display === "SPECIAL" || item?.specialProdWithAlphaSkuFlag || Number(item?.Price) <= 0.01 || Number(item?.price?.value) <= 0.01)
  );
};

export const SpecialProductStatusCart = (item: any, basePrice?: any) => {
  return (
    !item?.pmExclusive &&
    (item?.display === "SPECIAL" ||
      item?.specialProdWithAlphaSkuFlag ||
      Number(item?.Price) <= 0.01 ||
      Number(item?.price?.value) <= 0.01 ||
      Number(basePrice) <= 0.01)
  );
};
