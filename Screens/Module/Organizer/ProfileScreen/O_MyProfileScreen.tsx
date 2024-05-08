import { useNavigation } from "@react-navigation/native";
import O_ScreenLayout from "../O_ScreenLayout";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  useWindowDimensions,
  Animated,
  Easing,
  Pressable,
  ScrollView,
  Image,
  Dimensions,
  Modal,
} from "react-native";
import {
  Black,
  PrimaryColor,
  TextColor,
  White,
} from "../../../../Constant/Color";
import { AntDesign } from "@expo/vector-icons";
import {
  BlankImage,
  BlankVideo,
  HomeIcon_3,
  HomeIcon_4,
  HomeIcon_5,
  Icon_11,
  Icon_41,
  Icon_42,
  Icon_43,
  Icon_44,
  Icon_45,
  Icon_46,
} from "../../../../Constant/Images";
import Link from "../../../../Component/Link";
import { MaterialIcons } from "@expo/vector-icons";
import { useMusicStore } from "../../../../store/music";
import { routes } from "../../../../Constant/URL";
import { useUser } from "../../../../store/user";
import { getUser } from "../../../../store/userAsync";

const apiData = [
  {
    coverImage: BlankImage,
    artist: "Song by Ed Sheeran",
    audio: require("../../../../assets/Mp3/music1.mp3"),
    title: "Perfect (Official Music Video)",
    details: "EP. 12: Daily Rosary Meditations | Ed Sheeran",
  },
  {
    coverImage: BlankImage,
    artist: "Song by Wiz Khalifa",
    audio: require("../../../../assets/Mp3/music2.mp3"),
    title: "See You Again ft. Charlie Puth",
    details: "EP. 13: Daily Rosary Meditations | Wiz Khalifa",
  },
  {
    coverImage: BlankImage,
    artist: "Song by Yanni",
    audio: require("../../../../assets/Mp3/music3.mp3"),
    title: "Nightingale - The Tribute Concerts",
    details: "EP. 14: Daily Rosary Meditations | Yanni",
  },
];
export interface Userinfo {
  userId: string;
  firstname: string;
  lastname: string;
  short_bio: string;
  mobile: any;
  gender: string;
  email: string;
  address: string;
  userType: string;
  organizername: string;
}
export interface DonetionList {
  id: string;
  user_id: string;
  d_title: string;
  d_description: string;
  d_amount: string;
  d_image: string;
  created_date: string;
}
export interface ListByEachOrganizer {
  id: string;
  prayer_name: string;
  prayer_location: string;
  prayer_image: string;
  prayer_datetime: string;
  userjoined: string;
}
export interface userData {
  user_id: string;
}
export interface PodcustList {
  id: string;
  podcast_name: string;
  podcast_cover_image: string;
  podcast_file: string;
  podcast_singer_name: string;
}
export interface VideoList {
  id: string;
  videos_name: string;
  videos_description: string;
  video_cover_image: string;
  videos_file: string;
  view_count: string;
}
export interface UserPostDetails {
  user_id: string;
  fullname: string;
  profilePic: string;
  post_id: string;
  social_img: string;
  count_like: string;
  count_comment: string;
  created_date: string;
}
export interface OrderList {
  id: string;
  pro_name: string;
  final_price: string;
  status: string;
  imageList: ImageList[];
}

