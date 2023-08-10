import { firebase } from "@react-native-firebase/analytics";
import { useNavigation } from "@react-navigation/native";
import { Button } from "native-base";
import * as R from "ramda";
import * as React from "react";
import { Keyboard, Platform, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import AddressSelectComponent from "~root/Components/AddressSelectComponent/AddressSelectComponent";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import LoadingView from "~root/Components/LoadingView";
import NewTextField from "~root/Components/NewTextField/NewTextField";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import AppConfig from "~root/Config/AppConfig";
import { OKButton } from "~root/Lib/AlertsHelper";
import { getBranchTownRegion } from "~root/Lib/BranchHelper";
import { isNilOrEmpty } from "~root/Lib/CommonHelper";
import {
  accessibility,
  addOcclusionForTextFields,
  getSelectedAccountId,
  occludeSensitiveView,
  removeOcclusionFromTextFields,
  tagScreenName,
} from "~root/Lib/DataHelper";
import { useKeyboard } from "~root/Lib/KeyboardHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { showAlert } from "~root/Lib/StringHelper";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import { Colors } from "~root/Themes";
import { getAddressObject } from "~root/Transforms/OrderItem";
import { AddressObject } from "~root/Types/Address";
import styles from "./AddNewJobSheetStyles";

interface OwnProps {
  sheetState: SheetState;
  sheetCloseTapped: () => void;
}

type Props = OwnProps;

const AddNewJobSwitchSheet: React.SFC<Props> = ({ sheetState, sheetCloseTapped }: Props) => {
  const dispatch = useDispatch();
  const { dispatchAlert } = useCustomAlert();
  const { fetching, addresses, selectedBranch, userId, state } = useSelector((state: RootState) => ({
    fetching: state?.quotes?.fetching,
    addresses: state?.address?.addressSuggestions || [],
    selectedBranch: state?.branchList?.selectedBranch,
    userId: state?.login?.tempToken?.idToken,
    state,
  }));
  const scrollView = React.useRef(null);
  const [jobReference, setJobReference] = React.useState("");
  const [jobAddress, setJobAddress] = React.useState("");

  const [notes, setNotes] = React.useState("");
  const [scopeOfWork, setScopeOfWork] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [focusedField, setFocusedField] = React.useState("");
  const navigation = useNavigation();
  const isNotValid = React.useCallback(() => isNilOrEmpty(jobAddress) || isNilOrEmpty(jobReference), [jobReference, jobAddress]);

  React.useEffect(() => {
    if (sheetState === SheetState.EXPANDED) {
      tagScreenName("Add New Job Screen");
      addOcclusionForTextFields();
    }
  }, [sheetState]);

  const sendQuoteAnalytics = React.useCallback((event: any) => {
    const params = {
      event,
      step: 2,
      step_label: "Quote Create Complete",
      device_type: Platform.OS,
      userId: extractDigitalIdFromJWTPayload(decodeJWTToken(userId)) as string,
      accountId: getSelectedAccountId(state),
      location: getBranchTownRegion(selectedBranch),
    };

    firebase.analytics().logEvent(event, params);
  }, []);

  const [androidExtraHeight, setAndroidExtraHeight] = React.useState(150);
  const [enableOnAndroid, setEnableOnAndroid] = React.useState(false);
  const [focusedHeight, setFocusedHeight] = React.useState(undefined);
  const [hideFields, setHideFields] = React.useState(false);
  const onKeyboardVisible = React.useCallback(() => {
    if ((focusedField === "name" || focusedField === "phone" || focusedField === "email" || focusedField === "address") && Platform.OS === "android") {
      setTimeout(() => scrollView.current?.scrollToEnd(), 500);
    }
  }, [focusedField, scrollView, scrollView.current]);

  const onKeyboardHidden = React.useCallback(() => {
    setHideFields(false);
    if (focusedField === "address") {
      setAndroidExtraHeight(0);
      setTimeout(() => scrollView.current?.scrollToEnd(), 500);
    } else {
      setAndroidExtraHeight(150);
    }
  }, []);
  const { isKeyboardVisible } = useKeyboard({ onKeyboardVisible, onKeyboardHidden });

  const addAccountTapped = React.useCallback(() => {
    if (isNotValid()) {
      return;
    }

    Keyboard.dismiss();
    const merge = R.curry((firstName: string, obj: AddressObject) => R.mergeRight({ firstName }, obj));
    const jobAddressObj = merge(jobReference, getAddressObject(jobAddress));
    const consumerAddressObj: AddressObject | undefined = R.compose(R.mergeRight({ phone, email }), merge(name), getAddressObject)(address);

    const addNewJobParams = {
      code: jobReference,
      jobAddress: jobAddressObj,
      consumerAddress: consumerAddressObj,
      estimateFlag: "false",
      channel: "Trade App",
      termsAndConditions: "",
      notes,
      scopeOfWork,
    };

    dispatch(
      QuotesActions.addNewJob(
        {
          bodyParams: addNewJobParams,
        },
        {
          onSuccess: newQuoteId => {
            sendQuoteAnalytics("quote_create");
            closeSheet();
            dispatch(QuotesActions.requestQuotesList({ pageNo: 1, numberOfLines: AppConfig.NUMBER_OF_LINES }, {}));
            navigation.navigate("QuoteDetails", {
              navParam: {
                quoteCode: newQuoteId,
              },
            });
          },
          onFailure: () => {
            showAlert(dispatchAlert, "", "We were unable to Add New Job, please try again", OKButton);
          },
        },
      ),
    );
  }, [jobReference, jobAddress, address, notes, email, phone, name, scopeOfWork]);
  const closeSheet = React.useCallback(() => {
    Keyboard.dismiss();
    sheetCloseTapped();
    setAddress("");
    setNotes("");
    setJobReference("");
    setScopeOfWork("");
    setName("");
    setJobAddress("");
    setPhone("");
    setEmail("");
    removeOcclusionFromTextFields();
  }, [sheetCloseTapped]);

  return (
    <>
      <BottomSheet
        content={
          <>
            <STCHeader
              title={"New Job"}
              titleStyle={styles.titleStyle}
              // @ts-ignore
              style={[
                styles.headerStyle,
                {
                  backgroundColor: sheetState === SheetState.EXPANDED ? Colors.darkBlue : Colors.cloud,
                },
              ]}
              leftItem={
                <Button transparent={true} onPress={closeSheet} {...accessibility("leftItemBtn")}>
                  <Text style={styles.cancelStyle}>{"Cancel"}</Text>
                </Button>
              }
              rightItem={
                <Button transparent={true} onPress={addAccountTapped} {...accessibility("rightItemBtn")}>
                  <Text style={[styles.addButtonStyle, { color: isNotValid() ? Colors.darkerGrey : Colors.lightBlue }]}>{"Save"}</Text>
                </Button>
              }
            />
            <KeyboardAwareScrollView
              ref={scrollView}
              style={styles.contentContainer}
              keyboardShouldPersistTaps={"handled"}
              viewIsInsideTabBar={true}
              centerContent={false}
              enableOnAndroid={enableOnAndroid || focusedField === "address"}
              onScrollBeginDrag={() => {
                if (isKeyboardVisible && Platform.OS === "android") {
                  setEnableOnAndroid(true);
                  setHideFields(false);
                  if (focusedField === "address") {
                    setAndroidExtraHeight(0);
                  }
                }
              }}
              extraScrollHeight={Platform.select({
                android: 0,
                ios: focusedField === "address" ? 0 : focusedField === "email" || focusedField === "phone" ? 80 : 20,
              })}
            >
              <LoadingView style={styles.mainView} isLoading={fetching} hideViewOnLoading={true}>
                <NewTextField
                  label={"Job reference"}
                  value={jobReference}
                  onChangeText={setJobReference}
                  requiredText={"Required"}
                  onFocus={() => {
                    setEnableOnAndroid(false);
                    setAndroidExtraHeight(150);
                    setFocusedField("jobReference");
                  }}
                />
                <AddressSelectComponent
                  label={"Job location"}
                  requiredText={"Required"}
                  selectedAddress={jobAddress}
                  onSelectAddress={setJobAddress}
                  onFocus={() => {
                    setEnableOnAndroid(false);
                    setAndroidExtraHeight(150);
                    setFocusedField("jobLocation");
                  }}
                />
                <NewTextField
                  label={"Notes"}
                  value={notes}
                  onChangeText={setNotes}
                  textStyle={{ minHeight: 80, height: undefined }}
                  multiline={true}
                  maxLength={500}
                  onFocus={() => {
                    setEnableOnAndroid(false);
                    setAndroidExtraHeight(150);
                    setFocusedField("notes");
                  }}
                />
                <NewTextField
                  label={"Scope of work"}
                  value={scopeOfWork}
                  onChangeText={setScopeOfWork}
                  textStyle={{ minHeight: 210 }}
                  multiline={true}
                  maxLength={10000}
                  onFocus={() => {
                    setEnableOnAndroid(true);
                    setAndroidExtraHeight(220);
                    setFocusedField("scopeOfWork");
                    setHideFields(true);
                    if (Platform.OS === "android") {
                      setTimeout(() => {
                        scrollView.current?.scrollToEnd();
                      }, 500);
                    }
                  }}
                />
                <Text style={styles.customerDetailsStyle}>Customer Details</Text>
                {(!hideFields || Platform.OS === "ios") && (
                  <>
                    <NewTextField
                      hideData={true}
                      label={"Name"}
                      value={name}
                      onChangeText={setName}
                      onFocus={() => {
                        setEnableOnAndroid(false);
                        setAndroidExtraHeight(220);
                        setFocusedField("name");
                        if (Platform.OS === "android") {
                          setTimeout(() => scrollView.current?.scrollToEnd(), 500);
                        }
                      }}
                    />

                    <NewTextField
                      hideData={true}
                      label={"Phone"}
                      value={phone}
                      onChangeText={setPhone}
                      onFocus={() => {
                        setEnableOnAndroid(false);
                        setAndroidExtraHeight(300);
                        setFocusedField("phone");
                        if (Platform.OS === "android") {
                          setTimeout(() => scrollView.current?.scrollToEnd(), 500);
                        }
                      }}
                      keyboardType={"phone-pad"}
                      returnKeyLabel={"done"}
                      returnKeyType={"done"}
                    />

                    <NewTextField
                      hideData={true}
                      label={"Email"}
                      value={email}
                      onChangeText={setEmail}
                      onFocus={() => {
                        setEnableOnAndroid(false);
                        setAndroidExtraHeight(380);
                        setFocusedField("email");
                        if (Platform.OS === "android") {
                          setTimeout(() => scrollView.current?.scrollToEnd(), 500);
                        }
                      }}
                    />
                    <AddressSelectComponent
                      focusedHeight={focusedHeight}
                      ref={occludeSensitiveView}
                      label={"Address"}
                      selectedAddress={address}
                      onSelectAddress={selectedAddress => {
                        setAddress(selectedAddress);
                        setTimeout(() => scrollView.current?.scrollToEnd(), 500);
                      }}
                      onFocus={() => {
                        setAndroidExtraHeight(0);
                        setFocusedField("address");
                        setEnableOnAndroid(false);
                        setFocusedHeight(Platform.select({ ios: 400, android: 650 }));
                        setTimeout(() => scrollView.current?.scrollToEnd(), 500);
                      }}
                      onBlur={() => {
                        setEnableOnAndroid(false);
                        setFocusedHeight(undefined);
                        setFocusedField("");
                      }}
                    />
                  </>
                )}
                <View style={{ height: Platform.select({ ios: 100, android: androidExtraHeight }) }} />
              </LoadingView>
            </KeyboardAwareScrollView>
          </>
        }
        sheetState={sheetState}
      />
    </>
  );
};

export default AddNewJobSwitchSheet;
