import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { RideRequest } from "@/types/rideTypes";

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
  const snapPoints = ["25%", "70%"];

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onDismiss={onClose}
    >
      <BottomSheetView style={styles.sheetContent}>
        {selectedRide ? (
          <>
            <Text style={styles.sheetTitle}>Ride Request Details</Text>

            <Text style={styles.infoLabel}>Pickup Location:</Text>
            <Text>{pickupNames[selectedRide.id] || "Loading..."}</Text>

            <Text style={styles.infoLabel}>Destination Location:</Text>
            <Text>{destinationNames[selectedRide.id] || "Loading..."}</Text>

            <Text style={styles.infoLabel}>User Information:</Text>
            <Text>User: {selectedRide.userName}</Text>
            <Text>Phone: {selectedRide.userPhone}</Text>

            <View style={styles.buttonContainer}>
              <Button title="Accept Ride" onPress={onAcceptRide} />
              <Button title="Decline Ride" onPress={onDeclineRide} />
            </View>
          </>
        ) : (
          <Text>No ride selected</Text>
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
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  infoLabel: {
    fontWeight: "bold",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
});
