import React, { forwardRef, useImperativeHandle, useState } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector, PanGestureHandlerProperties } from "react-native-gesture-handler";
import Animated, { add, call, cond, eq, greaterOrEq, lessOrEq, set, useCode } from "react-native-reanimated";
import { timing, useValues } from "react-native-redash";
import styles from "./SwiperComponentStyle";

interface Props extends PanGestureHandlerProperties {
  onFullSwipe?: () => void;
  backView: React.ReactElement;
  disableFullSwipe?: boolean;
  backButtonWidth?: number;
  isSwipeDisabled?: boolean;
  onSwipeStart?: () => void;
}

const SwiperComponent: React.FC<Props> = forwardRef(
  ({ children, onSwipeStart, onFullSwipe, backButtonWidth = 100, backView, disableFullSwipe, isSwipeDisabled, ...props }, ref) => {
    const [viewWidth, setViewWidth] = useState(0);
    const [startPoint, onSwipe, swipeStart, translateXMain, onEndTranslate, onEnd] = useValues(0, 0, 0, 0, 0, 0);

    useImperativeHandle(ref, () => ({
      swipe: () => {
        onSwipe.setValue(1);
        // onEndTranslate.setValue(add(translateXMain, 0));
      },
    }));

    useCode(
      () => [
        cond(
          eq(onSwipe, 1),
          [
            set(translateXMain, timing({ from: translateXMain, to: 0 })),
            call([translateXMain], ([value]) => {
              if (value === 0) {
                onSwipe.setValue(0);
              }
            }),
          ],
          0,
        ),
        cond(
          eq(onEnd, 1),
          [
            cond(
              lessOrEq(onEndTranslate, -backButtonWidth - 80),
              [
                set(translateXMain, timing({ from: onEndTranslate, to: disableFullSwipe ? -backButtonWidth : -viewWidth })),
                call([translateXMain, swipeStart], ([value, swipeStartValue]) => {
                  if (swipeStartValue === 0) {
                    onSwipeStart?.();
                    swipeStart.setValue(1);
                  }

                  if (disableFullSwipe) {
                    if (value === -backButtonWidth) {
                      swipeStart.setValue(0);
                      onEnd.setValue(0);
                      onSwipe.setValue(0);
                    }
                  } else {
                    if (value === -viewWidth) {
                      swipeStart.setValue(0);
                      onEnd.setValue(0);
                      onSwipe.setValue(0);
                      if (onFullSwipe) {
                        onFullSwipe();
                      }
                    }
                  }
                }),
              ],
              [
                cond(
                  greaterOrEq(onEndTranslate, -backButtonWidth / 2),
                  [
                    set(translateXMain, timing({ from: onEndTranslate, to: 0 })),
                    call([translateXMain], ([value]) => {
                      if (value === 0) {
                        onEnd.setValue(0);
                      }
                    }),
                  ],
                  [
                    set(translateXMain, timing({ from: onEndTranslate, to: -backButtonWidth })),
                    call([translateXMain, swipeStart], ([value, swipeStartValue]) => {
                      if (swipeStartValue === 0) {
                        onSwipeStart?.();
                        swipeStart.setValue(1);
                      }

                      if (value === -backButtonWidth) {
                        swipeStart.setValue(0);
                        onEnd.setValue(0);
                      }
                    }),
                  ],
                  // cond(greaterThan(onEndTranslate, -backButtonWidth - 80), set(translateXMain, timing({ from: onEndTranslate, to: -backButtonWidth }))),
                ),
              ],
            ),
          ],
          // set(translateXMain, timing({ from: onEndTranslate, to: 0 })),
        ),
      ],
      [backButtonWidth, disableFullSwipe, onFullSwipe, onSwipeStart, viewWidth],
    );

    const gestureHandler = Gesture.Pan()
      .runOnJS(true)
      .activeOffsetX([-20, 20])
      .onStart(event => {
        startPoint.setValue(translateXMain);
        onEnd.setValue(0);
      })
      .onUpdate(event => {
        translateXMain.setValue(add(event.translationX, startPoint));
      })
      .onEnd(event => {
        onEnd.setValue(1);
        onEndTranslate.setValue(add(translateXMain, 0));
      });

    return (
      // @ts-ignore
      <View>
        {/* @ts-ignore*/}
        {isSwipeDisabled ? (
          children
        ) : (
          <>
            <GestureDetector {...props} minDeltaX={4} gesture={gestureHandler}>
              {/* @ts-ignore*/}
              <Animated.View style={{ transform: [{ translateX: translateXMain }] }} onLayout={event1 => setViewWidth(event1.nativeEvent.layout.width)}>
                {/* @ts-ignore*/}
                {children}
              </Animated.View>
            </GestureDetector>
            {/* @ts-ignore*/}
            <Animated.View
              style={[
                styles.animatedViewStyle,
                {
                  width: viewWidth,
                  transform: [
                    {
                      translateX: add(translateXMain, viewWidth),
                    },
                  ],
                },
              ]}
            >
              {viewWidth === 0 ? null : backView}
            </Animated.View>
          </>
        )}
        {/* @ts-ignore*/}
        <View style={styles.swipeRightToPopOneScreenEnabler} />
      </View>
    );
  },
);

export default SwiperComponent;
