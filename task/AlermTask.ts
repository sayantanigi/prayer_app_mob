import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notification from "expo-notifications";
import { Alert, Linking, Platform } from "react-native";
import { Alarm } from "../store/alarm";

type DateInput = {
  hours: number;
  minutes: number;
};
function calculateRemainingTime(targetTime: `${number}:${number}` = "13:20") {
  // Get the current date
  const currentDate = new Date();

  // Get the target time in hours and minutes
  const [targetHours, targetMinutes] = targetTime.split(":").map(Number);

  // Create a new Date object for today's date with the target time
  const targetDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    targetHours,
    targetMinutes,
    0
  );

  // If the target time has already passed for today, set it for tomorrow
  if (targetDate < currentDate) {
    targetDate.setDate(targetDate.getDate() + 1);
  }

  // Calculate the target timestamp in milliseconds
  const targetTimestamp = targetDate.getTime();

  // Get the current time
  const currentTime = currentDate.getTime();

  // Calculate the remaining time in milliseconds
  let remainingTime = targetTimestamp - currentTime;

  // If the remaining time is negative, it means the target time has already passed, set it for tomorrow
  if (remainingTime <= 0) {
    remainingTime += 24 * 60 * 60 * 1000; // Add one day
  }

  // Convert remaining time to hours, minutes, and seconds
  const hours = Math.floor(remainingTime / (1000 * 60 * 60));
  remainingTime %= 1000 * 60 * 60;
  const minutes = Math.floor(remainingTime / (1000 * 60));

  // Return the remaining time as an object
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}
// function addSecondsToTime(
//   hours: number,
//   minutes: number,
//   seconds: number,
//   additionalSeconds: number,
//   startDay: number = 1
// ): { day: number; hours: number; minutes: number; seconds: number } {
//   let totalSeconds: number = hours * 3600 + minutes * 60 + seconds;
//   totalSeconds += additionalSeconds;

//   let daysToAdd: number = Math.floor(totalSeconds / (3600 * 24));
//   totalSeconds %= 3600 * 24;

//   let newDay: number = ((startDay + daysToAdd - 1) % 7) + 1;

//   let newHours: number = Math.floor(totalSeconds / 3600);
//   let remainingSeconds: number = totalSeconds % 3600;
//   let newMinutes: number = Math.floor(remainingSeconds / 60);
//   let newSeconds: number = remainingSeconds % 60;

//   return {
//     day: newDay,
//     hours: newHours,
//     minutes: newMinutes,
//     seconds: newSeconds,
//   };
// }

export const requestNotificationPermission = async () => {
  let { status } = await Notification.requestPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "Allow notification",
      "Please allow notification to set alarms",
      [
        {
          text: "Cancel",
        },
        {
          text: "Allow",
          onPress: async () => {
            await Linking.openSettings();
          },
        },
      ]
    );
    return;
  }
  Notification.setNotificationHandler({
    handleNotification: async () => {
      Alert.alert(
        "",
        `Hey there! An alarm is currently playing. Would you like to pause it for today?`,
        [
          {
            text: "Pause for Today",
            async onPress() {
              await Notification.dismissAllNotificationsAsync();
            },
          },
          // {
          //   text: "Snooze",
          //   async onPress() {
          //     await Notification.dismissAllNotificationsAsync();
          //     await Notification.cancelAllScheduledNotificationsAsync();

          //     const alarmData = await AsyncStorage.getItem("alarm-store")

          //     if(!alarmData) return;

          //     const alarm: Alarm = JSON.parse(alarmData)
          //     alarm.snooze = true
          //     await AsyncStorage.setItem("alarm-store", JSON.stringify(alarm))
          //   },
          //},
        ]
      );
      return {
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      };
    },
  });
  if (Platform.OS == "android") {
    await Notification.setNotificationChannelAsync("alarm", {
      name: "alarm",
      importance: Notification.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 0, 250],
      sound: "notification.mp3",
    });
  }
};

export const registerAlarmNotification = async (
  days: number[],
  repeats: boolean,
  time: DateInput,
  countDownTime: DateInput,
  vibrate: number[] | undefined
) => {
  await Notification.cancelAllScheduledNotificationsAsync();

  // for (let day of days) {
  let totalMins = calculateRemainingTime();

  await Notification.scheduleNotificationAsync({
    content: {
      title: `Get Ready for Prayer`,
      body: `Only ${totalMins} left until the prayer begins.`,
      sound: "notification.mp3",
      vibrate,
      priority: "high",
    },
    trigger: {
      channelId: "alarm",
      repeats,
      minute: countDownTime.minutes,
      hour: countDownTime.hours,
    },
  });

  await Notification.scheduleNotificationAsync({
    content: {
      title: `Prayer time is started`,
      body: `Hey user, Let's start the prayer session`,
      sound: "notification.mp3",
      vibrate,
      priority: "high",
    },
    trigger: {
      channelId: "alarm",
      repeats,
      hour: time.hours,
      minute: time.minutes,
    },
  });
};

export const cancelAlarmNotification = async () => {
  await Notification.cancelAllScheduledNotificationsAsync();
};
