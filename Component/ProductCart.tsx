import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Pressable, Text, Image } from "react-native";
import { TextColor, White } from "../Constant/Color";
import { Back_1 } from "../Constant/Images";

export default function ProductCart({
  onCheckOutButtonPress,
}: {
  onCheckOutButtonPress?: Function;
}) {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.Container}>
      <View style={styles.CheckoutData}>
        <View style={styles.CheckoutText1}>
          <Text style={styles.CheckoutHeading1}>Total:</Text>
          <Text style={styles.CheckoutHeading2}>$385.50 USD</Text>
        </View>
        <View style={styles.CheckoutText2}>
          <Text style={styles.CheckoutSubHeading}>
            You save a total of $128.00 USD
          </Text>
          <Text style={styles.CheckoutSubHeading}>VAT included</Text>
        </View>
      </View>

      <Pressable
        style={styles.CheckoutBtn}
        onPress={() => onCheckOutButtonPress?.()}
      >
        <Image style={styles.CheckoutImg} source={Back_1} />
        <Text style={styles.CheckoutText}>Proceed to Checkout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    height: 150,
    width: "100%",
    flexDirection: "column",
    backgroundColor: White,
    paddingHorizontal: 20,
  },
  CheckoutData: {
    height: 90,
    flexDirection: "column",
    paddingVertical: 15,
    gap: 5,
  },
  CheckoutText1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  CheckoutHeading1: {
    fontFamily: "Inter-Regular",
    fontSize: 20,
  },
  CheckoutHeading2: {
    fontFamily: "Inter-SemiBold",
    fontSize: 20,
  },
  CheckoutText2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  CheckoutSubHeading: {
    color: TextColor,
    fontFamily: "Inter-Regular",
    fontSize: 12,
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
