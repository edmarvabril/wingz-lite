import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import {
  FontAwesome5,
  Feather,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { palette } from "@/constants/colors";

const ProfileScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
  const [privacyModeEnabled, setPrivacyModeEnabled] = React.useState(false);
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [autoUpdateEnabled, setAutoUpdateEnabled] = React.useState(true);

  const toggleNotifications = () =>
    setNotificationsEnabled(!notificationsEnabled);
  const toggleDarkMode = () => setDarkModeEnabled(!darkModeEnabled);
  const togglePrivacyMode = () => setPrivacyModeEnabled(!privacyModeEnabled);
  const toggleSound = () => setSoundEnabled(!soundEnabled);
  const toggleAutoUpdates = () => setAutoUpdateEnabled(!autoUpdateEnabled);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={styles.profilePic}>
          <MaterialIcons name="person" size={80} color={palette.white} />
        </View>
        <Text style={styles.username}>John Doe</Text>
        <Text style={styles.userEmail}>johndoe@example.com</Text>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.settingsHeader}>Settings</Text>

        <View style={styles.settingRow}>
          <FontAwesome5 name="bell" size={24} color={palette.orange} />
          <Text style={styles.settingText}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: palette.lightGray, true: palette.brightGreen }}
            thumbColor={notificationsEnabled ? palette.white : palette.darkGray}
          />
        </View>

        <View style={styles.settingRow}>
          <Feather name="moon" size={24} color={palette.lightBlue} />
          <Text style={styles.settingText}>Dark Mode</Text>
          <Switch
            value={darkModeEnabled}
            onValueChange={toggleDarkMode}
            trackColor={{ false: palette.lightGray, true: palette.darkBlue }}
            thumbColor={darkModeEnabled ? palette.white : palette.darkGray}
          />
        </View>

        <View style={styles.settingRow}>
          <Ionicons name="lock-closed" size={24} color={palette.darkGray} />
          <Text style={styles.settingText}>Privacy Mode</Text>
          <Switch
            value={privacyModeEnabled}
            onValueChange={togglePrivacyMode}
            trackColor={{ false: palette.lightGray, true: palette.orange }}
            thumbColor={privacyModeEnabled ? palette.white : palette.darkGray}
          />
        </View>

        <View style={styles.settingRow}>
          <Ionicons name="volume-high" size={24} color={palette.yellow} />
          <Text style={styles.settingText}>Sound & Vibration</Text>
          <Switch
            value={soundEnabled}
            onValueChange={toggleSound}
            trackColor={{ false: palette.lightGray, true: palette.darkBlue }}
            thumbColor={soundEnabled ? palette.white : palette.darkGray}
          />
        </View>

        <View style={styles.settingRow}>
          <Ionicons name="refresh" size={24} color={palette.brightGreen} />
          <Text style={styles.settingText}>Auto Updates</Text>
          <Switch
            value={autoUpdateEnabled}
            onValueChange={toggleAutoUpdates}
            trackColor={{ false: palette.lightGray, true: palette.brightGreen }}
            thumbColor={autoUpdateEnabled ? palette.white : palette.darkGray}
          />
        </View>

        <View style={styles.settingRow}>
          <MaterialIcons name="language" size={24} color={palette.yellow} />
          <Text style={styles.settingText}>Language</Text>
          <TouchableOpacity style={styles.settingOption}>
            <Text style={styles.settingOptionText}>English</Text>
            <Feather name="chevron-right" size={24} color={palette.darkGray} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Feather name="log-out" size={24} color={palette.white} />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.lightGray,
  },
  userInfoSection: {
    backgroundColor: palette.darkBlue,
    padding: 20,
    alignItems: "center",
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: palette.lightBlue,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  username: {
    color: palette.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  userEmail: {
    color: palette.darkGray,
    fontSize: 16,
    marginTop: 5,
  },
  settingsSection: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  settingsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: palette.darkBlue,
    marginBottom: 15,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  settingText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
    color: palette.darkBlue,
  },
  settingOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingOptionText: {
    fontSize: 16,
    marginRight: 10,
    color: palette.darkGray,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.red,
    paddingVertical: 15,
    marginHorizontal: 40,
    borderRadius: 10,
    marginTop: 30,
  },
  logoutButtonText: {
    color: palette.white,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
