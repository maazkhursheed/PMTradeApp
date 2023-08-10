import { firebase } from "@react-native-firebase/analytics";
import { useNavigation } from "@react-navigation/native";
import { Button } from "native-base";
import * as React from "react";
import { Keyboard, Modal, Platform, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import LoadingView from "~root/Components/LoadingView";
import { showAlertMessage } from "~root/Lib/AlertsHelper";
import { getBranchTownRegion } from "~root/Lib/BranchHelper";
import { isNotNilOrEmpty } from "~root/Lib/CommonHelper";
import { accessibility, getSelectedAccountId, occludeSensitiveView } from "~root/Lib/DataHelper";
import { useKeyboard } from "~root/Lib/KeyboardHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { isInvalidEmailPresent } from "~root/Lib/StringHelper";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import { Colors } from "~root/Themes";
import colors from "~root/Themes/Colors";
import STCHeader from "../STCHeader/STCHeader";
import QuoteAttachmentFooter from "./QuoteAttachmentFooter/QuoteAttachmentFooter";
import QuoteEmailSection from "./QuoteEmailSection/QuoteEmailSection";
import QuoteEmailSubject from "./QuoteEmailSubject/QuoteEmailSubject";
import styles from "./SendQuoteEmailSheetStyles";

interface OwnProps {
  sheetState: SheetState;
  sheetCloseTapped: () => void;
}

type Props = OwnProps;

const SendQuoteEmailSheet: React.SFC<Props> = ({ sheetState, sheetCloseTapped }: Props) => {
  const { quoteMedia, quoteDetails, isQuoteAttached, isLoading, userId, selectedBranch, state, labourAndOtherCost } = useSelector((state: RootState) => ({
    quoteDetails: state?.quotes?.quotesListDetails,
    labourAndOtherCost: state?.quotes?.quotesListDetails?.otherCostPrice?.value,
    isQuoteAttached: state?.quotes?.viewQuote?.url,
    isLoading: state?.quotes?.fetching,
    userId: state?.login?.tempToken?.idToken,
    selectedBranch: state?.branchList?.selectedBranch,
    quoteMedia: state?.quotes?.quoteMedia?.quoteMedia,
    state,
  }));
  const [toEmails, setToEmails] = React.useState<string[]>(isNotNilOrEmpty(quoteDetails?.consumerAddress?.email) ? [quoteDetails?.consumerAddress?.email] : []);
  const [ccEmails, setCcEmails] = React.useState<string[]>([]);
  const [subject, setSubject] = React.useState(quoteDetails?.jobName ? "Estimate/Quote " + quoteDetails.jobName : "");
  const [body, setBody] = React.useState("");
  const [containsInvalidEmail, setContainsInvalidEmail] = React.useState(false);
  const { keyboardHeight } = useKeyboard();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { dispatchAlert } = useCustomAlert();
  const prePopulateData = React.useCallback(() => {
    if (quoteDetails?.consumerAddress?.email) {
      setToEmails([quoteDetails?.consumerAddress?.email]);
    }
    if (quoteDetails?.jobName) {
      setSubject("Estimate/Quote " + quoteDetails.jobName);
    }
  }, []);

  React.useEffect(prePopulateData, [quoteDetails]);

  React.useEffect(() => {
    setContainsInvalidEmail(isInvalidEmailPresent([...toEmails, ...ccEmails]));
  }, [toEmails, ccEmails]);

  const isSendButtonDisabled = React.useCallback(() => toEmails.length === 0 || containsInvalidEmail, [toEmails, containsInvalidEmail]);

  const cancelPressed = () => {
    prePopulateData();
    setCcEmails([]);
    setBody("");
    sheetCloseTapped();
    Keyboard.dismiss();
  };
  const sendToCustomerQuoteAnalytics = React.useCallback((event: any, isFileSend: boolean) => {
    const params = {
      event,
      step: 2,
      step_label: "Quote Send Complete",
      device_type: Platform.OS,
      userId: extractDigitalIdFromJWTPayload(decodeJWTToken(userId)) as string,
      accountId: getSelectedAccountId(state),
      location: getBranchTownRegion(selectedBranch),
      quoteId: quoteDetails.code,
      quote_total: quoteDetails.totalPrice.value,
      quote_markup: quoteDetails.markupPrice.value,
      quote_materials: quoteDetails.materialPrice.value,
      quote_labour: labourAndOtherCost,
      quote_gst: quoteDetails.totalTax.value,
    };

    const paramsFile = {
      ...params,
      file_count:
        quoteMedia?.filter((data: { mime: string; mediaSelected: string }) => {
          return data.mime !== "image/jpg" && data.mime !== "image/png" && data.mime !== "image/jpeg" && data.mediaSelected === "true";
        })?.length || 0,
      image_count:
        (quoteMedia?.filter((data: { mime: string; mediaSelected: string }) => {
          return data.mime === "image/png" && data.mediaSelected === "true";
        })?.length || 0) +
        (quoteMedia?.filter((data: { mime: string; mediaSelected: string }) => {
          return data.mime === "image/jpeg" && data.mediaSelected === "true";
        })?.length || 0) +
        (quoteMedia?.filter((data: { mime: string; mediaSelected: string }) => {
          return data.mime === "image/jpg" && data.mediaSelected === "true";
        })?.length || 0),
    };
    firebase.analytics().logEvent(event, isFileSend ? paramsFile : params);
  }, []);

  const sendQuote = () => {
    Keyboard.dismiss();
    dispatch(
      QuotesActions.sendEmailQuote(
        {
          urlParams: { quoteId: quoteDetails.code },
          bodyParams: {
            toAddress: toEmails.toString().replace(/,/g, ";"),
            ccAddress: ccEmails.toString().replace(/,/g, ";"),
            subject,
            body,
          },
        },
        {
          onSuccess: () => {
            sheetCloseTapped();
            setToEmails([]);
            setSubject("");
            sendToCustomerQuoteAnalytics("quote_send", false);
            sendToCustomerQuoteAnalytics("quote_file_send", true);
            navigation.navigate("SendQuoteSuccessContainer");
          },
          onFailure: () => {
            showAlertMessage("", "Oops, something went wrong. Please try again.", dispatchAlert);
          },
        },
      ),
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={sheetState === SheetState.EXPANDED}>
      <View style={styles.modalContainer}>
        <BottomSheet
          content={
            <>
              <STCHeader
                title={"Email Quote"}
                titleStyle={styles.titleStyle}
                style={[
                  {
                    backgroundColor: sheetState === SheetState.EXPANDED ? Colors.darkBlue : Colors.cloud,
                  },
                ]}
                leftItem={
                  <Button transparent={true} onPress={cancelPressed} {...accessibility("cancelButton")}>
                    <Text style={styles.cancelStyle}>{"Cancel"}</Text>
                  </Button>
                }
                rightItem={
                  <Button transparent={true} {...accessibility("SendButton")} disabled={isSendButtonDisabled()} onPress={sendQuote}>
                    <Text style={isSendButtonDisabled() ? styles.buttonDisabled : styles.sendStyle}>{"Send"}</Text>
                  </Button>
                }
              />
              <LoadingView style={styles.loadingView} isLoading={isLoading} hideViewOnLoading={false}>
                <KeyboardAwareScrollView
                  keyboardShouldPersistTaps={"handled"}
                  style={styles.contentContainer}
                  enableOnAndroid
                  extraScrollHeight={Platform.select({ android: 150, ios: 0 })}
                >
                  <Text style={styles.heading}>{quoteDetails.jobName}</Text>
                  <QuoteEmailSection
                    emailSectionLabel="To:"
                    emails={toEmails}
                    addEmail={email => setToEmails([...toEmails, email])}
                    onRemoveEmail={(removeIndex: number) => setToEmails(toEmails.filter((email, index) => index !== removeIndex))}
                  />
                  <QuoteEmailSection
                    emailSectionLabel="Cc:"
                    emails={ccEmails}
                    addEmail={email => setCcEmails([...ccEmails, email])}
                    onRemoveEmail={(removeIndex: number) => setCcEmails(ccEmails.filter((email, index) => index !== removeIndex))}
                  />
                  <QuoteEmailSubject subject={subject} setSubject={setSubject} />
                  <TextInput
                    ref={occludeSensitiveView}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={[styles.body, { paddingBottom: Platform.select({ android: keyboardHeight, ios: 0 }) }]}
                    value={body}
                    selectionColor={colors.lightBlue}
                    onChangeText={setBody}
                    multiline={true}
                  />
                </KeyboardAwareScrollView>
                {isQuoteAttached && <QuoteAttachmentFooter />}
              </LoadingView>
            </>
          }
          sheetState={sheetState}
        />
      </View>
      <View style={styles.modalFooter} />
    </Modal>
  );
};

export default SendQuoteEmailSheet;
