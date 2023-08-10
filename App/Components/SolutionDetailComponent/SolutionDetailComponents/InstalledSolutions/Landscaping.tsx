import * as React from "react";
import { Linking, Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const Landscaping: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      At PlaceMakers we are well equipped to turn landscaping dreams into reality. We have a comprehensive range of trade quality products and all the tools
      needed for the job. Give your customers a copy of our Landscaping Catalogue for inspiration and send them into store to view product samples.
      {"\n"}
      <Text style={{ fontWeight: "bold" }}>Our large selection of landscaping products include:</Text>
      {"\n\n"}• Decking – timber & engineered timber.{"\n"}• Paving – drycast, wetcast, natural stone (sandstone and granite) and permeable.{"\n"}• Fencing –
      timber, aluminium & glass.{"\n"}• Retaining – timber, concrete block & gabion.{"\n"}• Dricon® bagged premixed concretes.{"\n"}• Translucent roofing.{"\n"}
      • Watering & irrigation.{"\n"}• Artificial Turf.
      {"\n"}• Accessories – paints, stains & fastenings.{"\n\n"}
      View our{" "}
      <Text
        style={style.textURLStyle}
        onPress={() => {
          Linking.openURL("https://www.placemakers.co.nz/landscaping-catalogue/");
        }}
        {...accessibility("landscapingCatalogueURLLabel")}
      >
        landscaping catalogue
      </Text>{" "}
      for more.
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(Landscaping);
