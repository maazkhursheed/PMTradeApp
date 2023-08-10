import * as React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const SiteServices: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      PlaceMakers provides a range of products and services that you can use on site. We have what you need to get your project started and to help you set up a
      safe working environment from bins to portable toilets, site fencing to containers for storage. Contact you branch for more details.
      {"\n"}
      <Text style={style.textSubHeaderStyle}>
        {"\n"}
        SAFETY & PERSONAL PROTECTION
      </Text>
      {"\n"}
      PlaceMakers have partnered with some of the market leading suppliers to bring you a full range of safety and protection solutions from PPE through to
      multi-level scaffolding.
      {"\n"}
      <Text style={style.textSubHeaderStyle}>
        {"\n"}
        Personal Protection Equipment (PPE)
      </Text>
      {"\n"}
      Personal safety is key, PlaceMakers can help you stay safe with our comprehensive PPE offer which includes everything from head, ear & hand protection to
      fall protection.
      {"\n"}
      <Text style={style.textSubHeaderStyle}>
        {"\n"}
        Mobile Scaffolding
        {"\n"}
      </Text>
      Full systems available to suit all applications, the options include mobile scaffolding platforms, quick assembly towers and low level working platforms
      with safety rails.
      {"\n"}
      <Text style={style.textSubHeaderStyle}>
        {"\n"}
        Installed Fall Protection Solutions
      </Text>
      {"\n"}
      PlaceMakers have partnered with Fall-Pac to bring you a range of safety solutions that will meet your needs. The Fall-Pac safety solutions are fully
      installed by a network of qualified installers.
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(SiteServices);
