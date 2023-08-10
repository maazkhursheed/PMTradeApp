import { useNavigation } from "@react-navigation/native";
import { Button } from "native-base";
import React, { createRef } from "react";
import { FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import CustomIcon from "~root/Components/CustomIcon";
import { FeatureKeys, useFeatureToggleChangeNotifier } from "~root/Components/FeatureToggle/FeatureToggle";
import MainContainer from "~root/Components/MainContainer";
import QuoteMediaSectionFooter from "~root/Components/QuoteMediaSectionFooter/QuoteMediaSectionFooter";
import QuoteMediaSectionHeader from "~root/Components/QuoteMediaSectionHeader/QuoteMediaSectionHeader";
import SmallHeader from "~root/Components/SmallHeader";
import SwipeableQuoteMediaItem from "~root/Components/SwipeableQuoteMediaItem/SwipeableQuoteMediaItem";
import SwipeLeftToRemove from "~root/Components/SwipeLeftToRemove";
import UploadOptionsSheet from "~root/Components/UploadOptionsSheet/UploadOptionsSheet";
import AppConfig from "~root/Config/AppConfig";
import { SWIPE_LEFT_FOR_OPTIONS } from "~root/Lib/AlertsHelper";
import { useQuoteStatusChecker, useQuoteWonOrLostStatus } from "~root/Lib/QuoteHelper";
import { useAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import { IAlertCallbacks } from "../../Lib/AlertsHelper/index";
import styles from "./QuoteMediaContainerStyle";

export interface OwnProps {}

export interface DispatchProps {
  requestLabourCost: (payload: any, alertCallbacks: IAlertCallbacks) => void;
}

interface StateProps {
  isLoading: boolean;
  quoteId: any;
}

type Props = OwnProps & DispatchProps & StateProps;

const QuoteMediaContainer: React.SFC<Props> = ({}: Props) => {
  const [currentUpload, setCurrentUpload] = React.useState(undefined);
  const [currentIndex, setCurrentIndex] = React.useState(undefined);
  const [completedFiles, setCompletedFiles] = React.useState([]);
  const [totalSelected, setTotalSelected] = React.useState(0);
  const [uploadStarted, setUploadStarted] = React.useState(false);
  const [uploadEnded, setUploadEnded] = React.useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { quoteId, isLoading, quoteDetails, quoteMedia } = useSelector((state: RootState) => ({
    quoteId: state.quotes.quotesListDetails?.code,
    isLoading: state.quotes.fetching,
    quoteDetails: state.quotes.quotesListDetails,
    quoteMedia: state.quotes.quoteMedia?.quoteMedia,
  }));

  const callGetQuoteMediaAPI = React.useCallback(() => {
    dispatch(
      QuotesActions.getQuoteMedia(
        {
          params: { quoteId: quoteId },
        },
        {
          onSuccess: filterFailedUploads,
          onFailure: filterFailedUploads,
        },
      ),
    );
  }, [quoteId]);

  const filterFailedUploads = React.useCallback(() => {
    setCompletedFiles((files: any) => files.filter((file: any) => file.uploadFailure || file.sizeError || file.nameAlreadyExists || file.fileTypeNotSupported));
  }, [completedFiles]);

  const isQuoteEditable = useQuoteStatusChecker();
  const isQuoteWonOrLost = useQuoteWonOrLostStatus();
  const [sheetState, setSheetState] = React.useState(SheetState.CLOSED);
  const { append } = useAppender();
  const listRef = React.useRef<FlatList>(null);
  useFeatureToggleChangeNotifier(FeatureKeys.QuotesSelector, () => setSheetState(SheetState.CLOSED));
  React.useEffect(() => {
    append(
      <UploadOptionsSheet
        onImageFileSelection={(totalSelected: number) => setTotalSelected(totalSelected)}
        onStartUpload={(currentUpload: any, currentIndex: number) => {
          setCurrentIndex(() => currentIndex);
          setUploadStarted(() => true);
          setCurrentUpload(() => currentUpload);
          listRef?.current?.scrollToOffset({ animated: true, offset: 0 });
        }}
        onFileUploadComplete={(fileUploaded: any) => setCompletedFiles((files: any) => [fileUploaded, ...files])}
        onUploadEnd={() => {
          setUploadEnded(true);
          setUploadStarted(false);
          setCurrentUpload(undefined);
          callGetQuoteMediaAPI();
        }}
        sheetState={sheetState}
        sheetCloseTapped={() => setSheetState(SheetState.CLOSED)}
      />,
      "UploadOptionsSheet",
      0,
    );
  }, [sheetState]);

  const onPress = React.useCallback(() => isQuoteEditable(() => setSheetState(SheetState.OPENED)), [quoteDetails]);
  const onClear = (fileToRemove: any) => {
    setCompletedFiles(completedFiles.filter((completedFile: any) => completedFile.uri !== fileToRemove.uri));
  };
  const getData = React.useCallback(() => {
    let mediaData: any[] = [];
    if (currentUpload) {
      mediaData.push({
        isCurrentUploadItem: true,
        name: currentUpload.name,
        source: { uri: currentUpload.uri },
      });
    }
    completedFiles.forEach((file: any) => {
      mediaData.push({
        onRetryUploadSuccess: () => {
          setCompletedFiles(completedFiles.filter((fileToRemove: any) => file.uri !== fileToRemove.uri));
          callGetQuoteMediaAPI();
        },
        fileTypeNotSupported: file.fileTypeNotSupported,
        uploadFailure: file.uploadFailure,
        sizeError: file?.sizeError,
        nameAlreadyExists: file.nameAlreadyExists,
        name: file.name,
        source: { uri: file.uri },
        uri: file.uri,
        type: file.type,
      });
    });
    if (quoteMedia) {
      [...quoteMedia].reverse().map((quoteMediaItem: any) => {
        mediaData.push({
          name: quoteMediaItem.code,
          source: { uri: AppConfig.CCV2_ENDPOINT + quoteMediaItem.url },
          type: quoteMediaItem.mime,
          mediaSelected: quoteMediaItem.mediaSelected === "true",
          quoteMediaPK: quoteMediaItem.quoteMediaPK,
        });
      });
    }

    return mediaData;
  }, [currentUpload, completedFiles, quoteMedia]);
  const data = getData();
  return (
    <MainContainer style={styles.container}>
      <SmallHeader
        title={"Images & Files"}
        navigation={navigation}
        actionItem={
          <Button transparent={true} onPress={onPress} style={styles.rightItemStyle}>
            {!isQuoteWonOrLost && <CustomIcon style={styles.iconAdd} name={"add"} />}
          </Button>
        }
      />
      <FlatList
        ref={listRef}
        data={data}
        style={styles.listContainer}
        renderItem={({ item, index }: any) => {
          data[index].ref = createRef();
          return (
            <SwipeableQuoteMediaItem
              reset={() => {
                for (let i = 0; i < data.length; i++) {
                  if (i !== index) {
                    data[i].ref?.current?.collapse();
                  }
                }
              }}
              ref={data[index].ref}
              isCurrentUploadItem={item.isCurrentUploadItem}
              onRetryUploadSuccess={item.onRetryUploadSuccess}
              mediaItem={item}
              onClear={onClear}
            />
          );
        }}
        contentContainerStyle={[styles.contentContainer, { justifyContent: getData().length === 0 ? "center" : "flex-start" }]}
        ListEmptyComponent={
          <View style={styles.listEmptyView}>
            {uploadStarted || isLoading ? <View /> : <Text style={styles.listEmptyText}>No images or files uploaded yet</Text>}
          </View>
        }
        ListHeaderComponent={
          <QuoteMediaSectionHeader
            showSubHeader={getData().length > 0}
            onPress={onPress}
            uploadStarted={uploadStarted}
            uploadEnded={uploadEnded}
            totalSelected={totalSelected}
            currentUploadIndex={currentIndex + 1}
            numberOfFailedItems={completedFiles.filter((file: any) => file.uploadFailure).length}
          />
        }
        ListFooterComponent={
          data.length > 0 && !isQuoteWonOrLost ? (
            <View style={styles.footerContainer}>
              <SwipeLeftToRemove text={SWIPE_LEFT_FOR_OPTIONS} />
            </View>
          ) : null
        }
      />
      <QuoteMediaSectionFooter />
    </MainContainer>
  );
};

export default QuoteMediaContainer;
