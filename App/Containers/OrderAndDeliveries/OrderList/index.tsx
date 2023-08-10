import { StackActions } from "@react-navigation/native";
import { Col, Row } from "native-base";
import * as R from "ramda";
import React, { Component } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import FbIcon from "~root/Components/FbIcon";
import NativeWrapper from "~root/Components/NativeWrapper";
import ListHeader from "~root/Containers/OrderAndDeliveries/OrderList/ListHeader";
import { isToday } from "~root/Lib/CommonHelper";
import { accessibility, occludeSensitiveView } from "~root/Lib/DataHelper";
import OrderItemHelper, { getDeliveryText, getEstimatedPickupTime, getHeaderTextForItems } from "~root/Lib/OrderItemHelper";
import { RootState } from "~root/Reducers";
import { GroupOrderItem } from "~root/Transforms/OrderItem";
import OrderDetailModel from "~root/Types/OrderDetail";
import { EnumOrderType, OrderItemGroupType, OrderSort } from "~root/Types/OrderItem";
import styles from "./../OrderListStyles";

interface OwnProps {}

interface DispatchProps {
  pushOrderDetail: (data: OrderDetailModel) => void;
}

interface StateProps {
  data?: OrderItemGroupType;
  orderType: EnumOrderType;
}

type Props = OwnProps & DispatchProps & StateProps;

interface IState {
  collapsedState: { [key: string]: boolean };
}

