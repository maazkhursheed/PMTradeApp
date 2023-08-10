import firebase from "@react-native-firebase/app";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import NativeWrapper from "~root/Components/NativeWrapper";
import { getBranchTownRegion } from "~root/Lib/BranchHelper";
import { getJobAnalyticsObj, getSelectedAccountId } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { RootState } from "~root/Reducers";
import CustomIcon from "../CustomIcon";
import style from "./StageOfBuildItemStyles";

interface OwnProps {
  item: any;
  estimateNumber: string;
}

interface StateProps {
  selectedJobAccount: any;
  selectedBranch: any;
  userId: any;
  state: any;
}

type Props = OwnProps & StateProps;

const StageOfBuildItem: React.SFC<Props> = ({ item, estimateNumber, userId, state, selectedBranch, selectedJobAccount }: Props) => {
  const navigation = useNavigation();
  const performNavigation = React.useCallback(() => {
    navigation.navigate("StagesOfBuildProductList", {
      screen: "StagesOfBuildProductList",
      estimateItem: { item, estimateNumber },
    });
    sendJobSelectStageAnalytics("job_select_stage");
  }, [item]);

  const sendJobSelectStageAnalytics = (event: any) => {
    const params = {
      event,
      userId: extractDigitalIdFromJWTPayload(decodeJWTToken(userId)) as string,
      accountId: getSelectedAccountId(state),
      branch: selectedBranch.branchName,
      branchId: selectedBranch.branchID,
      jobId: estimateNumber ? estimateNumber : "",
      job_date: "",
      job_expiry: "",
      job_stage: item.sectionDescription,
      location: getBranchTownRegion(selectedBranch),
    };
    const eventLogObject = getJobAnalyticsObj(params);
    firebase.analytics().logEvent(event, eventLogObject);
  };

  return (
    <NativeWrapper onPress={performNavigation}>
      <View style={style.container}>
        <Text style={style.description}>{item.sectionDescription}</Text>
        <Text style={style.products}>
          {item.lineCount}
          {item.lineCount === 1 ? " product" : " products"}
        </Text>
        <CustomIcon style={style.iconStyle} name={"chevron-right"} />
      </View>
    </NativeWrapper>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  selectedJobAccount: state.jobAccounts.selectedJobAccount,
  selectedBranch: state.branchList?.selectedBranch,
  userId: state.login?.tempToken?.idToken,
  state,
});

export default connect(mapStateToProps)(StageOfBuildItem);
