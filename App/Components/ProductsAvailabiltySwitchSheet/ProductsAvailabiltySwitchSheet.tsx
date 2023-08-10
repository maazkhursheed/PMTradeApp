import { Button } from "native-base";
import * as React from "react";
import { FlatList, Text, View } from "react-native";
import { connect } from "react-redux";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import ProductAvailabilityItem from "~root/Components/ProductAvailabilityItem";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { BranchResponse, sanitizeBranches } from "~root/Lib/BranchHelper";
import { accessibility, addOcclusionForTextFields, removeOcclusionFromTextFields, tagScreenName } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import { Colors } from "~root/Themes";
import styles from "./ProductsAvailabiltySwitchSheetStyles";

interface OwnProps {
  sheetState: SheetState;
  closeSheet: () => void;
  changeTapped: () => void;
}

interface DispatchProps {}

interface StateProps {
  selectedBranch: BranchResponse;
  cartDetailData: any;
}

type Props = OwnProps & StateProps & DispatchProps;

const ProductsAvailabilitySwitchSheet: React.SFC<Props> = ({ sheetState, closeSheet, selectedBranch, changeTapped, cartDetailData }: Props) => {
  const [sheetStateInternal, setSheetStateInternal] = React.useState(sheetState);

  React.useEffect(() => {
    setSheetStateInternal(sheetState);
  }, [sheetState]);

  React.useEffect(() => {
    if (sheetStateInternal === SheetState.EXPANDED) {
      tagScreenName("Product Availability Screen");
      addOcclusionForTextFields();
    }
  }, [sheetStateInternal]);

  const closeSheetTapped = () => {
    closeSheet();
    setSheetStateInternal(SheetState.CLOSED);
    removeOcclusionFromTextFields();
  };

  const onChangeTapped = () => {
    closeSheet();
    setSheetStateInternal(SheetState.CLOSED);
    changeTapped();
  };

  return (
    <>
      <BottomSheet
        content={
          <View style={styles.contentContainer}>
            <STCHeader
              title={selectedBranch?.name}
              titleStyle={styles.headerTitleStyle}
              style={[
                styles.headerStyle,
                {
                  backgroundColor: sheetStateInternal === SheetState.EXPANDED ? Colors.darkBlue : Colors.cloud,
                },
              ]}
              leftItem={
                <Button transparent={true} onPress={closeSheetTapped} {...accessibility("leftItemBtn")}>
                  <Text style={styles.cancelStyle}>{"Cancel"}</Text>
                </Button>
              }
              rightItem={
                <Button onPress={onChangeTapped} transparent={true} {...accessibility("rightItemBtn")}>
                  <Text style={styles.changeText}>{"Change"}</Text>
                </Button>
              }
            />
            <FlatList
              data={cartDetailData.entries}
              renderItem={({ item }) => <ProductAvailabilityItem item={item} />}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        }
        sheetState={sheetStateInternal}
      />
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  selectedBranch: sanitizeBranches([state?.branchList?.selectedBranch])[0],
  cartDetailData: state?.cart?.userCartDetail,
});

export default connect(mapStateToProps)(ProductsAvailabilitySwitchSheet);
