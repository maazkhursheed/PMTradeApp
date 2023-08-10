import Geolocation from "@react-native-community/geolocation";
import { Text } from "native-base";
import R from "ramda";
import * as React from "react";
import { AppState, Platform, RefreshControl, SectionList, TouchableOpacity, View } from "react-native";
import RNPermissions, { checkMultiple, openSettings, PERMISSIONS, RESULTS } from "react-native-permissions";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CustomAlert from "~root/Components/CustomAlert/CustomAlert";
import CustomIcon from "~root/Components/CustomIcon";
import LoadingView from "~root/Components/LoadingView";
import ProductStockStatus from "~root/Components/ProductStockStatus";
import SearchField from "~root/Components/SearchField";
import {
  cancelBtnTxt,
  locationPermissionMsg,
  locationPermissionTitle,
  settingsBtnTxt,
  titleAllowLocation,
  titleNearByYou,
  titleYourBranches,
} from "~root/Lib/AlertsHelper";
import { BranchResponse, sanitizeBranches } from "~root/Lib/BranchHelper";
import { getStock } from "~root/Lib/ProductHelper";
import { RootState } from "~root/Reducers";
import { BranchDetailsActions } from "~root/Reducers/BranchDetailReducers";
import colors from "~root/Themes/Colors";
import style from "./BranchesListStyles";

interface DispatchProps {
  fetchNearByBranches: (requestParams: any) => void;
  fetchMyByBranches: (requestParams: any) => void;
  requestStockAvailabilty: (requestParams: any) => void;
}

interface StateProps {
  branchDetail: BranchResponse[];
  nearByBranches: BranchResponse[];
  productStockData: any;
  fetching: boolean;
  selectedBranch: any;
}

interface OwnProps {
  onBranchSelect?: (value: BranchResponse) => void;
  product?: any;
  onSelectPickupBranch?: () => void;
  onBranchItemPress?: (branchOpened: any) => void;
}

interface State {
  isLocationEnabled: boolean;
  appState: string;
  branchSearchText: string;
  searchField?: SearchField;
  isRefreshing: boolean;
  nearbyBranches: boolean;
  customModelData: any;
}

type Props = OwnProps & StateProps & DispatchProps;

