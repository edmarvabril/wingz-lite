import React from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { palette } from "@/constants/colors";

// Updated dummy data for completed and canceled rides
const completedRides = [
  {
    id: "1",
    pickupLocation: "123 Elm Street, Springfield",
    destination: "456 Oak Avenue, Shelbyville",
    date: "Oct 2, 2024",
    status: "Completed",
  },
  {
    id: "2",
    pickupLocation: "789 Maple Drive, Capital City",
    destination: "101 Pine Lane, Ogdenville",
    date: "Sep 29, 2024",
    status: "Completed",
  },
  {
    id: "3",
    pickupLocation: "102 Willow Road, Springfield",
    destination: "323 Birch Street, Shelbyville",
    date: "Sep 20, 2024",
    status: "Canceled",
  },
  {
    id: "4",
    pickupLocation: "99 Cherry Avenue, Capital City",
    destination: "1200 Walnut Blvd, Ogdenville",
    date: "Sep 15, 2024",
    status: "Completed",
  },
  {
    id: "5",
    pickupLocation: "300 Cedar Avenue, Springfield",
    destination: "150 Maple Road, Shelbyville",
    date: "Sep 10, 2024",
    status: "Canceled",
  },
];

const HistoryScreen: React.FC = () => {
  const renderRideItem = ({ item }: { item: (typeof completedRides)[0] }) => (
    <View style={[styles.rideCard]}>
      <View style={styles.rideInfo}>
        <View style={styles.rideRow}>
          <MaterialIcons
            name="my-location"
            size={24}
            color={palette.brightGreen}
          />
          <Text style={styles.locationText}>{item.pickupLocation}</Text>
        </View>
        <View style={styles.rideRow}>
          <MaterialIcons name="place" size={24} color={palette.orange} />
          <Text style={styles.locationText}>{item.destination}</Text>
        </View>
        <View style={styles.rideRow}>
          <FontAwesome5
            name="calendar-alt"
            size={20}
            color={palette.darkGray}
          />
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <View style={styles.rideStatus}>
          <Text
            style={[
              styles.statusText,
              item.status === "Canceled" && styles.canceledStatusText,
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {completedRides.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <MaterialIcons name="history" size={50} color={palette.darkGray} />
          <Text style={styles.emptyStateText}>No ride history available</Text>
        </View>
      ) : (
        <FlatList
          data={completedRides}
          renderItem={renderRideItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.rideList}
        />
      )}
    </ScrollView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.lightGray,
    paddingHorizontal: 20,
    padding: 20,
  },
  rideList: {
    paddingBottom: 20,
  },
  rideCard: {
    backgroundColor: palette.white,
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rideInfo: {
    flex: 1,
    marginRight: 10,
  },
  rideRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  locationText: {
    fontSize: 16,
    marginLeft: 10,
    color: palette.darkBlue,
  },
  dateText: {
    fontSize: 14,
    marginLeft: 10,
    color: palette.darkGray,
  },
  rideStatus: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  statusText: {
    color: palette.brightGreen,
    fontWeight: "bold",
  },
  canceledStatusText: {
    color: palette.red,
    fontWeight: "bold",
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  emptyStateText: {
    color: palette.darkGray,
    fontSize: 18,
    marginTop: 10,
  },
});
