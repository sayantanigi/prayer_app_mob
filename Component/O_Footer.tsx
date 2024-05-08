import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { White } from "../Constant/Color";
import * as Haptics from "expo-haptics";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  FooterIcon_1A,
  FooterIcon_1B,
  FooterIcon_2A,
  FooterIcon_2B,
  FooterIcon_3A,
  FooterIcon_3B,
  FooterIcon_4A,
  FooterIcon_4B,
  FooterIcon_5,
  ProfileActive,
  ProfileInActive,
  Sidemenu_1,
} from "../Constant/Images";
import { useUser } from "../store/user";
import { getUser } from "../store/userAsync";

export default function O_Footer() {
  const navigation = useNavigation<any>();
  const router = useRoute();
  const [user, setUser] = useUser();
  // Haptics

  useEffect(() => {
    (async () => {
      setUser(await getUser());
    })();
  }, []);
  async function handleRouting(route: string) {
    await Haptics.selectionAsync();
    navigation.navigate(route);
  }
  return (
    <View style={styles.FooterContainer}>
      {/* Home Tab */}
      {router.name == "O_HomeScreen" ? (
        <>
          <View style={styles.Tab}>
            <TouchableOpacity
              style={styles.TabBlock}
              onPress={() => handleRouting("O_HomeScreen")}
            >
              <Image
                source={FooterIcon_1A}
                resizeMode="contain"
                style={styles.Icon}
              ></Image>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.Tab}>
          <TouchableOpacity
            style={styles.TabBlock}
            onPress={() => handleRouting("O_HomeScreen")}
          >
            <Image
              source={FooterIcon_1B}
              resizeMode="contain"
              style={styles.Icon}
            ></Image>
          </TouchableOpacity>
        </View>
      )}

      {/* Prayer Wall Tab */}
      {router.name == "O_PrayerBoardScreen" ? (
        <>
          <View style={styles.Tab}>
            <TouchableOpacity
              style={styles.TabBlock}
              onPress={() => handleRouting("O_PrayerBoardScreen")}
            >
              <Image
                source={FooterIcon_2A}
                resizeMode="contain"
                style={styles.Icon}
              ></Image>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.Tab}>
          <TouchableOpacity
            style={styles.TabBlock}
            onPress={() => handleRouting("O_PrayerBoardScreen")}
          >
            <Image
              source={FooterIcon_2B}
              resizeMode="contain"
              style={styles.Icon}
            ></Image>
          </TouchableOpacity>
        </View>
      )}

      {/* Timer Tab */}
      <View style={styles.Tab}>
        <TouchableOpacity
          style={styles.TabBlock}
          onPress={() => handleRouting("O_AlarmScreen")}
        >
          <Image
            source={FooterIcon_5}
            resizeMode="contain"
            style={styles.MainIcon}
          ></Image>
        </TouchableOpacity>
      </View>

      {/* Upcoming Events Tab */}
      {router.name == "O_EventScreen" ? (
        <>
          <View style={styles.Tab}>
            <TouchableOpacity
              style={styles.TabBlock}
              onPress={() => handleRouting("O_EventScreen")}
            >
              <Image
                source={FooterIcon_3A}
                resizeMode="contain"
                style={styles.Icon}
              ></Image>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.Tab}>
          <TouchableOpacity
            style={styles.TabBlock}
            onPress={() => handleRouting("O_EventScreen")}
          >
            <Image
              source={FooterIcon_3B}
              resizeMode="contain"
              style={styles.Icon}
            ></Image>
          </TouchableOpacity>
        </View>
      )}

      {/* Store Tab */}
      {router.name == "O_StoreScreen" ? (
        <>
          <View style={styles.Tab}>
            <Pressable
              style={styles.TabBlock}
              onPress={() =>
                navigation.navigate(
                  !user || user.userId == null || user.userId === "null"
                    ? "O_SignUpScreen"
                    : "O_StoreScreen"
                )
              }
            >
              <Image
                source={FooterIcon_4A}
                resizeMode="contain"
                style={styles.Icon}
              ></Image>
            </Pressable>
          </View>
        </>
      ) : (
        <View style={styles.Tab}>
          <Pressable
            style={styles.TabBlock}
            onPress={() =>
              navigation.navigate(
                !user || user.userId == null || user.userId === "null"
                  ? "O_SignUpScreen"
                  : "O_StoreScreen"
              )
            }
          >
            <Image
              source={FooterIcon_4B}
              resizeMode="contain"
              style={styles.Icon}
            ></Image>
          </Pressable>
        </View>
      )}

      {/* {router.name == "O_StoreScreen" ? (
        <>
          <View style={styles.Tab}>
            <TouchableOpacity
              style={styles.TabBlock}
              onPress={() => handleRouting("U_MyProfileScreen")}
            >
              <Image
                source={ProfileActive}
                resizeMode="contain"
                style={styles.Icon}
              ></Image>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.Tab}>
          <TouchableOpacity
            style={styles.TabBlock}
            onPress={() => handleRouting("U_MyProfileScreen")}
          >
            <Image
              source={ProfileInActive}
              resizeMode="contain"
              style={styles.Icon}
            ></Image>
          </TouchableOpacity>
        </View>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  FooterContainer: {
    height: 80,
    backgroundColor: White,
    elevation: 15,
    flexDirection: "row",
    alignItems: "center",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  Tab: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  TabBlock: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  Icon: {
    height: 30,
    width: 30,
  },
  MainIcon: {
    height: 65,
    width: 65,
  },
});
