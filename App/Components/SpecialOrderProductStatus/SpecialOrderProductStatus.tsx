import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import CartGreenIcon from "~root/Images/cartGreen/CartGreenIcon.svg";
import { cancelBtnTxt, LEARN_MORE_BTN, PAYON_CALLBACK, SO_POPUP_MSG, SPECIAL_ORDER, SPECIAL_ORDER_SCREEN } from "~root/Lib/AlertsHelper";
import InfoIcon from "../../Images/SpecialOrderProductIcons/infoIcon.svg";
import InfoTextIcon from "../../Images/SpecialOrderProductIcons/infoTextIcon.svg";
import colors from "../../Themes/Colors";
import CustomIcon from "../CustomIcon";
import styles from "./SpecialOrderProductStyle";

interface OwnProps {
  isFromList: boolean;
  styleContainer?: ViewStyle;
  IconStyle?: ViewStyle;
  context: any;
}

type Props = OwnProps;

const SpecialOrderStatus: React.FC<Props> = ({ isFromList, styleContainer, context }) => {
  const { dispatchAlert } = useCustomAlert();
  const navigation = useNavigation();

  const openSpecialInfoPage = () => {
    context?.setIsApiRefresh(false);
    navigation.navigate(SPECIAL_ORDER_SCREEN);
    dispatchAlert?.({ visible: false });
  };

  const openModal = () => {
    dispatchAlert?.({
      visible: true,
      heading: SPECIAL_ORDER,
      subHeading: "(" + PAYON_CALLBACK + ")",
      msg: SO_POPUP_MSG,
      button1Text: LEARN_MORE_BTN,
      button2Text: cancelBtnTxt,
      onButton1Press: () => openSpecialInfoPage(),
      onButton2Press: () => dispatchAlert?.({ visible: false }),
      SVGIcon: CartGreenIcon,
      button1Color: colors.lightBlue,
    });
  };

  return (
    <View style={[styles.mainView, styleContainer]}>
      <CustomIcon name={"success"} color={colors.greenCheck} style={styles.iconStyle} />
      <Text style={styles.specialText}>Special Order </Text>
      {isFromList ? (
        <TouchableOpacity onPress={openModal}>
          <InfoTextIcon />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={openModal}>
          <InfoIcon />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SpecialOrderStatus;
