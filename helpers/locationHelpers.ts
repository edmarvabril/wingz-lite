import * as Location from "expo-location";
import { RideRequest } from "@/types/rideTypes";
import { LatLng } from "react-native-maps";

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
    console.error("Error fetching driver location:", error);
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
      const { street, city, region } = response[0];
      return `${street}, ${city}, ${region}`;
    }
    return "Unknown location";
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return "Unknown location";
  }
};

export const generateMockRideRequests = (location: LatLng): RideRequest[] => {
  return [
    {
      id: "1",
      userId: "111",
      driverId: null,
      pickupLocation: {
        latitude: location.latitude + 0.001,
        longitude: location.longitude + 0.005,
      },
      destination: {
        latitude: location.latitude + 0.01,
        longitude: location.longitude + 0.1,
      },
      status: "pending",
      pickupTime: new Date().toISOString(),
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      userId: "222",
      driverId: null,
      pickupLocation: {
        latitude: location.latitude - 0.002,
        longitude: location.longitude - 0.002,
      },
      destination: {
        latitude: location.latitude + 0.06,
        longitude: location.longitude + 0.06,
      },
      status: "pending",
      pickupTime: new Date().toISOString(),
      timestamp: new Date().toISOString(),
    },
    {
      id: "3",
      userId: "333",
      driverId: null,
      pickupLocation: {
        latitude: location.latitude + 0.003,
        longitude: location.longitude - 0.003,
      },
      destination: {
        latitude: location.latitude + 0.07,
        longitude: location.longitude + 0.07,
      },
      status: "pending",
      pickupTime: new Date().toISOString(),
      timestamp: new Date().toISOString(),
    },
  ];
};
