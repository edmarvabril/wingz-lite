# 🚗 Driver Ride Sharing App
This is a Driver Ride Sharing App built with Expo and React Native, utilizing Redux for state management. This app allows drivers to view nearby ride requests, accept or decline rides, and show the route from Driver location Passenger location, then from Passenger pick-up to destination.

## 📱 Features
 - Splash Screen: Displays for a few seconds on app launch.
 - Drive Tab: Displays a map with the driver's location and available ride requests.
 - Ongoing Ride Screen: Routes the driver to the passenger's pickup location, and updates the route to the destination once the passenger is picked up.
 - Profile Tab: Allows drivers to view their profile information, adjust settings, and log out.
 - History Tab: Displays the driver's ride history, including completed and canceled rides.
 - Toast Notifications: Provides feedback on key actions (accepting, declining, canceling rides).

## 🚀 Get Started
### 1. Install Dependencies
Run the following command to install all required dependencies:
npm install
### 2. Start the App
You can run the app by using the following command:
npx expo start
In the output, you'll have options to open the app in:

Development Build
Android Emulator
iOS Simulator
Expo Go (for trying out the app in a sandbox environment)


## ⚙️ Core Technologies
 - React Native: Framework for building native apps using JavaScript and React.
 - Expo: A set of tools and services for building, deploying, and quickly iterating on React Native projects.
 - Redux: A predictable state container for managing the app's global state, including ride requests, driver information, and ride status.
 - React Native Maps: Provides the map view and routing for the driver’s location and ride requests.
 - Toast Notifications: Provides feedback to the user on key actions or errors.
## 📂 Folder Structure
 - /app: Contains the primary components and screens (e.g., DriveScreen, OngoingRideScreen, ProfileScreen, etc.).
 - /redux: Contains the Redux setup, including slices and store configuration.
 - /helpers: Contains helper functions, such as location fetching and reverse geocoding.
 - /components: Reusable UI components like bottom sheets, loading spinners, and toasts.
 - /constants: Holds constants like color palettes.
