import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, View } from "native-base";
import * as React from "react";
import { useCallback, useState } from "react";
import { Keyboard, Platform, Pressable, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MainContainer from "~root/Components/MainContainer";
import SmallHeader from "~root/Components/SmallHeader";
import { isNilOrEmpty } from "~root/Lib/CommonHelper";
import { accessibility, occludeSensitiveView } from "~root/Lib/DataHelper";
import { useKeyboard } from "~root/Lib/KeyboardHelper";
import { ApplicationStyles, Colors } from "~root/Themes";
import styles from "./Styles";

const DEFAULT_TERMS = "Estimate only. Valid for 30 days from date of issue.  Freight and Supplier price increases will not be included.";

const TermsAndConditionsView = () => {
  const navigation = useNavigation();
  const bottomHeight = useBottomTabBarHeight();
  const route = useRoute();
  const textInputRef = React.useRef(null);
  const [value, setValue] = useState(isNilOrEmpty(route?.params?.value) ? !route?.params?.paymentTerm && DEFAULT_TERMS : route?.params?.value);

  const { keyboardHeight, isKeyboardVisible } = useKeyboard();
  const onSaveText = useCallback(() => {
    Keyboard.dismiss();
    navigation.goBack();
    route?.params?.setValueText(value);
  }, [value]);
  const companyDetails = route?.params?.companyDetails;

  const onChangeText = useCallback((text: string) => {
    setValue(text);
  }, []);

  React.useEffect(() => {
    setTimeout(() => textInputRef.current?.focus(), 800);
  }, []);

  const getCharacterLimitTextColor = React.useCallback(() => {
    const length = value?.length;
    return length === 0 ? Colors.darkGrey : length > 0 && length < 490 ? Colors.green : length > 489 ? Colors.red : undefined;
  }, [value]);

  return (
    <MainContainer>
      <SmallHeader
        onBackPress={() => {
          Keyboard.dismiss();
          navigation.goBack();
        }}
        navigation={navigation}
        style={ApplicationStyles.noShadow}
        title={route?.params?.title ?? ""}
        actionItem={
          !companyDetails && (
            <Pressable onPress={onSaveText}>
              <Text style={styles.textStyle}>Save</Text>
            </Pressable>
          )
        }
      />
      <KeyboardAwareScrollView
        ref={occludeSensitiveView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps={"handled"}
        extraScrollHeight={Platform.select({ android: 150, ios: 0 })}
      >
        <>
          <TextInput
            ref={textInputRef}
            multiline={true}
            onChangeText={onChangeText}
            value={value}
            style={styles.input}
            maxLength={500}
            {...accessibility("TermsAndConditionText")}
            editable={!companyDetails}
          />
        </>
      </KeyboardAwareScrollView>
      {!companyDetails && (
        <View
          style={[styles.characterLimitContainer, { bottom: Platform.select({ android: 0, ios: keyboardHeight - bottomHeight }) }]}
          accessible={false}
          testID={"characterLimit"}
          accessibilityLabel={"characterLimit"}
        >
          <Text
            style={[
              styles.characterLimit,
              {
                color: getCharacterLimitTextColor(),
              },
            ]}
            accessible={false}
            testID={"characterLimit"}
            accessibilityLabel={"characterLimit"}
          >
            {value.length}/500 characters
          </Text>
        </View>
      )}
    </MainContainer>
  );
};

export default TermsAndConditionsView;
