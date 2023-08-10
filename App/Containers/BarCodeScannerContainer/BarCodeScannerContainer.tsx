import { Button } from "native-base";
import * as R from "ramda";
import React from "react";
import { EmitterSubscription, Keyboard, Platform, Text, TouchableOpacity, View } from "react-native";
import { RNCamera } from "react-native-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import * as Redux from "redux";
import BarcodeGridView from "~root/Components/BarcodeGridView";
import CommonHeader from "~root/Components/CommonHeader/CommonHeader";
import CustomIcon from "~root/Components/CustomIcon";
import FbIcon from "~root/Components/FbIcon/FbIcon";
import ScannedProductInfo from "~root/Components/ScannedProductInfo/ScannedProductInfo";
import { cameraPermissionMsg, cameraPermissionTitle, IAlertCallbacks, pointCameraAtBarcode } from "~root/Lib/AlertsHelper";
import { navigationalScreens } from "~root/Lib/BranchHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { safeRender, withAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { BarcodeActions } from "~root/Reducers/BarcodeScanReducers";
import { MyListActions } from "~root/Reducers/MyListReducers";
import { ProductActions } from "~root/Reducers/ProductReducers";
import { ISearchSolrParams } from "~root/Types/SearchAPITypes";
import style from "./BarCodeScannerContainerStyles";

/**
 * The properties passed to the component
 */
export interface OwnProps {}

/**
 * The properties mapped from Redux dispatch
 */
export interface DispatchProps {
  solrSearch: (param: ISearchSolrParams) => void;
  requestList: (callback: IAlertCallbacks) => void;
  updateCart?: (payload: any, meta: IAlertCallbacks) => void;
  clearNewList: () => void;
}

/**
 * The properties mapped from the global state
 */
export interface StateProps {
  productScanned: any;
  isLoading: boolean;
  scanFailed: boolean;
}

/**
 * The local state
 */
export interface State {
  barcode: string;
  isScanning: boolean;
  flashMode: boolean;
  keyboardOpen: boolean;
  hideList: boolean;
  quantity: string;
}

type Props = StateProps & DispatchProps & OwnProps & NavigationScreenProps;

class BarCodeScannerContainer extends React.Component<Props, State> {
  private keyboardDidShowListener: EmitterSubscription | undefined;
  private keyboardDidHideListener: EmitterSubscription | undefined;

  constructor(state: Props) {
    super(state);
    this.state = {
      isScanning: true,
      flashMode: false,
      keyboardOpen: false,
      barcode: "",
      quantity: "1",
      hideList: false,
    };
  }

  public componentDidMount(): void {
    if (__DEV__) {
      setTimeout(() => this.onBarcodeScan({ data: "1015290" }), 10);
    }

    this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this.keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", this.keyboardDidHide.bind(this));
  }

  public componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  public keyboardDidShow(e) {
    this.setState({ keyboardOpen: true });
  }

  public keyboardDidHide() {
    this.setState({ keyboardOpen: false });
  }

  public back = () => {
    this.props.navigation.pop();
  };

  public onBarcodeScan = barCode => {
    if (this.state.isScanning && barCode?.data) {
      this.setState({
        isScanning: false,
        barcode: barCode.data,
        quantity: "1",
      });
      this.props.solrSearch({ query: barCode.data });
    }
  };

  public render() {
    return (
      <SafeAreaView style={style.container}>
        <CommonHeader
          ref={c => (this.commonHeader = c)}
          headerStyle={style.headerStyle}
          style={style.headerStyle}
          title={"Camera"}
          titleStyle={style.titleStyle}
          navigation={this.props.navigation}
          leftItem={
            <Button
              onPress={() => {
                this.setState({ flashMode: !this.state.flashMode });
              }}
              style={style.flashButtonStyle}
              transparent={true}
              {...accessibility("leftItemFlashBtn")}
            >
              <CustomIcon style={style.iconStyle} name={this.shouldTurnOnFlash() ? "flash-on" : "flash-off"} />
            </Button>
          }
          rightItem={
            <Button onPress={this.back} transparent={true} {...accessibility("rightItemCloseBtn")} style={style.closeButtonStyle}>
              <FbIcon name={"ic_close"} style={style.iconStyle} />
            </Button>
          }
        />
        <View style={style.cameraView}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            type={"back"}
            captureAudio={false}
            autoFocus={"on"}
            flashMode={this.shouldTurnOnFlash() ? "torch" : "off"}
            style={style.preview}
            androidCameraPermissionOptions={{
              title: cameraPermissionTitle,
              message: cameraPermissionMsg,
              buttonPositive: "Ok",
              buttonNegative: "Don't Allow",
            }}
            permissionDialogTitle={"Permission to use camera"}
            permissionDialogMessage={"We need your permission to use your camera phone"}
            onBarCodeRead={this.onBarcodeScan}
          />
          <TouchableOpacity onPress={() => this.setState({ isScanning: true })} disabled={this.state.isScanning} style={style.touchContainerForDismiss}>
            {this.state.isScanning && <BarcodeGridView />}
            <View style={this.getProductStyle()}>
              <ScannedProductInfo
                qty={this.state.quantity}
                showCard={!this.state.isScanning}
                error={this.props.scanFailed}
                isLoading={this.props.isLoading}
                product={this.props.productScanned}
                onTryAgain={() => this.setState({ isScanning: true })}
                updateCart={this.props.updateCart}
                onUpdateCart={this.onUpdateCart}
                onQuantityInputFocusChange={(isFocused: boolean) => {
                  this.setState({ hideList: isFocused });
                }}
                {...accessibility("scannedProductInfoTile")}
              />
            </View>
          </TouchableOpacity>
        </View>
        {this.state.isScanning && <Text style={style.textStyle}>{pointCameraAtBarcode}</Text>}
      </SafeAreaView>
    );
  }

  public getProductStyle() {
    if (Platform.OS === "ios") {
      return this.state.keyboardOpen ? style.productDetailsContainerTopPosition : style.productDetailsContainer;
    }
    return style.productDetailsContainer;
  }

  public shouldTurnOnFlash() {
    return this.state.isScanning && this.state.flashMode;
  }

  public onUpdateCart = (quantity: any) => {
    this.setState({ quantity });
  };
}

const mapDispatchToProps = (dispatch: Redux.Dispatch): DispatchProps => ({
  solrSearch: param => dispatch(BarcodeActions.requestSearchSolr(param)),
  clearNewList: () => dispatch(MyListActions.clearNewList()),
  requestList: alertCallbacks => dispatch(MyListActions.getAllList(undefined, alertCallbacks)),
  updateCart: (payload, meta) => dispatch(ProductActions.cartChange(payload, meta)),
});

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => ({
  productScanned: R.pathOr(undefined, ["barcode", "product"], state),
  isLoading: state.barcode.fetching,
  scanFailed: state.barcode.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(withAppender(safeRender(BarCodeScannerContainer, navigationalScreens.BarCodeScanningScreen)));
