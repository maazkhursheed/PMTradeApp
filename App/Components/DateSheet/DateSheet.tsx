import moment, { Moment } from "moment";
import { Button } from "native-base";
import * as R from "ramda";
import * as React from "react";
import { FlatList, Platform, StyleSheet, Text, View, ViewProps } from "react-native";
import { CalendarList } from "react-native-calendars";
import { connect, useSelector } from "react-redux";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import CustomIcon from "~root/Components/CustomIcon";
import NativeWrapper from "~root/Components/NativeWrapper";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { OrderTypes } from "~root/Lib/BranchHelper";
import { isToday } from "~root/Lib/CommonHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import { Colors, Fonts } from "~root/Themes";
import { RequestedTime } from "~root/Types/CommonTypes";
interface Props extends ViewProps {
  selectedDate?: Moment;
  earliestDate?: Moment;
  previousDate?: Moment;
  onSpecificTimeSelected?: (time: Moment) => void;
  onTimeRangeSelected?: (timeRangeStr: string) => void;
  sheetState: SheetState;
  callback?: (state: SheetState) => void;
  onDateSelected?: (date: Moment) => void;
  orderType?: OrderTypes;
  selectedTimeRange?: string;
}

const rangeStep = R.curry((start, end, step) => R.unfold(n => (n < end ? [n, n + step] : false), start));

const convertToHour = (earliestDate, val) =>
  val % 1 === 0.5 ? moment(earliestDate).set("m", 30).set("h", val) : moment(earliestDate).set("m", 0).set("h", val);

