import R from "ramda";
import React, { useRef, useState } from "react";
import { Text, ViewProps, ViewStyle } from "react-native";
import Animated, { Transition, Transitioning } from "react-native-reanimated";
import { Colors } from "~root/Themes";
import styles from "./HeaderSegmentStyles";

interface HeaderSegmentProps extends ViewProps {
  values: string[];
  selected: string;
  onSelected: (selected: string) => void;
  selectedButtonStyle?: ViewStyle;
  selectedButtonTextStyle?: ViewStyle;
  unSelectedTextStyle?: ViewStyle;
}
const HeaderSegment = ({
  values,
  selected,
  onSelected,
  style,
  selectedButtonStyle,
  selectedButtonTextStyle,
  unSelectedTextStyle,
  ...props
}: HeaderSegmentProps) => {
  const trans = useRef();
  const transation = (
    <Transition.Together>
      <Transition.Change />
    </Transition.Together>
  );
  const [height, setHeight] = useState(0);
  const [textLayout, setTextLayout] = useState({});

  return (
    <Transitioning.View
      transition={transation}
      ref={trans}
      onLayout={R.compose(setHeight, R.pathOr(0, ["nativeEvent", "layout", "height"]))}
      style={[styles.container, style]}
      {...props}
    >
      <Animated.View
        style={[
          styles.pillStyleContainer,
          { height: height - 2, width: textLayout[selected]?.width || 100, left: textLayout[selected]?.x },
          selectedButtonStyle,
        ]}
      />
      {values.map(val => (
        <Text
          suppressHighlighting={true}
          onPress={() => {
            trans.current.animateNextTransition();
            onSelected(val);
          }}
          key={val}
          onLayout={R.compose(setTextLayout, R.assoc(val, R.__, textLayout), R.path(["nativeEvent", "layout"]))}
          style={[
            { color: val === selected ? Colors.textLight : Colors.black },
            styles.textStyle,
            val === selected ? selectedButtonTextStyle : unSelectedTextStyle,
          ]}
        >
          {val}
        </Text>
      ))}
    </Transitioning.View>
  );
};

export default HeaderSegment;
