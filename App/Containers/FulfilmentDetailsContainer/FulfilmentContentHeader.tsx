import { useNavigation } from "@react-navigation/native";
import * as R from "ramda";
import React from "react";
import { useSelector } from "react-redux";
import OfflineNotice from "~root/Components/OfflineNotice";
import SmallHeader from "~root/Components/SmallHeader";
import { OrderTypes } from "~root/Lib/BranchHelper";
import { RootState } from "~root/Reducers";

const FulfilmentDetailsHeader = () => {
  const navigation = useNavigation();

  const { orderType } = useSelector((state: RootState) => ({
    orderType: state.branchList.selectedOrderType,
  }));

  return (
    <>
      <SmallHeader
        navigation={navigation}
        title={R.cond([
          [R.equals(OrderTypes.STANDARD), R.always("Standard delivery details")],
          [R.equals(OrderTypes.PICKUP), R.always("Pickup details")],
          [R.equals(OrderTypes.EXPRESS), R.always("Express courier details")],
        ])(orderType)}
      />
      <OfflineNotice />
    </>
  );
};

export default FulfilmentDetailsHeader;
