import * as React from "react";
import { Text, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { accessibility } from "~root/Lib/DataHelper";
import { mergeCoordinate } from "~root/Lib/MapsHelper";
import { RootState } from "~root/Reducers";
import CustomIcon from "../CustomIcon";
import style from "./AddressAndMapDisplayStyle";

interface OwnProps {
  addressLine1: string;
  addressLine2: string;
}

interface DispatchProps {}

interface StateProps {
  geocode: Region | undefined;
}

type Props = StateProps & DispatchProps & OwnProps;

const AddressAndMapDisplay: React.SFC<Props> = ({ addressLine1, addressLine2, geocode }: Props) => {
  const [markerLayout, setMarkerLayout] = React.useState(undefined);
  const center = {
    x: markerLayout ? -(markerLayout.width / 2) + 10 : 0,
    y: markerLayout ? -markerLayout.height / 2 : 0,
  };

  return (
    <View>
      <View style={style.mapviewContainer} {...accessibility("mapContainer")}>
        {geocode && (
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
                <CustomIcon name={"location"} style={style.marker} />
              </View>
            </Marker>
          </MapView>
        )}
      </View>
      <View style={style.addressInfoContainer}>
        <Text style={style.addressLineOneStyle} {...accessibility("addressLine1")}>
          {addressLine1}
        </Text>
        <Text style={style.addressLineTwoStyle} {...accessibility("addressLine2")}>
          {addressLine2}
        </Text>
      </View>
    </View>
  );
};
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({});
const mapStateToProps = (state: RootState): StateProps => ({
  geocode: mergeCoordinate(state.address.geocode),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddressAndMapDisplay);
