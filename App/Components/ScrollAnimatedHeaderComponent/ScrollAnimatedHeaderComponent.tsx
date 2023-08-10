import * as React from "react";
import { Animated, View } from "react-native";
import { connect } from "react-redux";
import { RootState } from "~root/Reducers";
import styles from "./ScrollAnimatedHeaderComponentStyle";

interface OwnProps {
  children: React.ReactElement;
  scrollY: Animated.Value;
  style?: any;
}

interface IStateProps {}

type Props = OwnProps & IStateProps;
const ScrollAnimatedHeaderComponent: React.FC<Props> = ({ children, scrollY, style }: Props) => {
  const [height, setHeight] = React.useState(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, height);
  const translateY = diffClamp.interpolate({
    inputRange: [0, height],
    outputRange: [0, -height],
  });
  return (
    <Animated.View style={[styles.container, style, { transform: [{ translateY }] }]}>
      <View onLayout={event => setHeight(event.nativeEvent.layout.height)}>{children}</View>
    </Animated.View>
  );
};

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(ScrollAnimatedHeaderComponent);
