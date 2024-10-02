import { LatLng } from "react-native-maps";

export interface RideRequest {
  id: string;
  userId: string;
  driverId: string | null;
  pickupLocation: LatLng;
  destination: LatLng;
  status: "pending" | "accepted" | "ongoing" | "completed";
  pickupTime: string;
  timestamp: string;
}

export interface RideState {
  rideRequests: RideRequest[];
  completedRides: RideRequest[];
}
