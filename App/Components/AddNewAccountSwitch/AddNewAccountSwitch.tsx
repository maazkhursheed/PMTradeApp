import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import NewAccountSwitchSheet from "~root/Components/NewAccountSwitchSheet";
import { accessibility } from "~root/Lib/DataHelper";
import { useAppender } from "~root/Provider/Appender";
import styles from "./AddNewAccountStyles";

const AddNewAccountSwitch = () => {
  const { append } = useAppender();
  const navigation = useNavigation();
  const [stateSheet, setStateSheet] = useState(SheetState.CLOSED);

  React.useEffect(() => {
    append(
      <NewAccountSwitchSheet navigation={navigation} sheetState={stateSheet} sheetCloseTapped={() => setStateSheet(SheetState.CLOSED)} />,
      "newAccountSwitchSheet",
      0,
    );
  }, [stateSheet]);

  return (
    <TouchableOpacity style={styles.addAccountView} onPress={() => setStateSheet(SheetState.EXPANDED)} {...accessibility("AddAccountButton")}>
      <View style={styles.accountsView}>
        <Text style={[styles.linkItem, { fontSize: 30 }]}>+</Text>
        <Text style={styles.linkItem}>{"  Add account"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AddNewAccountSwitch;
