// Please Remove this Page while development is underway.

import { useNavigation } from "@react-navigation/native";
import {
    StyleSheet,
    SafeAreaView,
    Pressable,
    Text,
    ScrollView,
    View,
    Dimensions,
    Image,
} from "react-native";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { BackgroundColor } from "./Constant/Color";

export default function ModuleOptionScreen() {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Image
                    style={styles.Image}
                    source={require("./assets/Images/Images/ModuleOption.png")}
                    resizeMode="cover"
                ></Image>
                {/* Applicant Profile Module */}
                <View style={styles.Block_1}>
                    <Text style={styles.Heading1}>User</Text>
                    <Text style={styles.SubHeading1}>
                        For User profile workflow, click the down arrow.
                    </Text>
                    <Pressable
                        style={styles.ButtonContainer1}
                        onPress={() => navigation.navigate("U_SplashScreen")}
                    >
                        <AntDesign name="arrowright" size={30} color="#88D0B6" />
                    </Pressable>
                </View>

                {/* Facility Profile Module */}
                <View style={styles.Block_2}>
                    <Text style={styles.Heading2}>Organizer</Text>
                    <Text style={styles.SubHeading2}>
                        For Organizer profile workflow, click the down arrow.
                    </Text>
                    <Pressable
                        style={styles.ButtonContainer2}
                        onPress={() => navigation.navigate("O_SplashScreen")}
                    >
                        <AntDesign name="arrowright" size={30} color="#253461" />
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: BackgroundColor,
    },
    Image: {
        width: "100%",
        height: 550,
        position: "absolute",
        zIndex: 1,
    },
    Block_1: {
        backgroundColor: "#88D0B6",
        width: Dimensions.get("window").width,
        padding: 20,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    Block_2: {
        backgroundColor: "#253461",
        width: Dimensions.get("window").width,
        padding: 20,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    Heading1: {
        fontSize: 30,
        color: "#253461",
        textTransform: "uppercase",
        fontWeight: "600",
        letterSpacing: 1,
        marginBottom: 10,
    },
    Heading2: {
        fontSize: 30,
        color: "#88D0B6",
        textTransform: "uppercase",
        fontWeight: "600",
        letterSpacing: 1,
        marginBottom: 10,
    },
    SubHeading1: {
        fontSize: 20,
        color: "#253461",
        textAlign: "center",
        fontWeight: "500",
        textTransform: "uppercase",
        lineHeight: 20 * 1.5,
        marginBottom: 40,
    },
    SubHeading2: {
        fontSize: 20,
        color: "#88D0B6",
        textAlign: "center",
        fontWeight: "500",
        textTransform: "uppercase",
        lineHeight: 20 * 1.5,
        marginBottom: 40,
    },
    ButtonContainer1: {
        width: 55,
        height: 55,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#253461",
    },
    ButtonContainer2: {
        width: 55,
        height: 55,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#88D0B6",
    },
});