import { Text } from "native-base";
import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import style from "./AllBranchesListItemStyles";

interface OwnProps {
  item: any;
  index: number;
  onPress: any;
  allBranches: any;
}

type Props = OwnProps;

const AllBranchesListItem: React.SFC<Props> = ({ item, index, onPress, allBranches }: Props) => {
  return (
    <TouchableOpacity
      style={[
        style.itemStyle,
        {
          borderBottomWidth: index === allBranches.length - 1 ? 0 : 1,
        },
      ]}
      onPress={onPress}
    >
      <View style={style.branchItem}>
        <Text style={style.branchName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AllBranchesListItem;
