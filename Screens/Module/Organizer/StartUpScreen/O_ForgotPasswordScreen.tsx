import { useNavigation } from "@react-navigation/native";
import React from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, View, Image, Text, TextInput, Pressable } from "react-native";
import * as Haptics from "expo-haptics";
import { BackgroundColor, Black, HeadingColor, PrimaryColor, StatusBarBack, White } from "../../../../Constant/Color";
import Link from "../../../../Component/Link";
import { Back_2, Back_6, Icon_23, Logo } from "../../../../Constant/Images";

export default function O_ForgotPasswordScreen() {
    const navigation = useNavigation<any>();

    // Haptics
    async function handleRouting(route: string) {
        await Haptics.selectionAsync();
        navigation.navigate(route);
    }

    return (
        <SafeAreaView style={styles.Container}>
            <KeyboardAvoidingView>
                {/* Logo */}
                <View style={styles.LogoContainer}>
                    <Image
                        style={styles.Logo}
                        source={Logo} resizeMode="contain" />
                </View>

                <Text style={styles.Heading}>Forgot Password</Text>
                <Text style={styles.SubText}>Please, enter your email address. You will receive a link to create a new password via email.</Text>

                {/* Input Field */}
                <View style={styles.InputContainer}>
                    {/* email input field */}
                    <View style={styles.Input}>
                        <TextInput style={styles.InputField} keyboardType="email-address" placeholder="Registered Email address">
                        </TextInput>
                        <Image style={styles.InputImg} source={Back_2} />
                    </View>

                    {/* Button */}
                    <Pressable>
                        <View style={styles.Button}>
                            <Text style={styles.ButtonText}>Send</Text>
                            <Image style={styles.ButtonImg} source={Back_6} />
                        </View>
                    </Pressable>

                    <View style={styles.Hr}></View>
                    <Text style={styles.TextStyle}>Don't have an account?{" "}
                        <Link style={styles.LinkStyle} to="O_ChooseProfileScreen">Sign Up</Link>
                    </Text>

                    {/* Button */}
                    <Pressable onPress={() => handleRouting("O_SignInScreen")}>
                        <View style={styles.BackButton}>
                            <Image style={styles.ButtonBackImg} source={Icon_23} />
                        </View>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: BackgroundColor,
    },
    LogoContainer: {
        marginTop: 50,
    },
    Logo: {
        width: 100,
        height: 80,
        alignSelf: "center",
    },
    Heading: {
        fontFamily: "Inter-Bold",
        fontSize: 24,
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 50,
        color: HeadingColor,
    },
    SubText: {
        fontSize: 13,
        fontFamily: "Inter-Regular",
        alignSelf: "center",
        width: 280,
        textAlign: "center",
    },
    InputContainer: {
        marginTop: 25,
    },
    Input: {
        width: 280,
        height: 50,
        alignSelf: "center",
        position: "relative",
    },
    InputField: {
        zIndex: 1,
        width: 280,
        height: 50,
        paddingLeft: 25,
        paddingRight: 25,
    },
    InputImg: {
        width: 280,
        height: 50,
        position: "absolute",
        zIndex: 0,
    },
    Button: {
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 280,
        marginTop: 50,
        marginBottom: 30,
        position: "relative",
    },
    ButtonText: {
        color: White,
        fontSize: 20,
        fontWeight: "500",
        fontFamily: "Inter-SemiBold",
        zIndex: 1,
    },
    ButtonImg: {
        height: 50,
        width: 280,
        position: "absolute",
        zIndex: 0,
    },
    Hr: {
        alignSelf: "center",
        width: 280,
        height: 1.5,
        backgroundColor: StatusBarBack
    },
    TextStyle: {
        marginTop: 30,
        alignSelf: "center",
        fontFamily: "Inter-Regular",
        fontSize: 13,
        letterSpacing: 1.8,
        color: Black
    },
    LinkStyle: {
        alignSelf: "center",
        fontFamily: "Inter-Regular",
        fontSize: 13,
        letterSpacing: 1.8,
        color: PrimaryColor
    },
    BackButton: {
        alignSelf: "center",
        height: 100,
        width: 100,
        marginTop: 10,
    },
    ButtonBackImg: {
        height: 100,
        width: 100,
    },
});