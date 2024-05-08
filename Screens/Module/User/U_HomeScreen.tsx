import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import HTML from "react-native-render-html";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Pressable,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  BackgroundColor,
  Black,
  PrimaryColor,
  TextColor,
  White,
} from "../../../Constant/Color";
import U_ScreenLayout from "./U_ScreenLayout";
import Link from "../../../Component/Link";
import { useMusicStore } from "../../../store/music";
import {
  Back_1,
  BlankImage,
  BlankVideo,
  HomeIcon_1,
  HomeIcon_2,
  HomeIcon_3,
  HomeIcon_4,
  HomeIcon_5,
} from "../../../Constant/Images";
import { routes } from "../../../Constant/URL";
import { useAlarmStore } from "../../../store/alarm";
import {
  cancelAlarmNotification,
  registerAlarmNotification,
} from "../../../task/AlermTask";
import { useUser } from "../../../store/user";
import { getUser } from "../../../store/userAsync";
export interface PrayerWall {
  id: string;
  user_id: string;
  prayer_name: string;
  prayer_description: string;
  prayer_image: string;
  prayer_subheading: string;
  prayer_datetime: string;
  prayer_location: string;
  count: string;
}
export interface UpcomingEvent {
  id: string;
  organizername: string;
  prayer_name: string;
  prayer_description: string;
  prayer_image: string;
  prayer_subheading: string;
  prayer_datetime: string;
  prayer_location: any;
  countdown: string;
}
export interface LatestPodcast {
  id: string;
  user_id: string;
  category_name: string;
  podcast_name: string;
  podcast_description: string;
  podcast_cover_image: string;
}

export interface LatestVideo {
  id: string;
  organizername: string;
  category_name: string;
  videos_name: string;
  videos_description: string;
  videos_file: string;
  videos_link: string;
  view_count: string;
  video_cover_image: string;
  profilePic: string;
}

