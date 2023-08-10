import { Button } from "native-base";
import React from "react";
import { Image, ImageBackground, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";
import EllipsesView from "~root/Components/EllipsesView/EllipsesView";
import { accessibility } from "~root/Lib/DataHelper";
import Images from "~root/Themes/Images";
import style from "./IntroductionScreenStyles";

export interface OwnProps {
  onScreenClick?: () => void;
  onSkipTextClick?: () => void;
  imageSrc: ImageSourcePropType;
  introText: string;
  ellipsesHighlight: number;
}

export interface State {
  imagePosition: any;
}

export type Props = OwnProps;

class IntroductionScreen extends React.Component<Props, State> {
  public constructor(props) {
    super(props);
    this.state = {
      imagePosition: 0,
    };
  }

  public onLayoutImage = e => {
    this.setState({ imagePosition: e.nativeEvent.layout.height - 95 });
  };

  public render() {
    return (
      <View style={style.container}>
        <TouchableOpacity activeOpacity={1} style={style.touchableStyle} onPress={this.props.onScreenClick} {...accessibility("introScreen")}>
          <ImageBackground style={style.backgroundImage} source={Images.background}>
            <Image
              resizeMode={"contain"}
              {...accessibility("onboardImage")}
              style={style.firstImage}
              source={this.props.imageSrc}
              onLayout={this.onLayoutImage}
            />
            <Text {...accessibility("introText")} style={[style.text, { top: this.state.imagePosition }]}>
              {this.props.introText}
            </Text>
            <EllipsesView
              styles={{
                position: "absolute",
                top: this.state.imagePosition + 100,
              }}
              number={this.props.ellipsesHighlight}
            />
            {this.props.onSkipTextClick && (
              <Button
                {...accessibility("skipIntroBtn")}
                transparent={true}
                onPress={this.props.onSkipTextClick}
                style={[style.skipBtn, { position: "absolute", top: this.state.imagePosition + 180 }]}
              >
                <Text {...accessibility("skipIntroductionText")} style={style.skipText}>
                  SKIP
                </Text>
              </Button>
            )}
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }
}

export default IntroductionScreen;