const DateSheet: React.FunctionComponent<Props> = ({
  sheetState,
  onDateSelected,
  onSpecificTimeSelected,
  selectedDate,
  earliestDate,
  previousDate,
  callback,
  orderType,
  onTimeRangeSelected,
  selectedTimeRange,
}: Props) => {
  const { timeRangeArr } = useSelector((state: RootState) => ({
    timeRangeArr: state?.cart?.deliveryRequirements?.availableDSPOptions,
  }));

  const [sheetStateInternal, setSheetState] = React.useState(sheetState);
  const [currentScreen, setCurrentScreen] = React.useState(1);
  const [selectedDateInternal, setSelectedDateInternal] = React.useState(selectedDate);

  const earliestDateOffset = earliestDate.get("m") === 30 ? 0.5 : 0;

  React.useEffect(() => {
    setSelectedDateInternal(selectedDate);
  }, [selectedDate]);

  React.useEffect(() => {
    setSheetState(sheetState);
  }, [sheetState]);

  const cancel = () => {
    setSheetState(SheetState.CLOSED);
    callback?.(SheetState.CLOSED);
    setCurrentScreen(1);
    onDateSelected(previousDate);
    setTimeout(() => {
      if (!selectedTimeRange) {
        onSpecificTimeSelected(previousDate);
      }
    }, 0);
  };

  const renderDateView = () => {
    return (
      <View style={{ paddingBottom: 80 }}>
        <CalendarList
          pastScrollRange={0}
          futureScrollRange={2}
          scrollEnabled={true}
          showScrollIndicator={true}
          firstDay={1}
          renderHeader={date => {
            return <Text style={styles.headerText}>{date.toString("MMMM yyyy")}</Text>;
          }}
          dayComponent={({ date, state }) => {
            const dateObj = moment(date.dateString).set("h", selectedDateInternal.get("h")).set("m", selectedDateInternal.get("m"));
            const weekDay = dateObj.day();
            const isSelected = dateObj.isSame(selectedDateInternal, "d");
            const isDisabled = weekDay === 0 || weekDay === 6 || dateObj.isBefore(earliestDate, "d");

            return (
              <NativeWrapper
                onPress={
                  !isDisabled
                    ? () => {
                        // callback?.(SheetState.CLOSED);
                        onDateSelected?.(dateObj);
                        setCurrentScreen(orderType === OrderTypes.STANDARD ? 2 : 3);
                      }
                    : undefined
                }
              >
                <Text style={isDisabled ? styles.dayTextDisabled : isSelected ? styles.dayTextSelected : styles.dayText}>{date.day}</Text>
              </NativeWrapper>
            );
          }}
          theme={{ calendarBackground: Colors.white }}
        />
      </View>
    );
  };

  const renderSpecificTimeView = () => {
    return (
      <View style={styles.specificTimeContainer}>
        <FlatList
          extraData={selectedDateInternal}
          data={R.map(
            val => convertToHour(selectedDateInternal, val),
            rangeStep(isToday(selectedDateInternal) ? earliestDate?.get("h") + earliestDateOffset : 8, 17, 0.5),
          )}
          renderItem={({ item }) => {
            const isSelected = selectedDateInternal.isSame(item, "h") && selectedDateInternal.isSame(item, "m");
            return (
              <NativeWrapper
                onPress={() => {
                  setCurrentScreen(1);
                  callback(SheetState.CLOSED);
                  onSpecificTimeSelected(item);
                }}
                style={styles.specificTimeItemContainer}
              >
                <Text style={[styles.timeText, isSelected ? styles.timeTextSelected : styles.timeTextUnselected]}>{item.format("hh:mm A")}</Text>
                <CustomIcon
                  style={isSelected ? styles.iconSelected : styles.iconUnselected}
                  name={isSelected ? "tick" : "chevron-right"}
                  {...accessibility(isSelected ? "tickIcon" : "rightArrowIcon")}
                />
              </NativeWrapper>
            );
          }}
        />
      </View>
    );
  };

  const renderTimeRangeView = () => {
    return <FlatList data={timeRangeArr} keyExtractor={(_, index) => index.toString()} renderItem={({ item }) => renderTimeRangeItem(item)} />;
  };

  const onPressTimeRangeItem = (item: any) => {
    if (item.name === RequestedTime.SPECIFIC_TIME) {
      setCurrentScreen(3);
    } else {
      setCurrentScreen(1);
      callback(SheetState.CLOSED);
      onTimeRangeSelected(item.name);
    }
    accessibility(selectedTimeRange?.length !== 0 ? "tickIcon" : "rightArrowIcon");
  };

  const renderTimeRangeItem = (item: any) => {
    let separatorStyles = styles.viSeparator;
    let timeInfo = item.time;
    if (item.name === RequestedTime.SPECIFIC_TIME && !selectedTimeRange) {
      timeInfo = selectedDateInternal.format("hh:mm a");
    }
    let iconStyles = styles.iconUnselected;
    let rightImage = "chevron-right";
    let showNotSet = false;
    if (selectedTimeRange === item.name || (item.name === RequestedTime.SPECIFIC_TIME && !selectedTimeRange)) {
      iconStyles = styles.iconSelected;
      rightImage = "tick";
    } else if (item.name === RequestedTime.SPECIFIC_TIME) {
      showNotSet = true;
    }
    return (
      <View style={item.name === RequestedTime.SPECIFIC_TIME ? styles.topBorder : {}}>
        <NativeWrapper onPress={() => onPressTimeRangeItem(item)} style={[styles.timeItemContainer, styles.nativeWrapperStyle]}>
          <Text style={styles.txtHead}>
            {item.name === RequestedTime.AM ? item.name + " - In the Morning" : item.name === RequestedTime.PM ? item.name + " - In the Afternoon" : item.name}
          </Text>
          <Text style={styles.txtTimeInfo}>{timeInfo}</Text>
          <CustomIcon style={iconStyles} name={rightImage} {...accessibility(rightImage.includes("tick") ? "tickIcon" : "rightArrowIcon")} />
        </NativeWrapper>
        {showNotSet && <Text style={styles.notSetLabel}>Not set</Text>}
        <View style={separatorStyles} />
      </View>
    );
  };

  return (
    <BottomSheet
      content={
        <View style={styles.contentContainer}>
          <STCHeader
            title={"Request Date & Time"}
            headerContainerStyle={styles.containerStyle}
            titleStyle={styles.titleStyle}
            style={[
              {
                backgroundColor: sheetStateInternal === SheetState.EXPANDED ? Colors.darkBlue : Colors.cloud,
              },
            ]}
            leftItem={
              currentScreen !== 1 ? (
                <Button
                  transparent={true}
                  onPress={() => {
                    setCurrentScreen(prevScreen => prevScreen - (orderType === OrderTypes.PICKUP ? 2 : 1));
                  }}
                  style={styles.buttonStyle}
                  {...accessibility("leftItemBtn")}
                >
                  <CustomIcon style={styles.iconStyle} name={"chevron-left"} />
                </Button>
              ) : undefined
            }
            rightItem={
              <Button
                transparent={true}
                onPress={() => {
                  cancel();
                }}
                {...accessibility("rightItemBtn")}
              >
                <Text style={styles.textCancel}>{"Cancel"}</Text>
              </Button>
            }
          />
          {sheetState !== SheetState.CLOSED && (
            <View style={styles.viewStyle}>
              <Text style={styles.selectDateLabel}>
                {currentScreen === 1 ? "Select Date" : currentScreen === 2 ? "Select Time" : currentScreen === 3 ? "Specific Time" : ""}
              </Text>
              <View style={styles.headerBorder} />
              {currentScreen === 1 && renderDateView()}
              {currentScreen === 2 && renderTimeRangeView()}
              {currentScreen === 3 && renderSpecificTimeView()}
            </View>
          )}
        </View>
      }
      sheetState={sheetStateInternal}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  orderType: state.branchList.selectedOrderType,
});

