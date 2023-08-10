import { Col } from "native-base";
import React, { Component, Dispatch } from "react";
import { Linking, ScrollView, Text, View } from "react-native";
import UXCam from "react-native-ux-cam";
import VersionInfo from "react-native-version-info";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import CustomAlert from "~root/Components/CustomAlert/CustomAlert";
import FbIcon from "~root/Components/FbIcon";
import MainContainer from "~root/Components/MainContainer";
import NativeWrapper from "~root/Components/NativeWrapper";
import OfflineNotice from "~root/Components/OfflineNotice";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import SmallButton from "~root/Components/SmallButton";
import SmallHeader from "~root/Components/SmallHeader";
import AppConfig from "~root/Config/AppConfig";
import { emailUnavailableErr, IAlertCallbacks, logoutError, OKButton, phoneUnavailableErr, titleErr } from "~root/Lib/AlertsHelper";
import { isIOS } from "~root/Lib/CommonHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import { LoginActions } from "~root/Reducers/LoginReducers";
import { PermissionTypes } from "~root/Types/Permissions";
import { SolutionValue } from "~root/Types/Solutions";
import style from "./SolutionsStyle";

interface DispatchProps {
  logout: (alertCallbacks: IAlertCallbacks) => void;
}

interface StateProps {
  selectedBranch: any;
  selectedTradeAccId: any;
}

interface OwnProps {}

interface State {
  customModelData: any;
}

type Props = OwnProps & StateProps & DispatchProps & NavigationScreenProps;

