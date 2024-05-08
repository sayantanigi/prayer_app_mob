import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Image,
  Text,
  View,
  KeyboardAvoidingView,
  StatusBar,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import * as Haptics from "expo-haptics";
import {
  BackgroundColor,
  HeadingColor,
  PrimaryColor,
  StatusBarBack,
  White,
} from "../../../../Constant/Color";
import Link from "../../../../Component/Link";
import { Back_6, Logo } from "../../../../Constant/Images";

export default function O_ChooseProfileScreen() {
  const navigation = useNavigation<any>();

  // Haptics
  async function handleRouting(route: string) {
    await Haptics.selectionAsync();
    navigation.navigate(route);
  }

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar backgroundColor={StatusBarBack}></StatusBar>
      <KeyboardAvoidingView>
        {/* Logo */}
        <View style={styles.LogoContainer}>
          <Image style={styles.Logo} source={Logo} resizeMode="contain" />
        </View>

        <Text style={styles.Heading}>Choose Profile</Text>

        {/* Input Field */}
        <View style={styles.InputContainer}>
          {/* <Pressable onPress={() => handleRouting("")}>
                        <View style={styles.Button}>
                            <Text style={styles.ButtonText}>User</Text>
                            <Image style={styles.ButtonImg} source={Back_6} />
                        </View>
                    </Pressable> */}

          <Pressable
            style={styles.Gap}
            onPress={() => handleRouting("O_SignUpScreen")}
          >
            <View style={styles.Button}>
              <Text style={styles.ButtonText}>Organizer</Text>
              <Image style={styles.ButtonImg} source={Back_6} />
            </View>
          </Pressable>

          <View
            style={{
              flexGrow: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              marginTop: 25,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                letterSpacing: 1,
                fontFamily: "Inter-Regular",
              }}
            >
              Already have an account?{" "}
              <Link
                style={{ color: PrimaryColor, fontFamily: "Inter-Regular" }}
                to="O_SignInScreen"
              >
                Sign in
              </Link>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: BackgroundColor,
    height: "100%",
    justifyContent: "center",
  },
  LogoContainer: {},
  Logo: {
    width: 100,
    height: 80,
    alignSelf: "center",
  },
  Heading: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
    alignSelf: "center",
    marginTop: 30,
    color: HeadingColor,
  },
  InputContainer: {
    marginTop: 30,
  },
  Gap: {
    marginTop: 20,
  },
  Button: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 280,
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
});
