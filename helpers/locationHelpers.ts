import * as Location from "expo-location";
import { RideRequest } from "@/types/rideTypes";
import { LatLng } from "react-native-maps";
import { RideStatusEnum } from "@/enums/rideEnums";
import Toast from "react-native-toast-message";

export const fetchDriverLocation = async (): Promise<LatLng | null> => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return null;
    }
    let location = await Location.getCurrentPositionAsync({});
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Location Error",
      text2: "Failed to fetch location.",
    });
    return null;
  }
};

export const reverseGeocode = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  try {
    const response = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    if (response.length > 0) {
      const { street, district, city, region } = response[0];
      return `${street ?? "Unnamed St."}, ${
        district ?? "Unknown District"
      }, ${city}, ${region}`;
    }
    return "Unknown location";
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Reverse Geocoding Error",
      text2: "Failed to fetch geolocation.",
      position: "bottom",
      autoHide: false,
      bottomOffset: 120,
    });
    return "Unknown location";
  }
};

export const generateMockRideRequests = (location: LatLng): RideRequest[] => {
  return [
    {
      id: "1",
      userId: "111",
      userName: "Anthony Stark",
      userPhone: "+1-555-555-5555",
      driverId: null,
      pickupLocation: {
        latitude: location.latitude + 0.0035,
        longitude: location.longitude + 0.011,
      },
      destination: {
        latitude: location.latitude + 0.01,
        longitude: location.longitude + 0.1,
      },
      status: RideStatusEnum.Pending,
      pickupTime: new Date().toISOString(),
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      userId: "222",
      userName: "Steven Rogers",
      userPhone: "+1-555-555-5556",
      driverId: null,
      pickupLocation: {
        latitude: location.latitude - 0.002,
        longitude: location.longitude - 0.002,
      },
      destination: {
        latitude: location.latitude + 0.06,
        longitude: location.longitude + 0.06,
      },
      status: RideStatusEnum.Pending,
      pickupTime: new Date().toISOString(),
      timestamp: new Date().toISOString(),
    },
    {
      id: "3",
      userId: "333",
      userName: "Nicholas Fury",
      userPhone: "+1-555-555-5556",
      driverId: null,
      pickupLocation: {
        latitude: location.latitude + 0.0031,
        longitude: location.longitude - 0.012,
      },
      destination: {
        latitude: location.latitude + 0.07,
        longitude: location.longitude + 0.07,
      },
      status: RideStatusEnum.Pending,
      pickupTime: new Date().toISOString(),
      timestamp: new Date().toISOString(),
    },
    {
      id: "4",
      userId: "444",
      userName: "Natasha Romanoff",
      userPhone: "+1-555-555-5556",
      driverId: null,
      pickupLocation: {
        latitude: location.latitude - 0.0031,
        longitude: location.longitude - 0.013,
      },
      destination: {
        latitude: location.latitude + 0.07,
        longitude: location.longitude + 0.07,
      },
      status: RideStatusEnum.Pending,
      pickupTime: new Date().toISOString(),
      timestamp: new Date().toISOString(),
    },
    {
      id: "5",
      userId: "555",
      userName: "Peter Parker",
      userPhone: "+1-555-555-5556",
      driverId: null,
      pickupLocation: {
        latitude: location.latitude - 0.00414,
        longitude: location.longitude + 0.001,
      },
      destination: {
        latitude: location.latitude + 0.06,
        longitude: location.longitude + 0.06,
      },
      status: RideStatusEnum.Pending,
      pickupTime: new Date().toISOString(),
      timestamp: new Date().toISOString(),
    },
  ];
};
