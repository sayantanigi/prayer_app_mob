import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  BlankImage,
  BlankVideo,
  HomeIcon_5,
} from "../../../../Constant/Images";
import HTML from "react-native-render-html";
import { routes } from "../../../../Constant/URL";
import { setUser } from "../../../../store/userAsync";
import O_ScreenLayout from "../O_ScreenLayout";
{
  /* <HTML source={{ html: item.videos_description }}></HTML>; */
}
export interface VideoDetail {
  id: string;
  video_cover_image: string;
  videos_file: string;
  videos_name: string;
  videos_description: string;
  view_count: string;
}

export interface VideoCollection {
  id: string;
  organizername: string;
  profilePic: string;
  video_cover_image: string;
  videos_file: string;
  videos_name: string;
  view_count: string;
}
export default function U_VideoPlayerSecondScreen() {
  const navigation = useNavigation<any>();
  const video = React.useRef(null);
  const route = useRoute();

  const [getLatesVideo, setLatestVideo] = useState<VideoDetail[]>([]);
  const [getVideocollection, setVideocollection] = useState<VideoCollection[]>(
    []
  );

  useEffect(() => {
    (async () => {
      let response = await fetch(`${routes.getVideoDetails}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ video_id: route?.params }),
      });
      let json = await response.json();
      const data = json.result.video_details[0];
      setLatestVideo(json.result.video_details[0]);
      setVideocollection(json.result.video_collection);
      console.log(json.result.video_collection);
      await setUser({
        videos_file: data[0].videos_file,
        videos_name: data[0].videos_name,
        videos_description: data[0].videos_description,
        view_count: data[0].view_count,
        video_cover_image: data[0].video_cover_image,
      });
    })();
  }, [route?.params]);

  //   return (

  //     <U_ScreenLayout
  //       HeaderHidden
  //       BannerHidden
  //       ProductBuyHidden
  //       ProductCartHidden
  //       ProductCheckoutHidden
  //       title="Videos"
  //     >
  //       {/* All Videos */}
  //       <View style={styles.DataBlock}>
  //         {/* Single Video Tile Start */}
  //         {new Array(3).fill(0).map((item, Videoindex) => (
  //           <View key={Videoindex} style={styles.VideoBlock}>
  //             <Pressable
  //               style={styles.VideoData}
  //               onPress={() => navigation.navigate("U_VideoPlayerScreen")}
  //             >
  //               <Image
  //                 style={styles.VideoImg}
  //                 source={BlankVideo}
  //                 resizeMode="cover"
  //               />
  //             </Pressable>
  //             <Pressable
  //               style={styles.VideoOwner}
  //               onPress={() => navigation.navigate("U_VideoDetailsScreen")}
  //             >
  //               <View style={styles.VideoOwnerText}>
  //                 <Image
  //                   style={styles.VideoOwnerImg}
  //                   source={BlankImage}
  //                   resizeMode="contain"
  //                 />
  //                 <Text style={styles.VideoOwnerHeading} numberOfLines={2}>
  //                   Name and details of the video are displayed here
  //                 </Text>
  //               </View>
  //               <Text style={styles.VideoOwnerView}>12K View</Text>
  //             </Pressable>
  //           </View>
  //         ))}

  //         {/* {getLatesVideo?.map(function (item: VideoDetail, index: number) {
  //           return (
  //             <View key={index} style={styles.VideoBlock}>
  //               <Pressable
  //                 style={styles.VideoData}
  //                 onPress={() => navigation.navigate("U_VideoPlayerScreen")}
  //               >
  //                 <Image
  //                   style={styles.VideoImg}
  //                   source={{ uri: item.videos_file }}
  //                   resizeMode="cover"
  //                 />
  //               </Pressable>
  //               <Pressable
  //                 style={styles.VideoOwner}
  //                 onPress={() => navigation.navigate("U_VideoDetailsScreen")}
  //               >
  //                 <View style={styles.VideoOwnerText}>
  //                   <Image
  //                     style={styles.VideoOwnerImg}
  //                     source={{ uri: item.video_cover_image }}
  //                     resizeMode="contain"
  //                   />
  //                   <Text style={styles.VideoOwnerHeading} numberOfLines={2}>
  //                     Name and details of the video are displayed here
  //                   </Text>
  //                 </View>
  //                 <Text style={styles.VideoOwnerView}>12K View</Text>
  //               </Pressable>
  //             </View>
  //           );
  //         })} */}

  //         {/* Single Video Tile End */}
  //       </View>
  //     </U_ScreenLayout>
  //   );

  return getVideocollection?.length > 0 ? (
    <O_ScreenLayout
      HeaderHidden
      BannerHidden
      ProductBuyHidden
      ProductCartHidden
      ProductCheckoutHidden
      title="Videos"
    >
      <View style={styles.DataBlock}>
        {/* {new Array(3).fill(0).map((item, Videoindex) => (
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
        ))} */}

        {getVideocollection?.map(function (
          item: VideoCollection,
          index: number
        ) {
          return (
            <View key={index} style={styles.VideoBlock}>
              <Pressable
                style={styles.VideoData}
                onPress={() =>
                  navigation.navigate("U_VideoPlayerScreen", item.id)
                }
              >
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
              </Pressable>
              <Pressable
                style={styles.VideoOwner}
                onPress={() =>
                  navigation.navigate("U_VideoDetailsScreen", item.id)
                }
              >
                <View style={styles.VideoOwnerText}>
                  <Image
                    style={styles.VideoOwnerImg}
                    source={{ uri: item.video_cover_image }}
                    resizeMode="cover"
                  />
                  <Text style={styles.VideoOwnerHeading} numberOfLines={2}>
                    <HTML source={{ html: item.videos_name }}></HTML>;
                  </Text>
                </View>
                <Text style={styles.VideoOwnerView}>
                  {item.view_count} View
                </Text>
              </Pressable>
            </View>
          );
        })}

        {/* Single Video Tile End */}
      </View>
    </O_ScreenLayout>
  ) : (
    // Render an alternative component or null if getVideocollection is empty
    <View style={styles.VideoBlock}>
      <Text>No videos available.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // Video
  DataBlock: {
    paddingTop: 20,
    paddingHorizontal: 20,
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
    padding: 1,
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
  PodPlayIcon: {
    position: "absolute",
    alignContent: "center",
    width: 50,
    height: 50,
    right: 10,
    bottom: 10,
  },
});
