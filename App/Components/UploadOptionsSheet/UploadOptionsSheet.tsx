import MultipleImagePicker from "@baronha/react-native-multiple-image-picker";
import { firebase } from "@react-native-firebase/analytics";
import { Button } from "native-base";
import * as React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import DocumentPicker from "react-native-document-picker";
import { CameraOptions, launchCamera } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import LoadingView from "~root/Components/LoadingView";
import { genericErrorMessage, imageTypeMessage, OKButton, showAlertMessage } from "~root/Lib/AlertsHelper";
import { getBranchTownRegion } from "~root/Lib/BranchHelper";
import { accessibility, getSelectedAccountId } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { onCameraPermission } from "~root/Lib/PermissionHelperLib";
import { showAlert } from "~root/Lib/StringHelper";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import { Metrics } from "~root/Themes";
import STCHeader from "../STCHeader/STCHeader";
import styles from "./UploadOptionsSheetStyles";

interface OwnProps {
  sheetState: SheetState;
  sheetCloseTapped: () => void;
  onStartUpload: (file: any, currentIndex: number) => void;
  onFileUploadComplete: (file: any) => void;
  onUploadEnd: () => void;
  onImageFileSelection: (totalSelected: number) => void;
}

type Props = OwnProps;

const UploadOptionsSheet: React.SFC<Props> = ({
  onImageFileSelection,
  sheetState,
  sheetCloseTapped,
  onStartUpload,
  onFileUploadComplete,
  onUploadEnd,
}: Props) => {
  const { quoteDetails, isLoading, selectedBranch, userId, account_Id } = useSelector((state: RootState) => ({
    quoteDetails: state.quotes.quotesListDetails,
    isLoading: state.quotes.fetching,
    selectedBranch: state.branchList.selectedBranch,
    userId: state.login?.tempToken?.idToken,
    account_Id: getSelectedAccountId(state),
  }));

  const [uploadCompleted, setUploadCompleted] = React.useState([]);
  const { dispatchAlert } = useCustomAlert();
  const dispatch = useDispatch();
  const closePressed = () => {
    sheetCloseTapped();
  };

  const sendQuoteAnalytics = React.useCallback((event: any, fileCount, imageCount) => {
    const params = {
      event,
      device_type: Platform.OS,
      userId: extractDigitalIdFromJWTPayload(decodeJWTToken(userId)) as string,
      accountId: account_Id,
      location: getBranchTownRegion(selectedBranch),
      quoteId: quoteDetails.code,
      file_count: fileCount,
      image_count: imageCount,
    };
    firebase.analytics().logEvent(event, params);
  }, []);

  const launchGallery = React.useCallback(async () => {
    sheetCloseTapped();
    const response = await MultipleImagePicker.openPicker({
      selectedAssets: [],
      mediaType: "image",
      maxSelectedAssets: 5,
      maximumMessage: "You have selected the maximum number of items that can be uploaded at a time.",
      maximumMessageTitle: "Upload limit reached",
      messageTitleButton: "Continue",
    });
    const filesToUpload = response.filter(
      responseItem => uploadCompleted.filter((uploadedItem: any) => responseItem.path?.includes(uploadedItem.uri)).length === 0,
    );
    onImageFileSelection(filesToUpload.length);
    let currentIndex = 0;

    const getFileToUpload = () => {
      if (currentIndex >= filesToUpload.length) {
        sendQuoteAnalytics("quote_file_upload", 0, filesToUpload.length);
        setUploadCompleted((completed: any) => completed.filter((completedFile: any) => completedFile.uploadFailure));
        onUploadEnd();
        return;
      }
      const file = filesToUpload[currentIndex];
      let fileUri = file.path;

      if (Platform.OS === "ios") {
        fileUri = file.path?.replace("file://", "");
      }
      return {
        name: file?.fileName ?? "",
        uri: fileUri ?? "",
        type: file.mime,
        size: file?.size,
      };
    };

    const onUploadComplete = (file: any) => {
      currentIndex++;
      onFileUploadComplete(file);
      startUpload(currentIndex, getFileToUpload(), onUploadComplete);
    };
    if (filesToUpload.length) {
      startUpload(currentIndex, getFileToUpload(), onUploadComplete);
    }
  }, [quoteDetails, sheetCloseTapped]);
  const launchCameraOption = React.useCallback(async () => {
    onCameraPermission()
      .then(() => {
        sheetCloseTapped();
        const options: CameraOptions = {
          mediaType: "photo",
        };

        launchCamera(options).then(response => {
          if (response && response?.assets) {
            const fileType = response?.assets[0]?.type;
            let fileUri = response?.assets[0]?.uri;
            if (Platform.OS === "ios") {
              fileUri = response?.assets[0]?.uri?.replace("file://", "");
            }
            if (fileType !== "image/jpg" && fileType !== "image/png" && fileType !== "image/jpeg") {
              showAlert(dispatchAlert, "", imageTypeMessage, OKButton);
              return;
            }
            const uploadFile = {
              name: response?.assets[0]?.fileName ?? "",
              uri: fileUri ?? "",
              type: fileType,
              size: response?.assets[0].fileSize,
            };
            onImageFileSelection(1);
            startUpload(0, uploadFile, (file: any) => {
              onFileUploadComplete(file);
              sendQuoteAnalytics("quote_file_upload", 0, 1);
              onUploadEnd();
            });
          }
        });
      })
      .catch(err => {
        sheetCloseTapped();
      });
  }, [quoteDetails, sheetCloseTapped]);

  const getFileType = (file: any) => {
    const ext = file.uri.split(".").pop();
    if (ext === "dwg") {
      return "image/x-dwg";
    } else if (ext === "csv") {
      return "text/csv";
    } else if (ext === "rtf") {
      return "application/rtf";
    } else if (ext === "pages") {
      return "application/vnd.apple.pages";
    } else if (ext === "numbers") {
      return "application/vnd.apple.numbers";
    } else if (ext === "key") {
      return "application/vnd.apple.keynote";
    } else if (ext === "msg") {
      return "application/vnd.ms-outlook";
    } else if (ext === "eml") {
      return "message/rfc822";
    }
    return file.type;
  };

  const launchFilePicker = React.useCallback(async () => {
    try {
      sheetCloseTapped();
      const response = await DocumentPicker.pick({
        type: DocumentPicker.types.allFiles,
        allowMultiSelection: true,
      });
      const filesToUpload = response.filter(
        responseItem => uploadCompleted.filter((uploadedItem: any) => responseItem.uri?.includes(uploadedItem.uri)).length === 0,
      );
      onImageFileSelection(filesToUpload.length);
      let currentIndex = 0;
      const getFileToUpload = () => {
        if (currentIndex >= filesToUpload.length) {
          sendQuoteAnalytics("quote_file_upload", filesToUpload.length, 0);
          setUploadCompleted((completed: any) => completed.filter((completedFile: any) => completedFile.uploadFailure));
          onUploadEnd();
          return;
        }
        const file = filesToUpload[currentIndex];
        let fileUri = file.uri;
        if (Platform.OS === "ios") {
          fileUri = file.uri?.replace("file://", "");
        }
        return {
          name: file?.name ?? "",
          size: file?.size,
          uri: fileUri ?? "",
          type: getFileType(file),
        };
      };

      const onUploadComplete = (file: any) => {
        currentIndex++;
        onFileUploadComplete(file);
        startUpload(currentIndex, getFileToUpload(), onUploadComplete);
      };
      if (filesToUpload.length) {
        startUpload(currentIndex, getFileToUpload(), onUploadComplete);
      }
    } catch (err) {
      sheetCloseTapped();
      if (!DocumentPicker.isCancel(err)) {
        showAlertMessage("", genericErrorMessage, dispatchAlert);
      }
    }
  }, [quoteDetails, sheetCloseTapped]);
  const startUpload = React.useCallback(
    (currentIndex: number, uploadFile: any, onUploadComplete?: (fileUploaded: any) => void) => {
      if (!uploadFile) {
        return;
      }
      onStartUpload(uploadFile, currentIndex);
      if (uploadFile?.size < 20052670) {
        dispatch(
          QuotesActions.uploadImageFileToQuote(
            {
              bodyParams: { file: uploadFile, quoteId: quoteDetails?.code },
            },
            {
              onSuccess: () => {
                const fileUploaded = { ...uploadFile, uploadFailure: false };
                setUploadCompleted((completedFiles: any) => [fileUploaded, ...completedFiles.filter((file: any) => file.uri !== uploadFile.uri)]);
                if (onUploadComplete) {
                  onUploadComplete(fileUploaded);
                }
              },
              onFailure: response => {
                let fileUploaded: any = undefined;
                if (response) {
                  if (response.errors && response.errors[0].message === "File Name already exists.") {
                    fileUploaded = { ...uploadFile, nameAlreadyExists: true };
                  } else if (response.status === 400) {
                    fileUploaded = { ...uploadFile, fileTypeNotSupported: true };
                  } else {
                    fileUploaded = { ...uploadFile, uploadFailure: true };
                  }
                } else {
                  fileUploaded = { ...uploadFile, uploadFailure: true };
                }

                setUploadCompleted((completedFiles: any) => [fileUploaded, ...completedFiles.filter((file: any) => file.uri !== uploadFile.uri)]);
                if (onUploadComplete) {
                  onUploadComplete(fileUploaded);
                }
              },
            },
          ),
        );
      } else if (uploadFile?.size >= 20052670) {
        const fileUploaded = { ...uploadFile, sizeError: true };
        setUploadCompleted((completedFiles: any) => [fileUploaded, ...completedFiles.filter((file: any) => file.uri !== uploadFile.uri)]);
        if (onUploadComplete) {
          onUploadComplete(fileUploaded);
        }
      }
    },
    [quoteDetails],
  );

  return (
    <>
      <BottomSheet
        openedSnapPoint={Platform.select({
          ios:
            Metrics.screenHeight > 900 ? Metrics.screenHeight * 0.35 : Metrics.screenHeight > 700 ? Metrics.screenHeight * 0.42 : Metrics.screenHeight * 0.55,
          android: Metrics.screenHeight > 700 ? Metrics.screenHeight * 0.35 : Metrics.screenHeight * 0.5,
        })}
        backAction={closePressed}
        content={
          <>
            <LoadingView style={styles.loadingView} isLoading={isLoading} hideViewOnLoading={false}>
              <STCHeader
                title={"Source"}
                titleStyle={styles.titleStyle}
                style={styles.headerStyle}
                leftItem={
                  <Button transparent={true} onPress={closePressed} {...accessibility("closeButton")}>
                    <Text style={styles.cancelStyle}>{"Close"}</Text>
                  </Button>
                }
              />
              <View style={styles.container}>
                <TouchableOpacity style={styles.buttonStyle} onPress={launchGallery}>
                  <Text style={styles.buttonText}>Photo Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle} onPress={launchCameraOption}>
                  <Text style={styles.buttonText}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle} onPress={launchFilePicker}>
                  <Text style={styles.buttonText}>Files</Text>
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

export default UploadOptionsSheet;
