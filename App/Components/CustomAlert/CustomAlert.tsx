import * as React from "react";
import { Dispatch } from "react";
import { Modal, Text, TextProps, TouchableOpacity, View, ViewProps } from "react-native";
import CustomIcon from "~root/Components/CustomIcon";
import { Colors } from "~root/Themes";
import styles from "./CustomAlertStyle";

export interface CustomAlertProps {
  heading?: string;
  subHeading?: string;
  msg?: string;
  visible?: boolean;
  iconColor?: string;
  onButton2Press?: () => void;
  onButton1Press?: () => void;
  iconName?: string;
  button1Text?: string;
  button2Text?: string;
  iconStyle?: ViewProps;
  button1Style?: TextProps;
  button2Style?: TextProps;
  onClose?: () => void;
  button1Color?: any;
  SVGIcon?: any;
  homeBranch?: string;
  selectedBranch?: string;
  branchSwitchText?: string;
  branchSwitchTextSuffix?: string;
  // showIcon?:boolean
}

export const AlertContext = React.createContext<{ dispatchAlert?: Dispatch<CustomAlertProps> }>({});

export const useCustomAlert = () => React.useContext(AlertContext);

const CustomAlert: React.SFC<CustomAlertProps> = ({
  iconColor,
  iconStyle,
  iconName = "info",
  button1Text,
  button2Text,
  heading,
  msg,
  visible,
  button1Style,
  button2Style,
  onButton1Press,
  onButton2Press,
  onClose,
  button1Color,
  SVGIcon,
  subHeading,
  homeBranch,
  selectedBranch,
  branchSwitchText,
  branchSwitchTextSuffix,
}: // showIcon=true,
CustomAlertProps) => {
  return (
    <Modal animationType="fade" transparent={true} onRequestClose={onClose} visible={visible}>
      {visible && <View style={styles.semiTransparentView} />}
      {visible && (
        <View style={styles.container}>
          <View style={styles.contentView}>
            {SVGIcon ? (
              <SVGIcon alignSelf={"center"} />
            ) : (
              <CustomIcon style={[styles.icon, iconStyle, iconColor ? { color: iconColor } : {}]} name={iconName} />
            )}
            {heading ? (
              <Text style={[styles.heading, { marginTop: SVGIcon ? 10 : 20 }]}>
                {heading}
                {subHeading && (
                  <Text style={styles.subHeading}>
                    {`\n`}
                    {subHeading}
                  </Text>
                )}
              </Text>
            ) : (
              <></>
            )}
            {msg ? (
              <Text style={styles.warningMessage}>
                {msg}{" "}
                {branchSwitchText && (
                  <>
                    <Text style={styles.warningMessageBlack}>{selectedBranch}</Text>
                    <Text style={styles.warningMessage}>{branchSwitchText}</Text>
                    <Text style={styles.warningMessageBlack}>{homeBranch}</Text>
                    <Text style={styles.warningMessage}>{branchSwitchTextSuffix}</Text>
                  </>
                )}
              </Text>
            ) : (
              <></>
            )}
            {onButton1Press && button1Text && (
              <TouchableOpacity style={styles.button1Container} onPress={onButton1Press}>
                <Text style={[styles.button1, button1Style, { color: button1Color ? button1Color : Colors.red }]}>{button1Text}</Text>
              </TouchableOpacity>
            )}
            {onButton2Press && button2Text && (
              <TouchableOpacity style={styles.button2Container} onPress={onButton2Press}>
                <Text style={[styles.button2, button2Style]}>{button2Text}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </Modal>
  );
};

export default CustomAlert;
