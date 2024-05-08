import { useNavigation } from "@react-navigation/native";
import U_ScreenLayout from "../U_ScreenLayout";
import { View, StyleSheet, Image, Text, Pressable, Modal } from "react-native";
import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useMusicStore } from "../../../../store/music";
import { useSwipe } from "../../../../hooks/onSwipe";
import { BackgroundColor, ErrorText, PrimaryColor, Shadow, TextColor, White } from "../../../../Constant/Color";
import { BlankImage, Icon_26, Icon_28, Icon_48, Icon_49 } from "../../../../Constant/Images";

const apiData = [
    {
        coverImage: require("../../../../assets/Images/Images/Blank-Image.png"),
        artist: "Song by Ed Sheeran",
        audio: require("../../../../assets/Mp3/music1.mp3"),
        title: "Perfect (Official Music Video)",
        details: "EP. 12: Daily Rosary Meditations | Ed Sheeran",
        duration: "4 min 39 sec",
    },
    {
        coverImage: require("../../../../assets/Images/Images/Blank-Image.png"),
        artist: "Song by Wiz Khalifa",
        audio: require("../../../../assets/Mp3/music2.mp3"),
        title: "See You Again ft. Charlie Puth",
        details: "EP. 13: Daily Rosary Meditations | Wiz Khalifa",
        duration: "3 min 57 sec",
    },
    {
        coverImage: require("../../../../assets/Images/Images/Blank-Image.png"),
        artist: "Song by Yanni",
        audio: require("../../../../assets/Mp3/music3.mp3"),
        title: "Nightingale - The Tribute Concerts",
        details: "EP. 14: Daily Rosary Meditations | Yanni",
        duration: "4 min 4 sec",
    },
    {
        coverImage: require("../../../../assets/Images/Images/Blank-Image.png"),
        artist: "Song by Ed Sheeran",
        audio: require("../../../../assets/Mp3/music1.mp3"),
        title: "Perfect (Official Music Video)",
        details: "EP. 12: Daily Rosary Meditations | Ed Sheeran",
        duration: "4 min 39 sec",
    },
    {
        coverImage: require("../../../../assets/Images/Images/Blank-Image.png"),
        artist: "Song by Wiz Khalifa",
        audio: require("../../../../assets/Mp3/music2.mp3"),
        title: "See You Again ft. Charlie Puth",
        details: "EP. 13: Daily Rosary Meditations | Wiz Khalifa",
        duration: "3 min 57 sec",
    },
    {
        coverImage: require("../../../../assets/Images/Images/Blank-Image.png"),
        artist: "Song by Yanni",
        audio: require("../../../../assets/Mp3/music3.mp3"),
        title: "Nightingale - The Tribute Concerts",
        details: "EP. 14: Daily Rosary Meditations | Yanni",
        duration: "4 min 4 sec",
    },
    {
        coverImage: require("../../../../assets/Images/Images/Blank-Image.png"),
        artist: "Song by Ed Sheeran",
        audio: require("../../../../assets/Mp3/music1.mp3"),
        title: "Perfect (Official Music Video)",
        details: "EP. 12: Daily Rosary Meditations | Ed Sheeran",
        duration: "4 min 39 sec",
    },
    {
        coverImage: require("../../../../assets/Images/Images/Blank-Image.png"),
        artist: "Song by Wiz Khalifa",
        audio: require("../../../../assets/Mp3/music2.mp3"),
        title: "See You Again ft. Charlie Puth",
        details: "EP. 13: Daily Rosary Meditations | Wiz Khalifa",
        duration: "3 min 57 sec",
    },
]

const ModalData = [
    {
        coverImage: require("../../../../assets/Images/Images/Blank-Image.png"),
        artist: "Song by Ed Sheeran",
        audio: require("../../../../assets/Mp3/music1.mp3"),
        title: "Perfect (Official Music Video)",
        details: "EP. 12: Daily Rosary Meditations | Ed Sheeran",
        duration: "4 min 39 sec",
    }
]

