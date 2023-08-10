import { Button } from "native-base";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import LoadingView from "~root/Components/LoadingView";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import STCHeader from "../STCHeader/STCHeader";
import styles from "./DeleteMylistSheetStyle";

interface OwnProps {
  sheetState: SheetState;
  sheetCloseTapped: () => void;
  navigation: any;
  renameListTapped: () => void;
  deleteTapped: () => void;
}

type Props = OwnProps;

const DeleteMylistSheet: React.SFC<Props> = ({ sheetState, sheetCloseTapped, renameListTapped, deleteTapped }: Props) => {
  const insets = useSafeAreaInsets();

  const [height, setHeight] = React.useState(0);
  const { isLoading } = useSelector((state: RootState) => ({
    isLoading: state.quotes.fetching,
  }));

  return (
    <>
      <BottomSheet
        openedSnapPoint={height + insets.bottom + 50}
        content={
          <>
            <LoadingView onLayout={e => setHeight(e.nativeEvent.layout.height)} style={styles.loadingView} isLoading={isLoading} hideViewOnLoading={false}>
              <STCHeader
                title={"List Options"}
                titleStyle={styles.titleStyle}
                leftItem={
                  <Button transparent={true} onPress={sheetCloseTapped} {...accessibility("closeButton")}>
                    <Text style={styles.cancelStyle}>{"Close"}</Text>
                  </Button>
                }
              />
              <View style={styles.container}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    sheetCloseTapped();
                    renameListTapped();
                  }}
                >
                  {<Text style={styles.renameText}>Rename list</Text>}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    sheetCloseTapped();
                    deleteTapped();
                  }}
                >
                  {<Text style={styles.buttonText}>Delete</Text>}
                </TouchableOpacity>
              </View>
            </LoadingView>
          </>
        }
        sheetState={sheetState}
      />
    </>
  );
};
export default DeleteMylistSheet;
