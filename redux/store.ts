import { configureStore } from "@reduxjs/toolkit";
import driverReducer from "./slices/driverSlice";
import rideReducer from "./slices/rideSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    driver: driverReducer,
    ride: rideReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
