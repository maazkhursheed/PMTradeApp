import * as React from "react";
import { Text, View } from "react-native";
import ProgressBar from "react-native-animated-progress";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import DisplayOptionsComponent from "~root/Components/DisplayOptionsComponent/DisplayOptionsComponent";
import styles from "~root/Components/DisplayQuoteOptionsSwitchSheet/DisplayQuoteOptionsSwitchSheetStyle";
import SheetHeaderComponent from "~root/Components/SheetHeaderComponent/SheetHeaderComponent";
import { showAlertMessage } from "~root/Lib/AlertsHelper";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import colors from "~root/Themes/Colors";
import { addOcclusionForTextFields, removeOcclusionFromTextFields, tagScreenName } from "../../Lib/DataHelper";

interface OwnProps {
  sheetState: SheetState;
  sheetCloseTapped: () => void;
}

type Props = OwnProps;

const DisplayQuoteOptionsSwitchSheet: React.SFC<Props> = ({ sheetState, sheetCloseTapped }: Props) => {
  const dispatch = useDispatch();
  const { dispatchAlert } = useCustomAlert();
  const { fetching, quoteDetails, displayQuoteStatuses } = useSelector((state: RootState) => ({
    fetching: state.quotes.fetching,
    quoteDetails: state.quotes.quotesListDetails,
    displayQuoteStatuses: state.quotes.displayOptionsQuote,
  }));

  const [showMaterialRetailPrice, setShowMaterialRetailPrice] = React.useState(displayQuoteStatuses?.viewRetailsPrice);
  const [showSectionBreakdown, setShowSectionBreakdown] = React.useState(displayQuoteStatuses?.viewSectionBreakdown);
  const [showCostBreakdown, setShowCostBreakdown] = React.useState(displayQuoteStatuses?.viewCostBreakdown);
  const [includeImages, setIncludeImages] = React.useState(displayQuoteStatuses?.viewIncludeImages);
  const [includeFiles, setIncludeFiles] = React.useState(displayQuoteStatuses?.viewIncludeFiles);

  React.useEffect(() => {
    setShowMaterialRetailPrice(displayQuoteStatuses?.viewRetailsPrice);
    setShowSectionBreakdown(displayQuoteStatuses?.viewSectionBreakdown);
    setShowCostBreakdown(displayQuoteStatuses?.viewCostBreakdown);
    setIncludeImages(displayQuoteStatuses?.viewIncludeImages);
    setIncludeFiles(displayQuoteStatuses?.viewIncludeFiles);
  }, [displayQuoteStatuses]);

  React.useEffect(() => {
    if (sheetState === SheetState.EXPANDED) {
      tagScreenName("Display Options Quote Screen");
      dispatch(QuotesActions.requestDefaultDisplayOptionsForQuotes({ quoteId: quoteDetails?.code }));
      addOcclusionForTextFields();
    }
  }, [sheetState]);

  const updateQuotesDisplayStatus = React.useCallback(() => {
    const updateQuoteStatusParams = {
      viewRetailsPrice: showMaterialRetailPrice,
      viewCostBreakdown: showCostBreakdown,
      viewSectionBreakdown: showSectionBreakdown,
      viewIncludeImages: includeImages,
      viewIncludeFiles: includeFiles,
    };
    dispatch(
      QuotesActions.updateDisplayOptionsForQuotes(
        {
          params: {
            quoteId: quoteDetails?.code,
          },
          bodyParams: updateQuoteStatusParams,
        },
        {
          onSuccess: () => {
            removeOcclusionFromTextFields();
            sheetCloseTapped();
          },
          onFailure: () => {
            showAlertMessage("", "Oops, something went wrong. Please try again.", dispatchAlert);
          },
        },
      ),
    );
  }, [quoteDetails, showMaterialRetailPrice, showCostBreakdown, includeFiles, includeImages, showSectionBreakdown, sheetCloseTapped]);

  return (
    <>
      <BottomSheet
        content={
          <View style={styles.contentContainer}>
            <SheetHeaderComponent
              sheetState={sheetState}
              title={"Display options"}
              leftPressText={"Cancel"}
              rightPressText={"Save"}
              leftPress={sheetCloseTapped}
              rightPress={updateQuotesDisplayStatus}
            />
            {fetching && <ProgressBar indeterminate={true} backgroundColor={colors.lightBlue} />}
            <Text style={styles.titleStyle}>Materials</Text>
            <DisplayOptionsComponent displayOption={"Show retail price"} setDisplayOption={setShowMaterialRetailPrice} status={showMaterialRetailPrice} />
            <DisplayOptionsComponent displayOption={"Show section breakdown"} setDisplayOption={setShowSectionBreakdown} status={showSectionBreakdown} />

            <Text style={[styles.titleStyle, styles.titleMarginTop]}>Costs</Text>
            <DisplayOptionsComponent displayOption={"Show costs breakdown"} setDisplayOption={setShowCostBreakdown} status={showCostBreakdown} />

            <Text style={[styles.titleStyle, styles.titleMarginTop]}>Attachments</Text>
            <DisplayOptionsComponent displayOption={"Include Images"} setDisplayOption={setIncludeImages} status={includeImages} />
            <DisplayOptionsComponent displayOption={"Include files"} setDisplayOption={setIncludeFiles} status={includeFiles} />
          </View>
        }
        sheetState={sheetState}
      />
    </>
  );
};

export default DisplayQuoteOptionsSwitchSheet;
