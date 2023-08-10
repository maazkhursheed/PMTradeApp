import { Icon } from "native-base";
import * as React from "react";
import FastImage from "react-native-fast-image";
import CustomIcon from "~root/Components/CustomIcon";
import { Images } from "~root/Themes";
import CartExtended from "./CartExtended";
import FailureToast from "./FailureToast";
import GenericToast from "./GenericToast";
import styles from "./GenericToastComponentStyle";
import GreetingToast from "./GreetingToast";

interface OwnProps {
  internalStateText1?: any;
  internalStateText2?: any;
  toastType?: string;
  children?: any;
}

type Props = OwnProps;
const GenericToastComponent: React.FunctionComponent<Props> = ({ internalStateText1, internalStateText2, toastType, children }: Props) => {
  const getIconType = React.useCallback(() => {
    let type;
    switch (toastType) {
      case "cart":
        type = <CustomIcon name={"success"} style={styles.successToast} />;
        break;
      case "quoteSuccess":
        type = <CustomIcon name={"success"} style={styles.successToast} />;
        break;
      case "quoteFailure":
        type = <FastImage source={Images.closeIcon} style={styles.quoteFailureIcon} resizeMode={FastImage.resizeMode.contain} />;
        break;
      case "success":
        type = <CustomIcon name={"success"} style={styles.successToast} />;
        break;
      case "warning":
        type = <Icon type={"FontAwesome5"} name={"exclamation"} style={styles.warningToast} />;
        break;
      case "info":
        type = <CustomIcon name={"info"} style={styles.infoToast} />;
        break;
      case "error":
        type = <FastImage source={Images.closeIcon} style={styles.errorIcon} resizeMode={FastImage.resizeMode.contain} />;
        break;
      case "inputError":
        type = <CustomIcon name={"alert-icon"} style={styles.inputErrorIcon} />;
        break;
    }
    return type;
  }, [toastType]);

  const viewToastByType = () => {
    let type;
    switch (toastType) {
      case "cartExtended":
        type = <CartExtended children={children} internalStateText1={internalStateText1} />;
        break;
      case "greetings":
        type = <GreetingToast internalStateText1={internalStateText1} internalStateText2={internalStateText2} />;
        break;
      case "quoteFailure":
        type = <FailureToast internalStateText1={internalStateText1} toastType={toastType} getIconType={getIconType} />;
        break;
      case "cart":
      case "success":
      case "warning":
      case "quoteSuccess":
      case "info":
      case "error":
      case "inputError":
        // FIXME: This need to refactor as this no longer generic Toast.
        type = <GenericToast internalStateText1={internalStateText1} toastType={toastType} getIconType={getIconType} internalStateText2={internalStateText2} />;
        break;
    }
    return type;
  };
  return viewToastByType();
};

export default GenericToastComponent;
