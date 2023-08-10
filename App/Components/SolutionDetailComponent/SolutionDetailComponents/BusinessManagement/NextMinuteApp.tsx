import * as React from "react";
import { Linking, Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const NextMinuteApp: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      Designed with tradies and field services in mind, the NextMinute App allows you to plan, schedule, communicate, track time, quote, order, monitor and
      invoice on the go, anytime, through your mobile, tablet or laptop. Checkout App below.
    </Text>
    <View style={style.separator} />
    <Text
      style={style.textURLStyle}
      onPress={() => {
        Linking.openURL("https://www.placemakers.co.nz/nextminute/");
      }}
      {...accessibility("nextMinuteURLLabel")}
    >
      {" "}
      NextMinute
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(NextMinuteApp);
