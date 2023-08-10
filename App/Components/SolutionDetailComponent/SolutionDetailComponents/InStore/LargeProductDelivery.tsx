import * as React from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const LargeProductDelivery: React.SFC<Props> = () => (
  <Text style={style.textStyle}>
    Our experts in transport management team are always there to help you with large item deliveries. We can assess your site, offer crane services to unload
    products at your preferred location. No matter the size of delivery, we deliver accurately, in full and according to the agreement. Tell us your site
    contact name and number and we will confirm the order, let them know when the truck leaves and they can even track the vehicle live on their phone to ensure
    no delays on site! Ensure you get the right product, know where the order is at all stages and make date or product changes in our Trade App.
  </Text>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(LargeProductDelivery);
