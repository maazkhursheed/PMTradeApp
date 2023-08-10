import PermissionTypes from "./PermissionTypes";

interface AvailablePermissionType {
  [t: string]: boolean | number | string;
}

export { PermissionTypes, AvailablePermissionType };
