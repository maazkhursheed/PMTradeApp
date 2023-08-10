import * as React from "react";
import { BackHandler, Platform, View, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AnimatedBottomSheet from "reanimated-bottom-sheet";
import { Colors, Metrics } from "~root/Themes";
import styles from "./BottomSheetStyle";

export interface BottomSheetProps {
  content: React.ReactElement;
  sheetState: SheetState;
  openedSnapPoint?: number | string;
  sheetStyle?: ViewStyle;
  backAction?: () => void;
}

export enum SheetState {
  CLOSED,
  EXPANDED,
  OPENED,
}
const BottomSheet: React.SFC<BottomSheetProps> = ({ backAction, content, sheetState, openedSnapPoint, sheetStyle }: BottomSheetProps) => {
  const sheetRef = React.useRef(null);
  const [height, setHeight] = React.useState(0);
  const insets = useSafeAreaInsets();
  const snapToSheet = React.useCallback(
    (sheetState: SheetState) => {
      if (sheetRef?.current) {
        sheetRef.current.snapTo(sheetState);
      }
    },
    [sheetRef, sheetState],
  );

  React.useEffect(() => {
    if (sheetRef.current) {
      snapToSheet(sheetState);
    }
    if (sheetState === SheetState.CLOSED) {
      setTimeout(() => {
        setHeight(0);
      }, 400);
    } else {
      setHeight(Metrics.screenHeight);
    }
  }, [sheetState]);

  const renderInner = React.useCallback(
    () => (
      <View
        style={[
          {
            height: Metrics.screenHeight - insets.top,
            backgroundColor: Colors.white,
          },
          sheetStyle,
        ]}
      >
        {content}
      </View>
    ),
    [content],
  );

  React.useEffect(() => {
    if (Platform.OS === "android" && (sheetState === SheetState.OPENED || sheetState === SheetState.EXPANDED)) {
      const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
        backAction?.();
        return true;
      });

      return () => backHandler.remove();
    }
  }, [sheetState]);

  return (
    <Animated.View style={[styles.container, { height }]} pointerEvents={sheetState !== SheetState.CLOSED ? "auto" : "none"}>
      <AnimatedBottomSheet
        ref={sheetRef}
        accessible={false}
        snapPoints={openedSnapPoint ? [0, Metrics.screenHeight - insets.top, openedSnapPoint] : [0, Metrics.screenHeight - insets.top]}
        renderContent={renderInner}
        initialSnap={SheetState.CLOSED}
        enabledContentGestureInteraction={false}
        enabledHeaderGestureInteraction={false}
        borderRadius={20}
        springConfig={{
          mass: 1.1,
        }}
      />
    </Animated.View>
  );
};

export default BottomSheet;
