import { Button } from "native-base";
import * as React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import FbIcon from "~root/Components/FbIcon";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { OrderTypes } from "~root/Lib/BranchHelper";
import { accessibility, addOcclusionForTextFields, removeOcclusionFromTextFields, tagScreenName } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import { Colors, Fonts } from "~root/Themes";
import BranchDetail from "../BranchDetail/BranchDetail";
import styles from "./BranchDetailsSheetStyles";

interface OwnProps {
  sheetState: SheetState;
  closeSheet: () => void;
  closeAll: () => void;
  onSelectPickupBranch?: () => void;
  branchOpened: any;
}

interface DispatchProps {}

interface StateProps {
  orderType: OrderTypes;
}

type Props = OwnProps & StateProps & DispatchProps;

const BranchDetailsSheet: React.SFC<Props> = ({ sheetState, closeSheet, closeAll, branchOpened, onSelectPickupBranch }: Props) => {
  React.useEffect(() => {
    if (sheetState === SheetState.EXPANDED) {
      tagScreenName("Branch Details Screen");
      addOcclusionForTextFields();
    }
  }, [sheetState]);
  return (
    <>
      <BottomSheet
        content={
          <View style={styles.contentContainer}>
            <STCHeader
              title={branchOpened?.name}
              titleStyle={{ ...Fonts.style.openSans18Bold }}
              style={[
                styles.headerStyle,
                {
                  backgroundColor: sheetState === SheetState.EXPANDED ? Colors.darkBlue : Colors.cloud,
                },
              ]}
              leftItem={
                <Button
                  transparent={true}
                  onPress={() => {
                    removeOcclusionFromTextFields();
                    closeSheet();
                  }}
                  {...accessibility("leftItemBtn")}
                >
                  <FbIcon name={"ic_back"} style={styles.close} />
                </Button>
              }
            />
            {branchOpened && (
              <BranchDetail
                route={{
                  params: {
                    branch: branchOpened,
                    dismiss: () => {
                      closeSheet();
                      closeAll();
                    },
                    onSelectPickupBranch: onSelectPickupBranch,
                    hideHeader: true,
                  },
                }}
              />
            )}
          </View>
        }
        sheetState={sheetState}
      />
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    orderType: state.branchList.selectedOrderType,
  };
};

export default connect(mapStateToProps)(BranchDetailsSheet);
