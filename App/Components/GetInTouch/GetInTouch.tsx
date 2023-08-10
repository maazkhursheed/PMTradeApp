import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "native-base";
import React from "react";
import { Linking, TouchableOpacity } from "react-native";
import CustomIcon from "~root/Components/CustomIcon";
import FbIcon from "~root/Components/FbIcon";
import MainContainer from "~root/Components/MainContainer";
import SmallHeader from "~root/Components/SmallHeader";
import AppConfig from "~root/Config/AppConfig";
import styles from "~root/Containers/MyProfileContainer/MyProfileContainerStyle";
import { accessibility } from "~root/Lib/DataHelper";
import AppThemeContext from "~root/Themes/AppThemeContext";
import style from "./GetInTouchStyle";

const GetInTouch = ({}) => {
  const navigation = useNavigation();

  return (
    <AppThemeContext.Provider value={"light"}>
      <MainContainer>
        <SmallHeader
          title={"Get in touch"}
          navigation={navigation}
          actionItem={
            <Button
              transparent={true}
              onPress={() => {
                navigation?.getParent()?.goBack();
              }}
            >
              <FbIcon name={"ic_close"} style={styles.close} />
            </Button>
          }
        />
        <View style={style.main}>
          <View style={style.header}>
            <Text style={style.heading}>General enquires</Text>
            <View style={style.smallSeparator} />
          </View>
          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${AppConfig.SUPPORT_EMAIL}`)} key={"getInTouchEmail"} {...accessibility("getInTouchEmail")}>
            <View style={style.mail}>
              <CustomIcon name={"email-icon"} style={style.iconStyle} />
              <Text style={style.mailTxt}>{AppConfig.SUPPORT_EMAIL}</Text>
              <View style={style.smallSeparator} />
            </View>
          </TouchableOpacity>
          <View>
            <Text style={style.support_txt}>Support available Mon - Fri between 8:00AM - 5:00PM</Text>
          </View>
        </View>
      </MainContainer>
    </AppThemeContext.Provider>
  );
};

export default GetInTouch;
