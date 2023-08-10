import * as React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const FreeTrailerHire: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>Need to borrow a trailer? No problems, just pop into store and grab one today - best of all, its Free!</Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(FreeTrailerHire);
