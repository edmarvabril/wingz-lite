import { LatLng } from "react-native-maps";

export const fetchRouteBetweenPoints = async (
  startLocation: LatLng,
  endLocation: LatLng
): Promise<LatLng[]> => {
  return [
    { latitude: startLocation.latitude, longitude: startLocation.longitude },
    { latitude: endLocation.latitude, longitude: endLocation.longitude },
  ];
};
