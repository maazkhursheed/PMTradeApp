import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import { Text, View } from "native-base";
import R from "ramda";
import * as React from "react";
import { useCallback, useState } from "react";
import { Keyboard, Pressable, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import AddressSelectComponent from "~root/Components/AddressSelectComponent/AddressSelectComponent";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import CustomIcon from "~root/Components/CustomIcon";
import LoadingView from "~root/Components/LoadingView";
import MainContainer from "~root/Components/MainContainer";
import NewTextField from "~root/Components/NewTextField/NewTextField";
import SmallHeader from "~root/Components/SmallHeader";
import AppConfig from "~root/Config/AppConfig";
import { customerNamePH, emailPH, phoneNumberPH, showAlertMessage } from "~root/Lib/AlertsHelper";
import { getFileName, getUrlExtension, validateEmail, validatePhone } from "~root/Lib/StringHelper";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import { ApplicationStyles } from "~root/Themes";
import { getAddressObject } from "~root/Transforms/OrderItem";
import { occludeSensitiveView } from "../../Lib/DataHelper";
import styles from "./CompanyEditQuoteContainerStyles";
import UploadContainer from "./UploadContainer";

const CompanyEditQuoteContainer = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { companyDetails, loading, quoteDetails } = useSelector((state: RootState) => ({
    companyDetails: state.quotes.companyDetails,
    loading: state?.quotes?.fetching,
    quoteDetails: state?.quotes?.quotesListDetails,
  }));

  const [saveTapped, setSaveTapped] = useState(false);
  const imageUrl = R.pathOr("", ["companyLogo", "downloadUrl"]);
  const [didUpload, setDidUpload] = useState(false);
  const [filePath, setFilePath] = useState(AppConfig.CCV2_ENDPOINT + imageUrl(companyDetails) ?? "");
  const [address, setAddress] = React.useState(companyDetails?.companyAddress?.formattedAddress ?? "");
  const [emailSent, setEmailSent] = React.useState(companyDetails?.companyAddress?.email ?? "");
  const [phoneNumber, setPhoneNumber] = React.useState(companyDetails?.companyAddress?.phone ?? "");
  const [companyNameValue, setCompanyNameValue] = React.useState(companyDetails?.companyAddress?.companyName ?? "");
  const [termsAndCondition, setTermsCondition] = React.useState(companyDetails?.termsAndConditions ?? "");
  const [paymentTerm, setPaymentTerm] = React.useState(companyDetails?.paymentTerms ?? "");
  const { dispatchAlert } = useCustomAlert();
  const [fileName, setFileName] = useState(
    getFileName(AppConfig.CCV2_ENDPOINT + imageUrl(companyDetails) ?? moment().format("dd-MM-YY-hh-mm").toString() + "jpg"),
  );
  const [fileType, setFileType] = useState("type/" + getUrlExtension(AppConfig.CCV2_ENDPOINT + imageUrl(companyDetails)) ?? "jpg");
  const [spaceCount, setSpaceCount] = React.useState(companyDetails?.companyAddress?.phone.split(" ").length - 1 || 0);

  const goBack = React.useCallback(() => {
    if (route.params?.onEditSuccess) {
      route.params?.onEditSuccess();
    }
    Keyboard.dismiss();
    navigation.goBack();
  }, []);

  const updateCompanyDetails = React.useCallback(
    updatedConditionsPaymentTerms => {
      if (phoneNumber && !validatePhone(phoneNumber)) {
        showAlertMessage("", "Please enter a valid phone number", dispatchAlert);
        return;
      }
      if (emailSent && !validateEmail(emailSent)) {
        showAlertMessage("", "Please enter a valid email address", dispatchAlert);
        return;
      }
      const updateCompanyProdParams = {
        profile: {},
      };

      Keyboard.dismiss();

      const profileValue = {
        companyAddress: {
          email: emailSent,
          phone: phoneNumber,
          companyName: companyNameValue,
          ...getAddressObject(address),
        },
        termsAndConditions: updatedConditionsPaymentTerms ? updatedConditionsPaymentTerms.termsAndCondition : termsAndCondition,
        paymentTerms: updatedConditionsPaymentTerms ? updatedConditionsPaymentTerms.paymentTerm : paymentTerm,
      };

      const file = {
        name: fileName,
        uri: filePath,
        type: fileType,
      };

      updateCompanyProdParams.profile = profileValue;
      if (didUpload) {
        updateCompanyProdParams.file = file;
      }

      setDidUpload(false);

      dispatch(
        QuotesActions.updateQuoteCompanyDetails(
          {
            urlParams: {
              quoteId: quoteDetails?.code,
            },
            bodyParams: updateCompanyProdParams,
          },
          {
            onSuccess: updatedConditionsPaymentTerms
              ? () => setSaveTapped(false)
              : () => {
                  setSaveTapped(false);
                  goBack();
                },
            onFailure: () => {
              setSaveTapped(false);
              showAlertMessage("", "We were unable to update customer details, please try again", dispatchAlert);
            },
          },
        ),
      );
    },
    [
      didUpload,
      address,
      companyNameValue,
      dispatch,
      emailSent,
      fileName,
      filePath,
      fileType,
      goBack,
      paymentTerm,
      phoneNumber,
      quoteDetails?.code,
      termsAndCondition,
    ],
  );

  const setPhoneNumberWithSpace = useCallback((value: string) => {
    setPhoneNumber(value);
    if (value !== companyDetails?.companyAddress?.phone) {
      setSpaceCount(value.split(" ").length - 1);
    }
  }, []);

  return (
    <MainContainer>
      <SmallHeader
        navigation={navigation}
        style={ApplicationStyles.noShadow}
        title={"Company details"}
        actionItem={
          <Pressable onPress={() => updateCompanyDetails()} style={styles.rightItemStyle}>
            <Text style={styles.textStyle}>Save</Text>
          </Pressable>
        }
      />
      <LoadingView style={styles.mainView} isLoading={loading || saveTapped} hideViewOnLoading={true}>
        <KeyboardAwareScrollView style={styles.contentContainer} keyboardShouldPersistTaps={"handled"}>
          <View style={styles.formView}>
            {route.params?.isFromViewQuote ? (
              <View>
                <View style={styles.centeredLogo}>
                  <UploadContainer
                    setFilePath={filePath => {
                      setFilePath(filePath);
                      setDidUpload(true);
                    }}
                    filePath={filePath}
                    setNewFileName={setFileName}
                    setNewFileType={setFileType}
                  />
                </View>
                <NewTextField
                  hideData={true}
                  maxLength={255}
                  label={"Company name"}
                  placeholder={customerNamePH}
                  value={companyNameValue}
                  onChangeText={setCompanyNameValue}
                />
              </View>
            ) : (
              <View>
                <NewTextField
                  hideData={true}
                  maxLength={255}
                  label={"Company name"}
                  placeholder={customerNamePH}
                  value={companyNameValue}
                  onChangeText={setCompanyNameValue}
                />
                <UploadContainer
                  setFilePath={filePath => {
                    setFilePath(filePath);
                    setDidUpload(true);
                  }}
                  filePath={filePath}
                  setNewFileName={setFileName}
                  setNewFileType={setFileType}
                  showButton
                />
              </View>
            )}
            <View style={[styles.separator, styles.topSeparator]} />
            <AddressSelectComponent ref={occludeSensitiveView} label={"Company address"} onSelectAddress={setAddress} selectedAddress={address} />
            <NewTextField
              label={"Phone number"}
              placeholder={phoneNumberPH}
              value={phoneNumber}
              onChangeText={setPhoneNumberWithSpace}
              keyboardType={"phone-pad"}
              returnKeyType={"done"}
              returnKeyLabel={"done"}
              maxLength={11 + spaceCount}
              hideData={true}
            />
            <NewTextField hideData={true} maxLength={255} label={"Email"} placeholder={emailPH} value={emailSent} onChangeText={setEmailSent} />
          </View>
          <View style={styles.privacyView}>
            <TouchableOpacity
              style={styles.quoteItemHeaderContainer}
              onPress={() =>
                navigation.navigate("TermsAndConditionsView", {
                  title: "Terms and Conditions",
                  value: termsAndCondition,
                  paymentTerm: false,
                  setValueText: updatedValue => {
                    setSaveTapped(() => true);
                    setTermsCondition(updatedValue);
                    setTimeout(() => updateCompanyDetails({ termsAndCondition: updatedValue, paymentTerm: paymentTerm }), 0);
                  },
                })
              }
            >
              <Text style={styles.editButton}>{"Terms and Conditions"}</Text>
              <CustomIcon style={styles.iconStyle} name={"chevron-right"} />
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              style={styles.quoteItemHeaderContainer}
              onPress={() =>
                navigation.navigate("TermsAndConditionsView", {
                  title: "Payment Terms",
                  value: paymentTerm,
                  paymentTerm: true,
                  setValueText: updatedValue => {
                    setSaveTapped(() => true);
                    setPaymentTerm(updatedValue);
                    setTimeout(() => updateCompanyDetails({ termsAndCondition: termsAndCondition, paymentTerm: updatedValue }), 0);
                  },
                })
              }
            >
              <Text style={styles.editButton}>{"Payment Terms"}</Text>
              <CustomIcon style={styles.iconStyle} name={"chevron-right"} />
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </LoadingView>
    </MainContainer>
  );
};

export default CompanyEditQuoteContainer;
