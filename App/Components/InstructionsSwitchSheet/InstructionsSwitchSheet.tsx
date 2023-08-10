import { Button } from "native-base";
import * as React from "react";
import { Keyboard, Text, TextInput, View } from "react-native";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { accessibility, addOcclusionForTextFields, removeOcclusionFromTextFields, tagScreenName } from "~root/Lib/DataHelper";
import { Colors } from "~root/Themes";
import styles from "./InstructionsSwitchSheetStyles";

interface OwnProps {
  sheetState: SheetState;
  onCancel: () => void;
  onSave: (instructions: string) => void;
  instructions: string;
}

type Props = OwnProps;

const InstructionsSwitchSheet: React.SFC<Props> = ({ sheetState, onCancel, onSave, instructions }: Props) => {
  const textInputRef = React.useRef(null);

  const [sheetStateInternal, setSheetStateInternal] = React.useState(sheetState);
  const [txtInstructions, setTxtInstructions] = React.useState(instructions);

  React.useEffect(() => {
    setSheetStateInternal(sheetState);
    if (sheetState === SheetState.EXPANDED) {
      setTxtInstructions(instructions);
      textInputRef.current.focus();
    }
  }, [sheetState]);

  React.useEffect(() => {
    if (sheetStateInternal === SheetState.EXPANDED) {
      tagScreenName("Instructions Screen");
      addOcclusionForTextFields();
    }
  }, [sheetStateInternal]);

  const closeSheetTapped = () => {
    Keyboard.dismiss();
    onCancel();
    setSheetStateInternal(SheetState.CLOSED);
    removeOcclusionFromTextFields();
  };

  const saveTapped = () => {
    Keyboard.dismiss();
    onSave(txtInstructions);
    setSheetStateInternal(SheetState.CLOSED);
  };

  return (
    <>
      <BottomSheet
        content={
          <View style={styles.contentContainer}>
            <STCHeader
              title={"Instructions"}
              titleStyle={styles.titleStyle}
              style={[
                styles.headerStyle,
                {
                  backgroundColor: sheetStateInternal === SheetState.EXPANDED ? Colors.darkBlue : Colors.cloud,
                },
              ]}
              leftItem={
                <Button transparent={true} onPress={closeSheetTapped} {...accessibility("leftItemBtn")}>
                  <Text style={styles.cancelStyle}>{"Cancel"}</Text>
                </Button>
              }
              rightItem={
                <Button transparent={true} onPress={saveTapped} {...accessibility("rightItemBtn")}>
                  <Text style={styles.saveText}>{"Save"}</Text>
                </Button>
              }
            />
            <TextInput
              ref={textInputRef}
              style={styles.input}
              multiline={true}
              value={txtInstructions}
              onChangeText={text => setTxtInstructions(text.replace(/[<>]/g, ""))}
              placeholder={"Enter any special truck or site requirements needed"}
              selectionColor={Colors.lightBlue}
              placeholderTextColor={Colors.darkGrey}
              textAlignVertical={"top"}
            />
          </View>
        }
        sheetState={sheetStateInternal}
      />
    </>
  );
};

export default InstructionsSwitchSheet;
