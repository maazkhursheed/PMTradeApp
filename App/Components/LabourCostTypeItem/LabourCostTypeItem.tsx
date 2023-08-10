import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, TouchableOpacity } from "react-native";
import { getLabourCostTitle } from "~root/Lib/LabourSectionHelper";
import { LabourCostType } from "~root/Types/LabourSection";
import CustomIcon from "../CustomIcon";
import style from "./LabourCostTypeItemStyle";

interface OwnProps {
  costType: LabourCostType;
}

type Props = OwnProps;

const LabourCostTypeItem: React.SFC<Props> = ({ costType }: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[style.sectionItemContainer, { borderBottomWidth: costType === LabourCostType.OtherCosts ? 0 : 1 }]}
      onPress={() => {
        navigation.navigate("LabourSectionDetailScreen", { costType: costType });
      }}
    >
      <Text style={style.sectionTitle}>{getLabourCostTitle(costType)}</Text>
      <CustomIcon name={"chevron-right"} style={style.chevron} />
    </TouchableOpacity>
  );
};

export default LabourCostTypeItem;
