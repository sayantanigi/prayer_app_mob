import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Back_1, BlankImage, Icon_63 } from "../../../../Constant/Images";
import { Black, TextColor, White } from "../../../../Constant/Color";
import { AntDesign } from "@expo/vector-icons";
import { getUser, setUser } from "../../../../store/userAsync";
import { routes } from "../../../../Constant/URL";
import { useUser } from "../../../../store/user";
import { currencyFormatter } from "../../../../lib/utils";
import U_ScreenLayout from "../U_ScreenLayout";
import { green100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import ProgressBar from "../../../../Component/ProgressBar";
import O_ScreenLayout from "../O_ScreenLayout";
export interface CartData {
  cartList: CartList[];
  total_saved: string;
  total_amount: string;
}

export interface CartList {
  cart_id: string;
  pro_image: string;
  pro_name: string;
  category_name: string;
  quantity: string;
  final_price: string;
  prod_id: string;
}
export default function O_ProductCartScreen() {
  const navigation = useNavigation<any>();
  const [getcartdata, setCartdata] = useState<CartData>();
  const [getCartList, setCartList] = useState<CartList[]>([]);
  const [totalamount, setTotalamount] = useState("");
  const [totalsaved, setTotalsaved] = useState("");
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useUser();

  useEffect(() => {
    (async () => {
      setUser(await getUser());
      //setLoading(true);
      let response = await fetch(`${routes.cart_list}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user?.userId }),
      });
      let p_result = await response.json();
      setCartdata(p_result.result);
      setCartList(p_result.result.cartList);
      setTotalamount(p_result.result.total_amount);
    })();
  }, [user?.userId]);

  async function UpdateCartList() {
    let response = await fetch(`${routes.cart_list}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user?.userId }),
    });
    let p_result = await response.json();
    setCartdata(p_result.result);
    setCartList(p_result.result.cartList);
    setTotalamount(p_result.result.total_amount);
  }

  const handleAddQuantity = async (itemId: string, currentQuantity: number) => {
    const newQuantity = currentQuantity + 1;
    // Update the quantity in the local state
    const updatedCartList = getCartList.map((item) => {
      if (item.cart_id === itemId) {
        return { ...item, quantity: newQuantity.toString() };
      }
      return item;
    });
    setCartList(updatedCartList);

    setLoading(true);
    // Make an API call to update the quantity on the server
    try {
      const response = await fetch(`${routes.getUpdateCartQuantity}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user?.userId,
          product_id: itemId,
          quantity: "1",
        }),
      });
      const result = await response.json();
      UpdateCartList();
      setLoading(false);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveQuantity = async (
    itemId: string,
    currentQuantity: number
  ) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;

      const updatedCartList = getCartList.map((item) => {
        if (item.prod_id === itemId) {
          return { ...item, quantity: newQuantity.toString() };
        }
        return item;
      });
      setCartList(updatedCartList);

      // Make an API call to update the quantity on the server
      setLoading(true);
      try {
        const response = await fetch(`${routes.getUpdateCartQuantity}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user?.userId,
            product_id: itemId,
            quantity: "-1",
          }),
        });
        const result = await response.json();
        console.log("Quantity updated:", result);
        UpdateCartList();
        setLoading(false);
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  async function RemoveCart(itemid: string) {
    setLoading(true);
    try {
      const response = await fetch(`${routes.getRemoveCart}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user?.userId,
          product_id: itemid,
        }),
      });
      const result = await response.json();
      //console.log("Quantity updated:", result);
      UpdateCartList();
      setLoading(false);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  }
  const onCheckOutButtonPress = () => {
    // navigation.navigate("U_CheckoutScreen");
    const cartIds = getCartList.map((item) => item.cart_id).join(",");
    // console.log(cartIds);
    navigation.navigate("O_CheckoutScreen", cartIds);
  };
  return (
    <O_ScreenLayout
      BannerHidden
      HeaderHidden
      VideoHidden
      FooterHidden
      ProductBuyHidden
      // ProductCheckoutHidden
      ProductCartHidden
      onCheckOutButtonPress={onCheckOutButtonPress}
      title="Cart"
    >
      <View style={styles.Container}>
        {getCartList &&
          getCartList.length > 0 &&
          getCartList?.map(function (item: CartList, index: number) {
            return (
              <View style={styles.DataContainer}>
                <Pressable
                  style={styles.ImgContainer}
                  onPress={() => navigation.navigate("U_ProductScreen")}
                >
                  <Image
                    style={styles.ProductImg}
                    source={{ uri: item.pro_image }}
                    resizeMode="cover"
                  />
                </Pressable>

                <View style={styles.Data}>
                  <View style={styles.DataHead}>
                    <Text style={styles.DataName} numberOfLines={2}>
                      {item.pro_name}
                    </Text>

                    <TouchableOpacity onPress={() => RemoveCart(item.prod_id)}>
                      <Image
                        style={styles.DataCross}
                        source={Icon_63}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.DataCategory}>{item.category_name}</Text>
                  <View style={styles.DataBottom}>
                    <Text style={styles.DataPrice}>${item.final_price}</Text>
                    <View style={styles.DataAdd}>
                      <Pressable
                        onPress={() =>
                          handleRemoveQuantity(
                            item.prod_id,
                            parseInt(item.quantity)
                          )
                        }
                      >
                        <AntDesign name="minus" size={16} color="black" />
                      </Pressable>
                      <Text style={styles.DataAddCount}>{item.quantity}</Text>
                      <Pressable
                        onPress={() =>
                          handleAddQuantity(
                            item.prod_id,
                            parseInt(item.quantity)
                          )
                        }
                      >
                        <AntDesign name="plus" size={16} color="black" />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
      </View>
      <View style={styles.footer}>
        <Pressable
          style={styles.CheckoutBtn}
          onPress={() => navigation.navigate("O_CheckoutScreen")}
        >
          <Text style={styles.CheckoutText}>Total - ${totalamount} USD</Text>
        </Pressable>
      </View>
      <ProgressBar loading={loading} />
    </O_ScreenLayout>
  );
}

const styles = StyleSheet.create({
  Container: {
    alignSelf: "center",
    width: Dimensions.get("window").width - 40,
  },
  DataContainer: {
    width: "100%",
    alignSelf: "center",
    height: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: TextColor,
    borderBottomWidth: 1,
    borderStyle: "dashed",
  },
  ImgContainer: {
    width: "35%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  ProductImg: {
    width: 100,
    height: 100,
  },
  Data: {
    width: "65%",
    height: "100%",
    flexDirection: "column",
    paddingVertical: 25,
  },
  DataHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  DataName: {
    width: "80%",
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
    color: Black,
  },
  DataCross: {
    width: 15,
    height: 15,
  },
  DataCategory: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: TextColor,
  },
  DataBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 15,
  },
  DataPrice: {
    fontFamily: "Inter-SemiBold",
    fontSize: 13,
    width: "50%",
  },
  DataAdd: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "50%",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: TextColor,
    padding: 10,
  },
  DataAddCount: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
  },
  Container1: {
    flex: 1,
    position: "absolute",
  },
  CheckoutBtn: {
    width: "100%",
    height: 30,
    bottom: 0,
    padding: 30,
    paddingRight: 10,
    position: "absolute",
    alignItems: "flex-end",
    justifyContent: "center",
    borderRadius: 100,
  },
  CheckoutText: {
    position: "absolute",
    fontSize: 16,
    marginRight: 10,
    paddingHorizontal: 15,
    fontFamily: "Inter-SemiBold",
    color: "green",
  },
  CheckoutImg: {
    width: "100%",
    borderRadius: 100,
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    width: "100%",
    backgroundColor: "#eee",
    padding: 30,
    alignItems: "flex-end",
  },
  footerText: {
    fontSize: 16,
  },
});
