import React from "react";
import { Modal, TouchableHighlight, View } from "react-native";
import { accessibility } from "~root/Lib/DataHelper";
import style from "./ModalViewStyle";

interface OwnProps {
  visible: boolean;
  close: () => void;
  children: any;
}

type Props = OwnProps;

const CustomModalView: React.SFC<Props> = ({ visible, close, children }) => {
  const [show, setShow] = React.useState(visible);

  React.useEffect(() => {
    setShow(visible);
  }, [visible]);

  return (
    <Modal animationType="fade" transparent={true} visible={show}>
      <TouchableHighlight style={style.customModalView} onPress={close} {...accessibility("modalClose")}>
        <View style={style.childrenContainer}>{children}</View>
      </TouchableHighlight>
    </Modal>
  );
};
export default CustomModalView;
