import { both, complement, compose, lt } from "ramda";
import React from "react";
import { Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native";
import UXCam from "react-native-ux-cam";
import QuantityIcon from "~root/Components/NewQuantitySelector/QuantityIcon";
import { accessibility } from "~root/Lib/DataHelper";
import { getDigitsNumberLength, getDigitsUOM, getFractionNumberLength, getFractionUOM } from "~root/Lib/ProductHelper";
import { Colors } from "~root/Themes";
import styles from "./NewQuantitySelectorStyles";

interface OwnProps extends TextInputProps {
  quantity?: string;
  uom: string;
  isTimber?: boolean;
  onChange?: (quantity: string, fromIcon: boolean) => void;
  onRemove?: () => void;
  style?: TextStyle;
  styleQuantityIcon?: any;
  quantityFontSize?: number;
  containerStyle?: ViewStyle;
  isDisabled?: boolean;
  estimatedQuantity?: string;
  hidePlusMinusIcons?: boolean;
  isFromMyList?: boolean;
}

type Props = OwnProps;

const calculateIsEstimated = both(complement(isNaN), compose(lt(0), parseInt));

const NewQuantitySelector: React.FunctionComponent<Props> = ({
  style,
  isTimber,
  containerStyle,
  styleQuantityIcon,
  quantityFontSize,
  uom,
  quantity = "1",
  isDisabled,
  onRemove,
  onChange,
  estimatedQuantity = "",
  hidePlusMinusIcons,
  isFromMyList,
  ...props
}: Props) => {
  const [quantityValue, setQuantityValue] = React.useState(quantity);
  const [isEstimated, setIsEstimated] = React.useState(calculateIsEstimated(estimatedQuantity));

  React.useEffect(() => {
    UXCam.setAutomaticScreenNameTagging(false);
  }, []);

  React.useEffect(() => {
    setQuantityValue(quantity);
  }, [quantity]);

  React.useEffect(() => {
    setIsEstimated(calculateIsEstimated(estimatedQuantity));
  }, [estimatedQuantity]);

  const changeQuantity = React.useCallback(
    (qty: string, fromIcon = false) => {
      if (isDisabled) {
        return;
      }
      const isEmptyQuantity = qty.length === 0;
      const uomPrecision = isTimber ? 0 : getFractionUOM(uom);
      let uomDigits = getDigitsUOM(uom);
      if (uomDigits > 5 || !uom) {
        uomDigits = 5;
      }

      const qtyPrecision = getFractionNumberLength(qty);
      const qtyDigits = getDigitsNumberLength(qty);

      let isValidQuantity = true;

      if (Number(qty) < 0) {
        isValidQuantity = false;
      } else if (isNaN(Number(qty)) && !isEmptyQuantity) {
        isValidQuantity = false;
      } else if (isTimber) {
        if (qty.includes(".")) {
          isValidQuantity = false;
        }
        if (uomDigits > 0 && qtyDigits > uomDigits) {
          isValidQuantity = false;
        }
      } else {
        if (uomPrecision === 0 && qty.includes(".")) {
          isValidQuantity = false;
        }
        if (uomPrecision > 0 && qtyPrecision > uomPrecision) {
          isValidQuantity = false;
        }
        if (uomDigits > 0 && qtyDigits > uomDigits) {
          isValidQuantity = false;
        }
      }

      if (isValidQuantity || isEmptyQuantity) {
        setQuantityValue(qty);
        onChange?.(qty, fromIcon);
      }
    },
    [isDisabled, isTimber, uom, onChange],
  );

  return (
    <View style={styles.container}>
      {isEstimated && (
        <View style={styles.estimatedView}>
          <Text style={styles.estimatedTextView} {...accessibility("estimatedQuantity")}>{`${parseInt(estimatedQuantity, 10)} Estimated`}</Text>
        </View>
      )}
      <View style={[isEstimated ? styles.viewSubContainer : styles.view, containerStyle]}>
        <QuantityIcon
          styleQuantityIcon={styleQuantityIcon}
          quantityFontSize={quantityFontSize}
          isIconHidden={hidePlusMinusIcons}
          onPress={qty => changeQuantity(qty, true)}
          icon={"minus"}
          quantity={Number(quantityValue)}
          isDisabled={isDisabled}
        />
        <TextInput
          onChangeText={changeQuantity}
          style={[styles.qtyText, style, { color: isDisabled && !hidePlusMinusIcons ? Colors.lightGrey : Colors.black }]}
          value={isTimber && quantityValue.length > 0 ? parseInt(quantityValue).toString() : quantityValue}
          keyboardType={"numeric"}
          returnKeyType="done"
          editable={!isDisabled}
          {...accessibility("quantitySelectorText")}
          {...props}
        />
        <QuantityIcon
          styleQuantityIcon={quantityFontSize ? [styleQuantityIcon, { alignItems: "flex-start", paddingRight: isFromMyList ? 0 : 10 }] : styleQuantityIcon}
          quantityFontSize={quantityFontSize}
          isIconHidden={hidePlusMinusIcons}
          onPress={qty => changeQuantity(qty, true)}
          icon={"plus"}
          quantity={Number(quantityValue)}
          isDisabled={isDisabled}
        />
      </View>
    </View>
  );
};

export default NewQuantitySelector;
