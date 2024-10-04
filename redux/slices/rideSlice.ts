import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RideState, RideRequest } from "@/types/rideTypes";
import { RideStatusEnum } from "@/enums/rideEnums";

const initialState: RideState = {
  rideRequests: [],
  completedRides: [],
  selectedRide: null,
};

const rideSlice = createSlice({
  name: "ride",
  initialState,
  reducers: {
    setRideRequests: (state, action: PayloadAction<RideRequest[]>) => {
      state.rideRequests = action.payload;
    },
    acceptRide: (state, action: PayloadAction<string>) => {
      const ride = state.rideRequests.find((r) => r.id === action.payload);
      if (ride) {
        ride.status = RideStatusEnum.Accepted;
        ride.driverId = "currentDriverId";
      }
    },
    declineRide: (state, action: PayloadAction<string>) => {
      state.rideRequests = state.rideRequests.filter(
        (ride) => ride.id !== action.payload
      );
    },
    completeRide: (state, action: PayloadAction<string>) => {
      const rideIndex = state.rideRequests.findIndex(
        (ride) => ride.id === action.payload
      );
      if (rideIndex !== -1) {
        const completedRide = {
          ...state.rideRequests[rideIndex],
          status: RideStatusEnum.Completed,
        };
        state.completedRides.push(completedRide);
        state.rideRequests.splice(rideIndex, 1);
      }
    },
    setSelectedRide: (state, action: PayloadAction<RideRequest | null>) => {
      state.selectedRide = action.payload;
    },
    clearSelectedRide: (state) => {
      state.selectedRide = null;
    },
  },
});

export const {
  setRideRequests,
  acceptRide,
  declineRide,
  completeRide,
  setSelectedRide,
  clearSelectedRide,
} = rideSlice.actions;

export default rideSlice.reducer;
