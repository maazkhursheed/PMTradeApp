import * as React from "react";
import { Linking, Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const PlacemakersTradePortal: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      Sign up to
      <Text
        style={style.textURLStyle}
        onPress={() => {
          Linking.openURL("https://tradeportal.placemakers.co.nz/");
        }}
        {...accessibility("placeMakersTradePortalURLLabel")}
      >
        {" "}
        {"PlaceMakers Trade portal "}
      </Text>
      to access everything you need in one place. You will have access to PlaceMakers Invoices Online, all your invoice and statement information past and
      present. You will also have access to Under Construction Magazine, an easy to read online version of our bi-monthly magazine. You can also store your LBP
      points to make it easy when it comes to your license renewal. Another benefit of signing up to PlaceMakers Trade portal is PlaceMakers Plus, review your
      Plus points balances and check out our online shop.
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(PlacemakersTradePortal);
