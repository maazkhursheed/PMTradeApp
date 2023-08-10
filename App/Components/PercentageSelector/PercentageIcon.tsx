import { Icon } from "native-base";
import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { interval } from "rxjs";
import { accessibility } from "~root/Lib/DataHelper";
import { getFractionNumberLength } from "~root/Lib/ProductHelper";
import { Colors } from "~root/Themes";
import style from "./PercentageSelectorStyles";

interface Props {
  onPress: (percentage: string) => void;
  percentage: number;
  icon: "plus" | "minus";
  isDisabled?: boolean;
}

export default class PercentageIcon extends React.PureComponent<Props> {
  private longPress$: any;

  public subscribe() {
    this.longPress$ = interval(400).subscribe(value => {
      const frLength = getFractionNumberLength(this.props.percentage);
      if (this.props.icon === "minus") {
        this.props.onPress((this.props.percentage - 5).toFixed(frLength));
      } else {
        this.props.onPress((this.props.percentage + 5).toFixed(frLength));
      }
    });
  }

  public unSubscribe() {
    if (this.longPress$) {
      this.longPress$.unsubscribe();
    }
  }

  public componentWillUnmount(): void {
    this.unSubscribe();
  }

  public lonPressTrigger = (event: any) => {
    this.subscribe();
  };

  public onPressOut = (event: any) => {
    this.unSubscribe();
  };

  public render() {
    const { icon } = this.props;
    return (
      <TouchableOpacity
        onLongPress={this.lonPressTrigger}
        onPressOut={this.onPressOut}
        onPress={this.onPress}
        {...accessibility("longPressTouchablePercentageIcon")}
      >
        <View>
          <Icon
            type={"AntDesign"}
            name={icon}
            style={[
              style.icon,
              {
                color: this.props.isDisabled ? Colors.lightGrey : this.props.icon === "minus" ? Colors.darkGrey : Colors.lightBlue,
              },
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  }
  private onPress = () => {
    const frLength = getFractionNumberLength(this.props.percentage);
    if (this.props.icon === "minus") {
      this.props.onPress((this.props.percentage - 1).toFixed(frLength));
    } else {
      this.props.onPress((this.props.percentage + 1).toFixed(frLength));
    }
  };
}
