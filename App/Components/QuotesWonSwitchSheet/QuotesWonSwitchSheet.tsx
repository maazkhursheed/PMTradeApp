import { firebase } from "@react-native-firebase/analytics";
import { useNavigation } from "@react-navigation/native";
import { Button } from "native-base";
import * as React from "react";
import { useState } from "react";
import { Image, Platform, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import CustomIcon from "~root/Components/CustomIcon";
import LoadingView from "~root/Components/LoadingView";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import {
  cancelBtnTxt,
  confirmBtnTxt,
  JOB_LOST_CONFRIMATION,
  JOB_LOST_DESCRIPTION,
  JOB_LOST_DESCRIPTION_MESSAGE,
  JOB_STATUS_ERROR,
  JOB_WON_CONFIRMATION,
  JOB_WON_DESCRIPTION,
  JOB_WON_DESCRIPTION_MESSAGE1,
  JOB_WON_DESCRIPTION_MESSAGE2,
  JOB_WON_DESCRIPTION_MESSAGE3,
  OKButton,
} from "~root/Lib/AlertsHelper";
import { getBranchName, getBranchTownRegion, sanitizeBranches } from "~root/Lib/BranchHelper";
import { accessibility, addOcclusionForTextFields, getSelectedAccountId, removeOcclusionFromTextFields, tagScreenName } from "~root/Lib/DataHelper";
import { getLabourAndOtherCostsTotal } from "~root/Lib/LabourSectionHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { EnumQuoteType } from "~root/Lib/QuoteHelper";
import { showAlert } from "~root/Lib/StringHelper";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import { Images } from "~root/Themes";
import { EnumQuotesStatusType } from "../QuotesInfo/QuotesStatusSegment";
import styles from "./QuotesWonSwitchSheetStyle";

interface OwnProps {
  sheetState: SheetState;
  sheetCloseTapped: () => void;
  jobStatus: EnumQuotesStatusType;
}

type Props = OwnProps;

const QuotesWonSwitchSheet: React.SFC<Props> = ({ sheetState, sheetCloseTapped, jobStatus }: Props) => {
  const { fetching, quoteDetails, selectedBranch, state, userId, labourAndOtherCost } = useSelector((state: RootState) => ({
    fetching: state.quotes.fetching,
    quoteDetails: state.quotes.quotesListDetails,
    selectedBranch: sanitizeBranches([state.branchList.selectedBranch])[0],
    labourAndOtherCost: state.quotes.labourOtherCost?.otherCostList,
    isQuoteAttached: state.quotes.viewQuote?.url,
    isLoading: state.quotes.fetching,
    userId: state.login?.tempToken?.idToken,
    state,
  }));

  const [sheetInternalState, setSheetInternalState] = useState(sheetState);
  const jobStatusWon = jobStatus === EnumQuotesStatusType.Won;
  const { dispatchAlert } = useCustomAlert();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const sendQuoteWonLostAnalytics = React.useCallback((event: any) => {
    const params = {
      event,
      device_type: Platform.OS,
      userId: extractDigitalIdFromJWTPayload(decodeJWTToken(userId)) as string,
      accountId: getSelectedAccountId(state),
      location: getBranchTownRegion(selectedBranch),
      quoteId: quoteDetails?.code,
      quote_total: quoteDetails?.totalPrice?.value,
      quote_markup: quoteDetails?.markupPrice?.value,
      quote_materials: quoteDetails?.materialPrice?.value,
      quote_labour: getLabourAndOtherCostsTotal(labourAndOtherCost),
      quote_gst: quoteDetails?.totalTax?.value,
    };
    firebase.analytics().logEvent(event, params);
  }, []);

  const onCloseSheetTapped = React.useCallback(() => {
    EnumQuotesStatusType.Won ? sendQuoteWonLostAnalytics("quote_won") : sendQuoteWonLostAnalytics("quote_lost");
    navigation.navigate("Jobs", {
      navParam: {
        selectedQuote:
          jobStatus === EnumQuotesStatusType.Won ? EnumQuoteType.Won : jobStatus === EnumQuotesStatusType.Lost ? EnumQuoteType.Lost : EnumQuoteType.InProgress,
      },
    });
    setSheetInternalState(SheetState.CLOSED);
    sheetCloseTapped();
    removeOcclusionFromTextFields();
  }, [navigation, sheetCloseTapped, jobStatus]);

  React.useEffect(() => {
    setSheetInternalState(sheetState);
  }, [sheetState]);

  React.useEffect(() => {
    if (sheetInternalState === SheetState.EXPANDED) {
      tagScreenName("Job Status Screen");
      addOcclusionForTextFields();
    }
  }, [sheetInternalState]);

  const updateJobStatusDetails = React.useCallback(() => {
    dispatch(
      QuotesActions.updateQuoteJobStatus(
        {
          urlParams: { quoteId: quoteDetails?.code },
          bodyParams: {
            status: jobStatus === EnumQuotesStatusType.Won ? "WON" : jobStatus === EnumQuotesStatusType.Lost ? "LOST" : "NOTSENT",
          },
        },
        {
          onSuccess: onCloseSheetTapped,
          onFailure: () => {
            showAlert(dispatchAlert, "", JOB_STATUS_ERROR, OKButton);
          },
        },
      ),
    );
  }, [onCloseSheetTapped, dispatch, jobStatus, quoteDetails?.code]);

  const jobWonText = () => {
    return (
      <>
        <View style={styles.iconContainer}>
          <CustomIcon name={"tick"} style={styles.icon} />
        </View>
        <View style={styles.infoTextItem}>
          <Text style={styles.textItem}>{`${JOB_WON_DESCRIPTION} ${quoteDetails?.jobName ?? ""}!`}</Text>
          <Text style={styles.textRegularItem}>{JOB_WON_DESCRIPTION_MESSAGE1}</Text>
          <Text style={styles.textRegularItem}>{`${JOB_WON_DESCRIPTION_MESSAGE2} ${getBranchName(selectedBranch) ?? ""} ${JOB_WON_DESCRIPTION_MESSAGE3}`}</Text>
          <Text style={styles.textItem}>{JOB_WON_CONFIRMATION}</Text>
        </View>
      </>
    );
  };

  const jobLostText = () => {
    return (
      <>
        <View style={styles.iconAlertContainer}>
          <Image source={Images.alertIcon} resizeMode={"contain"} />
        </View>
        <View style={styles.infoTextItem}>
          <Text style={styles.textItem}>{`${JOB_LOST_DESCRIPTION} ${quoteDetails?.jobName ?? ""}.`}</Text>
          <Text style={styles.textRegularItem}>{JOB_LOST_DESCRIPTION_MESSAGE}</Text>
          <Text style={styles.textItem}>{JOB_LOST_CONFRIMATION}</Text>
        </View>
      </>
    );
  };

  return (
    <>
      <BottomSheet
        content={
          <LoadingView style={styles.contentContainer} isLoading={fetching} hideViewOnLoading={false}>
            <STCHeader
              title={jobStatusWon ? "Job Won" : "Job Lost"}
              titleStyle={styles.headerTitleStyle}
              leftItem={
                <Button transparent={true} onPress={sheetCloseTapped} {...accessibility("leftItemBtn")}>
                  <Text style={styles.cancelStyle}>{cancelBtnTxt}</Text>
                </Button>
              }
              rightItem={
                <Button transparent={true} onPress={updateJobStatusDetails} {...accessibility("rightItemBtn")}>
                  <Text style={styles.confirmButton}>{confirmBtnTxt}</Text>
                </Button>
              }
            />
            <View style={styles.headerBorder} />
            <View style={styles.infoItem}>{jobStatusWon ? jobWonText() : jobLostText()}</View>
          </LoadingView>
        }
        sheetState={sheetInternalState}
      />
    </>
  );
};

export default QuotesWonSwitchSheet;
