import { Button } from "native-base";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import LoadingView from "~root/Components/LoadingView";
import { accessibility } from "~root/Lib/DataHelper";
import { useQuoteStatusChecker } from "~root/Lib/QuoteHelper";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import STCHeader from "../STCHeader/STCHeader";
import styles from "./DeleteOptionsSheetStyle";

interface OwnProps {
  sheetState: SheetState;
  sheetCloseTapped: () => void;
  navigation: any;
  quoteStatusInProgress: boolean;
  quoteStatusInPending: boolean;
}

type Props = OwnProps;

const DeleteOptionsSheet: React.SFC<Props> = ({ sheetState, sheetCloseTapped, navigation, quoteStatusInPending, quoteStatusInProgress }: Props) => {
  const insets = useSafeAreaInsets();
  const isQuoteEditable = useQuoteStatusChecker();
  const { quoteName, quoteId } = useSelector((state: RootState) => ({
    quoteName: state.quotes.quotesListDetails?.jobName,
    quoteId: state.quotes.quotesListDetails?.code,
  }));

  const dispatch = useDispatch();
  const { dispatchAlert } = useCustomAlert();
  const [height, setHeight] = React.useState(0);
  const { isLoading } = useSelector((state: RootState) => ({
    isLoading: state.quotes.fetching,
  }));

  const removeFunctionality = React.useCallback(() => {
    dispatchAlert?.({ visible: false });
    dispatch(
      QuotesActions.deleteQuote(
        {
          quoteId,
        },
        {
          onSuccess: navigation.goBack,
          onFailure: () => {
            dispatchAlert?.({
              visible: true,
              heading: "Something went wrong",
              msg: "We couldn’t delete this quote, please try again",
              iconName: "delete-fail-large",
              button1Text: "OK",
              onButton1Press: () => dispatchAlert?.({ visible: false }),
            });
          },
        },
      ),
    );
  }, [quoteId]);

  return (
    <>
      <BottomSheet
        openedSnapPoint={height + insets.bottom + 50}
        content={
          <>
            <LoadingView onLayout={e => setHeight(e.nativeEvent.layout.height)} style={styles.loadingView} isLoading={isLoading} hideViewOnLoading={false}>
              <STCHeader
                title={"Options"}
                titleStyle={styles.titleStyle}
                leftItem={
                  <Button transparent={true} onPress={sheetCloseTapped} {...accessibility("closeButton")}>
                    <Text style={styles.cancelStyle}>{"Close"}</Text>
                  </Button>
                }
              />
              <View style={styles.container}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    sheetCloseTapped();
                    isQuoteEditable(() => {
                      dispatchAlert?.({
                        visible: true,
                        heading: "Delete this quote?",
                        msg: `This will permanently delete the quote ‘${quoteName}’.`,
                        iconName: "trash",
                        button1Text: "Delete",
                        button2Text: "Cancel",
                        onButton1Press: removeFunctionality,
                        onButton2Press: () => dispatchAlert?.({ visible: false }),
                      });
                    });
                  }}
                >
                  {quoteStatusInProgress ? <Text style={styles.buttonText}>Delete Quote</Text> : <Text style={styles.buttonTextEditQuote}>Edit Quote</Text>}
                </TouchableOpacity>
              </View>
            </LoadingView>
          </>
        }
        sheetState={sheetState}
      />
    </>
  );
};
export default DeleteOptionsSheet;
