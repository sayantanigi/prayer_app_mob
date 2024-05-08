import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { BackgroundColor } from "../../../../Constant/Color";

export default function O_SplashScreen() {
    const navigation = useNavigation<any>();
    setTimeout(() => {
        navigation.replace("O_SignInScreen");
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