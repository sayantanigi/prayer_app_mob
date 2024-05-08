import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Pressable,
  ScrollView,
  Text,
  Dimensions,
} from "react-native";
import U_ScreenLayout from "../U_ScreenLayout";
import { Ionicons } from "@expo/vector-icons";
import { useMusicStore } from "../../../../store/music";
import {
  Black,
  PrimaryColor,
  TextColor,
  White,
} from "../../../../Constant/Color";
import {
  BlankImage,
  HomeIcon_5,
  Icon_47,
  Icon_8,
} from "../../../../Constant/Images";
import { routes } from "../../../../Constant/URL";
import { useUser, userStore } from "../../../../store/user";
import { getUser } from "../../../../store/userAsync";

const apiData = [
  {
    coverImage: BlankImage,
    artist: "Song by Ed Sheeran",
    audio: require("../../../../assets/Mp3/music1.mp3"),
    title: "Perfect (Official Music Video)",
    details: "EP. 12: Daily Rosary Meditations | Ed Sheeran",
    duration: "4 min 39 sec",
  },
  {
    coverImage: BlankImage,
    artist: "Song by Wiz Khalifa",
    audio: require("../../../../assets/Mp3/music2.mp3"),
    title: "See You Again ft. Charlie Puth",
    details: "EP. 13: Daily Rosary Meditations | Wiz Khalifa",
    duration: "3 min 57 sec",
  },
  {
    coverImage: BlankImage,
    artist: "Song by Yanni",
    audio: require("../../../../assets/Mp3/music3.mp3"),
    title: "Nightingale - The Tribute Concerts",
    details: "EP. 14: Daily Rosary Meditations | Yanni",
    duration: "4 min 4 sec",
  },
];

const apiOtherData = [
  {
    coverImage: BlankImage,
    artist: "Song by Ed Sheeran",
    audio: require("../../../../assets/Mp3/music1.mp3"),
    title: "Perfect (Official Music Video)",
    details: "EP. 12: Daily Rosary Meditations | Ed Sheeran",
    duration: "4 min 39 sec",
  },
  {
    coverImage: BlankImage,
    artist: "Song by Wiz Khalifa",
    audio: require("../../../../assets/Mp3/music2.mp3"),
    title: "See You Again ft. Charlie Puth",
    details: "EP. 13: Daily Rosary Meditations | Wiz Khalifa",
    duration: "3 min 57 sec",
  },
  {
    coverImage: BlankImage,
    artist: "Song by Yanni",
    audio: require("../../../../assets/Mp3/music3.mp3"),
    title: "Nightingale - The Tribute Concerts",
    details: "EP. 14: Daily Rosary Meditations | Yanni",
    duration: "4 min 4 sec",
  },
  {
    coverImage: BlankImage,
    artist: "Song by Ed Sheeran",
    audio: require("../../../../assets/Mp3/music1.mp3"),
    title: "Perfect (Official Music Video)",
    details: "EP. 12: Daily Rosary Meditations | Ed Sheeran",
    duration: "4 min 39 sec",
  },
  {
    coverImage: BlankImage,
    artist: "Song by Wiz Khalifa",
    audio: require("../../../../assets/Mp3/music2.mp3"),
    title: "See You Again ft. Charlie Puth",
    details: "EP. 13: Daily Rosary Meditations | Wiz Khalifa",
    duration: "3 min 57 sec",
  },
  {
    coverImage: BlankImage,
    artist: "Song by Yanni",
    audio: require("../../../../assets/Mp3/music3.mp3"),
    title: "Nightingale - The Tribute Concerts",
    details: "EP. 14: Daily Rosary Meditations | Yanni",
    duration: "4 min 4 sec",
  },
];

