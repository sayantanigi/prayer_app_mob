import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import queryString from "query-string";
import React from "react";
import { PrimaryColor } from "../../../../Constant/Color";
import { useUser } from "../../../../store/user";
import { SnackBar } from "../../../../Component/CustomSnackbar";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  ScrollViewProps,
  Animated,
  BackHandler,
  Dimensions,
  Easing,
  Image,
  Pressable,
  Modal,
} from "react-native";
import { Back_1 } from "../../../../Constant/Images";
export default function PlayerUpgratepayment() {
  const [user] = useUser();
  const route = useRoute();
  const colorTheme = PrimaryColor;
  const navigation = useNavigation<any>();
  const data = route.params;
  const [getamount, setamount] = useState<any>();
  const [gettopupsId, settopupsId] = useState("");
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    (async () => {
      console.log(data);
      // Access the individual properties
      setamount(data);
    })();
  }, [user?.userId, route.params]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colorTheme,
          height: 60,
          width: "100%",
        }}
      >
        <Ionicons
          name="arrow-back-outline"
          onPress={() => navigation.goBack()}
          style={{
            fontSize: 30,
            color: "#ffffff",
            position: "absolute",
            top: 13,
            left: 10,
          }}
        />
        <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: "bold" }}>
          MAKE PAYMENT
        </Text>
      </View>

      <WebView
        source={{
          // uri: "https://digitalsportsresume.app/paymentPage?userId=194&amount=20.00&topupsId=2",
          uri: `https://120army.com/checkout/${user?.userId}/${getamount}`,
        }}
        javaScriptEnabled
        style={{
          flex: 1,
          margin: 10,
        }}
        onNavigationStateChange={(e) => {
          const parsedUrl = queryString.parseUrl(e.url);

          // Extract the value of the 'status' parameter
          const status = parsedUrl.query.status;

          if (status === "succeeded") {
            SnackBar.show({
              text: "Payment Success",
              type: "LONG",
              backgroundColor: "#009d4f",
            });
            navigation.navigate.goBack();
          }
        }}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonText: {
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 16,
  },
  header: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  title: {
    color: "#fff",
    fontSize: 20,
  },
  icon: {
    color: "#fff",
    fontFamily: "Fontawesome-solid",
    fontSize: 40,
    marginRight: 10,

    position: "absolute",
    left: 8,
    top: 10,
  },
  wrapper: {
    width: "100%",
    height: "100%",
    padding: 13,
  },
  content: {
    lineHeight: 26,
    fontSize: 17,
    textAlign: "justify",
  },
  heading: {
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 300,
  },
  selectBox: {
    padding: 10,
    width: "100%",
    height: 150,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },
  selectText: {
    height: 60,
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: PrimaryColor,
    padding: 10,
  },
  ApplyBtn: {
    height: 50,
    width: "100%",
    backgroundColor: PrimaryColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
