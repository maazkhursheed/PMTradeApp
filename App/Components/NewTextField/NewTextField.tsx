import * as React from "react";
import { ViewStyle } from "react-native";
import RNUxcam from "react-native-ux-cam";
import TextField from "~root/Components/TextField";
import { TextFieldProps } from "~root/Components/TextField/TextField";
import styles from "./NewTextFieldStyle";

interface OwnProps {
  textStyle?: ViewStyle;
  hideData?: boolean;
}

type Props = OwnProps & TextFieldProps;

const NewTextField: React.SFC<Props> = ({ textStyle, hideData, ...remaining }: Props) => {
  return (
    <TextField
      ref={view => {
        if (hideData) {
          RNUxcam.occludeSensitiveView(view);
        }
      }}
      textViewStyle={styles.inputStyle}
      style={[styles.viewStyle, textStyle]}
      labelStyle={styles.itemValueOptional}
      requiredLabelStyle={styles.itemValueRequired}
      {...remaining}
    />
  );
};

export default NewTextField;
