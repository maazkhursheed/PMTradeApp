import * as React from "react";
import { Linking, Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { RootState } from "~root/Reducers";

interface OwnProps {
  branchPhone: string;
}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const InstalledSolutionsComponent: React.SFC<Props> = ({ branchPhone }: Props) => (
  <View>
    <Text style={style.textStyle}>
      PlaceMakers offer a huge range of installed solutions to save you time and money by taking all the hassle out of organising the jobs. You can be safe in
      the knowledge that we will always be there to back it up.
      {"\n"}
      <Text style={style.textSubHeaderStyle}>
        {"\n"}
        What we offer
      </Text>
      {"\n"}
      Frames are clearly marked and stacked in sequence (where ever possible), depending on load efficiency, site requirements and health and safety. Colour
      coded truss plans matched by truss coding for ease of placement on site. All site plans are weatherproof and sent with a PlaceMakers iconic builder’s
      pencil. Wall junctions are marked on plates. Galvanised nails to any H3.2 CCA walls. PlaceMakers can supply and fit the MiTek Bowmac STUD-LOK system at
      the plant to save you time and money fitting stud-straps on site. You’ll have ease of interior and exterior lining due to our consistent timber gauge. We
      only use stress graded, NZ grown timber from reputable suppliers. All trusses are supported by producer, design and manufacturing statements as required
      by NZS3604:11. We can provide technical support in detailing. We can take care of anything you need so call us to discuss how we can help.
    </Text>
    <View style={style.separator} />
    <Text
      style={style.textURLStyle}
      onPress={() => {
        Linking.openURL(`tel:${branchPhone}`);
      }}
    >
      {branchPhone}
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(InstalledSolutionsComponent);
