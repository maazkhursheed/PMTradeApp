import * as React from "react";
import { Linking, Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const ApprenticeCrew: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      We know apprentice life is hard work, because every day throws a new lesson at you. So the team at PlaceMakers have put together a support crew especially
      for NZ building and construction apprentices: PlaceMakers Apprentice Crew (PAC). As a building and construction apprentice, you'll get access to heaps of
      perks PAC has lined up, like: freebies, discounts, giveaways, networking opportunities and much more. Plus, our Graduate Toolbox is filled with handy
      resources for apprentices who have done the hard yards. Explore our
    </Text>
    <View style={style.separator} />
    <Text
      style={style.textURLStyle}
      onPress={() => {
        Linking.openURL("https://pac.placemakers.co.nz/");
      }}
      {...accessibility("apprenticeCrewURLLabel")}
    >
      {" "}
      Apprentice Crew Program
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(ApprenticeCrew);
