import { Header, NativeBase, Text } from "native-base";
import React from "react";
import { View, ViewStyle } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import { ConnectTradeActions } from "~root/Reducers/ConnectTradeReducers";
import styles from "./STCCommonHeaderStyles";

interface OwnProps {
  title: string;
  titleStyle?: any;
  onPress?: any;
  leftItem?: React.ReactElement;
  rightItem?: React.ReactElement;
  headerStyle?: ViewStyle;
  style?: ViewStyle;
}

interface DispatchProps {}

interface StateProps {}

interface State {}

type Props = StateProps & DispatchProps & OwnProps & NativeBase.Header;

class STCCommonHeader extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public render() {
    const { headerStyle, leftItem, rightItem, title, children, onPress, titleStyle, style, ...remaining } = this.props;

    return (
      <>
        <Header style={[styles.headerStyle, headerStyle]} {...remaining}>
          <View style={[styles.header, style]}>
            <View style={[styles.items, styles.viewMinWidth]}>{leftItem}</View>
            <Text style={[styles.headerTitle, titleStyle]} {...accessibility("commonHeaderLabel")}>
              {title}
            </Text>
            <View style={[styles.items, styles.viewMinWidth]}>{rightItem}</View>
          </View>
        </Header>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  requestTradeAccountList: () => dispatch(ConnectTradeActions.requestTradeAccList()),
});
const mapStateToProps = (state: RootState): StateProps => ({
  selectedAccount: state.stc.selectedTradeAccount,
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(STCCommonHeader);
