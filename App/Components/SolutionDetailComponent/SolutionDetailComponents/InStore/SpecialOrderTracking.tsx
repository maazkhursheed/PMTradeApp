import * as React from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const SpecialOrderTracking: React.SFC<Props> = () => (
  <Text style={style.textStyle}>
    PlaceMakers making special orders easy - we will let you know when they arrive in store and where it is located with a text message. You can also see the
    order status live in our App
  </Text>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(SpecialOrderTracking);
