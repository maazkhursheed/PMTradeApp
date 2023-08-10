import { COORDINATE_NZ_AUCKLAND, mergeCoordinate } from "~root/Lib/MapsHelper";

test("Coordinates should be merged as desired", () => {
  expect(mergeCoordinate({ latitude: 45, longitude: 15 })).toStrictEqual({
    latitude: 45,
    longitude: 15,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  expect(mergeCoordinate(undefined)).toStrictEqual(COORDINATE_NZ_AUCKLAND);
});
