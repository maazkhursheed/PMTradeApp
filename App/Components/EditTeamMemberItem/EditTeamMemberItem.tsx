import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import FbIcon from "~root/Components/FbIcon";
import NativeWrapper from "~root/Components/NativeWrapper";
import { accessibility, occludeSensitiveView } from "~root/Lib/DataHelper";
import { TeamActions } from "~root/Reducers/ManageTeamReducers";
import colors from "~root/Themes/Colors";
import InviteTypes from "~root/Types/Invites/InviteTypes";
import styles from "./EditTeamMemberItemStyle";

interface DispatchProps {
  teamClick: (payload: any, meta: any) => void;
}

interface OwnProps {
  item: any;
}

type Props = OwnProps & DispatchProps;

const EditTeamMemberItem: React.SFC<Props> = ({ item, teamClick }: Props) => {
  const navigation = useNavigation();
  const openEditScreen = React.useCallback(() => {
    teamClick(
      {
        mobileNumber: item.phone,
        selectedTradeAccount: item.response.selectedTradeAccount,
      },
      {
        onSuccess: (response: any) => {
          navigation.navigate("EditMember", {
            navParam: {
              response,
              name: response.name,
              phone: response.mobileNumber,
              status: item.status,
              invitedOn: item.response.invitedOn,
              invitedBy: item.response.invitedBy,
              invitedByName: item.response.invitedByName,
            },
          });
        },
      },
    );
  }, [item]);

  const statusColor = React.useCallback((status: InviteTypes) => {
    switch (status) {
      case InviteTypes.InviteSent:
        return colors.darkYellow;
      case InviteTypes.Accepted:
        return colors.tickGreen;
      case InviteTypes.Expired:
        return colors.red;
      case InviteTypes.Rejected:
        return colors.darkerGrey;
      default:
        return undefined;
    }
  }, []);

  const statusText = React.useCallback((status: InviteTypes) => {
    switch (status) {
      case InviteTypes.InviteSent:
        return "INVITE SENT";
      case InviteTypes.Accepted:
        return "ACCEPTED";
      case InviteTypes.Expired:
        return "EXPIRED";
      case InviteTypes.Rejected:
        return "REJECTED";
      case InviteTypes.New:
        break;
    }
  }, []);

  return (
    <NativeWrapper onPress={openEditScreen} {...accessibility("memberListItem")}>
      <View {...accessibility("memberView")} style={styles.listItemContainer}>
        <View style={styles.nameContainer}>
          <Text {...accessibility("memberName")} style={styles.nameText} ref={occludeSensitiveView}>
            {item.name}
          </Text>
        </View>
        <View style={styles.phoneRowContainer}>
          <View style={styles.phoneRow}>
            <Text {...accessibility("memberPhoneLabel")} style={styles.phoneTextLabel} ref={occludeSensitiveView}>
              {"PHONE"}
            </Text>
            <Text {...accessibility("memberPhone")} style={styles.phoneText} ref={occludeSensitiveView}>
              {item.phone}
            </Text>
          </View>
          <View style={styles.memberDetailsContainer}>
            <Text {...accessibility("memberStatus")} style={[styles.statusText, { color: statusColor(item.status) }]}>
              {statusText(item.status)}
            </Text>
            <FbIcon {...accessibility("memberDetails")} style={[styles.memberDetails, { color: statusColor(item.status) }]} name={"ic_chevron"} />
          </View>
        </View>
      </View>
    </NativeWrapper>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  teamClick: (payload, meta) => dispatch(TeamActions.getInviteDetail(payload, meta)),
});

export default connect(undefined, mapDispatchToProps)(EditTeamMemberItem);
