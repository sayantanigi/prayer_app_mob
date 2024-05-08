import "@firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { SnackBarProvider } from "./Component/CustomSnackbar";
import { RootNavigation } from "./RootNavigation";
import { INITIAL_ALARM_DATA } from "./store/alarm";
import {
  registerAlarmNotification,
  requestNotificationPermission,
} from "./task/AlermTask";
import * as Notifications from "expo-notifications";
import { Provider } from "jotai";

export const firebaseConfig = {
  apiKey: "AIzaSyBVR-cXuiLG7cYGmsTbQs3gJfSIuu14bXU",
  authDomain: "prayer-76793.firebaseapp.com",
  projectId: "prayer-76793",
  storageBucket: "prayer-76793.appspot.com",
  messagingSenderId: "294279652731",
  appId: "1:294279652731:web:f357c815ea9b13ca0389de",
  measurementId: "G-JPN61TK5DY",
};

requestNotificationPermission();
export default function App() {
  React.useEffect(() => {
    AsyncStorage.getItem("alarm-store").then((data) => {
      if (!data) {
        AsyncStorage.setItem("alarm-store", JSON.stringify(INITIAL_ALARM_DATA));
      }
    });

    registerAlarmNotification(
      [],
      true,
      { hours: 13, minutes: 0 },
      { hours: 13, minutes: 20 },
      false as any
    );
  }, []);

  return (
    <SnackBarProvider>
      <Provider>
        <RootNavigation />
      </Provider>
    </SnackBarProvider>
  );
}

const styles = StyleSheet.create({
  Container: {},
});
export async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
