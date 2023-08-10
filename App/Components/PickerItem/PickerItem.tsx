import { Picker } from "@react-native-picker/picker";
import * as R from "ramda";
import React from "react";
import { Platform } from "react-native";
import { accessibility } from "../../Lib/DataHelper";
import styles from "../PickerItem/PickerItemStyle";

interface OwnProps {
  selectedValue?: any;
  zeroIndexObject: any;
  items: any | any[];
  itemLabel: string;
  forceEnabled?: boolean;
  onValueChange?: () => void;
}

type Props = OwnProps;

const PickerItem: React.SFC<Props> = ({ selectedValue, zeroIndexObject, items, itemLabel, forceEnabled, onValueChange, ...remaining }: Props) => {
  return (
    <Picker
      mode={"dialog"}
      pickerAccessible={false}
      pickerItemID="pickerItemID"
      pickerListID="pickerListID"
      pickerTextID="pickerTextID"
      selectedValue={selectedValue?.branchCode}
      pickerViewID="pickerViewID"
      style={styles.picker}
      {...remaining}
      enabled={forceEnabled || items.length > 1}
      onValueChange={(value, index) => {
        if (onValueChange && !(Platform.OS === "android" && index === 0)) {
          onValueChange(items[Platform.select({ android: index - 1, ios: index })], index);
        }
      }}
      {...accessibility("dropDownBtn")}
    >
      {R.compose(R.ifElse(R.always(Platform.OS === "ios"), R.identity, R.prepend(zeroIndexObject)))(items).map((item, index) => {
        return <Picker.Item label={item[itemLabel]} value={item["branchCode"]} key={index} {...accessibility("pickerItemID")} />;
      })}
    </Picker>
  );
};

export default PickerItem;