class OrderList extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      collapsedState: {},
    };
  }

  public render() {
    if (R.isEmpty(this.props.data)) {
      return null /*<Text>No data available to display, Please choose different criteria.</Text>*/;
    } else {
      return (
        <View style={styles.listContainer} accessible={false}>
          {R.compose(R.map(this.renderList), R.keys)(this.props.data)}
        </View>
      );
    }
  }

  // @ts-ignore
  private renderOrderItem = (item, header, index) => {
    const data = item as OrderDetailModel;
    const statusModel = new OrderItemHelper(data?.status, data?.fulfilmentType);
    const isCollapsed = !!R.prop(header, this.state.collapsedState);
    if (isCollapsed) {
      return null;
    } else {
      return (
        <NativeWrapper
          onPress={() => {
            this.props.navigation.navigate("OrderDetails", {
              screen: "OrderDetails",
              params: {
                data: {
                  orderId: data?.orderNumber,
                  pdoNumber: data?.orderNumber,
                  index,
                  jobId: data?.jobDetails?.jobId,
                },
                fulfilmentBranchId: data?.fulfilmentBranchId,
              },
            });
          }}
          {...accessibility("orderDetailsNativeWrapper")}
        >
          <View accessible={false}>
            {isToday(R.prop("requestDate", data)) && this.props.orderType === EnumOrderType.Important && (
              <View style={styles.unreadPointer} accessible={false} />
            )}
            <View style={styles.orderListItemContainer} accessible={false}>
              <View style={styles.topCartContainer} accessible={false}>
                <View style={styles.orderListItemFlex} accessible={false}>
                  <View style={styles.jobNameContainer} accessible={false}>
                    <Text ref={occludeSensitiveView} numberOfLines={1} style={styles.textName} {...accessibility("jobNameLabel")}>
                      {data?.jobDetails?.jobName}
                    </Text>
                  </View>
                  <View accessible={false}>
                    <TouchableOpacity
                      style={styles.orderOptionBtn}
                      {...accessibility("orderDetailsBtn")}
                      accessible={false}
                      onPress={() => {
                        this.props.navigation.navigate("OrderDetails", {
                          screen: "OrderDetails",
                          params: {
                            data: {
                              orderId: data?.orderNumber,
                              pdoNumber: data?.orderNumber,
                              index,
                              jobId: data?.jobDetails?.jobId,
                            },
                            fulfilmentBranchId: data?.fulfilmentBranchId,
                          },
                        });
                      }}
                    >
                      <Text style={styles.orderOptionsText} {...accessibility("orderDetailsBtnText")}>
                        {"ORDER DETAILS"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={[styles.orderListItemFlex, { marginTop: 3 }]} accessible={false}>
                  {data?.orderNumber && (
                    <Col accessible={false}>
                      <Row accessible={false}>
                        <Text style={styles.orderNumberLabel} accessible={false}>
                          Order{" "}
                        </Text>
                        <Text style={styles.orderNumber} {...accessibility("orderNumberLabel")}>
                          #{data?.orderNumber}
                        </Text>
                      </Row>
                    </Col>
                  )}
                  <Col style={styles.colStyle} accessible={false}>
                    <View style={styles.statusIconContainer} accessible={false}>
                      <FbIcon style={[styles.iconStyle, { color: statusModel.getColor() }]} name={statusModel.getIcon()} accessible={false} />
                      <Text style={[styles.statusName, { color: statusModel.getColor() }]} {...accessibility("statusNameLabel")}>
                        {statusModel.getName()}
                      </Text>
                    </View>
                  </Col>
                </View>
              </View>
              <View style={styles.bottomCartContainer} accessible={false}>
                <View style={styles.orderListItemFlex} accessible={false}>
                  <View style={[styles.refContainer]} accessible={false}>
                    <Text style={[styles.orderNumberLabel, styles.refLabel]} accessible={false}>
                      REF
                    </Text>
                    <Text numberOfLines={1} style={[styles.textTime, styles.refValueText]} {...accessibility("jobPoNumberLabel")}>
                      {data?.jobDetails?.jobPoNumber}
                    </Text>
                  </View>
                  <View style={[styles.refContainer, { marginLeft: 5 }]} accessible={false}>
                    <Text style={[styles.orderNumberLabel, styles.dateLabel]} accessible={false}>
                      DATE
                    </Text>
                    <View style={styles.dateValueText} accessible={false}>
                      <Text style={styles.textTime} {...accessibility("itemDateLabel")}>
                        {getHeaderTextForItems(item)}
                        {item?.fulfilmentType === "Pickup" && (
                          <Text {...accessibility("itemTimeLabel")}>
                            {" - " + getEstimatedPickupTime(item?.fulfilmentType === "Pickup" ? R.path(["original", "pickupTime"], item) : "")}
                          </Text>
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
                {!!getDeliveryText(item?.original) && (
                  <View style={[styles.orderListItemFlex]} accessible={false}>
                    <Text style={[styles.orderNumberLabel, styles.textLabel]} accessible={false}>
                      TYPE
                    </Text>
                    <Text style={[styles.textTime, styles.deliveryTypeText]} {...accessibility("jobDeliveryTypeLabel")}>
                      {getDeliveryText(item?.original)}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </NativeWrapper>
      );
    }
  };
  private renderList = (header: string) => {
    return (
      <FlatList
        style={styles.listStyle}
        data={
          // @ts-ignore
          this.props.data[header] || []
        }
        keyExtractor={(item, index) => (item ? item.orderNumber : index)}
        extraData={this.state.collapsedState}
        renderItem={({ item, index }) => {
          return this.renderOrderItem(item, header, index);
        }}
        ListHeaderComponent={() => (
          <View style={styles.titleWrapper} accessible={false}>
            <ListHeader
              collapsed={!!R.prop(header, this.state.collapsedState)}
              onPressed={() => {
                this.setState({
                  collapsedState: R.assoc(header, !R.prop(header, this.state.collapsedState), this.state.collapsedState),
                });
              }}
              headerText={header}
            />
          </View>
        )}
        {...accessibility("orderFlatList")}
      />
    );
  };
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    orderType: state.orderDeliveries.selectedOrderType,
    data:
      state.orderDeliveries.filteredData &&
      R.reject(R.isEmpty, GroupOrderItem(OrderSort[state.orderDeliveries.filter.sort], state.orderDeliveries.filteredData)),
  };
};

const mapDispatchToProps = (dispatch: (action: any) => any): DispatchProps => ({
  pushOrderDetail: (params: OrderDetailModel) => {
    const action = StackActions.push("OrderDetails", params);
    dispatch(action);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
