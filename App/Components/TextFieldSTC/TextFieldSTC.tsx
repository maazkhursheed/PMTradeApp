import { Text } from "native-base";
import * as React from "react";
import { Platform, TextInput, TextInputProps, View, ViewStyle } from "react-native";
import UXCam from "react-native-ux-cam";
import FbIcon from "~root/Components/FbIcon";
import SmallButton from "~root/Components/SmallButton";
import { accessibility } from "~root/Lib/DataHelper";
import colors from "~root/Themes/Colors";
import Fonts from "~root/Themes/Fonts";
import styles from "./TextFieldSTCStyles";

interface OwnProps {
  label?: string;
  errorMsg?: string;
  viewStyle?: ViewStyle;
  showSubmitButton?: boolean;
  textViewStyle?: ViewStyle;
  isMandatory?: boolean;
  isDropDown?: boolean;
  dropIconStyle?: any;
}

interface State {
  hasFocus: boolean;
}

export type TextFieldProps = OwnProps & TextInputProps;

class TextFieldSTC extends React.PureComponent<TextFieldProps, State> {
  public _root: any;

  constructor(props: TextFieldProps) {
    super(props);
    this.state = {
      hasFocus: false,
    };
  }

  public componentDidMount() {
    UXCam.setAutomaticScreenNameTagging(false);
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
      isMandatory,
      dropIconStyle,
      isDropDown,
      ...remaining
    } = this.props;
    return (
      <View style={viewStyle}>
        {!!label && (
          <View style={styles.mainView}>
            <Text style={styles.label} {...accessibility("commonLabel")}>
              {label}
              {this.props.isMandatory ? <Text style={styles.textStyle}> *</Text> : undefined}
            </Text>
            {showSubmitButton && this.state.hasFocus && Platform.OS === "ios" && <SmallButton btnText={"Done"} onPress={() => this._root.blur()} />}
          </View>
        )}
        <View style={[errorMsg ? styles.error : styles.textInput, styles.textParentStyle, this.props.textViewStyle]}>
          <TextInput
            ref={c => (this._root = c)}
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
          {isDropDown && <FbIcon name={"ic_downarrow"} style={[styles.textFieldIcon, this.props.dropIconStyle]} />}
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

export default TextFieldSTC;
