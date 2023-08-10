import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import CustomIcon from "~root/Components/CustomIcon";
import { getBranchName, OrderTypes } from "~root/Lib/BranchHelper";
import { RootState } from "~root/Reducers";
import styles from "./ReviewScreenStyle";

const DistanceTime: React.SFC = () => {
  const { orderType, travelTime, travelDistance, selectedBranch } = useSelector((state: RootState) => ({
    orderType: state.branchList.selectedOrderType,
    travelTime: state.address.addressDistanceDriveTime?.results?.[0]?.value?.drive_time,
    travelDistance: state.address.addressDistanceDriveTime?.results?.[0]?.value?.distance,
    selectedBranch: state.branchList.selectedBranch,
  }));

  return (
    orderType === OrderTypes.STANDARD && (
      <>
        <View style={styles.mainDeliveryOptionsDetailView}>
          <View style={styles.directionIconContainer}>
            <CustomIcon style={styles.directionIcon} name={"directions-icon"} />
          </View>

          <View>
            <View style={styles.travelDistanceContainer}>
              <Text style={styles.travelDistance}>{travelDistance + " km"} </Text>
              <Text style={styles.seperator}>|</Text>
              <Text style={styles.travelTime}>{travelTime + " mins"}</Text>
            </View>
            <Text style={styles.subUser}>{"Branch location: " + getBranchName(selectedBranch)}</Text>
          </View>
        </View>
      </>
    )
  );
};

export default DistanceTime;
