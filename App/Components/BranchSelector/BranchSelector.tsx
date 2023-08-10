import * as R from "ramda";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import ProductsAvailabilitySwitchSheet from "~root/Components/ProductsAvailabiltySwitchSheet/ProductsAvailabiltySwitchSheet";
import { outOfStockMessage } from "~root/Lib/AlertsHelper";
import { BranchResponse, getBranchAddress, sanitizeBranches } from "~root/Lib/BranchHelper";
import { renameKeys } from "~root/Lib/CommonHelper";
import { accessibility, isProductStockAvailable } from "~root/Lib/DataHelper";
import { mergeCoordinate } from "~root/Lib/MapsHelper";
import { useCashCustomerStatus } from "~root/Lib/QuoteHelper";
import { useAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { SheetState } from "../BottomSheet/BottomSheet";
import BranchSelectSheetContainer from "../BranchSelectSheetContainer/BranchSelectSheetContainer";
import CustomIcon from "../CustomIcon";
import FbIcon from "../FbIcon";
import LoadingView from "../LoadingView";
import style from "./BranchSelectorStyle";

interface OwnProps {
  isBranchChanged: boolean;
  fetchingCartDetail: boolean;
  checkingEligibility: boolean;
  cartDetailData: any;
}

interface DispatchProps {}

interface StateProps {
  geocode: Region;
  selectedBranch: BranchResponse;
}
type Props = StateProps & DispatchProps & OwnProps;

const BranchSelector: React.SFC<Props> = ({ geocode, selectedBranch, isBranchChanged, fetchingCartDetail, checkingEligibility, cartDetailData }: Props) => {
  const [markerLayout, setMarkerLayout] = React.useState(undefined);
  const center = {
    x: markerLayout ? -(markerLayout.width / 2) + 10 : 0,
    y: markerLayout ? -markerLayout.height / 2 : 0,
  };
  const branchSelectorRef = React.useRef(undefined);
  const { CashCustomerStatus } = useCashCustomerStatus();
  const [productsAvailabiltySheet, setProductsAvailabiltySheet] = React.useState(SheetState.CLOSED);
  const { append } = useAppender();

  React.useEffect(() => {
    append(
      <ProductsAvailabilitySwitchSheet
        sheetState={productsAvailabiltySheet}
        closeSheet={() => setProductsAvailabiltySheet(SheetState.CLOSED)}
        changeTapped={() => {
          setProductsAvailabiltySheet(SheetState.CLOSED);
          setTimeout(() => branchSelectorRef.current?.openSheet(), 0);
        }}
      />,
      "ProductsAvailabilitySwitchSheet",
      0,
    );
  }, [productsAvailabiltySheet]);

  let outOfStockCount = 0;
  cartDetailData?.entries?.map((item: any) => {
    const stock = R.compose(
      renameKeys({
        pmStockQuantity: "Quantity",
        statusCode: "StatusCode",
      }),
      R.prop("stock"),
    )(item.product);
    if (!isProductStockAvailable(stock)) {
      outOfStockCount += 1;
    } else if (item.decimalQty > parseFloat(stock.Quantity)) {
      outOfStockCount += 1;
    }
  });

  return (
    <>
      {isBranchChanged && (
        <LoadingView
          isLoading={fetchingCartDetail || checkingEligibility}
          hideViewOnLoading={true}
          style={{
            minHeight: fetchingCartDetail || checkingEligibility ? 40 : 0,
          }}
        >
          {outOfStockCount > 0 && (
            <TouchableOpacity
              onPress={() => {
                setProductsAvailabiltySheet(SheetState.EXPANDED);
              }}
            >
              <View style={style.viInfo}>
                <View>
                  <Text style={style.txtProductAvailability}>{"Product availability changed"}</Text>
                  <Text style={style.txtAvailability}>{`(${outOfStockCount}) products ${outOfStockMessage.toLocaleLowerCase()}`}</Text>
                </View>
                <CustomIcon name={"info"} style={style.infoToast} />
              </View>
              <View style={style.separator} />
            </TouchableOpacity>
          )}
        </LoadingView>
      )}
      <View style={style.container}>
        <View style={style.mapAndInfoContainer}>
          <View style={style.mapviewContainer}>
            <MapView style={style.mapView} initialRegion={geocode} region={geocode} scrollEnabled={false} minZoomLevel={16}>
              <Marker
                onLayout={e => {
                  setMarkerLayout(e.nativeEvent.layout);
                }}
                coordinate={geocode}
                style={style.markerContainer}
                centerOffset={center}
              >
                <View style={style.markerView}>
                  <FbIcon name={"ic_marker"} style={style.marker} />
                </View>
              </Marker>
            </MapView>
          </View>
          <View style={style.branchInfoContainer}>
            <Text style={style.branchNameStyle}>{selectedBranch?.name}</Text>
            <Text style={style.branchAddressStyle}>{getBranchAddress(selectedBranch)}</Text>
            <View style={style.branchStatusContainer}>
              <Text style={style.openTextStyle}>{selectedBranch.statusArr[0]}</Text>
              <View style={style.branchStatusContainer}>
                <View style={style.dot} />
                <Text style={style.branchStatusStyle}>{`Closes ${selectedBranch.statusArr[2]}`}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {!CashCustomerStatus && (
        <BranchSelectSheetContainer ref={branchSelectorRef}>
          <Text {...accessibility("ChangeBranchText")} style={style.changeBranchStyle}>
            {"Change Branch"}
          </Text>
        </BranchSelectSheetContainer>
      )}
    </>
  );
};
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({});
const mapStateToProps = (state: RootState): StateProps => ({
  geocode: mergeCoordinate(state.branchList.selectedBranch.geoPoint),
  selectedBranch: sanitizeBranches([state.branchList.selectedBranch])[0],
});
export default connect(mapStateToProps, mapDispatchToProps)(BranchSelector);
