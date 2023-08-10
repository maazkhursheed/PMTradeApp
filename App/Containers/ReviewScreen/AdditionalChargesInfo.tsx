import React from "react";
import { Text, View } from "react-native";
import styles from "./ReviewScreenStyle";

const AdditionalChargesInfo: React.SFC = () => {
  return (
    <>
      <View style={styles.additionalInfoContainer}>
        <Text style={styles.additionalInfoText}>{"PlaceMakers standard delivery charges apply"}</Text>
        <Text style={[styles.additionalInfoTextDescrption]}>
          {"For the products of unusual weight or size requiring cartage or delivered outside local area, additional charges will apply"}
        </Text>
      </View>
    </>
  );
};

export default AdditionalChargesInfo;
