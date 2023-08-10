import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import LargeButton from "~root/Components/LargeButton";
import { OrderTypes } from "~root/Lib/BranchHelper";
import { RootState } from "~root/Reducers";
import styles from "./FulfilmentDetailsContainerStyles";

export interface OwnProps {
  continueTapped: () => void;
}

type Props = OwnProps;

const FulfilmentDetailsFooter: React.SFC<Props> = ({ continueTapped }: Props) => {
  const { orderType, cartDetailData } = useSelector((state: RootState) => ({
    orderType: state.branchList.selectedOrderType,
    cartDetailData: state.cart.userCartDetail,
  }));

  return (
    <View style={styles.continueButtonContainer}>
      <LargeButton
        textStyle={styles.largeButtonTextStyle}
        style={styles.largeButtonStyle}
        onPress={continueTapped}
        btnText={"Continue"}
        disabled={
          !cartDetailData.siteContacts || cartDetailData.siteContacts?.length === 0 || (!cartDetailData.deliveryAddress && orderType !== OrderTypes.PICKUP)
        }
      />
    </View>
  );
};

export default FulfilmentDetailsFooter;
