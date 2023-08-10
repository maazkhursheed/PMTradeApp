import ReadMore from "@fawazahmed/react-native-read-more";
import React from "react";
import { Text, View } from "react-native";
import { accessibility } from "~root/Lib/DataHelper";
import { Fonts } from "~root/Themes";
import styles from "./styles";

interface OwnProps {
  text: string;
  heading: string;
}

const ReadMoreTextView = ({ text, heading }: OwnProps) => {
  return (
    <View style={styles.container}>
      <Text style={Fonts.style.openSans16Bold}>{heading}</Text>
      <ReadMore
        seeLessText={"Less"}
        seeMoreText={"more"}
        seeMoreStyle={styles.moreLessText}
        seeLessStyle={styles.moreLessText}
        numberOfLines={3}
        style={styles.text}
        seeMoreContainerStyleSecondary={undefined}
        {...accessibility("textExpand")}
      >
        {text || ""}
      </ReadMore>
      <View style={styles.divider} />
    </View>
  );
};

export default ReadMoreTextView;
