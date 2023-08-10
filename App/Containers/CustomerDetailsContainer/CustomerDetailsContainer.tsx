import { useNavigation } from "@react-navigation/native";
import { Text } from "native-base";
import * as React from "react";
import { Pressable, View } from "react-native";
import { useSelector } from "react-redux";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import CustomerDetailsEditSheet from "~root/Components/CustomerDetailsEditSheet";
import CustomIcon from "~root/Components/CustomIcon";
import { FeatureKeys, useFeatureToggleChangeNotifier } from "~root/Components/FeatureToggle/FeatureToggle";
import MainContainer from "~root/Components/MainContainer";
import SmallHeader from "~root/Components/SmallHeader";
import { useQuoteStatusChecker, useQuoteWonOrLostStatus } from "~root/Lib/QuoteHelper";
import { useAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import styles from "./CustomerDetailsContainerStyle";
import LabelViews from "./LabelViews";

const CustomerDetailsContainer = () => {
  const navigation = useNavigation();
  // @ts-ignore
  const { append } = useAppender();
  const [stateSheet, setStateSheet] = React.useState(SheetState.CLOSED);

  const { resName, resAddress, resEmail, resPhone } = useSelector((state: RootState) => ({
    resName: state?.quotes?.quotesListDetails?.consumerAddress?.firstName ?? "",
    resAddress: state?.quotes?.quotesListDetails?.consumerAddress?.formattedAddress ?? "",
    resEmail: state?.quotes?.quotesListDetails?.consumerAddress?.email ?? "",
    resPhone: state?.quotes?.quotesListDetails?.consumerAddress?.phone ?? "",
  }));
  const isQuoteEditable = useQuoteStatusChecker();
  useFeatureToggleChangeNotifier(FeatureKeys.QuotesSelector, () => setStateSheet(SheetState.CLOSED));
  const isQuoteWonOrLost = useQuoteWonOrLostStatus();
  React.useEffect(() => {
    append(
      <CustomerDetailsEditSheet
        sheetState={stateSheet}
        sheetCloseTapped={() => setStateSheet(SheetState.CLOSED)}
        defaultName={resName}
        defaultAddress={resAddress}
        defaultPhone={resPhone}
        defaultEmail={resEmail}
      />,
      "CustomerDetailsEditSheet",
      0,
    );
  }, [stateSheet]);

  return (
    <>
      <MainContainer style={styles.container}>
        <SmallHeader
          title={"Customer Details"}
          navigation={navigation}
          actionItem={
            <View>
              {!isQuoteWonOrLost && (
                <Pressable onPress={() => isQuoteEditable(() => setStateSheet(SheetState.EXPANDED))} style={styles.rightButton}>
                  <Text style={styles.textStyle}>Edit</Text>
                  <CustomIcon name={"edit"} style={styles.close} />
                </Pressable>
              )}
            </View>
          }
        />
        <LabelViews userName={resName} email={resEmail} address={resAddress} phone={resPhone} />
      </MainContainer>
    </>
  );
};

export default CustomerDetailsContainer;
