import * as React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import UXCam from "react-native-ux-cam";
import { occludeSensitiveView } from "~root/Lib/DataHelper";
import colors from "~root/Themes/Colors";
import CustomIcon from "../CustomIcon";
import styles from "./ContactInfoItemStyle";

interface OwnProps extends TextInputProps {
  label: string;
  onClearInput: () => void;
  inputRef: any;
}

type Props = OwnProps;

const ContactInfoItem: React.SFC<Props> = ({ label, onClearInput, inputRef, ...props }: Props) => {
  React.useEffect(() => {
    UXCam.setAutomaticScreenNameTagging(false);
  }, []);

  const [isFocused, setFocused] = React.useState(false);
  return (
    <View ref={occludeSensitiveView}>
      <View ref={occludeSensitiveView} style={styles.infoItemView}>
        <Text style={styles.itemLabel}>{label}</Text>
        <View ref={occludeSensitiveView} style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            style={[styles.itemValue, { width: props.value?.length > 0 ? "80%" : "100%" }]}
            {...props}
            onFocus={() => {
              setFocused(true);
              if (props.onFocus) {
                props.onFocus();
              }
            }}
            onBlur={() => setFocused(false)}
            selectionColor={colors.lightBlue}
          />
          {props.editable && props.value?.length > 0 && isFocused && <CustomIcon style={styles.clearInputIcon} onPress={onClearInput} name={"clear"} />}
        </View>
      </View>
      <View style={styles.subSeparator} />
    </View>
  );
};
export default ContactInfoItem;
