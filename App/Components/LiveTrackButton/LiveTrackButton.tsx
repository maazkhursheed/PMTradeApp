import * as R from "ramda";
import * as React from "react";
import { View, ViewStyle } from "react-native";
import { connect } from "react-redux";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import MapWebViewSwitchSheet from "~root/Components/MapWebViewSwitchSheet";
import SmallButton from "~root/Components/SmallButton";
import { isTrackingEligible as isTrackingFunction } from "~root/Lib/DataHelper";
import { useAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import styles from "./LiveTrackButtonStyle";

interface OwnProps {
  style?: ViewStyle;
}
interface StateProps {
  isTrackingEligible: boolean;
  url?: string;
}

type Props = OwnProps & StateProps;

const LiveTrackButton: React.FC<Props> = ({ style, isTrackingEligible, url }: Props) => {
  const [sheetState, setSheetState] = React.useState(SheetState.CLOSED);

  const liveTrackingURL = React.useCallback(() => {
    setSheetState(SheetState.EXPANDED);
  }, []);

  // @ts-ignore
  const { append } = useAppender();

  React.useEffect(() => {
    append(<MapWebViewSwitchSheet url={url} title={url} sheetState={sheetState} closeSheet={() => setSheetState(SheetState.CLOSED)} />, "WebViewSheet", 0);
  }, [sheetState, url]);

  return isTrackingEligible ? (
    <>
      <View style={style}>
        <SmallButton textStyle={styles.liveTrackTextStyle} onPress={liveTrackingURL} btnText={"Live track"} />
      </View>
    </>
  ) : null;
};

const mapStateToProps = (state: RootState): StateProps => ({
  isTrackingEligible: isTrackingFunction(state.orderDetails.data),
  url: R.pathOr("", ["original", "trackingDetails", "trackingURL"], state.orderDetails.data),
});

export default connect(mapStateToProps)(LiveTrackButton);
