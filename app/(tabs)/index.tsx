import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { selectDriverLocation } from "@/redux/selectors/driverSelectors";
import {
  selectRideRequests,
  selectSelectedRide,
} from "@/redux/selectors/rideSelectors";
import { setDriverLocation } from "@/redux/slices/driverSlice";
import {
  setRideRequests,
  acceptRide,
  setSelectedRide,
} from "@/redux/slices/rideSlice";
import {
  fetchDriverLocation,
  generateMockRideRequests,
  reverseGeocode,
} from "@/helpers/locationHelpers";
import { RideRequest } from "@/types/rideTypes";
import { FetchingLocation } from "@/components/FetchingLocation";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import { RideRequestBottomSheet } from "@/components/RideRequestBottomSheet";
import { useRouter } from "expo-router"; // Import useRouter for navigation

const DriveScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter(); // Get the router instance for navigation
  const driverLocation = useAppSelector(selectDriverLocation);
  const rideRequests = useAppSelector(selectRideRequests);
  const selectedRide = useAppSelector(selectSelectedRide);

  const [locationError, setLocationError] = useState<string | null>(null);
  const [pickupNames, setPickupNames] = useState<{ [key: string]: string }>({});
  const [destinationNames, setDestinationNames] = useState<{
    [key: string]: string;
  }>({});

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    (async () => {
      try {
        const location = await fetchDriverLocation();
        if (!location) {
          setLocationError("Permission to access location was denied.");
          return;
        }

        dispatch(setDriverLocation(location));

        const mockRideRequests: RideRequest[] =
          generateMockRideRequests(location);
        dispatch(setRideRequests(mockRideRequests));

        for (let ride of mockRideRequests) {
          const pickupAddress = await reverseGeocode(
            ride.pickupLocation.latitude,
            ride.pickupLocation.longitude
          );
          setPickupNames((prev) => ({ ...prev, [ride.id]: pickupAddress }));

          const destinationAddress = await reverseGeocode(
            ride.destination.latitude,
            ride.destination.longitude
          );
          setDestinationNames((prev) => ({
            ...prev,
            [ride.id]: destinationAddress,
          }));
        }
      } catch (error) {
        console.error("Error during location fetching:", error);
        setLocationError("Failed to fetch location.");
      }
    })();
  }, [dispatch]);

  const handleAcceptRide = useCallback(() => {
    if (selectedRide) {
      dispatch(acceptRide(selectedRide.id)); // Mark the ride as accepted in the redux store
      router.push("/ongoing-ride"); // Navigate to the OngoingRide screen
    }
    bottomSheetRef.current?.close();
  }, [dispatch, selectedRide, router]);

  const handleRejectRide = useCallback(() => {
    setSelectedRide(null);
    bottomSheetRef.current?.close();
  }, [selectedRide]);

  const handleRideSelect = (ride: RideRequest) => {
    dispatch(setSelectedRide(ride)); // Set the selected ride in Redux
    bottomSheetRef.current?.present();
  };

  const handleCloseBottomSheet = () => {
    // dispatch(setSelectedRide(null)); // Clear the selected ride in Redux
    bottomSheetRef.current?.dismiss();
  };

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
    return <FetchingLocation />;
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
            description={`Pickup: ${pickupNames[ride.id] || "Loading..."}`}
            onPress={() => handleRideSelect(ride)}
          />
        ))}
      </MapView>

      <RideRequestBottomSheet
        selectedRide={selectedRide}
        pickupNames={pickupNames}
        destinationNames={destinationNames}
        bottomSheetRef={bottomSheetRef}
        onAcceptRide={handleAcceptRide}
        onDeclineRide={handleRejectRide}
        onClose={handleCloseBottomSheet}
      />
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
});
