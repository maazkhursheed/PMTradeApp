import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "native-base";
import * as React from "react";
import { Text } from "react-native";
import AddNewAccountSwitch from "~root/Components/AddNewAccountSwitch";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import FbIcon from "~root/Components/FbIcon";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import JobAccount from "~root/Containers/JobAccount/JobAccount";
import TradeAccount from "~root/Containers/TradeAccount/TradeAccount";
import { accessibility } from "~root/Lib/DataHelper";
import { Colors, Fonts } from "~root/Themes";
import NavigationService from "./NavigationService";

const TradeAccountStack = createNativeStackNavigator();

function TradeAccountContainer(closeSheet: () => void, changeHeaderTitle: (title: string) => void) {
  return (
    <TradeAccountStack.Navigator initialRouteName="ConnectedTradeAccount" screenOptions={{ headerShown: false }} mode={"card"}>
      <TradeAccountStack.Screen
        name="ConnectedTradeAccount"
        component={({ navigation }) => (
          <TradeAccount
            onSelect={jobs => {
              if (jobs?.length) {
                navigation.navigate("JobAccount");
                changeHeaderTitle(JOB_ACCOUNTS);
              } else {
                closeSheet();
              }
            }}
          />
        )}
      />
      <TradeAccountStack.Screen
        name="JobAccount"
        component={() => (
          <JobAccount
            onDismiss={() => {
              NavigationService.goBack();
              closeSheet();
              changeHeaderTitle(TRADE_ACCOUNTS);
            }}
          />
        )}
      />
    </TradeAccountStack.Navigator>
  );
}

interface OwnProps {
  sheetState: SheetState;
  closeSheet: () => void;
  closeAll: () => void;
}

type Props = OwnProps;

const TRADE_ACCOUNTS = "Trade accounts";
const JOB_ACCOUNTS = "Job accounts";

export default ({ closeSheet, closeAll, sheetState }: Props) => {
  const [showBackButton, toggleBack] = React.useState(false);
  const [title, changeTitle] = React.useState(TRADE_ACCOUNTS);

  const reset = () => {
    title === JOB_ACCOUNTS ? NavigationService.goBack() : undefined;
    changeTitle(TRADE_ACCOUNTS);
    toggleBack(false);
  };
  React.useEffect(() => {
    if (sheetState === SheetState.CLOSED) {
      reset();
    }
  });

  return (
    <>
      <STCHeader
        title={title}
        style={{
          backgroundColor: sheetState === SheetState.EXPANDED ? Colors.darkBlue : Colors.cloud,
        }}
        leftItem={
          showBackButton ? (
            <Button
              transparent={true}
              onPress={() => {
                changeTitle(TRADE_ACCOUNTS);
                NavigationService.goBack();
                toggleBack(false);
              }}
              {...accessibility("rightItemBtn")}
            >
              <FbIcon
                name={"ic_chevron"}
                style={{
                  fontSize: 18,
                  paddingHorizontal: 22,
                  transform: [{ rotateY: "180deg" }],
                  textAlign: "right",
                  color: Colors.black,
                }}
              />
            </Button>
          ) : undefined
        }
        rightItem={
          <Button
            transparent={true}
            onPress={() => {
              reset();
              closeAll();
            }}
            {...accessibility("rightItemBtn")}
          >
            <Text
              style={{
                color: Colors.lightBlue,
                fontSize: 17,
                fontFamily: Fonts.type.SFProRegular,
              }}
            >
              Close
            </Text>
          </Button>
        }
      />
      {title === "Trade accounts" && <AddNewAccountSwitch />}
      {TradeAccountContainer(closeSheet, (titleHeader: string) => {
        toggleBack(titleHeader === JOB_ACCOUNTS);
        changeTitle(titleHeader);
      })}
    </>
  );
};
