import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Pressable, Text, Image } from "react-native";
import { Black, SuccessBack, SuccessText, White } from "../Constant/Color";
import { Back_1, FooterIcon_4A } from "../Constant/Images";
import { SnackBar } from "./SnackBar";

export default function ProductBuy({
  onCheckOutButtonPress,
  onAddToCartPress,
}: {
  onCheckOutButtonPress?: Function;
  onAddToCartPress?: Function;
}) {
  const navigation = useNavigation<any>();

  // SnackBar Alert
  const SuccessAlert = () => {
    SnackBar.show({
      text: "Item added to cart.",
      type: "LONG",
      actionText: "Ok",
      onActionPress: () => {
        SnackBar.hide();
      },
      backgroundColor: SuccessBack,
      color: SuccessText,
    });
  };

  return (
    <View style={styles.Container}>
      <Pressable style={styles.ACBtn} onPress={() => onAddToCartPress?.()}>
        <Image style={styles.ACImg} source={FooterIcon_4A} />
        <Text style={styles.ACText}>Add to Cart</Text>
      </Pressable>
      <Pressable
        style={styles.BuyBtn}
        onPress={() => onCheckOutButtonPress?.()}
      >
        <Image style={styles.BuyImg} source={Back_1} />
        <Text style={styles.BuyText}>Buy Now</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    height: 70,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: White,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  ACBtn: {
    width: "50%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  ACImg: {
    width: 20,
    height: 20,
  },
  ACText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: Black,
    paddingLeft: 10,
  },
  BuyBtn: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    position: "relative",
  },
  BuyText: {
    position: "absolute",
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: White,
  },
  BuyImg: {
    width: "100%",
    borderRadius: 100,
    height: "100%",
  },
});