export interface ListofPodcast {
  id: string;
  podcast_name: string;
  podcast_cover_image: string;
  podcast_file: string;
  podcast_singer_name: string;
}
export interface Listofliked {
  podcast_cover_image: string;
}
export interface Liked {
  podcast_cover_image: string;
  podcast_file: string;
  podcast_name: string;
  podcast_singer_name: string;
  podcast_description: string;
  is_liked: string;
}
export default function U_PodcastScreen() {
  const navigation = useNavigation<any>();
  const [getPrayerDetails, setPrayerDetails] = useState<ListofPodcast[]>([]);
  const [likepost, setlikepost] = useState<Listofliked[]>([]);
  const [getLiked, setLiked] = useState<Liked[]>([]);
  const [user, setUser] = useUser();

  const [podcast, setPodcast] = useMusicStore();

  useEffect(() => {
    (async () => {
      let response = await fetch(`${routes.getListofPodcast}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let json = await response.json();
      setPrayerDetails(json.result.list);
      setlikepost(json.result.listofliked);
    })();
    (async () => {
      let response = await fetch(`${routes.getLikedPodcast}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let json = await response.json();
      setLiked(json.result);
    })();
  }, []);

  async function musicFunctionCall(id: string) {
    setUser(await getUser());
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
      HeaderHidden
      VideoHidden
      ProductBuyHidden
      ProductCartHidden
      ProductCheckoutHidden
      title="Podcasts"
    >
      {/* Search Bar */}
      <View style={styles.SearchBarContainer}>
        <TextInput
          style={styles.SearchBarInput}
          placeholder="Search Podcasts"
        />
        <Image style={styles.SearchIcon} source={Icon_8} resizeMode="contain" />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.BlockContainer}
      >
        {/* Single Podcast Tile Start */}

        {getPrayerDetails?.map(function (item: ListofPodcast, index: number) {
          return (
            <Pressable
              onPress={() => {
                musicFunctionCall(item.id);
              }}
              key={index}
              style={styles.PodBlock}
            >
              <Text style={styles.PodLang}>English</Text>
              <Text style={styles.PodHeading} numberOfLines={2}>
                {item.podcast_name}
              </Text>
              <Text style={styles.PodSubHeading} numberOfLines={1}>
                {item.podcast_singer_name}
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
      </ScrollView>

      {/* Recently Played Section */}
      <View style={styles.DataBlock}>
        <Text style={styles.DataBlockHeading}>Recently Played</Text>

        {/* Like Podcast */}

        <Pressable
          style={styles.LikePodSection}
          onPress={() => navigation.navigate("U_LikePodcastScreen")}
        >
          <Image
            style={styles.RecentPodCover}
            source={Icon_47}
            resizeMode="contain"
          />
          <View style={styles.RecentPodData}>
            <Text style={styles.RecentPodTitle}>Liked Podcasts</Text>
            <View style={styles.LikePodCovers}>
              {likepost?.map(function (item: Listofliked, index: number) {
                if (index === 0) {
                  return (
                    <View style={styles.LikePodCoverImgs}>
                      <Image
                        style={[styles.LikePodCoverImg, styles.PodImg2]}
                        source={{ uri: item.podcast_cover_image }}
                        resizeMode="cover"
                      />
                    </View>
                  );
                } else {
                  return (
                    <View style={styles.LikePodCoverImgs}>
                      <Image
                        style={[styles.LikePodCoverImg, styles.PodImg3]}
                        source={{ uri: item.podcast_cover_image }}
                        resizeMode="cover"
                      />
                    </View>
                  );
                }
              })}

              <Text style={styles.LikePodCoverText}>
                + {likepost.length} More
              </Text>
            </View>
          </View>
        </Pressable>

        {/* Single Block Start */}

        {getLiked?.map(function (item: Liked, index: number) {
          return (
            <Pressable
              onPress={() => {}}
              style={styles.RecentPodBlock}
              key={index}
            >
              <Image
                style={styles.RecentPodCover}
                source={{ uri: item.podcast_cover_image }}
                resizeMode="contain"
              />
              <View style={styles.RecentPodData}>
                <Text style={styles.RecentPodTitle} numberOfLines={2}>
                  {item.podcast_name}
                </Text>
                <Text style={styles.RecentPodArtist} numberOfLines={1}>
                  {item.podcast_description}
                </Text>
                {/* <Text style={styles.RecentPodTime}>
                  <Ionicons name="timer-outline" size={12.5} color="#909090" />
                </Text> */}
              </View>
            </Pressable>
          );
        })}

        {/* Single Block End */}
      </View>

      {/* Popular Podcasts */}
      <View style={styles.DataBlock}>
        <Text style={styles.DataBlockHeading}>Popular Podcasts</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.OtherBlockContainer}
        >
          {/* Single Block Start */}

          {getPrayerDetails?.map(function (item: ListofPodcast, index: number) {
            return (
              <Pressable
                onPress={() => {
                  musicFunctionCall(item.id);
                }}
                style={styles.OtherPodBlock}
                key={index}
              >
                <Image
                  style={styles.OtherPodCover}
                  source={{ uri: item.podcast_cover_image }}
                  resizeMode="cover"
                />
                <Text style={styles.OtherPodDetails} numberOfLines={2}>
                  {item.podcast_name}
                </Text>
              </Pressable>
            );
          })}

          {/* Single Block End */}
        </ScrollView>
      </View>

      {/* Artist Block One */}

      <View style={styles.DataBlock}>
        <Pressable
          style={styles.ArtistBlock}
          onPress={() => navigation.navigate("U_PodcastListScreen")}
        >
          {/* <Image
            style={styles.ArtistCover}
            source={BlankImage}
            resizeMode="cover"
          /> */}
          <View style={styles.ArtistData}>
            {/* <Text style={styles.ArtistText}>MORE LIKE</Text> */}
            <Text style={styles.Artistname}>Artist Name</Text>
          </View>
        </Pressable>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.OtherBlockContainer}
        >
          {/* Single Block Start */}

          {getPrayerDetails?.map(function (item: ListofPodcast, index: number) {
            return (
              <Pressable
                onPress={() => {
                  musicFunctionCall(item.id);
                }}
                style={styles.OtherPodBlock}
                key={index}
              >
                <Image
                  style={styles.OtherPodCover}
                  source={{ uri: item.podcast_cover_image }}
                  resizeMode="cover"
                />
                <Text style={styles.OtherPodDetails} numberOfLines={2}>
                  {item.podcast_singer_name}
                </Text>
              </Pressable>
            );
          })}

          {/* Single Block End */}
        </ScrollView>
      </View>

      {/* Artist Block Two */}
      {/* <View style={styles.DataBlock}>
        <Pressable
          style={styles.ArtistBlock}
          onPress={() => navigation.navigate("U_PodcastListScreen")}
        >
          <Image
            style={styles.ArtistCover}
            source={BlankImage}
            resizeMode="cover"
          />
          <View style={styles.ArtistData}>
            <Text style={styles.ArtistText}>MORE LIKE</Text>
            <Text style={styles.Artistname}>Artist Name</Text>
          </View>
        </Pressable>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.OtherBlockContainer}
        >
         
          {apiOtherData.map((data, Artist2index) => (
            <Pressable
              onPress={() => {
                setPodcast(data);
              }}
              style={styles.OtherPodBlock}
              key={Artist2index}
            >
              <Image
                style={styles.OtherPodCover}
                source={BlankImage}
                resizeMode="contain"
              />
              <Text style={styles.OtherPodDetails} numberOfLines={2}>
                {data.details}
              </Text>
            </Pressable>
          ))}
         
        </ScrollView>
      </View> */}

      {/* Ignore Portion */}
      <View style={{ height: 20, opacity: 0 }}>{/* Bottom Height */}</View>
    </U_ScreenLayout>
  );
}

const styles = StyleSheet.create({
  // Search Bar
  SearchBarContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  SearchBarInput: {
    height: 55,
    width: "100%",
    elevation: 10,
    backgroundColor: White,
    borderRadius: 100,
    paddingLeft: 50,
  },
  SearchIcon: {
    width: 20,
    height: 20,
    position: "absolute",
    left: 40,
  },

  // Podcasts
  BlockContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    gap: 15,
  },
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

  // Recently Played
  RecentPodBlock: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  RecentPodCover: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  RecentPodData: {
    paddingLeft: 20,
    gap: 3,
  },
  RecentPodTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    width: 220,
    lineHeight: 16 * 1.3,
  },
  RecentPodArtist: {
    fontFamily: "Inter-Regular",
    color: TextColor,
    fontSize: 12,
  },
  RecentPodTime: {
    fontFamily: "Inter-Regular",
    color: TextColor,
    fontSize: 12,
    justifyContent: "center",
  },

  // Like Podcast
  LikePodSection: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  LikePodCovers: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
  },
  LikePodCoverImgs: {
    position: "relative",
  },
  LikePodCoverImg: {
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  PodImg1: {
    zIndex: 1,
  },
  PodImg2: {
    position: "absolute",
    left: 20,
    zIndex: 0,
  },
  PodImg3: {
    position: "absolute",
    left: 40,
    zIndex: -1,
  },
  PodImg4: {
    position: "absolute",
    left: 60,
    zIndex: -2,
  },
  PodImg5: {
    position: "absolute",
    left: 80,
    zIndex: -3,
  },
  LikePodCoverText: {
    fontFamily: "Inter-Regular",
    color: TextColor,
    fontSize: 12,
    paddingLeft: 90,
  },

  // Common
  DataBlock: {
    paddingTop: 20,
  },
  DataBlockHeading: {
    fontFamily: "Inter-SemiBold",
    fontSize: 22,
    color: PrimaryColor,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },

  // Popular & Other Podcasts
  OtherBlockContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    gap: 15,
  },
  OtherPodBlock: {
    flexDirection: "column",
    alignItems: "center",
  },
  OtherPodCover: {
    height: 150,
    width: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  OtherPodDetails: {
    fontFamily: "Inter-Regular",
    color: Black,
    fontSize: 12,
    width: 150,
    lineHeight: 12 * 1.5,
    paddingLeft: 10,
  },
  ArtistBlock: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  ArtistCover: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  ArtistData: {
    paddingLeft: 10,
  },
  ArtistText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
  },
  Artistname: {
    fontFamily: "Inter-SemiBold",
    fontSize: 22,
    color: PrimaryColor,
  },
});