export default function U_HomeScreen() {
  const navigation = useNavigation<any>();
  const [shouldShow, setShouldShow] = useState(true);
  const [getLatestPodcast, setLatestPodcast] = useState<LatestPodcast[]>([]);
  const [getLatestVideo, setLatestVideo] = useState<LatestVideo[]>([]);
  const [getPrayerWall, setPrayerWall] = useState<PrayerWall[]>([]);
  const [getUpcomingEvent, setUpcomingEvent] = useState<UpcomingEvent[]>([]);
  const [alarm, setAlarm] = useAlarmStore();
  const [user, setUser] = useUser();

  const [podcast, setPodcast] = useMusicStore();
  const video = React.useRef(null);
  useEffect(() => {
    (async () => {
      let response = await fetch(`${routes.getHomeList}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let json = await response.json();
      setPrayerWall(json.result.prayer_wall);
      setUpcomingEvent(json.result.upcoming_events);
      setLatestVideo(json.result.latest_videos);
      setLatestPodcast(json.result.latest_podcast);
    })();
  }, []);

  const onStopAlarmButton = async () => {
    let snooze = !alarm.snooze;

    if (snooze) {
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
    setAlarm({ ...alarm, snooze });
  };
  function gotoCareerTipsDetails(
    id: string,
    name: string,
    prayer_image: string
  ): void {
    navigation.navigate("U_PrayerJoinScreen", {
      name: name,
      images: prayer_image,
      eventid: id,
    });
  }
  function handleViewDetails(id: string) {
    navigation.navigate("U_PrayerDetailsScreen", { prayer_id: id });
  }
  console.log(user);
  async function musicFunctionCall(id: string) {
    // setUser(await getUser());
    let response = await fetch(`${routes.getpodcastdetaild}`, {
      method: "POST",
      body: JSON.stringify({ podcast_id: id, user_id: user?.userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let json = await response.json();
    setPodcast({
      coverImage: { uri: json.result[0].podcast_cover_image },
      artist: json.result[0].podcast_singer_name,
      audio: { uri: json.result[0].podcast_file },
      title: json.result[0].podcast_name,
      details: json.result[0].podcast_name,
      isliked: json.result[0].isliked,
      p_id: json.result[0].id,
    });
    // console.log(json.result[0].podcast_file);
  }

  return (
    <U_ScreenLayout
      BannerHidden
      ToolBarHidden
      VideoHidden
      ProductBuyHidden
      ProductCartHidden
      ProductCheckoutHidden
    >
      <ScrollView showsVerticalScrollIndicator={false} style={styles.Container}>
        {/* Alarm */}
        {shouldShow ? (
          <>
            <View style={{ paddingLeft: 20, paddingRight: 20 }}>
              <View style={styles.AlarmBlock}>
                <View style={styles.AlarmTimeBlock}>
                  <Text style={styles.AlarmTime}>1:20 pm</Text>
                </View>
                <View style={styles.AlarmDataBlock}>
                  <Text style={styles.AlarmText}>Its 1:20 Lets Pray</Text>
                  <View style={styles.AlarmBtnBlock}>
                    <Pressable
                      style={styles.AlarmBtn}
                      onPress={onStopAlarmButton}
                    >
                      <Text style={styles.AlarmBtnText}>
                        {alarm.snooze ? "Start Alarm" : "Stop Alarm"}
                      </Text>
                    </Pressable>

                    <Link style={styles.AlarmBtn} to="O_AlarmScreen">
                      <Text style={styles.AlarmBtnText}>Manage Reminder</Text>
                    </Link>
                  </View>
                </View>
                <Image style={styles.AlarmImgBack} source={HomeIcon_1} />
              </View>
            </View>
          </>
        ) : (
          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            <View style={styles.AlarmBlock}>
              <View style={styles.AlarmTimeBlock}>
                <Text style={styles.AlarmTime}>1:20 pm</Text>
              </View>
              <View style={styles.AlarmDataBlock}>
                <Text style={styles.AlarmText}>Its 1:20 Lets Pray</Text>
                <View style={styles.AlarmBtnBlock}>
                  <Pressable
                    style={[styles.AlarmBtn, styles.StopAlarmReminder]}
                    onPress={() => setShouldShow(!shouldShow)}
                  >
                    <Text style={styles.AlarmBtnText}>Start Reminder</Text>
                  </Pressable>
                  <View style={[styles.AlarmBtn, styles.StopAlarmReminder]}>
                    <Text style={styles.AlarmBtnText}>Manage Reminder</Text>
                  </View>
                </View>
              </View>
              <Image style={styles.AlarmImgBack} source={HomeIcon_1} />
            </View>
          </View>
        )}

        {/* Upcoming Events */}
        <View style={styles.BlockData}>
          <Text style={styles.BlockHeading}>Upcoming Events</Text>
          <Link style={styles.ViewAll} to="U_EventScreen">
            <Text style={styles.ViewAllText}>View All</Text>
          </Link>
        </View>
        <Text style={styles.BlockSubHead}>
          Make plans to attend one of our prayer gatherings.
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.BlockContainer}
        >
          {/* Single Event Tile Start */}

          {Array.isArray(getUpcomingEvent) &&
            getUpcomingEvent?.map(function (
              item: UpcomingEvent,
              index: number
            ) {
              return (
                <View style={styles.EventBlock}>
                  <View style={styles.EventData}>
                    <Image
                      style={styles.EventImg}
                      source={
                        item.prayer_image
                          ? { uri: item.prayer_image }
                          : BlankImage
                      }
                      resizeMode="cover"
                    />
                    <View style={styles.EventTextContainer}>
                      <Text style={styles.EventHeading} numberOfLines={1}>
                        {item.prayer_name}
                      </Text>
                      <Text style={styles.EventUserText} numberOfLines={1}>
                        By {item.organizername}
                      </Text>
                      <Text style={styles.EventTime}>
                        {item.prayer_datetime}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.EventTimeBlock}>
                    <Image style={styles.EventTimeIcon} source={HomeIcon_2} />
                    <Image style={styles.EventTimeBack} source={Back_1} />
                    <Text style={styles.EventTimeText}>
                      {item.countdown.split(",")[0]}
                    </Text>
                    <Text style={styles.EventTimeText}>
                      {item.countdown.split(",")[1]}
                    </Text>
                  </View>
                </View>
              );
            })}

          {/* Single Event Tile End */}
        </ScrollView>

        {/* Prayer Wall */}
        <View style={styles.BlockData}>
          <Text style={styles.BlockHeading}>Prayer Wall</Text>
          <Link style={styles.ViewAll} to={"U_PrayerBoardScreen"}>
            <Text style={styles.ViewAllText}>View All</Text>
          </Link>
        </View>
        <Text style={styles.BlockSubHead}>
          Discover the recent prayer events in your area and attend them right
          now.
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.BlockContainer}
        >
          {/* Single Prayer Tile Start */}
          {/* {new Array(3).fill(0).map((item, Prayerindex) => (
                       
                    ))} */}

          {Array.isArray(getPrayerWall) &&
            getPrayerWall?.map(function (item: PrayerWall, index: number) {
              return (
                <View style={styles.PrayerBlock}>
                  <View style={styles.PrayerData}>
                    <View style={styles.PrayerTextData}>
                      <Text style={styles.PrayerHeading} numberOfLines={1}>
                        {item.prayer_name}
                      </Text>
                      <Text style={styles.PrayerText} numberOfLines={1}>
                        {item.prayer_location}
                      </Text>
                      <Text style={styles.PrayerText} numberOfLines={1}>
                        {item.prayer_datetime}
                      </Text>
                      <View style={styles.PrayerJoin}>
                        <Image
                          style={styles.PrayerJoinIcon}
                          source={HomeIcon_3}
                          resizeMode="contain"
                        />
                        <Text style={styles.PrayerJoinText}>
                          {item.count} have joined already
                        </Text>
                      </View>
                    </View>
                    <View style={styles.PrayerImage}>
                      <Image
                        style={styles.PrayerImg}
                        source={{ uri: item.prayer_image }}
                      />
                    </View>
                  </View>
                  <View style={styles.PrayerBtnContainer}>
                    <Pressable
                      style={styles.PrayerJoinBtn}
                      onPress={() =>
                        gotoCareerTipsDetails(
                          item.id,
                          item.prayer_name,
                          item.prayer_image
                        )
                      }
                    >
                      <Text style={styles.PrayerJoinBtnText}>Join Now</Text>
                      <Image
                        style={styles.PrayerJoinBtnBack}
                        source={HomeIcon_4}
                        resizeMode="contain"
                      />
                    </Pressable>
                    <Pressable
                      style={styles.PrayerViewBtn}
                      onPress={() => {
                        handleViewDetails(item.id);
                        // setPodcast(item);
                      }}
                    >
                      <Text style={styles.PrayerViewText}>View Details</Text>
                    </Pressable>
                  </View>
                </View>
              );
            })}

          {/* Single Prayer Tile End */}
        </ScrollView>

        {/* Podcasts */}
        <View style={styles.BlockData}>
          <Text style={styles.BlockHeading}>Latest Podcasts</Text>
          <Link style={styles.ViewAll} to={"U_PodcastScreen"}>
            <Text style={styles.ViewAllText}>View All</Text>
          </Link>
        </View>
        <Text style={styles.BlockSubHead}>
          Listen to our most recent podcast about our numerous types of prayer
          events.
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.BlockContainer}
        >
          {/* Single Podcast Tile Start */}

          {Array.isArray(getLatestPodcast) &&
            getLatestPodcast?.map(function (
              item: LatestPodcast,
              index: number
            ) {
              return (
                <Pressable
                  onPress={() => {
                    musicFunctionCall(item.id);
                  }}
                  style={styles.PodBlock}
                >
                  <Text style={styles.PodLang}>English</Text>
                  <Text style={styles.PodHeading} numberOfLines={2}>
                    {item.podcast_name}
                  </Text>
                  <Text style={styles.PodSubHeading} numberOfLines={1}>
                    {item.category_name}
                  </Text>
                  <Image
                    style={styles.PodPlayIcon}
                    source={HomeIcon_5}
                    resizeMode="contain"
                  />
                  <View style={styles.PodImgContainer}>
                    <View style={styles.PodOverlay}></View>
                    <Image
                      style={styles.PodImg}
                      source={{ uri: item.podcast_cover_image }}
                      resizeMode="cover"
                    />
                  </View>
                </Pressable>
              );
            })}

          {/* Single Podcast Tile End */}
        </ScrollView>

        {/* Video */}
        <View style={styles.BlockData}>
          <Text style={styles.BlockHeading}>Latest Videos</Text>
          {/* <Link style={styles.ViewAll} to={"U_VideoScreen"}>
            <Text style={styles.ViewAllText}>View All</Text>
          </Link> */}
        </View>
        <Text style={styles.BlockSubHead}>
          Discover our most recent prayers, posts, and more.
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.BlockContainer}
        >
          {/* Single Video Tile Start */}
          {Array.isArray(getLatestVideo) &&
            getLatestVideo?.map(function (item: LatestVideo, index: number) {
              return (
                <Pressable
                  style={styles.VideoBlock}
                  onPress={() =>
                    navigation.navigate("O_VideoPlayerScreen", item.id)
                  }
                >
                  <View style={styles.VideoData}>
                    <Image
                      style={styles.VideoImg}
                      source={{ uri: item.video_cover_image }}
                      resizeMode="cover"
                    />
                    <Image
                      style={styles.PodPlayIcon}
                      source={HomeIcon_5}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.VideoOwner}>
                    <View style={styles.VideoOwnerText}>
                      <Image
                        style={styles.VideoOwnerImg}
                        source={{ uri: item.profilePic }}
                        resizeMode="contain"
                      />

                      <Text style={styles.VideoOwnerHeading} numberOfLines={2}>
                        {/* {item.videos_description.replace(/<[^>]*>/g, "")} */}
                        <HTML source={{ html: item.videos_name }}></HTML>
                      </Text>
                    </View>
                    <Text style={styles.VideoOwnerView}>
                      {item.view_count} View
                    </Text>
                  </View>
                </Pressable>
              );
            })}

          {/* Single Video Tile End */}
        </ScrollView>
      </ScrollView>
    </U_ScreenLayout>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: BackgroundColor,
    width: "100%",
    height: "100%",
    paddingTop: 20,
  },
  // Common Styles
  BlockData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  BlockHeading: {
    fontSize: 20,
    fontFamily: "Inter-SemiBold",
  },
  ViewAll: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 25,
    elevation: 10,
    backgroundColor: White,
    borderRadius: 100,
  },
  ViewAllText: {
    fontSize: 12,
    fontFamily: "Inter-SemiBold",
    color: PrimaryColor,
  },
  BlockSubHead: {
    fontSize: 15,
    fontFamily: "Inter-Regular",
    color: TextColor,
    letterSpacing: 1.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 5,
    marginBottom: 20,
  },
  BlockContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    gap: 15,
  },

  // Alarm
  AlarmBlock: {
    flexDirection: "row",
    width: Dimensions.get("window").width - 50,
    height: 100,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: White,
    position: "relative",
    padding: 10,
  },
  AlarmTimeBlock: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    elevation: 10,
    backgroundColor: White,
    borderRadius: 10,
  },
  AlarmTime: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    color: PrimaryColor,
  },
  AlarmDataBlock: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  AlarmText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    color: White,
  },
  AlarmBtnBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  AlarmBtn: {
    backgroundColor: PrimaryColor,
    borderRadius: 100,
    width: 110,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  AlarmBtnText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 10,
    color: White,
  },
  AlarmImgBack: {
    position: "absolute",
    width: Dimensions.get("window").width - 50,
    height: 100,
    borderRadius: 10,
    top: 0,
    left: 0,
    zIndex: -1,
  },
  StopAlarmReminder: {
    backgroundColor: Black,
    opacity: 0.7,
  },

  // Upcoming Events
  EventBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width - 50,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: White,
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

  // Prayer Wall
  PrayerBlock: {
    width: Dimensions.get("window").width - 50,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: White,
    padding: 10,
    paddingBottom: 15,
  },
  PrayerData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  PrayerTextData: {},
  PrayerHeading: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    color: PrimaryColor,
    marginBottom: 10,
    width: 200,
  },
  PrayerText: {
    fontFamily: "Inter-Regular",
    fontSize: 10,
    color: TextColor,
    width: 200,
  },
  PrayerJoin: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  PrayerJoinIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  PrayerJoinText: {
    fontFamily: "Inter-Medium",
    fontSize: 10,
    color: Black,
    lineHeight: 1.5 * 10,
  },
  PrayerImage: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: "100%",
  },
  PrayerImg: {
    width: 85,
    height: 85,
    borderRadius: 100,
  },
  PrayerBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  PrayerJoinBtn: {
    width: 130,
    height: 45,
    elevation: 5,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  PrayerJoinBtnText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    color: White,
  },
  PrayerJoinBtnBack: {
    width: 130,
    height: 45,
    position: "absolute",
    zIndex: -1,
  },
  PrayerViewBtn: {
    width: 130,
    height: 45,
    elevation: 5,
    backgroundColor: White,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  PrayerViewText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: PrimaryColor,
  },

  // Podcasts
  PodBlock: {
    width: Dimensions.get("window").width - 50,
    borderRadius: 10,
    elevation: 3,
    height: 180,
    position: "relative",
    padding: 10,
  },
  PodLang: {
    color: White,
    fontFamily: "Inter-Medium",
    fontSize: 13,
  },
  PodHeading: {
    color: White,
    fontFamily: "Inter-SemiBold",
    fontSize: 20,
    position: "absolute",
    left: 10,
    bottom: 30,
    width: 250,
  },
  PodSubHeading: {
    color: White,
    fontFamily: "Inter-Medium",
    fontSize: 13,
    position: "absolute",
    left: 10,
    bottom: 10,
    width: 250,
  },
  PodPlayIcon: {
    position: "absolute",
    width: 50,
    height: 50,
    right: 10,
    bottom: 10,
  },
  PodImgContainer: {
    width: Dimensions.get("window").width - 50,
    height: 180,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
  },
  PodOverlay: {
    width: Dimensions.get("window").width - 50,
    height: 180,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    backgroundColor: Black,
    opacity: 0.4,
    borderRadius: 10,
  },
  PodImg: {
    width: Dimensions.get("window").width - 50,
    height: 180,
    borderRadius: 10,
  },

  // Video
  VideoBlock: {
    width: Dimensions.get("window").width - 50,
  },
  VideoData: {
    width: Dimensions.get("window").width - 50,
    borderRadius: 10,
    elevation: 3,
    height: 180,
    position: "relative",
  },
  VideoImg: {
    width: Dimensions.get("window").width - 50,
    height: 180,
    borderRadius: 10,
  },
  VideoOwner: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  VideoOwnerImg: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  VideoOwnerText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  VideoOwnerHeading: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
    width: 200,
    paddingLeft: 10,
  },
  VideoOwnerView: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
  },
});
