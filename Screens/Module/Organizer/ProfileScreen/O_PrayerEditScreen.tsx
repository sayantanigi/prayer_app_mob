import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import O_ScreenLayout from "../O_ScreenLayout";
import { Black, PrimaryColor, TextColor, White } from "../../../../Constant/Color";
import { BlankImage, HomeIcon_4, Icon_10, Icon_11, Icon_13, Icon_14, Icon_15, Icon_16, Icon_9 } from "../../../../Constant/Images";

export default function O_PrayerEditScreen() {
    const navigation = useNavigation<any>();
    const [shouldShow, setShouldShow] = useState(true);
    const [countup, setCountup] = useState(1);
    const [countdown, setCountdown] = useState(0);

    const incrementCount = () => {
        setCountup(countup + 1);
    };

    const decrementCount = () => {
        setCountdown(countdown - 1);
    };

    return (
        <O_ScreenLayout
            HeaderHidden
            VideoHidden
            ProductBuyHidden
            ProductCartHidden
            ProductCheckoutHidden
            title="Prayer Edit"
            BannerHeading="Prayer Name"
            BannerSubHeading="Where the prayer event is taking place"
            BannerImage={BlankImage}
        >
            <View style={styles.PrayerDetails}>
                {/* Share Btn */}
                <Pressable style={styles.ShareBtn}>
                    <Image style={styles.ShareBtnIcon}
                        source={Icon_13} resizeMode="contain" />
                </Pressable>

                {/* Join The Prayer */}
                <View style={styles.PrayerBlock}>
                    <View style={styles.PrayerIcon}>
                        <Image style={styles.PrayerIconImg} source={Icon_9}
                            resizeMode="contain"
                        />
                        <View style={styles.TimeBar}></View>
                    </View>
                    <View style={styles.PrayerData}>
                        <View style={styles.PrayerText}>
                            <Text style={styles.PrayerHeading}>Join The Prayer</Text>
                            <Text style={styles.PrayerSubHeading}>90 Join 240 Interest</Text>
                        </View>
                        <Pressable style={styles.PrayerBtn}>
                            <Text style={styles.JoinPrayerBtnText}>Edit</Text>
                            <Image style={styles.JoinPrayerBtnBack} source={HomeIcon_4} />
                        </Pressable>
                    </View>
                </View>

                {/* Date & Time */}
                <View style={styles.PrayerBlock}>
                    <View style={styles.PrayerIcon}>
                        <Image style={styles.PrayerIconImg} source={Icon_10}
                            resizeMode="contain"
                        />
                        <View style={styles.TimeBar}></View>
                    </View>
                    <View style={styles.PrayerData}>
                        <View style={styles.PrayerText}>
                            <Text style={styles.PrayerHeading}>Date & Time</Text>
                            <Text style={[styles.PrayerSubHeading, styles.PrayerTextData]}>
                                Friday 17 August 2023, 08:30 PM
                            </Text>
                        </View>
                    </View>
                </View>

                {/* About */}
                <View style={styles.PrayerBlock}>
                    <View style={styles.PrayerIcon}>
                        <Image style={styles.PrayerIconImg} source={Icon_11}
                            resizeMode="contain"
                        />
                        <View style={[styles.TimeBar, styles.LongTimeBar]}></View>
                    </View>
                    <View style={styles.PrayerData}>
                        <View style={styles.PrayerText}>
                            <Text style={styles.PrayerHeading}>About</Text>
                            <Text numberOfLines={7} style={[styles.PrayerSubHeading, styles.PrayerTextData]}>
                                Cras ac velit ut risus accumsan mollis. Duis
                                pellentesque lacus efficitur ornare tincidunt.
                                Donec varius dapibus malesuada. Suspendisse
                                faucibus mi ac blandit efficitur. Ut maximus
                                bibendum leo, eu sodales sapien sollicitudin
                                sed. Vestibulum sollicitudin iaculis dolor, ac
                                feugiat sapien rutrum vel.</Text>
                        </View>
                    </View>
                </View>

                {/* Joined */}
                <View style={styles.PrayerBlock}>
                    <View style={styles.PrayerIcon}>
                        <Image style={styles.PrayerIconImg} source={Icon_14}
                            resizeMode="contain"
                        />
                        <View style={styles.TimeBar}></View>
                    </View>
                    <View style={styles.PrayerData}>
                        <View style={styles.PrayerText}>
                            <Text style={styles.PrayerHeading}>Joined</Text>
                            <Text style={[styles.PrayerSubHeading, styles.PrayerTextData]}>
                                250 Have Joined Already
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Joined */}
                <View style={styles.PrayerBlock}>
                    <View style={styles.PrayerIcon}>
                        <Image style={styles.PrayerIconImg} source={Icon_15}
                            resizeMode="contain"
                        />
                        <View style={styles.TimeBar}></View>
                    </View>
                    <View style={styles.PrayerData}>
                        <View style={styles.PrayerText}>
                            <Text style={styles.PrayerHeading}>Thank you for your contribution</Text>
                            <View style={styles.PrayerBtnContainer}>
                                <Pressable style={[styles.PrayerBtn, styles.DonationBtn]} onPress={() => navigation.navigate("O_DonationScreen")}>
                                    <Text style={styles.JoinPrayerBtnText}>Donate</Text>
                                    <Image style={[styles.JoinPrayerBtnBack, styles.DonationBtn]} source={HomeIcon_4} />
                                </Pressable>
                                {shouldShow ? (
                                    <>
                                        <Pressable style={[styles.PrayerBtn, styles.LikeBtn]} onPress={() => setShouldShow(!shouldShow)} {...incrementCount}>
                                            <Text style={styles.ViewPrayerBtnText}>
                                                <Image style={styles.PrayerIconImg} source={Icon_16}
                                                    resizeMode="contain"
                                                />
                                                <Text>{" "}{countdown}</Text>
                                            </Text>
                                        </Pressable>
                                    </>) : (
                                    <Pressable style={[styles.PrayerBtn, styles.LikeBtn]} onPress={() => setShouldShow(!shouldShow)} {...decrementCount}>
                                        <Text style={styles.ViewPrayerBtnText}>
                                            <Image style={styles.PrayerIconImg} source={Icon_15}
                                                resizeMode="contain"
                                            />
                                            <Text>{" "}{countup}</Text>
                                        </Text>
                                    </Pressable>
                                )}

                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </O_ScreenLayout>
    );
}

