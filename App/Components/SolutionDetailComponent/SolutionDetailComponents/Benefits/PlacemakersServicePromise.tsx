import * as React from "react";
import { Linking, Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const PlacemakersServicePromise: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>We promise and we stay true to it. Read our service promises to see how we support you and your business along the way.</Text>
    <View style={style.separator} />
    <Text
      style={style.textURLStyle}
      onPress={() => {
        Linking.openURL("https://www.placemakers.co.nz/trade/service-promise/");
      }}
      {...accessibility("placeMakersServicePromiseURLLabel")}
    >
      PlaceMakers Service Promise
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(PlacemakersServicePromise);
