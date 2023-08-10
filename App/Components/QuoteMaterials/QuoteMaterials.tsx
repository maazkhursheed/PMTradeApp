import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CustomIcon from "~root/Components/CustomIcon";
import { Fonts } from "~root/Themes";
import styles from "./QuoteMaterialsStyle";

interface OwnProps {}

type Props = OwnProps;

const QuoteMaterials: React.SFC<Props> = ({}: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.summaryContainer}>
      <View style={styles.quoteItemHeaderContainer}>
        <Text style={Fonts.style.openSans16Bold}>{"Materials"}</Text>
        <TouchableOpacity
          style={styles.editButtonContainer}
          onPress={() => {
            navigation.navigate("MaterialsList", {
              screen: "MaterialsScreen",
              params: { isMaterialsList: true },
            });
          }}
        >
          <Text style={styles.viewButton}>{"View"}</Text>
          <CustomIcon style={styles.iconStyle} name={"chevron-right"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuoteMaterials;
