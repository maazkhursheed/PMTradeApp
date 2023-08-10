import * as React from "react";
import { Switch, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import CustomIcon from "../CustomIcon";
import styles from "./ContactNotificationItemStyle";

interface OwnProps {
  isNotificationsEnabled: boolean;
  label: string;
  desc: string;
  onChange: (value: any) => void;
  showIcon: boolean;
}

interface DispatchProps {}

interface StateProps {}

type Props = StateProps & DispatchProps & OwnProps;

const ContactNotificationItem: React.SFC<Props> = ({ isNotificationsEnabled, label, desc, onChange, showIcon }: Props) => {
  return (
    <View>
      <View style={styles.viRow}>
        {showIcon && <CustomIcon name={"message"} style={styles.notificationIconStyle} />}
        <View style={{ width: "86%", marginRight: showIcon ? -44 : 0 }}>
          <Text style={styles.txtNotification}>{label}</Text>
          {desc !== "" && <Text style={styles.txtDesc}>{desc}</Text>}
        </View>
        <Switch
          trackColor={{ false: Colors.lightGrey, true: Colors.greenCheck }}
          thumbColor={Colors.white}
          onValueChange={onChange}
          value={isNotificationsEnabled}
        />
      </View>
      <View style={styles.subSeparator} />
    </View>
  );
};
export default ContactNotificationItem;