class Solutions extends Component<Props, State> {
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
      },
    };
  }

  public onPhone = () => {
    UXCam.setAutomaticScreenNameTagging(false);
    const phone = this.props.selectedBranch.address.phone;
    phone ? Linking.openURL(`tel:${phone}`) : this.showLocalAlertMessage(titleErr, phoneUnavailableErr);
  };

  public onEmail = () => {
    UXCam.setAutomaticScreenNameTagging(false);
    const email = this.props.selectedBranch.address.email;
    email ? Linking.openURL(`mailto:${email}`) : this.showLocalAlertMessage(titleErr, emailUnavailableErr);
  };

  public onLogout = () => {
    this.props.logout({ onFailure: this.onFailureLogout });
  };

  public show = (value: SolutionValue) => {
    this.props.navigation.push("SolutionsDetails", { type: value });
  };

  private disableCustomModel = () => {
    this.setState({
      customModelData: {
        heading: "",
        message: "",
        visible: false,
        onClose: undefined,
        button1Text: "",
        onButton1Press: undefined,
      },
    });
  };

  public showLocalAlertMessage = (title: string, subTitle: string) => {
    this.setState({
      customModelData: {
        visible: true,
        heading: title,
        message: subTitle,
        onClose: () => {
          this.disableCustomModel();
        },
        button1Text: OKButton,
        onButton1Press: () => {
          this.disableCustomModel();
        },
      },
    });
  };

  public render() {
    return (
      <MainContainer>
        <SmallHeader title={"Support"} navigation={this.props.navigation} />
        <OfflineNotice />
        <ScrollView style={style.container}>
          <View>
            <Text style={style.subHeader}>Branch Contact</Text>
            <View style={style.addressView}>
              <Text style={style.addressText}>{this.props.selectedBranch.name || ""}</Text>
              <Text style={style.addressText}>{this.props.selectedBranch.address.formattedAddress || ""}</Text>
            </View>
            <View style={style.linkContainer}>
              <View style={style.contactEmail}>
                <SmallButton btnText={"Email"} style={style.highlightText} onPress={this.onEmail} />
              </View>
              <SmallButton btnText={"Phone"} style={style.highlightText} onPress={this.onPhone} />
            </View>
          </View>
          <NativeWrapper
            {...accessibility("storeFinderView")}
            onPress={() => {
              Linking.openURL(`https://www.placemakers.co.nz/store-finder/`);
            }}
          >
            <View style={style.storeFinder}>
              <Col size={2}>
                <Text style={style.subHeading}>PlaceMakers Store Finder</Text>
              </Col>
              <Col size={1}>
                <FbIcon name={"ic_chevron"} style={style.rightIcon} />
              </Col>
            </View>
          </NativeWrapper>
          <View style={style.bar} />
          <PermissionComponent style={style.selectJobAccounts} hideView={true} permissionTypes={[PermissionTypes.AccountOwner, PermissionTypes.UserAdmin]}>
            <Text style={style.subHeader}>Job Accounts1</Text>
            <NativeWrapper
              {...accessibility("jobAccountSelection")}
              onPress={() => {
                this.props.navigation.push("Jobs");
              }}
            >
              <View style={style.listView}>
                <Col size={2}>
                  <Text style={style.subHeading}>Manage Job Accounts</Text>
                </Col>
                <Col size={1}>
                  <FbIcon name={"ic_chevron"} style={style.rightIcon} />
                </Col>
              </View>
            </NativeWrapper>
            <View style={style.bar} />
            {isIOS && <View style={style.bar} />}
          </PermissionComponent>
          <View>
            <Text style={style.subHeader}>PlaceMakers Solutions</Text>
            <NativeWrapper
              {...accessibility("inStoreView")}
              onPress={() => {
                this.show(SolutionValue.InStore);
              }}
            >
              <View style={style.listView}>
                <Col size={2}>
                  <Text style={style.subHeading}>In-Store and Delivery Services</Text>
                </Col>
                <Col size={1}>
                  <FbIcon name={"ic_chevron"} style={style.rightIcon} />
                </Col>
              </View>
            </NativeWrapper>
            <NativeWrapper
              {...accessibility("businessMgmtView")}
              onPress={() => {
                this.show(SolutionValue.BusinessManagement);
              }}
            >
              <View style={style.listView}>
                <Col size={2}>
                  <Text style={style.subHeading}>Business Management Services</Text>
                </Col>
                <Col size={1}>
                  <FbIcon name={"ic_chevron"} style={style.rightIcon} />
                </Col>
              </View>
            </NativeWrapper>
            <NativeWrapper
              {...accessibility("pricingView")}
              onPress={() => {
                this.show(SolutionValue.Pricing);
              }}
            >
              <View style={style.listView}>
                <Col size={2}>
                  <Text style={style.subHeading}>Pricing & Estimates</Text>
                </Col>
                <Col size={1}>
                  <FbIcon name={"ic_chevron"} style={style.rightIcon} />
                </Col>
              </View>
            </NativeWrapper>
            <NativeWrapper
              {...accessibility("supportApprenticeView")}
              onPress={() => {
                this.show(SolutionValue.SupportAndApprentice);
              }}
            >
              <View style={style.listView}>
                <Col size={2}>
                  <Text style={style.subHeading}>Support & Apprentice </Text>
                </Col>
                <Col size={1}>
                  <FbIcon name={"ic_chevron"} style={style.rightIcon} />
                </Col>
              </View>
            </NativeWrapper>
            <NativeWrapper
              {...accessibility("benefitsView")}
              onPress={() => {
                this.show(SolutionValue.Benefits);
              }}
            >
              <View style={style.listView}>
                <Col size={3}>
                  <Text style={style.subHeading}>PlaceMakers Benefits & Rewards</Text>
                </Col>
                <Col size={1}>
                  <FbIcon name={"ic_chevron"} style={style.rightIcon} />
                </Col>
              </View>
            </NativeWrapper>
            <NativeWrapper
              {...accessibility("installedSolutionView")}
              onPress={() => {
                this.show(SolutionValue.InstalledSolutions);
              }}
            >
              <View style={style.listView}>
                <Col size={2}>
                  <Text style={style.subHeading}>Installed Solutions</Text>
                </Col>
                <Col size={1}>
                  <FbIcon name={"ic_chevron"} style={style.rightIcon} />
                </Col>
              </View>
            </NativeWrapper>
            <NativeWrapper
              {...accessibility("interiorSolutionView")}
              onPress={() => {
                this.show(SolutionValue.InteriorSolutions);
              }}
            >
              <View style={style.listView}>
                <Col size={2}>
                  <Text style={style.subHeading}>Interior Solutions</Text>
                </Col>
                <Col size={1}>
                  <FbIcon name={"ic_chevron"} style={style.rightIcon} />
                </Col>
              </View>
            </NativeWrapper>
          </View>
          <View style={[style.bar, style.extraMarginStyle]} />
          {isIOS && <View style={[style.bar]} />}
          <View>
            <Text style={style.subHeader}>Help & FAQ</Text>
            <NativeWrapper
              {...accessibility("privacyPolicyView")}
              onPress={() => {
                Linking.openURL(AppConfig.PRIVACY_POLICY_LINK);
              }}
            >
              <View style={style.listView}>
                <Col size={2}>
                  <Text style={style.subHeading}>Privacy Policy</Text>
                </Col>
                <Col size={1}>
                  <FbIcon name={"ic_chevron"} style={style.rightIcon} />
                </Col>
              </View>
            </NativeWrapper>
            <NativeWrapper
              {...accessibility("termsOfTradeView")}
              onPress={() => {
                Linking.openURL(`https://www.placemakers.co.nz/terms-of-trade/ `);
              }}
            >
              <View style={style.listView}>
                <Col size={2}>
                  <Text style={style.subHeading}>Terms of Use</Text>
                </Col>
                <Col size={1}>
                  <FbIcon name={"ic_chevron"} style={style.rightIcon} />
                </Col>
              </View>
            </NativeWrapper>
            <View style={[style.bar, style.extraMarginStyle]} />
          </View>
          <NativeWrapper style={style.signout} {...accessibility("logoutView")} onPress={this.onLogout}>
            <View style={style.listView}>
              <Col size={2}>
                <Text style={[style.signOutText]}>Sign Out</Text>
              </Col>
              <Col size={1}>
                <FbIcon name={"ic_chevron"} style={style.rightIcon} />
              </Col>
            </View>
          </NativeWrapper>
          <View style={style.versionStyle}>
            <Text style={style.versionText}>PlaceMakers Trade App</Text>
            <Text style={style.versionText}>
              {"\n"}v{VersionInfo.appVersion} ({VersionInfo.buildVersion})
            </Text>
          </View>
        </ScrollView>
        <CustomAlert
          heading={this.state.customModelData?.heading}
          msg={this.state.customModelData?.message}
          visible={this.state.customModelData?.visible}
          onClose={this.state.customModelData?.onClose}
          button1Text={this.state.customModelData?.button1Text}
          onButton1Press={this.state.customModelData?.onButton1Press}
        />
      </MainContainer>
    );
  }

  private onFailureLogout = () => {
    this.showLocalAlertMessage("", logoutError);
  };
}

const mapStateToProps = (state: RootState): StateProps => ({
  selectedBranch: state.branchList.selectedBranch,
  selectedTradeAccId: state.connectTrade.selectedTradeAccount,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  logout: alertCallbacks => dispatch(LoginActions.logoutRequest(undefined, alertCallbacks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Solutions);
