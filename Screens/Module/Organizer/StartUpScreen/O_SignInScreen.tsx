import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Image,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  StatusBar,
  Pressable,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import * as Haptics from "expo-haptics";
import {
  BackgroundColor,
  Black,
  HeadingColor,
  PrimaryColor,
  StatusBarBack,
  White,
} from "../../../../Constant/Color";
import Link from "../../../../Component/Link";
import {
  Back_2,
  Back_6,
  Icon_17,
  Icon_18,
  Logo,
} from "../../../../Constant/Images";

export default function O_SignInScreen() {
  const navigation = useNavigation<any>();

  // Haptics
  async function handleRouting(route: string) {
    await Haptics.selectionAsync();
    navigation.navigate(route);
  }
  // Icon Show Hide
  const [iconIsClicked, setIconIsClicked] = useState(false);

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar backgroundColor={StatusBarBack}></StatusBar>
      <KeyboardAvoidingView>
        {/* Logo */}
        <View style={styles.LogoContainer}>
          <Image style={styles.Logo} source={Logo} resizeMode="contain" />
        </View>

        <Text style={styles.Heading}>Welcome Back</Text>

        {/* Input Field */}
        <View style={styles.InputContainer}>
          {/* email input field */}
          <View style={styles.Input}>
            <TextInput
              style={styles.InputField}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Email address"
            ></TextInput>
            <Image style={styles.InputImg} source={Back_2} />
          </View>

          {/* password input field */}
          <View style={[styles.Input, styles.Gap]}>
            <TextInput
              style={styles.InputField}
              secureTextEntry={true}
              placeholder="Password"
            ></TextInput>
            <Image style={styles.InputImg} source={Back_2} />
            <Pressable
              onPress={() => setIconIsClicked(!iconIsClicked)}
              style={styles.ShowHide}
            >
              {iconIsClicked ? (
                <Image source={Icon_17} style={styles.ShowHideImage}></Image>
              ) : (
                <Image source={Icon_18} style={styles.ShowHideImage}></Image>
              )}
            </Pressable>
          </View>

          {/* Button */}
          <Pressable onPress={() => handleRouting("O_HomeScreen")}>
            <View style={styles.Button}>
              <Text style={styles.ButtonText}>Sign in</Text>
              <Image style={styles.ButtonImg} source={Back_6} />
            </View>
          </Pressable>

          <Text style={styles.ORText}>OR</Text>

          <Pressable onPress={() => navigation.navigate("O_HomeScreen")}>
            <View style={styles.GuestButton}>
              <Text style={styles.ButtonText}>Sign in as a Guest</Text>
              <Image style={styles.ButtonImg} source={Back_6} />
            </View>
          </Pressable>

          <View style={styles.Hr}></View>
          <Text style={styles.TextStyle}>
            Don't have an account?{" "}
            <Link style={styles.LinkStyle} to="O_ChooseProfileScreen">
              Sign Up
            </Link>
          </Text>
          <Link
            style={[styles.LinkStyle, styles.ForgotTextStyle]}
            to="O_ForgotPasswordScreen"
          >
            Forgot Password?
          </Link>
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
  InputContainer: {},
  Input: {
    width: 280,
    height: 50,
    alignSelf: "center",
    position: "relative",
  },
  Gap: {
    marginTop: 20,
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
  ShowHide: {
    position: "absolute",
    right: -5,
    top: -5,
    zIndex: 2,
  },
  ShowHideImage: {
    width: 60,
    height: 60,
  },
  Button: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 280,
    marginTop: 50,
    marginBottom: 10,
    position: "relative",
  },
  GuestButton: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 280,
    marginTop: 10,
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
    backgroundColor: StatusBarBack,
  },
  TextStyle: {
    marginTop: 30,
    alignSelf: "center",
    fontFamily: "Inter-Regular",
    fontSize: 13,
    letterSpacing: 1.8,
    color: Black,
  },
  LinkStyle: {
    alignSelf: "center",
    fontFamily: "Inter-Regular",
    fontSize: 13,
    letterSpacing: 1.8,
    color: PrimaryColor,
  },
  ForgotTextStyle: {
    marginTop: 10,
  },
  ORText: {
    width: Dimensions.get("window").width,
    textAlign: "center",
    fontFamily: "Inter-Regular",
    fontSize: 13,
    letterSpacing: 1.8,
    color: Black,
  },
});
