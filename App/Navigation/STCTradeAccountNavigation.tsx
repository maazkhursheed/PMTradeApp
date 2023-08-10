import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "native-base";
import * as React from "react";
import { Text } from "react-native";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import FbIcon from "~root/Components/FbIcon";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import JobAccount from "~root/Containers/JobAccount/JobAccount";
import STCTradeAccount from "~root/Containers/STCTradeAccount/STCTradeAccount";
import { accessibility } from "~root/Lib/DataHelper";
import { Colors, Fonts } from "~root/Themes";
import NavigationService from "./NavigationService";

const TradeAccountStack = createNativeStackNavigator();

function TradeAccountContainer(closeSheet: () => void, changeHeaderTitle: (title: string) => void) {
  return (
    <TradeAccountStack.Navigator initialRouteName="MainTradeAccount" screenOptions={{ headerShown: false }} mode={"card"}>
      <TradeAccountStack.Screen
        name="MainTradeAccount"
        component={STCTradeAccount}
        initialParams={{
          closeSheet,
          changeHeaderTitle: () => {
            changeHeaderTitle(JOB_ACCOUNTS);
          },
        }}
      />
      <TradeAccountStack.Screen
        name="JobAccountSelection"
        component={JobAccount}
        initialParams={{
          onDismiss: () => {
            NavigationService.goBack();
            closeSheet();
            changeHeaderTitle(TRADE_ACCOUNTS);
          },
        }}
      />
    </TradeAccountStack.Navigator>
  );
}

interface OwnProps {
  sheetState: SheetState;
  closeSheet: () => void;
}

type Props = OwnProps;

const TRADE_ACCOUNTS = "Trade accounts";
const JOB_ACCOUNTS = "Account name";

export default ({ closeSheet, sheetState }: Props) => {
  const navigator = React.useRef(undefined);
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
              closeSheet();
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
      {TradeAccountContainer(closeSheet, (titleHeader: string) => {
        toggleBack(titleHeader === JOB_ACCOUNTS);
        changeTitle(titleHeader);
      })}
    </>
  );
};
