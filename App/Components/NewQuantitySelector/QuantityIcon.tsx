import { Icon } from "native-base";
import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { interval } from "rxjs";
import { accessibility } from "~root/Lib/DataHelper";
import { getFractionNumberLength } from "~root/Lib/ProductHelper";
import { Colors } from "~root/Themes";
import styles from "./NewQuantitySelectorStyles";

interface Props {
  onPress: (quantity: string) => void;
  quantity: number;
  icon: "plus" | "minus";
  isDisabled?: boolean;
  isIconHidden?: boolean;
  styleQuantityIcon?: any;
  quantityFontSize?: number;
}

export default class QuantityIcon extends React.PureComponent<Props> {
  private longPress$: any;

  public subscribe() {
    this.longPress$ = interval(400).subscribe(value => {
      const frLength = getFractionNumberLength(this.props.quantity);
      if (this.props.icon === "minus") {
        this.props.onPress((this.props.quantity - 5).toFixed(frLength));
      } else {
        this.props.onPress((this.props.quantity + 5).toFixed(frLength));
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
        {...accessibility("longPressTouchableQuantityIcon")}
        style={styles.iconContainer}
      >
        <View style={this.props.styleQuantityIcon ? this.props.styleQuantityIcon : { width: 28 }}>
          {!this.props.isIconHidden && (
            <Icon
              type={"AntDesign"}
              name={icon}
              style={[
                {
                  color: this.props.isDisabled ? Colors.lightGrey : this.props.icon === "minus" ? Colors.darkGrey : Colors.lightBlue,
                },
                this.props.quantityFontSize ? { fontSize: this.props.quantityFontSize } : undefined,
              ]}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  }
  private onPress = () => {
    const frLength = getFractionNumberLength(this.props.quantity);
    if (this.props.icon === "minus") {
      this.props.onPress((this.props.quantity - 1).toFixed(frLength));
    } else {
      this.props.onPress((this.props.quantity + 1).toFixed(frLength));
    }
  };
}