export default function U_PodcastListScreen() {
    const navigation = useNavigation<any>();
    const [podcast, setPodcast] = useMusicStore();
    const [shouldFollow, setShouldFollow] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modallikeVisible, setModalLikeVisible] = useState(false);
    const { onTouchStart, onTouchEnd } = useSwipe(handleBottomSwipe)

    // Gesture Handle
    function handleBottomSwipe() {
        setModalVisible(!modalVisible);
    }

    return (
        <U_ScreenLayout
            HeaderHidden
            VideoHidden
            ProductBuyHidden
            ProductCartHidden
            ProductCheckoutHidden
            title="Podcasts"
            BannerHeading="Artist Name"
            BannerSubHeading="Religion & Spirituality"
            BannerImage={BlankImage}
        >
            <View style={styles.ArtistContainer}>
                <View style={styles.ArtistPodDetails}>
                    <View style={styles.ArtistTopSection}>
                        <View style={styles.ArtistData}>
                            <Text style={styles.ArtistText}>12.5K Listeners . 40 Episodes</Text>
                            {shouldFollow ? (
                                <>
                                    <Pressable style={styles.ArtistFollowBtn} onPress={() => { setShouldFollow(!shouldFollow) }}>
                                        <Text style={styles.ArtistFollowBtnText}>Follow</Text>
                                    </Pressable>
                                </>) : (
                                <Pressable style={styles.ArtistActiveFollowBtn} onPress={() => setShouldFollow(!shouldFollow)}>
                                    <Text style={styles.ArtistActiveFollowBtnText}>Follow</Text>
                                </Pressable>
                            )}
                        </View>
                        <Pressable onPress={() => setPodcast(apiData[0])}>
                            <Image style={styles.ArtistShuffleBtn} source={Icon_48} resizeMode="contain" />
                        </Pressable>
                    </View>

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
                            <Pressable style={styles.Option} onPress={() => setModalVisible(true)}>
                                <Entypo name="dots-three-vertical" size={20} color="black" />
                            </Pressable>
                        </Pressable>
                    )}
                    {/* Single Block End */}
                </View>
            </View>

            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.ModalContainer}>
                    <View style={styles.ModalBody}>
                        <View style={styles.ModalData} onTouchEnd={onTouchEnd}>
                            {/* Drag to close section */}
                            <View style={styles.DragContainer}>
                                <View style={styles.DragBar}></View>
                            </View>
                            {/* Single Block Start */}
                            {ModalData.map((data, Modalindex) =>
                                <Pressable
                                    onPress={() => {
                                        setPodcast(data)
                                    }} style={styles.RecentPodBlock} key={Modalindex}>
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

                        <View style={styles.ModalBtnContainer}>
                            {modallikeVisible ? (
                                <>
                                    <Pressable style={styles.ModalLikeActiveBtn} onPress={() => { setModalLikeVisible(!modallikeVisible) }}>
                                        <Image style={styles.ModalImg} source={Icon_49} resizeMode="contain" />
                                        <Text style={styles.ModalBtnLikeActiveText}>Like</Text>
                                    </Pressable>
                                </>) : (
                                <Pressable style={styles.ModalLikeBtn} onPress={() => { setModalLikeVisible(!modallikeVisible) }}>
                                    <Image style={styles.ModalImg} source={Icon_28} resizeMode="contain" />
                                    <Text style={styles.ModalBtnLikeText}>Like</Text>
                                </Pressable>
                            )}
                            <Pressable style={styles.ModalBtnShare}>
                                <Image style={styles.ModalImg} source={Icon_26} resizeMode="contain" />
                                <Text style={styles.ModalBtnShareText}>Share</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </U_ScreenLayout>
    );
}

const styles = StyleSheet.create({
    ArtistContainer: {
        paddingBottom: 20,
    },

    // Bottom
    ArtistPodDetails: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        width: "100%",
    },
    ArtistTopSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 20,
    },
    ArtistData: {
        gap: 10,
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    ArtistText: {
        fontFamily: "Inter-SemiBold",
        fontSize: 16,
        lineHeight: 16 * 1.3,
    },
    ArtistFollowBtn: {
        alignItems: "center",
        justifyContent: "center",
        width: 70,
        height: 25,
        elevation: 10,
        backgroundColor: White,
        borderRadius: 100
    },
    ArtistFollowBtnText: {
        fontSize: 12,
        fontFamily: "Inter-SemiBold",
        color: PrimaryColor
    },
    ArtistActiveFollowBtn: {
        alignItems: "center",
        justifyContent: "center",
        width: 70,
        height: 25,
        elevation: 10,
        backgroundColor: PrimaryColor,
        borderRadius: 100
    },
    ArtistActiveFollowBtnText: {
        fontSize: 12,
        fontFamily: "Inter-SemiBold",
        color: White
    },
    ArtistShuffleBtn: {
        width: 70,
        height: 70,
    },

    // Recently Played
    RecentPodBlock: {
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
    Option: {
        alignItems: "center",
        justifyContent: "flex-start",
    },

    // Modal
    ModalContainer: {
        backgroundColor: Shadow,
        height: "100%",
    },
    ModalBody: {
        position: "absolute",
        width: "100%",
        backgroundColor: BackgroundColor,
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    ModalData: {
        padding: 20,
        paddingTop: 10,
    },
    ModalBtnContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopColor: TextColor,
        borderTopWidth: 1,
        paddingBottom: 30,
        paddingTop: 30,
    },
    ModalImg: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    ModalLikeBtn: {
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        height: 40,
        elevation: 10,
        backgroundColor: White,
        borderRadius: 100,
        flexDirection: "row",
        marginLeft: 60,
    },
    ModalLikeActiveBtn: {
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        height: 40,
        elevation: 10,
        backgroundColor: ErrorText,
        borderRadius: 100,
        flexDirection: "row",
        marginLeft: 60,
    },
    ModalBtnLikeText: {
        fontSize: 13,
        fontFamily: "Inter-SemiBold",
        color: ErrorText
    },
    ModalBtnLikeActiveText: {
        fontSize: 13,
        fontFamily: "Inter-SemiBold",
        color: White,
    },
    ModalBtnShare: {
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        height: 40,
        elevation: 10,
        backgroundColor: White,
        borderRadius: 100,
        flexDirection: "row",
        marginRight: 60,
    },
    ModalBtnShareText: {
        fontSize: 13,
        fontFamily: "Inter-SemiBold",
        color: PrimaryColor
    },
    DragContainer: {
        height: 20,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    DragBar: {
        width: 50,
        height: 4,
        borderRadius: 50,
        backgroundColor: TextColor,
        opacity: 0.7,
    },
})