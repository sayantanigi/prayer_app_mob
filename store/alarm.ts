import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom, useAtom, useSetAtom } from "jotai";
import { atomWithAsyncStorage } from "../lib/utils";

export const ALL_DAY = [
  {
    label: "S",
    selected: true,
  },
  {
    label: "M",
    selected: true,
  },
  {
    label: "T",
    selected: true,
  },
  {
    label: "W",
    selected: true,
  },
  {
    label: "T",
    selected: true,
  },
  {
    label: "F",
    selected: true,
  },
  {
    label: "S",
    selected: true,
  },
];
export type DateInput = {
  hours: number;
  minutes: number;
};
export type Alarm = {
  days: typeof ALL_DAY;
  time: DateInput;
  countDownTime: DateInput;
  vibrate: undefined | number[];
  snooze: boolean;
};
export const VIBRATE_PATTERN = [100, 10, 100, 10, 100, 10, 100];
export const INITIAL_ALARM_DATA = {
  days: ALL_DAY,
  time: {
    hours: 13,
    minutes: 20,
  },
  countDownTime: {
    hours: 13,
    minutes: 0,
  },
  vibrate: VIBRATE_PATTERN,
  snooze: true,
};

export const alarmAtom = atomWithAsyncStorage<Alarm>(
  "alarm-store",
  INITIAL_ALARM_DATA
);

export const useAlarmStore = () => useAtom(alarmAtom);

export const useSetAlarmStore = () => useSetAtom(alarmAtom);
