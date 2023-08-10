import * as React from "react";
import { Text, TouchableOpacity } from "react-native";
import EditJobSwitchSheet from "~root/Components/EditJobSwitchSheet/EditJobSwitchSheet";
import { accessibility } from "~root/Lib/DataHelper";
import { useQuoteStatusChecker } from "~root/Lib/QuoteHelper";
import { useAppender } from "~root/Provider/Appender";
import { SheetState } from "../BottomSheet/BottomSheet";
import styles from "./EditJobDetailsStyle";

interface OwnProps {
  editJobSheet: SheetState;
  onConfirmEdit: () => void;
  sheetCloseTapped: () => void;
}
const EditJobDetails: React.SFC<OwnProps> = ({ editJobSheet, onConfirmEdit, sheetCloseTapped }) => {
  const { append } = useAppender();
  const isQuoteEditable = useQuoteStatusChecker();
  React.useEffect(() => {
    append(<EditJobSwitchSheet sheetState={editJobSheet} sheetCloseTapped={sheetCloseTapped} />, "EditJobSwitchSheet", 0);
  }, [editJobSheet]);

  return (
    <TouchableOpacity onPress={() => isQuoteEditable(onConfirmEdit)} {...accessibility("EditJobDetailsButton")}>
      <Text style={styles.editJobStyle}>Edit job details</Text>
    </TouchableOpacity>
  );
};

export default EditJobDetails;
