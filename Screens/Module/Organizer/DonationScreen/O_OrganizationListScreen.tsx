import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { PrimaryColor, TextColor, White } from "../../../../Constant/Color";
import { Back_1, BlankImage, Icon_8 } from "../../../../Constant/Images";
import { routes } from "../../../../Constant/URL";
import O_ScreenLayout from "../O_ScreenLayout";
interface Viewallorganization {
  userId: string;
  organizername: string;
  firstname: string;
  lastname: string;
  profilePic: string;
  joined: Joined[] | string;
}
interface Joined {
  image: string;
}
export default function O_OrganizationListScreen() {
  const [getLatesVideo, setLatestVideo] = useState<Viewallorganization[]>([]);
  const [search, setSearch] = useState("");

  const navigation = useNavigation<any>();
  useEffect(() => {
    (async () => {
      let response = await fetch(`${routes.viewAllOrganization}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let json = await response.json();
      setLatestVideo(json.result.viewallorganization);
      console.log(json);
    })();
  }, []);

  return (
    <O_ScreenLayout
      HeaderHidden
      BannerHidden
      VideoHidden
      ProductBuyHidden
      ProductCartHidden
      ProductCheckoutHidden
      title="Organization List"
    >
      {/* Search Bar */}
      <View style={styles.SearchBarContainer}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          style={styles.SearchBarInput}
          placeholder="Search"
        />
        <Image style={styles.SearchIcon} source={Icon_8} resizeMode="contain" />
      </View>

      <View style={styles.Block}>
        {/* Single Block */}

        {getLatesVideo &&
          Array.isArray(getLatesVideo) &&
          getLatesVideo
            .filter((item) => {
              const query = search.toLowerCase();
              return item.organizername.toLowerCase().includes(query);
            })
            .map(function (item: Viewallorganization, index: number) {
              return (
                <View key={index} style={styles.JorgBlock}>
                  <View style={styles.JorgImgBlock}>
                    <Image
                      style={styles.JorgImg}
                      source={{ uri: item.profilePic }}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.JorgData}>
                    <Text style={styles.JorgHeading} numberOfLines={2}>
                      {item.organizername}
                    </Text>
                    <View style={styles.JorgCovers}>
                      {/* <View style={styles.JorgCoverImgs}>
                    <Image
                      style={[styles.JorgCoverImg, styles.JorgImg1]}
                      source={require("../../../../assets/Images/Images/Cover1.png")}
                      resizeMode="cover"
                    />
                    <Image
                      style={[styles.JorgCoverImg, styles.JorgImg2]}
                      source={require("../../../../assets/Images/Images/Cover2.png")}
                      resizeMode="cover"
                    />
                    <Image
                      style={[styles.JorgCoverImg, styles.JorgImg3]}
                      source={require("../../../../assets/Images/Images/Cover3.png")}
                      resizeMode="cover"
                    />
                    <Image
                      style={[styles.JorgCoverImg, styles.JorgImg4]}
                      source={require("../../../../assets/Images/Images/Cover4.png")}
                      resizeMode="cover"
                    />
                    <Image
                      style={[styles.JorgCoverImg, styles.JorgImg5]}
                      source={require("../../../../assets/Images/Images/Cover5.png")}
                      resizeMode="cover"
                    />
                  </View> */}
                      {Array.isArray(item.joined) && (
                        <ScrollView
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}
                        >
                          {item.joined &&
                            item.joined.map((join, index) => (
                              <View style={styles.JorgCovers}>
                                <View style={styles.JorgCoverImgs}>
                                  <Image
                                    style={[
                                      styles.JorgCoverImg,
                                      styles.JorgImg1,
                                    ]}
                                    source={{ uri: join.image ?? "" }}
                                    resizeMode="cover"
                                  />
                                  {/* <Image
                            style={[styles.JorgCoverImg, styles.JorgImg2]}
                            source={require("../../../../assets/Images/Images/Cover2.png")}
                            resizeMode="cover"
                          />
                          <Image
                            style={[styles.JorgCoverImg, styles.JorgImg3]}
                            source={require("../../../../assets/Images/Images/Cover3.png")}
                            resizeMode="cover"
                          />
                          <Image
                            style={[styles.JorgCoverImg, styles.JorgImg4]}
                            source={require("../../../../assets/Images/Images/Cover4.png")}
                            resizeMode="cover"
                          />
                          <Image
                            style={[styles.JorgCoverImg, styles.JorgImg5]}
                            source={require("../../../../assets/Images/Images/Cover5.png")}
                            resizeMode="cover"
                          /> */}
                                </View>
                              </View>
                            ))}
                        </ScrollView>
                      )}
                      <Text style={styles.JorgCoverText}>
                        {item.joined.length > 0
                          ? `+ ${item.joined.length}`
                          : null}
                      </Text>
                      <Text style={styles.JorgCoverText}></Text>
                    </View>
                  </View>
                  <Pressable
                    style={styles.JorgBtn}
                    onPress={() =>
                      navigation.navigate(
                        "U_OrganizationDetailsScreen",
                        item.userId
                      )
                    }
                  >
                    <Text style={styles.JorgBtnText}>JOIN</Text>
                    <Image
                      style={styles.JorgBtnTextBack}
                      source={Back_1}
                      resizeMode="cover"
                    />
                  </Pressable>
                </View>
              );
            })}
      </View>
    </O_ScreenLayout>
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

  // Common
  Block: {},
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

  // Join Organization
  JorgBlock: {
    width: Dimensions.get("window").width - 40,
    alignSelf: "center",
    marginBottom: 15,
    backgroundColor: White,
    elevation: 4,
    flexDirection: "row",
    borderRadius: 10,
  },
  JorgImgBlock: {
    width: "25%",
    padding: 10,
  },
  JorgImg: {
    width: "100%",
    height: 70,
    borderRadius: 5,
  },
  JorgData: {
    width: "50%",
    padding: 10,
    flexDirection: "column",
    paddingLeft: 0,
    justifyContent: "space-between",
  },
  JorgHeading: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: PrimaryColor,
    width: "80%",
  },
  JorgBtn: {
    width: "25%",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  JorgBtnText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: White,
    zIndex: 1,
  },
  JorgBtnTextBack: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    zIndex: 0,
  },
  JorgCovers: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
  },
  JorgCoverImgs: {
    position: "relative",
  },
  JorgCoverImg: {
    width: 25,
    height: 25,
    borderRadius: 100,
  },
  JorgImg1: {
    zIndex: 1,
  },
  JorgImg2: {
    position: "absolute",
    left: 10,
    zIndex: 0,
  },
  JorgImg3: {
    position: "absolute",
    left: 20,
    zIndex: -1,
  },
  JorgImg4: {
    position: "absolute",
    left: 30,
    zIndex: -2,
  },
  JorgImg5: {
    position: "absolute",
    left: 40,
    zIndex: -3,
  },
  JorgCoverText: {
    fontFamily: "Inter-Regular",
    color: TextColor,
    fontSize: 12,
    paddingLeft: 50,
  },
});
