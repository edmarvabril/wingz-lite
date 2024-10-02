import { RideRequest } from "./rideTypes";

export interface DriverLocation {
  latitude: number | null;
  longitude: number | null;
}

export interface DriverState {
  location: DriverLocation;
  ongoingRide: RideRequest | null;
}