const styles = StyleSheet.create({
    // Prayer Details
    PrayerDetails: {
        width: "100%",
        flex: 1,
        padding: 20,
        paddingTop: 40,
    },
    PrayerBlock: {
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingTop: 5,
        paddingBottom: 5,
    },
    PrayerIcon: {
        width: "10%",
        alignItems: "center",
    },
    PrayerIconImg: {
        width: 15,
        height: 15,
        marginBottom: 5,
    },
    TimeBar: {
        height: 36,
        alignSelf: "center",
        borderLeftColor: TextColor,
        borderLeftWidth: 1.5,
        borderStyle: "dashed",
    },
    LongTimeBar: {
        height: 155,
    },
    PrayerData: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    PrayerText: {},
    PrayerHeading: {
        fontFamily: "Inter-SemiBold",
        fontSize: 16,
        lineHeight: 16 * 1,
    },
    PrayerSubHeading: {
        fontFamily: "Inter-Regular",
        fontSize: 13,
        lineHeight: 13 * 1.5,
        color: TextColor,
        paddingTop: 4,
    },
    PrayerTextData: {
        color: Black,
    },
    PrayerBtn: {
        elevation: 10,
        backgroundColor: White,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        width: 80,
        height: 40,
        position: "relative",
    },
    ViewPrayerBtnText: {
        color: PrimaryColor,
        fontFamily: "Inter-SemiBold",
        fontSize: 14,
    },
    JoinPrayerBtnText: {
        color: White,
        fontFamily: "Inter-SemiBold",
        fontSize: 14,
        zIndex: 1,
    },
    JoinPrayerBtnBack: {
        borderRadius: 50,
        width: 80,
        height: 40,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    PrayerBtnContainer: {
        flexDirection: "row",
        marginTop: 15,
        gap: 20,
    },
    DonationBtn: {
        width: 120,
    },
    LikeBtn: {
        width: 120,
    },
    ShareBtn: {
        elevation: 10,
        backgroundColor: White,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        width: 50,
        height: 50,
        position: "absolute",
        top: -25,
        right: 20,
        zIndex: 1,
    },
    ShareBtnIcon: {
        width: 50,
        height: 50,
        marginBottom: 5
    }
})