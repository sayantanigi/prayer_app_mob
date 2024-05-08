import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { BackgroundColor } from "../../../../Constant/Color";

export default function U_SplashScreen() {
    const navigation = useNavigation<any>();
    setTimeout(() => {
        navigation.replace("U_SignInScreen");
    }, 1000);

    return (
        <View style={styles.Container}>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: BackgroundColor,
    }
});