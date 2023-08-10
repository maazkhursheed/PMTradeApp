import { Button } from "native-base";
import * as React from "react";
import { Keyboard, Platform, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import CustomIcon from "~root/Components/CustomIcon";
import LoadingView from "~root/Components/LoadingView";
import NewTextField from "~root/Components/NewTextField/NewTextField";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { COST_TYPE_ALREADY_EXISTS_DISPLAY_MESSAGE, COST_TYPE_ALREADY_EXISTS_MESSAGE, showAlertMessage } from "~root/Lib/AlertsHelper";
import { isNumberRangeValid } from "~root/Lib/CommonHelper";
import { accessibility, addOcclusionForTextFields, removeOcclusionFromTextFields, tagScreenName } from "~root/Lib/DataHelper";
import { getAddCostSheetTitle, getCostTypeNameLabel, getCostTypeNamePlaceHolder, getTipsSectionText } from "~root/Lib/LabourSectionHelper";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import { Colors } from "~root/Themes";
import { LabourCostType } from "~root/Types/LabourSection";
import styles from "./AddLabourCostSheetStyles";

interface OwnProps {
  costType: LabourCostType;
  sheetState: SheetState;
  sheetCloseTapped: () => void;
  isUpdateCost?: boolean;
  uLabourCostName?: string;
  uLabourHours?: number;
  uLabourCharge?: number;
  uLabourNotes?: string;
}

type Props = OwnProps;

const AddLabourCostSwitchSheet: React.SFC<Props> = ({
  costType,
  sheetState,
  sheetCloseTapped,
  isUpdateCost,
  uLabourCostName,
  uLabourHours,
  uLabourCharge,
  uLabourNotes,
}: Props) => {
  const { quoteDetails, isLoading } = useSelector((state: RootState) => ({
    quoteDetails: state.quotes.quotesListDetails,
    isLoading: state.quotes.fetching,
  }));

  const [labourName, setLabourName] = React.useState("");
  const [hours, setHours] = React.useState("");
  const [chargeRate, setChargeRate] = React.useState("");
  const [note, setNote] = React.useState("");
  const [alreadyExistError, setAlreadyExistsError] = React.useState(false);
  const dispatch = useDispatch();
  const { dispatchAlert } = useCustomAlert();
  React.useEffect(() => {
    setLabourName(uLabourCostName ?? "");
    setHours(uLabourHours?.toString() ?? "");
    setChargeRate(uLabourCharge?.toString() ?? "");
    setNote(uLabourNotes ?? "");
  }, [quoteDetails, costType, uLabourCostName, uLabourHours, uLabourCharge, uLabourNotes, sheetState]);

  React.useEffect(() => {
    if (sheetState === SheetState.EXPANDED) {
      tagScreenName("Add Labour Cost Screen");
      addOcclusionForTextFields();
    }
  }, [sheetState]);

  const closeSheet = React.useCallback(() => {
    Keyboard.dismiss();
    sheetCloseTapped();
    setLabourName("");
    setHours("");
    setChargeRate("");
    setNote("");
    setAlreadyExistsError(false);
    removeOcclusionFromTextFields();
  }, [sheetState, quoteDetails, costType]);

  const staySheet = React.useCallback((response: any) => {
    if (response.status === 400 && response.message === COST_TYPE_ALREADY_EXISTS_MESSAGE) {
      setAlreadyExistsError(true);
    } else {
      showAlertMessage("", "Oops, something went wrong. Please try again.", dispatchAlert);
    }
  }, []);

  const addCost = React.useCallback(() => {
    if (!isFormValid()) {
      return;
    }
    dispatch(
      QuotesActions.createLabourCost(
        {
          urlParams: { quoteId: quoteDetails.code, costType: costType },
          bodyParams: {
            name: labourName,
            price: chargeRate,
            quantity: hours,
            notes: note,
          },
        },
        {
          onSuccess: closeSheet,
          onFailure: staySheet,
        },
      ),
    );
  }, [chargeRate, costType, hours, labourName, note, quoteDetails]);

  const updateCost = React.useCallback(() => {
    if (!isFormValid()) {
      return;
    }
    dispatch(
      QuotesActions.updateLabourCost(
        {
          urlParams: { quoteId: quoteDetails.code, costType: costType },
          bodyParams: {
            name: labourName,
            price: chargeRate,
            quantity: hours,
            notes: note,
          },
        },
        {
          onSuccess: closeSheet,
          onFailure: () => {
            showAlertMessage("", "Oops, something went wrong. Please try again.", dispatchAlert);
          },
        },
      ),
    );
  }, [quoteDetails, labourName, chargeRate, hours, note, costType]);

  const isFormValid = React.useCallback(() => chargeRate !== "" && hours !== "" && labourName !== "", [chargeRate, hours, labourName]);

  const onHoursChange = React.useCallback(hoursValue => {
    if (isNumberRangeValid(hoursValue, 4, 2)) {
      setHours(hoursValue);
    }
  }, []);

  const onChargeChange = React.useCallback(chargeValue => {
    if (isNumberRangeValid(chargeValue, 6, 2)) {
      setChargeRate(chargeValue);
    }
  }, []);

  return (
    <>
      <BottomSheet
        content={
          <View style={styles.contentContainer}>
            <STCHeader
              title={getAddCostSheetTitle(costType)}
              titleStyle={styles.titleStyle}
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
                <Button transparent={true} onPress={isUpdateCost ? updateCost : addCost} {...accessibility("rightItemBtn")}>
                  <Text
                    style={[
                      styles.saveButtonStyle,
                      {
                        color: isFormValid() ? Colors.lightBlue : Colors.darkGrey,
                      },
                    ]}
                  >
                    {"Save"}
                  </Text>
                </Button>
              }
            />
            <LoadingView style={styles.loadingView} isLoading={isLoading} hideViewOnLoading={false}>
              <KeyboardAwareScrollView
                style={styles.mainView}
                keyboardShouldPersistTaps={"handled"}
                extraScrollHeight={Platform.select({ android: 0, ios: 50 })}
              >
                <View style={styles.tipSectionContainer}>
                  <CustomIcon name={"info"} style={styles.iconStyle} />
                  <Text style={styles.tipSectionText}>{getTipsSectionText(costType)}</Text>
                </View>
                <NewTextField
                  label={getCostTypeNameLabel(costType)}
                  placeholder={getCostTypeNamePlaceHolder(costType)}
                  value={labourName}
                  onChangeText={setLabourName}
                  maxLength={255}
                  editable={isUpdateCost ? false : true}
                  onFocus={() => setAlreadyExistsError(false)}
                />
                {alreadyExistError && <Text style={styles.warningStyle}>{COST_TYPE_ALREADY_EXISTS_DISPLAY_MESSAGE}</Text>}

                <View style={styles.rowStyle}>
                  <View style={styles.container}>
                    <NewTextField
                      label={"Hours"}
                      placeholder={"0"}
                      value={hours}
                      onChangeText={onHoursChange}
                      keyboardType={"numeric"}
                      returnKeyLabel={"done"}
                      returnKeyType={"done"}
                    />
                  </View>
                  <View style={styles.container}>
                    <NewTextField
                      label={"Charge rate"}
                      placeholder={"$0.00"}
                      value={chargeRate}
                      onChangeText={onChargeChange}
                      keyboardType={"numeric"}
                      returnKeyLabel={"done"}
                      returnKeyType={"done"}
                    />
                  </View>
                </View>
                <NewTextField
                  label={"Notes"}
                  placeholder={"Enter additional details"}
                  value={note}
                  onChangeText={setNote}
                  maxLength={500}
                  textStyle={styles.noteStyle}
                  multiline={true}
                />
              </KeyboardAwareScrollView>
            </LoadingView>
          </View>
        }
        sheetState={sheetState}
      />
    </>
  );
};

export default AddLabourCostSwitchSheet;
