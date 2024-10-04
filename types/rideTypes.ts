import { RideStatusEnum } from "@/enums/rideEnums";
import { LatLng } from "react-native-maps";

export interface RideRequest {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  driverId: string | null;
  pickupLocation: LatLng;
  destination: LatLng;
  status: RideStatusEnum;
  pickupTime: string;
  timestamp: string;
}

export interface RideState {
  rideRequests: RideRequest[];
  completedRides: RideRequest[];
}
