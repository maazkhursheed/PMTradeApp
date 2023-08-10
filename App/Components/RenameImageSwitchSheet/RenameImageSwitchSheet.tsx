import { Button } from "native-base";
import * as R from "ramda";
import React, { useCallback, useRef, useState } from "react";
import { Keyboard, Text, TextInput, View } from "react-native";
import FastImage from "react-native-fast-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import CustomAlert from "~root/Components/CustomAlert/CustomAlert";
import CustomIcon from "~root/Components/CustomIcon";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { accessibility, tagScreenName } from "~root/Lib/DataHelper";
import { getFileExtension, useIconNameHelper } from "~root/Lib/QuoteHelper";
import { validateImageName } from "~root/Lib/StringHelper";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import { Colors } from "~root/Themes";
import styles from "./RenameImageSwitchSheetStyle";

interface OwnProps {
  sheetState: SheetState;
  sheetCloseTapped: () => void;
  data?: any;
}

type Props = OwnProps;

const RenameImageSwitchSheet: React.SFC<Props> = ({ sheetState, sheetCloseTapped, data }: Props) => {
  const { quoteDetails } = useSelector((state: RootState) => ({
    quoteDetails: state?.quotes?.quotesListDetails,
  }));
  const dispatch = useDispatch();
  const [imageName, setImageName] = React.useState("");
  const iconName = useIconNameHelper(data);
  const [error, setError] = useState(false);
  const [alreadyExistName, setAlreadyExistName] = useState("");
  const [validationError, setValidationError] = useState(false);
  const [showApiError, setShowApiError] = useState(false);
  const textInputRef = React.useRef(null);

  React.useEffect(() => {
    if (sheetState === SheetState.EXPANDED) {
      textInputRef.current?.focus();
    }
  }, [sheetState]);
  React.useEffect(() => {
    if (sheetState === SheetState.EXPANDED) {
      tagScreenName("Rename Image Screen");
    }
  }, [sheetState]);

  const closeSheet = React.useCallback(() => {
    Keyboard.dismiss();
    sheetCloseTapped();
    setError(false);
    setValidationError(false);
    onChangeTextInput("");
  }, [sheetState]);

  const isImage = React.useCallback(() => {
    const extension = getFileExtension(data?.name).toLowerCase();
    return extension === "jpg" || extension === "jpeg" || extension === "png";
  }, [data?.name]);

  const onChangeTextInput = useCallback(
    (text: any) => {
      setImageName(text);
      setValidationError(false);
      setError(false);

      if (text.length === 0 || validateImageName(text)) {
        setError(false);
        setValidationError(false);
      } else {
        setValidationError(true);
        setError(true);
        scrollRef?.current?.scrollToEnd();
      }

      if (text.length > 0 && text === alreadyExistName) {
        setError(true);
        scrollRef?.current?.scrollToEnd();
      } else {
        setError(false);
      }
    },
    [scrollRef?.current, alreadyExistName],
  );

  const renameSavePress = useCallback(() => {
    dispatch(
      QuotesActions.updateQuoteMedia(
        {
          quoteId: quoteDetails?.code,
          quoteMediaPK: data?.quoteMediaPK,
          bodyParams: { realFileName: imageName + "." + getFileExtension(data?.name) },
        },
        {
          onSuccess: () => {
            sheetCloseTapped();
            setImageName("");
            setError(false);
          },
          onFailure: reason => {
            if (R.path(["errors", "0", "type"], reason) === "PMFileNameError") {
              setError(true);
              setAlreadyExistName(imageName);
              scrollRef?.current?.scrollToEnd();
            } else {
              setShowApiError(true);
            }
          },
        },
      ),
    );
  }, [imageName, quoteDetails, data]);
  const scrollRef = useRef<KeyboardAwareScrollView>();
  return (
    <>
      <BottomSheet
        content={
          <>
            <STCHeader
              title={"Rename Image"}
              titleStyle={styles.titleStyle}
              style={[styles.headerStyle]}
              leftItem={
                <Button transparent={true} onPress={closeSheet} {...accessibility("leftItemBtn")}>
                  <Text style={styles.cancelStyle}>{"Cancel"}</Text>
                </Button>
              }
              rightItem={
                <Button
                  transparent={true}
                  onPress={renameSavePress}
                  {...accessibility("rightItemBtn")}
                  disabled={error || validationError || imageName.length === 0}
                >
                  <Text style={error || validationError || imageName.length === 0 ? styles.saveButtonInActiveStyle : styles.saveButtonActiveStyle}>
                    {"Save"}
                  </Text>
                </Button>
              }
            />
            <KeyboardAwareScrollView
              ref={scrollRef}
              enableOnAndroid={true}
              extraScrollHeight={(!!error && !!alreadyExistName) || validationError ? 100 : 30}
              style={styles.contentContainer}
            >
              <View>
                <Text style={styles.imageName}>{data?.name}</Text>

                {isImage() ? (
                  <FastImage source={data.source} style={styles.imageStyle} resizeMode={"cover"} />
                ) : (
                  <View style={styles.placeHolder}>
                    <CustomIcon name={iconName} style={styles.iconStyle} />
                  </View>
                )}
              </View>

              <View style={[styles.mainView, error && styles.errorView]}>
                <TextInput
                  value={imageName}
                  onChangeText={onChangeTextInput}
                  placeholder={`Rename the ${isImage() ? "image" : "file"}...`}
                  style={styles.textInput}
                  ref={textInputRef}
                />
              </View>
              <View style={{ minHeight: 80 }}>
                {!!error && !!alreadyExistName && <Text style={styles.errorMsg}>Name already exists for an item for this quote. Please use another name</Text>}
                {validationError && <Text style={styles.errorMsg}>{"A name can’t contain any of the following characters \\ / : * ? ” < > | "}</Text>}
              </View>
            </KeyboardAwareScrollView>
          </>
        }
        sheetState={sheetState}
        sheetStyle={styles.bottomSheetBackGround}
      />
      <CustomAlert
        iconColor={Colors.blue}
        heading={"Tools down, something went wrong"}
        msg={"Please try again"}
        visible={showApiError}
        button1Text={"OK"}
        onButton1Press={() => setShowApiError(false)}
      />
    </>
  );
};

export default RenameImageSwitchSheet;
