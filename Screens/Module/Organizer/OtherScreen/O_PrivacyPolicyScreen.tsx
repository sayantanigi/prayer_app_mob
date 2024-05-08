import { useNavigation } from "@react-navigation/native";
import O_ScreenLayout from "../O_ScreenLayout";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BlankImage } from "../../../../Constant/Images";
import { routes } from "../../../../Constant/URL";
import RenderHtml, { HTMLSource } from "react-native-render-html";

export interface Result {
  id: string;
  title: string;
  description: string;
  image: string;
}
export default function O_PrivacyPolicyScreen() {
  const navigation = useNavigation<any>();
  const [getPrivacyPolicy, setPrivacyPolicy] = useState<Result[]>([]);
  useEffect(() => {
    (async () => {
      let response = await fetch(`${routes.getPrivacyPolicy}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let json = await response.json();
      setPrivacyPolicy(json.result);
    })();
  }, []);

  return (
    <O_ScreenLayout
      HeaderHidden
      VideoHidden
      ProductBuyHidden
      ProductCartHidden
      ProductCheckoutHidden
      title="Privacy & Policy"
      BannerHeading="Privacy & Policy"
      BannerImage={BlankImage}
    >
      {getPrivacyPolicy?.map(function (item: Result, index: number) {
        return (
          <View style={styles.Container}>
            {/* <Text style={styles.Heading}>Last updated: September 24, 2023</Text> */}
            {/* <Text style={styles.SubHeading}>{item.description ?? ""}</Text> */}
            <RenderHtml
              source={{ html: getPrivacyPolicy[0].description ?? "" }}
            />
          </View>
        );
      })}
    </O_ScreenLayout>
  );
}

const styles = StyleSheet.create({
  Container: {
    padding: 20,
  },
  Heading: {
    fontFamily: "Inter-SemiBold",
    fontSize: 17,
    lineHeight: 17 * 1.5,
    paddingBottom: 10,
  },
  SubHeading: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    lineHeight: 15 * 1.5,
    paddingBottom: 10,
  },
});
