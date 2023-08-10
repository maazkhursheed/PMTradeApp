import * as React from "react";
import { Text, View } from "react-native";
import styles from "~root/Components/DisplayOptionsComponent/DisplayOptionsComponentStyle";
import SwitchComponent from "~root/Components/SwitchComponent";

interface OwnProps {
  displayOption?: string;
  setDisplayOption?: (value: any) => void;
  status?: boolean;
}

type Props = OwnProps;

const DisplayOptionsComponent: React.SFC<Props> = ({ displayOption, setDisplayOption, status }: Props) => {
  return (
    <>
      <View style={styles.accessListStyle}>
        <Text style={styles.textStyle}>{displayOption}</Text>
        <SwitchComponent value={status} onValueChange={setDisplayOption} testID={status ? displayOption + " toggleOn" : displayOption + " toggleOff"} />
      </View>
    </>
  );
};

export default DisplayOptionsComponent;
