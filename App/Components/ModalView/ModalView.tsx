import { Button } from "native-base";
import React from "react";
import { Modal, Text, TouchableHighlight, View } from "react-native";
import { accessibility } from "~root/Lib/DataHelper";
import { ModalButtons } from "~root/Types/ComponentTypes/ModalView";
import style from "./ModalViewStyle";

interface OwnProps {
  modalContent: React.ReactElement;
  title: string;
  buttons: ModalButtons[];
  close: () => void;
  visible: boolean;
}

type Props = OwnProps;

const ModalView: React.SFC<Props> = ({ modalContent, title, buttons, close, visible }: Props) => {
  const [show, setShow] = React.useState(visible);

  React.useEffect(() => {
    setShow(visible);
  }, [visible]);

  return (
    <Modal animationType="fade" transparent={true} onRequestClose={close} visible={show}>
      <TouchableHighlight style={style.modalView} onPress={close} {...accessibility("modalClose")}>
        <View style={style.modalContainer}>
          <View style={style.viewDetails}>
            <Text style={style.modalTitle} {...accessibility("headerTitleLabel")}>
              {title}
            </Text>
            {modalContent}
          </View>
          <View style={style.btnView}>
            {buttons.map(params => {
              return (
                <Button style={[style.btn, { backgroundColor: params.color }]} onPress={params.onPress} {...accessibility("modalViewBtn")}>
                  <Text style={[style.btnTxt, { textTransform: params.styleTextTransform }]}>{params.text}</Text>
                </Button>
              );
            })}
          </View>
        </View>
      </TouchableHighlight>
    </Modal>
  );
};
export default ModalView;
