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
  removeRideRequest,
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
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

const DriveScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
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
        Toast.show({
          type: "error",
          text1: "Location Error",
          text2: "Failed to fetch location.",
        });
        setLocationError("Failed to fetch location.");
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    if (rideRequests.length === 0) {
      Toast.show({
        type: "error",
        text1: "No Available Rides",
        text2: "There are no more available ride requests.",
        position: "bottom",
        autoHide: false,
        bottomOffset: 120,
      });
    } else {
      Toast.hide();
    }
  }, [rideRequests]);

  const handleAcceptRide = useCallback(() => {
    if (selectedRide) {
      dispatch(acceptRide(selectedRide.id));
      Toast.show({
        type: "success",
        text1: "Ride Accepted",
        text2: `You have accepted the ride to ${
          destinationNames[selectedRide.id]
        }`,
      });
      router.push("/ongoing-ride");
    }
    bottomSheetRef.current?.close();
  }, [dispatch, selectedRide, router]);

  const handleRejectRide = useCallback(() => {
    if (selectedRide) {
      Toast.show({
        type: "info",
        text1: "Ride Declined",
        text2: "You have declined the ride request.",
      });
      dispatch(removeRideRequest(selectedRide.id));
    }
    dispatch(setSelectedRide(null));
    bottomSheetRef.current?.close();
  }, [dispatch, selectedRide]);

  const handleRideSelect = (ride: RideRequest) => {
    dispatch(setSelectedRide(ride));
    bottomSheetRef.current?.present();
  };

  const handleCloseBottomSheet = () => {
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
            onPress={() => handleRideSelect(ride)}
            title="Ride Request"
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
