import * as React from "react";
import { Linking, Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const UnderConstruction: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      Stay on top of your field with latest news, technology introduction, and useful articles. Keep your skills sharpen with our short quizzes. Each edition of
      our trade publication includes specific regulatory or industry articles where you can ‘Prove Your Know How’ by completing a short quiz. For ease of record
      keeping and as proof of learning, a coupon is included to collate your answers, and sign and date it. Grab a copy at your local branch.
    </Text>
    <View style={style.separator} />
    <Text
      style={style.textURLStyle}
      onPress={() => {
        Linking.openURL("https://underconstruction.placemakers.co.nz/");
      }}
      {...accessibility("underConstructionURLLabel")}
    >
      {" "}
      Under Construction Magazine
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(UnderConstruction);
