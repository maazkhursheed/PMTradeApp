import { useRoute } from "@react-navigation/native";
import moment, { Moment } from "moment";
import R from "ramda";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "~root/Components/Card";
import CardSectionHeader from "~root/Components/Card/CardSectionHeader";
import { DateTimeSelector } from "~root/Components/DateTimeSelector";
import { OrderTypes } from "~root/Lib/BranchHelper";
import { incrementDayForDeliveryOrPickup } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import styles from "./FulfilmentDetailsContainerStyles";

export interface OwnProps {
  selectedTimeRange: any;
  earliestDate: any;
  onDateSelected: (data: any) => void;
  onTimeSelected: (time: Moment) => void;
  onTimeRangeSelected: (timeRangeStr: string) => void;
}

type Props = OwnProps;

const FulfillmentDateTimeSelector: React.SFC<Props> = ({ selectedTimeRange, onDateSelected, onTimeSelected, earliestDate, onTimeRangeSelected }: Props) => {
  const route = useRoute();

  const { orderType, eligibility } = useSelector((state: RootState) => ({
    orderType: state.branchList.selectedOrderType,
    eligibility: state.cart.eligibility,
  }));

  const [earliestSelectedDate] = useState(incrementDayForDeliveryOrPickup(route.params?.earliestDate, orderType));
  const [previousSelectedDate, setPreviousSelectedDate] = useState(incrementDayForDeliveryOrPickup(route.params?.earliestDate, orderType));

  const getEarliestDateParam = useCallback(() => {
    if (orderType === OrderTypes.PICKUP && eligibility) {
      const elilgibilityArr: any = R.filter(R.propEq("deliveryType", "PickUp"))(eligibility);
      if (elilgibilityArr) {
        return moment(elilgibilityArr[0].earliestDate + " " + elilgibilityArr[0].earliestTime, "yyyy-MM-DD hh:mm A");
      }
      return earliestSelectedDate;
    } else {
      return earliestSelectedDate;
    }
  }, [earliestSelectedDate, eligibility, orderType]);

  return (
    <>
      <Card style={styles.cardStyle}>
        <CardSectionHeader text={"Date and time"} />
        <DateTimeSelector
          onClick={() => setPreviousSelectedDate(earliestSelectedDate)}
          selectedDate={earliestDate}
          previousSelectedDate={previousSelectedDate}
          getEarliestDateParam={getEarliestDateParam}
          isDisable={orderType === OrderTypes.EXPRESS}
          orderType={orderType}
          selectedTimeRange={selectedTimeRange}
          onDateSelected={onDateSelected}
          onTimeSelected={onTimeSelected}
          onTimeRangeSelected={onTimeRangeSelected}
        />
      </Card>
    </>
  );
};

export default FulfillmentDateTimeSelector;
