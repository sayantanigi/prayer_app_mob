import { useNavigation } from "@react-navigation/native";
import U_ScreenLayout from "../U_ScreenLayout";
import React from "react";
import { View, StyleSheet, Image, TextInput, Text, Pressable, ScrollView, Dimensions } from "react-native";
import { Black, PrimaryColor, White } from "../../../../Constant/Color";
import { Video, ResizeMode } from 'expo-av';
import { BlankImage, BlankVideo, Icon_27, Icon_8 } from "../../../../Constant/Images";

export default function U_VideoScreen() {
    const navigation = useNavigation<any>();
    const video = React.useRef(null);

    return (
        <U_ScreenLayout
            HeaderHidden
            BannerHidden
            VideoHidden
            ProductBuyHidden
            ProductCartHidden
            ProductCheckoutHidden
            title="Videos"
        >
            <View style={styles.TopPortion}>
                {/* Latest Video */}
                <Pressable style={styles.LatestVideo} onPress={() => navigation.navigate("U_VideoPlayerScreen")}>
                    <View style={styles.LatestVideoCover}>
                        <Image
                            style={styles.LatestPlayIcon}
                            source={Icon_27}
                            resizeMode="contain"
                        />
                    </View>
                    <Video
                        ref={video}
                        style={styles.LatestVideoFile}
                        source={require("../../../../assets/Video/Video1.mp4")}
                        resizeMode={ResizeMode.COVER}
                    />
                </Pressable>

                {/* Data */}
                <View style={styles.TopData}>
                    <Text style={styles.TopHeading}>Timur Weber</Text>
                    <View style={styles.TopSubHeading}>
                        <Text style={styles.TopTime}>2023 | 25:31 min</Text>
                        <Text style={styles.TopVideoView}>12k View</Text>
                    </View>

                    {/* Search Bar */}
                    <View style={styles.SearchBarContainer}>
                        <TextInput style={styles.SearchBarInput}
                            placeholder="Search Videos"
                        />
                        <Image style={styles.SearchIcon} source={Icon_8} resizeMode="contain" />
                    </View>
                </View>
            </View>

            {/* Top Of The Week Data */}
            <View style={styles.DataBlock}>
                <Text style={styles.DataBlockHeading}>Top Of The Week</Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    contentContainerStyle={styles.TOWContainer}
                >
                    {new Array(5).fill(0).map((item, Videoindex) => (
                        <Pressable key={Videoindex} style={styles.TOWBlock} onPress={() => navigation.navigate("U_VideoPlayerScreen")}>
                            <Image style={styles.TOWImage} source={BlankVideo} resizeMode="cover" />
                            <Text style={styles.TOWText} numberOfLines={1}>Luis Quintero</Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>

            {/* My Favorite Channels Data */}
            <View style={styles.DataBlock}>
                <Text style={styles.DataBlockHeading}>My Favorite Channels</Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    contentContainerStyle={styles.TOWContainer}
                >
                    {new Array(5).fill(0).map((item, Videoindex) => (
                        <Pressable key={Videoindex} style={styles.TOWBlock} onPress={() => navigation.navigate("U_VideoPlayerScreen")}>
                            <Image style={styles.TOWImage} source={BlankVideo} resizeMode="cover" />
                            <Text style={styles.TOWText} numberOfLines={1}>Luis Quintero</Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>

            {/* All Videos */}
            <View style={[styles.DataBlock, styles.AllVideoBlock]}>
                <Text style={[styles.DataBlockHeading, styles.AllVideoBlockHeading]}>Video Collection</Text>

                {/* Single Video Tile Start */}
                {new Array(4).fill(0).map((item, Videoindex) => (
                    <View key={Videoindex} style={styles.VideoBlock}>
                        <Pressable style={styles.VideoData} onPress={() => navigation.navigate("U_VideoPlayerScreen")}>
                            <Image style={styles.VideoImg} source={BlankVideo} resizeMode="cover" />
                        </Pressable>
                        <Pressable style={styles.VideoOwner} onPress={() => navigation.navigate("U_VideoDetailsScreen")}>
                            <View style={styles.VideoOwnerText}>
                                <Image style={styles.VideoOwnerImg} source={BlankImage} resizeMode="contain" />
                                <Text style={styles.VideoOwnerHeading} numberOfLines={2}>Name and details of the video are displayed here</Text>
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
    // Top Portion
    TopPortion: {
        backgroundColor: White,
        height: 400,
        position: "relative",
        zIndex: 0,
        marginBottom: 30,
    },
    LatestVideo: {
        width: "100%",
        height: 400,
        position: "relative",
    },
    LatestVideoFile: {
        width: "100%",
        height: "100%",
    },
    LatestVideoCover: {
        width: "100%",
        height: 400,
        position: "absolute",
        backgroundColor: Black,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        opacity: .65,
        alignItems: "center",
        justifyContent: "center",
    },
    LatestPlayIcon: {
        width: 100,
        height: 100,
        opacity: 1,
    },
    TopData: {
        width: "100%",
        position: "absolute",
        bottom: -45,
        zIndex: 2,
    },
    TopHeading: {
        fontFamily: "Inter-SemiBold",
        fontSize: 25,
        paddingHorizontal: 20,
        color: White,
        marginBottom: 10,
    },
    TopSubHeading: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    TopTime: {
        fontFamily: "Inter-Regular",
        fontSize: 15,
        color: White,
    },
    TopVideoView: {
        fontFamily: "Inter-Regular",
        fontSize: 15,
        color: White,
    },

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

    // Data Block
    DataBlock: {
        paddingTop: 20,
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
})
