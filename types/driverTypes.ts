import { LatLng } from "react-native-maps";
import { RideRequest } from "./rideTypes";
export interface DriverState {
  location: LatLng;
  ongoingRide: RideRequest | null;
}
