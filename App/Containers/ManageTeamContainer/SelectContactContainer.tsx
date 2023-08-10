import { ListItem } from "native-base";
import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CommonHeader from "~root/Components/CommonHeader/CommonHeader";
import FbIcon from "~root/Components/FbIcon";
import MainContainer from "~root/Components/MainContainer";
import SearchField from "~root/Components/SearchField";
import { accessibility, occludeSensitiveView } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import { TeamActions } from "~root/Reducers/ManageTeamReducers";
import InviteTypes from "~root/Types/Invites/InviteTypes";
import style from "./ManageTeamContainerStyles";

interface StateProps {
  contactList?: any;
  filterList?: any;
}

interface DispatchProps {
  searchContacts: (keyword: string, data: any) => void;
  clear: () => void;
}

interface State {
  searchText: string;
  hasPermission: boolean;
}

export type Props = StateProps & DispatchProps & NavigationScreenProps;

class SelectContactContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasPermission: false,
      searchText: "",
    };
  }

  public componentWillUnmount(): void {
    this.props.clear();
  }

  public selectContact = (item: any, number: string) => {
    this.props.navigation.navigate("EditMember", {
      navParam: {
        name: (item.givenName || "") + " " + (item.familyName || ""),
        phone: number,
        status: InviteTypes.New,
      },
    });
  };

  public renderList = (items: any) => {
    const list = items.item.phoneNumbers.map(param => {
      return (
        <ListItem
          noIndent={true}
          onPress={() => this.selectContact(items.item, param.number)}
          style={style.listItemStyle}
          {...accessibility("contactListItem")}
        >
          <Text ref={occludeSensitiveView} style={style.nameText}>
            {(items.item.givenName || "") + " " + (items.item.familyName || "")}
          </Text>
          <Text ref={occludeSensitiveView} style={style.phoneTextStyle}>
            {param.number}
          </Text>
        </ListItem>
      );
    });
    return list;
  };

  public close = () => this.props.navigation.pop();

  public enterManualBtn = () => {
    this.props.navigation.navigate("EditMember", {
      navParam: {
        phone: "",
        name: "",
        status: InviteTypes.New,
      },
    });
  };
  public search = (text: string) => {
    this.setState({ searchText: text });
    this.props.searchContacts(text, this.props.contactList);
  };

  public render() {
    return (
      <MainContainer style={style.contactContainer}>
        <CommonHeader
          headerStyle={style.headerStyle}
          style={style.headerStyle}
          leftItem={<FbIcon {...accessibility("leftItemCloseIcon")} onPress={this.close} style={style.closeIcon} name={"ic_close"} />}
        />

        <SearchField
          placeholder={"Search contacts"}
          style={style.searchFieldStyle}
          onChangeText={this.search}
          value={this.state.searchText}
          {...accessibility("contactSearchField")}
        />
        <ScrollView style={style.contentStyle}>
          <View style={style.noSearchResultView}>
            <Text style={style.manuallyBtnTxt}>
              <Text>or </Text>
              <Text {...accessibility("manuallyEnterContactInfo")} style={style.enterManualLabel} onPress={this.enterManualBtn}>
                Enter it manually
              </Text>
            </Text>
          </View>
          {this.props.filterList.length == 0 && (
            <Text style={style.noMemberText} {...accessibility("noMemberLabel")}>
              There is no matching name.
            </Text>
          )}
          <FlatList style={style.selectContactsList} data={this.props.filterList} renderItem={this.renderList} {...accessibility("filterFlatList")} />
        </ScrollView>
      </MainContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  searchContacts: keyword => dispatch(TeamActions.contactsSearch(keyword)),
  clear: () => dispatch(TeamActions.clear()),
});
const mapStateToProps = (state: RootState): StateProps => ({
  filterList: state.manageTeam.filteredContacts || [],
});
export default connect(mapStateToProps, mapDispatchToProps)(SelectContactContainer);
