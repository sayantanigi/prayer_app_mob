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
import ProgressBar from "../../../../Component/ProgressBar";
import { SnackBar } from "../../../../Component/CustomSnackbar";
import { routes } from "../../../../Constant/URL";
import { getUser, setUser } from "../../../../store/userAsync";
import { useUser } from "../../../../store/user";

export default function U_SignInScreen() {
  const navigation = useNavigation<any>();
  const [passwordShow, setPasswordshow] = useState(false);
  const [loading, setLoading] = useState(false);
  // Haptics
  async function handleRouting(route: string) {
    await Haptics.selectionAsync();
    navigation.navigate(route);
  }

  // Icon Show Hide
  const [iconIsClicked, setIconIsClicked] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  function handleValueChange(value: string, key: string) {
    setFormData({ ...formData, [key]: value });
  }

  async function goTologIn() {
    if (formData.email === "" || formData.email == null) {
      SnackBar.show({
        text: "Email is required",
        type: "LONG",
        backgroundColor: "#A52A2A",
      });
    } else if (formData.password === "" || formData.password == null) {
      SnackBar.show({
        text: "Password is required",
        type: "LONG",
        backgroundColor: "#A52A2A",
      });
    } else {
      setLoading(true);

      let response = await fetch(`${routes.getLogIn}`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      let json = await response.json();
      console.log(json);
      if (json.result[0].userType == "1") {
        SnackBar.show({
          text: json.status,
          type: "LONG",
          backgroundColor: "#009d4f",
        });

        await setUser({
          userType: json.result[0].userType,
          userId: json.result[0].userId,
          name: json.result[0].name,
          email: json.result[0].email,
        });

        navigation.navigate("U_HomeScreen");
      } else if (json.result[0].userType == "2") {
        SnackBar.show({
          text: json.status,
          type: "LONG",
          backgroundColor: "#009d4f",
        });
        await setUser({
          userType: json.result[0].userType,
          userId: json.result[0].userId,
          name: json.result[0].name,
          email: json.result[0].email,
        });
        navigation.navigate("O_HomeScreen");
      } else {
        SnackBar.show({
          text: "Wrong credentials",
          type: "LONG",
          backgroundColor: "#A52A2A",
        });
      }
    }
  }
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
              onChangeText={(text) => handleValueChange(text, "email")}
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
              onChangeText={(text) => handleValueChange(text, "password")}
              secureTextEntry={!passwordShow}
              style={styles.InputField}
              placeholder="Password"
            ></TextInput>
            <Image style={styles.InputImg} source={Back_2} />
            <Pressable
              onPress={function () {
                setPasswordshow(!passwordShow);
              }}
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
          <Pressable onPress={() => goTologIn()}>
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
            <Link style={styles.LinkStyle} to="U_ChooseProfileScreen">
              Sign Up
            </Link>
          </Text>
          <Link
            style={[styles.LinkStyle, styles.ForgotTextStyle]}
            to="U_ForgotPasswordScreen"
          >
            Forgot Password?
          </Link>
        </View>
      </KeyboardAvoidingView>
      <ProgressBar loading={loading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: BackgroundColor,
  },
  Body: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
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
