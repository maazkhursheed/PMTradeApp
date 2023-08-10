import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CustomIcon from "~root/Components/CustomIcon";
import { accessibility } from "~root/Lib/DataHelper";
import { onCameraPermission } from "~root/Lib/PermissionHelperLib";
import styles from "./GenericSearchFieldComponentStyles";

interface OwnProps {
  style?: any;
  onPress: () => void;
  placeHolderText: string;
  hasBarcodeIcon: boolean;
}

type Props = OwnProps;

const GenericSearchFieldComponent: React.FC<Props> = ({ style, onPress, placeHolderText, hasBarcodeIcon }: Props) => {
  const navigation = useNavigation();
  const onBarCodePress = React.useCallback(() => onCameraPermission().then(() => navigation.navigate("BarCodeScanner")), []);
  return (
    <View style={[styles.barCodeView, style]}>
      <TouchableOpacity style={styles.touchableOpacityStyle} {...accessibility("searchBar")} onPress={onPress}>
        <CustomIcon style={[styles.iconStyle, { fontSize: 18 }]} name={"search"} />
        <Text style={styles.productTextStyle}>{placeHolderText}</Text>
      </TouchableOpacity>
      {hasBarcodeIcon && (
        <TouchableOpacity onPress={onBarCodePress} {...accessibility("barcodeIcon")}>
          <CustomIcon style={[styles.iconStyle, { fontSize: 24, marginRight: 15 }]} name={"barcode"} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default GenericSearchFieldComponent;
