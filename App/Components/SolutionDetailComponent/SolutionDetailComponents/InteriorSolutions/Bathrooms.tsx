import * as React from "react";
import { Linking, Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const Bathrooms: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      PlaceMakers have the brands, styles, sizes and functions to suit your customer’s budget and personality. As well as our exclusive private labels, Raymor
      and Adesso, our comprehensive range of bathroomware includes many well known New Zealand trusted brands. We tirelessly work to ensure that all our
      products meet NZ Standards as well as our own exacting requirements. Get your customer to visit their local store for expert advice. Your customers and
      yourselves can also design a dream bathroom online with the PlaceMakers{" "}
      <Text
        style={style.textURLStyle}
        onPress={() => {
          Linking.openURL("https://www.placemakers.co.nz/design-planner");
        }}
        {...accessibility("bathroomDesignsPlannerURLLabel")}
      >
        Bathroom Design Planner
      </Text>
      .
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(Bathrooms);
