import { Icon } from "native-base";
import React from "react";
import { Text, TouchableOpacity, View, ViewProps } from "react-native";
import colors from "~root/Themes/Colors";
import CustomIcon from "../CustomIcon";
import styles from "./QuoteMediaItemStyle";

interface Props extends ViewProps {
  onPress?: () => void;
  renderError: boolean;
  errorType: ErrorType | undefined;
  mediaItem: any;
}

export enum ErrorType {
  UPLOAD_FAILURE,
  NAME_ALREADY_EXISTS,
  SIZE_ERROR,
  FILE_TYPE_NOT_SUPPORTED,
}

const QuoteMediaItemError: React.FC<Props> = ({ mediaItem, errorType, onPress, renderError }: Props) => {
  const getIconName = React.useCallback(() => {
    switch (errorType) {
      case ErrorType.FILE_TYPE_NOT_SUPPORTED:
        return "clear";
      case ErrorType.NAME_ALREADY_EXISTS:
        return "alert-icon";
      case ErrorType.SIZE_ERROR:
        return "file-error";
      default:
        return "";
    }
  }, [mediaItem, errorType]);

  const getErrorMsg = React.useCallback(() => {
    switch (errorType) {
      case ErrorType.UPLOAD_FAILURE:
        return "Upload Failed";
      case ErrorType.NAME_ALREADY_EXISTS:
        return "File name already exists. Unable to upload " + mediaItem.name;
      case ErrorType.SIZE_ERROR:
        return "Unable to upload files greater than 20MB";
      case ErrorType.FILE_TYPE_NOT_SUPPORTED:
        return "The file '" + mediaItem.name + "' is not a supported extension.";
      default:
        return "";
    }
  }, [mediaItem, errorType]);

  const getButtonIcon = React.useCallback(() => {
    switch (errorType) {
      case ErrorType.FILE_TYPE_NOT_SUPPORTED:
      case ErrorType.NAME_ALREADY_EXISTS:
      case ErrorType.SIZE_ERROR:
        return "close";
      case ErrorType.UPLOAD_FAILURE:
        return "sync";
      default:
        return "";
    }
  }, [mediaItem, errorType]);
  return (
    <>
      {renderError && (
        <View style={[styles.uploadFailedContainer, errorType === ErrorType.NAME_ALREADY_EXISTS ? { borderColor: colors.ochre } : undefined]}>
          {errorType !== ErrorType.UPLOAD_FAILURE && <CustomIcon style={styles.infoIconStyle} name={getIconName()} />}
          <Text style={styles.sizeErrorText}>{getErrorMsg()}</Text>
          <TouchableOpacity style={styles.clearButton} onPress={onPress}>
            <Icon style={styles.clearIcon} type={errorType === ErrorType.UPLOAD_FAILURE ? "Octicons" : "FontAwsome"} name={getButtonIcon()} />
            <Text style={styles.clearText}>{errorType === ErrorType.UPLOAD_FAILURE ? "Retry" : "Clear"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default QuoteMediaItemError;
