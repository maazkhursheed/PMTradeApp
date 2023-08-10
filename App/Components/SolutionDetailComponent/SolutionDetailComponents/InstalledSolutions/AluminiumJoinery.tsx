import * as React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const AluminiumJoinery: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      PlaceMakers, in partnership with Altus, can offer a range of well-priced aluminium joinery suites to cover all home requirements in the residential and
      architectural space NOTE: This offer is not available in all regions.
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(AluminiumJoinery);
