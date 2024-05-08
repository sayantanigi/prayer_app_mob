import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Image, Text } from "react-native";
import { Black, White } from "../Constant/Color";

interface PageBanner {
  BannerImage?: any;
  BannerHeading?: string;
  BannerSubHeading?: string;
}

export default function PageBanner(props: PageBanner) {
  const navigation = useNavigation<any>();
  const [status, setStatus] = React.useState({});

  return (
    <View style={styles.BannerBack}>
      <View style={styles.BannerText}>
        <Text style={styles.BannerHeading}>{props.BannerHeading}</Text>
        <Text style={styles.BannerSubHeading}>{props.BannerSubHeading}</Text>
      </View>
      <View style={styles.BannerCover}></View>
      <Image
        style={styles.BannerImage}
        source={props.BannerImage}
        resizeMode="cover"
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  BannerBack: {
    width: "100%",
    height: 230,
    position: "relative",
  },
  BannerImage: {
    height: 230,
    width: "100%",
  },
  BannerCover: {
    height: 230,
    width: "100%",
    position: "absolute",
    backgroundColor: Black,
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    opacity: 0.5,
  },
  BannerText: {
    height: 230,
    width: "100%",
    position: "absolute",
    zIndex: 2,
    top: 0,
    left: 0,
    right: 0,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  BannerHeading: {
    color: White,
    fontSize: 22,
    fontFamily: "Inter-SemiBold",
    alignSelf: "center",
  },
  BannerSubHeading: {
    color: White,
    fontSize: 16,
    marginTop: 2,
    fontFamily: "Inter-Regular",
    alignSelf: "center",
  },
});
