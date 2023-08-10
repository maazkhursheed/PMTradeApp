import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import CardSectionHeader from "~root/Components/Card/CardSectionHeader";
import CustomIcon from "~root/Components/CustomIcon";
import { OrderTypes } from "~root/Lib/BranchHelper";
import { RootState } from "~root/Reducers";
import { Colors, Fonts } from "../../Themes";

const FulfilmentLocation: React.SFC = () => {
  const { branchName, travelTime, travelDistance, orderType } = useSelector((state: RootState) => ({
    branchName: state.branchList.selectedBranch.name,
    travelTime: state.address.addressDistanceDriveTime?.results?.[0]?.value?.drive_time,
    travelDistance: state.address.addressDistanceDriveTime?.results?.[0]?.value?.distance,
    orderType: state.branchList.selectedOrderType,
  }));

  return (
    <>
      {orderType === OrderTypes.STANDARD && (
        <View style={styles.container}>
          <CardSectionHeader text="Fulfilment location" />
          <View style={styles.content}>
            <CustomIcon name={"store"} style={styles.icon} />

            <View>
              <Text style={Fonts.style.openSans18Regular}>{branchName}</Text>
              {travelDistance && (
                <View style={styles.content}>
                  <Text style={styles.label}>{"Distance"}</Text>
                  <Text style={styles.value}>{travelDistance + " km"}</Text>
                  <Text style={styles.label}>{"Travel time"}</Text>
                  <Text style={styles.value}>{travelTime + " mins"}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default FulfilmentLocation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 18,
    paddingTop: 24,
    marginBottom: 8,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  distanceTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    color: Colors.darkGrey,
    fontSize: 28,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  label: {
    ...Fonts.style.openSans14,
    marginRight: 10,
    color: Colors.darkGrey,
  },
  value: {
    ...Fonts.style.openSans14,
    marginRight: 20,
    color: Colors.greenCheck,
  },
});
