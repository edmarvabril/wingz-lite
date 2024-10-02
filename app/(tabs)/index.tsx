import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { selectDriverLocation } from "@/redux/selectors/driverSelectors";
import { selectRideRequests } from "@/redux/selectors/rideSelectors";
import { setDriverLocation } from "@/redux/slices/driverSlice";
import { setRideRequests } from "@/redux/slices/rideSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { RideRequest } from "@/types/rideTypes";
import { StatusBar } from "expo-status-bar";

const DriveScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const driverLocation = useAppSelector(selectDriverLocation);
  const rideRequests = useAppSelector(selectRideRequests);

  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationError("Permission to access location was denied.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      dispatch(
        setDriverLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      );

      const mockRideRequests: RideRequest[] = [
        {
          id: "1",
          userId: "111",
          driverId: null,
          pickupLocation: {
            latitude: location.coords.latitude + 0.01,
            longitude: location.coords.longitude + 0.01,
          },
          destination: {
            latitude: location.coords.latitude + 0.05,
            longitude: location.coords.longitude + 0.05,
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
            latitude: location.coords.latitude + 0.02,
            longitude: location.coords.longitude + 0.02,
          },
          destination: {
            latitude: location.coords.latitude + 0.06,
            longitude: location.coords.longitude + 0.06,
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
            latitude: location.coords.latitude + 0.02,
            longitude: location.coords.longitude + 0.02,
          },
          destination: {
            latitude: location.coords.latitude + 0.06,
            longitude: location.coords.longitude + 0.06,
          },
          status: "pending",
          pickupTime: new Date().toISOString(),
          timestamp: new Date().toISOString(),
        },
      ];

      dispatch(setRideRequests(mockRideRequests));
    })();
  }, [dispatch]);

  if (locationError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{locationError}</Text>
      </View>
    );
  }

  if (
    !driverLocation ||
    driverLocation.latitude === null ||
    driverLocation.longitude === null
  ) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2ECC71" />
        <Text>Fetching location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: driverLocation.latitude!,
          longitude: driverLocation.longitude!,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            latitude: driverLocation.latitude!,
            longitude: driverLocation.longitude!,
          }}
          title="You are here"
          description="Driver's current location"
          pinColor="green"
        />

        {rideRequests.map((ride) => (
          <Marker
            key={ride.id}
            coordinate={ride.pickupLocation}
            title="Ride Request"
            description={`Pickup: ${ride.pickupLocation.latitude}, ${ride.pickupLocation.longitude}`}
            onPress={() => console.log(`Ride request ${ride.id} selected`)}
          />
        ))}
      </MapView>
    </View>
  );
};

export default DriveScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
