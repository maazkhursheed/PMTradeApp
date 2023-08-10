import { Button } from "native-base";
import * as React from "react";
import { Text, View } from "react-native";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import FbIcon from "~root/Components/FbIcon";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { accessibility, addOcclusionForTextFields, removeOcclusionFromTextFields, tagScreenName } from "~root/Lib/DataHelper";
import { Colors } from "~root/Themes";
import AllBranchesList from "../AllBranchesList";
import BranchDetailsSheet from "../BranchDetailsSheet";
import BranchesList from "../BranchesList";
import styles from "./BranchSelectSheetStyle";

interface OwnProps {
  sheetState: SheetState;
  closeAll: () => void;
  callback: any;
  navigation: any;
  onSuccess?: (name: string) => void;
  isFromAllBranches?: boolean;
  selectedBranch?: (branch: any) => void;
  product?: any;
  onSelectPickupBranch?: () => void;
}

const BranchSelectSheet = ({ product, onSelectPickupBranch, sheetState, isFromAllBranches, closeAll, selectedBranch }: OwnProps) => {
  const [branchDetailsSheet, setBranchDetailsSheet] = React.useState(SheetState.CLOSED);
  const [branchOpened, setBranchOpened] = React.useState(undefined);

  React.useEffect(() => {
    if (sheetState === SheetState.EXPANDED) {
      tagScreenName(`"${isFromAllBranches ? "Select branch Screen" : "Branches Screen"}"`);
      addOcclusionForTextFields();
    }
  }, [isFromAllBranches, sheetState]);

  const backButtonClick = React.useCallback(() => {
    removeOcclusionFromTextFields();
    closeAll();
  }, [closeAll]);

  const setBranch = React.useCallback(branch => {
    setBranchDetailsSheet(SheetState.EXPANDED);
    setBranchOpened(branch);
  }, []);

  const closeSheet = React.useCallback(() => {
    setBranchDetailsSheet(SheetState.CLOSED);
    setBranchOpened(undefined);
  }, []);

  const onSelectPickup = React.useCallback(() => {
    setTimeout(() => {
      if (onSelectPickupBranch) {
        onSelectPickupBranch();
      }
    }, 0);
  }, [onSelectPickupBranch]);

  const closeAllActions = React.useCallback(() => {
    setTimeout(() => closeAll(), 0);
  }, [closeAll]);

  return (
    <BottomSheet
      content={
        <View style={styles.containerStyle}>
          <STCHeader
            title={isFromAllBranches ? "Select branch" : "Branches"}
            titleStyle={styles.titleStyle}
            style={[
              styles.headerStyle,
              {
                backgroundColor: sheetState === SheetState.EXPANDED ? Colors.darkBlue : Colors.cloud,
              },
            ]}
            leftItem={
              isFromAllBranches && (
                <Button transparent={true} onPress={backButtonClick} {...accessibility("backIconBtn")}>
                  <FbIcon name={"ic_back"} style={styles.back} />
                </Button>
              )
            }
            rightItem={
              !isFromAllBranches && (
                <Button transparent={true} onPress={closeAll} {...accessibility("closeIconBtn")}>
                  <Text style={styles.doneStyle}>{"Close"}</Text>
                </Button>
              )
            }
          />
          {isFromAllBranches ? (
            <AllBranchesList selectedBranch={selectedBranch} />
          ) : (
            <BranchesList product={product} onSelectPickupBranch={onSelectPickupBranch} onBranchItemPress={setBranch} />
          )}
          <BranchDetailsSheet
            sheetState={branchDetailsSheet}
            closeSheet={closeSheet}
            closeAll={closeAllActions}
            branchOpened={branchOpened}
            onSelectPickupBranch={onSelectPickup}
          />
        </View>
      }
      sheetState={sheetState}
    />
  );
};

export default BranchSelectSheet;
