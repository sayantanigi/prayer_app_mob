import { useNavigation, useRoute } from "@react-navigation/native";

import React, { useEffect, useState } from "react";
import HTML from "react-native-render-html";
import {
  View,
  Pressable,
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import ImageSlider from "../../../../Component/ImageSlider";
import { BlankImage, Icon_33, Icon_34 } from "../../../../Constant/Images";
import {
  Black,
  PrimaryColor,
  TextColor,
  Transparent,
  White,
} from "../../../../Constant/Color";
import { routes } from "../../../../Constant/URL";
import O_ScreenLayout from "../O_ScreenLayout";
import { useUser } from "../../../../store/user";
import { SnackBar } from "../../../../Component/CustomSnackbar";
export interface ProductList {
  id: string;
  pro_name: string;
  pro_cat: string;
  pro_desc: string;
  price: string;
  imageList: ImageList[];
  status: string;
}
export interface ImageList {
  id: string;
  pro_image: string;
}
export default function O_ProductScreen() {
  const navigation = useNavigation<any>();
  const [shouldShow, setShouldShow] = useState(true);
  const route = useRoute();
  const data = route.params;
  const [getProductList, setProductList] = useState<ProductList[]>([]);
  const [user, setUser] = useUser();
  const [getCounting, setCounting] = useState();
  const [getImageList, setImageList] = useState<ImageList[]>([]);
  // Image Slider Function
  const datas = [
    {
      id: 1,
      Text: "Product Name",
      Subtitle:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium ipsa distinctio amet odit.",
      Shaperate: <View></View>,
      Cover: <View></View>,
      Image: BlankImage,
      Button: (
        <View>
          <Pressable onPress={() => navigation.navigate("")}>
            <Text style={{ fontSize: 500, color: Transparent }}>
              Redirect To Product Page
            </Text>
          </Pressable>
        </View>
      ),
    },
    {
      id: 2,
      Text: "Product Name",
      Subtitle:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium ipsa distinctio amet odit.",
      Shaperate: <View></View>,
      Cover: <View></View>,
      Image: BlankImage,
      Button: (
        <View>
          <Pressable onPress={() => navigation.navigate("")}>
            <Text style={{ fontSize: 500, color: Transparent }}>
              Redirect To Product Page
            </Text>
          </Pressable>
        </View>
      ),
    },
    {
      id: 3,
      Text: "Product Name",
      Subtitle:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium ipsa distinctio amet odit.",
      Shaperate: <View></View>,
      Cover: <View></View>,
      Image: BlankImage,
      Button: (
        <View>
          <Pressable onPress={() => navigation.navigate("")}>
            <Text style={{ fontSize: 500, color: Transparent }}>
              Redirect To Product Page
            </Text>
          </Pressable>
        </View>
      ),
    },
  ];
  useEffect(() => {
    (async () => {
      let response = await fetch(`${routes.getProductdetails}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prod_id: data,
        }),
      });

      const result = await response.json();
      setProductList(result.result);
      setImageList(result.result[0].imageList);
      //console.log(result.result[0].imageList);
    })();
  }, []);
  function slideCompont(item: ImageList, index: number) {
    return (
      <ImageBackground
        resizeMode="cover"
        style={{
          width: "100%",
          height: 200,
          justifyContent: "flex-start",
        }}
        source={{ uri: item?.pro_image ?? "" }}
      >
        {/* Slider Cover */}
        <View style={styles.SliderShaperate}>
          <View></View>
        </View>
        <View style={styles.SliderCover}>
          <View></View>
        </View>

        {/* Slider Data */}
        <View style={styles.SliderText}></View>

        {/* Slider Link */}
        {/* <Pressable style={styles.SliderLink}>{item.Button}</Pressable> */}
      </ImageBackground>
    );
  }
  const onCheckOutButtonPress = () => {
    // navigation.navigate("U_CheckoutScreen");
    const id = getProductList[0].id;
    SuccessAlert(id);
    navigation.navigate("U_ProductCartScreen");
  };
  async function cartCount(u_id: string) {
    try {
      let p_category = await fetch(`${routes.total_cart}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: u_id }),
      });

      let p_result = await p_category.json();
      setCounting(p_result.result[0].count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const onTocartPress = () => {
    const id = getProductList[0].id;
    SuccessAlert(id);
  };

  async function SuccessAlert(id: string) {
    let p_category = await fetch(`${routes.add_to_cart}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user?.userId,
        product_id: id,
        quantity: "1",
      }),
    });
    let p_result = await p_category.json();

    if (p_result.status === "success") {
      SnackBar.show({
        text: "Product added to your cart.",
        type: "LONG",
        actionText: "Ok",
        onActionPress: () => {
          SnackBar.hide();
        },
        backgroundColor: PrimaryColor,
      });
      cartCount(user?.userId as string);
    }
  }
  return (
    <O_ScreenLayout
      BannerHidden
      HeaderHidden
      VideoHidden
      FooterHidden
      ProductCartHidden
      ProductCheckoutHidden
      onCheckOutButtonPress={onCheckOutButtonPress}
      onAddToCartPress={onTocartPress}
      title="Product Details"
    >
      {/* Product Banner */}
      <View style={styles.DataBlock}>
        <ImageSlider
          interval={10000}
          data={getImageList}
          slideStyle={{
            width: Dimensions.get("window").width,
          }}
          renderItem={slideCompont as any}
        />
      </View>

      <View style={styles.ProductData}>
        <View style={styles.LikeArea}>
          <Text style={styles.ProductCategory}>
            {getProductList[0]?.pro_cat ?? ""}
          </Text>
          {shouldShow ? (
            <>
              <Pressable
                style={styles.LikeBtn}
                onPress={() => setShouldShow(!shouldShow)}
              >
                <Image
                  style={styles.LikeImg}
                  source={Icon_33}
                  resizeMode="contain"
                />
              </Pressable>
            </>
          ) : (
            <Pressable
              style={styles.LikeBtn}
              onPress={() => setShouldShow(!shouldShow)}
            >
              <Image
                style={styles.LikeImg}
                source={Icon_34}
                resizeMode="contain"
              />
            </Pressable>
          )}
        </View>
        <View style={styles.ProductText}>
          <Text style={styles.ProductName} numberOfLines={2}>
            {getProductList[0]?.pro_name ?? ""}
          </Text>
          <Text style={styles.ProductPrice}>
            ${getProductList[0]?.price ?? ""}
          </Text>
        </View>
        <Text style={styles.ProductRating}>4.5★</Text>
        <Text style={styles.ProductDetails}>
          <HTML source={{ html: getProductList[0]?.pro_desc ?? "" }}></HTML>
        </Text>
      </View>
    </O_ScreenLayout>
  );
}

const styles = StyleSheet.create({
  // Common
  DataBlock: {},

  // Slider Style
  SliderShaperate: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: 300,
  },
  SliderCover: {
    position: "absolute",
    zIndex: 0,
    width: "100%",
    height: 300,
    backgroundColor: Black,
    opacity: 0.5,
  },
  SliderText: {
    width: "100%",
    padding: 15,
    flexDirection: "column",
  },
  SliderHeading: {
    fontSize: 20,
    color: White,
    fontWeight: "500",
    letterSpacing: 0.8,
    fontFamily: "Inter-SemiBold",
  },
  SliderSubHeading: {
    fontSize: 14,
    color: White,
    letterSpacing: 0.5,
    fontFamily: "Inter-Regular",
    lineHeight: 14 * 1.5,
  },
  SliderLink: {
    position: "absolute",
    zIndex: 10,
    top: 0,
    left: 4,
    width: "100%",
    height: 300,
  },

  // Product Details
  ProductData: {
    padding: 20,
    flexDirection: "column",
    gap: 5,
  },
  LikeArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ProductCategory: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: TextColor,
  },
  LikeBtn: {},
  LikeImg: {
    width: 35,
    height: 35,
  },
  ProductText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ProductName: {
    width: "60%",
    fontFamily: "Inter-SemiBold",
    fontSize: 22,
    color: Black,
  },
  ProductPrice: {
    width: "40%",
    fontFamily: "Inter-SemiBold",
    fontSize: 22,
    color: Black,
    textAlign: "right",
  },
  ProductRating: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: TextColor,
  },
  ProductDetails: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    lineHeight: 14 * 1.5,
  },
});
