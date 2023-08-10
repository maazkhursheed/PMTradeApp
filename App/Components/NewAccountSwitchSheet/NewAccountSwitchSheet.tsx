import firebase from "@react-native-firebase/app";
import { Button } from "native-base";
import * as React from "react";
import { Keyboard, Platform, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import CustomIcon from "~root/Components/CustomIcon";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { addTradeAccError, addTradeAccSuccess, showAlertMessage, titleErr } from "~root/Lib/AlertsHelper";
import { getBranchTownRegion } from "~root/Lib/BranchHelper";
import {
  accessibility,
  addOcclusionForTextFields,
  getAccountLinkAnalyticsObj,
  getSelectedAccountId,
  removeOcclusionFromTextFields,
  tagScreenName,
} from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import { ConnectTradeActions } from "~root/Reducers/ConnectTradeReducers";
import { getEmail } from "~root/Reducers/LoginReducers";
import { Colors, Fonts } from "~root/Themes";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "../../Lib/LoginHelper";
import BranchSelectSheetContainer from "../BranchSelectSheetContainer/BranchSelectSheetContainer";
import styles from "./NewAccountSwitchSheetStyles";

interface OwnProps {
  sheetState: SheetState;
  onSuccess?: (name: string) => void;
  sheetCloseTapped?: () => void;
}

type Props = OwnProps;

let isAlertPresented = false;

const NewAccountSwitchSheet: React.SFC<Props> = ({ sheetState, sheetCloseTapped }: Props) => {
  const [sheetStateInternal, setSheetStateInternal] = React.useState(sheetState);
  const [newSelectedBranch, setNewSelectedBranch] = React.useState({});
  const [accountCode, setAccountCode] = React.useState("");
  const dispatch = useDispatch();
  const { dispatchAlert } = useCustomAlert();
  const { selectedBranch, userId, email, accountId } = useSelector((state: RootState) => ({
    selectedBranch: state.branchList?.selectedBranch,
    userId: state.login?.tempToken?.idToken,
    email: getEmail(state.login.userData),
    accountId: accountCode ? accountCode : getSelectedAccountId(state),
  }));

  const logFirebaseEvent = (step: number) => {
    const eventLogObject = getAccountLinkAnalyticsObj({
      step,
      event: "account_link",
      userId: extractDigitalIdFromJWTPayload(decodeJWTToken(userId)) as string,
      accountId,
      accountIdLinked: accountId,
      branch: newSelectedBranch?.name ? newSelectedBranch?.name : selectedBranch?.name,
      branchId: newSelectedBranch?.branchID ? newSelectedBranch?.branchID : selectedBranch?.branchID,
      location: Object.keys(newSelectedBranch).length === 0 ? getBranchTownRegion(selectedBranch) : getBranchTownRegion(newSelectedBranch),
    });
    firebase.analytics().logEvent("account_link", eventLogObject);
  };

  React.useEffect(() => {
    setSheetStateInternal(sheetState);
  }, [sheetState]);

  React.useEffect(() => {
    if (sheetStateInternal === SheetState.EXPANDED) {
      tagScreenName("New Account Screen");
      logFirebaseEvent(1);
      addOcclusionForTextFields();
    }
  }, [sheetStateInternal]);

  const addAccountTapped = React.useCallback(() => {
    isAlertPresented = false;
    Keyboard.dismiss();
    logFirebaseEvent(2);
    dispatch(
      ConnectTradeActions.onLinkTradeAccount(
        {
          email,
          accountId: accountCode,
          branchId: newSelectedBranch.branchCode,
          isAccountOwner: true,
        },
        {
          onSuccess: onSuccessConnectTradeAccount,
          onFailure: () => showAlertMessage(titleErr, addTradeAccError, dispatchAlert),
        },
      ),
    );
  }, [accountCode, email, newSelectedBranch]);

  const onSuccessConnectTradeAccount = React.useCallback(() => {
    if (!isAlertPresented) {
      isAlertPresented = true;
      Toast.show({
        text1: addTradeAccSuccess,
        topOffset: Platform.OS === "ios" ? 50 : 30,
        visibilityTime: 3000,
      });
      setAccountCode("");
      setNewSelectedBranch({});
      sheetCloseTapped();
      removeOcclusionFromTextFields();
    }
  }, [sheetCloseTapped]);

  return (
    <>
      <BottomSheet
        content={
          <View style={styles.contentContainer}>
            <STCHeader
              title={"New Account"}
              titleStyle={styles.titleStyle}
              style={[
                styles.headerStyle,
                {
                  backgroundColor: sheetStateInternal === SheetState.EXPANDED ? Colors.darkBlue : Colors.cloud,
                },
              ]}
              leftItem={
                <Button
                  transparent={true}
                  onPress={() => {
                    Keyboard.dismiss();
                    setAccountCode("");
                    setNewSelectedBranch({});
                    setSheetStateInternal(SheetState.CLOSED);
                    sheetCloseTapped();
                    removeOcclusionFromTextFields();
                  }}
                  {...accessibility("rightItemBtn")}
                >
                  <Text style={styles.cancelStyle}>{"Cancel"}</Text>
                </Button>
              }
              rightItem={
                <Button disabled={!(accountCode && newSelectedBranch.name)} transparent={true} onPress={addAccountTapped}>
                  <Text
                    style={{
                      ...Fonts.style.openSans16,
                      color: accountCode && newSelectedBranch.name ? Colors.lightBlue : Colors.darkGrey,
                    }}
                  >
                    {"Add"}
                  </Text>
                </Button>
              }
            />
            <View style={styles.mainView}>
              <View style={styles.accountCodeView}>
                <Text style={styles.selectionItem}>Account Code</Text>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Enter here"
                  placeholderTextColor={Colors.darkGrey}
                  autoCapitalize={"characters"}
                  onChangeText={text => {
                    setAccountCode(text);
                  }}
                  value={accountCode}
                />
              </View>
              <View style={styles.smallSeparator} />
              <View style={styles.homeBranchView}>
                <Text style={styles.selectionItem}>Home Branch</Text>
                <View style={styles.chooseBtnView}>
                  <BranchSelectSheetContainer
                    onPress={() => Keyboard.dismiss()}
                    isFromAllBranches={true}
                    selectedBranch={branch => {
                      setNewSelectedBranch(branch);
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={[
                          styles.valueItem,
                          {
                            color: newSelectedBranch.name ? Colors.black : Colors.darkGrey,
                          },
                        ]}
                      >
                        {newSelectedBranch.name ? newSelectedBranch.name : "Choose"}
                      </Text>
                      <CustomIcon style={styles.iconStyle} name={"chevron-right"} />
                    </View>
                  </BranchSelectSheetContainer>
                </View>
              </View>
              <View style={styles.smallSeparator} />
              <Text style={styles.message}>You can find your account related information on any PlaceMakers invoice.</Text>
            </View>
          </View>
        }
        sheetState={sheetStateInternal}
      />
    </>
  );
};

export default NewAccountSwitchSheet;
