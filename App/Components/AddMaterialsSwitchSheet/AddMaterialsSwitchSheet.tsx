import { Button } from "native-base";
import R from "ramda";
import * as React from "react";
import { Keyboard, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import CustomAlert from "~root/Components/CustomAlert/CustomAlert";
import NewTextField from "~root/Components/NewTextField/NewTextField";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { accessibility, addOcclusionForTextFields, removeOcclusionFromTextFields, tagScreenName } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import { SectionSOBQuotesActions } from "~root/Reducers/MaterialSectionsSOBQuotesReducers";
import { Colors } from "~root/Themes";
import styles from "./AddMaterialsSwitchSheetStyle";

interface OwnProps {
  sheetState: SheetState;
  sheetCloseTapped: () => void;
}

type Props = OwnProps;

const AddMaterialsSwitchSheet: React.SFC<Props> = ({ sheetState, sheetCloseTapped }: Props) => {
  const dispatch = useDispatch();
  const [fieldName, setFieldName] = React.useState("");
  const [isShowing, setShowing] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [errorHeading, setErrorHeading] = React.useState("");
  const [message, setMessage] = React.useState("");
  const { quoteDetails } = useSelector((state: RootState) => ({
    quoteDetails: state.quotes.quotesListDetails,
  }));
  React.useEffect(() => {
    if (sheetState === SheetState.EXPANDED) {
      tagScreenName("Add Materials Screen");
      addOcclusionForTextFields();
    }
  }, [sheetState]);

  const closeSheet = React.useCallback(() => {
    Keyboard.dismiss();
    sheetCloseTapped();
    setFieldName("");
    removeOcclusionFromTextFields();
  }, [sheetState]);

  const saveMaterialsList = React.useCallback(() => {
    if (fieldName) {
      dispatch(
        SectionSOBQuotesActions.createSectionsSOBQuotes(
          { quoteId: quoteDetails?.code, name: fieldName },
          {
            onSuccess: () => {
              Keyboard.dismiss();
              sheetCloseTapped();
            },
            onFailure: response => {
              if (R.path(["errors", "0", "message"], response) === "DuplicateSOBName") {
                setErrorHeading("Stage of build already exists");
                setErrorMessage("Stage of build name already exists against this quote. Please enter a new one");
              } else {
                setErrorHeading("Oops, something went wrong.");
                setErrorMessage("Please try again later");
              }
              setShowing(true);
            },
          },
        ),
      );
      setFieldName("");
    }
  }, [sheetState, fieldName]);

  return (
    <>
      <BottomSheet
        content={
          <View style={styles.contentContainer}>
            <STCHeader
              title={"Add Stage of Build"}
              titleStyle={styles.titleStyle}
              style={[styles.headerStyle]}
              leftItem={
                <Button transparent={true} onPress={closeSheet} {...accessibility("leftItemBtn")}>
                  <Text style={styles.cancelStyle}>{"Cancel"}</Text>
                </Button>
              }
              rightItem={
                <Button disabled={!fieldName} transparent={true} onPress={() => saveMaterialsList()} {...accessibility("rightItemBtn")}>
                  <Text
                    style={[
                      styles.saveButtonStyle,
                      {
                        color: fieldName ? Colors.lightBlue : Colors.darkGrey,
                      },
                    ]}
                  >
                    {"Save"}
                  </Text>
                </Button>
              }
            />

            <View style={styles.mainView}>
              <NewTextField placeholder={"Name of stage"} value={fieldName} onChangeText={setFieldName} maxLength={255} editable={true} />
            </View>
            <CustomAlert
              heading={errorHeading}
              msg={errorMessage}
              iconName={"alert-icon"}
              visible={isShowing}
              button1Text="OK"
              onButton1Press={() => {
                setShowing(false);
              }}
            />
          </View>
        }
        sheetState={sheetState}
      />
    </>
  );
};

export default AddMaterialsSwitchSheet;
