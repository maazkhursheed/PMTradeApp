import * as React from "react";
import { Text } from "react-native";
import NumberFormat from "react-number-format";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import styles from "~root/Components/PriceComponent/PriceComponentStyle";
import { isNilOrEmpty } from "~root/Lib/CommonHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { PermissionTypes } from "~root/Types/Permissions";

interface Props {
  style?: any;
  containerStyle?: any;
  prefix?: string;
  value?: number | string;
  ignorePermission?: boolean;
  testID?: string;
  ignorePOA?: boolean;
  accessibilityLabel?: string;
}

const PriceComponent: React.FunctionComponent<Props> = ({
  style,
  value,
  containerStyle,
  prefix,
  ignorePermission,
  accessibilityLabel,
  testID,
  ignorePOA,
}: Props) => {
  const isNotValueAvailable = (isNilOrEmpty(value) || Number(value) <= 0.01) && !ignorePOA;
  return (
    <PermissionComponent
      hideView={true}
      permissionTypes={[PermissionTypes.ViewPricing, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}
      style={[styles.permissionComponentStyle, containerStyle]}
    >
      {({ hasPermission }: { hasPermission: boolean }) => {
        if (hasPermission || ignorePermission) {
          return isNotValueAvailable ? (
            <Text style={style} {...accessibility("productPrice")}>
              POA
            </Text>
          ) : (
            <NumberFormat
              defaultValue={0}
              value={value}
              displayType={"text"}
              thousandSeparator={","}
              fixedDecimalScale={true}
              decimalScale={2}
              prefix={prefix ?? "$"}
              renderText={formattedText => (
                <Text {...accessibility(testID || accessibilityLabel ? testID || accessibilityLabel : "productPrice")} style={style}>
                  {formattedText}
                </Text>
              )}
            />
          );
        } else {
          return undefined;
        }
      }}
    </PermissionComponent>
  );
};

export default PriceComponent;
