// Styles
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomIcon from "~root/Components/CustomIcon";
import { KEY_PARAM_SOLUTION_LEVEL } from "~root/Containers/MyProfileSolutionsContainer/MyProfileSolutionsContainer";
import { accessibility, occludeSensitiveView } from "~root/Lib/DataHelper";
import { ConnectTradeActions } from "~root/Reducers/ConnectTradeReducers";
import { RootState } from "../../Reducers";
import GetInTouchView from "./GetInTouchView";
import styles from "./MyProfileContainerStyle";

const MyProfileContentView = () => {
  const { selectedTradeAccount, branch, selectedJobAccount } = useSelector((state: RootState) => ({
    selectedTradeAccount: state.connectTrade.selectedTradeAccount,
    selectedJobAccount: state.jobAccounts.selectedJobAccount,
    branch: state.branchList.selectedBranch,
  }));

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPressTradeAccount = React.useCallback(() => {
    dispatch(ConnectTradeActions.removeNewTradeAccountFromState());
    navigation.navigate("MyProfileTradeAccountSelection");
  }, [dispatch, navigation]);

  const onPressBranch = React.useCallback(() => {
    navigation.navigate("MyProfileBranchSelection");
  }, [navigation]);

  const onPressMyprofile = React.useCallback(() => {
    navigation.navigate("MyProfileSolutionsContainer", { [KEY_PARAM_SOLUTION_LEVEL]: true });
  }, [navigation]);

  return (
    <>
      <TouchableOpacity {...accessibility("myProfileTradeAccountTouchable")} onPress={onPressTradeAccount}>
        <View style={styles.item}>
          <View style={styles.accountsView}>
            <Text style={styles.selectionItem}>Accounts/Job accounts</Text>
            <Text ref={occludeSensitiveView} style={styles.valueItem}>
              {selectedJobAccount ? selectedJobAccount.SearchName : selectedTradeAccount ? selectedTradeAccount.name : undefined}
            </Text>
          </View>
          <CustomIcon name={"chevron-right"} style={styles.chevron} />
        </View>
      </TouchableOpacity>
      <View style={styles.subSeparator} />
      <TouchableOpacity {...accessibility("myProfileBranchTouchable")} onPress={onPressBranch}>
        <View style={styles.item}>
          <View style={styles.accountsView}>
            <Text style={styles.selectionItem}>Branch location</Text>
            <Text ref={occludeSensitiveView} style={styles.valueItem}>
              {branch.name + ", " + branch.address.formattedAddress}
            </Text>
          </View>
          <CustomIcon name={"chevron-right"} style={styles.chevron} />
        </View>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity onPress={onPressMyprofile}>
        <View style={styles.item}>
          <View style={styles.accountsView}>
            <Text style={styles.selectionItem}>{"PlaceMakers Solutions"}</Text>
          </View>
          <CustomIcon name={"chevron-right"} style={styles.chevron} />
        </View>
      </TouchableOpacity>
      <View style={styles.separator} />
      <GetInTouchView />
    </>
  );
};

export default MyProfileContentView;
