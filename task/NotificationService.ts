import * as Notifications from "expo-notifications";
import { Audio } from "expo-av";

let soundObject: Audio.Sound | undefined;

export const registerForPushNotificationsAsync = async () => {
  try {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync();
    const token = tokenData.data;

    console.log("Expo Push Token:", token);

    return token;
  } catch (error) {
    console.error("Error registering for push notifications:", error);
    return null;
  }
};

export const scheduleNotification = async () => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hey, time for Prayer",
        body: "Get Ready for prayer",
        sound: true,
        badge: 1,
      },
      trigger: {
        hour: 12,
        minute: 31,
        repeats: true, // Repeat daily
      },
    });
  } catch (error) {
    console.error("Error scheduling notification:", error);
  }
};


 const playCustomSound = async () => {
  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      //interruptionModeIOS: Audio.InterruptionModeIOS.DoNotMix,
    });

    soundObject = new Audio.Sound();

     soundObject.loadAsync(require("../assets/Mp3/music4.mp3"), {
      shouldPlay: true,
    });
    await soundObject.playAsync();
  } catch (error) {
    console.error("Error loading or playing sound:", error);
  }
};
Notifications.addNotificationReceivedListener(async (notification) => {
  console.log(notification);

  // Play the custom sound
  await playCustomSound();
});