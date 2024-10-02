import { DriverLocation } from "./driverTypes";

export interface RideRequest {
  id: string;
  userId: string;
  driverId: string | null;
  pickupLocation: DriverLocation;
  destination: DriverLocation;
  status: "pending" | "accepted" | "ongoing" | "completed";
  pickupTime: string;
  timestamp: string;
}

export interface RideState {
  rideRequests: RideRequest[];
  completedRides: RideRequest[];
}
