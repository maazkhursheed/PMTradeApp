import * as React from "react";
import { Text, TouchableOpacity, ViewProps } from "react-native";
import CustomIcon from "../CustomIcon";
import styles from "./SwiperComponentStyle";

interface Props extends ViewProps {
  onPress: () => void;
  style?: any;
  label?: string;
}

const EditButton: React.SFC<Props> = ({ onPress, style, label = "Edit" }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.editView, style]}>
      <CustomIcon style={styles.iconStyleEdit} name={"edit"} />
      <Text style={styles.textStyleEdit}>{label}</Text>
    </TouchableOpacity>
  );
};

export default EditButton;
