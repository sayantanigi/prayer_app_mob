import { useNavigation } from "@react-navigation/native";
import U_ScreenLayout from "../U_ScreenLayout";
import React from "react";
import { View, StyleSheet, Text, Image, TextInput, Pressable } from "react-native";
import { SuccessBack, SuccessText, White } from "../../../../Constant/Color";
import { SnackBar } from "../../../../Component/SnackBar";
import { Back_2, BlankImage, HomeIcon_4 } from "../../../../Constant/Images";

export default function U_ChangePasswordScreen() {
    const navigation = useNavigation<any>();

    // SnackBar Alert
    const SuccessAlert = () => {
        SnackBar.show({
            text: "You successfully changed your password.",
            type: "LONG",
            actionText: "Ok",
            onActionPress: () => {
                SnackBar.hide();
            },
            backgroundColor: SuccessBack,
            color: SuccessText,
        });
    };

    return (
        <U_ScreenLayout
            HeaderHidden
            VideoHidden
            ProductBuyHidden
            ProductCartHidden
            ProductCheckoutHidden
            title="Change Password"
            BannerHeading="Change Password"
            BannerImage={BlankImage}
        >
            <View style={styles.Container}>
                <View style={styles.InputBlock}>
                    <Text style={styles.Heading}>Current Password</Text>
                    <View style={styles.Input}>
                        <TextInput style={styles.InputField} placeholder="Enter Your Current Password">
                        </TextInput>
                        <Image
                            style={styles.InputImg}
                            source={Back_2}
                            resizeMode="contain"
                        />
                    </View>
                </View>
                <View style={styles.InputBlock}>
                    <Text style={styles.Heading}>New Password</Text>
                    <View style={styles.Input}>
                        <TextInput style={styles.InputField} placeholder="Type Your New Password">
                        </TextInput>
                        <Image
                            style={styles.InputImg}
                            source={Back_2}
                            resizeMode="contain"
                        />
                    </View>
                </View>
                <View style={styles.InputBlock}>
                    <Text style={styles.Heading}>Repeat Password</Text>
                    <View style={styles.Input}>
                        <TextInput style={styles.InputField} placeholder="Type Your Repeat Password">
                        </TextInput>
                        <Image
                            style={styles.InputImg}
                            source={Back_2}
                            resizeMode="contain"
                        />
                    </View>
                </View>
                <Pressable style={styles.SubmitBtn} onPress={SuccessAlert}>
                    <Text style={styles.SubmitBtnText}>Submit</Text>
                    <Image style={styles.SubmitBtnBack} source={HomeIcon_4} />
                </Pressable>
            </View>
        </U_ScreenLayout>
    );
}

const styles = StyleSheet.create({
    Container: {
        padding: 20,
    },

    // Input Block
    InputBlock: {
        marginBottom: 10,
    },
    Heading: {
        fontFamily: "Inter-SemiBold",
        fontSize: 14.5,
        paddingBottom: 10,
        paddingLeft: 25,
    },
    Input: {
        width: 300,
        height: 60,
        alignSelf: "center",
        position: "relative",
    },
    InputField: {
        zIndex: 1,
        width: 300,
        height: 60,
        paddingLeft: 25,
        paddingRight: 25,
    },
    InputImg: {
        width: 300,
        height: 60,
        position: "absolute",
        zIndex: 0,
    },

    // Button
    SubmitBtn: {
        elevation: 10,
        backgroundColor: White,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        width: 120,
        height: 50,
        position: "relative",
        alignSelf: "center",
        marginTop: 10,
    },
    SubmitBtnText: {
        color: White,
        fontFamily: "Inter-SemiBold",
        fontSize: 14,
        zIndex: 1,
    },
    SubmitBtnBack: {
        borderRadius: 50,
        width: 120,
        height: 50,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
})