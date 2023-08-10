// Styles
import * as React from "react";
import { ScrollView, View } from "react-native";
import MainContainer from "~root/Components/MainContainer";
import AppThemeContext from "~root/Themes/AppThemeContext";
import styles from "./MyProfileContainerStyle";
import MyProfileContentView from "./MyProfileContentView";
import MyProfileFooter from "./MyProfileFooter";
import MyProfileHeader from "./MyProfileHeader";

const MyProfileContainer = () => {
  return (
    <AppThemeContext.Provider value={"light"}>
      <MainContainer>
        <MyProfileHeader />
        <View style={styles.separator} />
        <ScrollView>
          <MyProfileContentView />
          <View style={styles.separator} />
          <MyProfileFooter />
        </ScrollView>
      </MainContainer>
    </AppThemeContext.Provider>
  );
};

export default MyProfileContainer;