export default connect(mapStateToProps)(DateSheet);

const styles = StyleSheet.create({
  timeItemContainer: {
    paddingVertical: 18,
    marginLeft: 24,
    paddingRight: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  viSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  specificTimeItemContainer: {
    paddingVertical: 18,
    marginLeft: 24,
    paddingRight: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  specificTimeContainer: { flex: 1, paddingBottom: Platform.select({ ios: 80, android: 40 }) },
  iconSelected: {
    color: Colors.lightBlue,
    fontSize: 18,
  },
  iconUnselected: {
    color: Colors.darkGrey,
    fontSize: 14,
  },
  timeText: {
    flex: 1,
  },
  timeTextUnselected: {
    ...Fonts.style.openSans18Regular,
  },
  timeTextSelected: {
    ...Fonts.style.openSans18Bold,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textCancel: {
    ...Fonts.style.openSans16Regular,
    color: Colors.lightBlue,
  },
  dateBorder: {
    borderWidth: 2,
    borderColor: Colors.lightBlue,
    borderRadius: 8,
    justifyContent: "center",
  },
  headerText: {
    ...Fonts.style.openSansExtraBold28,
    textAlign: "left",
    alignSelf: "stretch",
    flex: 1,
  },
  dayText: {
    ...Fonts.style.openSans18Regular,
    padding: 5,
  },
  dayTextDisabled: {
    ...Fonts.style.openSans18Regular,
    color: Colors.lightGrey,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    padding: 5,
  },
  txtHead: {
    ...Fonts.style.openSans18Regular,
  },
  txtTimeInfo: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
  },
  dayTextSelected: {
    ...Fonts.style.openSans18Regular,
    borderColor: Colors.lightBlue,
    borderWidth: 3,
    borderRadius: 7,
    padding: 5,
  },
  containerStyle: { paddingHorizontal: 20 },
  titleStyle: { ...Fonts.style.openSans18Bold },
  buttonStyle: { paddingRight: 22 },
  iconStyle: {
    fontSize: 18,
    textAlign: "right",
    color: Colors.lightBlue,
  },
  viewStyle: { flex: 1 },
  nativeWrapperStyle: { justifyContent: "space-between", marginVertical: 12 },
  selectDateLabel: {
    ...Fonts.style.openSans18Bold,
    paddingLeft: 24,
    paddingVertical: 18,
  },
  headerBorder: {
    height: 1,
    width: "100%",
    backgroundColor: Colors.grey,
  },
  topBorder: {
    borderTopWidth: 8,
    borderTopColor: Colors.lighterGrey,
  },
  notSetLabel: {
    ...Fonts.style.openSans16,
    marginLeft: 24,
    marginTop: -18,
    marginBottom: 18,
    color: Colors.darkGrey,
    lineHeight: 16,
  },
});
