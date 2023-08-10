import React from "react";
import { Linking, Modal, ScrollView, Text, View } from "react-native";
import { Divider } from "react-native-elements";
import FbIcon from "~root/Components/FbIcon";
import AppConfig from "~root/Config/AppConfig";
import { accessibility } from "~root/Lib/DataHelper";
import styles from "./OopsModalViewStyle";

export enum OopsType {
  ERROR_TEAM_MEMBER = 1,
  ERROR_ACCOUNT_OWNER,
}

export interface Props {
  title: string;
  close: () => void;
  visible: boolean;
  errorType: OopsType;
  invitation: () => void;
}

export interface State {}

class OopsModalView extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
  }

  public errorTeamMember = () => {
    return (
      <View style={styles.teamMemberMainView}>
        <View style={styles.flexDirectionRowStyle}>
          <Text style={styles.textStyleIf}>If you</Text>
          <Text style={styles.textStyleThen}>then</Text>
        </View>
        <Divider style={styles.dividerStyle} />
        <View style={styles.flexDirectionRowStyle}>
          <Text style={[styles.ifSectionTextsStyle, styles.textStyleBold]}>Got invitation text</Text>
          <Text style={[styles.thenSectionTextsStyle, styles.textStyleRegular]}>
            <Text style={styles.emailUSText} onPress={() => Linking.openURL(`mailto:${AppConfig.SUPPORT_EMAIL}`)} {...accessibility("emailUsText")}>
              email us
            </Text>{" "}
            - we’ll get you sorted
          </Text>
        </View>
        <Divider style={styles.dividerStyle} />
        <View style={styles.flexDirectionRowStyle}>
          <Text style={[styles.ifSectionTextsStyle, styles.textStyleBold]}>{"Don’t have an invitation text but want access as team member"}</Text>
          <Text style={[styles.thenSectionTextsStyle, styles.textStyleRegular]}>{"Ask account owner to invite you from “Teams”"}</Text>
        </View>
        <Divider style={styles.dividerStyle} />
        <View style={styles.flexDirectionRowStyle}>
          <Text style={[styles.ifSectionTextsStyle, styles.textStyleBold]}>{"Want access to your own account"}</Text>
          <Text style={[styles.thenSectionTextsStyle, styles.textStyleRegular]}>{"Close this pop-up and enter your account info"}</Text>
        </View>
        <Divider style={styles.dividerStyle} />
        <View style={styles.flexDirectionRowStyle}>
          <Text style={[styles.ifSectionTextsStyle, styles.textStyleBold]}>{"Are after something else"}</Text>
          <Text
            style={[styles.textStyleRegular, styles.underlineTextStyle]}
            onPress={() => Linking.openURL("https://www.placemakers.co.nz/")}
            {...accessibility("visitWebText")}
          >
            Visit our website
          </Text>
        </View>
      </View>
    );
  };

  public errorAccountOwner = () => {
    return (
      <View style={styles.accountOwnerMainView}>
        <View style={styles.flexDirectionRowStyle}>
          <Text style={styles.textStyleIf}>If you</Text>
          <Text style={styles.textStyleThen}>then</Text>
        </View>
        <Divider style={styles.otherDividerStyle} />
        <View style={styles.flexDirectionRowStyle}>
          <Text style={[styles.ifSectionTextsStyle, styles.textStyleBold]}>
            Want access to your own account, please retry using your branch and account info
          </Text>
          <Text style={[styles.thenSectionTextsStyle, styles.textStyleRegular]}>
            If it’s still not working{" "}
            <Text style={styles.underlineTextStyle} onPress={() => Linking.openURL(`mailto:${AppConfig.SUPPORT_EMAIL}`)} {...accessibility("emailUsText")}>
              {"email us"}
            </Text>{" "}
            and we’ll get you sorted
          </Text>
        </View>
        <Divider style={styles.dividerStyle} />
        <View style={styles.flexDirectionRowStyle}>
          <Text style={[styles.ifSectionTextsStyle, styles.textStyleBold]}>Have an invitation</Text>
          <Text style={[styles.thenSectionTextsStyle, styles.textStyleRegular]}>
            <Text style={styles.underlineTextStyle} onPress={() => this.props.invitation()} {...accessibility("invitationText")}>
              {"Click here"}
            </Text>{" "}
            to proceed
          </Text>
        </View>
        <Divider style={styles.dividerStyle} />
        <View style={styles.flexDirectionRowStyle}>
          <Text style={[styles.ifSectionTextsStyle, styles.textStyleBold]}>Want to open an account</Text>
          <Text style={[styles.thenSectionTextsStyle, styles.textStyleRegular]}>
            <Text
              style={styles.underlineTextStyle}
              onPress={() => Linking.openURL(`tel:080075223625377`)} // Phone Number from this ticket https://fletcher-digitalplatform.atlassian.net/browse/TA-933
              {...accessibility("callUsText")}
            >
              {"Call us"}
            </Text>
            {", "}
            or visit your local branch
          </Text>
        </View>
        <Divider style={styles.dividerStyle} />
        <View style={styles.flexDirectionRowStyle}>
          <Text style={[styles.ifSectionTextsStyle, styles.textStyleBold]}>{"Want access as a team member"}</Text>
          <Text style={[styles.thenSectionTextsStyle, styles.textStyleRegular]}>{"Ask account owner to invite you from “Teams”"}</Text>
        </View>
        <Divider style={styles.dividerStyle} />
        <View style={styles.flexDirectionRowStyle}>
          <Text style={[styles.ifSectionTextsStyle, styles.textStyleBold]}>{"Are after something else"}</Text>
          <Text
            style={[styles.textStyleRegular, styles.underlineTextStyle]}
            onPress={() => Linking.openURL("https://www.placemakers.co.nz/")}
            {...accessibility("visitWebText")}
          >
            Visit our website
          </Text>
        </View>
        <Text style={styles.disclosureStyle}>
          Note: PlaceMakers Trade App & Trade Portal are only available for Trade customers with a charge account (no cash accounts at this stage)
        </Text>
      </View>
    );
  };

  public render() {
    return (
      <Modal animationType="fade" transparent={true} onRequestClose={this.props.close} visible={this.props.visible}>
        <View style={styles.modalMainView}>
          <View style={styles.modalInnerView}>
            <View style={styles.modalTitleView}>
              <Text style={styles.modalTitle} {...accessibility("headerTitleLabel")}>
                {this.props.title}
              </Text>
              <FbIcon name={"ic_close"} onPress={this.props.close} style={styles.iconStyle} {...accessibility("closeIcon")} />
            </View>
            <ScrollView>{this.props.errorType === OopsType.ERROR_TEAM_MEMBER ? this.errorTeamMember() : this.errorAccountOwner()}</ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}

export default OopsModalView;
