import * as React from "react";
import { Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import colors from "~root/Themes/Colors";
import { occludeSensitiveView } from "../../../Lib/DataHelper";
import QuoteEmailItem from "../QuoteEmailItem/QuoteEmailItem";
import style from "./QuoteEmailSectionStyles";

interface OwnProps {
  emailSectionLabel: string;
  emails: any;
  onRemoveEmail: (index: number) => void;
  addEmail: (email: string) => void;
}

type Props = OwnProps;

const QuoteEmailSection: React.FunctionComponent<Props> = ({ emailSectionLabel, emails, onRemoveEmail, addEmail }: Props) => {
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef(undefined);

  const onInputRemove = React.useCallback(
    event => {
      if (event.nativeEvent.key === "Backspace") {
        if (inputValue.length > 0) {
          setInputValue(inputValue.substring(0, inputValue.length - 1));
        } else if (emails.length > 0) {
          onRemoveEmail(emails.length - 1);
        }
      }
    },
    [inputValue, emails.length, onRemoveEmail],
  );

  const onInput = React.useCallback(
    (text, isSubmitEvent?) => {
      if (text) {
        if (text.trim() !== "" && (text.slice(-1) === " " || text.slice(-1) === "," || isSubmitEvent)) {
          if (text.trim().length > 0) {
            addEmail(isSubmitEvent ? text : text.slice(0, -1));
            setInputValue("");
          }
        } else {
          if (text.length > inputValue.length) {
            setInputValue(text.trim());
          }
        }
      }
    },
    [inputValue, addEmail],
  );

  return (
    <View style={style.container}>
      <Text style={style.toLabel}>{emailSectionLabel}</Text>
      <TouchableWithoutFeedback
        onPress={() => {
          inputRef.current.focus();
        }}
      >
        <View ref={occludeSensitiveView} style={style.emailsContainerView}>
          {emails?.map((emailItem: any, index: number) => (
            <QuoteEmailItem key={emailItem} index={index} emailItem={emailItem} onRemoveEmail={onRemoveEmail} />
          ))}
          <TextInput
            ref={inputRef}
            autoCapitalize="none"
            autoCorrect={false}
            style={style.inputStyle}
            value={inputValue}
            selectionColor={colors.lightBlue}
            blurOnSubmit={false}
            onBlur={e => onInput(inputValue, true)}
            onSubmitEditing={e => onInput(e.nativeEvent.text, true)}
            onChangeText={onInput}
            onKeyPress={onInputRemove}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default QuoteEmailSection;
