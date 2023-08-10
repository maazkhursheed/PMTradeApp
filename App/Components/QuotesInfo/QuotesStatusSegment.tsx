import { Button } from "native-base";
import * as React from "react";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import QuotesWonSwitchSheet from "~root/Components/QuotesWonSwitchSheet";
import { accessibility } from "~root/Lib/DataHelper";
import { useAppender } from "~root/Provider/Appender";
import { SheetState } from "../BottomSheet/BottomSheet";
import styles from "./SegmentStyles";

export enum EnumQuotesStatusType {
  Pending,
  Won,
  Lost,
}

const QuotesStatusSegment = () => {
  const [statusSheet, setStatusSheet] = React.useState(SheetState.CLOSED);
  const { append } = useAppender();
  React.useEffect(() => {
    append(
      <QuotesWonSwitchSheet
        sheetState={statusSheet}
        sheetCloseTapped={() => {
          setStatusSheet(SheetState.CLOSED);
          setSelectedType(EnumQuotesStatusType.Pending);
        }}
        jobStatus={selected}
      />,
      "QuotesWonSwitchSheet",
      0,
    );
  }, [statusSheet, setStatusSheet]);

  const [selected, setSelectedType] = useState(EnumQuotesStatusType.Pending);

  const onPendingClick = useCallback(() => {
    setSelectedType(EnumQuotesStatusType.Pending);
  }, []);

  const onWonClick = useCallback(() => {
    setStatusSheet(SheetState.EXPANDED);
    setSelectedType(EnumQuotesStatusType.Won);
  }, []);

  const onLostClick = useCallback(() => {
    setStatusSheet(SheetState.EXPANDED);
    setSelectedType(EnumQuotesStatusType.Lost);
  }, []);

  const getButtonStyle = useCallback(
    (orderType: EnumQuotesStatusType) => {
      return orderType === selected ? styles.buttonSelected : styles.buttonContainerInverse;
    },
    [selected],
  );

  const getButtonTextStyle = useCallback(
    (orderType: EnumQuotesStatusType) => {
      return orderType === selected ? styles.buttonSelectedText : styles.buttonTextInverse;
    },
    [selected],
  );

  return (
    <View style={styles.segmentContainer}>
      <Button first={true} style={getButtonStyle(EnumQuotesStatusType.Pending)} onPress={onPendingClick} {...accessibility("pendingBtn")}>
        <Text style={getButtonTextStyle(EnumQuotesStatusType.Pending)}>Pending</Text>
      </Button>

      <Button style={getButtonStyle(EnumQuotesStatusType.Won)} onPress={onWonClick} {...accessibility("wonBtn")}>
        <Text adjustsFontSizeToFit={true} style={getButtonTextStyle(EnumQuotesStatusType.Won)}>
          Won
        </Text>
      </Button>
      <Button style={getButtonStyle(EnumQuotesStatusType.Lost)} onPress={onLostClick} {...accessibility("lostBtn")}>
        <Text style={getButtonTextStyle(EnumQuotesStatusType.Lost)}>Lost</Text>
      </Button>
    </View>
  );
};

export default QuotesStatusSegment;
