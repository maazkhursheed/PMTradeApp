import { useNavigation } from "@react-navigation/native";
import React from "react";
import AddNewAccountSwitch from "~root/Components/AddNewAccountSwitch";
import CustomIcon from "~root/Components/CustomIcon";
import SmallHeader from "~root/Components/SmallHeader";
import TradeAccount from "~root/Containers/TradeAccount/TradeAccount";
import { accessibility } from "~root/Lib/DataHelper";
import AppThemeContext from "~root/Themes/AppThemeContext";
import style from "./MyProfileTradeAccountSelectionStyle";

const MyProfileTradeAccountSelection = () => {
  const navigation = useNavigation();

  const onJobAccountSuccess = React.useCallback(
    (jobs: any[]) => {
      if (jobs?.length > 0) {
        navigation.navigate("MyProfileJobAccountSelection");
      } else {
        navigation.goBack();
      }
    },
    [navigation],
  );

  return (
    <AppThemeContext.Provider value={"light"}>
      <SmallHeader
        actionItem={<CustomIcon name={"close"} style={style.close} onPress={() => navigation.goBack()} {...accessibility("closeIcon")} />}
        title={"Accounts"}
        navigation={navigation}
      />
      <AddNewAccountSwitch />
      <TradeAccount onSelect={onJobAccountSuccess} />
    </AppThemeContext.Provider>
  );
};

export default MyProfileTradeAccountSelection;
