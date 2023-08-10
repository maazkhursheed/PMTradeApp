import * as React from "react";
import { ViewProps } from "react-native";
import { connect } from "react-redux";
import DisablingComponent from "~root/Components/DisablingComponent";
import { hasPermissionFromArray, shouldHideView } from "~root/Lib/PermissionHelperLib";
import { RootState } from "~root/Reducers";
import { PermissionTypes } from "~root/Types/Permissions";

interface OwnProps {
  permissionTypes: PermissionTypes[] | PermissionTypes;
  disallowDisable?: boolean;
  hideView?: boolean;
  children?: any;
}

interface StateProps {
  hasPermission?: boolean;
}

type Props = OwnProps & StateProps & ViewProps;

const PermissionComponent: React.FC<Props> = ({ hasPermission, disallowDisable, hideView, children, ...remaining }: Props) => {
  if (shouldHideView(hasPermission, hideView)) {
    return null;
  }
  return disallowDisable ? (
    typeof children === "function" ? (
      children({ hasPermission })
    ) : (
      { children }
    )
  ) : (
    <DisablingComponent {...remaining} isDisabled={!hasPermission}>
      {typeof children === "function" ? children({ hasPermission }) : children}
    </DisablingComponent>
  );
};

const mapStateToProps = (state: RootState, ownProps: Props): StateProps => {
  return {
    hasPermission: hasPermissionFromArray(ownProps.permissionTypes, state?.permission?.availablePermissions),
  };
};

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PermissionComponent);
