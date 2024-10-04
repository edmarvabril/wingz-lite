import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { selectDriverLocation } from "@/redux/selectors/driverSelectors";
import { selectRideRequests } from "@/redux/selectors/rideSelectors";
import { setDriverLocation } from "@/redux/slices/driverSlice";
import {
  setRideRequests,
  acceptRide,
  declineRide,
} from "@/redux/slices/rideSlice";
import {
  fetchDriverLocation,
  generateMockRideRequests,
  reverseGeocode,
} from "@/helpers/locationHelpers";
import { RideRequest } from "@/types/rideTypes";
import { FetchingLocation } from "@/components/FetchingLocation";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { RideRequestBottomSheet } from "@/components/RideRequestBottomSheet";
import { palette } from "@/constants/colors";

const DriveScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const driverLocation = useAppSelector(selectDriverLocation);
  const rideRequests = useAppSelector(selectRideRequests);

  const [locationError, setLocationError] = useState<string | null>(null);
  const [pickupNames, setPickupNames] = useState<{ [key: string]: string }>({});
  const [destinationNames, setDestinationNames] = useState<{
    [key: string]: string;
  }>({});
  const [selectedRide, setSelectedRide] = useState<RideRequest | null>(null);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const forLogging = rideRequests.map((item) => item.status);
  console.log(forLogging);

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
      dispatch(acceptRide(selectedRide.id));
      console.log(`Accepted ride ${selectedRide.id}`);
    }
    bottomSheetRef.current?.close();
  }, [dispatch, selectedRide]);

  const handleDeclineRide = useCallback(() => {
    if (selectedRide) {
      dispatch(declineRide(selectedRide.id));
      console.log(`Declined ride ${selectedRide.id}`);
    }
    setSelectedRide(null);
    bottomSheetRef.current?.close();
  }, [dispatch, selectedRide]);

  const handleRideSelect = (ride: RideRequest) => {
    setSelectedRide(ride);
    bottomSheetRef.current?.present();
  };

  const handleCloseBottomSheet = () => {
    setSelectedRide(null);
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
          pinColor={palette.brightGreen}
        />

        {rideRequests.map((ride) => (
          <Marker
            key={ride.id}
            coordinate={ride.pickupLocation}
            title="Ride Request"
            description={`Pickup: ${pickupNames[ride.id] || "Loading..."}`}
            onPress={() => handleRideSelect(ride)}
            pinColor={palette.red}
          />
        ))}
      </MapView>
      <RideRequestBottomSheet
        selectedRide={selectedRide}
        pickupNames={pickupNames}
        destinationNames={destinationNames}
        bottomSheetRef={bottomSheetRef}
        onAcceptRide={handleAcceptRide}
        onDeclineRide={handleDeclineRide}
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
