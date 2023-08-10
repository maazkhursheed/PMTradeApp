import * as React from "react";
import { ViewProps } from "react-native";

interface Props extends ViewProps {
  isLoading: boolean;
  isWonOrLost: boolean;
  children?: any;
}

const QuoteWonOrLostView: React.SFC<Props> = ({ isLoading, isWonOrLost, children }: Props) => {
  if (!isLoading && isWonOrLost) {
    return children;
  } else {
    return null;
  }
};

export default QuoteWonOrLostView;
