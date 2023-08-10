import * as React from "react";
import LargeButton, { LargeButtonProps } from "~root/Components/LargeButton/LargeButton";
import styles from "./STCLargeButtonStyle";

interface Props {}

interface State {}

class STCLargeButton extends React.PureComponent<LargeButtonProps, State> {
  constructor(props: LargeButtonProps) {
    super(props);
  }

  public render() {
    const { style, textStyle, ...remaining } = this.props;
    return <LargeButton {...remaining} style={[styles.btnStyle, style]} textStyle={[styles.btnTextStyle, textStyle]} disabled={false} />;
  }
}

export default STCLargeButton;
