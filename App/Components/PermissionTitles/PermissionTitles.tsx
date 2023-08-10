import React from "react";
import { Text, View } from "react-native";
import PermissionHelper from "~root/Lib/ManageTeamHelper";
import style from "./PermissionTitleStyles";

export interface Props {
  permissionType: PermissionHelper;
  isDisabled?: boolean;
}

const PermissionTitle: React.FunctionComponent<Props> = ({ permissionType, isDisabled }: Props) => {
  return (
    <View style={[style.viewStyle, { opacity: isDisabled ? 0.5 : 1 }]}>
      <Text style={style.title}>{permissionType.getTitle()}</Text>
      <Text style={style.description}>{permissionType.getDescription()}</Text>
    </View>
  );
};
export default PermissionTitle;
