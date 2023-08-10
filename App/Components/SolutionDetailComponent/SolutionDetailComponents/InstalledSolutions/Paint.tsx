import * as React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const Paint: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      PlaceMakers is a trade paint destination. The Taubmans range is the backbone of our paint offer and has been trade trusted in New Zealand since 1921. Ask
      in store for our improved trade price list and buy at true trade painter pricing.
      {"\n"}
      <Text style={style.textSubHeaderStyle}>
        {"\n"}
        TAUBMANS TRADEX
      </Text>
      {"\n"}
      For the trade and commercial applicator the offer is enhanced by the availability of the Tradex range which is used and endorsed by New Zealand Master
      Painters Association. Prep coats featuring numerous undercoats and primers means you will always have the right product available for the job. Quality and
      value are the core elements of all Tradex products. Featuring: Easy Sand Sealer Undercoat, Acrylic Primer Undercoat, Freesand Sealer Undercoat, Limeblock,
      Pigmented Sealer, Oil Based Primer Undercoat, Satin Enamel, High Gloss Enamel, Satin Vinyl, Ceiling Flat, Ceiling Dead Flat
      {"\n"}
      <Text style={style.textSubHeaderStyle}>
        {"\n"}
        RESENE
      </Text>
      {"\n"}
      Purchase paint from Resene and charge it back to your PlaceMakers Trade Account. Some features include trade discounts and PlaceMakers Plus points. Just
      call PlaceMakers Telesales for an order number before you head to Resene. Contact your account manager for more information. Offer available to
      PlaceMakers trade account holders only. Standard PlaceMakers account terms and conditions apply. PlaceMakers Plus terms and conditions apply.
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(Paint);
