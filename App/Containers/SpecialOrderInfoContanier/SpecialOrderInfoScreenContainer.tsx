import { useNavigation } from "@react-navigation/native";
import { Text } from "native-base";
import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { PAYON_CALLBACK, SO1_DESCRIPTION_LINK, SO_DESCRIPTION, SPECIAL_ORDER, SPECIAL_ORDER_PROCESS } from "~root/Lib/AlertsHelper";
import AppThemeContext from "~root/Themes/AppThemeContext";
import SmallHeaderNew from "../../Components/SmallHeaderNew";
import SpecialOrderCard from "./SpecialOrderCard";
import styles from "./SpecialOrderInfoScreenContainerStyle";

const SpecialOrderInfoScreenContainer = () => {
  const navigation = useNavigation();

  return (
    <AppThemeContext.Provider value={"dark"}>
      <View style={styles.headerContainer}>
        <SmallHeaderNew navigation={navigation} title={SPECIAL_ORDER} subTitle={PAYON_CALLBACK} />
        <ScrollView contentContainerStyle={styles.parentStyle}>
          <Text style={styles.textStyle}>{SO_DESCRIPTION}</Text>
          <Text style={styles.blueTextStyle}>{SO1_DESCRIPTION_LINK}</Text>
          <View style={styles.line} />
          <Text style={styles.headerText}>{SPECIAL_ORDER_PROCESS}</Text>
          <SpecialOrderCard />
        </ScrollView>
      </View>
    </AppThemeContext.Provider>
  );
};

export default SpecialOrderInfoScreenContainer;
