import * as React from "react";
import { Linking, Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const PlaccemakersPlusRewardPoints: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      Here at PlaceMakers, we’re proud to be a trusted member of your team. So we’ve made doing business with us even more rewarding. PlaceMakers Plus is
      exclusively for trade account customers and recognises your loyalty at every level of spend with some truly beaut rewards, from incredible travel
      opportunities to fantastic lifestyle products. And the more business you put our way, the faster the rewards add up. You’ll earn one Plus Point for every
      dollar (excl. GST) you spend on your PlaceMakers trade account*. The more you spend, the more your Plus Points add up. Use your Plus Points to enjoy
      incredible travel opportunities and a huge range of leisure products in our online catalogue. You’ll also be entitled to discounts from our partners.
      <Text
        style={style.textURLStyle}
        onPress={() => {
          Linking.openURL("https://plus.placemakers.co.nz/");
        }}
        {...accessibility("joinPlaceMakersPlusURLLabel")}
      >
        {"  Join PlaceMakers Plus "}
      </Text>
      {"\n\n"}*
      <Text
        style={style.textURLStyle}
        onPress={() => {
          Linking.openURL("https://plus.placemakers.co.nz/terms-and-conditions");
        }}
        {...accessibility("termsAndConditionsURLLabel")}
      >
        {" Terms and conditions apply."}
      </Text>
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(PlaccemakersPlusRewardPoints);
