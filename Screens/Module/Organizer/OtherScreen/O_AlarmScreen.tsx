import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Canvas,
  Circle,
  Group,
  Path,
  Selector,
  Shadow,
  Skia,
  SkiaValue,
  SweepGradient,
  useComputedValue,
  useValue,
  vec,
  useTiming,
} from "@shopify/react-native-skia";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSwipe } from "../../../../hooks/onSwipe";

import { GestureResponderEvent } from "react-native";
import {
  BackgroundColor,
  Black,
  PrimaryColor,
  White,
} from "../../../../Constant/Color";
import {
  Alerm_2,
  Alerm_3,
  Alerm_4,
  Alerm_5,
  Alerm_6,
} from "../../../../Constant/Images";
import {
  Alarm,
  VIBRATE_PATTERN,
  useAlarmStore,
  useSetAlarmStore,
} from "../../../../store/alarm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  cancelAlarmNotification,
  registerAlarmNotification,
} from "../../../../task/AlermTask";
import { Entypo } from "@expo/vector-icons";

export enum Modals {
  DateModal = "DateModal",
  TimeZoneModal = "TimeZoneModal",
  None = "none",
}

interface DateModal {
  open: boolean;
  handler: (value: Modals) => void;
  state: [string, React.Dispatch<React.SetStateAction<string>>];
}
interface PointF {
  x: number;
  y: number;
}
function getAngleFromPointX(
  centerX: number,
  pointX: number,
  centerY: number,
  pointY: number
): number {
  // Calculate the difference in coordinates
  const dx = pointX - centerX;
  const dy = pointY - centerY;

  // Calculate the angle in radians
  let angleRadians = Math.atan2(dy, dx);

  // Convert radians to degrees
  let angleDegrees = (180 / Math.PI) * angleRadians;

  // Ensure angle is in the range [0, 360)
  if (angleDegrees < 0) {
    angleDegrees += 360;
  }

  return angleDegrees;
}

function getPosition(center: PointF, radius: number, angle: number): PointF {
  const p: PointF = {
    x: center.x + radius * Math.cos(angle * (Math.PI / 180)),
    y: center.y + radius * Math.sin(angle * (Math.PI / 180)),
  };

  return p;
}
function getTimeFromAngle(angle: number, totalRotationTime: number = 86400) {
  // Calculate time per degree
  const timePerDegree = totalRotationTime / 360;

  // Calculate time for the given angle
  const timeForAngle = angle * timePerDegree;

  // Convert time to hh:mm format
  const hours = Math.floor(timeForAngle / 3600);
  const minutes = Math.floor((timeForAngle % 3600) / 60);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}
interface TimeZoneModal {
  open: boolean;
  handler: (value: Modals) => void;
  state: [string, React.Dispatch<React.SetStateAction<string>>];
}
export type TextComponent = {
  timestamp: SkiaValue<string>;
};
function getAngleFromTime(hours: number, minutes: number) {
  // Convert hours and minutes to milliseconds
  const targetTimeMilliseconds = (hours * 60 + minutes) * 60 * 1000;

  // Calculate total rotation time for one full rotation (24 hours)
  const totalRotationTime = 24 * 60 * 60 * 1000;

  // Calculate angle covered per unit of time (degrees per millisecond)
  const anglePerTime = 360 / totalRotationTime;

  // Calculate the angle from the target time
  const angle = targetTimeMilliseconds * anglePerTime;

  return angle;
}

