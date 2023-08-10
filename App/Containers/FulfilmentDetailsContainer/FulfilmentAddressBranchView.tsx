import * as R from "ramda";
import React from "react";
import { useSelector } from "react-redux";
import AddressSelector from "~root/Components/AddressSelector/AddressSelector";
import BranchSelector from "~root/Components/BranchSelector/BranchSelector";
import { Card } from "~root/Components/Card";
import CardSectionHeader from "~root/Components/Card/CardSectionHeader";
import { OrderTypes } from "~root/Lib/BranchHelper";
import { getAddressLineTwo } from "~root/Lib/CommonHelper";
import { RootState } from "~root/Reducers";
import styles from "./FulfilmentDetailsContainerStyles";

export interface OwnProps {
  isBranchChanged: boolean;
  requestGeoCode: (address: string, callBackSuccess: () => void) => void;
}

type Props = OwnProps;

const FulfilmentAddressBranchView: React.SFC<Props> = ({ requestGeoCode, isBranchChanged }: Props) => {
  const { checkingEligibility, orderType, deliveryAddress, fetchingAddress, fetchingCartDetail, cartDetailData } = useSelector((state: RootState) => ({
    checkingEligibility: state.cart.checkingEligibility,
    orderType: state.branchList.selectedOrderType,
    deliveryAddress: R.path(["cart", "userCartDetail", "deliveryAddress"], state),
    fetchingAddress: state.address.fetchingAddress || state.cart.fetching,
    fetchingCartDetail: state.cart.fetching,
    cartDetailData: state.cart.userCartDetail,
  }));

  return (
    <>
      <Card style={styles.cardStyle}>
        <CardSectionHeader text={orderType === OrderTypes.PICKUP ? "Branch" : "Delivery address"} />
        {orderType === OrderTypes.PICKUP ? (
          <BranchSelector
            isBranchChanged={isBranchChanged}
            fetchingCartDetail={fetchingCartDetail}
            checkingEligibility={checkingEligibility}
            cartDetailData={cartDetailData}
          />
        ) : (
          <AddressSelector
            addressLine1={deliveryAddress ? deliveryAddress.line1 : undefined}
            addressLine2={getAddressLineTwo(deliveryAddress)}
            fetchingAddress={fetchingAddress}
            requestGeoCode={requestGeoCode}
            deliveryAddress={deliveryAddress}
            setDistanceTime={true}
          />
        )}
      </Card>
    </>
  );
};

export default FulfilmentAddressBranchView;
