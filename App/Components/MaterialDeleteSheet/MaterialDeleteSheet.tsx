import { useNavigation } from "@react-navigation/native";
import { Button } from "native-base";
import * as React from "react";
import { useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import LoadingView from "~root/Components/LoadingView";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { useTabBar } from "~root/Lib/QuoteHelper";
import styles from "./MaterialDeleteStyle";

interface OwnProps {
  sheetState: SheetState;
  sheetCloseTapped: () => void;
  showDeletePopUp: () => void;
}

type Props = OwnProps;

const MaterialDeleteSheet: React.SFC<Props> = ({ sheetState, sheetCloseTapped, showDeletePopUp }: Props) => {
  const insets = useSafeAreaInsets();
  const [height, setHeight] = useState(0);
  const navigation = useNavigation();

  React.useEffect(() => {
    if (sheetState === SheetState.OPENED) useTabBar(navigation, "none");
    else useTabBar(navigation, "flex");
  }, [sheetState]);
  return (
    <BottomSheet
      openedSnapPoint={height + insets.bottom + 100}
      content={
        <LoadingView onLayout={e => setHeight(e.nativeEvent.layout.height)} isLoading={false} hideViewOnLoading={false}>
          <STCHeader
            title={"Options"}
            titleStyle={styles.titleStyle}
            style={styles.headerStyle}
            leftItem={
              <Button
                transparent={true}
                onPress={() => {
                  navigation
                    .getParent()
                    ?.getParent()
                    ?.setOptions({
                      tabBarStyle: { display: "flex" },
                    });
                  sheetCloseTapped();
                }}
              >
                <Text style={styles.cancelStyle}>{"Close"}</Text>
              </Button>
            }
          />
          <View style={styles.divider} />
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                sheetCloseTapped();
                showDeletePopUp();
              }}
            >
              <Text style={styles.deleteText}>Delete Stage of Build</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
          </View>
        </LoadingView>
      }
      sheetState={sheetState}
    />
  );
};

export default MaterialDeleteSheet;
