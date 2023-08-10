import { Button } from "native-base";
import * as React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { WebView } from "react-native-webview";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { accessibility } from "~root/Lib/DataHelper";
import { Colors } from "~root/Themes";
import styles from "./MapWebViewSwitchSheetStyles";

interface OwnProps {
  url?: string;
  title?: string;
  sheetState: SheetState;
  closeSheet?: () => void;
}

type Props = OwnProps;

const MapWebViewSwitchSheet: React.FunctionComponent<Props> = ({ url = "", title = "", sheetState, closeSheet }: Props) => {
  const insets = useSafeAreaInsets();
  const webviewRef = React.useRef<WebView>(null);
  const refresh = React.useCallback(() => webviewRef.current?.reload(), [webviewRef]);
  return (
    <BottomSheet
      content={
        <View style={[styles.contentContainer, { paddingBottom: insets.bottom }]}>
          <STCHeader
            title={title}
            titleStyle={styles.headerTitleStyle}
            style={[
              styles.headerStyle,
              {
                backgroundColor: sheetState === SheetState.EXPANDED ? Colors.darkBlue : Colors.cloud,
              },
            ]}
            leftItem={
              <Button transparent={true} onPress={closeSheet} {...accessibility("leftItemBtn")}>
                <Text style={styles.cancelStyle}>{"Cancel"}</Text>
              </Button>
            }
            rightItem={
              <Button style={{ alignSelf: "flex-end" }} transparent={true} onPress={refresh} {...accessibility("rightItemBtn")}>
                <FontAwesome5Icon style={styles.reloadStyle} name={"redo"} />
              </Button>
            }
          />
          {sheetState !== SheetState.CLOSED && <WebView ref={webviewRef} source={{ uri: url }} />}
        </View>
      }
      sheetState={sheetState}
    />
  );
};

export default MapWebViewSwitchSheet;
