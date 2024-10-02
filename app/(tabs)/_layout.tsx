import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet, View } from "react-native";
import { palette } from "@/constants/colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: palette.brightGreen,
        tabBarInactiveTintColor: palette.darkGray,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: palette.darkBlue,
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
                name={focused ? "car" : "car-outline"}
                color={palette.darkBlue}
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
    top: -28,
  },
});
