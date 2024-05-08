import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Pressable, Text, Image } from "react-native";
import { White } from "../Constant/Color";
import { Back_1 } from "../Constant/Images";

export default function ProductCheckout({
  onCheckOutButtonPress,
}: {
  onCheckOutButtonPress?: Function;
}) {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.Container}>
      <Pressable
        style={styles.CheckoutBtn}
        onPress={() => onCheckOutButtonPress?.()}
      >
        <Image style={styles.CheckoutImg} source={Back_1} />
        <Text style={styles.CheckoutText}>Place Order</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    height: 70,
    width: "100%",
    flexDirection: "column",
    backgroundColor: White,
    paddingHorizontal: 20,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  CheckoutBtn: {
    width: "100%",
    height: 50,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  CheckoutText: {
    position: "absolute",
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: White,
  },
  CheckoutImg: {
    width: "100%",
    borderRadius: 100,
    height: "100%",
  },
});
