import { Button } from "native-base";
import * as React from "react";
import { Keyboard, ScrollView, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AddressSelectComponent from "~root/Components/AddressSelectComponent/AddressSelectComponent";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import LoadingView from "~root/Components/LoadingView";
import NewTextField from "~root/Components/NewTextField/NewTextField";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { customerNamePH, emailPH, phoneNumberPH, showAlertMessage } from "~root/Lib/AlertsHelper";
import { accessibility, addOcclusionForTextFields, occludeSensitiveView, removeOcclusionFromTextFields, tagScreenName } from "~root/Lib/DataHelper";
import { stripNonNumbers, validateContactPhone, validateEmail } from "~root/Lib/StringHelper";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import { Colors } from "~root/Themes";
import { getAddressObject } from "~root/Transforms/OrderItem";
import styles from "./CustomerDetailsEditSheetStyles";

interface OwnProps {
  sheetState: SheetState;
  sheetCloseTapped: () => void;
  defaultName: string;
  defaultAddress: string;
  defaultPhone: string;
  defaultEmail: string;
}

type Props = OwnProps;

const CustomerDetailsEditSheet: React.SFC<Props> = ({ sheetState, sheetCloseTapped, defaultName, defaultEmail, defaultPhone, defaultAddress }: Props) => {
  const [customerName, setCustomerName] = React.useState(defaultName);
  const [phoneNumber, setPhoneNumber] = React.useState(defaultPhone);
  const [address, setAddress] = React.useState(defaultAddress);
  const [emailSent, setEmailSent] = React.useState(defaultEmail);
  const dispatch = useDispatch();
  const { dispatchAlert } = useCustomAlert();
  const closeSheet = React.useCallback(() => {
    Keyboard.dismiss();
    sheetCloseTapped();
    removeOcclusionFromTextFields();
  }, [sheetCloseTapped]);

  React.useEffect(() => {
    setCustomerName(defaultName);
    setEmailSent(defaultEmail);
    setPhoneNumber(defaultPhone);
    setAddress(defaultAddress);
  }, [defaultName, defaultEmail, defaultPhone, defaultAddress, sheetState]);

  React.useEffect(() => {
    if (sheetState === SheetState.EXPANDED) {
      tagScreenName("Customer Details Screen");
      addOcclusionForTextFields();
    }
  }, [sheetState]);

  const { quoteDetails, loading } = useSelector((state: RootState) => ({
    quoteDetails: state?.quotes?.quotesListDetails,
    loading: state?.quotes?.fetching,
  }));

  const updateCustomerDetails = React.useCallback(() => {
    Keyboard.dismiss();

    const updateCustomerProdParams = {
      code: quoteDetails?.code,
      jobAddress: quoteDetails?.jobAddress,
      consumerAddress: {
        firstName: customerName,
        phone: stripNonNumbers(phoneNumber),
        email: emailSent,
        ...getAddressObject(address),
      },
      estimateFlag: quoteDetails?.estimateFlag,
      channel: quoteDetails?.channel ?? "",
      termsAndConditions: quoteDetails?.termsAndConditions ?? "",
      notes: quoteDetails?.notes ?? "",
    };

    dispatch(
      QuotesActions.updateQuoteDetails(
        {
          urlParams: {
            quoteId: quoteDetails?.code,
          },
          bodyParams: updateCustomerProdParams,
        },
        {
          onSuccess: closeSheet,
          onFailure: () => {
            showAlertMessage("", "We were unable to update customer details, please try again", dispatchAlert);
          },
        },
      ),
    );
  }, [quoteDetails, customerName, emailSent, address, phoneNumber]);

  const validateAndUpdateDetails = React.useCallback(() => {
    if (phoneNumber !== "" && !validateContactPhone(stripNonNumbers(phoneNumber))) {
      return showAlertMessage("", "Invalid phone number", dispatchAlert);
    } else if (emailSent !== "" && !validateEmail(emailSent)) {
      return showAlertMessage("", "Invalid email", dispatchAlert);
    } else {
      updateCustomerDetails();
    }
  }, [phoneNumber, emailSent, updateCustomerDetails]);

  return (
    <>
      <BottomSheet
        content={
          <ScrollView style={styles.contentContainer} contentContainerStyle={styles.contentStyle} keyboardShouldPersistTaps={"handled"}>
            <STCHeader
              title={"Edit customer details"}
              titleStyle={styles.titleStyle}
              style={[
                styles.headerStyle,
                {
                  backgroundColor: sheetState === SheetState.EXPANDED ? Colors.darkBlue : Colors.cloud,
                },
              ]}
              leftItem={
                <Button transparent={true} onPress={closeSheet} {...accessibility("leftItemBtn")}>
                  <Text style={styles.cancelStyle}>{"Cancel"}</Text>
                </Button>
              }
              rightItem={
                <Button transparent={true} onPress={validateAndUpdateDetails} {...accessibility("rightItemBtn")}>
                  <Text style={styles.addButtonStyle}>{"Save"}</Text>
                </Button>
              }
            />
            <LoadingView style={styles.mainView} isLoading={loading} hideViewOnLoading={true}>
              <NewTextField hideData={true} label={"Name"} placeholder={customerNamePH} value={customerName} onChangeText={setCustomerName} />
              <AddressSelectComponent ref={occludeSensitiveView} label={"Address"} onSelectAddress={setAddress} selectedAddress={address} />
              <NewTextField
                hideData={true}
                label={"Phone"}
                placeholder={phoneNumberPH}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType={"phone-pad"}
                returnKeyType={"done"}
                returnKeyLabel={"done"}
              />
              <NewTextField hideData={true} label={"Email"} placeholder={emailPH} value={emailSent} onChangeText={setEmailSent} />
            </LoadingView>
          </ScrollView>
        }
        sheetState={sheetState}
      />
    </>
  );
};

export default CustomerDetailsEditSheet;
