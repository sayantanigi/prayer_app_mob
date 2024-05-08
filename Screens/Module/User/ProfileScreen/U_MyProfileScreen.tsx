import { useNavigation } from "@react-navigation/native";
import U_ScreenLayout from "../U_ScreenLayout";
import HTML from "react-native-render-html";
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
  Back_1,
  BlankImage,
  HomeIcon_2,
  Icon_11,
  Icon_41,
  Icon_42,
  Icon_43,
  Icon_44,
  Icon_45,
  Icon_46,
} from "../../../../Constant/Images";
import { useUser } from "../../../../store/user";
import { getUser } from "../../../../store/userAsync";
import { routes } from "../../../../Constant/URL";
import ProgressBar from "../../../../Component/ProgressBar";
import { useEffect, useState } from "react";
import React from "react";
export interface Userinfo {
  userId: string;
  organizername: string;
  firstname: string;
  lastname: string;
  short_bio: string;
  mobile: string;
  gender: string;
  email: string;
  address: string;
  userType: string;
  latitude: string;
  longitude: string;
  profilePic: string;
}
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
export interface DonetionList {
  id: string;
  user_id: string;
  d_title: string;
  d_description: string;
  d_amount: string;
  d_image: string;
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
export default function U_MyProfileScreen() {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();
  const [getuserInfo, setUserInfo] = useState<Userinfo[]>([]);
  const tabs = ["Profile", "Events", "Post", "Donation", "Store"];
  const [active, setActive] = React.useState(0);
  const translateX = React.useRef(new Animated.Value(active * width)).current;
  const [modalPostVisible, setModalPostVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getPrayerList, setPrayerList] = useState<PrayerList[]>([]);
  const [getUserPostDetails, setUserPostDetails] = useState<UserPostDetails[]>(
    []
  );
  const [getOrderList, setOrderList] = useState<OrderList[]>([]);

  const [getDonetionList, setDonetionList] = useState<DonetionList[]>([]);

  const [selectedImageUrl, setSelectedImageUrl] = useState<any>(null);
  const [user, setUser] = useUser();

  React.useEffect(() => {
    Animated.timing(translateX, {
      useNativeDriver: true,
      toValue: -active * width,
      duration: 450,
      easing: Easing.ease,
    }).start();
  }, [active]);
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
  React.useEffect(() => {
    (async () => {
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
      setLoading(true);
      let response = await fetch(`${routes.getAllPrayer}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let json = await response.json();
      setLoading(false);
      //console.log(json.result);
      setPrayerList(json.result);
    })();
  }, [active]);

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

  function gotoCareerTipsDetails(): void {
    navigation.navigate("U_EditProfile");
  }
  function getModalPostVisible(): void {
    setModalPostVisible(false);
    console.log("button pressed");
  }
  //
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
      date
    );
    const month = new Intl.DateTimeFormat("en", { month: "long" }).format(date);
    const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
    return `${year} ${month} ${day}`;
  };

  console.log(user);

  return (
    <U_ScreenLayout
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
              <View style={[styles.DataContainer, styles.EditIconBlock]}>
                <Text style={styles.Heading}>Name</Text>
                <Text style={styles.SubHeading}>
                  {getuserInfo[0] ? getuserInfo[0].firstname : ""}
                </Text>
              </View>
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
              <View style={styles.DataContainer}>
                <Text style={styles.Heading}>About</Text>
                <Text style={styles.SubHeading}>
                  {Array.isArray(getuserInfo) && getuserInfo[0]
                    ? getuserInfo[0].short_bio
                    : ""}
                </Text>
              </View>
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
                <Text style={styles.SubHeading}>
                  {Array.isArray(getuserInfo) && getuserInfo[0]
                    ? getuserInfo[0].mobile
                    : ""}
                </Text>
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
                <Text style={styles.SubHeading}>
                  {Array.isArray(getuserInfo) && getuserInfo[0]
                    ? getuserInfo[0].gender
                    : ""}
                </Text>
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
                <Text style={styles.SubHeading}>
                  {getuserInfo && getuserInfo[0] ? getuserInfo[0].email : ""}
                </Text>
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
                <Text style={styles.SubHeading}>
                  {getuserInfo && getuserInfo[0] ? getuserInfo[0].address : ""}
                </Text>
              </View>
            </View>
          </View>

          {/* Joined Event */}
          <View style={[{ width }, styles.Block]}>
            {/* Single Event Tile Start */}

            {Array.isArray(getPrayerList) &&
              getPrayerList?.map(function (item: PrayerList, index: number) {
                return (
                  <View key={index} style={styles.EventBlock}>
                    <View style={styles.EventData}>
                      <Image
                        style={styles.EventImg}
                        source={{ uri: item.prayer_image }}
                        resizeMode="cover"
                      />
                      <View style={styles.EventTextContainer}>
                        <Text style={styles.EventHeading} numberOfLines={1}>
                          {item.prayer_name}
                        </Text>
                        <Text style={styles.EventUserText} numberOfLines={1}>
                          {item.userjoined}
                        </Text>
                        <Text style={styles.EventTime}>
                          {item?.prayer_datetime.split(",")[0]}
                        </Text>
                        {/* <Text style={styles.EventTime} numberOfLines={3}>
                        <HTML source={{ html: item.prayer_description }}></HTML>
                        ;
                      </Text> */}
                      </View>
                    </View>
                    <View style={styles.EventTimeBlock}>
                      <Image style={styles.EventTimeIcon} source={HomeIcon_2} />
                      <Image style={styles.EventTimeBack} source={Back_1} />
                      {/* <Text style={styles.EventTimeText}>
                      {" "}
                      {item?.prayer_datetime.split(",")[0]}
                    </Text> */}
                      <Text style={styles.EventTimeText}>
                        {item?.prayer_datetime.split(",")[1]}
                      </Text>
                    </View>
                  </View>
                );
              })}

            {/* Single Event Tile End */}
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

                      <View style={styles.TimeBar}></View>
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

            {/* <View style={styles.BlockContainer}>
              <View style={styles.TimeBlock}>
                <Text style={styles.TimeDate}>12</Text>
                <Text style={styles.TimeMonth}>SEP</Text>
                <View style={styles.TimeBar}></View>
              </View>
              <View style={styles.ImageContainer}>
                <View style={styles.SocialBlock}>
                  <Pressable
                    style={styles.SocialImg2}
                    onPress={() => setModalPostVisible(true)}
                  >
                    <Image
                      style={styles.PostImg}
                      source={BlankImage}
                      resizeMode="cover"
                    />
                  </Pressable>
                  <Pressable
                    style={styles.SocialImg2}
                    onPress={() => setModalPostVisible(true)}
                  >
                    <Image
                      style={styles.PostImg}
                      source={BlankImage}
                      resizeMode="cover"
                    />
                  </Pressable>
                </View>
              </View>
            </View>

            <View style={styles.BlockContainer}>
              <View style={styles.TimeBlock}>
                <Text style={styles.TimeDate}>17</Text>
                <Text style={styles.TimeMonth}>SEP</Text>
                <View style={styles.TimeBar}></View>
              </View>
              <View style={styles.ImageContainer}>
                <View style={styles.SocialBlock}>
                  <Pressable
                    style={styles.SocialImg2}
                    onPress={() => setModalPostVisible(true)}
                  >
                    <Image
                      style={styles.PostImg}
                      source={BlankImage}
                      resizeMode="cover"
                    />
                  </Pressable>
                  <View style={styles.SocialInner1}>
                    <Pressable
                      style={styles.SocialImg3}
                      onPress={() => setModalPostVisible(true)}
                    >
                      <Image
                        style={styles.PostImg}
                        source={BlankImage}
                        resizeMode="cover"
                      />
                    </Pressable>
                    <Pressable
                      style={styles.SocialImg3}
                      onPress={() => setModalPostVisible(true)}
                    >
                      <Image
                        style={styles.PostImg}
                        source={BlankImage}
                        resizeMode="cover"
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.BlockContainer}>
              <View style={styles.TimeBlock}>
                <Text style={styles.TimeDate}>05</Text>
                <Text style={styles.TimeMonth}>OCT</Text>
                <View style={styles.TimeBar}></View>
              </View>
              <View style={styles.ImageContainer}>
                <View style={styles.SocialBlock}>
                  <Pressable
                    style={styles.SocialImg2}
                    onPress={() => setModalPostVisible(true)}
                  >
                    <Image
                      style={styles.PostImg}
                      source={BlankImage}
                      resizeMode="cover"
                    />
                  </Pressable>
                  <View style={styles.SocialInner2}>
                    <View style={styles.SocialInner3}>
                      <Pressable
                        style={styles.SocialImg4}
                        onPress={() => setModalPostVisible(true)}
                      >
                        <Image
                          style={styles.PostImg}
                          source={BlankImage}
                          resizeMode="cover"
                        />
                      </Pressable>
                      <Pressable
                        style={styles.SocialImg4}
                        onPress={() => setModalPostVisible(true)}
                      >
                        <Image
                          style={styles.PostImg}
                          source={BlankImage}
                          resizeMode="cover"
                        />
                      </Pressable>
                    </View>
                    <View style={styles.SocialInner3}>
                      <Pressable
                        style={styles.SocialImg4}
                        onPress={() => setModalPostVisible(true)}
                      >
                        <Image
                          style={styles.PostImg}
                          source={BlankImage}
                          resizeMode="cover"
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.BlockContainer}>
              <View style={styles.TimeBlock}>
                <Text style={styles.TimeDate}>21</Text>
                <Text style={styles.TimeMonth}>NOV</Text>
                <View style={styles.TimeBar}></View>
              </View>
              <View style={styles.ImageContainer}>
                <View style={styles.SocialBlock}>
                  <Pressable
                    style={styles.SocialImg2}
                    onPress={() => setModalPostVisible(true)}
                  >
                    <Image
                      style={styles.PostImg}
                      source={BlankImage}
                      resizeMode="cover"
                    />
                  </Pressable>
                  <View style={styles.SocialInner2}>
                    <View style={styles.SocialInner3}>
                      <Pressable
                        style={styles.SocialImg4}
                        onPress={() => setModalPostVisible(true)}
                      >
                        <Image
                          style={styles.PostImg}
                          source={BlankImage}
                          resizeMode="cover"
                        />
                      </Pressable>
                      <Pressable
                        style={styles.SocialImg4}
                        onPress={() => setModalPostVisible(true)}
                      >
                        <Image
                          style={styles.PostImg}
                          source={BlankImage}
                          resizeMode="cover"
                        />
                      </Pressable>
                    </View>
                    <View style={styles.SocialInner3}>
                      <Pressable
                        style={styles.SocialImg4}
                        onPress={() => setModalPostVisible(true)}
                      >
                        <Image
                          style={styles.PostImg}
                          source={BlankImage}
                          resizeMode="cover"
                        />
                      </Pressable>
                      <Pressable
                        style={styles.SocialImg4}
                        onPress={() => setModalPostVisible(true)}
                      >
                        <Image
                          style={styles.PostImg}
                          source={BlankImage}
                          resizeMode="cover"
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </View> */}

            {/* <View style={styles.BlockContainer}>
              <View style={styles.TimeBlock}>
                <Text style={styles.TimeDate}>2023</Text>
                <Text style={styles.TimeDate}>01</Text>
                <Text style={styles.TimeMonth}>JAN</Text>
                <View style={[styles.TimeBar, styles.TimeBar1]}></View>
              </View>
              <View style={styles.ImageContainer}>
                <View style={styles.SocialBlock}>
                  <Pressable
                    style={styles.SocialImg2}
                    onPress={() => setModalPostVisible(true)}
                  >
                    <Image
                      style={styles.PostImg}
                      source={BlankImage}
                      resizeMode="cover"
                    />
                  </Pressable>
                  <View style={styles.SocialInner2}>
                    <View style={styles.SocialInner3}>
                      <Pressable
                        style={styles.SocialImg4}
                        onPress={() => setModalPostVisible(true)}
                      >
                        <Image
                          style={styles.PostImg}
                          source={BlankImage}
                          resizeMode="cover"
                        />
                      </Pressable>
                      <Pressable
                        style={styles.SocialImg4}
                        onPress={() => setModalPostVisible(true)}
                      >
                        <Image
                          style={styles.PostImg}
                          source={BlankImage}
                          resizeMode="cover"
                        />
                      </Pressable>
                    </View>
                    <View style={styles.SocialInner3}>
                      <Pressable
                        style={styles.SocialImg4}
                        onPress={() => setModalPostVisible(true)}
                      >
                        <Image
                          style={styles.PostImg}
                          source={BlankImage}
                          resizeMode="cover"
                        />
                      </Pressable>
                     
                      <Pressable style={styles.ShowMoreSocialBtn}>
                        <AntDesign name="plus" size={15} color="white" />
                        <Text style={styles.ShowMoreSocialCount}>9</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </View> */}
          </View>

          {/* Donation */}
          <View style={[{ width }, styles.Block]}>
            <View style={styles.BlockContainer}>
              <View style={styles.TimeBlock}>
                {/* <Text style={styles.TimeDate}>2022</Text>
                <Text style={styles.TimeDate}>22</Text>
                <Text style={styles.TimeMonth}>AUG</Text> */}
                {/* <View style={[styles.TimeBar, styles.DonateTimeBar]}></View> */}
              </View>
              {/* Donation Data */}
              <View style={styles.DonationDataContainer}>
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
                              <Text
                                style={styles.DonateHeading}
                                numberOfLines={2}
                              >
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
            </View>
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalPostVisible}
        onRequestClose={() => {
          setModalPostVisible(!modalPostVisible);
        }}
      >
        <View style={styles.ModalImgContainer}>
          <Pressable
            onPress={() => {
              getModalPostVisible();
            }}
            style={styles.CloseButton}
          >
            <Text style={styles.CloseButtonText}>X</Text>
            {/* Using text as an example */}
          </Pressable>

          <Image
            style={styles.ModalImage}
            source={{ uri: selectedImageUrl }}
            resizeMode="contain"
          />
        </View>
      </Modal>
      <ProgressBar loading={loading} />
    </U_ScreenLayout>
  );
}

const styles = StyleSheet.create({
  Container: {
    paddingTop: 20,
  },
  Block: {},
  DisplayNone: {
    display: "none",
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
    borderStyle: "dashed",
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
    width: "90%", // Adjust as needed
    height: "80%", // Adjust as needed
    borderRadius: 10,
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
  AddImageContainer: {
    backgroundColor: White,
    borderRadius: 100,
    height: 60,
    width: 60,
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  AddImage: {
    width: 22,
    height: 22,
  },
  AddImageText: {
    fontFamily: "Inter-Medium",
    fontSize: 12,
    marginTop: 5,
  },

  CloseButton: {
    marginTop: 50,
    position: "absolute",
    top: 10,
    marginRight: 10,
    right: 10,
    backgroundColor: "lightgrey",
    borderRadius: 20,
    padding: 8,
  },
  CloseButtonText: {
    color: "black",
    fontSize: 16,
  },
});
