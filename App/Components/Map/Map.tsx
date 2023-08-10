import { Text, View } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import FbIcon from "~root/Components/FbIcon";
import { GeoPoint } from "~root/Lib/BranchHelper";
import { accessibility } from "~root/Lib/DataHelper";
import style from "./MapStyle";

export interface MapData {
  style: any;
  geoPoint: GeoPoint;
  center: any;
  markerText: string;
}

export const Map = (data: MapData) => {
  const { height, width } = Dimensions.get("window");
  const LATITUDE_DELTA = 0.2;
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
  const region: Region = {
    latitude: data.geoPoint.latitude,
    longitude: data.geoPoint.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  return (
    <MapView style={style.mapView} initialRegion={region} region={region}>
      <Marker coordinate={data.geoPoint} style={style.markerContainer} centerOffset={data.center}>
        <View style={style.markerView}>
          <FbIcon name={"ic_marker"} style={style.marker} />
          <View style={style.markerAddress}>
            <Text style={style.textStyle} {...accessibility("deliverToValueLabel")}>
              {data.markerText}
            </Text>
          </View>
        </View>
      </Marker>
    </MapView>
  );
};
