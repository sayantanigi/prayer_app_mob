import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Pressable,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useUser } from "../../../../../store/user";
import O_ScreenLayout from "../../O_ScreenLayout";
import EventTimeAccordion from "../../../../../Component/EventTimeAccordion";
import { Back_1, HomeIcon_2 } from "../../../../../Constant/Images";
import ProgressBar from "../../../../../Component/ProgressBar";
import {
  Black,
  PrimaryColor,
  StatusBarBack,
  TextColor,
  White,
} from "../../../../../Constant/Color";
import { routes } from "../../../../../Constant/URL";
import { getUser } from "../../../../../store/userAsync";

export interface UpcomingEvent {
  id: string;
  organizername: string;
  prayer_name: string;
  prayer_description: string;
  prayer_image: string;
  prayer_subheading: string;
  prayer_datetime: string;
  prayer_location: string;
  countdown: string;
}

export function getCurrentDate(today: Date = new Date()) {
  return `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getDate()}`;
}

export function getWeekList(date: Date = new Date()) {
  let todayWeekDay = date.getDay();
  let dates = [];
  let firstDateofWeek = new Date(date).setDate(
    new Date(date).getDate() - todayWeekDay
  );
  for (let i = 0; i < 7; i++) {
    dates.push(new Date(firstDateofWeek + 60 * 60 * 24 * 1000 * i));
  }
  return dates;
}

export const WeekDays = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

export function calculateTranslateX(index: number) {
  let boxSize = (Dimensions.get("window").width - 40) / 7;
  return boxSize * index;
}

