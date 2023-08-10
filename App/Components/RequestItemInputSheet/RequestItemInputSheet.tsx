import firebase from "@react-native-firebase/app";
import { useNavigation } from "@react-navigation/native";
import { Button } from "native-base";
import * as React from "react";
import { Keyboard, PixelRatio, Platform, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { connect } from "react-redux";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { getBranchTownRegion } from "~root/Lib/BranchHelper";
import {
  accessibility,
  addOcclusionForTextFields,
  getJobAnalyticsObj,
  getSelectedAccountId,
  removeOcclusionFromTextFields,
  tagScreenName,
} from "~root/Lib/DataHelper";
import { useKeyboard } from "~root/Lib/KeyboardHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { isIphone11orMini, useTabBar } from "~root/Lib/QuoteHelper";
import { RootState } from "~root/Reducers";
import { CartActions } from "~root/Reducers/CartReducer";
import { ApplicationStyles, Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";
import { RequestCartItemParams } from "~root/Types/Cart";
import LoadingView from "../LoadingView";
import styles from "./RequestItemInputSheetStyles";

interface OwnProps {
  sheetState: SheetState;
  onSuccess?: (name: string) => void;
  isDeleted: boolean;
  onClose: () => void;
}

interface DispatchProps {
  requestSaveCartInfo: (params: RequestCartItemParams, alertCallbacks: IAlertCallbacks) => void;
}

interface StateProps {
  requestItem: string;
  isSavingCartInfo: boolean;
  isLoading: boolean;
  selectedBranch: any;
  selectedJobAccount: any;
  userId: any;
  state: any;
}

type Props = OwnProps & StateProps & DispatchProps;

const RequestItemInputSheet: React.SFC<Props> = ({
  onClose,
  isDeleted,
  isLoading,
  sheetState,
  requestSaveCartInfo,
  isSavingCartInfo,
  requestItem,
  userId,
  state,
  selectedBranch,
  selectedJobAccount,
}: Props) => {
  const textInputRef = React.useRef(null);
  const navigation = useNavigation();
  const [sheetStateInternal, setSheetStateInternal] = React.useState(sheetState);
  const [requestItemText, setRequestItemText] = React.useState(requestItem || "");
  const [isToastShowing, setToastShowing] = React.useState(false);
  const { keyboardHeight, isKeyboardVisible } = useKeyboard();
  const scrollEnd = React.useRef();
  React.useEffect(() => {
    if (isDeleted) {
      setRequestItemText("");
    }
  }, [isDeleted]);
  React.useEffect(() => {
    setSheetStateInternal(sheetState);
    if (sheetState === SheetState.EXPANDED) {
      setTimeout(() => textInputRef.current?.focus(), 0);
    }
  }, [sheetState]);
  React.useEffect(() => {
    if (sheetStateInternal === SheetState.EXPANDED) {
      tagScreenName("Request an Item Screen");
      addOcclusionForTextFields();
    }
  }, [sheetStateInternal]);

  const saveTapped = React.useCallback(() => {
    Keyboard.dismiss();
    if (requestItemText !== requestItem) {
      sendItemRequestAnalytics("item_request");
      const params = {
        requestItem: requestItemText,
      };
      requestSaveCartInfo(params, {
        onSuccess: closeSheetTapped,
        onFailure: () => {},
      });
    } else {
      closeSheetTapped();
    }
  }, [requestItemText, requestItem]);

  React.useEffect(() => {
    if (sheetState === SheetState.EXPANDED) useTabBar(navigation, "none", 1);
    else useTabBar(navigation, "flex", 1);
  }, [sheetState]);

  const closeSheetTapped = React.useCallback(() => {
    Keyboard.dismiss();
    setSheetStateInternal(SheetState.CLOSED);
    removeOcclusionFromTextFields();
    if (onClose) {
      onClose();
    }
  }, []);

  const getCharacterLimitTextColor = React.useCallback(() => {
    return requestItemText.length === 0
      ? colors.black
      : requestItemText.length > 0 && requestItemText.length < 490
      ? colors.green
      : requestItemText.length > 489
      ? colors.red
      : undefined;
  }, [requestItemText.length]);

  const sendItemRequestAnalytics = (event: any) => {
    const params = {
      event,
      userId: extractDigitalIdFromJWTPayload(decodeJWTToken(userId)) as string,
      accountId: getSelectedAccountId(state),
      accountIdLinked: getSelectedAccountId(state),
      branch: selectedBranch.name,
      branchId: selectedBranch.branchID,
      jobId: selectedJobAccount ? selectedJobAccount.JobId : "",
      job_date: "",
      job_expiry: "",
      job_stage: "",
      location: getBranchTownRegion(selectedBranch),
    };
    const eventLogObject = getJobAnalyticsObj(params);
    firebase.analytics().logEvent(event, eventLogObject);
  };
  return (
    <>
      <BottomSheet
        content={
          <LoadingView style={styles.contentContainer} isLoading={isLoading}>
            <STCHeader
              title={"Request an item"}
              titleStyle={{ ...Fonts.style.openSans18Bold }}
              style={[
                {
                  backgroundColor: sheetStateInternal === SheetState.EXPANDED ? Colors.darkBlue : Colors.cloud,
                },
                { ...ApplicationStyles.shadow },
              ]}
              leftItem={
                <Button
                  disabled={isSavingCartInfo}
                  transparent={true}
                  onPress={() => {
                    setRequestItemText(requestItem || "");
                    closeSheetTapped();
                  }}
                  {...accessibility("leftItemBtn")}
                >
                  <Text style={[styles.doneStyle, { marginLeft: 18 }]}>{"Cancel"}</Text>
                </Button>
              }
              rightItem={
                <Button disabled={isSavingCartInfo} transparent={true} onPress={saveTapped} {...accessibility("rightItemBtn")}>
                  <Text
                    style={{
                      ...Fonts.style.openSans16,
                      marginRight: 18,
                      color: Colors.lightBlue,
                    }}
                  >
                    {"Save"}
                  </Text>
                </Button>
              }
            />
            <KeyboardAwareScrollView
              ref={scrollEnd}
              enableOnAndroid={true}
              keyboardShouldPersistTaps={"handled"}
              extraScrollHeight={Platform.select({ android: 100, ios: 50 })}
              onContentSizeChange={() => scrollEnd?.current?.scrollToEnd({ animated: true })}
            >
              <TextInput
                ref={textInputRef}
                style={styles.inputStyle}
                placeholder={"Tell us what you need?"}
                onKeyPress={({ nativeEvent: { key: keyValue } }) => {
                  if (requestItemText.length === 500) {
                    if (keyValue === "Backspace") {
                      Toast.hide();
                    } else {
                      if (!isToastShowing) {
                        Toast.show({
                          text1: "Too many characters",
                          text2: "",
                          type: "inputError",
                          visibilityTime: 3000,
                          onShow: () => setToastShowing(true),
                          onHide: () => setToastShowing(false),
                        });
                      }
                    }
                  }
                }}
                onChangeText={text => setRequestItemText(text.replace(/[<>]/g, ""))}
                value={requestItemText}
                autoCorrect={false}
                placeholderTextColor={Colors.darkGrey}
                selectionColor={Colors.lightBlue}
                multiline={true}
                maxLength={500}
                returnKeyType={"default"}
                {...accessibility("requestItemText")}
              />
            </KeyboardAwareScrollView>

            <View
              style={[
                styles.characterLimitContainer,
                {
                  bottom: isKeyboardVisible
                    ? Platform.select({
                        android: keyboardHeight + PixelRatio.getPixelSizeForLayoutSize(8),
                        ios: isIphone11orMini() ? keyboardHeight + 40 : keyboardHeight + PixelRatio.getPixelSizeForLayoutSize(8),
                      })
                    : Platform.OS === "android"
                    ? 20
                    : isIphone11orMini()
                    ? 50
                    : 40,
                },
              ]}
              accessible={false}
              testID={"characterLimit"}
              accessibilityLabel={"characterLimit"}
            >
              <Text
                style={[
                  styles.characterLimit,
                  {
                    color: getCharacterLimitTextColor(),
                  },
                ]}
                accessible={false}
                testID={"characterLimit"}
                accessibilityLabel={"characterLimit"}
              >
                Character limit: {500 - requestItemText.length}
              </Text>
            </View>
          </LoadingView>
        }
        sheetState={sheetStateInternal}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  requestSaveCartInfo: (params: RequestCartItemParams, alertCallbacks: any) => dispatch(CartActions.requestSaveCartInfo(params, alertCallbacks)),
});

const mapStateToProps = (state: RootState): StateProps => ({
  isSavingCartInfo: state?.cart?.savingCartInfo,
  isLoading: state?.cart?.fetching || state?.cart?.savingCartInfo,
  requestItem: state?.cart?.userCartDetail?.requestItem,
  selectedJobAccount: state?.jobAccounts?.selectedJobAccount,
  selectedBranch: state?.branchList?.selectedBranch,
  userId: state.login?.tempToken?.idToken,
  state,
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestItemInputSheet);
