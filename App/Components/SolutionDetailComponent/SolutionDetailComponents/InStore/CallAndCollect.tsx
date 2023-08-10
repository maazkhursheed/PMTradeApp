import * as React from "react";
import { Linking, Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";

interface OwnProps {
  branchPhone: string;
}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const CallAndCollect: React.SFC<Props> = ({ branchPhone }: Props) => (
  <View>
    <Text style={style.textStyle}>
      PlaceMakers make it easy for you to save time and money by having your order ready for you when you come in branch. Just call your main branch and order
      what you need. Once your order is ready, we send you a text with location in our store for you to come and collect. Call us now to place an courier order.
    </Text>
    <View style={style.separator} />
    <Text
      style={style.textURLStyle}
      onPress={() => {
        Linking.openURL(`tel:${branchPhone}`);
      }}
      {...accessibility("branchPhoneLabel")}
    >
      {branchPhone}
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(CallAndCollect);
