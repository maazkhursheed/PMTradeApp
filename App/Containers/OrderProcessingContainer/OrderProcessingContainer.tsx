import { Col } from "native-base";
import * as R from "ramda";
import React from "react";
import { BackHandler, LayoutRectangle, SafeAreaView, Text, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Divider from "~root/Components/Divider";
import FbIcon from "~root/Components/FbIcon";
import LargeButton from "~root/Components/LargeButton/LargeButton";
import MainContainer from "~root/Components/MainContainer";
import { BranchResponse, displayFromAddress, getBranchAddress, OrderTypes } from "~root/Lib/BranchHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { mergeCoordinate } from "~root/Lib/MapsHelper";
import { RootState } from "~root/Reducers";
import { showDeliveryTime } from "~root/Reducers/ProductReducers";
import { fetchLineAddress } from "~root/Transforms/StringTransforms";
import style from "./OrderProcessingStyles";

interface OwnProps {}

interface State {
  markerLayout: LayoutRectangle;
}

interface StateProps {
  selectedAddress: string | undefined;
  geocode: Region;
  orderType: OrderTypes;
  selectedBranch: BranchResponse;
  tradeAccount: any;
}

interface DispatchProps {
  // selectAddress: () => void;
  // selectJob: () => void;
}

type Props = OwnProps & StateProps & NavigationScreenProps & DispatchProps;

class OrderProcessingContainer extends React.Component<Props, State> {
  public componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onGotit);
  }

  public componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onGotit);
    // this.props.selectAddress();
    // this.props.selectJob();
  }

  public onGotit = () => {
    this.props.navigation.navigate("OrderDeliveries");
    return false;
  };

  public render() {
    const center = {
      x: 8,
      y: -R.pathOr(0, ["markerLayout", "height"], this.state) / 2,
    };
    return (
      <MainContainer>
        <MapView style={style.mapView} initialRegion={this.props.geocode} region={this.props.geocode}>
          <Marker
            onLayout={e => this.setState({ markerLayout: e.nativeEvent.layout })}
            coordinate={this.props.geocode}
            style={style.markerContainer}
            centerOffset={center}
          >
            <View style={style.markerView}>
              <FbIcon name={"ic_marker"} style={style.marker} />

              <View style={style.markerAddress}>
                <Text style={style.textStyle} {...accessibility("deliverToLabel")}>
                  {this.props.orderType !== OrderTypes.PICKUP ? "Deliver to:" : "From"}
                </Text>
                <Text style={style.textStyle} {...accessibility("deliverToValueLabel")}>
                  {this.props.orderType !== OrderTypes.PICKUP ? this.props.selectedAddress : getBranchAddress(this.props.selectedBranch)}
                </Text>
              </View>
            </View>
          </Marker>
        </MapView>

        <SafeAreaView>
          <View style={style.container}>
            <Text style={style.Header} {...accessibility("orderProcessingLabel")}>
              Order processing
            </Text>
            <Text style={style.subHeader} {...accessibility("expressDeliveryLabel")}>
              {this.props.orderType} {this.props.orderType === OrderTypes.EXPRESS && showDeliveryTime()}
            </Text>
            <Divider style={style.divider} />

            <View style={style.directionsContainer}>
              <Col style={style.colStyle}>
                <Text style={style.subHeading} {...accessibility("fromLabel")}>
                  From
                </Text>
                <Text style={style.subtitle} {...accessibility("fromValueLabel")}>
                  {displayFromAddress(this.props.selectedBranch, this.props.orderType)}
                </Text>
              </Col>
              {this.props.orderType !== OrderTypes.PICKUP && (
                <Col style={style.colStyle}>
                  <Text style={style.subHeading} {...accessibility("toAddressLabel")}>
                    To
                  </Text>
                  <Text style={style.subtitle} {...accessibility("toAddressValueLabel")}>
                    {this.props.selectedAddress && fetchLineAddress(this.props.selectedAddress)}
                  </Text>
                </Col>
              )}
            </View>
            <Text style={[style.subHeading, style.billTextStyle]}>Billed to</Text>
            <Text style={style.subtitle}>
              {this.props.tradeAccount.custId} {this.props.tradeAccount.name}
            </Text>
          </View>
        </SafeAreaView>
        <LargeButton isFooter={true} style={style.sendBtn} onPress={this.onGotit} btnText={"Got it!"} />
      </MainContainer>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  selectedAddress: state.address.selectedAddress,
  geocode: mergeCoordinate(state.address.geocode),
  orderType: state.branchList.selectedOrderType,
  selectedBranch: state.branchList.selectedBranch,
  tradeAccount: state.connectTrade.selectedTradeAccount,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  // selectAddress: () => dispatch(AddressActions.setSelectedAddress(undefined)),
  // selectJob: () => dispatch(JobAccountsActions.selectJobAccount(undefined)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderProcessingContainer);
