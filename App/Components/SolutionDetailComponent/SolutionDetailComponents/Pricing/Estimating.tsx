import * as React from "react";
import { Linking, Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const Estimating: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      Small project or product pricing is usually done instore. One of the local team will be more than happy to help work out what you need for the job and
      then work with you to produce a priced materials estimate.
      {"\n\n"}
      Full house, renovation and some commercial project quantification services are provided by our National Estimating Unit (NEU) Simply contact your local
      branch and one of our account managers will work with you to sort out the rest.
      {"\n\n"}
      NEU manages over 20,000 plans annually, providing a centralised hub for quantification and engineered designs they handle all your BOM, FnT and consent
      documentation needs. NEU staff come from a range of backgrounds and skills and include builders, architects, detailers, quantity surveyors and engineers.
      {"\n\n"}
      With the NEU we can provide all schedule and material estimates – from foundations to roofing, and everything in between. Yes, even the kitchen sink.
      {"\n\n"}
      <Text style={[style.textURLStyle]} onPress={() => Linking.openURL("https://www.placemakers.co.nz/store-finder/")}>
        Contact
      </Text>{" "}
      your local branch for more information.
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(Estimating);
