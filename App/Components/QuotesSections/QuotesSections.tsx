import { useNavigation } from "@react-navigation/native";
import R from "ramda";
import * as React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "~root/Reducers";
import { Fonts } from "~root/Themes";
import QuotesSectionItem from "./QuotesSectionItem";
import styles from "./QuotesSectionStyle";

const QuotesInfo: React.SFC = () => {
  const navigation = useNavigation();
  const { quoteMedia, quoteDetails } = useSelector((state: RootState) => ({
    quoteDetails: state.quotes.quotesListDetails,
    quoteMedia: state.quotes.quoteMedia?.quoteMedia,
  }));

  const [countOfMediaIncluded, setCountOfMediaIncluded] = React.useState(0);
  React.useEffect(() => {
    const selectedMedia = quoteMedia && R.filter(R.propEq("mediaSelected", "true"))(quoteMedia);
    setCountOfMediaIncluded(selectedMedia?.length ?? 0);
  }, [quoteMedia]);

  return (
    <View style={styles.sectionContainer}>
      <Text style={Fonts.style.openSans16Bold}>{"Sections"}</Text>
      <QuotesSectionItem
        sectionTitle="Customer details"
        sectionDescription="Save contact and billing details"
        onPress={() => navigation.navigate("CustomerDetailsScreen")}
      />
      <QuotesSectionItem
        showTick={quoteDetails?.materialsAddedFlag}
        sectionTitle="Materials"
        sectionDescription="Build your materials list"
        onPress={() => navigation.navigate("MaterialsScreen")}
      />
      <QuotesSectionItem
        sectionTitle="Labour & other costs"
        sectionDescription="Add labour costs"
        onPress={() => {
          navigation.navigate("LabourScreen");
        }}
      />
      <QuotesSectionItem
        showTick={quoteDetails?.mediaIncluded}
        sectionTitle={"Images & Files (" + countOfMediaIncluded + ")"}
        sectionDescription="Upload images for reference and quote"
        onPress={() => {
          navigation.navigate("QuoteMediaContainer");
        }}
      />
    </View>
  );
};

export default QuotesInfo;
