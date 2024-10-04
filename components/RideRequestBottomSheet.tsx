import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { RideRequest } from "@/types/rideTypes";
import { palette } from "@/constants/colors";

interface RideRequestBottomSheetProps {
  selectedRide: RideRequest | null;
  pickupNames: { [key: string]: string };
  destinationNames: { [key: string]: string };
  bottomSheetRef: React.RefObject<BottomSheetModal>;
  onAcceptRide: () => void;
  onDeclineRide: () => void;
  onClose: () => void;
}

export const RideRequestBottomSheet: React.FC<RideRequestBottomSheetProps> = ({
  selectedRide,
  pickupNames,
  destinationNames,
  bottomSheetRef,
  onAcceptRide,
  onDeclineRide,
  onClose,
}) => {
  const snapPoints = ["55%"];

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onDismiss={onClose}
    >
      <BottomSheetView style={styles.sheetContent}>
        {selectedRide ? (
          <>
            <Text style={styles.sheetTitle}>Ride Request Details</Text>
            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Pickup Location:</Text>
              <Text style={styles.infoText}>
                {pickupNames[selectedRide.id] || "Loading..."}
              </Text>
              <Text style={styles.infoLabel}>Destination Location:</Text>
              <Text style={styles.infoText}>
                {destinationNames[selectedRide.id] || "Loading..."}
              </Text>
              <Text style={styles.infoLabel}>Passenger Information:</Text>
              <Text style={styles.infoText}>Name: {selectedRide.userName}</Text>
              <Text style={styles.infoText}>
                Phone: {selectedRide.userPhone}
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={onAcceptRide}
              >
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.declineButton}
                onPress={onDeclineRide}
              >
                <Text style={styles.buttonText}>Decline</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text style={styles.noRideText}>No ride selected</Text>
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default RideRequestBottomSheet;

const styles = StyleSheet.create({
  sheetContent: {
    flex: 1,
    padding: 20,
    backgroundColor: palette.white,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: palette.darkBlue,
    marginBottom: 20,
    textAlign: "center",
  },
  infoSection: {
    marginBottom: 20,
  },
  infoLabel: {
    fontWeight: "bold",
    color: palette.darkBlue,
    fontSize: 18,
    marginTop: 10,
  },
  infoText: {
    color: palette.darkGray,
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  acceptButton: {
    backgroundColor: palette.brightGreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 2,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  declineButton: {
    backgroundColor: palette.red,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    color: palette.white,
    fontWeight: "bold",
    fontSize: 18,
  },
  noRideText: {
    fontSize: 16,
    color: palette.darkGray,
    textAlign: "center",
  },
});
