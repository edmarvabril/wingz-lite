import { DriverLocation, DriverState } from "@/types/driverTypes";
import { RideRequest } from "@/types/rideTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: DriverState = {
  location: { latitude: null, longitude: null },
  ongoingRide: null,
};

const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    setDriverLocation: (state, action: PayloadAction<DriverLocation>) => {
      state.location = action.payload;
    },
    startRide: (state, action: PayloadAction<RideRequest>) => {
      state.ongoingRide = action.payload;
    },
    endRide: (state) => {
      state.ongoingRide = null;
    },
  },
});

export const { setDriverLocation, startRide, endRide } = driverSlice.actions;

export default driverSlice.reducer;
