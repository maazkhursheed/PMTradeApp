import * as React from "react";
import { Text, View } from "react-native";
import colors from "~root/Themes/Colors";
import CustomIcon from "../CustomIcon";
import LargeCheckBox from "../LargeCheckBox";
import styles from "./AddToExistingItemStyles";

interface Props {
  item: any;
  selectedOrder: any;
  onPress: (selectedOrderNum: any) => void;
}

const AddToExistingItemComponent: React.SFC<Props> = ({ item, selectedOrder, onPress }: Props) => (
  <View style={styles.siteDetailItemContainer}>
    <View style={styles.siteDetailView}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: item?.isEligible ? colors.ochreBg : colors.wildSandColor,
          },
        ]}
      >
        <CustomIcon style={[styles.iconStyle, { color: item?.isEligible ? colors.darkRed : colors.darkGrey }]} name={"location"} />
      </View>
      <View style={styles.viAddress}>
        <Text style={styles.siteItemDesc}>{item?.DSP}</Text>
        <Text style={selectedOrder.orderNumber === item.orderNumber ? styles.siteSelectedItemLabelStyle : styles.siteItemLabelStyle}>
          {`${item?.address?.addressLine1 ?? ""}`}
        </Text>
        <Text style={styles.siteItemDesc}>{`${item?.address?.suburb ?? ""} ${item?.address?.town ?? ""} ${item?.address?.postCode ?? ""}`}</Text>
      </View>
    </View>
    {item.isEligible && (
      <LargeCheckBox onPress={() => onPress(item)} selected={selectedOrder.orderNumber === item.orderNumber} style={styles.siteItemTickContainer} />
    )}
  </View>
);

export default AddToExistingItemComponent;
