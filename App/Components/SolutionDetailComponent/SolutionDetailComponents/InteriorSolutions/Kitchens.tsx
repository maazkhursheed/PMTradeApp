import * as React from "react";
import { Linking, Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const Kitchens: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      If your customer is upgrading their existing kitchen or looking for design ideas for their new kitchen, PlaceMakers can help. We have a range of services
      and information available which can help your customers create their dream kitchen. We also offer great support to builders. Our kitchens are made in New
      Zealand, offer Hettich soft close drawers and cupboards and come with 15 year warranty on cabinetry. PlaceMakers offers in-store design support for
      builders and homeowners, just book an appointment with your local store and our designer will work with your requirements to produce a high quality
      design. Checkout our
      <Text
        style={style.textURLStyle}
        onPress={() => {
          Linking.openURL("https://www.placemakers.co.nz/products/kitchen/kitchen-range/");
        }}
        {...accessibility("kitchenRangesURLLabel")}
      >
        {" "}
        kitchen ranges
      </Text>
      .
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(Kitchens);
