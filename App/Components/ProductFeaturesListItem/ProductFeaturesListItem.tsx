import * as React from "react";
import { Text, View } from "react-native";
import CustomIcon from "~root/Components/CustomIcon";
import NativeWrapper from "~root/Components/NativeWrapper";
import { isNotNilOrEmpty } from "~root/Lib/CommonHelper";
import { accessibility } from "~root/Lib/DataHelper";
import styles from "./ProductFeaturesListItemStyle";

interface Props {
  title: string;
  onPress: () => void;
  relatedIcon?: any;
  alternativeIcon?: any;
}

const IconView = ({ icon }) => {
  return (
    <>
      <View style={styles.iconViewStyle} {...accessibility("iconLeftItem")}>
        {icon}
      </View>
    </>
  );
};

const ProductFeaturesListItem = ({ title, onPress, relatedIcon, alternativeIcon }: Props) => (
  <NativeWrapper onPress={onPress} style={styles.container} {...accessibility("productFeatureListItem")}>
    {isNotNilOrEmpty(relatedIcon) && <IconView icon={relatedIcon} />}
    {isNotNilOrEmpty(alternativeIcon) && <IconView icon={alternativeIcon} />}
    <Text style={styles.text} numberOfLines={1}>
      {title}
    </Text>
    <View style={styles.iconViewStyle} {...accessibility("iconDirectionRight")}>
      <CustomIcon style={styles.icon} name={"chevron-right"} />
    </View>
  </NativeWrapper>
);

export default ProductFeaturesListItem;
