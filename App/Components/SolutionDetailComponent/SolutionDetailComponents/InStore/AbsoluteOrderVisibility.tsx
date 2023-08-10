import * as React from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const AbsoluteOrderVisibility: React.SFC<Props> = () => (
  <Text style={style.textStyle}>
    Did you know that you can see your order status at every step of the order. From picking to delivery, you can check the status of your orders through the
    app. Just go to the "Orders" tab in the app and see all your order details. We will also send you notifications if anything changes on your order so you
    know whats happening at all times.
  </Text>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(AbsoluteOrderVisibility);
