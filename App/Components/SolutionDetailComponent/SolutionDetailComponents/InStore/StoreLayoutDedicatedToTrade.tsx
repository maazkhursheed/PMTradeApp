import * as React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const StoreLayoutDedicatedToTrade: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      We know your time is valuable, that’s why we configure all our store layouts to be 100% optimised for the trade. With the most knowledgable staff, best
      drive thrus and under cover timber in NZ, dedicated trade counters to reduce time waiting in line, easy access to everything you need and ensuring we only
      stock the best trade products, PlaceMakers is the place to come
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(StoreLayoutDedicatedToTrade);
