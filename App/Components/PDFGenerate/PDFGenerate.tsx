import * as React from "react";
import { ActivityIndicator, Platform, Text, TouchableOpacity, View } from "react-native";
import PDFView from "react-native-view-pdf";
import { useDispatch, useSelector } from "react-redux";
import CustomIcon from "~root/Components/CustomIcon";
import AppConfig from "~root/Config/AppConfig";
import { Colors } from "~root/Themes";
import { occludeSensitiveView } from "../../Lib/DataHelper";
import { RootState } from "../../Reducers/index";
import { QuotesActions } from "../../Reducers/QuotesReducer/index";
import styles from "./PDFGenerateStyle";

interface OwnProps {
  pdfViewKey: string;
}
const PDFGenerate: React.SFC<OwnProps> = ({ pdfViewKey }: OwnProps) => {
  const dispatch = useDispatch();
  const { quotesDetails, viewQuote, isLoading } = useSelector((state: RootState) => ({
    viewQuote: state.quotes.viewQuote,
    quotesDetails: state.quotes.quotesListDetails,
    isLoading: state.quotes.fetching,
  }));
  const [pdfLoading, setPdfLoading] = React.useState(true);

  React.useEffect(() => {
    if (isLoading) setPdfLoading(true);
  }, [isLoading]);

  const callAPI = React.useCallback(() => dispatch(QuotesActions.requestViewQuote({ quoteId: quotesDetails.code }, {})), [quotesDetails]);

  React.useEffect(() => {
    callAPI();
  }, [quotesDetails]);

  return (
    <View style={styles.pdfContainer}>
      {pdfLoading && !isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator color={Platform.OS === "android" ? Colors.darkBlue : ""} />
        </View>
      )}
      {isLoading ? (
        <View style={styles.loadingView}>
          <View style={styles.iconTextContainer}>
            <CustomIcon name={"pdf-icon"} style={styles.loadingIcon} />
            <Text style={styles.loadingText}>Generating PDF</Text>
          </View>
          <View style={styles.loader}>
            <ActivityIndicator color={Platform.OS === "android" ? Colors.darkBlue : ""} />
          </View>
        </View>
      ) : (
        <>
          {viewQuote?.url ? (
            <>
              <View ref={occludeSensitiveView} style={styles.pdfView}>
                <PDFView
                  ref={occludeSensitiveView}
                  key={pdfViewKey}
                  resource={AppConfig.CCV2_ENDPOINT + viewQuote?.url}
                  onLoad={() => setPdfLoading(false)}
                  resourceType={"url"}
                  fadeInDuration={10.0}
                  style={styles.pdf}
                />
              </View>
              <View style={styles.pdfReadyView}>
                <View style={styles.iconTextContainer}>
                  <CustomIcon name={"pdf-icon"} style={styles.pdfReadyIcon} />
                  <Text style={styles.pdfReadyText}>PDF Ready</Text>
                </View>
              </View>
            </>
          ) : (
            <>
              <View style={styles.pdfFailView}>
                <Text style={styles.pdfFail}>X</Text>
              </View>
              <View style={styles.pdfFailIconView}>
                <View style={styles.iconTextContainer}>
                  <CustomIcon name={"pdf-icon"} style={styles.pdfFailIcon} />
                  <Text style={styles.pdfFailText}>PDF Failed</Text>
                </View>
                <TouchableOpacity style={styles.regenerateBtn} onPress={callAPI}>
                  <Text style={styles.regenerateBtnText}>Regenerate Quote</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default PDFGenerate;
