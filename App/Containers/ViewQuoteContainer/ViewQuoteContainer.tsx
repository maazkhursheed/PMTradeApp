import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { ScrollView, View } from "react-native";
import MainContainer from "~root/Components/MainContainer";
import PDFGenerate from "~root/Components/PDFGenerate/PDFGenerate";
import QuoteDisplayOptions from "~root/Components/QuoteDisplayOptions/QuoteDisplayOptions";
import SmallHeader from "~root/Components/SmallHeader";
import ViewQuoteTotal from "~root/Components/ViewQuoteTotal/ViewQuoteTotal";
import { withAppender } from "~root/Provider/Appender";
import { ApplicationStyles } from "~root/Themes";
import styles from "./ViewQuoteContainerStyles";

const ViewQuoteContainer: React.SFC = () => {
  const navigation = useNavigation();

  const [pdfViewKey, setPdfViewKey] = React.useState("pdfView0");
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => setPdfViewKey("pdfView" + Math.random().toString()));
    return unsubscribe;
  }, [navigation]);
  return (
    <MainContainer>
      <SmallHeader navigation={navigation} style={ApplicationStyles.noShadow} title={"View Quote"} />
      <View style={styles.quotesContainer}>
        <View style={styles.separator} />
        <ScrollView>
          <PDFGenerate pdfViewKey={pdfViewKey} />
          <View style={styles.separator} />
          <QuoteDisplayOptions />
          <View style={styles.separator2} />
        </ScrollView>
        <ViewQuoteTotal navigation={navigation} />
      </View>
    </MainContainer>
  );
};

export default withAppender(ViewQuoteContainer);
