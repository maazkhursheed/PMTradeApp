import { useNavigation } from "@react-navigation/native";
import R from "ramda";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { accessibility } from "~root/Lib/DataHelper";
import { useQuoteStatusChecker, useQuoteWonOrLostStatus, useTabBar } from "~root/Lib/QuoteHelper";
import { useAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import { Colors, Fonts } from "~root/Themes";
import { SheetState } from "../BottomSheet/BottomSheet";
import ChangeMarkupSheet from "../ChangeMarkupSheet/ChangeMarkupSheet";
import CustomIcon from "../CustomIcon";
import { FeatureKeys, useFeatureToggleChangeNotifier } from "../FeatureToggle/FeatureToggle";
import styles from "./MaterialsSectionFooterStyle";

export interface OwnProps {
  isMaterialsList?: boolean;
}

type Props = OwnProps;

const MaterialsSectionFooter: React.SFC = ({ isMaterialsList }: Props) => {
  const { quoteDetails, isChangeMarkupEnabled, quoteId } = useSelector((state: RootState) => ({
    quoteDetails: state?.quotes?.quotesListDetails,
    isChangeMarkupEnabled: R.compose(
      R.reduce(R.add, 0),
      R.map(R.propOr(0, "productCount")),
      R.pathOr([], ["sectionSOBQuotes", "SOBQuotesList", "pmQuoteSobList"]),
    )(state),
    quoteId: state?.quotes?.quotesListDetails?.code,
  }));

  React.useEffect(() => {
    callAPI(false);
  }, []);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { append } = useAppender();
  const [stateSheet, setStateSheet] = React.useState(SheetState.CLOSED);
  const markupLabel = quoteDetails?.markupPercentage ? "(" + quoteDetails?.markupPercentage + "%)" : "";
  const isQuoteEditable = useQuoteStatusChecker();
  React.useEffect(() => {
    append(<ChangeMarkupSheet sheetState={stateSheet} sheetCloseTapped={() => setStateSheet(SheetState.CLOSED)} />, "ChangeMarkupPercentageSheet", 0);
  }, [stateSheet]);
  React.useEffect(() => {
    if (stateSheet === SheetState.EXPANDED) useTabBar(navigation, "none");
    else useTabBar(navigation, "flex");
  }, [stateSheet]);

  useFeatureToggleChangeNotifier(FeatureKeys.QuotesSelector, () => setStateSheet(SheetState.CLOSED));
  const callAPI = React.useCallback(
    value => {
      dispatch(
        QuotesActions.requestMarkCompleted(
          {
            quoteId,
            allProductsAdded: value,
          },
          { onSuccess: value ? navigation.goBack : undefined },
        ),
      );
    },
    [quoteId],
  );
  const isQuoteWonOrLost = useQuoteWonOrLostStatus();
  return (
    <>
      {isQuoteWonOrLost ? (
        <View style={styles.quoteWonLostContainer}>
          <TouchableOpacity style={styles.backToJobDtailsButton} onPress={navigation.goBack}>
            <Text style={styles.buttonText}>Back to Job Details</Text>
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: isQuoteWonOrLost ? "flex-end" : undefined }}>
            <Text style={Fonts.style.openSans12}>Total excl. GST</Text>
            <Text style={Fonts.style.openSans16Bold}>{quoteDetails?.totalPrice?.formattedValue}</Text>
          </View>
        </View>
      ) : !isMaterialsList ? (
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <CustomIcon style={styles.icon} name={"external-link"} />
              <Text style={styles.text}>{"Markup " + markupLabel}</Text>
              <Text
                style={[
                  styles.changeText,
                  {
                    color: isChangeMarkupEnabled ? Colors.lightBlue : Colors.darkGrey,
                  },
                ]}
                onPress={
                  isChangeMarkupEnabled
                    ? () => {
                        isQuoteEditable(() => setStateSheet(SheetState.EXPANDED));
                      }
                    : undefined
                }
                {...accessibility("ChangeMarkupButton")}
              >
                {" Change"}
              </Text>
            </View>
            <Text style={styles.value}>{quoteDetails?.markupPrice?.formattedValue}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <CustomIcon style={styles.icon} name={"cart"} />
              <Text style={styles.text}>Total excl. GST</Text>
            </View>
            <Text style={styles.value}>{quoteDetails?.totalPrice?.formattedValue}</Text>
          </View>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => isQuoteEditable(() => callAPI(true))}>
            <CustomIcon style={styles.tickIcon} name={"tick"} />
            <Text style={styles.buttonText}>All Materials Added</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => isQuoteEditable(() => callAPI(true))}>
              <Text style={styles.buttonText}>Mark as complete</Text>
            </TouchableOpacity>
            <View style={styles.totalGSTValue}>
              <Text style={styles.gstText}>Total excl. GST</Text>
              <Text style={styles.value}>{quoteDetails?.totalPrice?.formattedValue}</Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default MaterialsSectionFooter;
