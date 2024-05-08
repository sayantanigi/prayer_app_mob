import { useNavigation } from "@react-navigation/native";
import U_ScreenLayout from "../U_ScreenLayout";
import React, { useEffect, useState } from "react";
import HTML from "react-native-render-html";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Pressable,
  Dimensions,
  ScrollView,
} from "react-native";
import { PrimaryColor, TextColor, White } from "../../../../Constant/Color";
import {
  Back_1,
  BlankImage,
  Icon_50,
  Icon_8,
} from "../../../../Constant/Images";
import { routes } from "../../../../Constant/URL";
interface OrganizationList1 {
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
interface OrganizationList {
  userId: string;
  organizername: string;
  firstname: string;
  lastname: string;
  profilePic: string;
}
interface DonationList {
  id: string;
  d_title: string;
  d_description: string;
  d_amount: string;
  d_image: string;
  created_date: string;
}
export default function U_DonationScreen() {
  const [getJoinOrganization, setJoinOrganization] = useState<
    OrganizationList[]
  >([]);
  const [getNonprofitOrganization, setNonprofitOrganization] = useState<
    OrganizationList1[]
  >([]);
  const [getDonetion, setDonetion] = useState<DonationList[]>([]);

  const navigation = useNavigation<any>();
  useEffect(() => {
    (async () => {
      let response = await fetch(`${routes.getOrganizationList}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let json = await response.json();
      setNonprofitOrganization(json.result.organizationList1);
      setJoinOrganization(json.result.organizationList);
      setDonetion(json.result.donationList);
      // setJoinImages(json.result.organizationList1.joined);
    })();
  }, []);

  return (
    <U_ScreenLayout
      HeaderHidden
      BannerHidden
      VideoHidden
      ProductBuyHidden
      ProductCartHidden
      ProductCheckoutHidden
      title="Donation"
    >
      {/* Search Bar */}
      <View style={styles.SearchBarContainer}>
        <TextInput style={styles.SearchBarInput} placeholder="Search" />
        <Image style={styles.SearchIcon} source={Icon_8} resizeMode="contain" />
      </View>

      {/* New Donation */}
      <View style={styles.Block}>
        <View style={styles.BlockHeading}>
          <Text style={styles.DataBlockHeading}>Donate to Help</Text>
        </View>

        <ScrollView
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
        >
          {getDonetion?.map(function (item: DonationList, index: number) {
            return (
              <Pressable
                style={styles.DonationBlock}
                onPress={() =>
                  navigation.navigate("U_DonationPaidScreen", item.id)
                }
              >
                <View style={styles.DonationImageContainer}>
                  <Image
                    style={styles.DonationBack}
                    source={Back_1}
                    resizeMode="cover"
                  />
                  <Image
                    style={styles.DonationImg}
                    source={{ uri: item.d_image }}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.DonationData}>
                  <Text style={styles.DonationHeading} numberOfLines={1}>
                    <HTML source={{ html: item.d_title }}></HTML>
                  </Text>
                  <View style={styles.DonationDetails}>
                    <Text style={styles.DonationTarget}>
                      Target ${item.d_amount}
                    </Text>
                    <Image
                      style={styles.CertifiedIcon}
                      source={Icon_50}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Organization */}
      <View style={styles.Block}>
        <View style={styles.BlockHeading}>
          <Text style={styles.DataBlockHeading}>Joined Organization</Text>
          <Pressable
            style={styles.ViewAll}
            onPress={() => navigation.navigate("U_OrganizationListScreen")}
          >
            <Text style={styles.ViewAllText}>View All</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 15, paddingLeft: 20, paddingRight: 20 }}
        >
          {/* Single Block */}

          {getJoinOrganization?.map(function (
            item: OrganizationList,
            index: number
          ) {
            return (
              <Pressable
                key={index}
                style={styles.OrgBlock}
                onPress={() =>
                  navigation.navigate("U_OrganizationDetailsScreen")
                }
              >
                <View style={styles.OrgImgBlock}>
                  <Image
                    style={styles.OrgImg}
                    source={{ uri: item.profilePic }}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.OrgText} numberOfLines={2}>
                  {item.organizername}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Join Organization */}
      <View style={styles.Block}>
        <View style={styles.BlockHeading}>
          <Text style={styles.DataBlockHeading}>
            Join our Nonprofit Organization
          </Text>
          <Pressable
            style={styles.ViewAll}
            onPress={() => navigation.navigate("U_OrganizationListScreen")}
          >
            <Text style={styles.ViewAllText}>View All</Text>
          </Pressable>
        </View>

        {/* Single Block */}

        {getNonprofitOrganization?.map(function (
          item: OrganizationList1,
          index: number
        ) {
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
                              style={[styles.JorgCoverImg, styles.JorgImg1]}
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
                  {item.joined.length > 0 ? `+ ${item.joined.length}` : null}
                </Text>
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
    </U_ScreenLayout>
  );
}

const styles = StyleSheet.create({
  Container: {},

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
  BlockHeading: {
    width: Dimensions.get("window").width - 40,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  DataBlockHeading: {
    fontFamily: "Inter-SemiBold",
    fontSize: 22,
    color: PrimaryColor,
    width: "80%",
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

  // New Donation
  DonationBlock: {
    width: 200,
    height: 250,
    flexDirection: "column",
    borderRadius: 15,
    backgroundColor: White,
    elevation: 3,
    margin: 20,
  },
  DonationImageContainer: {
    position: "relative",
    width: "100%",
    height: "65%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1,
  },
  DonationBack: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  DonationImg: {
    position: "absolute",
    width: "100%",
    height: 180,
    zIndex: 1,
    bottom: 0,
  },
  DonationData: {
    width: "100%",
    height: "35%",
    padding: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  DonationHeading: {
    fontFamily: "Inter-Medium",
    fontSize: 13,
  },
  DonationDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  DonationTarget: {
    fontFamily: "Inter-Medium",
    fontSize: 13,
    color: TextColor,
  },
  CertifiedIcon: {
    width: 20,
    height: 20,
  },

  // Organization
  OrgBlock: {
    width: 100,
    height: 150,
    flexDirection: "column",
  },
  OrgImgBlock: {
    width: "100%",
    height: 100,
    backgroundColor: White,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    borderRadius: 10,
  },
  OrgImg: {
    width: 60,
    height: 60,
  },
  OrgText: {
    alignSelf: "center",
    textAlign: "center",
    fontFamily: "Inter-Medium",
    fontSize: 12,
    lineHeight: 12 * 1.4,
    marginTop: 5,
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
    marginTop: -40,
    fontFamily: "Inter-Regular",
    color: TextColor,
    fontSize: 12,
    paddingLeft: 55,
  },
});