export default function O_EventScreen() {
  const [reloadFlag, setReloadFlag] = useState(false);
  const handleReload = () => {
    // Set the flag to trigger a reload
    setReloadFlag(true);
  };
  const [user, setUser] = useUser();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const [date, setDate] = React.useState(getCurrentDate());
  const week = React.useMemo(() => getWeekList(new Date(date)), [date]);
  const active = React.useMemo(() => new Date(date).getDay(), [date]);
  const [getUpcomingevent, setUpcomingEvent] = useState<UpcomingEvent[]>([]);
  const weekInfo = React.useMemo(() => {
    let firstWeekDate = week[0];
    let lastWeekDate = week[6];
    let weekData = `${firstWeekDate.getDate()} - ${lastWeekDate.getDate()} ${lastWeekDate.toLocaleDateString(
      "en",
      { month: "long" }
    )}`;
    return weekData;
  }, [date]);
  const translateX = React.useRef(
    new Animated.Value(calculateTranslateX(active))
  ).current;
  const [formData, setFormData] = useState({
    selected_date: "",
    user_id: "",
  });
  React.useEffect(() => {
    Animated.timing(translateX, {
      useNativeDriver: true,
      duration: 450,
      toValue: calculateTranslateX(active),
    }).start();
  }, [active]);

  const eventBoxX = translateX.interpolate({
    inputRange: [0, Dimensions.get("window").width - 40],
    outputRange: [0, -Dimensions.get("window").width * 7],
  });

  useEffect(() => {
    (async () => {
      setUser(await getUser());

      setFormData({
        ...formData,
        user_id: String(user?.userId),
        selected_date: String(date),
      });
      // setReloadFlag(false);
      setLoading(true);
      let response = await fetch(`${routes.getUpcomingPrayer}`, {
        method: "POST",
        body: JSON.stringify({ user_id: user?.userId, selected_date: date }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);

      let json = await response.json();
      console.log(json);
      setUpcomingEvent(json.result.upcoming_events);
    })();
  }, [user?.userId, date]);

  return (
    <O_ScreenLayout
      BannerHidden
      HeaderHidden
      VideoHidden
      ProductBuyHidden
      ProductCartHidden
      ProductCheckoutHidden
      title="Upcoming Prayer"
    >
      <SafeAreaView style={styles.Container}>
        <View style={styles.EventHeaderContainer}>
          <Text style={styles.EventHeaderText}>
            Calendar of Prayers in Prayer App
          </Text>
        </View>

        {/* EventTimeTable */}
        <EventTimeAccordion weekInfo={weekInfo}>
          <Calendar
            style={{ width: "100%", paddingBottom: 15 }}
            onDayPress={(date) => {
              setDate(date.dateString);
            }}
            markedDates={{
              [date]: {
                selected: true,
                selectedColor: "#741623",
                selectedTextColor: "#ffffff",
              },
            }}
          />
        </EventTimeAccordion>

        {/* Event Week Table */}
        <View style={styles.EventWeekCalender}>
          <Animated.View
            style={[styles.weekIndicator, { transform: [{ translateX }] }]}
          ></Animated.View>
          <View style={styles.WeekBox}>
            {week.map((date, index) => {
              if (active !== index) {
                return (
                  <Pressable
                    onPress={() => setDate(getCurrentDate(date))}
                    style={styles.WeekDate}
                    key={index}
                  >
                    <Text style={styles.DayName}>
                      {(WeekDays as any)[date.getDay()]}
                    </Text>
                    <Text style={styles.WeekDayName}>{date.getDate()}</Text>
                  </Pressable>
                );
              } else {
                return (
                  <Pressable
                    onPress={() => setDate(getCurrentDate(date))}
                    style={styles.WeekDate}
                    key={index}
                  >
                    <Text style={styles.DayNameActive}>
                      {(WeekDays as any)[date.getDay()]}
                    </Text>
                    <Text style={styles.WeekDayActive}>{date.getDate()}</Text>
                  </Pressable>
                );
              }
            })}
          </View>
        </View>

        <Animated.View
          style={[
            styles.EventBoxWrap,
            { transform: [{ translateX: eventBoxX }] },
          ]}
        >
          {new Array(7).fill(0).map((_, i) => (
            <View style={styles.EventBox} key={i}>
              {/* Single Event Tile Start */}

              {getUpcomingevent && getUpcomingevent.length > 0 ? (
                getUpcomingevent.map(function (
                  item: UpcomingEvent,
                  index: number
                ) {
                  return (
                    <View style={styles.EventBlock} key={index}>
                      <View style={styles.EventData}>
                        <Image
                          style={styles.EventImg}
                          source={{ uri: item?.prayer_image }}
                          resizeMode="cover"
                        />
                        <View style={styles.EventTextContainer}>
                          <Text style={styles.EventHeading} numberOfLines={1}>
                            {item?.prayer_name}
                          </Text>
                          <Text style={styles.EventUserText} numberOfLines={1}>
                            By {item?.organizername}
                          </Text>
                          <Text style={styles.EventTime}>
                            {item?.prayer_datetime}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.EventTimeBlock}>
                        <Image
                          style={styles.EventTimeIcon}
                          source={HomeIcon_2}
                        />
                        <Image style={styles.EventTimeBack} source={Back_1} />
                        <Text style={styles.EventTimeText}>
                          {item?.countdown.split(",")[0]}
                        </Text>
                        <Text style={styles.EventTimeText}>
                          {item?.countdown.split(",")[1]}
                        </Text>
                      </View>
                    </View>
                  );
                })
              ) : (
                <Text style={{ fontSize: 15, textAlign: "center" }}>
                  No upcoming events
                </Text>
              )}

              {/* Single Event Tile End */}
            </View>
          ))}
        </Animated.View>

        <ProgressBar loading={loading} />
      </SafeAreaView>
    </O_ScreenLayout>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  // Event Header
  EventHeaderContainer: {
    padding: 20,
  },
  EventHeaderText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 20,
    alignSelf: "center",
  },
  EventWeekCalender: {
    borderTopWidth: 1,
    borderTopColor: StatusBarBack,
  },
  // Event Week Style
  WeekBox: {
    width: Dimensions.get("window").width,
    paddingHorizontal: 20,
    backgroundColor: White,
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  WeekDate: {
    width: `${100 / 7}%`,
    justifyContent: "center",
    alignItems: "center",
    height: 70,
  },
  weekIndicator: {
    backgroundColor: PrimaryColor,
    width: `${100 / 7}%`,
    height: 3,
    position: "absolute",
    zIndex: 1,
    left: 20,
  },
  WeekDayName: {
    fontSize: 18,
    fontFamily: "Inter-Regular",
  },
  WeekDayActive: {
    fontSize: 18,
    fontFamily: "Inter-Regular",
    color: PrimaryColor,
  },
  DayName: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
  },
  DayNameActive: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: PrimaryColor,
  },
  EventBox: {
    paddingHorizontal: 20,
    marginVertical: 10,
    width: Dimensions.get("window").width,
  },
  EventBoxWrap: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
  },

  // Upcoming Events
  EventBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width - 40,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: White,
    marginVertical: 5,
  },
  EventData: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },
  EventImg: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  EventTextContainer: {
    flexDirection: "column",
    paddingLeft: 10,
  },
  EventHeading: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    color: PrimaryColor,
    width: 120,
  },
  EventUserText: {
    fontFamily: "Inter-Regular",
    fontSize: 10,
    color: TextColor,
    marginBottom: 5,
    width: 120,
  },
  EventTime: {
    fontFamily: "Inter-Medium",
    fontSize: 10,
    color: Black,
    lineHeight: 1.5 * 10,
  },
  EventTimeBlock: {
    position: "relative",
    width: 90,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  EventTimeBack: {
    width: 90,
    height: "100%",
    position: "absolute",
    zIndex: -1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  EventTimeIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  EventTimeText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    lineHeight: 1.5 * 12,
    color: White,
  },
});
