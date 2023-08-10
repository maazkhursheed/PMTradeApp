import { Button } from "native-base";
import * as React from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import AddressSelectComponent from "~root/Components/AddressSelectComponent/AddressSelectComponent";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import LoadingView from "~root/Components/LoadingView";
import NewTextField from "~root/Components/NewTextField/NewTextField";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { OKButton } from "~root/Lib/AlertsHelper";
import { isNilOrEmpty } from "~root/Lib/CommonHelper";
import { accessibility, addOcclusionForTextFields, removeOcclusionFromTextFields, tagScreenName } from "~root/Lib/DataHelper";
import { showAlert } from "~root/Lib/StringHelper";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import { Colors, Fonts } from "~root/Themes";
import { getAddressObject } from "~root/Transforms/OrderItem";
import styles from "./EditJobSwitchSheetStyle";

interface OwnProps {
  sheetState: SheetState;
  sheetCloseTapped: () => void;
}

type Props = OwnProps;

const EditJobSwitchSheet: React.SFC<Props> = ({ sheetState, sheetCloseTapped }: Props) => {
  const { fetching, quoteDetails } = useSelector((state: RootState) => ({
    fetching: state.quotes.fetching,
    quoteDetails: state.quotes.quotesListDetails,
  }));
  const [jobReference, setJobReference] = React.useState<string>(quoteDetails?.jobName);
  const [jobAddress, setJobAddress] = React.useState<string>(quoteDetails?.jobAddress?.formattedAddress);
  const [notes, setNotes] = React.useState<string>(quoteDetails?.notes);
  const [jobReferenceRef, setJobReferenceRef] = React.useState<any>(null);
  const [scopeOfWork, setScopeOfWork] = React.useState(quoteDetails?.notes);
  const { dispatchAlert } = useCustomAlert();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (sheetState === SheetState.EXPANDED) {
      setJobReference(quoteDetails?.jobName);
      setJobAddress(quoteDetails?.jobAddress?.formattedAddress);
      setNotes(quoteDetails?.notes);
      setScopeOfWork(quoteDetails?.scopeOfWork);
    }
  }, [sheetState, quoteDetails]);

  React.useEffect(() => {
    if (sheetState === SheetState.EXPANDED) {
      tagScreenName("Edit Job Screen");
      jobReferenceRef?.focus();
      addOcclusionForTextFields();
    }
  }, [sheetState]);

  const updateQuoteDetails = React.useCallback(() => {
    Keyboard.dismiss();

    const updateQuoteDetailParams = {
      code: quoteDetails?.code,
      jobAddress: {
        firstName: jobReference,
        ...getAddressObject(jobAddress),
      },
      consumerAddress: quoteDetails?.consumerAddress,
      estimateFlag: quoteDetails?.estimateFlag,
      channel: "Trade App",
      termsAndConditions: "",
      notes,
      scopeOfWork,
    };

    dispatch(
      QuotesActions.updateQuoteDetails(
        {
          bodyParams: updateQuoteDetailParams,
        },
        {
          onSuccess: closeSheetTapped,
          onFailure: () => {
            showAlert(dispatchAlert, "", "We were unable to update quote details, please try again", OKButton);
          },
        },
      ),
    );
  }, [jobReference, jobAddress, quoteDetails, notes, scopeOfWork]);

  const closeSheetTapped = React.useCallback(() => {
    Keyboard.dismiss();
    sheetCloseTapped();
    removeOcclusionFromTextFields();
  }, [sheetCloseTapped]);

  const isNotValid = React.useCallback(() => {
    return isNilOrEmpty(jobReference) || isNilOrEmpty(jobAddress);
  }, [jobReference, jobAddress]);

  const keyboardVerticalOffset = Platform.OS === "android" ? 40 : 0;
  return (
    <>
      <BottomSheet
        content={
          <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={keyboardVerticalOffset} style={styles.contentContainer}>
            <STCHeader
              title={"Edit job"}
              titleStyle={styles.headerTitleStyle}
              leftItem={
                <Button transparent={true} onPress={closeSheetTapped} {...accessibility("leftItemBtn")}>
                  <Text style={styles.cancelStyle}>{"Cancel"}</Text>
                </Button>
              }
              rightItem={
                <Button transparent={true} onPress={updateQuoteDetails} {...accessibility("rightItemBtn")} disabled={isNotValid()}>
                  <Text
                    style={{
                      ...Fonts.style.openSans16,
                      marginRight: 18,
                      color: isNotValid() ? Colors.darkGrey : Colors.lightBlue,
                    }}
                  >
                    Save
                  </Text>
                </Button>
              }
            />
            <LoadingView style={styles.loadingView} isLoading={fetching} hideViewOnLoading={true}>
              <KeyboardAwareScrollView enableOnAndroid={true} enableAutomaticScroll={true} keyboardShouldPersistTaps={"handled"}>
                <NewTextField
                  getReference={setJobReferenceRef}
                  label={"Job reference"}
                  value={jobReference}
                  onChangeText={setJobReference}
                  requiredText={"Required"}
                />
                <AddressSelectComponent label={"Job location"} requiredText={"Required"} selectedAddress={jobAddress} onSelectAddress={setJobAddress} />
                <NewTextField label={"Notes"} value={notes} onChangeText={setNotes} maxLength={500} textStyle={styles.notesContainer} multiline={true} />
                <NewTextField
                  label={"Scope of work"}
                  value={scopeOfWork}
                  onChangeText={setScopeOfWork}
                  textStyle={{ minHeight: 210 }}
                  multiline={true}
                  maxLength={10000}
                />
              </KeyboardAwareScrollView>
            </LoadingView>
          </KeyboardAvoidingView>
        }
        sheetState={sheetState}
        sheetStyle={{ backgroundColor: Colors.snow }}
      />
    </>
  );
};

export default EditJobSwitchSheet;
