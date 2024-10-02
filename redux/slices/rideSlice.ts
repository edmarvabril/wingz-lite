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
    completeRide: (state, action: PayloadAction<RideRequest>) => {
      state.completedRides.push(action.payload);
    },
  },
});

export const { setRideRequests, completeRide } = rideSlice.actions;

export default rideSlice.reducer;
