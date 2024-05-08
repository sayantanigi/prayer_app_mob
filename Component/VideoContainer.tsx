import { useNavigation } from "@react-navigation/native";
import { Video, ResizeMode } from "expo-av";
import React, { useEffect, useState } from "react";
import { StyleSheet, Image, Pressable, View, Text } from "react-native";
import { White } from "../Constant/Color";
import { BlankImage } from "../Constant/Images";
import { useUser } from "../store/user";
import { getUser, setUser } from "../store/userAsync";
import HTML from "react-native-render-html";
export default function VideoContainer(this: any) {
  const navigation = useNavigation<any>();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [videolink, setVideolink] = useState("");
  const [images, setImages] = useState("");
  const [description, setDescription] = useState("");
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   (async () => {
  //     const user = await getUser();
  //     setvideolink(user.videos_file);
  //     setImages(user.video_cover_image);
  //     setDescription(user.videos_description);
  //     setCount(user.view_count);
  //     // Log the retrieved user to see if `videos_file` is present
  //   })();
  // }, [user]);

  useEffect(() => {
    (async () => {
      const user = await getUser();
      if (user) {
        setVideolink(user.videos_file || "");
        setImages(user.video_cover_image || "");
        setDescription(user.videos_description || "");
        setCount(user.view_count || "");
        console.log(user.video_cover_image);
      }
    })();
  }, []);
  return (
    <View>
      <Video
        ref={video}
        style={styles.Video}
        source={{
          uri: videolink,
        }}
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />

      {/* Video Owner */}
      <Pressable
        style={styles.VideoOwner}
        onPress={() => navigation.navigate("U_VideoDetailsScreen")}
      >
        <View style={styles.VideoOwnerText}>
          <Image
            style={styles.VideoOwnerImg}
            source={{ uri: images }}
            resizeMode="cover"
          />
          <Text style={styles.VideoOwnerHeading} numberOfLines={2}>
            <HTML source={{ html: description }}></HTML>;
          </Text>
        </View>
        <Text style={styles.VideoOwnerView}>{count} View</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  Video: {
    width: "100%",
    height: 221,
  },
  VideoOwner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: White,
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 4,
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
