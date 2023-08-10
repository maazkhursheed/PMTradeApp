import { Text } from "native-base";
import * as React from "react";
import { Platform, TextInput, TextInputProps, View, ViewStyle } from "react-native";
import SmallButton from "~root/Components/SmallButton";
import { isNilOrEmpty } from "~root/Lib/CommonHelper";
import { accessibility } from "~root/Lib/DataHelper";
import colors from "~root/Themes/Colors";
import Fonts from "~root/Themes/Fonts";
import styles from "./TextFieldStyles";

interface OwnProps {
  label?: string;
  errorMsg?: string;
  viewStyle?: ViewStyle;
  showSubmitButton?: boolean;
  textViewStyle?: ViewStyle;
  labelStyle?: ViewStyle;
  requiredText?: string;
  requiredLabelStyle?: ViewStyle;
  getReference?: (ref: any) => void;
}

interface State {
  hasFocus: boolean;
}

export type TextFieldProps = OwnProps & TextInputProps;

class TextField extends React.PureComponent<TextFieldProps, State> {
  public _root: any;

  constructor(props: TextFieldProps) {
    super(props);
    this.state = {
      hasFocus: false,
    };
  }

  public render() {
    const {
      viewStyle,
      showSubmitButton,
      children,
      errorMsg,
      style,
      onBlur,
      onFocus,
      label,
      textViewStyle,
      requiredLabelStyle,
      labelStyle,
      requiredText,
      getReference,
      ...remaining
    } = this.props;
    return (
      <View style={viewStyle}>
        {!!label && (
          <View style={styles.mainView}>
            <Text style={[styles.label, labelStyle]} {...accessibility("commonLabel")}>
              {`${label} `}
              {isNilOrEmpty(requiredText) ? undefined : <Text style={[styles.textStyle, requiredLabelStyle]}>{requiredText}</Text>}
            </Text>
            {showSubmitButton && this.state.hasFocus && Platform.OS === "ios" && <SmallButton btnText={"Done"} onPress={() => this._root.blur()} />}
          </View>
        )}
        <View style={[errorMsg ? styles.error : styles.textInput, styles.textParentStyle, this.props.textViewStyle]}>
          <TextInput
            ref={c => {
              this._root = c;
              if (getReference) {
                getReference(c);
              }
            }}
            style={[styles.commonText, style]}
            placeholderTextColor={colors.lightWedgeBlue}
            onFocus={e => {
              if (onFocus) {
                onFocus(e);
              }
              this.setState({ hasFocus: true });
            }}
            onBlur={e => {
              if (onBlur) {
                onBlur(e);
              }
              this.setState({ hasFocus: false });
            }}
            {...accessibility("commonInputText")}
            {...remaining}
          />
          {children}
        </View>
        {!!this.props.errorMsg && (
          <Text style={Fonts.style.smallRedCaptionHighlight} {...accessibility("commonErrorLabel")}>
            {errorMsg}
          </Text>
        )}
      </View>
    );
  }
}

export default TextField;
