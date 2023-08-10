import moment from "moment";
import { Text, View } from "native-base";
import * as React from "react";
import { useCallback, useState } from "react";
import { Platform } from "react-native";
import ActionSheet from "react-native-actionsheet";
import FastImage from "react-native-fast-image";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { CameraOptions, launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import LoadingView from "~root/Components/LoadingView";
import { imageTypeMessage, OKButton } from "~root/Lib/AlertsHelper";
import { onCameraPermission } from "~root/Lib/PermissionHelperLib";
import { showAlert } from "~root/Lib/StringHelper";
import { Images } from "~root/Themes";
import { occludeSensitiveView } from "../../Lib/DataHelper";
import styles from "./CompanyEditQuoteContainerStyles";
const OPTIONS = ["Photo Gallery", "Camera", "Cancel"];
interface OwnProps {
  setFilePath: (value: string) => void;
  filePath: string;
  setNewFileName: (value: string) => void;
  setNewFileType: (value: string) => void;
  showButton?: boolean;
}

const UploadContainer = ({ showButton, setFilePath, filePath, setNewFileName, setNewFileType }: OwnProps) => {
  const [loading, setLoading] = useState(false);
  const actionSheetRef = React.useRef();
  const { dispatchAlert } = useCustomAlert();
  const launchGalleryOption = useCallback(async () => {
    const options = {
      mediaType: "photo",
    };
    setLoading(true);
    const response = await launchImageLibrary(options);
    if (response && response?.assets) {
      setImage(response);
    }
    setLoading(false);
  }, []);

  const setImage = useCallback(
    (response: any) => {
      const fileType = response?.assets[0]?.type;
      if (fileType !== "image/jpg" && fileType !== "image/png" && fileType !== "image/jpeg") {
        showAlert(dispatchAlert, "", imageTypeMessage, OKButton);
        return;
      }
      let fileUri = response?.assets[0]?.uri;
      if (Platform.OS === "ios") {
        fileUri = response?.assets[0]?.uri?.replace("file://", "");
      }
      setFilePath(fileUri ?? "");
      setNewFileName(moment().format("dd-MM-YY-hh-mm").toString() + "-" + response?.assets[0]?.fileName ?? "");
      setNewFileType(fileType ?? "");
    },
    [setFilePath, setNewFileName, setNewFileType],
  );

  const launchCameraOption = useCallback(async () => {
    setLoading(true);

    onCameraPermission()
      .then(() => {
        const options: CameraOptions = {
          mediaType: "photo",
        };

        launchCamera(options).then(response => {
          if (response && response?.assets) {
            setImage(response);
          }
          setLoading(false);
        });
      })
      .catch(err => setLoading(false));
  }, []);

  return (
    <>
      <View style={styles.uploadParentView}>
        <TouchableWithoutFeedback style={styles.imageView} onPress={() => (showButton ? undefined : actionSheetRef?.current?.show())}>
          {showButton && <Text style={styles.label}>Company logo</Text>}
          <LoadingView ref={occludeSensitiveView} style={styles.imageContainer} isLoading={loading}>
            <FastImage ref={occludeSensitiveView} source={{ uri: !loading ? filePath : undefined }} style={styles.image} />
          </LoadingView>
          {!showButton && <Text style={[styles.label, styles.buttonHidden]}>Company logo</Text>}
        </TouchableWithoutFeedback>
        {showButton && (
          <View style={styles.uploadView}>
            <TouchableOpacity
              style={styles.buttonSendStyle}
              onPress={() => {
                actionSheetRef?.current?.show();
              }}
            >
              <FastImage source={Images.upload} style={styles.iconStyle} resizeMode={FastImage.resizeMode.cover} />
              <Text style={styles.buttonSendText}>Upload Image</Text>
            </TouchableOpacity>
            <Text style={styles.labelMaxSize}>Maximum size 100KB</Text>
          </View>
        )}
      </View>
      <ActionSheet
        ref={actionSheetRef}
        options={OPTIONS}
        cancelButtonIndex={2}
        onPress={(index: string | number) => {
          switch (OPTIONS[index]) {
            case "Photo Gallery":
              launchGalleryOption();
              break;
            case "Camera":
              launchCameraOption();
              break;
            case "Cancel":
              break;
          }
        }}
      />
    </>
  );
};

export default UploadContainer;
