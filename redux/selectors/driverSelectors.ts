import { DriverState } from "@/types/driverTypes";

export const selectDriverLocation = (state: { driver: DriverState }) =>
  state.driver.location;
export const selectOngoingRide = (state: { driver: DriverState }) =>
  state.driver.ongoingRide;