export interface ImageList {
  id: string;
  pro_image: string;
}
export default function O_MyProfileScreen() {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();
  const tabs = [
    "Profile",
    "Prayers",
    "Podcasts",
    "Videos",
    "Post",
    "Donation",
    "Store",
  ];
  const [active, setActive] = React.useState(0);
  const translateX = React.useRef(new Animated.Value(active * width)).current;
  const [modalPostVisible, setModalPostVisible] = useState(false);
  const [getuserData, setUserdata] = useState<userData>();
  const [podcast, setPodcast] = useMusicStore();
  const [user, setUser] = useUser();
  const [getuserInfo, setUserInfo] = useState<Userinfo[]>([]);
  const [getPodcustList, setPodCustList] = useState<PodcustList[]>([]);
  const [getVideoList, setVideoList] = useState<VideoList[]>([]);
  const [getDonetionList, setDonetionList] = useState<DonetionList[]>([]);
  const [getOrderList, setOrderList] = useState<OrderList[]>([]);
  const [getUserPostDetails, setUserPostDetails] = useState<UserPostDetails[]>(
    []
  );
  const [selectedImageUrl, setSelectedImageUrl] = useState<any>(null);

  const [reload, setReload] = React.useState({});
  const [getListByEachOrganizer, setListByEachOrganizer] = useState<
    ListByEachOrganizer[]
  >([]);
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
      setUser(await getUser());
      let response = await fetch(`${routes.getPrayerList}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user?.userId }),
      });
      let json = await response.json();

      setListByEachOrganizer(json.result);
    })();

    (async () => {
      setUser(await getUser());
      let response = await fetch(`${routes.getProfile}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user?.userId }),
      });
      let json = await response.json();

      setUserInfo(json.result.userinfo);
    })();
    (async () => {
      setUser(await getUser());
      let response = await fetch(`${routes.getpodcastListByEachOrganizer}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user?.userId }),
      });
      let json = await response.json();

      setPodCustList(json.result);
    })();
    (async () => {
      setUser(await getUser());
      let response = await fetch(`${routes.getVideoList}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user?.userId }),
      });
      let json = await response.json();

      setVideoList(json.result);
    })();
  }, [user?.userId]);

  React.useEffect(() => {
    (async () => {
      setUser(await getUser());
      let response = await fetch(`${routes.getuser_post_details}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user?.userId }),
      });
      let json = await response.json();
      setUserPostDetails(json.result);
    })();
  }, [user?.userId]);

  React.useEffect(() => {
    (async () => {
      setUser(await getUser());
      let response = await fetch(`${routes.getOrderList}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user?.userId }),
      });
      let json = await response.json();
      setOrderList(json.result);
    })();
  }, [user?.userId]);

  React.useEffect(() => {
    (async () => {
      setUser(await getUser());
      let response = await fetch(`${routes.getDonationlistorganization}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user?.userId }),
      });
      let json = await response.json();
      setDonetionList(json.result);
    })();
  }, [user?.userId]);
  function gotoCareerTipsDetails(): void {
    navigation.navigate("O_EditProfile");
  }
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
      date
    );
    const month = new Intl.DateTimeFormat("en", { month: "long" }).format(date);
    const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
    return `${year} ${month} ${day}`;
  };
  return (
    <O_ScreenLayout
      HeaderHidden
      BannerHidden
      VideoHidden
      ProductBuyHidden
      ProductCartHidden
      ProductCheckoutHidden
      title="My Profile"
    >
      <View style={styles.Container}>
        {/* Tab Container */}
        <ScrollView
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          style={styles.TabContainer}
        >
          {tabs.map((tab, index) => {
            if (index == active) {
              return (
                <Pressable
                  key={index}
                  style={styles.TabBlock}
                  onPress={() => setActive(index)}
                >
                  <Text style={styles.TabActiveText}>{tab}</Text>
                </Pressable>
              );
            }
            return (
              <Pressable
                key={index}
                style={styles.TabBlock}
                onPress={() => setActive(index)}
              >
                <Text style={styles.TabText}>{tab}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Animated.View
          style={{
            flexDirection: "row",
            paddingLeft: 20,
            paddingRight: 20,
            transform: [{ translateX }],
          }}
        >
          {/* Profile */}
          <View style={[{ width }, styles.Block]}>
            <View style={styles.BlockContainer}>
              <View style={styles.IconBlock}>
                <Image
                  style={styles.IconImg}
                  source={Icon_41}
                  resizeMode="contain"
                />
                <View style={[styles.IconBar, styles.IconBar1]}></View>
              </View>

              {getuserInfo?.map(function (item: Userinfo, index: number) {
                return (
                  <View style={[styles.DataContainer, styles.EditIconBlock]}>
                    <Text style={styles.Heading}>Name</Text>
                    <Text style={styles.SubHeading}>
                      {item.firstname + " " + item.lastname}
                    </Text>
                  </View>
                );
              })}

              <Pressable
                onPress={() => gotoCareerTipsDetails()}
                style={styles.BtnContainer}
              >
                <Image
                  style={styles.EditBtn}
                  source={Icon_42}
                  resizeMode="contain"
                />
              </Pressable>
            </View>

            <View style={styles.BlockContainer}>
              <View style={styles.IconBlock}>
                <Image
                  style={styles.IconImg}
                  source={Icon_11}
                  resizeMode="contain"
                />
                <View style={[styles.IconBar, styles.IconBar2]}></View>
              </View>

              {getuserInfo?.map(function (item: Userinfo, index: number) {
                return (
                  <View style={styles.DataContainer}>
                    <Text style={styles.Heading}>About</Text>

                    <Text style={styles.SubHeading}>{item.short_bio}</Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.BlockContainer}>
              <View style={styles.IconBlock}>
                <Image
                  style={styles.IconImg}
                  source={Icon_43}
                  resizeMode="contain"
                />
                <View style={[styles.IconBar, styles.IconBar1]}></View>
              </View>
              <View style={styles.DataContainer}>
                <Text style={styles.Heading}>Mobile Number</Text>

                {getuserInfo &&
                  getuserInfo.length > 0 &&
                  getuserInfo?.map(function (item: Userinfo, index: number) {
                    return <Text style={styles.SubHeading}>{item.mobile}</Text>;
                  })}
              </View>
            </View>

            <View style={styles.BlockContainer}>
              <View style={styles.IconBlock}>
                <Image
                  style={styles.IconImg}
                  source={Icon_44}
                  resizeMode="contain"
                />
                <View style={[styles.IconBar, styles.IconBar1]}></View>
              </View>
              <View style={styles.DataContainer}>
                <Text style={styles.Heading}>Gender</Text>

                {getuserInfo &&
                  getuserInfo.length > 0 &&
                  getuserInfo?.map(function (item: Userinfo, index: number) {
                    return <Text style={styles.SubHeading}>{item.gender}</Text>;
                  })}
              </View>
            </View>

            <View style={styles.BlockContainer}>
              <View style={styles.IconBlock}>
                <Image
                  style={styles.IconImg}
                  source={Icon_45}
                  resizeMode="contain"
                />
                <View style={[styles.IconBar, styles.IconBar1]}></View>
              </View>
              <View style={styles.DataContainer}>
                <Text style={styles.Heading}>Email Address</Text>
                {getuserInfo?.map(function (item: Userinfo, index: number) {
                  return <Text style={styles.SubHeading}>{item.email}</Text>;
                })}
              </View>
            </View>

            <View style={styles.BlockContainer}>
              <View style={styles.IconBlock}>
                <Image
                  style={styles.IconImg}
                  source={Icon_46}
                  resizeMode="contain"
                />
                <View style={[styles.IconBar, styles.IconBar3]}></View>
              </View>
              <View style={styles.DataContainer}>
                <Text style={styles.Heading}>Address</Text>
                {getuserInfo?.map(function (item: Userinfo, index: number) {
                  return <Text style={styles.SubHeading}>{item.address}</Text>;
                })}
              </View>
            </View>
          </View>

          {/* Joined Prayer */}
          <View style={[{ width }, styles.Block]}>
            {/* Add Prayer Button */}
            <View style={styles.AddBtnContainer1}>
              <Pressable
                style={styles.AddBtnBack}
                onPress={() => navigation.navigate("O_PrayerAddScreen")}
              >
                <Text style={styles.AddBtnText}>Add Prayer</Text>
                <MaterialIcons name="add" size={25} color="white" />
              </Pressable>
            </View>

            {/* Single Prayer Tile Start */}

            {getListByEachOrganizer &&
              Array.isArray(getListByEachOrganizer) &&
              getListByEachOrganizer?.map(function (
                item: ListByEachOrganizer,
                index: number
              ) {
                function gotoCareerTipsDetails(id: string) {
                  navigation.navigate("O_PrayerDetailsScreen", id);
                }

                return (
                  <View style={styles.PrayerBlock}>
                    <View style={styles.PrayerData}>
                      <View style={styles.PrayerTextData}>
                        <Text style={styles.PrayerHeading} numberOfLines={1}>
                          {item.prayer_name}
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
                            {item.userjoined}
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
                      <Link
                        style={styles.PrayerJoinBtn}
                        to={"O_PrayerEditScreen"}
                      >
                        <Text style={styles.PrayerJoinBtnText}>Edit</Text>
                        <Image
                          style={styles.PrayerJoinBtnBack}
                          source={HomeIcon_4}
                          resizeMode="contain"
                        />
                      </Link>
                      <Pressable
                        style={styles.PrayerViewBtn}
                        onPress={() => gotoCareerTipsDetails(item.id)}
                      >
                        <Text style={styles.PrayerViewText}>View Details</Text>
                      </Pressable>
                    </View>
                  </View>
                );
              })}

            {/* Single Prayer Tile End */}
          </View>

          {/* Podcasts */}
          <View style={[{ width }, styles.Block]}>
            {/* Add Podcast Button */}
            <View style={styles.AddBtnContainer2}>
              <Pressable
                style={styles.AddBtnBack}
                onPress={() => navigation.navigate("O_PodcastAddScreen")}
              >
                <Text style={styles.AddBtnText}>Add Podcast</Text>
                <MaterialIcons name="add" size={25} color="white" />
              </Pressable>
            </View>

            {/* Podcast Data */}

            {Array.isArray(getPodcustList) &&
              getPodcustList.length > 0 &&
              getPodcustList?.map(function (item: PodcustList, index: number) {
                return (
                  <View style={styles.BlockContainer}>
                    <View style={styles.TimeBlock}>
                      {/* {formatDate(item.created_date)} */}
                      {/* <Text style={styles.TimeDate}>22</Text>
                    <Text style={styles.TimeMonth}>AUG</Text> */}
                      {/* <View style={[styles.TimeBar, styles.PodTimeBar]}></View> */}
                    </View>
                    <View style={styles.PodDataContainer}>
                      <Pressable
                        onPress={() => {
                          setPodcast({
                            coverImage: {
                              uri: item?.podcast_cover_image,
                            },
                            artist: item?.podcast_singer_name,
                            audio: { uri: item?.podcast_file },
                            title: item?.podcast_name,
                            details: item?.podcast_name,
                            isliked: "",
                            p_id: item?.id,
                          });
                        }}
                        key={index}
                        style={styles.PodBlock}
                      >
                        <Text style={styles.PodLang}>English</Text>
                        <Text style={styles.PodHeading} numberOfLines={2}>
                          {item?.podcast_name}
                        </Text>
                        <Text style={styles.PodSubHeading} numberOfLines={1}>
                          {item?.podcast_singer_name}
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
                            source={{ uri: item?.podcast_cover_image }}
                            resizeMode="cover"
                          />
                        </View>
                      </Pressable>
                    </View>
                  </View>
                );
              })}
          </View>

          {/* Videos */}
          <View style={[{ width }, styles.Block]}>
            {/* Add Video Button */}
            <View style={styles.AddBtnContainer2}>
              <Pressable
                style={styles.AddBtnBack}
                onPress={() => navigation.navigate("O_VideoAddScreen")}
              >
                <Text style={styles.AddBtnText}>Add Video</Text>
                <MaterialIcons name="add" size={25} color="white" />
              </Pressable>
            </View>

            <View style={styles.BlockContainer}>
              <View style={styles.TimeBlock}>
                {/* <Text style={styles.TimeDate}>2022</Text>
                <Text style={styles.TimeDate}>22</Text>
                <Text style={styles.TimeMonth}>AUG</Text> */}
                {/* <View style={[styles.TimeBar, styles.VideoTimeBar]}></View> */}
              </View>
              {/* Podcast Data */}
              <View style={styles.VideoDataContainer}>
                {Array.isArray(getVideoList) &&
                  getVideoList.length > 0 &&
                  getVideoList?.map(function (item: VideoList, index: number) {
                    return (
                      <Pressable
                        key={index}
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
                        </View>
                        <View style={styles.VideoOwner}>
                          <View style={styles.VideoOwnerText}>
                            <Image
                              style={styles.VideoOwnerImg}
                              source={BlankImage}
                              resizeMode="contain"
                            />
                            <Text
                              style={styles.VideoOwnerHeading}
                              numberOfLines={2}
                            >
                              {item.videos_name}
                            </Text>
                          </View>
                          <Text style={styles.VideoOwnerView}>
                            {item.view_count} View
                          </Text>
                        </View>
                      </Pressable>
                    );
                  })}
              </View>
            </View>
          </View>

          {/* Post Event */}
          <View style={[{ width }, styles.Block]}>
            {Array.isArray(getUserPostDetails) &&
              getUserPostDetails?.map(function (
                item: UserPostDetails,
                index: number
              ) {
                return (
                  <View style={styles.BlockContainer}>
                    <View style={styles.TimeBlock}>
                      <Text style={styles.TimeDate}>
                        {formatDate(item.created_date)}
                      </Text>

                      {/* <View style={styles.TimeBar}></View> */}
                    </View>
                    <View style={styles.ImageContainer}>
                      <View style={styles.SocialBlock}>
                        <Pressable
                          style={styles.SocialImg1}
                          onPress={() => {
                            setSelectedImageUrl(item.social_img);
                            setModalPostVisible(true);
                          }}
                        >
                          <Image
                            style={styles.PostImg}
                            source={{ uri: item.social_img }}
                            resizeMode="cover"
                          />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                );
              })}
          </View>

          {/* Donation */}
          <View style={[{ width }, styles.Block]}>
            {/* Add Donation Button */}
            <View style={styles.AddBtnContainer2}>
              <Pressable
                style={styles.AddBtnBack}
                onPress={() => navigation.navigate("O_DonationAddScreen")}
              >
                <Text style={styles.AddBtnText}>Add Donation</Text>
                <MaterialIcons name="add" size={25} color="white" />
              </Pressable>
            </View>

            {/* Donation Data */}

            {Array.isArray(getDonetionList) &&
              getDonetionList.length > 0 &&
              getDonetionList?.map(function (
                item: DonetionList,
                index: number
              ) {
                return (
                  <View style={styles.BlockContainer}>
                    <View style={styles.TimeBlock}>
                      {/* <Text style={styles.TimeDate}>2022</Text>
                      <Text style={styles.TimeDate}>22</Text>
                      <Text style={styles.TimeMonth}>AUG</Text> */}
                      {/* <View
                        style={[styles.TimeBar, styles.DonateTimeBar]}
                      ></View> */}
                    </View>
                    <View style={styles.DonationDataContainer}>
                      <View key={index} style={styles.DonateContainer}>
                        <View style={styles.DonateImgBlock}>
                          <View style={styles.DonateBlock1}>
                            <Image
                              style={styles.DonateImg}
                              source={{ uri: item.d_image }}
                              resizeMode="cover"
                            />
                          </View>
                        </View>
                        <View style={styles.DonateData}>
                          <Text style={styles.DonateHeading} numberOfLines={2}>
                            {item.d_title}
                          </Text>
                          <Text style={styles.DonateSubHeading}>
                            {item.created_date}
                          </Text>
                        </View>
                        <View style={styles.DonatePriceBlock}>
                          <View style={styles.DonateBlock2}>
                            <Text style={styles.DonatePrice}>
                              ${item.d_amount}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
          </View>

          {/* Store */}
          <View style={[{ width }, styles.Block]}>
            {Array.isArray(getOrderList) &&
              getOrderList.length > 0 &&
              getOrderList?.map(function (item: OrderList, index: number) {
                return (
                  <View style={styles.BlockContainer}>
                    <View style={styles.TimeBlock}>
                      <Text style={styles.TimeDate}></Text>

                      {/* <View
                        style={[styles.TimeBar, styles.StoreTimeBar2]}
                      ></View> */}
                    </View>
                    {/* Donation Data */}
                    <View style={styles.StoreDataContainer}>
                      <Pressable
                        key={index}
                        style={styles.StoreContainer}
                        // onPress={() =>
                        //   navigation.navigate("O_OrderDetailScreen", item.id)
                        // }
                      >
                        <View style={styles.StoreImgBlock}>
                          <View style={styles.StoreBlock1}>
                            <Image
                              style={styles.StoreImg}
                              source={BlankImage}
                              resizeMode="contain"
                            />
                          </View>
                        </View>
                        <View style={styles.StoreData}>
                          <Text style={styles.StoreHeading} numberOfLines={2}>
                            {item.pro_name}
                          </Text>
                          <Text style={styles.StoreSubHeading}>
                            {item.status}
                          </Text>
                        </View>
                        <View style={styles.StorePriceBlock}>
                          <View style={styles.StoreBlock2}>
                            <Text style={styles.StorePrice}>
                              ${item.final_price}
                            </Text>
                          </View>
                        </View>
                      </Pressable>
                    </View>
                  </View>
                );
              })}
          </View>
        </Animated.View>
      </View>

      {/* Modal */}
      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={modalPostVisible}
        onRequestClose={() => {
          setModalPostVisible(!modalPostVisible);
        }}
      >
        <View style={styles.ModalImgContainer}>
          <Image
            style={styles.ModalImage}
            source={BlankImage}
            resizeMode="contain"
          />
        </View>
      </Modal> */}
    </O_ScreenLayout>
  );
}

const styles = StyleSheet.create({
  Container: {
    paddingTop: 20,
  },
  Block: {
    position: "relative",
  },
  DisplayNone: {
    display: "none",
  },

  // Add Button
  AddBtnContainer1: {
    width: Dimensions.get("window").width - 50,
    height: 65,
    alignItems: "flex-end",
  },
  AddBtnContainer2: {
    width: Dimensions.get("window").width - 40,
    height: 65,
    alignItems: "flex-end",
  },
  AddBtnBack: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: PrimaryColor,
    width: "auto",
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 100,
    position: "relative",
  },
  AddBtnText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: White,
  },

  // Tab Container
  TabContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  TabBlock: {
    marginRight: 30,
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

  // Data Block
  BlockContainer: {
    flexDirection: "row",
    padding: 5,
    alignItems: "flex-start",
    width: Dimensions.get("window").width - 40,
  },
  IconBlock: {
    width: "15%",
    alignItems: "center",
  },
  IconImg: {
    width: 25,
    height: 25,
  },
  IconBar: {
    alignSelf: "center",
    borderLeftColor: TextColor,
    borderLeftWidth: 1.5,
    borderStyle: "dotted",
  },
  IconBar1: {
    height: 30,
  },
  IconBar2: {
    height: 139,
  },
  IconBar3: {
    height: 60,
  },
  DataContainer: {
    width: "85%",
    paddingTop: 4,
  },
  Heading: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
  SubHeading: {
    fontFamily: "Inter-Regular",
    fontSize: 14.5,
    lineHeight: 14.5 * 1.5,
  },
  EditIconBlock: {
    width: "70%",
  },
  BtnContainer: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  EditBtn: {
    width: 60,
    height: 60,
  },

  // Timebar
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
    height: 110,
    alignSelf: "center",
    borderLeftColor: TextColor,
    borderLeftWidth: 1.5,
    borderStyle: "dashed",
  },
  TimeBar1: {
    height: 90,
  },

  // Post
  ImageContainer: {
    width: "85%",
  },
  SocialBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  SocialInner1: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "48%",
  },
  SocialInner2: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "48%",
  },
  SocialInner3: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  PostImg: {
    width: "100%",
    height: "100%",
  },
  SocialImg1: {
    width: "100%",
    height: 150,
  },
  SocialImg2: {
    width: "48%",
    height: 140,
  },
  SocialImg3: {
    width: "46%",
    height: 70,
  },
  SocialImg4: {
    width: "46%",
    height: 65,
  },
  ShowMoreSocialBtn: {
    backgroundColor: PrimaryColor,
    width: "46%",
    height: 65,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
  },
  ShowMoreSocialCount: {
    fontFamily: "Inter-Regular",
    color: White,
    fontSize: 15,
  },

  // Donation
  DonationDataContainer: {
    width: "85%",
    gap: 10,
    flexDirection: "column",
  },
  DonateContainer: {
    width: "100%",
    height: 90,
    flexDirection: "row",
    backgroundColor: White,
    borderRadius: 10,
    elevation: 10,
    padding: 10,
  },
  DonateImgBlock: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  DonateBlock1: {
    width: 60,
    height: 60,
    backgroundColor: White,
    elevation: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  DonateImg: {
    width: 35,
    height: 35,
  },
  DonateData: {
    width: "55%",
    paddingHorizontal: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  DonateHeading: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    color: Black,
    marginBottom: 5,
  },
  DonateSubHeading: {
    fontFamily: "Inter-Regular",
    fontSize: 10,
    color: TextColor,
  },
  DonatePriceBlock: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  DonateBlock2: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: White,
    elevation: 5,
    borderRadius: 100,
    width: 50,
    height: 50,
  },
  DonatePrice: {
    fontFamily: "Inter-SemiBold",
    fontSize: 11,
    color: PrimaryColor,
  },
  DonateTimeBar: {
    height: 325,
  },

  // Modal
  ModalImgContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: Black,
  },
  ModalImage: {
    width: "100%",
    height: "100%",
  },

  // Store
  StoreDataContainer: {
    width: "85%",
    gap: 10,
    flexDirection: "column",
  },
  StoreContainer: {
    width: "100%",
    height: 90,
    flexDirection: "row",
    backgroundColor: White,
    borderRadius: 10,
    elevation: 10,
    padding: 10,
  },
  StoreImgBlock: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  StoreBlock1: {
    width: 60,
    height: 60,
    backgroundColor: White,
    elevation: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  StoreImg: {
    width: 35,
    height: 35,
  },
  StoreData: {
    width: "55%",
    paddingHorizontal: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  StoreHeading: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    color: Black,
    marginBottom: 5,
  },
  StoreSubHeading: {
    fontFamily: "Inter-Regular",
    fontSize: 10,
    color: TextColor,
  },
  StorePriceBlock: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  StoreBlock2: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: White,
    elevation: 5,
    borderRadius: 100,
    width: 50,
    height: 50,
  },
  StorePrice: {
    fontFamily: "Inter-SemiBold",
    fontSize: 11,
    color: PrimaryColor,
  },
  StoreTimeBar: {
    height: 325,
  },
  StoreTimeBar2: {
    height: 50,
  },

  // Prayer Wall
  PrayerBlock: {
    width: Dimensions.get("window").width - 50,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: White,
    padding: 10,
    marginBottom: 15,
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
    width: 0,
    height: 45,
    elevation: 5,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
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
  PodDataContainer: {
    width: "85%",
    gap: 10,
    flexDirection: "column",
  },
  PodBlock: {
    width: "100%",
    borderRadius: 10,
    elevation: 3,
    height: 180,
    position: "relative",
    padding: 10,
    backgroundColor: PrimaryColor,
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
    width: "auto",
    height: 180,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  PodOverlay: {
    width: "auto",
    height: 180,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: Black,
    opacity: 0.4,
    borderRadius: 10,
  },
  PodImg: {
    width: "auto",
    height: 180,
    borderRadius: 10,
  },
  PodTimeBar: {
    height: 510,
  },

  // Video
  VideoDataContainer: {
    width: "85%",
    gap: 10,
    flexDirection: "column",
  },
  VideoBlock: {
    width: "100%",
  },
  VideoData: {
    width: "100%",
    borderRadius: 10,
    elevation: 3,
    height: 180,
    position: "relative",
  },
  VideoImg: {
    width: "100%",
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
  VideoTimeBar: {
    height: 422,
  },
});
