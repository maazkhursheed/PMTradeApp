import moment from "moment";
import * as React from "react";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import CustomIcon from "~root/Components/CustomIcon";
import EditJobDetails from "~root/Components/EditJobDetails";
import HeaderSegment from "~root/Components/HeaderSegment/HeaderSegment";
import QuotesWonSwitchSheet from "~root/Components/QuotesWonSwitchSheet";
import QuoteWonOrLostView from "~root/Components/QuoteWonOrLostView";
import ReadMoreTextView from "~root/Components/ReadMoreTextView";
import { EnumQuoteType, useQuoteWonOrLostStatus } from "~root/Lib/QuoteHelper";
import { quotesLostText, quotesWonText } from "~root/Lib/StringHelper";
import { useAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { Fonts } from "~root/Themes";
import { SheetState } from "../BottomSheet/BottomSheet";
import { FeatureKeys } from "../FeatureToggle";
import { useFeatureToggleChangeNotifier } from "../FeatureToggle/FeatureToggle";
import styles from "./QuotesInfoStyle";

export enum EnumQuotesStatusType {
  Pending,
  Won,
  Lost,
}

const QuotesInfo = () => {
  const { quoteDetails, isLoading } = useSelector((state: RootState) => ({
    quoteDetails: state.quotes.quotesListDetails,
    isLoading: state.quotes.fetching,
  }));
  const [editJobSheet, setEditJobSheet] = React.useState(SheetState.CLOSED);
  const isQuoteWonOrLost = useQuoteWonOrLostStatus();
  useFeatureToggleChangeNotifier(FeatureKeys.QuotesSelector, () => setEditJobSheet(SheetState.CLOSED));

  const [statusSheet, setStatusSheet] = React.useState(SheetState.CLOSED);
  const { append } = useAppender();
  React.useEffect(() => {
    append(
      <QuotesWonSwitchSheet
        sheetState={statusSheet}
        sheetCloseTapped={() => {
          setStatusSheet(SheetState.CLOSED);
          setSelectedType(EnumQuotesStatusType.Pending);
          setSegmentValue("Pending");
        }}
        jobStatus={selected}
      />,
      "QuotesWonSwitchSheet",
      0,
    );
  }, [statusSheet, setStatusSheet]);

  const [selected, setSelectedType] = useState(EnumQuotesStatusType.Pending);
  const [segmentValue, setSegmentValue] = useState("Pending");
  const segmentArray = ["Pending", "Won", "Lost"];

  const segmentOnPress = useCallback((value: string) => {
    setSegmentValue(value);
    if (value === "Pending") {
      setSelectedType(EnumQuotesStatusType.Pending);
    } else if (value === "Won") {
      setStatusSheet(SheetState.EXPANDED);
      setSelectedType(EnumQuotesStatusType.Won);
    } else if (value === "Lost") {
      setStatusSheet(SheetState.EXPANDED);
      setSelectedType(EnumQuotesStatusType.Lost);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={Fonts.style.openSans24Bold}>{quoteDetails?.jobName}</Text>
      <Text
        style={
          quoteDetails?.status !== "PENDING" && !isLoading
            ? styles.addressWithOutStatus
            : [styles.address, isQuoteWonOrLost ? { marginBottom: 13 } : { marginBottom: 24 }]
        }
      >
        {quoteDetails?.jobAddress?.formattedAddress}
      </Text>
      {quoteDetails?.status === "PENDING" && !isLoading && (
        <HeaderSegment values={segmentArray} selected={segmentValue} style={styles.segmentStyle} onSelected={segmentOnPress} />
      )}
      <QuoteWonOrLostView isLoading={isLoading} isWonOrLost={isQuoteWonOrLost}>
        <View style={styles.infoTextContainer}>
          <View style={styles.btnViewStatus}>
            <Text style={styles.btnText}>
              {((quoteDetails?.status?.includes(EnumQuoteType.Won) || quoteDetails?.status?.includes(EnumQuoteType.Integrated)) && "Won") ||
                (quoteDetails?.status?.includes(EnumQuoteType.Lost) && "Lost")}
            </Text>
          </View>
          <CustomIcon name={"info"} style={styles.infoIcon} />
          <Text style={styles.infoText}>
            {((quoteDetails?.status?.includes(EnumQuoteType.Won) || quoteDetails?.status?.includes(EnumQuoteType.Integrated)) && quotesWonText) ||
              (quoteDetails?.status?.includes(EnumQuoteType.Lost) && quotesLostText)}
          </Text>
        </View>
      </QuoteWonOrLostView>
      <View style={styles.infoItem}>
        <Text style={styles.infoLabel}>{"Date Created:"}</Text>
        <Text style={Fonts.style.openSans16Bold}>{moment(quoteDetails?.creationTime).format("DD/MM/YYYY")}</Text>
      </View>
      <View style={styles.divider} />
      {!!quoteDetails?.notes && <ReadMoreTextView text={quoteDetails?.notes} heading={"Notes"} />}
      {!!quoteDetails?.scopeOfWork && <ReadMoreTextView text={quoteDetails?.scopeOfWork} heading={"Scope of work"} />}
      <QuoteWonOrLostView isLoading={isLoading} isWonOrLost={!isQuoteWonOrLost}>
        <EditJobDetails
          editJobSheet={editJobSheet}
          onConfirmEdit={() => setEditJobSheet(SheetState.EXPANDED)}
          sheetCloseTapped={() => setEditJobSheet(SheetState.CLOSED)}
        />
      </QuoteWonOrLostView>
    </View>
  );
};
export default QuotesInfo;
