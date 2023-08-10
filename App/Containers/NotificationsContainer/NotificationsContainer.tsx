import { Button } from "native-base";
import React from "react";
import { SectionList, Text, View } from "react-native";
import MCReactModule from "react-native-marketingcloudsdk";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import * as Redux from "redux";
import FbIcon from "~root/Components/FbIcon/FbIcon";
import MainContainer from "~root/Components/MainContainer";
import NativeWrapper from "~root/Components/NativeWrapper";
import SmallHeader from "~root/Components/SmallHeader";
import { navigationalScreens } from "~root/Lib/BranchHelper";
import { isNotNilOrEmpty } from "~root/Lib/CommonHelper";
import { accessibility, parseInboxMessages } from "~root/Lib/DataHelper";
import { safeRender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { NotificationActions } from "~root/Reducers/NotificationReducers";
import AppThemeContext from "~root/Themes/AppThemeContext";
import { InboxMessage } from "~root/Types/InboxMessage";
import style from "./NotificationsContainerStyle";

/**
 * The properties passed to the component
 */
export interface OwnProps {}

/**
 * The properties mapped from Redux dispatch
 */
export interface DispatchProps {
  getInboxMessages: () => void;
  notificationItemPressed: (item: any) => void;
  notificationsViewed: () => void;
}

/**
 * The properties mapped from the global state
 */
export interface StateProps {
  messages: InboxMessage[];
}

/**
 * The local state
 */
export interface State {}

type Props = StateProps & DispatchProps & OwnProps & NavigationScreenProps;

class NotificationsContainer extends React.Component<Props, State> {
  constructor(state: Props) {
    super(state);
    this.state = {};
  }

  public componentDidMount(): void {
    this.props.getInboxMessages();
    this.props.notificationsViewed();
  }

  public render() {
    return (
      <AppThemeContext.Provider value={"light"}>
        <MainContainer style={style.containerStyle}>
          <SmallHeader
            title={"Notification"}
            actionItem={
              <Button
                transparent={true}
                onPress={() => {
                  this.props.navigation.pop();
                }}
              >
                <FbIcon name={"ic_close"} style={style.iconStyle} />
              </Button>
            }
          />
          {this.renderSectionList()}
        </MainContainer>
      </AppThemeContext.Provider>
    );
  }

  private renderSectionHeader = (section: any) => {
    return (
      <View key={section.title}>
        <Text style={style.parentBranch}>{section.title}</Text>
      </View>
    );
  };

  private renderSectionList = () => {
    if (this.props.messages.length === 0) {
      return (
        <View style={style.emptyView}>
          <Text style={style.emptyText}>No notifications yet - we will send you some soon!</Text>
        </View>
      );
    } else {
      return (
        <SectionList
          sections={this.props.messages}
          keyExtractor={(item, index) => item + index}
          renderItem={item => this.renderItem(item)}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section }) => this.renderSectionHeader(section)}
          ItemSeparatorComponent={this.renderItemSeparator}
          SectionSeparatorComponent={item => this.renderSectionSeparator(item)}
        />
      );
    }
  };

  private renderItemSeparator = () => {
    return <View style={style.itemSeparator} />;
  };

  private renderSectionSeparator = (item: any) => {
    return <View style={item.trailingItem ? style.lineSeparator : item.trailingSection ? style.sectionSeparator : style.separator} />;
  };

  private renderItem = (item: any) => {
    const notifyObj = item.item;
    return (
      <NativeWrapper
        onPress={() => {
          MCReactModule.sendInboxOpenAnalytics(notifyObj.id);

          if (isNotNilOrEmpty(notifyObj.keys?.NotifyType)) {
            this.props.notificationItemPressed({
              notifyType: notifyObj.keys?.NotifyType,
              orderId: notifyObj.keys?.OrderNumber,
              pdoNumber: notifyObj.keys?.PDONumber,
              customerId: notifyObj.keys?.TradeAccountID,
              index: 0,
              jobId: notifyObj.keys?.JobAccountID,
              branchId: notifyObj.keys?.BranchID,
              fulfilmentBranchId: notifyObj.keys?.FBranchID,
            });
          }
        }}
        {...accessibility("orderDetailsNativeWrapper")}
      >
        <View>
          <View style={style.notificationItemContainer}>
            <Text style={style.notificationTime} {...accessibility("notificationTimeLabel")}>
              {notifyObj.dateAndTime}
            </Text>
            <View style={style.notificationView}>
              <Text style={style.textName} {...accessibility("notificationTitle")}>
                {notifyObj.title}
              </Text>
              <Text style={style.notificationSubItem} {...accessibility("notificationSubject")}>
                {notifyObj.alert}
              </Text>
            </View>
          </View>
        </View>
      </NativeWrapper>
    );
  };
}

const mapDispatchToProps = (dispatch: Redux.Dispatch): DispatchProps => ({
  getInboxMessages: () => dispatch(NotificationActions.getInboxMessages()),
  notificationItemPressed: item => dispatch(NotificationActions.notificationInboxItemPressed(item)),
  notificationsViewed: () => dispatch(NotificationActions.notificationsViewed()),
});

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => {
  return {
    messages: parseInboxMessages(state.notification.messages),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(safeRender(NotificationsContainer, navigationalScreens.NotificationsScreen));
