import { Button, Text, View } from "native-base";
import React from "react";
import { Linking, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import CustomIcon from "~root/Components/CustomIcon";
import FbIcon from "~root/Components/FbIcon";
import MainContainer from "~root/Components/MainContainer";
import SmallHeader from "~root/Components/SmallHeader";
import styles from "~root/Containers/MyProfileContainer/MyProfileContainerStyle";
import { BranchResponse, getBranchAddress, getBranchEmail, getBranchGeoCode, getBranchPhone, getDayWiseOpeningHours } from "~root/Lib/BranchHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { BranchDetailsActions } from "~root/Reducers/BranchDetailReducers";
import { Colors } from "~root/Themes";
import AppThemeContext from "~root/Themes/AppThemeContext";
import { Map } from "../Map/Map";
import style from "./BranchDetailStyle";

interface DispatchProps {
  onSelectBranch: (isBranchChanged: boolean) => void;
}

interface StateProps {}

interface OwnProps {}

interface State {}

type Props = OwnProps & State & StateProps & DispatchProps;

const BranchDetail = ({ navigation, onSelectBranch, route }) => {
  const branch = route.params?.branch;
  const dismiss = route.params?.dismiss;
  const onSelectPickupBranch = route.params?.onSelectPickupBranch;
  const hideHeader = route.params?.hideHeader;
  const setBranch = () => {
    onSelectBranch(branch);
    // this.props.navigation.pop();
    dismiss();
    if (onSelectPickupBranch) {
      onSelectPickupBranch();
    }
  };

  const callBranch = () => {
    Linking.openURL(`tel:${getBranchPhone(branch)}`);
  };

  const sendEmail = () => {
    Linking.openURL(`mailto:${getBranchEmail(branch)}`);
  };

  const renderOpeningHours = () => {
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return weekDays.map(day => {
      const status = getDayWiseOpeningHours(branch, day);
      let statusColor = Colors.darkGrey;
      if (status === "Closed") {
        statusColor = Colors.darkRed;
      }
      return (
        <View key={day}>
          <View style={style.smallSeparator} />
          <View style={style.dayOpeningHourView}>
            <Text style={style.mailTxt}>{day}</Text>
            <Text style={[style.mailTxt, { color: statusColor }]}>{status}</Text>
          </View>
        </View>
      );
    });
  };

  return (
    <AppThemeContext.Provider value={"light"}>
      <MainContainer>
        {!hideHeader && (
          <SmallHeader
            title={branch.name}
            navigation={navigation}
            actionItem={
              <Button
                transparent={true}
                onPress={() => {
                  dismiss();
                }}
              >
                <FbIcon name={"ic_close"} style={styles.close} />
              </Button>
            }
          />
        )}
        <ScrollView>
          <Map markerText={branch.name} style={styles} center={getBranchGeoCode(branch)} geoPoint={branch.geoPoint} />
          <View style={[style.main, style.header]}>
            <Text style={style.heading}>Address</Text>
            <View style={style.smallSeparator} />
            <Text style={style.mailTxt}>{getBranchAddress(branch)}</Text>
          </View>
          <View style={styles.separator} />
          <TouchableOpacity onPress={setBranch} {...accessibility("setbranch")} key={"setbranch"}>
            <View style={[style.main, style.header]}>
              <Text style={[style.mailTxt, style.linkItem]}>Set as pickup branch</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.separator} />
          <View>
            <View style={[style.main, style.header]}>
              <Text style={style.heading}>Opening Hours</Text>
              {renderOpeningHours()}
            </View>
          </View>
          <View style={styles.separator} />
          <View style={[style.main, style.header]}>
            <Text style={style.heading}>Contact details</Text>
            <View style={style.smallSeparator} />
          </View>
          <TouchableOpacity onPress={sendEmail} {...accessibility("getBranchEmail")} key={"getBranchEmail"}>
            <View style={[style.main, style.mail]}>
              <CustomIcon name={"email-icon"} style={style.iconStyle} />
              <Text style={style.mailTxt}>{getBranchEmail(branch)}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={callBranch} {...accessibility("callBranch")} key={"callBranch"}>
            <View style={[style.main, style.mail]}>
              <CustomIcon name={"call-icon"} style={style.iconStyle} />
              <Text style={style.mailTxt}>{getBranchPhone(branch)}</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </MainContainer>
    </AppThemeContext.Provider>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  onSelectBranch: (value: BranchResponse) => dispatch(BranchDetailsActions.onSelectBranch(value)),
});

export default connect(null, mapDispatchToProps)(BranchDetail);
