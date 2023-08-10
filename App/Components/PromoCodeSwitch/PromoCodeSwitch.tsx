import * as R from "ramda";
import * as RA from "ramda-adjunct";
import * as React from "react";
import { Text, TouchableOpacity, ViewProps } from "react-native";
import { connect } from "react-redux";
import CustomIcon from "~root/Components/CustomIcon";
import DiscountCodeSwitchSheet from "~root/Components/DiscountCodeSwitchSheet/DiscountCodeSwitchSheet";
import LoadingView from "~root/Components/LoadingView";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { isVoucherApplied } from "~root/Lib/CartHelper";
import { useAppender } from "~root/Provider/Appender";
import { CartActions } from "~root/Reducers/CartReducer";
import { Colors } from "~root/Themes";
import { ApplyVoucherParams } from "~root/Types/BranchDetail";
import { RootState } from "../../Reducers";
import { SheetState } from "../BottomSheet/BottomSheet";
import styles from "./PromoCodeStyles";

interface DispatchProps {
  deleteAppliedVoucher: (params: ApplyVoucherParams, alertCallbacks: IAlertCallbacks) => void;
}

interface StateProps {
  isPromoAPIInProgress: boolean;
  isPromoApplied: boolean;
  promoCode: string;
}

interface OwnProps extends ViewProps {
  promoCode: any;
  onDeleteOrApplyVoucher: () => void;
}

type Props = DispatchProps & StateProps & OwnProps;

const PromoCodeSwitch: React.SFC<Props> = ({ isPromoAPIInProgress, isPromoApplied, promoCode, onDeleteOrApplyVoucher, deleteAppliedVoucher }: Props) => {
  const { append } = useAppender();
  const [promoCodeSheet, setPromoCodeSheet] = React.useState(SheetState.CLOSED);

  const handleSheetClose = React.useCallback((isSuccess: boolean) => {
    setPromoCodeSheet(SheetState.CLOSED);
    if (isSuccess) {
      setTimeout(onDeleteOrApplyVoucher, 500);
    }
  }, []);

  React.useEffect(() => {
    append(<DiscountCodeSwitchSheet sheetState={promoCodeSheet} sheetCloseTapped={handleSheetClose} />, "promoCodeSwitch", 0);
  }, [promoCodeSheet]);

  const promoCodeTapped = React.useCallback(() => {
    if (isPromoApplied) {
      const params = {
        voucherId: promoCode,
      };
      deleteAppliedVoucher(params, {
        onSuccess: onDeleteOrApplyVoucher,
        onFailure: RA.noop,
      });
    } else {
      setPromoCodeSheet(SheetState.EXPANDED);
    }
  }, [isPromoApplied, promoCode]);

  const getPromoCodeColor = React.useCallback(() => {
    if (isPromoApplied) {
      return isPromoAPIInProgress ? Colors.darkGrey : Colors.red;
    } else {
      return Colors.lightBlue;
    }
  }, [isPromoApplied, isPromoAPIInProgress]);

  return (
    <TouchableOpacity disabled={isPromoAPIInProgress} style={styles.viDiscount} onPress={promoCodeTapped}>
      <LoadingView style={[styles.loadingViewStyle, styles.promoIcon]} isLoading={isPromoAPIInProgress} hideViewOnLoading={true}>
        <CustomIcon name={"Tag-icon"} style={[styles.iconStyle, { fontSize: 24 }]} />
      </LoadingView>
      <Text
        style={[
          styles.addDiscountText,
          {
            color: getPromoCodeColor(),
          },
        ]}
      >
        {isPromoApplied ? "Remove promo code" : "Add a promo code"}
      </Text>
    </TouchableOpacity>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  isPromoApplied: isVoucherApplied(state.cart),
  isPromoAPIInProgress: state.cart.isPromoAPIInProgress,
  promoCode: R.pathOr("", ["appliedVouchers", "0", "voucherCode"])(state.cart.userCartDetail),
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  deleteAppliedVoucher: (params: ApplyVoucherParams, alertCallbacks: any) => dispatch(CartActions.requestDeleteAppliedVoucher(params, alertCallbacks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PromoCodeSwitch));
