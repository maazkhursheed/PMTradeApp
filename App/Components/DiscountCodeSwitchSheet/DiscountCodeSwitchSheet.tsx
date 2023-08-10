import { useNavigation } from "@react-navigation/native";
import { Button, Icon } from "native-base";
import * as React from "react";
import { Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native";
import UXCam from "react-native-ux-cam";
import { connect } from "react-redux";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import CustomModalView from "~root/Components/ModalView/CustomModalView";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { BoldText, IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { accessibility, addOcclusionForTextFields, removeOcclusionFromTextFields, tagScreenName } from "~root/Lib/DataHelper";
import { useCashCustomerStatus, useTabBar } from "~root/Lib/QuoteHelper";
import { RootState } from "~root/Reducers";
import { CartActions } from "~root/Reducers/CartReducer";
import { Colors } from "~root/Themes";
import { ApplyVoucherParams } from "~root/Types/BranchDetail";
import LoadingView from "../LoadingView";
import styles from "./DiscountCodeSwitchSheetStyles";

interface OwnProps {
  sheetState: SheetState;
  onSuccess?: (name: string) => void;
  sheetCloseTapped?: (isSuccess: boolean) => void;
}

interface DispatchProps {
  applyVoucher: (params: ApplyVoucherParams, alertCallbacks: IAlertCallbacks) => void;
}

interface StateProps {
  isPromoAPIInProgress: boolean;
}

type Props = OwnProps & StateProps & DispatchProps;

const DiscountCodeSwitchSheet: React.SFC<Props> = ({ sheetState, sheetCloseTapped, applyVoucher, isPromoAPIInProgress }: Props) => {
  const textInputRef = React.useRef(null);
  const navigation = useNavigation();
  const [sheetStateInternal, setSheetStateInternal] = React.useState(sheetState);
  const [discountCode, setDiscountCode] = React.useState("");
  const [showErrorAlert, setShowErrorAlert] = React.useState(false);
  const { CashCustomerStatus } = useCashCustomerStatus();

  React.useEffect(() => {
    if (sheetState === SheetState.EXPANDED) useTabBar(navigation, "none", 1);
    else useTabBar(navigation, "flex", 1);
  }, [sheetState]);

  React.useEffect(() => {
    setSheetStateInternal(sheetState);
    if (sheetState === SheetState.EXPANDED) {
      textInputRef.current.focus();
    }
  }, [sheetState]);
  React.useEffect(() => {
    if (sheetStateInternal === SheetState.EXPANDED) {
      tagScreenName("Promo code Screen");
      addOcclusionForTextFields();
    }
  }, [sheetStateInternal]);

  const applyTapped = () => {
    Keyboard.dismiss();
    if (!!discountCode) {
      const params = {
        voucherId: discountCode,
      };
      setTimeout(() => {
        applyVoucher(params, {
          onSuccess: onSuccessApplyVoucher,
          onFailure: onFailureApplyVoucher,
        });
      }, 500);
    }
  };

  const onFailureApplyVoucher = () => {
    setShowErrorAlert(true);
  };

  const onSuccessApplyVoucher = () => {
    setDiscountCode("");
    sheetCloseTapped(true);
  };

  const renderModalContent = () => {
    UXCam.setAutomaticScreenNameTagging(false);
    return (
      <View style={styles.modelError}>
        <Text style={styles.invalidCodeTxt}>Invalid code</Text>
        <View style={styles.errorView}>
          <Text style={styles.errorText}>Please try again, or contact</Text>
          <Text style={styles.errorText}>PlaceMakers to get assistance.</Text>
        </View>
        <View style={styles.separator} />
        <TouchableOpacity onPress={tryAgainTapped} style={styles.modalBtn} {...accessibility("tryAgainBtn")}>
          <Text style={styles.tryAgainBtnText}>Try again</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity onPress={closeSheetTapped} style={styles.modalBtn} {...accessibility("closeModalBtn")}>
          <Text style={styles.closeBtnText}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const tryAgainTapped = () => {
    setShowErrorAlert(false);
    setTimeout(() => {
      textInputRef.current.focus();
    }, 100);
  };

  const closeSheetTapped = () => {
    Keyboard.dismiss();
    setShowErrorAlert(false);
    setDiscountCode("");
    setSheetStateInternal(SheetState.CLOSED);
    sheetCloseTapped(false);
    removeOcclusionFromTextFields();
  };

  return (
    <>
      <BottomSheet
        content={
          <View style={styles.contentContainer}>
            <STCHeader
              title={"Promo code"}
              titleStyle={styles.titleStyle}
              style={[
                {
                  backgroundColor: sheetStateInternal === SheetState.EXPANDED ? Colors.darkBlue : Colors.cloud,
                },
              ]}
              leftItem={
                <Button disabled={isPromoAPIInProgress} transparent={true} onPress={closeSheetTapped} {...accessibility("leftItemBtn")}>
                  <Text style={styles.cancelStyle}>{"Cancel"}</Text>
                </Button>
              }
              rightItem={
                <Button disabled={!discountCode || isPromoAPIInProgress} transparent={true} onPress={applyTapped} {...accessibility("rightItemBtn")}>
                  <Text
                    style={[
                      styles.applyText,
                      {
                        color: discountCode ? Colors.lightBlue : Colors.darkGrey,
                      },
                    ]}
                  >
                    {"Apply"}
                  </Text>
                </Button>
              }
            />
            <View style={styles.inputContainerStyle}>
              <TextInput
                ref={textInputRef}
                style={styles.inputStyle}
                autoCapitalize={"characters"}
                placeholder={"Enter promo code"}
                onChangeText={text => {
                  setDiscountCode(text);
                }}
                value={discountCode}
                {...accessibility("promoCodeValue")}
                autoCorrect={false}
                placeholderTextColor={Colors.darkGrey}
                onSubmitEditing={applyTapped}
                selectionColor={Colors.lightBlue}
              />
              {discountCode.length > 0 && (
                <Button
                  transparent={true}
                  style={styles.closeBtn}
                  onPress={() => {
                    setDiscountCode("");
                  }}
                  {...accessibility("clearText")}
                >
                  <Icon style={styles.closeIcon} type={"MaterialIcons"} name={"cancel"} />
                </Button>
              )}
            </View>
            <LoadingView style={styles.loadingView} isLoading={isPromoAPIInProgress}>
              <View style={styles.messageView}>
                <Text style={styles.message} {...accessibility("promoCodeMsg")}>
                  {isPromoAPIInProgress ? "" : "Enter your promo code above, then hit ‘Apply’"}
                </Text>
                {!isPromoAPIInProgress && CashCustomerStatus && (
                  <Text style={[styles.message, { marginTop: 10 }]} {...accessibility("promoCodeMsgTip")}>
                    Promo codes can only be used towards <BoldText>Pay Now</BoldText> items
                  </Text>
                )}
              </View>
            </LoadingView>
          </View>
        }
        sheetState={sheetStateInternal}
      />

      <CustomModalView visible={showErrorAlert}>{renderModalContent()}</CustomModalView>
    </>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  applyVoucher: (params: ApplyVoucherParams, alertCallbacks: any) => dispatch(CartActions.requestApplyVoucher(params, alertCallbacks)),
});

const mapStateToProps = (state: RootState): StateProps => ({
  isPromoAPIInProgress: state.cart.isPromoAPIInProgress,
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscountCodeSwitchSheet);
