import { Moment } from "moment";
import * as R from "ramda";
import * as React from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { useSelector } from "react-redux";
import CustomIcon from "~root/Components/CustomIcon";
import LoadingView from "~root/Components/LoadingView";
import NativeWrapper from "~root/Components/NativeWrapper";
import { OrderTypes } from "~root/Lib/BranchHelper";
import { getSelectedTimeRange } from "~root/Lib/CartHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { useAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { Colors, Fonts } from "~root/Themes";
import { SheetState } from "../BottomSheet/BottomSheet";
import { DateSheet } from "../DateSheet";

interface Props extends ViewProps {
  selectedDate?: Moment;
  previousSelectedDate?: Moment;
  onClick?: () => void;
  isDisable?: boolean;
  selectedTimeRange?: string;
  orderType?: OrderTypes;
  getEarliestDateParam?: () => Moment;
  onDateSelected?: (selectedDate: Moment) => void;
  onTimeSelected?: (date: any) => void;
  onTimeRangeSelected?: (timeRange: any) => void;
}

const DateTimeSelector: React.FunctionComponent<Props> = ({
  selectedDate,
  previousSelectedDate,
  onClick,
  isDisable,
  selectedTimeRange,
  orderType,
  getEarliestDateParam,
  onDateSelected,
  onTimeSelected,
  onTimeRangeSelected,
}: Props) => {
  const { isLoading } = useSelector((state: RootState) => ({
    isLoading: state?.cart?.fetchingDeliveryRequirements,
  }));

  const { append } = useAppender();
  const [dateTimeSheet, setDateTimeSheet] = React.useState(SheetState.CLOSED);

  const getDate = React.useCallback(() => {
    const displayDate = selectedDate?.format("ddd, D MMM YYYY");
    const courier = "Today, " + selectedDate?.format("D MMM YYYY");
    return orderType === OrderTypes.EXPRESS ? courier : displayDate;
  }, [selectedDate]);

  React.useEffect(() => {
    if (!isDisable) {
      append(
        <DateSheet
          callback={(sheetState: any) => setDateTimeSheet(sheetState)}
          sheetState={dateTimeSheet}
          selectedDate={selectedDate}
          earliestDate={getEarliestDateParam ? getEarliestDateParam() : undefined}
          previousDate={previousSelectedDate}
          onDateSelected={onDateSelected}
          onSpecificTimeSelected={onTimeSelected}
          onTimeRangeSelected={onTimeRangeSelected}
          selectedTimeRange={selectedTimeRange}
        />,
        "dateSheet",
        0,
      );
    }
  }, [dateTimeSheet, selectedDate, selectedTimeRange, onDateSelected, onTimeSelected, onTimeRangeSelected]);
  return (
    <LoadingView style={styles.loader} isLoading={isLoading} hideViewOnLoading>
      <NativeWrapper
        {...accessibility("dateTimeSelector")}
        onPress={() => {
          setDateTimeSheet(SheetState.EXPANDED);
          if (onClick) {
            onClick();
          }
        }}
        style={styles.container}
        disabled={isDisable ?? false}
      >
        <View style={styles.dayDateContainer}>
          <Text style={styles.textDay}>{R.toUpper(selectedDate?.format("ddd") || "")}</Text>
          <Text style={styles.textDate}>{selectedDate?.format("D")}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeMainDate} {...accessibility("dateSelector")}>
            {getDate()}
          </Text>
          <Text style={styles.timeMain} {...accessibility("timeSelector")}>
            {getSelectedTimeRange(selectedTimeRange, selectedDate, orderType, true)}
          </Text>
        </View>

        {!isDisable && <CustomIcon style={styles.icon} name={"edit"} />}
      </NativeWrapper>
    </LoadingView>
  );
};

export default DateTimeSelector;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    marginRight: 18,
    marginBottom: 18,
    marginTop: 24,
    alignItems: "center",
  },
  dayDateContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
  textDay: {
    ...Fonts.style.openSans12,
    color: Colors.darkRed,
  },
  textDate: {
    ...Fonts.style.openSans24Bold,
  },
  timeContainer: {
    flex: 1,
    marginLeft: 28,
  },
  timeMain: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
  },
  timeMainDate: {
    ...Fonts.style.openSans18Bold,
  },
  icon: {
    color: Colors.darkGrey,
  },
  loader: {
    height: 92,
  },
});
