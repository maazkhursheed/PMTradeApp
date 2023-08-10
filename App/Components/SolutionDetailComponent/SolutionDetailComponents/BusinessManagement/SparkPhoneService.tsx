import * as React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const SparkPhoneService: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      Get the best mobile phone and data deal in NZ through your PlaceMakers team. We will set you up and even put the bill on your trade account to make it
      easy for you
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(SparkPhoneService);
