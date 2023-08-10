import { useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "native-base";
import * as React from "react";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import DeleteOptionsSheet from "~root/Components/DeleteOptionSheet/DeleteOptionsSheet";
import FbIcon from "~root/Components/FbIcon";
import LoadingView from "~root/Components/LoadingView";
import MainContainer from "~root/Components/MainContainer";
import PrepareQuotes from "~root/Components/PrepareQuotes/PrepareQuotes";
import QuotesInfo from "~root/Components/QuotesInfo/QuotesInfo";
import QuotesSections from "~root/Components/QuotesSections/QuotesSections";
import QuotesSummary from "~root/Components/QuotesSummary/QuotesSummary";
import SmallHeader from "~root/Components/SmallHeader";
import { useQuoteInProgressStatus, useQuoteIsPending } from "~root/Lib/QuoteHelper";
import { useAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import { ApplicationStyles } from "~root/Themes";
import styles from "./QuotesDetailContainerStyle";

const QuotesDetailContainer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [sheetState, setSheetState] = React.useState(SheetState.CLOSED);
  const { append } = useAppender();

  const { loading, quoteDetails } = useSelector((state: RootState) => ({
    loading: state.quotes.fetching,
    quoteDetails: state.quotes.quotesListDetails,
  }));

  const callQuoteMediaApi = React.useCallback(() => {
    dispatch(
      QuotesActions.getQuoteMedia(
        {
          params: { quoteId: route.params?.navParam?.quoteCode },
        },
        {},
      ),
    );
  }, [route.params?.navParam]);

  const quoteStatusInProgress = useQuoteInProgressStatus();
  const quoteStatusInPending = useQuoteIsPending();

  React.useEffect(() => {
    dispatch(QuotesActions.requestQuotesListDetails(route.params?.navParam.quoteCode, {}));
    callQuoteMediaApi();
    return () => dispatch(QuotesActions.quotesListDetailsFailure({}));
  }, []);

  React.useEffect(() => {
    append(
      <DeleteOptionsSheet
        navigation={navigation}
        quoteStatusInProgress={quoteStatusInProgress}
        quoteStatusInPending={quoteStatusInPending}
        sheetState={sheetState}
        sheetCloseTapped={() => setSheetState(SheetState.CLOSED)}
      />,
      "DeleteOptionSheet",
      0,
    );
  }, [sheetState]);

  const openSheet = React.useCallback(() => setSheetState(SheetState.OPENED), []);

  return (
    <MainContainer>
      <SmallHeader
        navigation={navigation}
        style={ApplicationStyles.noShadow}
        actionItem={
          (quoteStatusInProgress || quoteStatusInPending) && (
            <Button transparent={true} onPress={openSheet} style={styles.moreIconStyle}>
              <FbIcon style={styles.icon} name={"ic_more"} />
            </Button>
          )
        }
        title={"Job Details"}
      />
      <LoadingView isLoading={loading || !quoteDetails} style={styles.quotesContainer}>
        {!!quoteDetails && (
          <>
            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
              <QuotesInfo />
              <QuotesSections />
              <QuotesSummary />
            </ScrollView>

            <PrepareQuotes />
          </>
        )}
      </LoadingView>
    </MainContainer>
  );
};

export default QuotesDetailContainer;
