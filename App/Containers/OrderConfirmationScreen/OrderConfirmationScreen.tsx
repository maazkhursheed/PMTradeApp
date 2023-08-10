import { useNavigation } from "@react-navigation/native";
import * as R from "ramda";
import * as React from "react";
import { useCallback } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import LargeButton from "../../Components/LargeButton";
import MainContainer from "../../Components/MainContainer";
import SmallHeader from "../../Components/SmallHeader";
import ConfirmationTick from "../../Images/tickConfirmation/tickConfirmation.svg";
import { confirmationProgress, getInTouch, gotConfirmation, note, wishToContact } from "../../Lib/StringHelper";
import { RootState } from "../../Reducers";
import { ApplicationStyles } from "../../Themes";
import styles from "./OrderConfirmationScreenStyle";

const OrderConfirmationScreen: React.SFC = () => {
  const navigation = useNavigation();
  const { userName, userID } = useSelector((state: RootState) => ({
    userName: R.path(["login", "userData", "name"], state),
    userID: R.path(["login", "userData", "uid"], state),
  }));
  const onViewOrderPress = useCallback(() => {
    navigation.navigate("MainOrderList");
  }, []);
  const callURL = useCallback(() => {
    navigation.navigate("GetInTouch");
  }, []);

  return (
    <MainContainer>
      <SmallHeader style={ApplicationStyles.noShadow} title={"Confirmation"} />
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.mainSubContainer}>
            <ConfirmationTick style={styles.tickStyle} />
            <Text style={styles.userNameTitle}>{`Nice Job ${userName}!`}</Text>
            <Text style={styles.mainElement}>{gotConfirmation}</Text>
            <Text style={styles.userEmail}>{`${userID}.`}</Text>
            <Text style={styles.mainSubElement}>{confirmationProgress}</Text>
            <View style={styles.separator} />
            <Text style={styles.mainElementGrey}>{wishToContact}</Text>
            <TouchableOpacity onPress={callURL}>
              <Text style={styles.selectionItem}>{getInTouch}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>
              <Text style={styles.noteStyle}>Note</Text>
              {note}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.checkoutButtonContainer}>
        <LargeButton textStyle={styles.largeButtonTextStyle} style={styles.largeButtonStyle} onPress={onViewOrderPress} btnText={"View Orders"} />
      </View>
    </MainContainer>
  );
};
export default OrderConfirmationScreen;
