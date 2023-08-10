import firebase from "@react-native-firebase/app";
import moment from "moment";
import * as React from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import AddToExistingItemComponent from "~root/Components/AddToExistingItemComponent";
import CustomIcon from "~root/Components/CustomIcon";
import LargeButton from "~root/Components/LargeButton";
import LoadingView from "~root/Components/LoadingView";
import MainContainer from "~root/Components/MainContainer";
import SmallHeader from "~root/Components/SmallHeader";
import { deliveriesInProgress, genericErrorMessage, IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { BranchResponse, getBranchTownRegion, OrderTypes } from "~root/Lib/BranchHelper";
import { getFulfilmentpageAnalyticsObj, getSelectedAccountId, parseAddToExisting } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { RootState } from "~root/Reducers";
import { AddressActions } from "~root/Reducers/AddressReducers";
import { CartActions } from "~root/Reducers/CartReducer";
import { ApplicationStyles, Colors } from "~root/Themes";
import styles from "./AddToExistingStyles";

/**
 * The properties mapped from the global state
 */
export interface StateProps {
  existingData: any;
  fetchingAddress: boolean;
  selectedBranch: BranchResponse;
  digitalId: any;
  cartDetail: any;
  selectedAccountId: string;
  selectedAddress: string | undefined;
}

export interface DispatchProps {
  addUpdateDeliveryAddress: (payload: any, alertCallbacks: IAlertCallbacks) => void;
  updateRequestDateTime: (payload: any) => void;
  requestGeoCode: (address: string, callback: IAlertCallbacks) => void;
}

/**
 * The local state
 */
export interface State {
  selectedOrder: any;
  showTodaysOrders: boolean;
}

type Props = StateProps & DispatchProps & NavigationScreenProps;

class AddToExisting extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      selectedOrder: {},
      showTodaysOrders: true,
    };
  }

  public componentDidMount() {
    this.logFirebaseEvent(5, OrderTypes.ADD_TO_EXISTING);
  }

  public logFirebaseEvent(step: number, orderType: string) {
    const digitalId = this.props.digitalId;
    const cartDetail = this.props.cartDetail;
    const selectedAccountId = this.props.selectedAccountId;
    const selectedAddress = this.props.selectedAddress;
    const eventLogObject = getFulfilmentpageAnalyticsObj({
      step,
      orderType,
      props: {
        digitalId,
        cartDetail,
        selectedAccountId,
        selectedAddress: this.state.selectedOrder?.formattedAddress || selectedAddress || "",
      },
      location: getBranchTownRegion(this.props.selectedBranch),
      storeName: this.props.selectedBranch?.name || "",
      orderNumber: this.state.selectedOrder?.orderNumber || "",
    });
    firebase.analytics().logEvent("begin_checkout", eventLogObject);
  }

  public continueTapped = () => {
    this.logFirebaseEvent(6, OrderTypes.ADD_TO_EXISTING);
    const onFailure = () => Toast.show({ text1: genericErrorMessage, type: "info", visibilityTime: 3000 });
    this.props.requestGeoCode(this.state.selectedOrder?.formattedAddress, {
      onSuccess: (geocode: any) => {
        this.props.addUpdateDeliveryAddress(
          { address: this.state.selectedOrder?.formattedAddress, geocode },
          {
            onSuccess: () => {
              this.props.updateRequestDateTime({
                requestDate: moment(this.state.selectedOrder?.requestDate).format("DD/MM/YYYY"),
                requestTime: this.state.selectedOrder?.DSP,
              });
              this.props.navigation.navigate("AccountDetails", {
                previousOrder: this.state.selectedOrder,
                isFromAddToExisting: true,
              });
            },
            onFailure,
          },
        );
      },
      onFailure,
    });
  };

  public renderUnAvailableOrders = () => {
    return (
      <>
        <View style={styles.viHeader}>
          <Text style={styles.sectionTitle}>{deliveriesInProgress}</Text>
          <TouchableOpacity
            style={styles.btnArrow}
            onPress={() =>
              this.setState(prevState => {
                this.setState({
                  showTodaysOrders: !prevState.showTodaysOrders,
                });
              })
            }
          >
            <CustomIcon name={this.state.showTodaysOrders ? "chevron-up" : "chevron-down"} size={16} color={Colors.darkGrey} />
          </TouchableOpacity>
        </View>
        {this.state.showTodaysOrders && <View style={styles.viewSeparator} />}
        {this.state.showTodaysOrders && this.props.existingData?.unAvailableOrders?.map((item: any) => this.renderItem(item, true))}
        {
          <View>
            {this.state.showTodaysOrders && (
              <>
                <View style={styles.lineSeparator} />
                <Text style={styles.txtMessage}>{"You cannot add products to ongoing deliveries."}</Text>
              </>
            )}
            <View style={styles.sectionSeparator} />
          </View>
        }
      </>
    );
  };

  public render() {
    return (
      <MainContainer>
        <SmallHeader style={ApplicationStyles.noShadow} navigation={this.props.navigation} title={"Add to existing"} />
        <LoadingView isLoading={this.props.fetchingAddress} style={styles.loadingViewStyle}>
          <ScrollView>
            {this.props.existingData?.unAvailableOrders?.length > 0 && this.renderUnAvailableOrders()}
            {this.props.existingData?.availableOrders?.map((item: any) => this.renderItem(item, false))}
          </ScrollView>
        </LoadingView>
        <View style={styles.continueButtonContainer}>
          <LargeButton
            disabled={!this.state.selectedOrder?.formattedAddress}
            textStyle={styles.largeButtonTextStyle}
            style={styles.largeButtonStyle}
            onPress={this.continueTapped}
            btnText={"Continue"}
          />
        </View>
      </MainContainer>
    );
  }

  private renderItem = (sectionItem: any, isFromUnavailable: boolean) => {
    return (
      <View key={sectionItem?.title}>
        <View style={styles.viHeader}>
          <Text style={styles.sectionTitle}>{sectionItem.title}</Text>
        </View>
        <View style={styles.lineSeparator} />
        <FlatList
          data={sectionItem.data}
          renderItem={({ item }) => (
            <AddToExistingItemComponent item={item} selectedOrder={this.state.selectedOrder} onPress={selectedOrder => this.setState({ selectedOrder })} />
          )}
        />
        {!isFromUnavailable && <View style={styles.sectionSeparator} />}
      </View>
    );
  };
}

const mapStateToProps = (state: RootState): StateProps => {
  const deliveryObj = state?.cart?.eligibility?.filter((item: any) => item.deliveryType === "Delivery");
  let earliestDate = moment().format("YYYY-MM-DD");
  if (deliveryObj?.length > 0) {
    earliestDate = deliveryObj[0]?.earliestDate;
  }
  return {
    existingData: parseAddToExisting(state?.existingOrders?.data?.deliveries, earliestDate),
    fetchingAddress: state.address.fetchingAddress || state.cart.fetching,
    selectedBranch: state.branchList?.selectedBranch || "",
    digitalId: extractDigitalIdFromJWTPayload(decodeJWTToken(state.login.tempToken.idToken)) as string,
    selectedAddress: state.address ? state.address.selectedAddress : undefined,
    selectedAccountId: getSelectedAccountId(state),
    cartDetail: state.cart.userCartDetail,
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  requestGeoCode: (address, callback) => dispatch(AddressActions.requestGeocode(address, callback)),
  addUpdateDeliveryAddress: (payload, alertCallbacks) => dispatch(AddressActions.requestAddUpdateDeliveryAddress(payload, alertCallbacks)),
  updateRequestDateTime: payload => dispatch(CartActions.updateRequestDateTime(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToExisting);
