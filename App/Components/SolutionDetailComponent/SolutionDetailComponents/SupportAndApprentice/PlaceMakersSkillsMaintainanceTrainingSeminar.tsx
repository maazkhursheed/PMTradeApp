import * as React from "react";
import { Linking, Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const PlaceMakersSkillsMaintainanceTrainingSeminar: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      Licensed building practitioners and those who have applied for a licence from any licence-class (including sub-trades e.g. Brick & Block
      Layers/Roofers/Plasterers) can attend. Don’t have a licence yet? If you have applied for your licence or are still thinking about becoming licensed, you
      are still welcome to attend, however if you want to gain LBP skills maintenance points, you must hold a current licence.
    </Text>
    <View style={style.separator} />
    <Text
      style={style.textURLStyle}
      onPress={() => {
        Linking.openURL("https://www.placemakers.co.nz/trade/placemakers-skills-maintenance/");
      }}
      {...accessibility("placeMakersSkillTrainingURLLabel")}
    >
      {" "}
      PlaceMakers Skills Maintenance
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(PlaceMakersSkillsMaintainanceTrainingSeminar);
