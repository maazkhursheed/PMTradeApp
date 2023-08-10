import { Button } from "native-base";
import React from "react";
import { Modal, Text, TouchableHighlight, View } from "react-native";
import UXCam from "react-native-ux-cam";
import Divider from "~root/Components/Divider";
import { accessibility } from "~root/Lib/DataHelper";
import style from "./STCCancelModalStyle";

export interface Props {
  modalContent: React.ReactElement;
  title: string;
  close: () => void;
  visible: boolean;
  onPressCancel: () => void;
  onPressOK: () => void;
}

export interface State {
  show: boolean;
}

class STCCancelModal extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      show: props.visible,
    };
  }

  public componentDidMount(): void {
    UXCam.setAutomaticScreenNameTagging(false);
  }

  public componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    this.setState({
      show: nextProps.visible,
    });
  }

  public render() {
    return (
      <Modal animationType="fade" transparent={true} onRequestClose={this.props.close} visible={this.state.show}>
        <TouchableHighlight style={style.modalView} onPress={this.props.close}>
          <View style={style.modalContainer}>
            <View style={style.viewDetails}>
              <Text style={style.modalTitle} {...accessibility("headerTitleLabel")}>
                {this.props.title}
              </Text>
              <Text style={style.bodyText}>{this.props.modalContent}</Text>
            </View>
            <Divider style={style.dividerStyle} />
            <View style={style.btnView}>
              <Button style={[style.btn, style.btnYesBackgroundColor]} onPress={this.props.onPressOK} {...accessibility("okButton")}>
                <Text style={style.btnOKTxt}>Yes</Text>
              </Button>
              <Button style={[style.btn, style.btnNoBackgroundColor]} onPress={this.props.onPressCancel} {...accessibility("noButton")}>
                <Text style={style.btnCancelTxt}>No</Text>
              </Button>
            </View>
          </View>
        </TouchableHighlight>
      </Modal>
    );
  }
}

export default STCCancelModal;
