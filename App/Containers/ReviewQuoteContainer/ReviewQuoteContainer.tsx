import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { ScrollView } from "react-native";
import LoadingView from "~root/Components/LoadingView";
import MainContainer from "~root/Components/MainContainer";
import QuoteCompanyDetails from "~root/Components/QuoteCompanyDetails/QuoteCompanyDetails";
import QuoteCosts from "~root/Components/QuoteCosts/QuoteCosts";
import QuoteCustomerDetails from "~root/Components/QuoteCustomerDetails/QuoteCustomerDetails";
import QuoteJobDetails from "~root/Components/QuoteJobDetails/QuoteJobDetails";
import QuoteMaterials from "~root/Components/QuoteMaterials/QuoteMaterials";
import QuoteReviewTotal from "~root/Components/QuoteReviewTotal/QuoteReviewTotal";
import QuoteTotal from "~root/Components/QuoteTotal/QuoteTotal";
import SmallHeader from "~root/Components/SmallHeader";
import { ApplicationStyles } from "~root/Themes";
import styles from "./ReviewQuoteContainerStyle";

const ReviewQuoteContainer: React.SFC = () => {
  const navigation = useNavigation();

  return (
    <MainContainer>
      <SmallHeader navigation={navigation} style={ApplicationStyles.noShadow} title={"Review quote"} />
      <LoadingView isLoading={false} style={styles.quotesContainer}>
        <ScrollView style={styles.quotesContainer}>
          <QuoteJobDetails />
          <QuoteCustomerDetails />
          <QuoteMaterials />
          <QuoteCompanyDetails />
          <QuoteCosts />
          <QuoteTotal />
        </ScrollView>
        <QuoteReviewTotal />
      </LoadingView>
    </MainContainer>
  );
};

export default ReviewQuoteContainer;
