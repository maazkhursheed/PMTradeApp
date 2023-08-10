import { useEffect, useState } from "react";
import { EmitterSubscription, Keyboard, Platform } from "react-native";

export const useKeyboard = (paramsObj?: any) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const handleKeyboardShow = e => {
      setKeyboardVisible(true);
      setKeyboardHeight(e.endCoordinates.height);
      if (paramsObj?.onKeyboardVisible) {
        paramsObj.onKeyboardVisible();
      }
    };
    const handleKeyboardHide = () => {
      setKeyboardVisible(false);
      setKeyboardHeight(0);
      if (paramsObj?.onKeyboardHidden) {
        paramsObj.onKeyboardHidden();
      }
    };

    let subscriptions: EmitterSubscription[];

    if (Platform.OS === "ios") {
      subscriptions = [Keyboard.addListener("keyboardWillShow", handleKeyboardShow), Keyboard.addListener("keyboardWillHide", handleKeyboardHide)];
    } else {
      subscriptions = [Keyboard.addListener("keyboardDidShow", handleKeyboardShow), Keyboard.addListener("keyboardDidHide", handleKeyboardHide)];
    }

    return () => {
      subscriptions.forEach(s => s.remove());
    };
  }, []);

  return { keyboardHeight, isKeyboardVisible };
};
