import { Text } from "native-base";
import * as React from "react";
import { ActivityIndicator, View } from "react-native";
import { connect } from "react-redux";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import styles from "./LoaderComponentStyles";

interface OwnProps {}

interface StateProps {
  loading: boolean;
}

type Props = OwnProps & StateProps;

const LoaderComponent: React.SFC<Props> = ({ loading }: Props) =>
  !loading ? null : (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} />
      <Text style={styles.text} {...accessibility("loadingTextLabel")}>
        Loading...
      </Text>
    </View>
  );

const mapStateToProps = (state: RootState): StateProps => ({
  loading:
    state.login.fetching ||
    state.orderDetails.fetching ||
    state.email.fetching ||
    state.connectTrade.fetching ||
    state.editPermission.fetching ||
    state.login.checkingLogin ||
    state.orderJourney.fetching ||
    state.stcReviewOrder.fetching ||
    state.orderHistory.fetching ||
    state.stcReviewOrder.waitingForEvent ||
    state.stcConnectTrade.fetching,
});

export default connect(mapStateToProps)(LoaderComponent);
