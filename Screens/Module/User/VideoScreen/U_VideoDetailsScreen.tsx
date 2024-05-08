import React from "react";
import U_ScreenLayout from "../U_ScreenLayout";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  Black,
  PrimaryColor,
  TextColor,
  White,
} from "../../../../Constant/Color";
import { useNavigation } from "@react-navigation/native";
import {
  BlankImage,
  BlankVideo,
  Icon_26,
  Icon_28,
} from "../../../../Constant/Images";

export default function U_VideoDetailsScreen() {
  const navigation = useNavigation<any>();
  const video = React.useRef(null);

  return (
    <U_ScreenLayout
      HeaderHidden
      VideoHidden
      ProductBuyHidden
      ProductCartHidden
      ProductCheckoutHidden
      title="Profile Details"
      BannerImage={BlankImage}
    >
      <View style={styles.ProfileData}>
        <Image
          style={styles.ProfileImg}
          source={BlankImage}
          resizeMode="cover"
        />
        <Text style={styles.ProfileHeading}>Alessia Caravaggio</Text>
        <Text style={styles.ProfileSubHeading}>
          Nullam pharetra ante turpis, eget aliquet dui imperdiet quis. Morbi
          bibendum consequat turpis, eget porta diam ornare in. Proin sed ante
          sapien. Morbi est tellus, volutpat et neque at, placerat fringilla
          nulla. Nunc congue lectus in quam luctus euismod. Nunc vulputate dui
          vel nunc elementum, a rutrum massa lacinia. Aenean ullamcorper nibh ut
          turpis pellentesque, nec laoreet purus dictum.
        </Text>
        <View style={styles.ProfileComment}>
          <Pressable style={styles.ProfileLike}>
            <Image
              style={styles.ProfileLikeImg}
              source={Icon_28}
              resizeMode="contain"
            />
          </Pressable>
          <Pressable style={styles.ProfileShare}>
            <Image
              style={styles.ProfileShareImg}
              source={Icon_26}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </View>

      {/* Recently Uploaded */}
      <View style={styles.DataBlock1}>
        <Text style={styles.DataBlockHeading}>Recently Uploaded</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.TOWContainer}
        >
          {new Array(5).fill(0).map((item, Videoindex) => (
            <Pressable
              key={Videoindex}
              style={styles.TOWBlock}
              onPress={() => navigation.navigate("U_VideoPlayerScreen")}
            >
              <Image
                style={styles.TOWImage}
                source={BlankVideo}
                resizeMode="cover"
              />
              <Text style={styles.TOWText} numberOfLines={1}>
                Luis Quintero
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Video Collection */}
      <View style={[styles.DataBlock1, styles.AllVideoBlock]}>
        <Text style={[styles.DataBlockHeading, styles.AllVideoBlockHeading]}>
          Video Collection
        </Text>

        {/* Single Video Tile Start */}
        {new Array(5).fill(0).map((item, Videoindex) => (
          <View key={Videoindex} style={styles.VideoBlock}>
            <Pressable
              style={styles.VideoData}
              onPress={() => navigation.navigate("U_VideoPlayerScreen")}
            >
              <Image
                style={styles.VideoImg}
                source={BlankVideo}
                resizeMode="cover"
              />
            </Pressable>
            <Pressable
              style={styles.VideoOwner}
              onPress={() => navigation.navigate("U_VideoDetailsScreen")}
            >
              <View style={styles.VideoOwnerText}>
                <Image
                  style={styles.VideoOwnerImg}
                  source={BlankImage}
                  resizeMode="contain"
                />
                <Text style={styles.VideoOwnerHeading} numberOfLines={2}>
                  Name and details of the video are displayed here
                </Text>
              </View>
              <Text style={styles.VideoOwnerView}>12K View</Text>
            </Pressable>
          </View>
        ))}
        {/* Single Video Tile End */}
      </View>
    </U_ScreenLayout>
  );
}

const styles = StyleSheet.create({
  // Profie Data
  ProfileData: {
    paddingHorizontal: 20,
    flexDirection: "column",
    gap: 10,
    position: "absolute",
    left: 0,
    top: 180,
    zIndex: 1,
    borderBottomColor: TextColor,
    borderBottomWidth: 1,
    paddingBottom: 15,
  },
  ProfileImg: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  ProfileHeading: {
    fontFamily: "Inter-SemiBold",
    fontSize: 22,
    color: Black,
  },
  ProfileSubHeading: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    color: TextColor,
  },
  ProfileComment: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    position: "absolute",
    top: 60,
    right: 20,
  },
  ProfileLike: {
    height: 45,
    width: 45,
    borderRadius: 100,
    backgroundColor: White,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  ProfileLikeImg: {
    width: 18,
    height: 18,
  },
  ProfileShare: {
    height: 45,
    width: 45,
    borderRadius: 100,
    backgroundColor: White,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  ProfileShareImg: {
    width: 18,
    height: 18,
  },

  // Data Block
  DataBlock1: {
    marginTop: 320,
  },
  DataBlockHeading: {
    fontFamily: "Inter-SemiBold",
    fontSize: 22,
    color: PrimaryColor,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  TOWContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    gap: 15,
  },
  TOWBlock: {
    flexDirection: "column",
    alignItems: "center",
  },
  TOWImage: {
    height: 140,
    width: 130,
    borderRadius: 10,
    marginBottom: 5,
  },
  TOWText: {
    fontFamily: "Inter-Regular",
    color: Black,
    fontSize: 12,
    width: 130,
    lineHeight: 12 * 1.5,
    paddingHorizontal: 10,
  },

  // Video
  AllVideoBlock: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  AllVideoBlockHeading: {
    paddingLeft: 0,
  },
  VideoBlock: {
    width: Dimensions.get("window").width - 40,
    marginBottom: 20,
  },
  VideoData: {
    width: Dimensions.get("window").width - 40,
    borderRadius: 10,
    elevation: 3,
    height: 180,
    position: "relative",
  },
  VideoImg: {
    width: Dimensions.get("window").width - 40,
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
