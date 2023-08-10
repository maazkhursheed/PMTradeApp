import { Button } from "native-base";
import React from "react";
import { ActivityIndicator, Modal, Platform, Text, TouchableOpacity, View, ViewProps, ViewStyle } from "react-native";
import FbIcon from "~root/Components/FbIcon";
import NewTextField from "~root/Components/NewTextField/NewTextField";
import { TextFieldProps } from "~root/Components/TextField/TextField";
import { accessibility } from "~root/Lib/DataHelper";
import { Colors } from "../../Themes";
import PickerItem from "../PickerItem/PickerItem";
import styles from "./DropDownPickerStyle";

interface OwnProps {
  containerProps?: ViewProps;
  selectedValue?: any;
  zeroIndexObject: any;
  headerTitle?: string;
  items: any | any[];
  itemLabel: string;
  textProps?: TextFieldProps;
  showIndicator?: boolean;
  onCrossButtonPress?: () => void;
  dropIconStyle?: ViewStyle | any;
  forceEnabled?: boolean;
  onValueChange?: () => void;
  style: any;
}

type Props = OwnProps;

const DropDownPicker: React.SFC<Props> = ({
  containerProps,
  selectedValue,
  zeroIndexObject,
  items,
  itemLabel,
  textProps,
  showIndicator,
  onCrossButtonPress,
  dropIconStyle,
  forceEnabled,
  onValueChange,
}: Props) => {
  const [modalShow, setModalShow] = React.useState(false);
  const itemLength = items.length;
  if (itemLength === 0) {
    return null;
  }
  return (
    <View {...containerProps} style={[styles.pickerContainer, containerProps ? containerProps.style : undefined]}>
      {!!onCrossButtonPress && (
        <Button transparent={true} style={styles.smallRoundBtn} onPress={onCrossButtonPress} {...accessibility("closeDropdownPickerButton")}>
          <FbIcon name={"ic_close"} style={styles.closeIcon} />
        </Button>
      )}
      {Platform.OS === "android" ? (
        <>
          <NewTextField
            viewStyle={styles.textView}
            editable={false}
            textViewStyle={{
              borderWidth: forceEnabled || itemLength > 1 ? 1 : 0,
            }}
            style={styles.textStyle}
            {...textProps}
          >
            {showIndicator && <ActivityIndicator style={styles.activityIndicatorStyle} />}
            {(forceEnabled || itemLength > 1) && <FbIcon name={"ic_downarrow"} style={[styles.textFieldIcon, dropIconStyle]} />}
          </NewTextField>
          <PickerItem
            selectedValue={selectedValue}
            zeroIndexObject={zeroIndexObject}
            items={items}
            itemLabel={itemLabel}
            forceEnabled={forceEnabled}
            onValueChange={onValueChange}
          />
        </>
      ) : (
        <>
          <View>
            <NewTextField
              viewStyle={styles.textView}
              editable={false}
              textViewStyle={{
                borderWidth: forceEnabled || itemLength > 1 ? 1 : 0,
              }}
              style={styles.textStyle}
              {...textProps}
            >
              {showIndicator && <ActivityIndicator style={styles.activityIndicatorStyle} />}
              {(forceEnabled || itemLength > 1) && <FbIcon name={"ic_downarrow"} style={[styles.textFieldIcon, dropIconStyle]} />}
            </NewTextField>
            <TouchableOpacity onPress={() => setModalShow(true)} style={{ height: 50, width: "100%", position: "absolute" }} />
          </View>
          <Modal presentationStyle={"formSheet"} animationType={"slide"} visible={modalShow}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                onPress={() => setModalShow(false)}
                style={{ color: Colors.lightBlue, marginRight: 20, marginBottom: 100, padding: 10, alignSelf: "flex-end" }}
              >
                Done
              </Text>
              <PickerItem
                selectedValue={selectedValue}
                zeroIndexObject={zeroIndexObject}
                items={items}
                itemLabel={itemLabel}
                forceEnabled={forceEnabled}
                onValueChange={onValueChange}
              />
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};
export default DropDownPicker;
