import * as React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const PinkBattsInsulation: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>PlaceMakers have partnered with PinkFit® to offer an installed solution for Pink® Batts® and Polyester insulation.</Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(PinkBattsInsulation);
