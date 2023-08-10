import { Button } from "native-base";
import * as React from "react";
import { Keyboard, Text, View } from "react-native";
import { connect } from "react-redux";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import ContactNotificationItem from "~root/Components/ContactNotificationItem/ContactNotificationItem";
import FbIcon from "~root/Components/FbIcon";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { OrderTypes, SMSFlags, SMSFlagsDescription, SMSLabels } from "~root/Lib/BranchHelper";
import { accessibility, addOcclusionForTextFields, removeOcclusionFromTextFields, tagScreenName } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import { Colors } from "~root/Themes";
import styles from "./NotificationsSwitchSheetStyles";

interface OwnProps {
  sheetState: SheetState;
  navigation: any;
  onUpdateContact: (contactTemp: any) => void;
  contact?: any;
}
interface StateProps {
  orderType: OrderTypes;
}
type Props = OwnProps & StateProps;

const NotificationsSwitchSheet: React.SFC<Props> = ({ navigation, sheetState, onUpdateContact, contact, orderType }: Props) => {
  const [, updateState] = React.useState();
  const forceReRender = React.useCallback(() => updateState({}), []);
  const [sheetStateInternal, setSheetStateInternal] = React.useState(sheetState);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(false);
  const [notifications, setNotifications] = React.useState({});

  React.useEffect(() => {
    setSheetStateInternal(sheetState);

    let notify = {};
    if (orderType === OrderTypes.PICKUP) {
      notify[SMSFlags.READY_FOR_PICKUP] = {
        label: SMSLabels.READY_FOR_PICKUP,
        desc: SMSFlagsDescription.READY_FOR_PICKUP,
        value: contact?.smsFlags?.includes(SMSFlags.READY_FOR_PICKUP),
      };
      setNotifications(notify);
    } else if (orderType === OrderTypes.STANDARD) {
      notify[SMSFlags.SCHEDULE_FOR_DELIVERY] = {
        label: SMSLabels.SCHEDULE_FOR_DELIVERY,
        desc: SMSFlagsDescription.SCHEDULE_FOR_DELIVERY,
        value: contact?.smsFlags?.includes(SMSFlags.SCHEDULE_FOR_DELIVERY),
      };

      (notify[SMSFlags.LEFT_BRANCH] = {
        label: SMSLabels.LEFT_BRANCH,
        desc: SMSFlagsDescription.LEFT_BRANCH,
        value: contact?.smsFlags?.includes(SMSFlags.LEFT_BRANCH),
      }),
        (notify[SMSFlags.ON_ITS_WAY] = {
          label: SMSLabels.ON_ITS_WAY,
          desc: SMSFlagsDescription.ON_ITS_WAY,
          value: contact?.smsFlags?.includes(SMSFlags.ON_ITS_WAY),
        }),
        (notify[SMSFlags.MISSED_DELIVERY] = {
          label: SMSLabels.MISSED_DELIVERY,
          desc: SMSFlagsDescription.MISSED_DELIVERY,
          value: contact?.smsFlags?.includes(SMSFlags.MISSED_DELIVERY),
        }),
        setNotifications(notify);
      Object.keys(notify).map(key => {
        notify[key].value && !isNotificationsEnabled ? setIsNotificationsEnabled(true) : undefined;
      });
    }
  }, [sheetState]);

  React.useEffect(() => {
    if (sheetStateInternal === SheetState.EXPANDED) {
      tagScreenName("Notifications Switch Sheet");
      addOcclusionForTextFields();
    }
  }, [sheetStateInternal]);

  const getEnabledNotifications = () => {
    let enabledNotifications: any[] = [];
    Object.keys(notifications).map(key => {
      notifications[key].value ? enabledNotifications.push(key) : undefined;
    });
    return enabledNotifications;
  };
  const closeSheetTapped = () => {
    Keyboard.dismiss();
    onUpdateContact({
      ...contact,
      smsFlags: getEnabledNotifications(),
    });
    setSheetStateInternal(SheetState.CLOSED);
    removeOcclusionFromTextFields();
  };

  return (
    <>
      <BottomSheet
        content={
          <View style={styles.contentContainer}>
            <STCHeader
              title={"Notifications"}
              titleStyle={styles.headerTitleStyle}
              style={[
                styles.headerStyle,
                {
                  backgroundColor: sheetStateInternal === SheetState.EXPANDED ? Colors.darkBlue : Colors.cloud,
                },
              ]}
              leftItem={
                <Button transparent={true} onPress={closeSheetTapped} {...accessibility("leftItemBtn")}>
                  <FbIcon name={"ic_back"} style={styles.close} />
                </Button>
              }
            />
            {orderType == OrderTypes.STANDARD && (
              <View>
                <ContactNotificationItem
                  showIcon
                  isNotificationsEnabled={isNotificationsEnabled}
                  label={"Allow all notifications"}
                  desc={""}
                  onChange={value => {
                    Object.keys(notifications).forEach(key => {
                      notifications[key].value = value;
                    });
                    setNotifications(notifications);
                    setIsNotificationsEnabled(value);
                    forceReRender();
                  }}
                />
                <View style={styles.headerBorderStyle} />
              </View>
            )}
            <Text style={styles.headerTitle}>{orderType == OrderTypes.PICKUP ? "Pickup notifications" : "Delivery notifications"}</Text>
            <View style={styles.subSeparator} />
            {Object.keys(notifications).map(notificationItemKey => {
              return (
                <ContactNotificationItem
                  key={notificationItemKey}
                  isNotificationsEnabled={notifications[notificationItemKey].value}
                  label={notifications[notificationItemKey].label}
                  desc={notifications[notificationItemKey].desc}
                  onChange={value => {
                    notifications[notificationItemKey].value = value;
                    setNotifications(notifications);
                    let isNotificationsEnabled = false;
                    Object.keys(notifications).forEach(key => {
                      notifications[key].value ? (isNotificationsEnabled = true) : undefined;
                    });
                    setIsNotificationsEnabled(isNotificationsEnabled);
                    forceReRender();
                  }}
                />
              );
            })}
          </View>
        }
        sheetState={sheetStateInternal}
      />
    </>
  );
};
const mapStateToProps = (state: RootState): StateProps => {
  return {
    orderType: state.branchList.selectedOrderType,
  };
};

export default connect(mapStateToProps)(NotificationsSwitchSheet);
