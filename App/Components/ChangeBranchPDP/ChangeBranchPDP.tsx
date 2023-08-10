import * as React from "react";
import { Text, View, ViewProps } from "react-native";
import styles from "./ChangeBranchPDPStyle";

interface Props extends ViewProps {
  branchName: string;
}

const ChangeBranchPDP: React.SFC<Props> = ({ branchName }: Props) => {
  return (
    <View style={styles.branchNameContainer}>
      <Text style={styles.selectedBranchName}>{branchName}</Text>
    </View>
  );
};

export default ChangeBranchPDP;
