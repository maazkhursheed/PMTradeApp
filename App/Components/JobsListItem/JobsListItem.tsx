import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import * as R from "ramda";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import AppConfig from "~root/Config/AppConfig";
import { IAlertCallbacks, showAlertToClearCart } from "~root/Lib/AlertsHelper";
import { isNilOrEmpty, isNotNilOrEmpty } from "~root/Lib/CommonHelper";
import { occludeSensitiveView } from "~root/Lib/DataHelper";
import { isExpiring } from "~root/Lib/EstimatesHelper";
import { RootState } from "~root/Reducers";
import { EstimatesActions } from "~root/Reducers/EstimatesReducer";
import { JobAccountsActions } from "~root/Reducers/JobAccountsReducers";
import { ProductActions } from "~root/Reducers/ProductReducers";
import { Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";
import { JobItem } from "~root/Types/JobAccounts";
import style from "./JobsListItemStyles";

export interface DispatchProps {
  selectJobAccount: (item: JobItem | undefined) => void;
  unselectJobAccount: () => void;
  clearCart: () => void;
  requestEstimatesList: (payload: any, alertCallbacks: IAlertCallbacks) => void;
}

interface OwnProps {
  item: any;
}

interface StateProps {
  selectedAccount: any;
  selectedJobAccount: any;
  cartCount: number;
  jobAccounts: any;
  cartEstimateId: string;
}

type Props = OwnProps & StateProps & DispatchProps;

const JobsListItem: React.SFC<Props> = ({
  item,
  selectedJobAccount,
  selectedAccount,
  cartCount,
  jobAccounts,
  selectJobAccount,
  clearCart,
  requestEstimatesList,
  cartEstimateId,
}: Props) => {
  const navigation = useNavigation();
  const { dispatchAlert } = useCustomAlert();
  const performNavigation = React.useCallback(() => {
    if (isNilOrEmpty(item.estimateNumber)) {
      navigation.navigate("SearchResults", {
        categoryId: ":Sort By:category:root",
      });
    } else {
      navigation.navigate("StagesOfBuild", {
        screen: "StagesOfBuild",
        estimateNumber: item.estimateNumber,
      });
    }
  }, [item.estimateNumber]);

  const onPress = () => {
    const isEstimated = isNotNilOrEmpty(cartEstimateId) && cartEstimateId !== item.estimateNumber;
    const account = R.find(R.propEq("JobNumber", item.accountId))(jobAccounts);
    if (isEstimated && cartCount > 0) {
      showAlertToClearCart(
        () => {
          performNavigation();
          selectJobAccount(account);
          setTimeout(() => {
            clearCart();
            requestEstimatesList({ pageNo: 1, numberOfLines: AppConfig.NUMBER_OF_LINES }, {});
          }, 10);
        },
        true,
        dispatchAlert,
      );
    } else {
      if (!selectedJobAccount) {
        if (item.accountId !== selectedAccount?.custId) {
          if (cartCount > 0) {
            showAlertToClearCart(
              () => {
                performNavigation();
                selectJobAccount(account);
                setTimeout(() => {
                  clearCart();
                  requestEstimatesList({ pageNo: 1, numberOfLines: AppConfig.NUMBER_OF_LINES }, {});
                }, 10);
              },
              false,
              dispatchAlert,
            );
          } else {
            performNavigation();
            selectJobAccount(account);
            setTimeout(() => {
              clearCart();
              requestEstimatesList({ pageNo: 1, numberOfLines: AppConfig.NUMBER_OF_LINES }, {});
            }, 10);
          }
        } else {
          // item.accountId === selectedAccount?.custId
          // no need for alert since the selected account already matches parent account.
          performNavigation();
        }
      } else {
        performNavigation();
      }
    }

    // if selectedJobAccount then the list will contain only jobs related to selectedJobAccount
    // therefore the scenario for alert will not occur in this condition
  };

  const getExpiryStyle = React.useCallback(() => {
    if (isExpiring(item.estimateExpire)) {
      return {
        ...Fonts.style.openSans12Bold,
        color: colors.red,
      };
    } else {
      return {
        color: colors.darkGrey,
      };
    }
  }, [item]);

  return (
    <View style={style.container}>
      {isNotNilOrEmpty(item.estimateNumber) && (
        <View ref={occludeSensitiveView} style={style.quoteView}>
          <Text style={style.jobsItemLabel}>{"Estimate No: "}</Text>
          <Text ref={occludeSensitiveView} style={style.textStyle}>
            {item.estimateNumber}
          </Text>
        </View>
      )}
      <Text ref={occludeSensitiveView} style={style.accountName}>
        {item.accountName}
      </Text>

      <View style={style.separatorView} />

      {isNotNilOrEmpty(item.estimateNumber) ? (
        <View style={style.datesContainer}>
          <View style={style.dateContainer}>
            <Text style={style.jobsItemLabel}>{"Est. Date: "}</Text>
            <Text style={style.textStyle}>{moment(item.estimateDate).format("DD/MM/YYYY")}</Text>
          </View>
          <View style={style.dateContainer}>
            <Text style={[style.jobsItemLabel, getExpiryStyle()]}>{"Expires: "}</Text>
            <Text style={[style.textStyle, getExpiryStyle()]}>{moment(item.estimateExpire).format("DD/MM/YYYY")}</Text>
          </View>
        </View>
      ) : (
        <View style={style.noDateContainer}>
          <Text style={style.jobsItemLabel}>{"No estimates for this job"}</Text>
        </View>
      )}

      <TouchableOpacity style={style.orderProducts} onPress={onPress}>
        <Text style={style.orderProductsText}>{isNotNilOrEmpty(item.estimateNumber) ? "Order by Stage of Build" : "Order for Job"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  unselectJobAccount: () => dispatch(JobAccountsActions.selectJobAccount(undefined)),
  selectJobAccount: (item: any) => dispatch(JobAccountsActions.selectJobAccount(item)),
  clearCart: () => dispatch(ProductActions.clearCart()),
  requestEstimatesList: (payload, callback) => dispatch(EstimatesActions.requestEstimatesList(payload, callback)),
});

const mapStateToProps = (state: RootState): StateProps => ({
  jobAccounts: state.jobAccounts.data,
  selectedAccount: state.connectTrade?.selectedTradeAccount,
  selectedJobAccount: state.jobAccounts.selectedJobAccount,
  cartCount: state.cart.cartEntriesCount,
  cartEstimateId: R.pathOr("", ["userCartDetail", "estimateId"])(state.cart),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobsListItem);
