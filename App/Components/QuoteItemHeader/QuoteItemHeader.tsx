import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { useAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { Fonts, Images } from "~root/Themes";
import { SheetState } from "../BottomSheet/BottomSheet";
import CustomerDetailsEditSheet from "../CustomerDetailsEditSheet";
import EditJobSwitchSheet from "../EditJobSwitchSheet";
import { FeatureKeys, useFeatureToggleChangeNotifier } from "../FeatureToggle/FeatureToggle";
import styles from "./QuoteItemHeaderStyle";

interface QuoteItemHeaderProps {
  label: string;
}

type Props = QuoteItemHeaderProps;

const QuoteItemHeader: React.SFC<Props> = ({ label }: QuoteItemHeaderProps) => {
  const [jobSheet, setJobSheet] = React.useState(SheetState.CLOSED);
  const [stateSheet, setStateSheet] = React.useState(SheetState.CLOSED);
  const { append } = useAppender();
  const { resName, resAddress, resEmail, resPhone } = useSelector((state: RootState) => ({
    resName: state?.quotes?.quotesListDetails?.consumerAddress?.firstName ?? "",
    resAddress: state?.quotes?.quotesListDetails?.consumerAddress?.formattedAddress ?? "",
    resEmail: state?.quotes?.quotesListDetails?.consumerAddress?.email ?? "",
    resPhone: state?.quotes?.quotesListDetails?.consumerAddress?.phone ?? "",
  }));
  const navigation = useNavigation();
  useFeatureToggleChangeNotifier(FeatureKeys.QuotesSelector, () => setJobSheet(SheetState.CLOSED));
  useFeatureToggleChangeNotifier(FeatureKeys.QuotesSelector, () => setStateSheet(SheetState.CLOSED));
  React.useEffect(() => {
    append(
      <EditJobSwitchSheet
        sheetState={jobSheet}
        sheetCloseTapped={() => {
          setJobSheet(SheetState.CLOSED);
        }}
      />,
      "EditJobSwitchSheet",
      0,
    );
  }, [jobSheet]);

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
      1,
    );
  }, [stateSheet]);
  return (
    <View>
      <View style={styles.quoteItemHeaderContainer}>
        <Text style={Fonts.style.openSans16Bold}>{label}</Text>
        <TouchableOpacity
          style={styles.editButtonContainer}
          onPress={() => {
            switch (label) {
              case "Customer details":
                setStateSheet(SheetState.EXPANDED);
                break;
              case "Job details":
                setJobSheet(SheetState.EXPANDED);
                break;
              case "Company details":
                navigation.navigate("CompanyEditQuoteContainer");
                break;
            }
          }}
        >
          <Text style={styles.editButton}>{"Edit"}</Text>
          <Image source={Images.editItem} resizeMode={"contain"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuoteItemHeader;
