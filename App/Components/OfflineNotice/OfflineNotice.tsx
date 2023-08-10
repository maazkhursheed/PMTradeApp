import NetInfo from "@react-native-community/netinfo";
import { Text } from "native-base";
import * as React from "react";
import { View } from "react-native";
import styles from "~root/Components/OfflineNotice/OfflineNoticeStyle";
import { netErrMsg } from "~root/Lib/AlertsHelper";
import { accessibility } from "~root/Lib/DataHelper";

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText} {...accessibility("offlineErrorLabel")}>
        {netErrMsg}
      </Text>
    </View>
  );
}

class OfflineNotice extends React.PureComponent {
  public state = {
    isConnected: true,
  };

  private unsubscription: any;

  public componentDidMount() {
    NetInfo.fetch().then(state => {
      this.setState({ isConnected: state.isConnected });
    });

    this.unsubscription = NetInfo.addEventListener(state => {
      this.setState({ isConnected: state.isConnected });
    });
  }

  public componentWillUnmount() {
    this.unsubscription();
  }

  public render() {
    if (!this.state.isConnected) {
      return <MiniOfflineSign />;
    }
    return null;
  }
}

export default OfflineNotice;
