import * as React from "react";
import { Text, TouchableOpacity, ViewProps } from "react-native";
import { OrderTypes } from "~root/Lib/BranchHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { useAppender } from "~root/Provider/Appender";
import { SheetState } from "../BottomSheet/BottomSheet";
import TeamContactsSwitchSheet from "../TeamContactsSwitchSheet";
import styles from "./AddChangeContactStyle";
interface Props extends ViewProps {
  orderType?: OrderTypes;
  onContactSelect: (selectedContact: any) => void;
}

const AddChangeContact: React.SFC<Props> = ({ orderType, onContactSelect }: Props) => {
  const [contactsSheet, setContactsSheet] = React.useState(SheetState.CLOSED);
  const { append } = useAppender();

  React.useEffect(() => {
    append(
      <TeamContactsSwitchSheet
        sheetState={contactsSheet}
        closeSheet={() => {
          setContactsSheet(SheetState.CLOSED);
        }}
        onContactSelect={onContactSelect}
      />,
      "TeamContactsSwitchSheet",
      0,
    );
  }, [contactsSheet]);

  return (
    <TouchableOpacity onPress={() => setContactsSheet(SheetState.EXPANDED)} {...accessibility("AddChangeContactButton")}>
      <Text style={styles.changeContactStyle}>{orderType === OrderTypes.STANDARD ? "Add another contact" : "Change contact"}</Text>
    </TouchableOpacity>
  );
};

export default AddChangeContact;
