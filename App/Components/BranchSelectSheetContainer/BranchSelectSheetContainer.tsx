import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { forwardRef } from "react";
import { TouchableOpacity } from "react-native";
import { useAppender } from "~root/Provider/Appender";
import { SheetState } from "../BottomSheet/BottomSheet";
import BranchSelectSheet from "../BranchSelectSheet";

interface OwnProps {
  product?: item;
  onSelectPickupBranch?: () => void;
  onPress?: () => void;
  closeAll?: () => void;
  isFromAllBranches?: boolean;
  selectedBranch?: (branch: any) => void;
  children?: any;
  isConstrained;
}

interface DispatchProps {}

interface StateProps {}
type Props = StateProps & DispatchProps & OwnProps;

const BranchSelectSheetContainer = (
  { isConstrained, children, product, onSelectPickupBranch, onPress, closeAll, isFromAllBranches, selectedBranch }: Props,
  ref: any,
) => {
  const [branchSelectSheet, setBranchSelectSheet] = React.useState(SheetState.CLOSED);
  const navigation = useNavigation();
  const { append } = useAppender();

  React.useImperativeHandle(ref, () => ({
    openSheet: () => {
      if (!isConstrained) {
        setBranchSelectSheet(SheetState.EXPANDED);
      }
    },
  }));

  React.useEffect(() => {
    append(
      <BranchSelectSheet
        isFromAllBranches={isFromAllBranches}
        navigation={navigation}
        callback={(bottomSheetState: SheetState) => setBranchSelectSheet(bottomSheetState)}
        closeAll={() => {
          setBranchSelectSheet(SheetState.CLOSED);
          if (closeAll) {
            closeAll();
          }
        }}
        sheetState={branchSelectSheet}
        product={product}
        onSelectPickupBranch={() => {
          if (onSelectPickupBranch) {
            onSelectPickupBranch();
          }
        }}
        selectedBranch={branch => {
          setBranchSelectSheet(SheetState.CLOSED);
          if (selectedBranch) {
            selectedBranch(branch);
          }
        }}
      />,
      "BranchSelectSheet",
      0,
    );
  }, [branchSelectSheet, product, isFromAllBranches, navigation]);

  return (
    <TouchableOpacity
      onPress={() => {
        if (!isConstrained) {
          setBranchSelectSheet(SheetState.EXPANDED);
          if (onPress) {
            onPress();
          }
        }
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

export default forwardRef(BranchSelectSheetContainer);
