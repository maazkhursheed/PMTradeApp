import firebase from "@react-native-firebase/app";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as React from "react";
import { Image, Text, View } from "react-native";
import { connect } from "react-redux";
import GenericSearchFieldComponent from "~root/Components/GenericSearchFieldComponent";
import MainContainer from "~root/Components/MainContainer";
import SmallHeader from "~root/Components/SmallHeader";
import SOBProductListing from "~root/Components/SOBProductListing/SOBProductListing";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { getBranchTownRegion } from "~root/Lib/BranchHelper";
import { getJobItemAnalyticsObj, getSelectedAccountId } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { RootState } from "~root/Reducers";
import { EstimatesActions } from "~root/Reducers/EstimatesReducer";
import { Images } from "~root/Themes";
import styles from "./StagesOfBuildProductListStyle";

export interface DispatchProps {
  requestSOBProductListAPI: (payload: any, alertCallbacks: IAlertCallbacks) => void;
}

export interface StateProps {
  isLoading: boolean;
  estimatedList: any;
  selectedJobAccount: any;
  selectedBranch: any;
  userId: any;
  state: any;
}

type Props = DispatchProps & StateProps;

const StagesOfBuildProductListContainer: React.SFC<Props> = ({
  requestSOBProductListAPI,
  estimatedList,
  userId,
  state,
  selectedBranch,
  selectedJobAccount,
}: Props) => {
  const routes = useRoute();
  const navigation = useNavigation();

  const sendJobImpressionAnalytics = (event: any) => {
    const params = {
      event,
      feature_type: "Job",
      userId: extractDigitalIdFromJWTPayload(decodeJWTToken(userId)) as string,
      accountId: getSelectedAccountId(state),
      branch: selectedBranch.branchName,
      branchId: selectedBranch.branchID,
      jobId: selectedJobAccount ? selectedJobAccount.JobId : "",
      job_date: "",
      job_expiry: "",
      job_stage: "",
      location: getBranchTownRegion(selectedBranch),
      itemList: routes.params?.estimateItem.item,
    };
    const eventLogObject = getJobItemAnalyticsObj(params);
    firebase.analytics().logEvent(event, eventLogObject);
  };

  React.useEffect(() => {
    sendJobImpressionAnalytics("view_item");
  }, [userId, selectedBranch, selectedJobAccount]);

  const callAPI = React.useCallback(
    (pageNo = 1) => {
      const params = routes.params?.estimateItem;
      const item = params.item;
      requestSOBProductListAPI(
        {
          estimateNumber: params?.estimateNumber,
          sectionId: item?.sectionId,
          sectionDescription: item?.sectionDescription,
          numberOfLines: 20,
          pageNo: pageNo.toString(),
        },
        {},
      );
    },
    [routes.params],
  );

  React.useEffect(callAPI, [routes.params]);

  return (
    <>
      <MainContainer style={styles.container}>
        <SmallHeader title={routes.params?.estimateItem.item.sectionDescription} navigation={navigation} />
        <GenericSearchFieldComponent
          onPress={() => {
            navigation.navigate("SearchSuggestion");
          }}
          placeHolderText={"Search Shop for Products"}
          hasBarcodeIcon={false}
        />
        <View style={styles.disclosureView}>
          <Image style={styles.imageStyle} source={Images.infoIcon} resizeMode={"contain"} />
          <Text style={styles.disclosureMessage}>Need more items for your Job? Search to find what you need and add to cart</Text>
        </View>
        <SOBProductListing data={estimatedList || []} onLoadMoreProducts={callAPI} />
      </MainContainer>
    </>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  requestSOBProductListAPI: (payload, callback) => dispatch(EstimatesActions.requestEstimatesListDetails(payload, callback)),
});

const mapStateToProps = (state: RootState): StateProps => ({
  isLoading: state.estimates?.fetching,
  estimatedList: state.estimates.estimatesListDetails,
  selectedJobAccount: state.jobAccounts.selectedJobAccount,
  selectedBranch: state.branchList?.selectedBranch,
  userId: state.login?.tempToken?.idToken,
  state,
});

export default connect(mapStateToProps, mapDispatchToProps)(StagesOfBuildProductListContainer);
