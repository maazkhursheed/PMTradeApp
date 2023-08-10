import * as React from "react";
import { Text, TouchableOpacity } from "react-native";
import { accessibility } from "~root/Lib/DataHelper";
import CustomIcon from "../CustomIcon";
import style from "./LocationItemStyles";

interface OwnProps {
  item: string;
  onPress: any;
  addressText: string;
}

type Props = OwnProps;

const LocationItem: React.SFC<Props> = ({ item, onPress, addressText }: Props) => {
  const getSecondText = React.useCallback(() => {
    if (addressText !== "" && item.includes(addressText.trim())) {
      return (
        <Text style={style.addressTextBold}>
          {addressText.trim()}
          <Text style={style.addressText}>{item.replace(addressText.trim(), "")}</Text>
        </Text>
      );
    } else {
      return <Text style={style.addressText}>{item}</Text>;
    }
  }, [addressText]);

  return (
    <TouchableOpacity onPress={onPress} style={style.markerContainerStyle} {...accessibility("locationItem")}>
      <CustomIcon name={"location"} style={style.iconStyle} />
      {getSecondText()}
    </TouchableOpacity>
  );
};

export default LocationItem;
