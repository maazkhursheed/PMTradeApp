import * as React from "react";
import { Image, Text, View } from "react-native";
import NativeWrapper from "~root/Components/NativeWrapper";
import { accessibility } from "~root/Lib/DataHelper";
import styles from "./DeliveryOptionsItemStyle";

interface Props {
  image: any;
  title?: string;
  time?: string;
  onPress: () => void;
  optionAvailable: boolean;
}

const DeliveryOptionsItem: React.SFC<Props> = ({ image, time, title, onPress, optionAvailable }: Props) => {
  return (
    <NativeWrapper
      style={styles.container}
      onPress={optionAvailable ? onPress : undefined}
      {...accessibility("deliveryItemButton_" + title)}
      disabled={!optionAvailable}
    >
      <Image style={styles.image} source={image} resizeMode={"contain"} />
      <View style={styles.textContainer}>
        <Text style={optionAvailable ? styles.timeText : styles.timeTextDisabled}>{time}</Text>
        <Text style={optionAvailable ? styles.titleText : styles.titleTextDisabled}>{title}</Text>
      </View>
    </NativeWrapper>
  );
};

export default DeliveryOptionsItem;
