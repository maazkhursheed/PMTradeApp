import * as React from "react";
import { Linking, Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const Flooring: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      PlaceMakers Flooring offers a wide selection of product, whether it’s for a rental property or a luxurious family home. From affordable laminate to
      premium waterproof flooring or tiles, PlaceMakers can offer our customers a range to suit their budget. New home builds can be easily quoted from the
      plans, as well as offering simple solutions for renovation customers. We have a range of floating floor options for both residential and commercial jobs.
      Speak with your local PlaceMakers team to find out the best flooring for your job. Our range is available to view online and in our{" "}
      <Text
        style={style.textURLStyle}
        onPress={() => {
          Linking.openURL("https://www.placemakers.co.nz/flooring-catalogue/");
        }}
        {...accessibility("flooringCatalogueURLLabel")}
      >
        Flooring catalogue
      </Text>
      .
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(Flooring);
