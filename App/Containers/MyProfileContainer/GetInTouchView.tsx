// Styles
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CustomIcon from "~root/Components/CustomIcon";
import { accessibility } from "~root/Lib/DataHelper";
import styles from "./MyProfileContainerStyle";

const GetInTouchView = () => {
  const navigation = useNavigation();

  const onPressGETINTouch = React.useCallback(() => {
    navigation.navigate("GetInTouch");
  }, [navigation]);

  return (
    <>
      <TouchableOpacity style={styles.item} {...accessibility("myProfileBranchTouchable")} onPress={onPressGETINTouch}>
        <View style={styles.accountsView}>
          <Text style={styles.selectionItem}>Get in touch</Text>
        </View>
        <CustomIcon name={"chevron-right"} style={styles.chevron} />
      </TouchableOpacity>
    </>
  );
};

export default GetInTouchView;
