import { Button, Icon, Text } from "native-base";
import * as React from "react";
import { TextInput, TextInputProps, View, ViewStyle } from "react-native";
import { SearchBar } from "react-native-elements";
import CustomIcon from "~root/Components/CustomIcon";
import { accessibility } from "~root/Lib/DataHelper";
import colors from "~root/Themes/Colors";
import styles from "./SearchFieldStyles";

interface OwnProps {
  label?: string;
  viewStyle?: ViewStyle;
  onClosePress?: () => void;
  filterText?: string;
  isCustom?: boolean;
  inputContainerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  iconStyle?: ViewStyle;
}

export interface State {}

type Props = OwnProps & TextInputProps;

export default class SearchField extends React.Component<Props, State> {
  public textInput: any;

  constructor(props: Props) {
    super(props);
  }

  public removeText = () => {
    this.textInput.clear();
    if (this.props.onClosePress) {
      this.props.onClosePress();
    }
  };

  public render() {
    const { viewStyle, style, label, filterText, inputContainerStyle, inputStyle, iconStyle, ...remaining } = this.props;

    if (!this.props.isCustom) {
      return (
        <View style={[viewStyle]} {...accessibility("searchFieldView")}>
          {!!label && (
            <Text style={styles.label} {...accessibility("propsLabel")}>
              {label}
            </Text>
          )}
          <View style={styles.textInputView}>
            <TextInput
              ref={input => {
                this.textInput = input;
              }}
              style={[styles.textInput, style]}
              placeholderTextColor={colors.wedgeBlue}
              {...remaining}
              {...accessibility("propsText")}
            />
            {this.props.value.length !== 0 && (
              <Button transparent={true} style={styles.closeBtn} onPress={this.removeText} {...accessibility("searchBtn")}>
                <Icon style={styles.closeIcon} type={"MaterialIcons"} name={"cancel"} />
              </Button>
            )}
          </View>
        </View>
      );
    } else {
      return (
        <SearchBar
          ref={r => {
            this.textInput = r;
          }}
          searchIcon={
            <View {...accessibility("searchIcon")}>
              <CustomIcon
                style={[styles.closeIcon, this.props.iconStyle]}
                onPress={() => {
                  this.textInput.focus();
                }}
                name={"search"}
                {...accessibility("searchIcon")}
              />
            </View>
          }
          leftIconContainerStyle={styles.leftIconContainer}
          round={true}
          clearIcon={
            <View {...accessibility("clearSearchIcon")}>
              <CustomIcon style={[styles.closeIcon, this.props.iconStyle]} onPress={this.removeText} name={"clear"} {...accessibility("clearSearchIcon")} />
            </View>
          }
          placeholderTextColor={colors.darkerGrey}
          containerStyle={styles.containerStyle}
          inputContainerStyle={[styles.textInputCustom, styles.inputContainerStyle, this.props.inputContainerStyle]}
          inputStyle={[styles.inputStyle, this.props.inputStyle]}
          {...remaining}
          cancelButtonTitle={"Cancel"}
          returnKeyType={"search"}
        />
      );
    }
  }
}
