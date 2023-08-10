import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View, ViewProps } from "react-native";
import FastImage from "react-native-fast-image";
import { accessibility } from "~root/Lib/DataHelper";
import { getAddCostButtonText, getLabourCostEmptyStateMsg1, getLabourCostEmptyStateMsg2 } from "~root/Lib/LabourSectionHelper";
import { useQuoteStatusChecker } from "~root/Lib/QuoteHelper";
import { useAppender } from "~root/Provider/Appender";
import images from "~root/Themes/Images";
import AddLabourCostSwitchSheet from "../AddLabourCostSheet";
import { SheetState } from "../BottomSheet/BottomSheet";
import CustomIcon from "../CustomIcon";
import { FeatureKeys, useFeatureToggleChangeNotifier } from "../FeatureToggle/FeatureToggle";
import styles from "./LabourAndOtheCostListEmptyStyle";

interface Props extends ViewProps {}

const LabourAndOtheCostListEmpty: React.SFC<Props> = ({}: Props) => {
  const { append } = useAppender();
  const [stateSheet, setStateSheet] = useState(SheetState.CLOSED);
  const isQuoteEditable = useQuoteStatusChecker();
  React.useEffect(() => {
    append(
      <AddLabourCostSwitchSheet costType={route.params?.costType} sheetState={stateSheet} sheetCloseTapped={() => setStateSheet(SheetState.CLOSED)} />,
      "AddLabourCostSwitchSheet",
      0,
    );
  }, [stateSheet]);
  useFeatureToggleChangeNotifier(FeatureKeys.QuotesSelector, () => setStateSheet(SheetState.CLOSED));
  const route = useRoute();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <FastImage source={images.labourCostEmpty} style={styles.image} resizeMode={FastImage.resizeMode.contain} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.msg1}>{getLabourCostEmptyStateMsg1(route.params?.costType)}</Text>
        <Text style={styles.msg2}>{getLabourCostEmptyStateMsg2(route.params?.costType)}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => isQuoteEditable(() => setStateSheet(SheetState.EXPANDED))}
          {...accessibility("AddLabourCostButton")}
        >
          <CustomIcon name={"add"} style={styles.icon} />
          <Text style={styles.buttonText}>{getAddCostButtonText(route.params?.costType)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LabourAndOtheCostListEmpty;
