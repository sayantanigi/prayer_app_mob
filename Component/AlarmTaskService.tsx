import * as TaskManager from 'expo-task-manager';
import { Alert } from 'react-native';

export const ALARM_TASK_NAME = 'ALARM_TASK';

TaskManager.defineTask(ALARM_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error('Error in background task:', error);
    return;
  }

  if (data) {
    // Handle the alarm task data, e.g., show an alert
    Alert.alert('Alarm', 'It\'s time to wake up!');
  }
});