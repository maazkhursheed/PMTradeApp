import { CommonActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "native-base";
import * as R from "ramda";
import * as React from "react";
import { Text } from "react-native";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import FbIcon from "~root/Components/FbIcon";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import STCConfirmOrderPurchaseProof from "~root/Containers/STCConfirmOrderPurchaseProof/STCConfirmOrderPurchaseProof";
import STCGatePass from "~root/Containers/STCGatePassContainer/STCGatePass";
import STCRecentPurchase from "~root/Containers/STCRecentPurchaseContainer/STCRecentPurchase";
import { accessibility } from "~root/Lib/DataHelper";
import { Colors, Fonts } from "~root/Themes";

const PurchaseOrderStack = createNativeStackNavigator();

function PurchaseOrderContainer() {
  return (
    <PurchaseOrderStack.Navigator initialRouteName="MainPurchaseHistory" screenOptions={{ headerShown: false }} mode={"card"}>
      <PurchaseOrderStack.Screen name="MainPurchaseHistory" component={STCRecentPurchase} />
      <PurchaseOrderStack.Screen name="STCGatePass" component={STCGatePass} />
      <PurchaseOrderStack.Screen name="STCConfirmOrderPurchaseProof" component={STCConfirmOrderPurchaseProof} />
    </PurchaseOrderStack.Navigator>
  );
}

interface OwnProps {
  sheetState: SheetState;
  closeSheet: () => void;
}

type Props = OwnProps;

const RECENT_PURCHASES = "Recent purchases";
const REVIEW_ORDERS = "Skip the counter";
const ISSUE_TICKET = "Issue ticket";
const GATE_PASS = "Skip the counter";

const mapScreenToTile = R.cond([
  [R.equals("MainPurchaseHistory"), R.always(RECENT_PURCHASES)],
  [R.equals("STCReviewOrders"), R.always(REVIEW_ORDERS)],
  [R.equals("IssueTicket"), R.always(ISSUE_TICKET)],
  [R.equals("STCGatePass"), R.always(GATE_PASS)],
  [R.equals("STCConfirmOrderPurchaseProof"), R.always(GATE_PASS)],
  [R.T, R.always("")],
]);

export default ({ closeSheet, sheetState }: Props) => {
  const navigator = React.useRef(undefined);
  const [showBackButton, toggleBack] = React.useState(false);
  const [title, changeTitle] = React.useState(RECENT_PURCHASES);

  const reset = () => {
    changeTitle(RECENT_PURCHASES);
    toggleBack(false);
    if (navigator && navigator.current) {
      navigator.current.dispatch(CommonActions.navigate({ name: "MainPurchaseHistory" }));
    }
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
                if (navigator) {
                  navigator.current.dispatch(CommonActions.goBack());
                }
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

      <PurchaseOrderContainer
        onStateChange={(prevNavigationState, nextNavigationState, action) => {
          const titleHeader = R.compose(mapScreenToTile, R.prop("routeName"), R.last, R.prop("routes"))(nextNavigationState);

          toggleBack(nextNavigationState.index >= 1);
          changeTitle(titleHeader);
        }}
        ref={navigator}
      />
    </>
  );
};
