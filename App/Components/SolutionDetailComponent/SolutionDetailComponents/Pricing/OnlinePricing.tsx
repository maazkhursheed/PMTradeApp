import * as React from "react";
import { Linking, Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const OnlinePricing: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      Did you know PlaceMakers' PriceIT online provides you with the search for products and retrieve prices and download price lists. This also allows you to
      build up an estimate for your customer. An easy way to access your price lists and save time by building your estimate and sending them to your customers
      directly.
    </Text>
    <View style={style.separator} />
    <Text
      style={style.textURLStyle}
      onPress={() => {
        Linking.openURL("https://placemakerstrade.co.nz/Account/LogOn");
      }}
      {...accessibility("loginPriceITURLLabel")}
    >
      {" "}
      Login in to PriceIT.
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(OnlinePricing);
