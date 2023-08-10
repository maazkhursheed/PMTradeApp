import * as React from "react";
import { Linking, Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const Wardrobes: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      PlaceMakers offers made to order wardrobe organisers and doors with a range of standard size and colour configurations, or designed specifically to meet
      your customer’s requirements. PlaceMakers can arrange for a measure, design and installation of the wardrobe to suit your customers’ needs and space. Send
      your customers to your local PlaceMakers branch for more details on how to order a customised wardrobe today. To know more visit
      <Text
        style={style.textURLStyle}
        onPress={() => {
          Linking.openURL("https://www.placemakers.co.nz/products/wardrobes/");
        }}
        {...accessibility("placeMakersWardrobesURLLabel")}
      >
        {" "}
        PlaceMakers Wardrobes
      </Text>{" "}
      on the website or contact your local store.
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(Wardrobes);
