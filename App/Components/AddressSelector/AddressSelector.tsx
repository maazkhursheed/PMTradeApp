import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { accessibility } from "~root/Lib/DataHelper";
import { useAppender } from "~root/Provider/Appender";
import { RootState } from "../../Reducers";
import { AddressActions } from "../../Reducers/AddressReducers";
import AddressAndMapDisplay from "../AddressAndMapDisplay/AddressAndMapDisplay";
import AddressSelectSheet from "../AddressSelectSheet";
import { SheetState } from "../BottomSheet/BottomSheet";
import CustomIcon from "../CustomIcon";
import LoadingView from "../LoadingView";
import style from "./AddressSelectorStyle";

interface OwnProps {
  addressLine1: string;
  addressLine2: string;
  fetchingAddress: boolean;
  deliveryAddress?: any;
  requestGeoCode: (address: string, callBackSuccess: () => void) => void;
  setDistanceTime?: boolean;
}

interface DispatchProps {}

interface StateProps {}

type Props = StateProps & DispatchProps & OwnProps;

const AddressSelector: React.SFC<Props> = ({ addressLine1, addressLine2, fetchingAddress, deliveryAddress, setDistanceTime, requestGeoCode }: Props) => {
  const [addressSelectSheet, setAddressSelectSheet] = React.useState(SheetState.CLOSED);
  const { append } = useAppender();
  const { branchId } = useSelector((state: RootState) => ({
    branchId: state.branchList?.selectedBranch?.branchCode,
  }));
  const dispatch = useDispatch();
  React.useEffect(() => {
    append(
      <AddressSelectSheet
        callback={(bottomSheetState: SheetState) => setAddressSelectSheet(bottomSheetState)}
        closeAll={() => setAddressSelectSheet(SheetState.CLOSED)}
        sheetState={addressSelectSheet}
        requestGeoCode={address => {
          requestGeoCode(address, () => {
            setAddressSelectSheet(SheetState.CLOSED);
          });
        }}
      />,
      "BranchSelectSheet",
      0,
    );
  }, [addressSelectSheet, requestGeoCode]);

  React.useEffect(() => {
    if (setDistanceTime && deliveryAddress?.formattedAddress) {
      dispatch(AddressActions.addressDistanceDriveTime({ branchId, address: deliveryAddress?.formattedAddress }, {}));
    }
  }, [deliveryAddress?.formattedAddress]);
  return (
    <>
      <View style={style.container}>
        <LoadingView style={style.mapAndInfoContainer} hideViewOnLoading={true} isLoading={fetchingAddress}>
          {addressLine1 ? (
            <AddressAndMapDisplay addressLine1={addressLine1} addressLine2={addressLine2} />
          ) : (
            <View style={style.addIconContainer}>
              <CustomIcon name={"add"} style={style.addIconStyle} />
            </View>
          )}
        </LoadingView>
      </View>
      <TouchableOpacity {...accessibility("AddChangeAddressButton")} onPress={() => setAddressSelectSheet(SheetState.EXPANDED)}>
        <Text style={style.changeAddressStyle}>{deliveryAddress ? "Change address" : "Add address"}</Text>
      </TouchableOpacity>
    </>
  );
};
export default AddressSelector;
