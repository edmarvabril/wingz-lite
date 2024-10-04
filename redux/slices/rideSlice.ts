import { RideStatusEnum } from "@/enums/rideEnums";
import { RideState, RideRequest } from "@/types/rideTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RideState = {
  rideRequests: [],
  completedRides: [],
};

const rideSlice = createSlice({
  name: "ride",
  initialState,
  reducers: {
    setRideRequests: (state, action: PayloadAction<RideRequest[]>) => {
      state.rideRequests = action.payload;
    },

    acceptRide: (state, action: PayloadAction<string>) => {
      const rideIndex = state.rideRequests.findIndex(
        (ride) => ride.id === action.payload
      );
      if (rideIndex !== -1) {
        state.rideRequests[rideIndex].status = RideStatusEnum.Accepted;
        state.rideRequests[rideIndex].driverId = "currentDriverId";
      }
    },

    declineRide: (state, action: PayloadAction<string>) => {
      const rideIndex = state.rideRequests.findIndex(
        (ride) => ride.id === action.payload
      );
      if (rideIndex !== -1) {
        state.rideRequests[rideIndex].status = RideStatusEnum.Declined;
      }
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
  },
});

export const { setRideRequests, acceptRide, declineRide, completeRide } =
  rideSlice.actions;

export default rideSlice.reducer;
