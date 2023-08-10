import R from "ramda";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import FbIcon from "~root/Components/FbIcon";
import { accessibility } from "~root/Lib/DataHelper";
import OrderItemHelper, { getEstimatedPickupTime, getHeaderText } from "~root/Lib/OrderItemHelper";
import OrderDetailModel from "~root/Types/OrderDetail";
import styles from "./OrderDetailsHeaderStyles";
interface OwnProps {
  data: OrderDetailModel;
}

type Props = OwnProps & NavigationScreenProps;

export default class OrderDetailsHeaders extends React.PureComponent<Props> {
  public getEstimatedText() {
    if (this.props.data.headerDetails.isEstimated) {
      if (this.props.data.fulfilmentType === "Pickup") {
        return "Estimated Pickup date:";
      } else {
        return "Estimated delivery:";
      }
    } else if (this.props.data.headerDetails.isDelivered) {
      return "Delivered at";
    } else {
      return "";
    }
  }

  public render() {
    const statusModel = new OrderItemHelper(this.props.data.status, this.props.data.fulfilmentType);
    const text = getHeaderText(this.props.data);
    const pickupTime = getEstimatedPickupTime(this.props.data.fulfilmentType === "Pickup" ? R.path(["original", "pickupTime"], this.props.data) : "");

    return (
      <SafeAreaView style={{ backgroundColor: statusModel.getLightColor() }}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle} {...accessibility("orderNumberLabel")}>
            ORDER #{this.props.data.orderNumber}
          </Text>
          <FbIcon
            style={styles.headerClose}
            name="ic_close"
            onPress={() => {
              this.props.navigation.goBack();
            }}
            {...accessibility("headerCloseBtn")}
          />

          <Text style={styles.headerSubTitle} {...accessibility("deliveredAtLabel")}>
            {this.getEstimatedText()}
          </Text>

          <View style={styles.orderFlex}>
            <Text style={[styles.deliveryEta, { color: statusModel.getColor() }]}>
              {text} {pickupTime}
            </Text>
            <View style={styles.statusView}>
              <FbIcon style={[styles.statusIcon, { color: statusModel.getColor() }]} name={statusModel.getIcon()} />
              <Text style={[styles.statusText, { color: statusModel.getColor() }]} {...accessibility("statusModelLabel")}>
                {statusModel.getName()}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
