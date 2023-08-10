import * as React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const FrameAndTruss: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      PlaceMakers Frame and Truss delivers you value for money and saves you time on assembly. We deliver your order right first time, on time! We also offer
      add on services like floor cassettes, Stud Lok screw and HianDri packers fitted to framing with the benefit of time saved on site. Nationally we consume
      over 122,000 cube of raw product
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(FrameAndTruss);
