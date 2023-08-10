import * as React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const Roofing: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      PlaceMakers Roofing offer a one-stop shop solution for all long-run roofing requirements. Nationally, we supply and install over 1000 roofs per year!
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(Roofing);
