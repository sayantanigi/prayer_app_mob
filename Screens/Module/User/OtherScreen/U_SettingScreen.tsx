import { useNavigation } from "@react-navigation/native";
import U_ScreenLayout from "../U_ScreenLayout";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { Black, PrimaryColor, StatusBarBack, SuccessText, TextColor, White } from "../../../../Constant/Color";
import { Switch } from "../../../../Component/Switch";
import * as LocalAuthentication from 'expo-local-authentication'
import { Icon_1, Icon_3, Icon_4, Icon_5, Icon_6, Icon_7 } from "../../../../Constant/Images";

// Touch ID
export function TouchID() {
    const [grantAccess, setGrantAccess] = useState(false);
    useEffect(() => {
        (async () => {
            const auth = await LocalAuthentication.authenticateAsync();
            if (auth.success) setGrantAccess(true);
            else setGrantAccess(false);
        })();
    }, []);
    return (
        <View>
            {grantAccess && (
                <Pressable style={styles.TouchIDBlock}>
                    <View style={[styles.TouchID, styles.TouchIDActive]}>
                        <View style={[styles.TouchCircle, styles.TouchCircleActive]}></View>
                    </View>
                    {/* <Switch /> */}
                </Pressable>
            )}
        </View>
    );
}

export default function U_SettingScreen() {
    const navigation = useNavigation<any>();
    const [biometrics, setBiometrics] = useState(false);
    const [renderContent, setRenderContent] = useState();

    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setBiometrics(compatible);
        })();
    }, []);

    const renderSecureContent = () => setRenderContent(true);

    return (
        <U_ScreenLayout
            HeaderHidden
            BannerHidden
            VideoHidden
            ProductBuyHidden
            ProductCartHidden
            ProductCheckoutHidden
            title="Settings"
        >
            <View style={styles.Container}>
                <Text style={styles.Heading}>Notifications</Text>
                <View style={styles.Block}>
                    <View style={styles.BlockImageContainer}>
                        <Image
                            style={styles.BlockImage}
                            source={Icon_3}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.BlockText}>
                        <Text style={styles.BlockHeading}>Email Notifications</Text>
                        <Text style={styles.BlockSubHeading}>Prayers, Social events & other Activates</Text>
                    </View>
                    <View style={styles.BlockSwitch}>
                        <Switch />
                    </View>
                </View>
                <View style={styles.Block}>
                    <View style={styles.BlockImageContainer}>
                        <Image
                            style={styles.BlockImage}
                            source={Icon_4}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.BlockText}>
                        <Text style={styles.BlockHeading}>Push Notifications</Text>
                        <Text style={styles.BlockSubHeading}>Prayers, Social events & other Activates</Text>
                    </View>
                    <View style={styles.BlockSwitch}>
                        <Switch />
                    </View>
                </View>

                <Text style={styles.Heading}>Security</Text>
                <View style={styles.Block}>
                    <View style={styles.BlockImageContainer}>
                        <Image
                            style={styles.BlockImage}
                            source={Icon_5}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.BlockText}>
                        <Text style={styles.BlockHeading}>Sign in with touch ID</Text>
                        <Text style={styles.BlockSubHeading}>Use touch ID to protect your login</Text>
                    </View>
                    <Pressable style={styles.BlockSwitch} onPress={renderSecureContent}>
                        <View style={styles.TouchID}>
                            <View style={styles.TouchCircle}></View>
                        </View>
                    </Pressable>
                    {renderContent && <TouchID />}
                </View>
                <View style={styles.Block}>
                    <View style={styles.BlockImageContainer}>
                        <Image
                            style={styles.BlockImage}
                            source={Icon_6}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.BlockText}>
                        <Text style={styles.BlockHeading}>Change Password</Text>
                        <Text style={styles.BlockSubHeading}>Change your password</Text>
                    </View>
                    <Pressable style={styles.BlockSwitch} onPress={() => navigation.navigate("U_ChangePasswordScreen")}>
                        <Image
                            style={styles.BlockImg}
                            source={Icon_7}
                            resizeMode="contain"
                        />
                    </Pressable>
                </View>
                <View style={styles.Block}>
                    <View style={styles.BlockImageContainer}>
                        <Image
                            style={styles.BlockImage}
                            source={Icon_1}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.BlockText}>
                        <Text style={styles.BlockHeading}>Turn your Location</Text>
                        <Text style={styles.BlockSubHeading}>Alert for Nearby Events</Text>
                    </View>
                    <View style={styles.BlockSwitch}>
                        <Switch />
                    </View>
                </View>
            </View>
        </U_ScreenLayout>
    );
}

const styles = StyleSheet.create({
    Container: {
        padding: 20,
    },
    Heading: {
        fontFamily: "Inter-SemiBold",
        fontSize: 17,
        lineHeight: 17 * 1.5,
        paddingBottom: 10,
        color: PrimaryColor,
        marginBottom: 15,
    },
    // Block
    Block: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        paddingBottom: 15,
        borderBottomColor: StatusBarBack,
        borderBottomWidth: 1,
        marginBottom: 15,
        position: "relative",
    },
    BlockImageContainer: {
        width: "15%",
        height: 50,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: White,
        alignItems: "center",
        justifyContent: "center",
    },
    BlockImage: {
        height: 25,
        width: 25,
    },
    BlockText: {
        width: "65%",
        paddingLeft: 10,
        paddingRight: 10,
    },
    BlockHeading: {
        fontFamily: "Inter-Regular",
        fontSize: 15,
        color: Black,
    },
    BlockSubHeading: {
        fontSize: 14,
        fontFamily: "Inter-Regular",
        color: TextColor,
    },
    BlockSwitch: {
        width: "20%",
        alignItems: "center",
        justifyContent: "center",
    },
    TouchID: {
        width: 55,
        height: 24,
        backgroundColor: "rgba(0,0,0,0.3)",
        borderRadius: 15,
        position: "relative",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: 4,
    },
    TouchCircle: {
        width: 18,
        height: 18,
        borderRadius: 100,
        backgroundColor: White,
    },
    TouchIDBlock: {
        width: "20%",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: -12,
        left: -35,
    },
    TouchIDActive: {
        backgroundColor: SuccessText,
        alignItems: "flex-end",
        paddingRight: 4,
    },
    TouchCircleActive: {},
    BlockImg: {
        width: 20,
        height: 20,
    },
})