import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

export const FetchingLocation = (props: Props) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#2ECC71" />
      <Text>Fetching location...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
