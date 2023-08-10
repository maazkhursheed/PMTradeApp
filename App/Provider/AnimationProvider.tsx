import React, { createContext, useContext } from "react";

export const AnimationContext = createContext<any>({
  eventHandler: event => {
    // Empty Block
  },
});

export const useAnimation = () => useContext(AnimationContext);

interface ContextParams {
  start: number;
  lastOffset: number;
  direction: "UP" | "DOWN";
}

export const AnimationProvider = ({ children }: any) => {
  // const scrollEvent = useSharedValue<NativeScrollEvent | undefined>(undefined);

  return <AnimationContext.Provider value={{}}>{children}</AnimationContext.Provider>;
};