export function calculateRemainingTime(
  targetTime: `${number}:${number}` = "13:20"
) {
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
  return { hours, minutes };
}
export function TextComponent(props: TextComponent) {
  const { timestamp } = props;
  const [text, setText] = React.useState("00:00");

  React.useEffect(() => {
    timestamp.addListener((value) => setText(value));
  }, []);

  return (
    <Text
      style={{
        position: "absolute",
        top: 140,
        width: "100%",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
      }}
    >
      {text}
    </Text>
  );
}
export function CircularProgress() {
  const endAngle = useValue(0);
  const { width } = useWindowDimensions();
  const setAlarm = useSetAlarmStore();
  const timestamp = useComputedValue(() => {
    let seconds = getTimeFromAngle(endAngle.current);

    return seconds;
  }, [endAngle]);
  const arcX = width / 2;
  const arcY = 150;
  const arcR = (102 + 67) / 2;

  const CirclePath = Skia.Path.Make().addCircle(arcX, arcY, arcR);
  const IndicatorPoint = useComputedValue(
    () => getPosition({ x: arcX, y: arcY }, arcR, endAngle.current),
    [endAngle]
  );

  const handleTouchResponse = (e: GestureResponderEvent) => {
    let angle = getAngleFromPointX(
      arcX,
      e.nativeEvent.locationX,
      arcY,
      e.nativeEvent.locationY
    );
    if (!Number.isNaN(angle)) {
      let roundedAngle = Math.fround(angle);
      endAngle.current = roundedAngle;
    }
  };

  React.useEffect(() => {
    (async () => {
      let alarmString = await AsyncStorage.getItem("alarm-store");
      if (!alarmString) return;

      let alarmData: Alarm = JSON.parse(alarmString);

      endAngle.current = getAngleFromTime(
        alarmData.countDownTime.hours,
        alarmData.countDownTime.minutes
      );
    })();
  }, []);

  const handleTouchEnd = async () => {
    let alarmString = await AsyncStorage.getItem("alarm-store");
    if (!alarmString) return;

    let alarmData: Alarm = JSON.parse(alarmString);

    let [hours, minutes] = timestamp.current.split(":").map(Number);

    let newAlarmData: Alarm = {
      ...alarmData,
      countDownTime: { hours, minutes },
      snooze: false,
    };

    setAlarm(newAlarmData);
  };

  return (
    <View>
      <Canvas
        onTouchStart={handleTouchResponse}
        onTouchMove={handleTouchResponse}
        onTouchEnd={handleTouchEnd}
        style={{
          width: "100%",
          height: 300,
          transform: [{ rotate: "-90deg" }],
        }}
      >
        <Circle r={110} cx={width / 2} cy={150} color="#fff">
          <Shadow dx={3} dy={3} blur={20} color={"#9e2a39"}></Shadow>
          <Shadow dx={-3} dy={-3} blur={20} color={"#9e2a39"}></Shadow>
        </Circle>
        <Circle r={102} cx={width / 2} cy={150} color="#e4e0e5"></Circle>
        <Circle r={67} cx={width / 2} cy={150} color="#fff"></Circle>
        <Group>
          <SweepGradient
            c={vec(110, 110)}
            colors={["#791624", "#ee1936", "#791624"]}
          />
          <Path
            path={CirclePath}
            style="stroke"
            strokeWidth={35}
            end={Selector(endAngle, (v) => v / 360)}
            strokeCap="round"
            strokeJoin={"round"}
          />
          <Circle
            cy={Selector(IndicatorPoint, (v) => v.y)}
            cx={Selector(IndicatorPoint, (v) => v.x)}
            r={16}
            style={"fill"}
            color={"#ee1936"}
          >
            <Shadow
              dx={7}
              dy={7}
              blur={10}
              color={"rgba(0,0,0,0.7)"}
              inner
            ></Shadow>
          </Circle>
          <Circle
            cy={Selector(IndicatorPoint, (v) => v.y)}
            cx={Selector(IndicatorPoint, (v) => v.x)}
            r={2}
            style={"fill"}
            color={"#fff"}
          ></Circle>
        </Group>
      </Canvas>
      <TextComponent timestamp={timestamp} />
    </View>
  );
}
// Repeat Modal
export function DateModal(props: DateModal) {
  const datesformodal = ["Once", "Daily", "Mon to Sat", "Custom"];
  const [selectedData, setSelectedDate] = props.state;

  return (
    <Modal
      transparent
      animationType="slide"
      onRequestClose={() => props.handler(Modals.None)}
      visible={props.open}
    >
      <SafeAreaView
        onTouchEnd={() => props.handler(Modals.None)}
        style={styles.ModalContainer}
      >
        <KeyboardAvoidingView>
          <View style={styles.ModalBack}>
            {datesformodal.map((date, index) => {
              if (date !== selectedData) {
                return (
                  <Pressable
                    key={index}
                    onPress={() => setSelectedDate(date)}
                    style={styles.ModalBlock}
                  >
                    <Text style={styles.ModalText}>{date}</Text>
                  </Pressable>
                );
              } else {
                return (
                  <Pressable
                    key={index}
                    onPress={() => setSelectedDate(date)}
                    style={[styles.ModalBlock, styles.ActiveModalBlock]}
                  >
                    <Text style={[styles.ModalText, styles.ActiveModalText]}>
                      {date}
                    </Text>
                    <Feather
                      style={styles.ActiveModalIcon}
                      name="check"
                      size={20}
                      color="#741623"
                    />
                    <View style={styles.ActiveModalBackground}></View>
                  </Pressable>
                );
              }
            })}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}
const dailyDates = [
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
const monTosat = [
  {
    label: "S",
    selected: false,
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

// Time Zone Modal
export function TimeZoneModal(props: TimeZoneModal) {
  const timeformodal = [
    "SST",
    "Asia/Delhi",
    "Asia/Dhaka",
    "Asia/Tokyo",
    "Japan",
    "Singapore",
    "Pacific/Truk",
  ];
  const [selectedTime, setSelectedTime] = props.state;

  return (
    <Modal
      transparent
      animationType="slide"
      onRequestClose={() => props.handler(Modals.None)}
      visible={props.open}
    >
      <SafeAreaView
        onTouchEnd={() => props.handler(Modals.None)}
        style={styles.ModalContainer}
      >
        <KeyboardAvoidingView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            style={[styles.ModalBack, styles.TimeZoneModal]}
          >
            {timeformodal.map((time, index) => {
              if (time !== selectedTime) {
                return (
                  <Pressable
                    key={index}
                    onPress={() => setSelectedTime(time)}
                    style={styles.ModalBlock}
                  >
                    <Text style={styles.ModalText}>{time}</Text>
                  </Pressable>
                );
              } else {
                return (
                  <Pressable
                    key={index}
                    onPress={() => setSelectedTime(time)}
                    style={[styles.ModalBlock, styles.ActiveModalBlock]}
                  >
                    <Text style={[styles.ModalText, styles.ActiveModalText]}>
                      {time}
                    </Text>
                    <Feather
                      style={styles.ActiveModalIcon}
                      name="check"
                      size={20}
                      color="#741623"
                    />
                    <View style={styles.ActiveModalBackground}></View>
                  </Pressable>
                );
              }
            })}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

// Timer Body
export default function U_AlarmScreen() {
  const navigation = useNavigation<any>();
  const [hourCount, setHour] = useState(calculateRemainingTime());
  const [modal, setModal] = React.useState<Modals>(Modals.None);
  const modalDateState = useState("Daily");
  const modalTimeState = useState("Asia/Delhi");
  const { onTouchStart, onTouchEnd } = useSwipe(handleBottomSwipe);
  const [alarm, setAlarm] = useAlarmStore();

  function handleSelection(index: number) {
    alarm.days[index].selected = !alarm.days[index].selected;
    setAlarm({ ...alarm });
    let isAllSelected = alarm.days.every((item) => item.selected);
    if (isAllSelected) {
      modalDateState[1]("Daily");
    } else {
      modalDateState[1]("Custom");
    }
  }
  useEffect(() => {
    let date = modalDateState[0];
    if (date === "Daily") {
      setAlarm({ ...alarm, days: dailyDates });
    } else if (date === "Mon to Sat") {
      setAlarm({ ...alarm, days: monTosat });
    } else if (date === "Once") {
      let today = new Date().getDay();
      let dailyDateCustom = dailyDates.map((_date, index) => {
        let date = { ..._date };
        date.selected = false;
        if (index == today) {
          date.selected = true;
        }
        return date;
      });
      setAlarm({ ...alarm, days: dailyDateCustom });
    }
  }, [modalDateState[0]]);

  // Prayer Timer Coundown
  useEffect(() => {
    let interval = setInterval(() => {
      setHour(calculateRemainingTime());
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    (async () => {
      if (alarm.snooze) {
        await cancelAlarmNotification();
      } else {
        let days = alarm.days
          .map((day, index) => ({ ...day, index: index + 1 }))
          .filter((day) => day.selected)
          .map((item) => item.index);

        await registerAlarmNotification(
          days,
          true,
          alarm.time,
          alarm.countDownTime,
          alarm.vibrate
        );
      }
    })();
  }, [alarm]);

  // Gesture Handle
  function handleBottomSwipe() {
    navigation.goBack();
  }
  return (
    <View style={styles.Container}>
      <SafeAreaView style={styles.Container}>
        {/* Drag to close section */}
        <View style={styles.DragContainer}>
          <View style={styles.DragBar}></View>
          <Pressable
            style={styles.CloseBtn}
            onPress={() => navigation.goBack()}
          >
            <Entypo style={styles.CloseIcon} name="cross" />
          </Pressable>
        </View>

        {/* Prayer time remaining */}
        <View
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={styles.TimerTopBlock}
        >
          {alarm.snooze ? (
            ""
          ) : (
            <Text style={styles.TimerText}>PRAYER START AFTER</Text>
          )}
          {alarm.snooze ? (
            ""
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text style={styles.TimerCountdown}>{hourCount.hours}</Text>
              <Text style={{ color: "white", fontSize: 24 }}>Hours</Text>
              <Text style={styles.TimerCountdown}>{hourCount.minutes}</Text>
              <Text style={{ color: "white", fontSize: 24 }}>Minutes</Text>
            </View>
          )}
          {/* <Text style={styles.TimerText}>PRAYER START AFTER</Text> */}
        </View>

        {/* Timer */}
        <Pressable
          onTouchStart={(e) => e.stopPropagation()}
          style={styles.TimerDownBlock}
        >
          <Text
            style={[
              styles.TimerText,
              {
                textAlign: "center",
                maxWidth: 200,
                textTransform: "uppercase",
                marginTop: 30,
              },
            ]}
          >
            {alarm.snooze ? "" : " Set Reminder For Prayer at 1:20 PM"}
          </Text>
          {/* Clock Design */}
          {/* <CircularProgress /> */}
          {/* Bottom Part */}
          {/* Date */}

          <View style={styles.ClockDateContainer}>
            {alarm.days.map((date, index) => {
              if (date.selected) {
                return (
                  <Pressable
                    key={index}
                    onPress={() => handleSelection(index)}
                    style={styles.ClockDateClick}
                  >
                    <Text style={styles.ClockDateText}>{date.label}</Text>
                    <Image style={styles.ClockDateBlock} source={Alerm_3} />
                  </Pressable>
                );
              } else {
                return (
                  <Pressable
                    key={index}
                    onPress={() => handleSelection(index)}
                    style={styles.ClockDateClick}
                  >
                    <Text style={styles.ClockDateText}>{date.label}</Text>
                    <Image style={styles.ClockDateBlock} source={Alerm_4} />
                  </Pressable>
                );
              }
            })}
          </View>

          {/* Controller */}
          <View style={styles.ControllerBlock}>
            <Text style={styles.TimerText}>Repeat</Text>
            <Pressable
              style={styles.ControllerLink}
              onPress={() => setModal(Modals.DateModal)}
            >
              <Text style={styles.ControllerTextOption}>
                {modalDateState[0]}{" "}
                <SimpleLineIcons name="arrow-right" size={16} color="white" />
              </Text>
            </Pressable>
          </View>
          <View style={styles.ControllerBlock}>
            <Text style={styles.TimerText}>Vibrate when alarm sounds</Text>
            <Switch
              style={{ backgroundColor: "rgba(0,0,0,0.3)", borderRadius: 15 }}
              value={alarm.vibrate !== undefined}
              onChange={(value) => {
                if (!alarm.vibrate) {
                  setAlarm({ ...alarm, vibrate: VIBRATE_PATTERN });
                  return;
                }
                setAlarm({ ...alarm, vibrate: undefined });
              }}
            />
          </View>
          <View style={styles.ControllerBlock}>
            <Text style={styles.TimerText}>Snooze</Text>
            <Switch
              style={{ backgroundColor: "rgba(0,0,0,0.3)", borderRadius: 15 }}
              value={alarm.snooze}
              onChange={() => {
                setAlarm({ ...alarm, snooze: !alarm.snooze });
                return;
              }}
            />
          </View>
        </Pressable>

        {/* Modals */}
        <DateModal
          state={modalDateState}
          open={modal == Modals.DateModal}
          handler={setModal}
        />
        <TimeZoneModal
          state={modalTimeState}
          open={modal == Modals.TimeZoneModal}
          handler={setModal}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#741623",
  },
  TimerOffBackCover: {
    backgroundColor: Black,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    opacity: 0.7,
  },
  TimerOffBtnCover: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 60,
    height: 60,
    alignSelf: "center",
    borderRadius: 100,
    zIndex: 3,
  },
  CloseBtn: {
    position: "absolute",
    top: 0,
    right: 10,
    backgroundColor: White,
    width: 35,
    height: 35,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  CloseIcon: {
    color: "red",
    fontSize: 25,
  },

  // Drag Design
  DragContainer: {
    height: "3%",
    justifyContent: "center",
    alignItems: "center",
  },
  DragBar: {
    width: 50,
    height: 4,
    borderRadius: 50,
    backgroundColor: White,
    opacity: 0.7,
  },
  TimerTopBlock: {
    height: "16%",
    paddingTop: 10,
  },
  TimerText: {
    fontFamily: "Inter-Regular",
    fontSize: 20,
    color: White,
    alignSelf: "center",
  },
  TimerCountdown: {
    fontFamily: "Inter-Bold",
    fontSize: 40,
    color: White,
    alignSelf: "center",
  },
  TimerDownBlock: {
    height: "81%",
    paddingTop: 15,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    position: "relative",
    zIndex: 0,
    backgroundColor: PrimaryColor,
    shadowColor: "#F40E2E",
    shadowOffset: {
      width: 0,
      height: -15,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,

    elevation: 12,
  },

  // Clock Design
  ClockContainer: {
    alignSelf: "center",
    position: "relative",
    marginTop: 20,
    marginBottom: 20,
  },
  ClockBackImage: {
    width: 240,
    height: 240,
  },
  ClockOuterCircle: {
    position: "absolute",
    width: 220,
    height: 220,
    backgroundColor: "#D5D6DE",
    borderRadius: 1000,
    top: 10,
    zIndex: 1,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  ClockInnerCircle: {
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    borderRadius: 1000,
    backgroundColor: White,
  },
  ClockText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 22,
  },

  // Date
  ClockDateContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingLeft: 10,
    paddingRight: 10,
  },
  ClockDateClick: {
    position: "relative",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  ClockDateText: {
    position: "absolute",
    zIndex: 1,
    fontFamily: "Inter-SemiBold",
    color: White,
    fontSize: 16,
  },
  ClockDateBlock: {
    width: 40,
    height: 40,
  },

  // Controller
  ControllerBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 25,
    alignItems: "center",
  },
  ControllerLink: {
    alignItems: "center",
    justifyContent: "center",
  },
  ControllerTextOption: {
    fontFamily: "Inter-Regular",
    fontSize: 20,
    color: White,
    alignSelf: "center",
    opacity: 0.5,
  },
  TimerOffBtn: {
    marginTop: 30,
    position: "relative",
    zIndex: 2,
  },
  TimerOffBtnImg: {
    width: 60,
    height: 60,
    alignSelf: "center",
  },

  // DateModal
  ModalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  ModalBack: {
    backgroundColor: BackgroundColor,
    height: "auto",
    margin: 10,
    paddingBottom: 40,
    paddingTop: 40,
  },
  ModalBlock: {
    paddingBottom: 16,
    paddingTop: 16,
    paddingLeft: 20,
    paddingRight: 20,
  },
  ModalText: {
    color: Black,
    fontFamily: "Inter-Medium",
    fontSize: 18,
  },
  ActiveModalBlock: {
    position: "relative",
    zIndex: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  ActiveModalText: {
    fontFamily: "Inter-Medium",
    color: PrimaryColor,
    zIndex: 2,
  },
  ActiveModalBackground: {
    backgroundColor: PrimaryColor,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    opacity: 0.4,
  },
  ActiveModalIcon: {
    position: "absolute",
    right: 20,
    zIndex: 2,
  },

  // TimeZoneModal
  TimeZoneModal: {
    height: 310,
    paddingTop: 0,
    paddingBottom: 0,
  },
});
