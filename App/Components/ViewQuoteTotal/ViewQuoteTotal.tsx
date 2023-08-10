import { firebase } from "@react-native-firebase/analytics";
import * as React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { PendoSDK } from "rn-pendo-sdk";
import { getBranchTownRegion } from "~root/Lib/BranchHelper";
import { isNilOrEmpty } from "~root/Lib/CommonHelper";
import { getSelectedAccountId } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { useAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import Fonts from "~root/Themes/Fonts";
import { QuotesActions } from "../../Reducers/QuotesReducer/index";
import { SheetState } from "../BottomSheet/BottomSheet";
import { FeatureKeys, useFeatureToggleChangeNotifier } from "../FeatureToggle/FeatureToggle";
import PriceComponent from "../PriceComponent/index";
import SendQuoteEmailSheet from "../SendQuoteEmailSheet/SendQuoteEmailSheet";
import styles from "./ViewQuoteTotalStyle";

const ViewQuoteTotal: React.SFC = ({ navigation }) => {
  const dispatch = useDispatch();
  const { quotesDetails, pdfDetails, userId, state, selectedBranch } = useSelector((state: RootState) => ({
    quotesDetails: state.quotes.quotesListDetails,
    pdfDetails: state.quotes.viewQuote,
    userId: state.login?.tempToken?.idToken,
    selectedBranch: state.branchList.selectedBranch,
    state,
  }));

  const sendToCustomerQuoteAnalytics = React.useCallback((event: any) => {
    const params = {
      event,
      step: 1,
      step_label: "Quote Send Start",
      device_type: Platform.OS,
      userId: extractDigitalIdFromJWTPayload(decodeJWTToken(userId)) as string,
      accountId: getSelectedAccountId(state),
      location: getBranchTownRegion(selectedBranch),
      quoteId: quotesDetails.code,
    };
    firebase.analytics().logEvent(event, params);
  }, []);

  const [sheetState, setSheetState] = React.useState(SheetState.CLOSED);
  const { append } = useAppender();
  useFeatureToggleChangeNotifier(FeatureKeys.QuotesSelector, () => setSheetState(SheetState.CLOSED));
  React.useEffect(() => {
    append(<SendQuoteEmailSheet sheetState={sheetState} sheetCloseTapped={() => setSheetState(SheetState.CLOSED)} />, "SendQuoteEmailSheet", 0);
  }, [sheetState]);
  React.useEffect(() => {
    dispatch(QuotesActions.requestViewQuote({ quoteId: quotesDetails.code }, {}));
  }, []);

  React.useEffect(() => {
    return () => {
      dispatch(QuotesActions.clearViewQuote());
    };
  }, []);

  const GST = (quotesDetails?.totalPrice?.value * 15) / 100;
  const total = quotesDetails?.totalPrice?.value + GST;
  const quoteLabel = "Quote total incl. GST";
  const quoteValue = total;

  const isDisabled = React.useCallback(() => isNilOrEmpty(pdfDetails), [pdfDetails]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          disabled={isDisabled()}
          style={[styles.buttonSendStyle, isDisabled() ? styles.buttonDisabled : {}]}
          onPress={() => {
            sendToCustomerQuoteAnalytics("quote_send");
            setSheetState(SheetState.EXPANDED);
            PendoSDK.track("quote_send", { expanded: true });
          }}
        >
          <Text style={[styles.buttonSendText, isDisabled() ? styles.buttonDisabled : {}]}>Send to customer</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.totalItemContainer}>
        <Text style={styles.itemLabel}>{quoteLabel}</Text>
        <PriceComponent ignorePOA={true} style={Fonts.style.openSans16Bold} value={quoteValue} />
      </View>
    </View>
  );
};

export default ViewQuoteTotal;
