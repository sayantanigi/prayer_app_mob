import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  Dimensions,
  Animated,
  useWindowDimensions,
  Easing,
  TextInput,
} from "react-native";
import U_ScreenLayout from "../U_ScreenLayout";
import PrayerBoardAccordion from "../../../../Component/PrayerBoardAccordion";
import Link from "../../../../Component/Link";
import {
  Black,
  PrimaryColor,
  TextColor,
  White,
} from "../../../../Constant/Color";
import {
  HomeIcon_4,
  Icon_10,
  Icon_11,
  Icon_12,
  Icon_8,
  Icon_9,
} from "../../../../Constant/Images";
import { routes } from "../../../../Constant/URL";
import ProgressBar from "../../../../Component/ProgressBar";
export interface PrayerList {
  id: string;
  prayer_name: string;
  prayer_location?: string;
  prayer_image: string;
  prayer_datetime: string;
  userjoined: string;
  likedUser: string;
  prayer_description: string;
  joinedUserImage: JoinedUserImage[];
}

export interface JoinedUserImage {
  user_id: string;
  joinedUserImage: string;
}
export default function U_PrayerBoardScreen() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();
  const tabs = ["All", "Newest", "Upcoming"];
  const [active, setActive] = React.useState(0);
  const [search, setSearch] = useState("");

  const translateX = React.useRef(new Animated.Value(active * width)).current;
  const [getPrayerList, setPrayerList] = useState<PrayerList[]>([]);
  React.useEffect(() => {
    Animated.timing(translateX, {
      useNativeDriver: true,
      toValue: -active * width,
      duration: 450,
      easing: Easing.ease,
    }).start();
  }, [active]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      let response = await fetch(
        `${
          active === 0
            ? routes.getAllPrayer
            : active === 1
            ? routes.ListofnewPrayers
            : routes.ListofupcomingPrayer
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let json = await response.json();
      setLoading(false);
      //console.log(json.result);
      setPrayerList(json.result);
    })();
  }, [active]);

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

  //

  return (
    <U_ScreenLayout
      BannerHidden
      HeaderHidden
      VideoHidden
      ProductBuyHidden
      ProductCartHidden
      ProductCheckoutHidden
      title="Prayer Board"
    >
      {/* Search Bar */}
      <View style={styles.SearchBarContainer}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          style={styles.SearchBarInput}
          placeholder="Search Prayers"
        />
        <Image style={styles.SearchIcon} source={Icon_8} resizeMode="contain" />
      </View>

      {/* Tab Container */}
      <View style={styles.TabContainer}>
        {tabs.map((tab, index) => {
          if (index == active) {
            return (
              <Pressable key={index} onPress={() => setActive(index)}>
                <Text style={styles.TabActiveText}>{tab}</Text>
              </Pressable>
            );
          }
          return (
            <Pressable key={index} onPress={() => setActive(index)}>
              <Text style={styles.TabText}>{tab}</Text>
            </Pressable>
          );
        })}
      </View>

      <Animated.View
        style={{
          flexDirection: "row",
          paddingLeft: 20,
          paddingRight: 20,
          transform: [{ translateX }],
        }}
      >
        {new Array(3).fill(0).map((item, index) => (
          <View style={{ width }}>
            {getPrayerList &&
              Array.isArray(getPrayerList) &&
              getPrayerList
                .filter((item) => {
                  const query = search.toLowerCase();
                  return item.prayer_name.toLowerCase().includes(query);
                })
                .map((item, Prayerindex) => (
                  <PrayerBoardAccordion key={Prayerindex} item={item}>
                    <View style={styles.PrayerDetails}>
                      {/* Join The Prayer */}
                      <View style={styles.PrayerBlock}>
                        <View style={styles.PrayerIcon}>
                          <Image
                            style={styles.PrayerIconImg}
                            source={Icon_9}
                            resizeMode="contain"
                          />
                          <View style={styles.TimeBar}></View>
                        </View>
                        <View style={styles.PrayerData}>
                          <View style={styles.PrayerText}>
                            <Text style={styles.PrayerHeading}>
                              Join The Prayer
                            </Text>
                            <Text style={styles.PrayerSubHeading}>
                              {item.userjoined}
                            </Text>
                          </View>
                          <Pressable
                            style={styles.PrayerBtn}
                            // onPress={navigation.navigation("O_PrayerJoinScreen")}
                            onPress={() =>
                              gotoCareerTipsDetails(
                                item.id,
                                item.prayer_name,
                                item.prayer_image
                              )
                            }
                          >
                            <Text style={styles.JoinPrayerBtnText}>Join</Text>
                            <Image
                              style={styles.JoinPrayerBtnBack}
                              source={HomeIcon_4}
                            />
                          </Pressable>
                        </View>
                      </View>

                      {/* Date & Time */}
                      <View style={styles.PrayerBlock}>
                        <View style={styles.PrayerIcon}>
                          <Image
                            style={styles.PrayerIconImg}
                            source={Icon_10}
                            resizeMode="contain"
                          />
                          <View style={styles.TimeBar}></View>
                        </View>
                        <View style={styles.PrayerData}>
                          <View style={styles.PrayerText}>
                            <Text style={styles.PrayerHeading}>
                              Date & Time
                            </Text>
                            <Text
                              style={[
                                styles.PrayerSubHeading,
                                styles.PrayerTextData,
                              ]}
                            >
                              {item.prayer_datetime}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* About */}
                      <View style={styles.PrayerBlock}>
                        <View style={styles.PrayerIcon}>
                          <Image
                            style={styles.PrayerIconImg}
                            source={Icon_11}
                            resizeMode="contain"
                          />
                          <View
                            style={[styles.TimeBar, styles.LongTimeBar]}
                          ></View>
                        </View>
                        <View style={styles.PrayerData}>
                          <View style={styles.PrayerText}>
                            <Text style={styles.PrayerHeading}>About</Text>
                            <Text
                              numberOfLines={7}
                              style={[
                                styles.PrayerSubHeading,
                                styles.PrayerTextData,
                              ]}
                            >
                              {item.prayer_description}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* More Details */}
                      <View style={styles.PrayerBlock}>
                        <View style={styles.PrayerIcon}>
                          <Image
                            style={styles.PrayerIconImg}
                            source={Icon_12}
                            resizeMode="contain"
                          />
                          <View style={styles.TimeBar}></View>
                        </View>
                        <View style={styles.PrayerData}>
                          <View style={styles.PrayerText}>
                            <Text style={styles.PrayerHeading}>
                              More Details
                            </Text>
                            <Text
                              style={[
                                styles.PrayerSubHeading,
                                styles.PrayerTextData,
                              ]}
                            >
                              Brief about the Prayer
                            </Text>
                          </View>
                          <Link
                            style={styles.PrayerBtn}
                            to="U_PrayerDetailsScreen"
                          >
                            <Text style={styles.ViewPrayerBtnText}>View</Text>
                          </Link>
                        </View>
                      </View>
                    </View>
                  </PrayerBoardAccordion>
                ))}

            <ProgressBar loading={loading} />
          </View>
        ))}
      </Animated.View>
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

  // Tab Container
  TabContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    justifyContent: "space-around",
  },
  TabText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 20,
    textAlign: "left",
    alignItems: "flex-end",
    color: TextColor,
  },
  TabActiveText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 30,
    textAlign: "left",
    alignItems: "flex-end",
    lineHeight: 30 * 1,
    color: PrimaryColor,
  },

  // Prayer Details
  PrayerDetails: {
    width: Dimensions.get("window").width - 40,
    paddingBottom: 10,
  },
  PrayerBlock: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingTop: 5,
    paddingBottom: 5,
  },
  PrayerIcon: {
    width: "15%",
    alignItems: "center",
  },
  PrayerIconImg: {
    width: 15,
    height: 15,
    marginBottom: 5,
  },
  TimeBar: {
    height: 36,
    alignSelf: "center",
    borderLeftColor: TextColor,
    borderLeftWidth: 1.5,
    borderStyle: "dashed",
  },
  LongTimeBar: {
    height: 155,
  },
  PrayerData: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  PrayerText: {},
  PrayerHeading: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    lineHeight: 16 * 1,
  },
  PrayerSubHeading: {
    fontFamily: "Inter-Regular",
    fontSize: 13,
    lineHeight: 13 * 1.5,
    color: TextColor,
    paddingTop: 4,
  },
  PrayerTextData: {
    color: Black,
  },
  PrayerBtn: {
    elevation: 10,
    backgroundColor: White,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: 80,
    height: 40,
    position: "relative",
  },
  ViewPrayerBtnText: {
    color: PrimaryColor,
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
  },
  JoinPrayerBtnText: {
    color: White,
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    zIndex: 1,
  },
  JoinPrayerBtnBack: {
    borderRadius: 50,
    width: 80,
    height: 40,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
