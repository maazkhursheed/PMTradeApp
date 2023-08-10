import * as R from "ramda";
import React from "react";
import { Switch, View } from "react-native";
import { connect } from "react-redux";
import FbIcon from "~root/Components/FbIcon";
import { accessibility } from "~root/Lib/DataHelper";
import SwitchValues from "~root/Lib/ManageTeamHelper/SwitchValues";
import { RootState } from "~root/Reducers";
import { TeamActions } from "~root/Reducers/ManageTeamReducers";
import colors from "~root/Themes/Colors";
import { PermissionTypes } from "~root/Types/Permissions";
import style from "./PermissionSwitchStyle";

export interface OwnProps {
  permissionType: PermissionTypes;
  isDisabled?: boolean;
}

export interface StateProps {
  switchValue?: SwitchValues;
}

export interface DispatchProps {
  toggleSwitch?: () => void;
}

export type Props = OwnProps & StateProps & DispatchProps;

const PermissionSwitch: React.FC<Props> = ({ switchValue, toggleSwitch, isDisabled }) => {
  const getBooleanValue = React.useCallback(() => {
    let value = false;
    switch (switchValue) {
      case SwitchValues.LOCKED:
      case SwitchValues.ON:
        value = true;
        break;
      case SwitchValues.DISABLED:
      case SwitchValues.OFF:
      case SwitchValues.DISABLED_LOCKED:
        value = false;
        break;
    }

    return value;
  }, [switchValue]);

  const testId = getBooleanValue() ? "toggleOn" : "toggleOff";
  return (
    <View
      style={style.view}
      pointerEvents={isDisabled || R.includes(switchValue, [SwitchValues.DISABLED, SwitchValues.DISABLED_LOCKED, SwitchValues.LOCKED]) ? "none" : "auto"}
    >
      {R.includes(switchValue, [SwitchValues.DISABLED_LOCKED, SwitchValues.LOCKED]) && (
        <FbIcon style={[style.lockIcon, { opacity: isDisabled ? 0.5 : 1 }]} name={"ic_lock"} />
      )}
      <Switch
        ios_backgroundColor={colors.lightWedgeBlue}
        thumbColor={colors.snow}
        style={{ opacity: isDisabled || switchValue === SwitchValues.DISABLED_LOCKED ? 0.5 : 1 }}
        onValueChange={toggleSwitch}
        trackColor={{ false: colors.lightWedgeBlue, true: colors.lightBlue }}
        value={getBooleanValue()}
        {...accessibility(testId)}
      />
    </View>
  );
};

const mapDispatchToProps = (dispatch: any, ownProps: Props) => ({
  toggleSwitch: () => dispatch(TeamActions.toggleSwitch(ownProps.permissionType)),
});

const mapStateToProps = (state: RootState, ownProps: Props) => ({
  switchValue: state.manageTeam?.permissionState.switches[ownProps.permissionType] || SwitchValues.OFF,
});

export default connect(mapStateToProps, mapDispatchToProps)(PermissionSwitch);
