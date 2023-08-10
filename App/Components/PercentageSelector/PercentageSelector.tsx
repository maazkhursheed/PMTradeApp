import React from "react";
import { TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native";
import UXCam from "react-native-ux-cam";
import { accessibility } from "~root/Lib/DataHelper";
import { getDigitsNumberLength, getFractionNumberLength } from "~root/Lib/ProductHelper";
import { Colors } from "~root/Themes";
import PercentageIcon from "./PercentageIcon";
import styles from "./PercentageSelectorStyles";

interface OwnProps extends TextInputProps {
  percentage?: string;
  onChange?: (quantity: string, fromIcon: boolean) => void;
  onRemove?: () => void;
  style?: TextStyle;
  containerStyle?: ViewStyle;
  isDisabled?: boolean;
}

type Props = OwnProps;

const PercentageSelector: React.FunctionComponent<Props> = ({ style, containerStyle, percentage = "0", isDisabled, onRemove, onChange, ...props }: Props) => {
  const [percentageValue, setPercentageValue] = React.useState(percentage);
  const [isInputFocused, setInputFocused] = React.useState(false);

  React.useEffect(() => {
    UXCam.setAutomaticScreenNameTagging(false);
  }, []);

  React.useEffect(() => {
    setPercentageValue(percentage || "0");
  }, [percentage]);

  const changePercentage = React.useCallback(
    (prct: string, fromIcon = false) => {
      if (isDisabled) {
        return;
      }
      prct = prct.replace("%", "");
      const isEmptyQuantity = prct.length === 0;
      const length = getDigitsNumberLength(prct);
      const prcntPrecision = getFractionNumberLength(prct);
      let isValidPercentage = true;

      if (Number(prct) < 0) {
        isValidPercentage = false;
      } else if (isNaN(Number(prct)) && !isEmptyQuantity) {
        isValidPercentage = false;
      } else if (Number(length) > 5 || prcntPrecision > 2) {
        isValidPercentage = false;
      }

      if (isValidPercentage || isEmptyQuantity) {
        setPercentageValue(prct);
        if (fromIcon) {
          onChange?.(prct, fromIcon);
        }
      }
    },
    [isDisabled, onChange],
  );

  return (
    <View style={styles.container}>
      <View style={[styles.view, containerStyle]}>
        <PercentageIcon onPress={qty => changePercentage(qty, true)} icon={"minus"} percentage={Number(percentageValue)} isDisabled={isDisabled} />
        <TextInput
          onChangeText={changePercentage}
          style={[styles.prcntText, style, { color: isDisabled ? Colors.lightGrey : Colors.black }]}
          value={isInputFocused ? percentageValue.toString() : percentageValue.toString() + "%"}
          keyboardType={"numeric"}
          returnKeyType="done"
          editable={!isDisabled}
          {...accessibility("percentageSelectorText")}
          {...props}
          onEndEditing={() => onChange?.(percentageValue, false)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          /*selection={{ start: percentageValue.length, end: percentageValue.length }}*/
        />

        <PercentageIcon onPress={qty => changePercentage(qty, true)} icon={"plus"} percentage={Number(percentageValue)} isDisabled={isDisabled} />
      </View>
    </View>
  );
};

export default PercentageSelector;
