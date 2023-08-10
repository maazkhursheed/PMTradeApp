import * as React from "react";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { View, ViewProps } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import CustomAlert from "~root/Components/CustomAlert/CustomAlert";
import QuoteMediaItem from "~root/Components/QuoteMediaItem/QuoteMediaItem";
import RenameImageSwitchSheet from "~root/Components/RenameImageSwitchSheet";
import EditButton from "~root/Components/SwiperComponent/EditButton";
import { useFileNameHelper, useQuoteStatusChecker, useQuoteWonOrLostStatus } from "~root/Lib/QuoteHelper";
import { useAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import SwiperComponent from "../SwiperComponent";
import RemoveButton from "../SwiperComponent/RemoveButton";
import styles from "./SwipeableQuoteMediaItemStyle";

interface Props extends ViewProps {
  mediaItem: any;
  isCurrentUploadItem?: boolean;
  onRetryUploadSuccess?: () => void;
  onClear?: (fileToRemove: any) => void;
  reset?: () => void;
}

const SwipeableQuoteMediaItem: React.FC<Props> = forwardRef(({ reset, mediaItem, isCurrentUploadItem, onRetryUploadSuccess, onClear }: Props, ref) => {
  useImperativeHandle(ref, () => ({
    collapse: () => itemRef?.current?.swipe(),
  }));
  const { quoteDetails } = useSelector((state: RootState) => ({
    quoteDetails: state.quotes.quotesListDetails,
  }));
  const dispatch = useDispatch();
  const itemRef = React.useRef<any>(undefined);
  const isQuoteEditable = useQuoteStatusChecker();
  const isQuoteWonOrLost = useQuoteWonOrLostStatus();
  const [isDeleting, setDeleting] = React.useState(false);
  const removeFunctionality = React.useCallback(() => {
    isQuoteEditable(
      () => {
        setDeleting(false);
        dispatch(
          QuotesActions.deleteQuoteMedia(
            { quoteId: quoteDetails?.code, quoteMediaPK: mediaItem.quoteMediaPK },
            {
              onSuccess: () => setDeleting(false),
              onFailure: () => setDeleting(false),
            },
          ),
        );
        itemRef?.current?.swipe();
      },
      () => {
        setDeleting(false);
        itemRef?.current?.swipe();
      },
    );
  }, [mediaItem, quoteDetails?.code, isQuoteEditable]);

  const fileName = useFileNameHelper(mediaItem);

  const [sheetState, setSheetState] = React.useState(SheetState.CLOSED);
  const { append } = useAppender();
  useEffect(() => {
    append(
      <RenameImageSwitchSheet sheetState={sheetState} sheetCloseTapped={() => setSheetState(SheetState.CLOSED)} data={mediaItem} />,
      "RenameOptionSheet",
      0,
    );
  }, [sheetState]);

  return mediaItem.quoteMediaPK ? (
    <SwiperComponent
      isSwipeDisabled={isQuoteWonOrLost}
      onSwipeStart={reset}
      ref={itemRef}
      backView={
        <View style={styles.swiperView}>
          <EditButton
            onPress={() => {
              itemRef?.current?.swipe();
              isQuoteEditable(() => {
                setSheetState(SheetState.EXPANDED);
              });
            }}
            label={"Rename"}
          />
          <RemoveButton
            text="Delete"
            onPress={() => {
              itemRef?.current?.swipe();
              isQuoteEditable(() => {
                setDeleting(true);
              });
            }}
          />
        </View>
      }
      disableFullSwipe={true}
      backButtonWidth={200}
    >
      <QuoteMediaItem isCurrentUploadItem={isCurrentUploadItem} onRetryUploadSuccess={onRetryUploadSuccess} mediaItem={mediaItem} onClear={onClear} />
      <CustomAlert
        heading={"Delete " + fileName + "?"}
        msg={"This will permanently delete " + fileName + " and remove it from the quote."}
        visible={isDeleting}
        onClose={() => setDeleting(false)}
        iconName="trash"
        button1Text="Delete"
        button2Text="Cancel"
        onButton1Press={removeFunctionality}
        onButton2Press={() => {
          setDeleting(false);
          itemRef?.current?.swipe();
        }}
      />
    </SwiperComponent>
  ) : (
    <QuoteMediaItem isCurrentUploadItem={isCurrentUploadItem} onRetryUploadSuccess={onRetryUploadSuccess} mediaItem={mediaItem} onClear={onClear} />
  );
});

export default SwipeableQuoteMediaItem;
