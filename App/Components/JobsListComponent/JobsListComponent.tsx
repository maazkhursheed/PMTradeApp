import firebase from "@react-native-firebase/app";
import * as React from "react";
import { FlatList, InteractionManager, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import AppConfig from "~root/Config/AppConfig";
import { IAlertCallbacks, showAlertToClearCart } from "~root/Lib/AlertsHelper";
import { getBranchTownRegion } from "~root/Lib/BranchHelper";
import { accessibility, getJobAnalyticsObj, getSelectedAccountId, getTruncatedListItemsByProp } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { getEstimateCreateAndExpireDate } from "~root/Lib/OrderItemHelper";
import { RootState } from "~root/Reducers";
import { EstimatesActions } from "~root/Reducers/EstimatesReducer";
import { JobAccountsActions } from "~root/Reducers/JobAccountsReducers";
import { ProductActions } from "~root/Reducers/ProductReducers";
import JobsListEmptyComponent from "../JobsListEmptyComponent";
import JobsListItem from "../JobsListItem";
import LoadingView from "../LoadingView";
import style from "./JobsListComponentStyles";

interface OwnProps {}

interface DispatchProps {
  unselectJobAccount: () => void;
  requestEstimatesList: (payload: any, alertCallbacks: IAlertCallbacks) => void;
  clearCart: () => void;
}

interface StateProps {
  isLoading: boolean;
  data: any;
  hasMorePages: boolean;
  visibleItemsCount: number;
  totalItemsCount: number;
  cartCount: number;
  selectedJobAccount: any;
  selectedTradeAccount: any;
  selectedBranch: any;
  userId: any;
  state: any;
}

type Props = OwnProps & DispatchProps & StateProps;

const JobsListComponent: React.FC<Props> = ({
  selectedTradeAccount,
  unselectJobAccount,
  selectedJobAccount,
  requestEstimatesList,
  isLoading,
  cartCount,
  clearCart,
  data,
  hasMorePages,
  visibleItemsCount,
  totalItemsCount,
  selectedBranch,
  userId,
  state,
}: Props) => {
  const sendJobAccountSelectAnalytics = React.useCallback(
    (event: any) => {
      const params = {
        event,
        userId: extractDigitalIdFromJWTPayload(decodeJWTToken(userId)) as string,
        accountId: getSelectedAccountId(state),
        branch: selectedBranch.branchName,
        branchId: selectedBranch.branchID,
        jobId: getTruncatedListItemsByProp("estimateNumber", data),
        job_date: getTruncatedListItemsByProp("estimateDate", getEstimateCreateAndExpireDate(data)),
        job_expiry: getTruncatedListItemsByProp("estimateExpire", getEstimateCreateAndExpireDate(data)),
        job_stage: "",
        location: getBranchTownRegion(selectedBranch),
      };
      const eventLogObject = getJobAnalyticsObj(params);
      firebase.analytics().logEvent(event, eventLogObject);
    },
    [userId, state, data, selectedBranch, selectedJobAccount],
  );
  const { dispatchAlert } = useCustomAlert();
  React.useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      requestEstimatesList({ pageNo: 1, numberOfLines: AppConfig.NUMBER_OF_LINES }, {});
    });
  }, [selectedJobAccount?.JobId, selectedTradeAccount?.uid]);

  React.useEffect(() => {
    if (data?.length > 0) {
      sendJobAccountSelectAnalytics("job_account_select");
      sendJobAccountSelectAnalytics("job_list_impression");
    }
  }, [getTruncatedListItemsByProp("estimateNumber", data)]);

  return (
    <LoadingView isLoading={isLoading} style={style.loadingView}>
      {/* @ts-ignore*/}
      <FlatList
        contentContainerStyle={data?.length > 0 ? style.contentContainer : { flex: 1 }}
        data={data}
        bounces={false}
        renderItem={({ item }: any) => {
          return <JobsListItem item={item} />;
        }}
        {...accessibility("estimatesList")}
        stickyHeaderIndices={[0]}
        scrollEventThrottle={16}
        ListHeaderComponent={
          <View style={[style.headerContainer]}>
            {!isLoading && (
              <Text style={style.headerText}>
                {data ? data.length : "0"} {data?.length === 1 ? " job" : " jobs"}
              </Text>
            )}
          </View>
        }
        ListFooterComponent={
          hasMorePages && (
            <View>
              <Text style={style.jobsCountFooter}>
                Showing {visibleItemsCount} of {totalItemsCount} jobs {/* TODO  keep 10 of 20 in variables after pagination is done */}
              </Text>
              <TouchableOpacity style={style.loadMoreJobsBtn}>
                <Text style={style.loadMoreJobsBtnText}>Load more jobs</Text>
              </TouchableOpacity>
            </View>
          )
        }
        ListEmptyComponent={!isLoading && <JobsListEmptyComponent />}
      />
      {selectedJobAccount && (
        <View style={style.buttonContainer}>
          <TouchableOpacity
            style={style.buttonStyle}
            onPress={() => {
              if (cartCount > 0) {
                showAlertToClearCart(
                  () => {
                    unselectJobAccount();
                    setTimeout(() => {
                      clearCart();
                      requestEstimatesList({ pageNo: 1, numberOfLines: AppConfig.NUMBER_OF_LINES }, {});
                    }, 0);
                  },
                  false,
                  dispatchAlert,
                );
              } else {
                unselectJobAccount();
                setTimeout(() => {
                  clearCart();
                  requestEstimatesList({ pageNo: 1, numberOfLines: AppConfig.NUMBER_OF_LINES }, {});
                }, 0);
              }
            }}
          >
            <Text style={style.buttonText}>View all jobs</Text>
          </TouchableOpacity>
        </View>
      )}
    </LoadingView>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  isLoading: state.estimates?.fetching,
  data: state.estimates?.estimatesList,
  hasMorePages: false, // TODO: fix after pagination is done in api
  visibleItemsCount: state.estimates?.estimatesList?.length,
  totalItemsCount: state.estimates?.estimatesList?.length,
  selectedJobAccount: state.jobAccounts?.selectedJobAccount,
  selectedTradeAccount: state.connectTrade?.selectedTradeAccount,
  cartCount: state.cart?.cartEntriesCount,
  selectedBranch: state?.branchList?.selectedBranch,
  userId: state.login?.tempToken?.idToken,
  state,
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  unselectJobAccount: () => dispatch(JobAccountsActions.selectJobAccount(undefined)),
  requestEstimatesList: (payload, callback) => dispatch(EstimatesActions.requestEstimatesList(payload, callback)),
  clearCart: () => dispatch(ProductActions.clearCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobsListComponent);
