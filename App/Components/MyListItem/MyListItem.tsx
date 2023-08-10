import * as React from "react";
import { Platform, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import NativeWrapper from "~root/Components/NativeWrapper";
import { isNilOrEmpty } from "~root/Lib/CommonHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { Images } from "~root/Themes";
import styles from "./MyListItemStyle";

interface Props {
  item: any;
  onPress: () => void;
}

const validateUrl = (imageObj: any) => {
  if (imageObj && imageObj.url) {
    const uri = imageObj.url;
    return uri !== null && uri !== undefined && uri.includes("/") && uri.includes(".") ? uri : "";
  }
  return "";
};

const MyListItem: React.FunctionComponent<Props> = ({ item, onPress }: Props) => {
  const image0 = isNilOrEmpty(item.images[0]) && item.productCount > 0 ? Images.safetyCone : { uri: validateUrl(item.images[0]) };
  const image1 = isNilOrEmpty(item.images[1]) && item.productCount > 1 ? Images.safetyCone : { uri: validateUrl(item.images[1]) };
  const image2 = isNilOrEmpty(item.images[2]) && item.productCount > 2 ? Images.safetyCone : { uri: validateUrl(item.images[2]) };

  return (
    <NativeWrapper onPress={onPress} {...accessibility("MyListItem")}>
      <View style={styles.containerListItem}>
        <View style={Platform.OS === "android" ? styles.containerListItemInnerAndroid : styles.containerListItemInneriOS}>
          <View style={styles.imageWrapper}>
            <FastImage source={image0} style={styles.image} resize={FastImage.resizeMode.contain} />
            <FastImage source={image1} style={styles.image} resize={FastImage.resizeMode.contain} />
            <FastImage source={image2} style={styles.image} resize={FastImage.resizeMode.contain} />
          </View>
          <View style={styles.containerListItemSub}>
            <Text style={styles.containerListItemTitle}>{item.listName}</Text>
            <Text style={styles.containerListItemCount}>{item.productCount} products</Text>
          </View>
        </View>
      </View>
    </NativeWrapper>
  );
};

export default MyListItem;
