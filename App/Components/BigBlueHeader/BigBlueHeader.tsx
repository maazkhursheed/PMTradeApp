import { useNavigation } from "@react-navigation/native";
import { Button } from "native-base";
import React, { useCallback } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import BadgeButtonCount from "~root/Components/BadgeButtonCount";
import styles from "~root/Components/BigBlueHeader/BigBlueHeaderStyle";
import CustomIcon from "~root/Components/CustomIcon";
import { isNotNilOrEmpty } from "~root/Lib/CommonHelper";
import { accessibility, occludeSensitiveView } from "~root/Lib/DataHelper";
import { showJobSearchName } from "~root/Lib/JobAccountsHelper";
import { RootState } from "~root/Reducers";
import BurgerLogo from "../../Images/HeaderLogo/BurgerLogo.svg";
import APPLogo from "../../Images/HeaderLogo/PMLogo.svg";

interface OwnProps {
  title: string;
  onPress?: any;
  children?: any;
  style?: any;
}

interface StateProps {
  selectedJobAccountName: string;
  name: string;
  branchName: string;
  countUnreadMessages: number;
}

type Props = StateProps & OwnProps;

const BigBlueHeader: React.SFC<Props> = ({ title, selectedJobAccountName, name, branchName, onPress, children, countUnreadMessages, style }: Props) => {
  const navigation = useNavigation();
  const onNavigate = useCallback(() => {
    navigation.navigate("MyProfileContainer", {
      screen: "MyProfileSelection",
    });
  }, []);

  const onNavigateNotification = useCallback(() => {
    navigation.navigate("NotificationsContainer", {
      screen: "MainNotifications",
    });
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container} />
      <View style={[styles.container, style]}>
        <View style={[styles.titleIconContainer]}>
          <View style={styles.titleView}>
            <APPLogo />
            <Text style={[styles.headerTitleText]}>{title}</Text>
          </View>
          <View style={styles.bottomButtonContainer}>
            <Button onPress={onNavigateNotification} transparent={true} {...accessibility("notificationBtnIcon")}>
              <CustomIcon name={"notification-icon"} style={styles.iconNotificationStyle} />
              {countUnreadMessages > 0 && <BadgeButtonCount badgeCount={countUnreadMessages} />}
            </Button>
            <TouchableOpacity {...accessibility("profileBtnTxt")} style={styles.profileBtn} onPress={onNavigate}>
              <BurgerLogo />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={onNavigate}>
          <View {...accessibility("tradeAccountBtn")} style={styles.accountBranchContainerStyle}>
            <View style={[styles.jobAccountView]}>
              <Text {...accessibility("jobAccountName")} ellipsizeMode="tail" style={styles.accountNameStyle} numberOfLines={1} ref={occludeSensitiveView}>
                {selectedJobAccountName}
              </Text>
              <CustomIcon name={"store"} style={styles.iconStyle} />
              <Text {...accessibility("storeNameTitleText")} ellipsizeMode="tail" style={styles.branchStyle} numberOfLines={1} ref={occludeSensitiveView}>
                {branchName}
              </Text>
            </View>
            <TouchableOpacity onPress={onNavigate} style={[styles.storeNameView]}>
              <Text style={styles.changeBtn}>CHANGE</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
      {isNotNilOrEmpty(children) && <View>{children}</View>}
    </>
  );
};
const mapStateToProps = (state: RootState): StateProps => ({
  selectedJobAccountName: state.jobAccounts?.selectedJobAccount
    ? showJobSearchName(state.jobAccounts.selectedJobAccount)
    : state.connectTrade?.selectedTradeAccount.name,
  name: state.login?.userData.name,
  branchName: state.branchList?.selectedBranch?.name,
  countUnreadMessages: state.notification?.unreadMessagesCount,
});
export default connect(mapStateToProps)(BigBlueHeader);
