import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { StyleSheet, View } from "react-native";
import { palette } from "@/constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: palette.brightGreen,
        tabBarInactiveTintColor: palette.darkGray,
        tabBarStyle: {
          backgroundColor: palette.darkBlue,
        },
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: palette.darkBlue,
        },
        headerTitleStyle: {
          color: palette.white,
        },
      }}
    >
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "time" : "time-outline"}
              color={color}
              size={34}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Drive",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.driveTabContainer,
                {
                  backgroundColor: focused ? color : palette.lightGray,
                },
              ]}
            >
              <TabBarIcon
                name={focused ? "car-sport" : "car-sport-outline"}
                color={palette.darkBlue}
                size={34}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
              size={34}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  driveTabContainer: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    borderWidth: 4,
    position: "absolute",
    borderColor: palette.darkBlue,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    top: -20,
  },
});
