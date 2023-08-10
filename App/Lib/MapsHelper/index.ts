import * as R from "ramda";
import { LatLng } from "react-native-maps";

export const COORDINATE_NZ_AUCKLAND = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.005,
  longitudeDelta: 0.005,
};

/**
 *
 * @param geocode an object constituting of Latitude and Longitude values
 * @description this function merges two objects and upon identical keys precedence is given to the object passed.
 */

export const mergeCoordinate = (geocode: LatLng | undefined) => R.mergeRight(COORDINATE_NZ_AUCKLAND, geocode || {});
