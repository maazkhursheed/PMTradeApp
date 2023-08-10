import { Badge } from "native-base";
import * as React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import CustomIcon from "~root/Components/CustomIcon";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import { OrderDeliveriesActions } from "~root/Reducers/OrderDeliveriesReducers";
import { EnumOrderType } from "~root/Types/OrderItem";
import styles from "./SegmentStyles";
interface IStateProps {
  notificationCount: number;
  selectedOrderType: EnumOrderType;
  filterCount: number;
}

interface IDispatchProps {
  onOrderTypeSelect: (type: EnumOrderType) => void;
}

interface IOwnProps {}

interface State {}

type Props = IStateProps & IOwnProps & IDispatchProps;

const RenderFilterView = prop => (
  <View style={styles.filterBtnContainer}>
    <TouchableOpacity style={styles.facetIcon} onPress={prop?.onPress} {...accessibility("allFilterButton")}>
      <CustomIcon name={"sliders-icon"} style={styles.icon} {...accessibility("allFilter")} />
      {prop.filterCount > 0 && (
        <View style={styles.filterCount}>
          <Text style={styles.filterCountText}>{prop.filterCount}</Text>
        </View>
      )}
    </TouchableOpacity>
    <View style={styles.verticalSeprator}></View>
  </View>
);

class OrderListSegment extends React.Component<Props, State> {
  public state = {
    selected: EnumOrderType.Important,
  };

  public render() {
    return (
      <View style={styles.segmentContainer}>
        <RenderFilterView onPress={this.onFilterPress} filterCount={this.props.filterCount} />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.scrollContainer}>
            <TouchableOpacity style={[this.getButtonStyle(EnumOrderType.All)]} onPress={this.onAllClick} {...accessibility("allBtn")}>
              <Text style={this.getButtonTextStyle(EnumOrderType.All)}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              first={true}
              style={this.getButtonStyle(EnumOrderType.Important)}
              onPress={this.onImportantClick}
              {...accessibility("importantBtn")}
            >
              <Text style={this.getButtonTextStyle(EnumOrderType.Important)}>Important</Text>
              {this.props.notificationCount > 0 && (
                <Badge style={styles.badgeContainer} danger={true}>
                  <Text style={styles.badgeContainerText}>{this.props.notificationCount}</Text>
                </Badge>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={this.getButtonStyle(EnumOrderType.Delivery)} onPress={this.onDeliveryClick} {...accessibility("deliveriesBtn")}>
              <Text adjustsFontSizeToFit={true} style={this.getButtonTextStyle(EnumOrderType.Delivery)}>
                Deliveries
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.getButtonStyle(EnumOrderType.Pickup)} onPress={this.onPickupClick} {...accessibility("pickupBtn")}>
              <Text style={this.getButtonTextStyle(EnumOrderType.Pickup)}>Pick Ups</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  private onAllClick = () => {
    this.props.onOrderTypeSelect(EnumOrderType.All);
  };

  private onDeliveryClick = () => {
    this.props.onOrderTypeSelect(EnumOrderType.Delivery);
  };

  private onPickupClick = () => {
    this.props.onOrderTypeSelect(EnumOrderType.Pickup);
  };

  private onImportantClick = () => {
    this.props.onOrderTypeSelect(EnumOrderType.Important);
  };

  private getButtonStyle = (orderType: EnumOrderType) => {
    return orderType === this.props.selectedOrderType ? styles.buttonSelected : styles.buttonContainerInverse;
  };

  private getButtonTextStyle = (orderType: EnumOrderType) => {
    return orderType === this.props.selectedOrderType ? styles.buttonSelectedText : styles.buttonTextInverse;
  };

  private onFilterPress = () => {
    this.props.navigation.navigate("Filter");
  };
}

const mapStateToProps = (state: RootState): IStateProps => ({
  notificationCount: state.orderDeliveries.count,
  selectedOrderType: state.orderDeliveries.selectedOrderType,
  filterCount: state.orderDeliveries.filterCount,
});

const mapDispatchProps = (dispatch: any): IDispatchProps => ({
  onOrderTypeSelect: type => dispatch(OrderDeliveriesActions.selectOrderType(type)),
});

export default connect(mapStateToProps, mapDispatchProps)(OrderListSegment);
