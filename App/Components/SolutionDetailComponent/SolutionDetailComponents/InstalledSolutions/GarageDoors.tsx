import * as React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const GarageDoors: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      PlaceMakers have partnered with Garador to offer a fully installed Garage Door package. We bring our customers a national one-stop shop for quality garage
      doors and openers fully installed with a wide range of styles to choose from (entry level through to custom doors). Garador has a network of distributors
      throughout NZ – they are professional garage door installers.
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(GarageDoors);
