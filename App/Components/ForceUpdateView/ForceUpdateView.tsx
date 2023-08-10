import React from "react";
import { Image, Text, View } from "react-native";
import LargeButton from "~root/Components/LargeButton";
import MainContainer from "~root/Components/MainContainer";
import { Images } from "~root/Themes";
import style from "./ForceUpdateViewStyle";

export interface Props {
  title: string;
  message: string;
  visible: boolean;
  onUpdate: () => void;
}

export interface State {
  show: boolean;
}

class ForceUpdateView extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      show: props.visible,
    };
  }

  public componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    this.setState({
      show: nextProps.visible,
    });
  }

  public render() {
    return (
      <MainContainer>
        <View style={style.viewStyle}>
          <Image resizeMode={"contain"} source={Images.placemakerTradeLogo} />
          <Text style={style.title}>{this.props.title}</Text>
          <Text style={style.message}>{this.props.message}</Text>
          <LargeButton onPress={this.props.onUpdate} btnText={"Update now"} style={style.btnStyle} />
        </View>
      </MainContainer>
    );
  }
}

export default ForceUpdateView;