class BranchesList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLocationEnabled: false,
      appState: AppState.currentState,
      branchSearchText: "",
      isRefreshing: false,
      nearbyBranches: false,
      customModelData: {
        visible: false,
        heading: "",
        message: "",
        onClose: undefined,
        button1Text: "",
        button2Text: "",
        onButton1Press: undefined,
        onButton2Press: undefined,
      },
    };
  }
  public componentDidMount(): void {
    this.handlePermissionCheck();
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  public componentWillUnmount() {
    const subscription = AppState.addEventListener("change", appState => {
      subscription.remove();
    });
  }

  public componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    if (!nextProps.fetching) {
      this.setState({
        isRefreshing: false,
      });
    }
  }

  private disableCustomModel = () => {
    this.setState({
      customModelData: {
        visible: false,
        heading: "",
        message: "",
        onClose: undefined,
        button1Text: "",
        button2Text: "",
        onButton1Press: undefined,
        onButton2Press: undefined,
      },
    });
  };

  public setCustomModelData = type => {
    if (type === "showLocationAlert") {
      this.setState({
        customModelData: {
          visible: true,
          heading: locationPermissionTitle,
          message: locationPermissionMsg,
          onClose: () => {
            this.disableCustomModel();
          },
          button1Text: settingsBtnTxt,
          button2Text: cancelBtnTxt,
          onButton1Press: () => {
            this.disableCustomModel();
            openSettings();
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
          heading: "Please allow PlaceMakers to know your location",
          message: "This app will collect location data to suggest branches closest to you for quickest pickup.",
          onClose: () => {
            this.disableCustomModel();
          },
          button1Text: "OK",
          onButton1Press: async () => {
            this.disableCustomModel();
            const statuses = await RNPermissions.requestMultiple(
              Platform.select({
                android: [RNPermissions.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
                ios: [RNPermissions.PERMISSIONS.IOS.LOCATION_ALWAYS, RNPermissions.PERMISSIONS.IOS.LOCATION_WHEN_IN_USE],
              }),
            );
            if (
              statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] === RESULTS.GRANTED ||
              statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.GRANTED ||
              statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED
            ) {
              this.setState({
                isLocationEnabled: true,
              });
            }
          },
        },
      });
    }
  };

  public render() {
    const branchesData = this.prepareBranchListData();
    return (
      <View style={style.container}>
        <View style={style.bottomOnlyShadowStyle}>
          <View style={style.shadowStyle}>
            <SearchField
              ref={r => (this.state.searchField = r)}
              onChangeText={text => {
                this.setState({ branchSearchText: text });
              }}
              onSubmitEditing={() => {
                if (this.state.branchSearchText.length > 0) {
                  this.setState({ isRefreshing: false, nearbyBranches: true });
                  this.checkProductAndCallApi(this.state.branchSearchText, false);
                } else {
                  this.cancelSearchTapped();
                }
              }}
              onClosePress={this.cancelSearchTapped}
              label={undefined}
              value={this.state.branchSearchText}
              placeholder={"Search by region, city or suburb"}
              placeholderTextColor={colors.darkGrey}
              autoCorrect={false}
              selectionColor={Colors.lightBlue}
              isCustom={true}
              returnKeyType={"search"}
              inputContainerStyle={style.inputContainerStyle}
              inputStyle={style.inputStyle}
              searchIcon={
                <CustomIcon
                  name={"location"}
                  style={style.iconStyle}
                  onPress={() => {
                    this.state.searchField?.textInput.focus();
                  }}
                />
              }
            />
          </View>
        </View>
        <LoadingView style={style.loadingView} isLoading={this.props.fetching && !this.state.isRefreshing}>
          <SectionList
            refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh} />}
            contentContainerStyle={style.listStyle}
            sections={branchesData}
            keyExtractor={(item, index) => item + index}
            renderItem={item => this.renderRow(item)}
            stickySectionHeadersEnabled={false}
            renderSectionHeader={({ section }) => this.renderSectionHeader(section)}
            ListFooterComponent={
              !this.state.isLocationEnabled ? (
                <View>
                  <View style={style.sectionSeparator} />
                  <TouchableOpacity onPress={this.allowLocationTapped}>
                    <Text style={style.locationText}>{titleAllowLocation}</Text>
                    <View style={style.separator} />
                  </TouchableOpacity>
                  <Text style={style.locationInfo}>
                    Location information have been turned off in the System Settings. Turn it on to locate PlaceMakers branches near you.
                  </Text>
                </View>
              ) : (
                <View style={style.footerSpace} />
              )
            }
          />
        </LoadingView>
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
      </View>
    );
  }

  private getMyBranches = async () => {
    const requestParams = await this.getLocation();
    this.props.fetchMyByBranches(requestParams);
  };

  private getNearByBranches = async (query?: string) => {
    const requestParams = await this.getLocation();
    query ? (requestParams.query = query) : undefined;
    this.props.fetchNearByBranches(requestParams);
  };

  private getProductStcokAvailability = async (query?: string) => {
    const requestParams = await this.getLocation();
    query ? (requestParams.queryText = query) : undefined;
    requestParams.productCode = this.props.product?.SKU;
    this.props.requestStockAvailabilty(requestParams);
  };

  private getLocation = () => {
    if (this.state.isLocationEnabled) {
      return new Promise(function (resolve, reject) {
        Geolocation.getCurrentPosition(
          info => {
            resolve({
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
            });
          },
          (error: any) => {
            Geolocation.getCurrentPosition(
              info => {
                resolve({
                  latitude: info.coords.latitude,
                  longitude: info.coords.longitude,
                });
              },
              error => {
                reject(error);
              },
              {
                enableHighAccuracy: false,
                timeout: 10000,
              },
            );
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          },
        );
      });
    }
    return {};
  };

  private checkProductAndCallApi = (queryText: any, callMyBranches: boolean) => {
    if (this.props.product) {
      this.getProductStcokAvailability(queryText);
    } else {
      this.getNearByBranches(queryText);
      if (callMyBranches) {
        this.getMyBranches();
      }
    }
  };

  private _handleAppStateChange = (nextAppState: string) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === "active") {
      this.handlePermissionCheck();
    }
    this.setState({ appState: nextAppState });
  };

  private handlePermissionCheck = async () => {
    const statuses = await this.getLocationPermissionStatuses();
    if (
      statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED ||
      statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === RESULTS.GRANTED ||
      statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] === RESULTS.GRANTED ||
      statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.GRANTED
    ) {
      this.setState({ isLocationEnabled: true });
    } else {
      this.setState({ isLocationEnabled: false });
    }
    this.checkProductAndCallApi(this.state.branchSearchText, true);
  };

  private getLocationPermissionStatuses = async () => {
    const statuses = await checkMultiple([
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.IOS.LOCATION_ALWAYS,
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    ]);
    return statuses;
  };

  private renderBranchStatus = (branchItem: any) => {
    if (branchItem.statusArr[2] !== "") {
      return (
        <View style={style.branchStatusText}>
          <View style={style.dot} />
          <Text style={style.branchAddress}>{`Closes ${branchItem.statusArr[2]}`}</Text>
        </View>
      );
    }
  };

  private renderBranchDistance = (branchItem: any) => {
    if (branchItem.branchDistance && this.state.isLocationEnabled) {
      return (
        <View style={style.branchStatusText}>
          <View style={style.dot} />
          <Text style={style.branchAddress}>{branchItem.branchDistance}</Text>
        </View>
      );
    }
  };

  private renderRow = (item: any) => {
    const branchItem = item.item;
    const isSelectedBranch = branchItem.branchID === this.props.selectedBranch.branchID;

    return (
      <TouchableOpacity
        style={[
          style.itemStyle,
          {
            borderBottomWidth: item.index === item.section.data.length - 1 ? 0 : 1,
          },
        ]}
        onPress={() => this.props.onBranchItemPress(branchItem)}
      >
        <View style={style.branchItem}>
          <Text style={isSelectedBranch ? style.selectedBranchName : style.branchName}>{branchItem.branchName}</Text>
          <Text style={style.branchAddress}>{branchItem.branchAddress}</Text>
          {!this.props.product && (
            <View style={style.branchStatusText}>
              <Text style={[style.branchAddress, { color: branchItem.statusArr[1] }]}>{branchItem.statusArr[0]}</Text>
              {this.renderBranchStatus(branchItem)}
              {this.renderBranchDistance(branchItem)}
            </View>
          )}
          {!!this.props.product && <ProductStockStatus isSpecial={branchItem.display === "SPECIAL"} stock={getStock(branchItem)} isPDP={true} />}
        </View>

        {isSelectedBranch ? <CustomIcon name={"tick"} style={style.checkMark} /> : <CustomIcon name={"chevron-right"} style={style.rightArrow} />}
      </TouchableOpacity>
    );
  };

  private showLocationAlert = () => {
    this.setCustomModelData("showLocationAlert");
  };

  private requestPermissions = async () => {
    this.setCustomModelData("requestPermissions");
  };

  private allowLocationTapped = async () => {
    const statuses = await this.getLocationPermissionStatuses();
    if (
      statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] === RESULTS.DENIED ||
      statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.DENIED ||
      statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.DENIED
    ) {
      this.requestPermissions();
    } else {
      this.showLocationAlert();
    }
  };

  private renderSectionHeader = (section: any) => {
    const nearByData = sanitizeBranches(this.props.nearByBranches);
    return (
      <View>
        {nearByData.length > 0 && section.title === titleYourBranches && <View style={style.sectionSeparator} />}
        {section.title === "Nearby you" && this.state.nearbyBranches ? undefined : (
          <>
            <Text style={style.parentBranch}>{section.title}</Text>
            <View style={style.separator} />
          </>
        )}
      </View>
    );
  };

  private onRefresh = () => {
    this.setState({ isRefreshing: true });
    this.checkProductAndCallApi(this.state.branchSearchText, true);
  };

  private prepareBranchListData = () => {
    const branchesData = [];
    if (this.props.product) {
      branchesData.push({
        title: this.state.isLocationEnabled ? titleNearByYou : titleYourBranches,
        data: sanitizeBranches(this.props.productStockData),
      });
    } else {
      const nearByData = sanitizeBranches(this.props.nearByBranches);
      const yourBranchesData = R.reverse(sanitizeBranches(this.props.branchDetail));
      if (nearByData.length > 0) {
        branchesData.push({
          title: titleNearByYou,
          data: nearByData,
        });
      }
      if (yourBranchesData.length > 0) {
        branchesData.push({
          title: titleYourBranches,
          data: yourBranchesData,
        });
      }
    }
    return branchesData;
  };

  private cancelSearchTapped = () => {
    this.setState({ branchSearchText: "", nearbyBranches: false });
    this.checkProductAndCallApi(undefined, false);
  };
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    fetchNearByBranches: (requestParams: any) => {
      dispatch(BranchDetailsActions.requestNearByBranches(requestParams));
    },
    fetchMyByBranches: (requestParams: any) => {
      dispatch(BranchDetailsActions.getBranchDetails(requestParams));
    },
    requestStockAvailabilty: (requestParams: any) => {
      dispatch(BranchDetailsActions.requestStockAvailabilty(requestParams));
    },
  };
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    branchDetail: state.branchList.dataDepots || [],
    nearByBranches: state.branchList.nearbyBranches || [],
    productStockData: state.branchList.productStockData || [],
    fetching: state.branchList.fetching,
    selectedBranch: state.branchList.selectedBranch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchesList);
