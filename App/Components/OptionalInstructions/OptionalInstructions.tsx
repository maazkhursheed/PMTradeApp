import * as React from "react";
import { Text, TouchableOpacity, ViewProps } from "react-native";
import { Card } from "~root/Components/Card";
import CardSectionHeader from "~root/Components/Card/CardSectionHeader";
import { useAppender } from "~root/Provider/Appender";
import { SheetState } from "../BottomSheet/BottomSheet";
import InstructionsSwitchSheet from "../InstructionsSwitchSheet";
import styles from "./OptionalInstructionsStyle";

interface Props extends ViewProps {
  instructions: string;
  onSave: (instructionstxt: string) => void;
}

const OptionalInstructions: React.SFC<Props> = ({ instructions, onSave }: Props) => {
  const { append } = useAppender();
  const [instructionsSheet, setInstructionsSheet] = React.useState(SheetState.CLOSED);

  React.useEffect(() => {
    append(
      <InstructionsSwitchSheet
        sheetState={instructionsSheet}
        onSave={(instructionstxt: string) => {
          setInstructionsSheet(SheetState.CLOSED);
          onSave(instructionstxt);
        }}
        onCancel={() => setInstructionsSheet(SheetState.CLOSED)}
        instructions={instructions}
      />,
      "optionalInstructionSheet",
      0,
    );
  }, [instructionsSheet]);

  return (
    <Card style={styles.viInstructions}>
      <CardSectionHeader text={"Instructions"} />
      {instructions?.length > 0 && <Text style={styles.txtInstructions}>{instructions}</Text>}
      <TouchableOpacity
        style={[
          styles.btnInstructions,
          {
            marginVertical: instructions?.length > 0 ? 0 : 20,
          },
        ]}
        onPress={() => setInstructionsSheet(SheetState.EXPANDED)}
      >
        <Text style={styles.btnTitle}>{instructions?.length > 0 ? "Edit instructions" : "Add instructions"}</Text>
      </TouchableOpacity>
    </Card>
  );
};

export default OptionalInstructions;
