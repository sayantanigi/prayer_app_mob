import { Audio } from "expo-av";
import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  BackHandler,
  Share,
  TouchableOpacity,
} from "react-native";
import { useMusicStore } from "../store/music";
import Slider from "@react-native-community/slider";
import {
  BackgroundColor,
  Black,
  PrimaryColor,
  TextColor,
} from "../Constant/Color";
import type { PodcastPlayer } from "../store/music";
import { useSwipe, useSwipeHorizontal } from "../hooks/onSwipe";
import {
  Icon_31,
  Icon_32,
  Icon_33,
  Icon_34,
  Icon_35,
  Icon_36,
  Icon_37,
  Icon_62,
  Icon_67,
} from "../Constant/Images";
import { routes } from "../Constant/URL";
import { useUser } from "../store/user";
import { getUser } from "../store/userAsync";

export enum AudioState {
  Playing = "true",
  Paused = "false",
}
export enum PlayerState {
  Minimized,
  Maximized,
}

export interface TopView {
  audioState: AudioState;
  playerState: PlayerState;
  toggleAudio: () => void;
  onTouchStart: any;
  onTouchEnd: any;
  handleClosePlayer: () => void;
}
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function TopView({
  audioState,
  playerState,
  toggleAudio,
  onTouchEnd,
  onTouchStart,
  handleClosePlayer,
}: TopView) {
  const [props] = useMusicStore();
  const width = React.useRef(
    new Animated.Value(windowWidth - 40, { useNativeDriver: false })
  ).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (playerState == PlayerState.Minimized) {
      Animated.timing(width, {
        useNativeDriver: false,
        toValue: 80,
        duration: 600,
      }).start();
      Animated.timing(opacity, {
        toValue: 1,
        useNativeDriver: true,
        duration: 300,
        delay: 300,
      }).start();
    } else {
      Animated.timing(width, {
        useNativeDriver: false,
        toValue: windowWidth - 40,
        duration: 600,
      }).start();
      Animated.timing(opacity, {
        toValue: 0,
        useNativeDriver: true,
        duration: 200,
      }).start();
    }
  }, [playerState]);

  return (
    <View style={[styles.Topbar]}>
      <View
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={styles.MinContainer}
      >
        <Animated.Image
          style={[styles.PodcastImage, { width, height: width }]}
          source={props?.coverImage}
        />
        <Animated.View style={{ opacity, paddingLeft: 10, width: "60%" }}>
          <Text style={styles.MinArtist} numberOfLines={1}>
            {props?.artist}
          </Text>
          <Text style={styles.MinTitle} numberOfLines={1}>
            {props?.title}
          </Text>
          <Text style={styles.MinDetails} numberOfLines={1}>
            {props?.details}
          </Text>
          <Pressable style={styles.closeIcon} onPress={handleClosePlayer}>
            <Image source={Icon_67} style={styles.closeIconImage} />
          </Pressable>
        </Animated.View>
        <Animated.View style={{ marginLeft: "auto", opacity }}>
          <Pressable onPress={toggleAudio}>
            {audioState == AudioState.Paused ? (
              <Image
                style={styles.MinPodcastBtn}
                source={Icon_31}
                resizeMode="contain"
              />
            ) : (
              <Image
                style={styles.MinPodcastBtn}
                source={Icon_32}
                resizeMode="contain"
              />
            )}
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

export default function PodcastPlayer() {
  const { onTouchStart, onTouchEnd } = useSwipe(handleBottomSwipe);
  const { onTouchStart: onTouchStartRight, onTouchEnd: onTouchEndRight } =
    useSwipeHorizontal(handleRightSwipe);
  const [props, setProps] = useMusicStore();
  const [playerState, setPlayerState] = React.useState<PlayerState>(
    PlayerState.Maximized
  );
  const [sound, setSound] = React.useState<Audio.Sound>();
  const [audioState, setAudioState] = React.useState<AudioState>(
    AudioState.Paused
  );
  const [position, setPosition] = React.useState(0);
  const [duration, setDuration] = React.useState(1);
  const range = React.useMemo(
    () => (position / duration) * 100,
    [position, duration]
  );
  const height = React.useRef(
    new Animated.Value(windowHeight, { useNativeDriver: false })
  ).current;
  const translateX = React.useRef(
    new Animated.Value(0, { useNativeDriver: false })
  ).current;
  const [likeShow, setLikeShow] = useState(true);

  const [user, setUser] = useUser();

  async function toggleAudio() {
    if (!sound) return;
    if (audioState == AudioState.Paused) {
      setAudioState(AudioState.Playing);
      await sound.playAsync();
    } else {
      setAudioState(AudioState.Paused);
      await sound.pauseAsync();
    }
  }

  React.useEffect(() => {
    if (props !== null && sound == undefined) {
      Audio.Sound.createAsync(props.audio).then((audio) => {
        setSound(audio.sound);
      });
    }
    if (props?.isliked === "1") {
      setLikeShow(false);
    } else {
      setLikeShow(true);
    }
    setPlayerState(PlayerState.Maximized);
    let timeinterval = setInterval(async () => {
      if (!sound) return;
      let status = await sound.getStatusAsync();
      if (status.isLoaded) {
        let { positionMillis, durationMillis } = status;
        setPosition(positionMillis);
        setDuration(durationMillis!);
      }
    }, 500);

    return sound
      ? () => {
          sound.unloadAsync().then(() => {
            setSound(undefined);
            setAudioState(AudioState.Paused);
            setDuration(1);
            setPosition(0);
          });

          if (timeinterval) {
            clearInterval(timeinterval);
          }
        }
      : undefined;
  }, [props, sound]);

  React.useEffect(() => {
    if (playerState == PlayerState.Minimized) {
      Animated.timing(height, {
        useNativeDriver: false,
        toValue: 100,
        duration: 600,
      }).start();
    } else {
      Animated.timing(height, {
        useNativeDriver: false,
        toValue: windowHeight,
        duration: 600,
      }).start();
    }
  }, [playerState]);

  React.useEffect(() => {
    const handler = () => {
      if (playerState == PlayerState.Maximized) {
        setPlayerState(PlayerState.Minimized);

        return true;
      }

      return false;
    };

    BackHandler.addEventListener("hardwareBackPress", handler);

    return () => BackHandler.removeEventListener("hardwareBackPress", handler);
  }, [playerState]);

  async function handleAudioSlider(value: number) {
    try {
      let pos = Math.floor((value * duration) / 100);
      await sound?.setPositionAsync(pos);
    } catch {}
  }

  async function handleForward() {
    try {
      let pos = Math.floor(10000 + position);
      await sound?.setPositionAsync(pos);
    } catch {}
  }

  async function handleBackward() {
    try {
      let pos = Math.floor(position - 10000);
      await sound?.setPositionAsync(pos);
    } catch {}
  }

  function handleBottomSwipe() {
    setPlayerState(PlayerState.Minimized);
  }
  async function likeData(value: string) {
    setUser(await getUser());
    let response = await fetch(`${routes.getUserlike}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user?.userId,
        podcast_id: props?.p_id,
        islike: value,
      }),
    });

    let json = await response.json();

    if (json.status === "success") {
    }
  }

  function handleRightSwipe() {
    if (playerState !== PlayerState.Minimized) return;
    setPlayerState(PlayerState.Minimized);
    Animated.timing(translateX, {
      useNativeDriver: false,
      toValue: windowWidth + 40,
      duration: 600,
    }).start(() => {
      setProps(null);
      translateX.setValue(0);
    });
  }

  let width = height.interpolate({
    inputRange: [100, windowHeight],
    outputRange: [windowWidth - 40, windowWidth],
    extrapolate: "clamp",
  });

  let bottom = height.interpolate({
    inputRange: [100, windowHeight],
    outputRange: [90, 0],
    extrapolate: "clamp",
  });

  let left = height.interpolate({
    inputRange: [100, windowHeight],
    outputRange: [20, 0],
    extrapolate: "clamp",
  });

  let borderRadius = height.interpolate({
    inputRange: [100, windowHeight],
    outputRange: [10, 0],
    extrapolate: "clamp",
  });

  let padding = height.interpolate({
    inputRange: [100, windowHeight],
    outputRange: [10, 20],
    extrapolate: "clamp",
  });

  let opacity = height.interpolate({
    inputRange: [100, windowHeight],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  let boxOpacity = translateX.interpolate({
    inputRange: [0, windowWidth + 40],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  if (props == null) return null;

  const shareMessage = async () => {
    try {
      const result = await Share.share({
        message: props.title,
        url: props.audio,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {}
  };
  return (
    <Animated.View
      style={[
        styles.PlayerContainer,
        {
          height,
          width,
          bottom,
          left,
          borderRadius,
          padding,
          opacity: boxOpacity,
          transform: [{ translateX }],
        },
      ]}
    >
      <Pressable
        onTouchStart={onTouchStartRight}
        onTouchEnd={onTouchEndRight}
        onPress={() => setPlayerState(PlayerState.Maximized)}
        style={{ flex: 1 }}
      >
        <TopView
          handleClosePlayer={handleRightSwipe}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          audioState={audioState}
          playerState={playerState}
          toggleAudio={toggleAudio}
        />
        {/* Podcast Controller */}
        <Animated.View style={[styles.RangeBox, { opacity }]}>
          <Text numberOfLines={1} style={styles.PodcastArtist}>
            {props?.artist}
          </Text>
          <Text numberOfLines={2} style={styles.PodcastTitle}>
            {props?.title}
          </Text>
          <Text numberOfLines={1} style={styles.PodcastDetails}>
            {props?.details}
          </Text>
          <View style={styles.TimeBox}>
            <Text style={styles.TimeText}>
              {new Date(position).toISOString().slice(11, 19)}
            </Text>
            <Text style={styles.TimeText}>
              {new Date(duration).toISOString().slice(11, 19)}
            </Text>
          </View>
          <Slider
            onTouchEnd={(e) => e.stopPropagation()}
            style={{ width: "100%" }}
            minimumTrackTintColor={PrimaryColor}
            thumbTintColor={PrimaryColor}
            value={range}
            maximumValue={100}
            minimumValue={0}
            onValueChange={handleAudioSlider}
          />
          <View style={styles.ActionBox}>
            {likeShow ? (
              <>
                <Pressable
                  onPress={() => {
                    setLikeShow(!likeShow);
                    likeData("1");
                  }}
                >
                  <Image
                    style={styles.LikeSong}
                    source={Icon_33}
                    resizeMode="contain"
                  />
                </Pressable>
              </>
            ) : (
              <Pressable
                onPress={() => {
                  setLikeShow(!likeShow);
                  likeData("0");
                }}
              >
                <Image
                  style={styles.LikeSong}
                  source={Icon_34}
                  resizeMode="contain"
                />
              </Pressable>
            )}
            <Pressable onPress={handleBackward}>
              <Image
                style={styles.SecBack}
                source={Icon_35}
                resizeMode="contain"
              />
            </Pressable>
            <Pressable onPress={toggleAudio}>
              {audioState == AudioState.Paused ? (
                <Image
                  style={styles.PodcastBtn}
                  source={Icon_31}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  style={styles.PodcastBtn}
                  source={Icon_32}
                  resizeMode="contain"
                />
              )}
            </Pressable>
            <Pressable onPress={handleForward}>
              <Image
                style={styles.SecNext}
                source={Icon_36}
                resizeMode="contain"
              />
            </Pressable>
            <Pressable onPress={shareMessage}>
              <Image
                style={styles.ShareSong}
                source={Icon_37}
                resizeMode="contain"
              />
            </Pressable>
          </View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  Topbar: {},
  PlayerContainer: {
    flex: 1,
    position: "absolute",
    backgroundColor: BackgroundColor,
    width: "100%",
    height: "100%",
    padding: 20,
    overflow: "hidden",
    bottom: 0,
    zIndex: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },

  // Podcast Details
  PodcastImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    zIndex: 2,
  },
  PodcastArtist: {
    alignSelf: "center",
    fontFamily: "Inter-Regular",
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  PodcastTitle: {
    alignSelf: "center",
    fontFamily: "Inter-SemiBold",
    fontSize: 25,
    textAlign: "center",
    paddingBottom: 10,
    lineHeight: 25 * 1.5,
  },
  PodcastDetails: {
    alignSelf: "center",
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: TextColor,
    paddingBottom: 30,
  },

  // Podcast Range
  RangeBox: {
    width: "100%",
    padding: 20,
  },
  TimeBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  TimeText: {
    color: TextColor,
    fontFamily: "Inter-Regular",
    fontSize: 14,
  },

  // Podcast Controller
  ActionBox: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 40,
    alignItems: "center",
    paddingTop: 30,
    gap: 10,
    position: "relative",
  },
  PodcastBtn: {
    height: 120,
    width: 120,
  },
  SecBack: {
    height: 40,
    width: 40,
  },
  SecNext: {
    height: 40,
    width: 40,
  },
  LikeSong: {
    height: 35,
    width: 35,
    marginTop: 3,
  },
  ShareSong: {
    height: 35,
    width: 35,
  },

  // Min Player
  MinContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    position: "relative",
  },
  MinArtist: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: Black,
  },
  MinTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: Black,
  },
  MinDetails: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: Black,
  },
  MinPodcastBtn: {
    height: 50,
    width: 50,
  },
  closeIcon: {
    position: "absolute",
    right: 0,
    top: 4,
    zIndex: 1,
  },
  closeIconImage: {
    width: 45, // Adjust as needed
    height: 45, // Adjust as needed
  },
});
