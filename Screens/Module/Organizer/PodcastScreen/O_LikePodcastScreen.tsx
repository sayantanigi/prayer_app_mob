import { useNavigation } from "@react-navigation/native";
import O_ScreenLayout from "../O_ScreenLayout";
import React from "react";
import { Text, StyleSheet, View, Pressable, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useMusicStore } from "../../../../store/music";
import { TextColor } from "../../../../Constant/Color";
import { BlankImage } from "../../../../Constant/Images";

const apiData = [
    {
        coverImage: BlankImage,
        artist: "Song by Ed Sheeran",
        audio: require("../../../../assets/Mp3/music1.mp3"),
        title: "Perfect (Official Music Video)",
        details: "EP. 12: Daily Rosary Meditations | Ed Sheeran",
        duration: "4 min 39 sec",
    },
    {
        coverImage: BlankImage,
        artist: "Song by Wiz Khalifa",
        audio: require("../../../../assets/Mp3/music2.mp3"),
        title: "See You Again ft. Charlie Puth",
        details: "EP. 13: Daily Rosary Meditations | Wiz Khalifa",
        duration: "3 min 57 sec",
    },
    {
        coverImage: BlankImage,
        artist: "Song by Yanni",
        audio: require("../../../../assets/Mp3/music3.mp3"),
        title: "Nightingale - The Tribute Concerts",
        details: "EP. 14: Daily Rosary Meditations | Yanni",
        duration: "4 min 4 sec",
    },
    {
        coverImage: BlankImage,
        artist: "Song by Ed Sheeran",
        audio: require("../../../../assets/Mp3/music1.mp3"),
        title: "Perfect (Official Music Video)",
        details: "EP. 12: Daily Rosary Meditations | Ed Sheeran",
        duration: "4 min 39 sec",
    },
    {
        coverImage: BlankImage,
        artist: "Song by Wiz Khalifa",
        audio: require("../../../../assets/Mp3/music2.mp3"),
        title: "See You Again ft. Charlie Puth",
        details: "EP. 13: Daily Rosary Meditations | Wiz Khalifa",
        duration: "3 min 57 sec",
    },
    {
        coverImage: BlankImage,
        artist: "Song by Yanni",
        audio: require("../../../../assets/Mp3/music3.mp3"),
        title: "Nightingale - The Tribute Concerts",
        details: "EP. 14: Daily Rosary Meditations | Yanni",
        duration: "4 min 4 sec",
    },
    {
        coverImage: BlankImage,
        artist: "Song by Ed Sheeran",
        audio: require("../../../../assets/Mp3/music1.mp3"),
        title: "Perfect (Official Music Video)",
        details: "EP. 12: Daily Rosary Meditations | Ed Sheeran",
        duration: "4 min 39 sec",
    },
    {
        coverImage: BlankImage,
        artist: "Song by Wiz Khalifa",
        audio: require("../../../../assets/Mp3/music2.mp3"),
        title: "See You Again ft. Charlie Puth",
        details: "EP. 13: Daily Rosary Meditations | Wiz Khalifa",
        duration: "3 min 57 sec",
    },
    {
        coverImage: BlankImage,
        artist: "Song by Yanni",
        audio: require("../../../../assets/Mp3/music3.mp3"),
        title: "Nightingale - The Tribute Concerts",
        details: "EP. 14: Daily Rosary Meditations | Yanni",
        duration: "4 min 4 sec",
    },
    {
        coverImage: BlankImage,
        artist: "Song by Ed Sheeran",
        audio: require("../../../../assets/Mp3/music1.mp3"),
        title: "Perfect (Official Music Video)",
        details: "EP. 12: Daily Rosary Meditations | Ed Sheeran",
        duration: "4 min 39 sec",
    },
    {
        coverImage: BlankImage,
        artist: "Song by Wiz Khalifa",
        audio: require("../../../../assets/Mp3/music2.mp3"),
        title: "See You Again ft. Charlie Puth",
        details: "EP. 13: Daily Rosary Meditations | Wiz Khalifa",
        duration: "3 min 57 sec",
    },
    {
        coverImage: BlankImage,
        artist: "Song by Yanni",
        audio: require("../../../../assets/Mp3/music3.mp3"),
        title: "Nightingale - The Tribute Concerts",
        details: "EP. 14: Daily Rosary Meditations | Yanni",
        duration: "4 min 4 sec",
    },
    {
        coverImage: BlankImage,
        artist: "Song by Ed Sheeran",
        audio: require("../../../../assets/Mp3/music1.mp3"),
        title: "Perfect (Official Music Video)",
        details: "EP. 12: Daily Rosary Meditations | Ed Sheeran",
        duration: "4 min 39 sec",
    },
    {
        coverImage: BlankImage,
        artist: "Song by Wiz Khalifa",
        audio: require("../../../../assets/Mp3/music2.mp3"),
        title: "See You Again ft. Charlie Puth",
        details: "EP. 13: Daily Rosary Meditations | Wiz Khalifa",
        duration: "3 min 57 sec",
    },
    {
        coverImage: BlankImage,
        artist: "Song by Yanni",
        audio: require("../../../../assets/Mp3/music3.mp3"),
        title: "Nightingale - The Tribute Concerts",
        details: "EP. 14: Daily Rosary Meditations | Yanni",
        duration: "4 min 4 sec",
    },
]

export default function O_LikePodcastScreen() {
    const navigation = useNavigation<any>();
    const [podcast, setPodcast] = useMusicStore();

    return (
        <O_ScreenLayout
            BannerHidden
            HeaderHidden
            VideoHidden
            ProductBuyHidden
            ProductCartHidden
            ProductCheckoutHidden
            title="Like Podcasts"
        >
            <View style={styles.Container}>
                {/* Single Block Start */}
                {apiData.map((data, Recentlyindex) =>
                    <Pressable
                        onPress={() => {
                            setPodcast(data)
                        }} style={styles.RecentPodBlock} key={Recentlyindex}>
                        <Image style={styles.RecentPodCover} source={BlankImage} resizeMode="contain" />
                        <View style={styles.RecentPodData}>
                            <Text style={styles.RecentPodTitle} numberOfLines={2}>{data.title}</Text>
                            <Text style={styles.RecentPodArtist} numberOfLines={1}>{data.artist}</Text>
                            <Text style={styles.RecentPodTime}>
                                <Ionicons name="timer-outline" size={12.5} color="#909090" />
                                {data.duration}
                            </Text>
                        </View>
                    </Pressable>
                )}
                {/* Single Block End */}
            </View>
        </O_ScreenLayout>
    );
}

const styles = StyleSheet.create({
    Container: {
        paddingTop: 20,
        paddingBottom: 20,
    },

    // Recently Played
    RecentPodBlock: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
    },
    RecentPodCover: {
        height: 100,
        width: 100,
        borderRadius: 10,
    },
    RecentPodData: {
        paddingLeft: 20,
        gap: 3,
    },
    RecentPodTitle: {
        fontFamily: "Inter-SemiBold",
        fontSize: 16,
        width: 220,
        lineHeight: 16 * 1.3,
    },
    RecentPodArtist: {
        fontFamily: "Inter-Regular",
        color: TextColor,
        fontSize: 12,
    },
    RecentPodTime: {
        fontFamily: "Inter-Regular",
        color: TextColor,
        fontSize: 12,
        justifyContent: "center",
    },
})