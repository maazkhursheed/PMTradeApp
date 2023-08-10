import * as React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const EasyJobManagement: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      Do you want to ensure you get the correct price and see cost breakdown for all your material purchases by job? PlaceMakers has the answer - simply talk to
      the team about using job accounts and after each estimate has been accepted we will do the rest, all you need to do is tell us each time which job the
      product is for and you will get your monthly statement itemised by job so you can track your spend and easily invoice your client
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(EasyJobManagement);
