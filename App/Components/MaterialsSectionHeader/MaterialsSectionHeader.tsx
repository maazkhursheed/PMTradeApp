import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View, ViewProps } from "react-native";
import AddOwnProductSwitchSheet from "~root/Components/AddOwnProductSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import { accessibility } from "~root/Lib/DataHelper";
import { useQuoteStatusChecker } from "~root/Lib/QuoteHelper";
import { useAppender } from "~root/Provider/Appender";
import CustomIcon from "../CustomIcon";
import { FeatureKeys, useFeatureToggleChangeNotifier } from "../FeatureToggle/FeatureToggle";
import styles from "./MaterialsSectionHeaderStyle";

interface Props extends ViewProps {
  numberOfProducts: number;
}

const MaterialsSectionHeader: React.SFC<Props> = ({ numberOfProducts }: Props) => {
  const { append } = useAppender();
  const navigation = useNavigation();
  const [stateSheet, setStateSheet] = useState(SheetState.CLOSED);
  const isQuoteEditable = useQuoteStatusChecker();
  React.useEffect(() => {
    append(<AddOwnProductSwitchSheet sheetState={stateSheet} sheetCloseTapped={() => setStateSheet(SheetState.CLOSED)} />, "AddOwnProductSwitchSheet", 0);
  }, [stateSheet]);
  useFeatureToggleChangeNotifier(FeatureKeys.QuotesSelector, () => setStateSheet(SheetState.CLOSED));
  return (
    <View style={[styles.container, { borderBottomWidth: numberOfProducts > 0 ? 16 : 0 }]}>
      <TouchableOpacity style={styles.row} onPress={() => isQuoteEditable(() => navigation.navigate("SearchSuggestion"))}>
        <CustomIcon style={styles.icon} name={"search"} />
        <Text style={styles.text}>Add PlaceMakers products</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity style={styles.row} onPress={() => isQuoteEditable(() => setStateSheet(SheetState.EXPANDED))} {...accessibility("AddownButton")}>
        <CustomIcon style={styles.icon} name={"add"} />
        <Text style={styles.text}>Add own product</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MaterialsSectionHeader;
