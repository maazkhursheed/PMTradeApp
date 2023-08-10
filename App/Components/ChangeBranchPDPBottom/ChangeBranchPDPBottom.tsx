import * as React from "react";
import { Text, View, ViewProps } from "react-native";
import { accessibility } from "~root/Lib/DataHelper";
import CustomIcon from "../CustomIcon";
import styles from "./ChangeBranchPDPBottomStyle";

interface Props extends ViewProps {
  branchName: string;
  isConstrained?: boolean;
}

const ChangeBranchPDPBottom: React.SFC<Props> = ({ branchName, isConstrained }: Props) => {
  return (
    <View style={styles.checkStockContainer} {...accessibility("checkStockItem")}>
      <CustomIcon name={"store"} style={[isConstrained ? styles.storeIconDisabled : styles.storeIcon]} />
      <View style={{ flex: 1 }}>
        <Text style={[isConstrained ? styles.textDisabled : styles.text]}>{"Check stock in-branch"}</Text>
        <Text style={[isConstrained ? styles.branchNameDisabled : styles.branchName]}>{branchName}</Text>
      </View>
      <View {...accessibility("iconDirectionRight")}>
        <CustomIcon style={[isConstrained ? styles.iconDisabled : styles.icon]} name={"chevron-right"} />
      </View>
    </View>
  );
};

export default ChangeBranchPDPBottom;
