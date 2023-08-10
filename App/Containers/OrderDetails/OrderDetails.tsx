import moment from "moment";
import { Col, Row } from "native-base";
import * as R from "ramda";
import * as RA from "ramda-adjunct";
import React, { Component } from "react";
import { FlatList, Linking, ScrollView, Text, View } from "react-native";
import ActionSheet from "react-native-actionsheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CustomAlert from "~root/Components/CustomAlert/CustomAlert";
import Divider from "~root/Components/Divider";
import LargeButton from "~root/Components/LargeButton";
import LiveTrackButton from "~root/Components/LiveTrackButton/LiveTrackButton";
import MainContainer from "~root/Components/MainContainer";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import SmallButton from "~root/Components/SmallButton";
import { apiErrorBtnTxt, apiErrorMsg, cancelBtnTxt, IAlertCallbacks, OKButton, phoneUnavailableErr, titleErr } from "~root/Lib/AlertsHelper";
import { navigationalScreens } from "~root/Lib/BranchHelper";
import { curryMomentFormat } from "~root/Lib/CommonHelper";
import { accessibility, getFulfilmentBranchIdOnOrderDetail, occludeSensitiveView } from "~root/Lib/DataHelper";
import { safeRender, withAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { BranchDetailsActions } from "~root/Reducers/BranchDetailReducers";
import { OrderDetailsActions } from "~root/Reducers/OrderDetailsReducers";
import OrderDetailModel, { OrderProductItemModel } from "~root/Types/OrderDetail";
import { ISupplierObject, OrderStatus } from "~root/Types/OrderItem";
import { PermissionTypes } from "~root/Types/Permissions";
import OrderDetailsHeaders from "./OrderDetailsHeader/index";
import styles from "./OrderDetailsStyles";

interface OwnProps {}

interface StateProps {
  data?: OrderDetailModel;
  selectedTradeAccId: any;
}

export interface State {
  customModelData: any;
}
interface DispatchProps {
  clearOrderDetails: (showLoader: boolean) => void;
  requestOrderDetails: (orderModel: OrderDetailModel, alertCallbacks: IAlertCallbacks) => void;
  fetchOrderFulfilmentBranch: (requestParams: any) => void;
}

type Props = OwnProps & DispatchProps & NavigationScreenProps<{ data: OrderDetailModel; index: number }> & StateProps;

const BUTTONS = (data: any, phone: any) => {
  const statusEqual = R.propEq("status");
  const composeCheckDate = (checkDate: any) => moment(R.prop("requestDate", checkDate)).isAfter(new Date());

  const ret = [];
  if (
    R.anyPass([
      statusEqual(OrderStatus.Received),
      statusEqual(OrderStatus.Picking),
      statusEqual(OrderStatus.ReadyToPickUp),
      statusEqual(OrderStatus.AssignedToVehicle),
      statusEqual(OrderStatus.Picked),
    ])(data)
  ) {
    ret.push("Status Update");
  }
  if (
    R.anyPass([
      R.both(statusEqual(OrderStatus.Received), composeCheckDate),
      R.both(statusEqual(OrderStatus.Picking), composeCheckDate),
      R.both(statusEqual(OrderStatus.Picked), composeCheckDate),
    ])(data)
  ) {
    if (data.fulfilmentType === "Pickup") {
      ret.push("Change Pickup Date");
    } else {
      ret.push("Change Delivery Date");
    }
  }
  if (R.both(statusEqual(OrderStatus.Received), composeCheckDate)(data)) {
    ret.push("Change to Order Items");
  }

  ret.push("Other: Call " + phone);
  ret.push("Cancel");

  return ret;
};
class OrderDetails extends Component<Props> {
  private ActionSheet: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      customModelData: {
        heading: "",
        message: "",
        visible: false,
        onClose: undefined,
        button1Text: "",
        onButton1Press: undefined,
        button2Text: "",
        onButton2Press: undefined,
      },
    };
  }

  public componentDidMount(): void {
    this.props.requestOrderDetails(R.path(["route", "params", "data"], this.props), { onFailure: this.onFailureOrderDetails });
    this.props.fetchOrderFulfilmentBranch(getFulfilmentBranchIdOnOrderDetail(this.props));
  }

  public componentWillUnmount() {
    this.props.clearOrderDetails(false);
  }

  public renderOrderDetial = () => {
    const jobDetails = this.props.data.jobDetails;
    return (
      <>
        <View style={styles.orderDetailsFlex}>
          <Text ref={occludeSensitiveView} style={styles.orderName} {...accessibility("jobNameLabel")}>
            {jobDetails.jobName}
          </Text>
          <Text style={styles.deliveryType} {...accessibility("jobDeliveryTypeLabel")}>
            {jobDetails.jobDeliveryType}
          </Text>
        </View>
        <View style={styles.orderDetailsFlex}>
          <Text style={styles.deliveryDetail} {...accessibility("processorLabel")}>
            {"Processed by " + jobDetails.processor.by + " - " + curryMomentFormat("ll", jobDetails.processor.When) + " - " + jobDetails.processor.branch}
          </Text>
          {!!jobDetails.jobPoNumber && (
            <Text style={styles.deliveryId} {...accessibility("jobPoNumberLabel")}>
              # {jobDetails.jobPoNumber}
            </Text>
          )}
        </View>
        <Divider />
      </>
    );
  };

  public renderSupplierDetails = () => {
    const suppliers = R.path(["data", "original", "orderLines"], this.props) as any;
    const supplier = R.path(["0", "supplier"], suppliers) as ISupplierObject;
    const supplierDirectMessage = R.path(["data", "original", "supplierDirectMessage"], this.props) as any;
    if (supplier && supplierDirectMessage !== "") {
      return (
        <>
          <Text style={styles.subHeader} {...accessibility("supplierLabel")}>
            Supplier details
          </Text>
          {/*{R.map(this.renderSupplierText)(supplier)}*/}
          <Text style={[styles.itemDetails, styles.marginStyle]}>
            {supplier.supplierName ? supplier.supplierName : ""}
            {"\nPO sent on "}
            {supplier.supplierPODate ? moment(supplier.supplierPODate).format("ll") : ""}
          </Text>
          <Divider />
        </>
      );
    } else {
      return null;
    }
  };

  public call = () => {
    const num = R.path(["data", "siteContact", "phone"], this.props);
    Linking.openURL("tel:" + num);
  };

  public email = () => {
    const email = R.path(["data", "siteContact", "email"], this.props);
    Linking.openURL("mailto:" + email);
  };

  public renderSiteContact = () => {
    if (!this.props.data.siteContact) {
      return null;
    }
    const num = R.pathOr("", ["data", "siteContact", "phone"], this.props);
    const email = R.pathOr("", ["data", "siteContact", "email"], this.props);
    const Name = R.pathOr("", ["data", "siteContact", "name"], this.props);

    const siteDetails = R.compose(R.join("\n"), R.reject(RA.isNilOrEmpty))([Name, num, email]);

    return (
      <>
        <Text style={styles.subHeader} {...accessibility("siteContactLabel")}>
          Site contact
        </Text>
        <View style={styles.siteContainer}>
          <Text ref={occludeSensitiveView} style={[styles.itemDetails, styles.siteDetailsText]}>
            {siteDetails}
          </Text>
          {!!num && <SmallButton onPress={this.call} style={styles.callButton} btnText={"Call"} />}
          {!!email && <SmallButton onPress={this.email} btnText={"Email"} />}
        </View>
        <Divider />
      </>
    );
  };

  public renderOriginalDetails = () => {
    if (R.path(["data", "original", "stagingAreas"], this.props)) {
      if (this.props.data.original.stagingAreas.length > 0) {
        return (
          <>
            <Text style={styles.subHeader} {...accessibility("originalLabel")}>
              Staging areas
            </Text>
            <Text style={[styles.itemDetails, styles.marginStyle]} {...accessibility("originalLabel")}>
              {this.props.data.original.stagingAreas.join("\r\n")}
            </Text>
          </>
        );
      }
    } else {
      return null;
    }
  };

  public renderCollectionDetails = () => {
    if (R.path(["data", "collection"], this.props)) {
      const { address, branch } = this.props.data.collection;

      return (
        <>
          <Text style={styles.subHeader} {...accessibility("collectionLabel")}>
            Pickup details
          </Text>
          <Text style={[styles.itemDetails, styles.marginStyle]} {...accessibility("branchaddressLabel")}>
            {branch + "\n" + address}
          </Text>
          {this.renderOriginalDetails()}
          <Divider />
        </>
      );
    } else {
      return null;
    }
  };

  public showLocalAlertMessage = (direction: string) => {
    if (direction === "failureOrderDetails") {
      this.setState({
        customModelData: {
          heading: titleErr,
          message: apiErrorMsg,
          visible: true,
          onClose: () => this.disableCustomModel(),
          button1Text: apiErrorBtnTxt,
          button2Text: cancelBtnTxt,
          onButton1Press: () => {
            this.disableCustomModel();
            this.props.requestOrderDetails(R.path(["route", "params", "data"], this.props), { onFailure: this.onFailureOrderDetails });
          },
          onButton2Press: () => {
            this.disableCustomModel();
          },
        },
      });
    } else {
      this.setState({
        customModelData: {
          visible: true,
          heading: titleErr,
          message: phoneUnavailableErr,
          onClose: () => {
            this.disableCustomModel();
          },
          button1Text: OKButton,
          onButton1Press: () => {
            this.disableCustomModel();
          },
        },
      });
    }
  };

  public renderDeliveryDetails = () => {
    const fulfilmentType = R.path(["data", "original"], this.props).fulfilmentType;
    if (R.path(["data", "original"], this.props)) {
      const { deliveryAddress, deliveryRequirements } = this.props.data.original;
      if (RA.isNilOrEmpty(deliveryAddress)) {
        return null;
      }

      return (
        <>
          <View style={styles.deliveryDetailContainer}>
            <View style={styles.deliveryLabel}>
              <Text style={styles.subHeader} {...accessibility("deliveryDetailsLabel")}>
                {fulfilmentType === "Delivery" && "Delivery details"}
                {fulfilmentType === "Pickup" && "Pickup details"}
              </Text>
              <Text style={[styles.itemDetails, styles.branchTextStyle]} {...accessibility("addressLabel")}>
                {this.props.data.jobDetails.processor.branch}
              </Text>
              <Text style={[styles.itemDetails, styles.marginStyle]} {...accessibility("addressLabel")}>
                {deliveryAddress.address1}
                {", "}
                {deliveryAddress.address2}
                {", "}
                {deliveryAddress.city}
                {deliveryAddress.suburb}
              </Text>
              {this.renderOriginalDetails()}
              {deliveryRequirements.siteRequirements.length !== 0 && (
                <>
                  <Text style={styles.deliverCaptionHeader} {...accessibility("deliveryreqLabel")}>
                    Additional information
                  </Text>
                  <Text style={styles.deliveryCaption} {...accessibility("deliveryreqValueLabel")}>
                    {deliveryRequirements.siteRequirements}
                  </Text>
                </>
              )}
            </View>
            <LiveTrackButton style={styles.liveTrackButton} />
          </View>
          <Divider style={styles.dividerStyle} />
        </>
      );
    } else {
      return null;
    }
  };

  public renderItems = ({ item }) => {
    const dataItem = item as OrderProductItemModel;
    return (
      <View style={styles.listItem}>
        <Row>
          <Col>
            <View>
              <Text style={styles.itemDetails} {...accessibility("dataDescLabel")}>
                {dataItem.description}
              </Text>
              <Text style={styles.skuNumber} {...accessibility("SKULabel")}>
                SKU {dataItem.sku}
              </Text>
            </View>
          </Col>
          <Col>
            <Text style={styles.itemQuantity} {...accessibility("itemUOMLabel")}>
              {parseFloat(dataItem.qtyOrdered)} {dataItem.unitOfMeasure}
            </Text>
          </Col>
        </Row>
      </View>
    );
  };

  public renderOrdersHeader = () => {
    return (
      <Text style={styles.subHeader} {...accessibility("orderDetailsLabel")}>
        Order details
      </Text>
    );
  };

  public render() {
    if (this.props.data) {
      const phone = this.props.data.siteContact ? this.props.data.siteContact.phone : "";
      const buttons = BUTTONS(this.props.data, phone);
      const cancelIndex = buttons.length - 1;
      return (
        <MainContainer>
          <OrderDetailsHeaders data={this.props.data} navigation={this.props.navigation} />
          <ScrollView style={styles.content}>
            {this.renderOrderDetial()}
            {this.renderSiteContact()}
            {this.renderSupplierDetails()}
            {this.renderDeliveryDetails()}
            {this.renderCollectionDetails()}

            <FlatList
              ListHeaderComponent={this.renderOrdersHeader}
              data={this.props.data.original.orderLines}
              style={styles.flatList}
              renderItem={this.renderItems}
              {...accessibility("orderItemsFlatList")}
            />
          </ScrollView>
          <CustomAlert
            heading={this.state.customModelData?.heading}
            msg={this.state.customModelData?.message}
            visible={this.state.customModelData?.visible}
            onClose={this.state.customModelData?.onClose}
            button1Text={this.state.customModelData?.button1Text}
            button2Text={this.state.customModelData?.button2Text}
            onButton1Press={this.state.customModelData?.onButton1Press}
            onButton2Press={this.state.customModelData?.onButton2Press}
          />

          <ActionSheet
            ref={o => (this.ActionSheet = o)}
            title={"Request:"}
            {...accessibility("actionSheetBtn")}
            options={buttons}
            cancelButtonIndex={cancelIndex}
            onPress={index => {
              switch (buttons[index]) {
                case "Status Update":
                  this.props.navigation.navigate("ChangeStatus", {
                    order: this.props.data,
                  });
                  break;
                case "Change Pickup Date":
                  this.props.navigation.navigate("ChangeDate", {
                    order: this.props.data,
                    title: "Change Pickup Date",
                  });
                  break;
                case "Change Delivery Date":
                  this.props.navigation.navigate("ChangeDate", {
                    order: this.props.data,
                    title: "Change Delivery Date",
                  });
                  break;
                case "Change to Order Items":
                  this.props.navigation.navigate("ChangeOrderItem", {
                    order: this.props.data,
                  });
                  break;

                case "Other: Call " + phone:
                  phone ? Linking.openURL(`tel:${phone}`) : this.showLocalAlertMessage("OtherCall");
                  break;
              }
            }}
          />
          <SafeAreaView style={styles.orderOptionsBtnContainer}>
            <PermissionComponent permissionTypes={[PermissionTypes.ViewOrdersAndDeliveries, PermissionTypes.AccountOwner, PermissionTypes.UserAdmin]}>
              <LargeButton
                isFooter={true}
                onPress={() => {
                  this.orderOptions(this.props.data);
                }}
                btnText={"Order options"}
                disabled={false}
              />
            </PermissionComponent>
          </SafeAreaView>
        </MainContainer>
      );
    } else {
      return null;
    }
  }

  public orderOptions = order => {
    this.ActionSheet.show();
  };

  public disableCustomModel = () => {
    this.setState({
      customModelData: {
        heading: "",
        message: "",
        visible: false,
        onClose: undefined,
        button1Text: "",
        onButton1Press: undefined,
        button2Text: "",
        onButton2Press: undefined,
      },
    });
  };

  private onFailureOrderDetails = () => {
    this.showLocalAlertMessage("failureOrderDetails");
  };
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    data: state.orderDetails.data,
    selectedTradeAccId: state.connectTrade.selectedTradeAccount,
  };
};
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  clearOrderDetails: (showLoader: boolean) => dispatch(OrderDetailsActions.clearOrderDetailsData(showLoader)),
  requestOrderDetails: (data, alertCallbacks) => dispatch(OrderDetailsActions.request(data, alertCallbacks)),
  fetchOrderFulfilmentBranch: (fulfilmentBranchId: any) => {
    dispatch(BranchDetailsActions.getOrderFulfilmentBranchDetails(fulfilmentBranchId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withAppender(safeRender(OrderDetails, navigationalScreens.MyOrderDetailsScreen)));
