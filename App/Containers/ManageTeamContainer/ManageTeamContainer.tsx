import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, InteractionManager, PermissionsAndroid, Platform, Text, View } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import BigBlueHeader from "~root/Components/BigBlueHeader/BigBlueHeader";
import CustomIcon from "~root/Components/CustomIcon";
import EditTeamMemberItem from "~root/Components/EditTeamMemberItem/EditTeamMemberItem";
import FbIcon from "~root/Components/FbIcon";
import LargeButton from "~root/Components/LargeButton";
import LoadingView from "~root/Components/LoadingView";
import SearchField from "~root/Components/SearchField";
import { navigationalScreens } from "~root/Lib/BranchHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { AnimationProvider } from "~root/Provider/AnimationProvider";
import { safeRender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { TeamActions } from "~root/Reducers/ManageTeamReducers";
import { PixelActions } from "~root/Reducers/PixelReducer";
import { Colors, Metrics } from "~root/Themes";
import InviteTypes from "~root/Types/Invites/InviteTypes";
import style from "./ManageTeamContainerStyles";

export const SEARCH_FIELD_HEIGHT = 60;
export interface DispatchProps {
  clearTeamData: () => void;
  searchTeamData: (keyword: string) => void;
  fetchContacts: (payload: any, meta: any) => void;
  logPixelEvent: (event: string, params: any) => void;
  getTeamData: () => void;
}

export interface StateProps {
  teamData: any;
  loading: boolean;
}

type Props = DispatchProps & StateProps;

const ManageTeamList = ({ teamData }: any) => {
  return (
    <FlatList
      bounces={false}
      scrollEventThrottle={16}
      extraData={teamData || []}
      data={teamData || []}
      // @ts-ignore
      renderItem={({ item }) => <EditTeamMemberItem item={item} />}
      ListEmptyComponent={
        <View style={style.noMemberStyle}>
          <FbIcon name={"ic_nomember"} style={style.noMemberIcon} />
          <Text style={style.noMemberText} {...accessibility("invitedAnyoneLabel")}>
            You haven't invited anyone to your team. Add your first team member now.
          </Text>
        </View>
      }
      contentContainerStyle={{ minHeight: Metrics.screenHeight }}
      {...accessibility("teamDataFlatList")}
    />
  );
};

const ManageTeamContainer = ({ loading, searchTeamData, getTeamData, clearTeamData, logPixelEvent, teamData, fetchContacts }: Props) => {
  const [searchText, setSearchText] = React.useState("");
  const navigation = useNavigation();

  const callPixel = React.useCallback(() => {
    logPixelEvent("pageview", { title: "Teams", ptype: "other" });
    getTeamData();
  }, []);

  React.useEffect(() => {
    InteractionManager.runAfterInteractions(clearTeamData);
    return navigation.addListener("focus", () => {
      InteractionManager.runAfterInteractions(callPixel);
    });
  }, []);

  const getContacts = React.useCallback(async () => {
    let hasPermission = true;
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
      hasPermission = granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    fetchContacts(hasPermission, {
      onSuccess: () => {
        navigation.push("SelectContact");
      },
      onFailure: () => {
        navigation.navigate("EditMember", {
          navParam: {
            phone: "",
            name: "",
            status: InviteTypes.New,
          },
        });
      },
    });
  }, []);

  return (
    <AnimationProvider>
      <BigBlueHeader title={"Team"} onPress={getContacts}>
        {(teamData?.length > 1 || searchText != "") && (
          <SearchField
            onChangeText={(text: string) => {
              setSearchText(text);
              searchTeamData(text);
            }}
            onClosePress={() => {
              setSearchText("");
              searchTeamData("");
            }}
            value={searchText}
            // @ts-ignore
            textHint={"Search team members by name"}
            placeholder={"Search team"}
            placeholderTextColor={Colors.darkGrey}
            style={style.searchField}
            inputContainerStyle={style.inputContainerStyle}
            inputStyle={style.inputStyle}
            isCustom={true}
            {...accessibility("searchTeamTextInput")}
            searchIcon={<CustomIcon name={"search"} style={style.iconStyle} />}
            returnKeyType={"search"}
          />
        )}
      </BigBlueHeader>
      <LoadingView style={style.loadingView} isLoading={loading}>
        <ManageTeamList teamData={teamData} />
        <View style={style.footerContainer}>
          <LargeButton
            isFooter={false}
            onPress={getContacts}
            btnText={"Add Team Member"}
            disabled={loading}
            style={style.largeButtonStyle}
            iconStyle={{ fontSize: 12 }}
            iconColor={Colors.white}
            iconName={"add"}
            textStyle={style.textStyle}
            {...accessibility("teamsAddIcon")}
          />
        </View>
      </LoadingView>
    </AnimationProvider>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  clearTeamData: () => dispatch(TeamActions.clearTeamData()),
  searchTeamData: keyword => dispatch(TeamActions.searchTeamData(keyword)),
  fetchContacts: (payload, meta) => dispatch(TeamActions.contactsRequest(payload, meta)),
  logPixelEvent: (event, params) => dispatch(PixelActions.pixelRequest(event, params)),
  getTeamData: () => dispatch(TeamActions.getTeamData()),
});

const mapStateToProps = (state: RootState): StateProps => ({
  teamData: state.manageTeam.searchedData,
  loading: state.manageTeam.fetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(safeRender(ManageTeamContainer, navigationalScreens.TeamScreen));
