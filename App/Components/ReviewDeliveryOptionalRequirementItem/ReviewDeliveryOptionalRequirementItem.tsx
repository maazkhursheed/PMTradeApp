import * as React from "react";
import { Text, View } from "react-native";
import CustomIcon from "~root/Components/CustomIcon";
import styles from "./ReviewDeliveryOptionalRequirementItemStyle";

interface OwnProps {
  item: any;
}

type Props = OwnProps;
const ReviewDeliveryOptionalRequirementItem: React.FunctionComponent<Props> = ({ item }: Props) => {
  return (
    <View style={styles.deliveryOptionItemView}>
      <View style={styles.iconContainer}>
        <CustomIcon name={"chevron-right"} style={styles.icon} />
      </View>
      <Text style={styles.site}>{item}</Text>
    </View>
  );
};

export default ReviewDeliveryOptionalRequirementItem;
