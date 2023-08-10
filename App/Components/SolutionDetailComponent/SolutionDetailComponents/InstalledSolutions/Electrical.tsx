import * as React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const Electrical: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      PlaceMakers have partnered with QC Electrics to offer a range of installed electrical solutions, competitively priced for residential installations. (not
      in commercial at this time).
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(Electrical);
