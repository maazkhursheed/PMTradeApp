import * as React from "react";
import { FlatList } from "react-native";
import FastImage from "react-native-fast-image";
import { Images } from "~root/Themes";
import styles from "./ImageCarouselStyle";

interface Props {
  images: any;
}

const renderItems = ({ item }) => {
  return <FastImage source={{ uri: item }} style={styles.imageContainer} resizeMode={FastImage.resizeMode.contain} />;
};
/* A default renderer to use with products without images */
export const renderItemsWithoutImg = () => {
  const img = Images.safetyCone;
  return <FastImage source={img} style={styles.imageContainer} resizeMode={FastImage.resizeMode.contain} />;
};

const ImageCarousel: React.FC<Props> = ({ images }: Props) => {
  return (
    <FlatList
      data={images}
      style={styles.flatList}
      renderItem={renderItems}
      horizontal={true}
      persistentScrollbar={true}
      pagingEnabled={true}
      ListEmptyComponent={renderItemsWithoutImg()}
    />
  );
};

export default ImageCarousel;
