import * as React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const Foundations: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      PlaceMakers has created partnerships with the best local foundation providers to save you time, hassle and money in this important part of the build. See
      your local store for more details.
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(Foundations);
