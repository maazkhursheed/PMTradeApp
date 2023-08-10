import * as React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const HazardoMembership: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      Charge your annual Hazardco membership to your PlaceMakers trade account. Manage your safety on site everyday with HazardCo’s easy to use App. Get all the
      advice and support you could possibly need on the free 0800 customer service line. Recording your safety is simple – record your site reviews, toolbox
      meetings and site inductions on your smartphone as you do them.
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(HazardoMembership);
