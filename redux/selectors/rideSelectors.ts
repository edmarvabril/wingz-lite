import { RideState } from "@/types/rideTypes";

export const selectRideRequests = (state: { ride: RideState }) =>
  state.ride.rideRequests;
export const selectCompletedRides = (state: { ride: RideState }) =>
  state.ride.completedRides;
export const selectSelectedRide = (state: { ride: RideState }) =>
  state.ride.selectedRide;
