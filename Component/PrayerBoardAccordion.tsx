import React, { useState, useRef } from "react";
import { Black, PrimaryColor, TextColor, White } from "../Constant/Color";
import {
  View,
  Pressable,
  Text,
  Image,
  Animated,
  StyleSheet,
  Easing,
  Dimensions,
} from "react-native";
import {
  BlankImage,
  HomeIcon_3,
  Icon_15,
  Icon_16,
  Icon_30,
} from "../Constant/Images";
import { PrayerList } from "../Screens/Module/Organizer/PrayerBoardScreen/O_PrayerBoardScreen";

const PrayerBoardAccordion = ({
  children,
  item,
}: {
  children: any;
  item: PrayerList;
}) => {
  const [open, setOpen] = useState(false);
  const animatedController = useRef(new Animated.Value(0)).current;
  const [bodySectionHeight, setBodySectionHeight] = useState<number>(0);
  const [shouldShow, setShouldShow] = useState(true);
  const [loading, setLoading] = useState(false);

  const bodyHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bodySectionHeight],
  });

  const arrowAngle = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ["0rad", `${Math.PI}rad`],
  });

  const toggleListItem = () => {
    if (open) {
      Animated.timing(animatedController, {
        duration: 400,
        toValue: 0,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedController, {
        duration: 400,
        toValue: 1,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    }
    setOpen(!open);
  };

  return (
    <>
      {/* Top Part */}
      <View style={styles.PrayerContainer}>
        <View style={styles.TimeBlock}>
          <Text style={styles.TimeDate}>
            {item?.prayer_datetime?.split(" ")[1].slice(0, 2)}
          </Text>
          <Text style={styles.TimeMonth}>
            {item?.prayer_datetime?.split(" ")[2].slice(0, 3)}
          </Text>
          <View style={styles.TimeBar}></View>
        </View>
        <Pressable style={styles.PrayerBlock} onPress={() => toggleListItem()}>
          <View style={styles.PrayerData}>
            <View style={styles.PrayerTextData}>
              <Text style={styles.PrayerHeading} numberOfLines={1}>
                {item?.prayer_name}
              </Text>
              <Text style={styles.PrayerText} numberOfLines={1}>
                {item?.prayer_location}
              </Text>
              <Text style={styles.PrayerText} numberOfLines={1}>
                {item?.prayer_datetime}
              </Text>
              <View style={styles.PrayerJoin}>
                <Image
                  style={styles.PrayerJoinIcon}
                  source={HomeIcon_3}
                  resizeMode="contain"
                />
                <Text style={styles.PrayerJoinText}>{item.userjoined}</Text>
              </View>
            </View>
            <View style={styles.PrayerImage}>
              <Image
                style={styles.PrayerImg}
                source={{
                  uri: item?.prayer_image,
                }}
              />
            </View>
          </View>
          <View style={styles.PrayerDownBlock}>
            <View style={styles.PrayerSupporter}>
              {item?.joinedUserImage.map((item, index) => {
                return (
                  <Image
                    style={styles.PrayerSupporterImg}
                    source={{ uri: item.joinedUserImage }}
                    resizeMode="contain"
                  />
                );
              })}
            </View>
            {/* <View style={styles.PrayerShareContainer}>
              Like Button
              {shouldShow ? (
                <>
                  <Pressable
                    style={styles.PrayerShareBlock}
                    onPress={() => setShouldShow(!shouldShow)}
                  >
                    <Image
                      style={styles.PrayerShareImg}
                      source={Icon_16}
                      resizeMode="contain"
                    />
                    <Text style={styles.PrayerLikeText}>{item.likedUser}</Text>
                  </Pressable>
                </>
              ) : (
                <Pressable style={styles.PrayerShareBlock}>
                  <Image
                    style={styles.PrayerShareImg}
                    source={Icon_15}
                    resizeMode="contain"
                  />
                  <Text style={styles.PrayerLikeText}></Text>
                </Pressable>
              )}

              Share Button
              <Pressable style={styles.PrayerShareBlock}>
                <Image
                  style={styles.PrayerShareImg}
                  source={Icon_30}
                  resizeMode="contain"
                />
                <Text style={styles.PrayerShareText}>Share</Text>
              </Pressable>
            </View> */}
          </View>
        </Pressable>
      </View>

      {/* Data Part */}
      <Animated.View style={[styles.BodyBackground, { height: bodyHeight }]}>
        <View
          style={styles.BodyContainer}
          onLayout={(event) =>
            setBodySectionHeight(event.nativeEvent.layout.height)
          }
        >
          {children}
        </View>
      </Animated.View>
    </>
  );
};
export default PrayerBoardAccordion;

const styles = StyleSheet.create({
  // Event Body
  BodyBackground: {
    overflow: "hidden",
  },
  BodyContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },

  // Prayer Wall
  PrayerContainer: {
    width: Dimensions.get("window").width - 40,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  PrayerBlock: {
    width: "85%",
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
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  PrayerDownBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  PrayerSupporter: {
    flexDirection: "row",
    alignItems: "center",
    width: "60%",
  },
  PrayerSupporterImg: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 6,
  },
  PrayerShareContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "40%",
  },
  PrayerShareImg: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  PrayerShareBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  PrayerLikeText: {
    color: PrimaryColor,
    fontFamily: "Inter-Medium",
    fontSize: 13,
  },
  PrayerShareText: {
    color: TextColor,
    fontFamily: "Inter-Medium",
    fontSize: 13,
  },
  TimeBlock: {
    width: "15%",
    alignItems: "center",
  },
  TimeDate: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    color: PrimaryColor,
    textAlign: "left",
  },
  TimeMonth: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    color: Black,
    textAlign: "left",
  },
  TimeBar: {
    height: 130,
    alignSelf: "center",
    borderLeftColor: TextColor,
    borderLeftWidth: 1.5,
    borderStyle: "dashed",
  },
});
