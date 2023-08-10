import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomIcon from "~root/Components/CustomIcon";
import GeneralQuoteItemComponent from "~root/Components/GeneralQuoteItemComponent/GeneralQuoteItemComponent";
import QuoteItemHeader from "~root/Components/QuoteItemHeader/QuoteItemHeader";
import { isNilOrEmpty } from "~root/Lib/CommonHelper";
import { Fonts } from "~root/Themes";
import { RootState } from "../../Reducers/index";
import { QuotesActions } from "../../Reducers/QuotesReducer/index";
import styles from "./QuoteCompanyDetailsStyle";

const QuoteCompanyDetails: React.SFC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { companyDetails, quotesDetails } = useSelector((state: RootState) => ({
    companyDetails: state.quotes.companyDetails,
    quotesDetails: state.quotes.quotesListDetails,
  }));

  React.useEffect(() => {
    dispatch(QuotesActions.requestCompanyDetails({ quoteId: quotesDetails.code }, {}));
  }, []);

  const address = companyDetails?.companyAddress?.formattedAddress;
  const termsAndConditions = companyDetails?.termsAndConditions ?? "";
  const paymentTerms = companyDetails?.paymentTerms ?? "";

  const quoteCompanyDetails = [
    {
      key: 1,
      label: "Name:",
      value: companyDetails?.companyAddress?.companyName,
    },
    {
      key: 2,
      label: "Address:",
      value: address?.replace(/,/g, "\n"),
    },
    {
      key: 3,
      label: "Phone:",
      value: companyDetails?.companyAddress?.phone,
    },
    {
      key: 4,
      label: "Email:",
      value: companyDetails?.companyAddress?.email,
    },
  ];

  const showCompanyDetails = React.useCallback(() => {
    navigation.navigate("CompanyEditQuoteContainer");
  }, []);

  return (
    <View style={styles.summaryContainer}>
      {isNilOrEmpty(companyDetails) ? (
        <View style={styles.quoteItemHeaderContainer}>
          <Text style={Fonts.style.openSans16Bold}>Company details</Text>
          <TouchableOpacity style={styles.editButtonContainer} onPress={showCompanyDetails}>
            <CustomIcon style={styles.iconStyleHeader} name={"alert-icon"} />
            <Text style={styles.editButtonHeader}>{"Setup"}</Text>
            <CustomIcon style={styles.iconStyleHeader} name={"chevron-right"} />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <QuoteItemHeader label={"Company details"} />
          <View style={styles.separator} />
          <GeneralQuoteItemComponent quoteItems={quoteCompanyDetails} />
          <View style={styles.separator2} />
          <TouchableOpacity
            style={styles.quoteItemHeaderContainer}
            onPress={() =>
              navigation.navigate("TermsAndConditionsView", {
                title: "Terms and Conditions",
                value: termsAndConditions,
                paymentTerm: false,
                companyDetails: true,
              })
            }
          >
            <Text style={styles.editButton}>{"Terms and Conditions"}</Text>
            <CustomIcon style={styles.iconStyle} name={"chevron-right"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quoteItemHeaderContainer, { marginTop: 16, marginBottom: 20 }]}
            onPress={() =>
              navigation.navigate("TermsAndConditionsView", {
                title: "Payment Terms",
                value: paymentTerms,
                paymentTerm: true,
                companyDetails: true,
              })
            }
          >
            <Text style={styles.editButton}>{"Payment Terms"}</Text>
            <CustomIcon style={styles.iconStyle} name={"chevron-right"} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default QuoteCompanyDetails;
