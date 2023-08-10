import React from "react";
import { Text, View, ViewProps } from "react-native";
import ProgressBar from "react-native-animated-progress";
import FastImage from "react-native-fast-image";
import { useDispatch, useSelector } from "react-redux";
import CustomAlert from "~root/Components/CustomAlert/CustomAlert";
import SwitchComponent from "~root/Components/SwitchComponent";
import { MAX_QUOTE_SIZE_REACHED } from "~root/Lib/AlertsHelper";
import { getFileExtension, useIconNameHelper, useQuoteStatusChecker, useQuoteWonOrLostStatus } from "~root/Lib/QuoteHelper";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import { Colors } from "~root/Themes";
import colors from "~root/Themes/Colors";
import CustomIcon from "../CustomIcon";
import QuoteMediaItemError, { ErrorType } from "./QuoteMediaItemError";
import styles from "./QuoteMediaItemStyle";

interface Props extends ViewProps {
  mediaItem: any;
  isCurrentUploadItem?: boolean;
  onRetryUploadSuccess?: () => void;
  onClear?: (fileToRemove: any) => void;
}

const QuoteMediaItem: React.FC<Props> = ({ mediaItem, isCurrentUploadItem, onRetryUploadSuccess, onClear }: Props) => {
  const { quoteDetails } = useSelector((state: RootState) => ({
    quoteDetails: state.quotes.quotesListDetails,
  }));

  const [retryingUpload, setRetryingUpload] = React.useState(false);
  const [mediaSelected, setMediaSelected] = React.useState(mediaItem.mediaSelected);
  const [isUpdateFailed, setUpdateFailed] = React.useState(false);
  const [isSwitchChanged, setSwitchChanged] = React.useState(false);
  const [alertHeading, setAlertHeading] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertIconName, setAlertIconName] = React.useState("");
  React.useEffect(() => setMediaSelected(mediaItem.mediaSelected), [mediaItem.mediaSelected]);
  const dispatch = useDispatch();
  const isQuoteEditable = useQuoteStatusChecker();
  const isQuoteWonOrLost = useQuoteWonOrLostStatus();
  const updateQuoteMedia = React.useCallback(
    selection => {
      setSwitchChanged(() => true);
      isQuoteEditable(
        () => {
          if (mediaItem.quoteMediaPK) {
            setMediaSelected(() => selection);
            setTimeout(
              () =>
                dispatch(
                  QuotesActions.updateQuoteMedia(
                    {
                      quoteId: quoteDetails?.code,
                      quoteMediaPK: mediaItem.quoteMediaPK,
                      bodyParams: { mediaSelected: selection.toString() },
                    },
                    {
                      onSuccess: () => {
                        setSwitchChanged(false);
                      },
                      onFailure: response => {
                        setSwitchChanged(false);
                        setMediaSelected(mediaItem.mediaSelected);
                        setUpdateFailed(true);
                        if (response && response.errors[0].message === MAX_QUOTE_SIZE_REACHED) {
                          setAlertHeading("Maximum file size reached");
                          setAlertMessage(
                            "The item you have selected exceeds the maximum file size that can be included in your quote. \n\nTo include this item, you will need to toggle one or more selected items off.",
                          );
                          setAlertIconName("File-Info");
                        } else {
                          setAlertHeading("Oops, something went wrong.");
                          setAlertMessage("Please try again.");
                          setAlertIconName("alert-icon");
                        }
                      },
                    },
                  ),
                ),
              250,
            );
          }
        },
        () => setMediaSelected(mediaItem.mediaSelected),
      );
    },
    [mediaItem.mediaSelected, quoteDetails],
  );
  const onRetryPress = React.useCallback(() => {
    setRetryingUpload(true);
    dispatch(
      QuotesActions.uploadImageFileToQuote(
        {
          bodyParams: {
            file: {
              name: mediaItem.name,
              uri: mediaItem.uri,
              type: mediaItem.type,
            },
            quoteId: quoteDetails?.code,
          },
        },
        {
          onSuccess: () => {
            setRetryingUpload(false);
            if (onRetryUploadSuccess) {
              onRetryUploadSuccess();
            }
          },
          onFailure: () => {
            setRetryingUpload(false);
          },
        },
      ),
    );
  }, [quoteDetails?.code, mediaItem]);

  const iconName = useIconNameHelper(mediaItem);
  const getExtension = React.useCallback(() => getFileExtension(mediaItem.name).toLowerCase(), [mediaItem]);
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.imageName}>{mediaItem?.name}</Text>
      {(isCurrentUploadItem || retryingUpload || isSwitchChanged) && <ProgressBar indeterminate={true} backgroundColor={colors.lightBlue} />}
      {getExtension() === "jpg" || getExtension() === "jpeg" || getExtension() === "png" ? (
        <FastImage source={mediaItem.source} style={styles.imageStyle} resizeMode={"cover"} />
      ) : (
        <View style={styles.placeHolder}>
          <CustomIcon name={iconName} style={styles.iconStyle} />
        </View>
      )}

      <View style={[styles.imageFooter, { opacity: mediaItem.uploadFailure ? 0.3 : 1 }]}>
        <View style={[styles.rightContent, styles.switchContainer]}>
          <Text style={styles.includeText}>Include in Quote</Text>
          <SwitchComponent
            value={mediaSelected}
            onValueChange={updateQuoteMedia}
            disabled={isQuoteWonOrLost || isSwitchChanged}
            testID={mediaSelected ? "Include_Quote_Switch_On" : "Include_Quote_Switch_Off"}
          />
        </View>
      </View>

      <QuoteMediaItemError
        mediaItem={mediaItem}
        renderError={mediaItem.uploadFailure || mediaItem.nameAlreadyExists || mediaItem.sizeError || mediaItem.fileTypeNotSupported}
        errorType={
          mediaItem.fileTypeNotSupported
            ? ErrorType.FILE_TYPE_NOT_SUPPORTED
            : mediaItem.nameAlreadyExists
            ? ErrorType.NAME_ALREADY_EXISTS
            : mediaItem.sizeError
            ? ErrorType.SIZE_ERROR
            : mediaItem.uploadFailure
            ? ErrorType.UPLOAD_FAILURE
            : undefined
        }
        onPress={() => {
          if (mediaItem.uploadFailure) {
            onRetryPress();
          } else if (mediaItem.nameAlreadyExists || mediaItem.sizeError || mediaItem.fileTypeNotSupported) {
            onClear(mediaItem);
          }
        }}
      />

      <CustomAlert
        heading={alertHeading}
        msg={alertMessage}
        iconColor={Colors.blue}
        visible={isUpdateFailed}
        onClose={() => setUpdateFailed(false)}
        iconName={alertIconName}
        button2Text="Continue"
        onButton2Press={() => setUpdateFailed(false)}
      />
    </View>
  );
};

export default QuoteMediaItem;
