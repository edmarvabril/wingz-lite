import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { selectDriverLocation } from "@/redux/selectors/driverSelectors";
import { selectSelectedRide } from "@/redux/selectors/rideSelectors";
import { completeRide, clearSelectedRide } from "@/redux/slices/rideSlice";
import { fetchRouteBetweenPoints } from "@/helpers/directionsHelpers";
import { palette } from "@/constants/colors";
import { useRouter } from "expo-router";

const OngoingRideScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const driverLocation = useAppSelector(selectDriverLocation);
  const selectedRide = useAppSelector(selectSelectedRide);

  const [routeCoordinates, setRouteCoordinates] = useState<any[]>([]);
  const [isPickedUp, setIsPickedUp] = useState(false);

  useEffect(() => {
    if (driverLocation && selectedRide && selectedRide.pickupLocation) {
      fetchRouteBetweenPoints(driverLocation, selectedRide.pickupLocation).then(
        setRouteCoordinates
      );
    }
  }, [driverLocation, selectedRide]);

  const handlePickUpPassenger = useCallback(() => {
    if (
      selectedRide &&
      selectedRide.pickupLocation &&
      selectedRide.destination
    ) {
      setIsPickedUp(true);
      fetchRouteBetweenPoints(
        selectedRide.pickupLocation,
        selectedRide.destination
      ).then(setRouteCoordinates);
    }
  }, [selectedRide]);

  const handleDropOffPassenger = useCallback(() => {
    if (selectedRide && selectedRide.id) {
      dispatch(completeRide(selectedRide.id));
      dispatch(clearSelectedRide());
      router.back();
    }
  }, [dispatch, selectedRide, router]);

  const handleCancelRide = () => {
    dispatch(clearSelectedRide());
    router.back();
  };

  if (!selectedRide) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No ride selected</Text>
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
        {!isPickedUp && (
          <Marker
            coordinate={{
              latitude: driverLocation.latitude!,
              longitude: driverLocation.longitude!,
            }}
            title="You are here"
            pinColor="green"
          />
        )}
        <Polyline
          coordinates={routeCoordinates}
          strokeColor={palette.darkBlue}
          strokeWidth={3}
        />
        <Marker
          coordinate={
            isPickedUp ? selectedRide.destination : selectedRide.pickupLocation
          }
          title={isPickedUp ? "Passenger Destination" : "Pickup Location"}
          pinColor={palette.orange}
        />
      </MapView>

      <View style={styles.buttonContainer}>
        {isPickedUp ? (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleDropOffPassenger}
          >
            <Text style={styles.buttonText}>Complete Drive</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handlePickUpPassenger}
          >
            <Text style={styles.buttonText}>Start Drive</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancelRide}
        >
          <Text style={styles.buttonText}>Cancel Drive</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OngoingRideScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
  },
  cancelButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.red,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.brightGreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    height: 60,
  },
  buttonText: {
    color: palette.white,
    fontWeight: "bold",
    fontSize: 16,
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
