import * as React from "react";
import { Linking, Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const LBPCompliance: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      PlaceMakers customers will be able to earn all their elective points (half the total number for LBPs under the new scheme)* required over a two-year
      period through PlaceMakers initiatives, such as reading our Under Construction Magazine and attending PlaceMakers Skills Maintenance seminars. We know
      it’s tough to keep up with all the paperwork required these days, so to give you a hand we’ve produced a triplicate Record of Work book with three copies
      of the memorandum forms for your job details – one for the homeowner, one for the council and one for you to keep. Each book holds up to 25 jobs with the
      colour coded forms. Pick one up at your local PlaceMakers branch today! Explore more at
    </Text>
    <View style={style.separator} />
    <Text
      style={style.textURLStyle}
      onPress={() => {
        Linking.openURL("https://www.placemakers.co.nz/trade/placemakers-skills-maintenance/");
      }}
      {...accessibility("supportPlaceMakersSkillURLLabel")}
    >
      {" "}
      PlaceMakers Skills Maintenance
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(LBPCompliance);
