import { Header, NativeBase, Text } from "native-base";
import React from "react";
import { View, ViewStyle } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import LargeButton from "~root/Components/LargeButton";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import { ConnectTradeActions } from "~root/Reducers/ConnectTradeReducers";
import { PermissionTypes } from "~root/Types/Permissions";
import styles from "./CommonHeaderStyles";

interface OwnProps {
  title: string;
  titleStyle?: any;
  onPress?: any;
  leftItem?: React.ReactElement;
  rightItem?: React.ReactElement;
  topItem?: React.ReactElement;
  visibleDropDown?: boolean;
  openOnLoad?: boolean;
  overrideOnPress?: () => void;
  headerStyle?: ViewStyle;
  style?: ViewStyle;
}

interface DispatchProps {
  requestTradeAccountList: () => void;
}

interface StateProps {
  selectedAccount: any;
}

interface State {
  sheetState: SheetState;
}

type Props = StateProps & DispatchProps & OwnProps & NativeBase.Header & NavigationScreenProps;

class CommonHeader extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sheetState: SheetState.CLOSED,
    };
  }

  public componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    if (this.props.onChange && this.props.selectedAccount.uid !== nextProps.selectedAccount.uid) {
      this.props.onChange();
    }
  }

  public footerButton = () => {
    return (
      <PermissionComponent {...accessibility("connectAccountFooter")} hideView={true} permissionTypes={[PermissionTypes.AccountOwner]}>
        <LargeButton
          onPress={() => {
            this.props.navigation.navigate("ConnectAccount");
          }}
          btnText={"Connect new account"}
          isFooter={true}
        />
      </PermissionComponent>
    );
  };

  public render() {
    const { openOnLoad, topItem, headerStyle, leftItem, rightItem, title, children, onPress, titleStyle, style, ...remaining } = this.props;

    return (
      <>
        <Header style={[styles.headerView, headerStyle]} {...remaining}>
          <View style={[styles.header, style]}>
            <View style={styles.leftRightItemView}>{leftItem}</View>
            <Text style={[styles.headerTitle, titleStyle]} {...accessibility("commonHeaderLabel")}>
              {title}
            </Text>
            <View style={styles.leftRightItemView}>{rightItem}</View>
          </View>
        </Header>
      </>
    );
  }

  public setSheetState = (sheetState: SheetState) => {
    this.setState({ sheetState });
  };
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  requestTradeAccountList: () => dispatch(ConnectTradeActions.requestTradeAccList()),
});
const mapStateToProps = (state: RootState): StateProps => ({
  selectedAccount: state.connectTrade?.selectedTradeAccount,
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(CommonHeader);
