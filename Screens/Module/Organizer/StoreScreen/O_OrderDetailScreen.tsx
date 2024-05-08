import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable, Modal } from "react-native";
import {
  BackgroundColor,
  Black,
  PrimaryColor,
  Shadow,
  TextColor,
  White,
} from "../../../../Constant/Color";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSwipe } from "../../../../hooks/onSwipe";
import { routes } from "../../../../Constant/URL";
import { logProfileData } from "react-native-calendars/src/Profiler";
import O_ScreenLayout from "../O_ScreenLayout";

export default function O_OrderDetailScreen() {
  const navigation = useNavigation<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const { onTouchStart, onTouchEnd } = useSwipe(handleBottomSwipe);

  // Gesture Handle
  function handleBottomSwipe() {
    setModalVisible(!modalVisible);
  }

  return (
    <O_ScreenLayout
      HeaderHidden
      BannerHidden
      VideoHidden
      ProductBuyHidden
      ProductCartHidden
      ProductCheckoutHidden
      title="Order Details"
    >
      <View style={styles.Container}>
        {/* Order Top */}
        <View style={styles.OrderTop}>
          <Text style={styles.OrderText}>Order #FD2456</Text>
          <Pressable style={styles.OrderInvoice}>
            <Text style={styles.OrderInvoiceText}>View Invoice</Text>
          </Pressable>
        </View>

        {/* Order Body */}
        <View style={styles.OrderBody}>
          {/* Step 1 */}
          <View style={styles.OrderBlock}>
            <View style={styles.OrderIcon}>
              <View style={styles.OrderIconCircle}>
                <AntDesign name="check" size={18} color="white" />
              </View>
              <View style={styles.OrderIconBar}></View>
            </View>
            <View style={styles.OrderDataText}>
              <Text style={styles.OrderPointActive}>Ordered</Text>
              <Text style={styles.OrderSubText}>August 20, 2023</Text>
            </View>
          </View>

          {/* Step 2 */}
          <View style={styles.OrderBlock}>
            <View style={styles.OrderIcon}>
              <View style={styles.OrderIconCircle}>
                {/* <AntDesign name="check" size={18} color="white" /> */}
              </View>
              <View
                style={[styles.OrderIconBar, styles.OrderIconBarInactive]}
              ></View>
            </View>
            <View style={styles.OrderDataText}>
              <Text style={styles.OrderPointActive}>Processing</Text>
              <Text style={styles.OrderSubText}>August 20, 2023</Text>
            </View>
          </View>

          {/* Step 3 */}
          <View style={styles.OrderBlock}>
            <View style={styles.OrderIcon}>
              <View
                style={[styles.OrderIconCircle, styles.OrderIconCircleInactive]}
              >
                {/* <AntDesign name="check" size={18} color="white" /> */}
              </View>
              <View
                style={[styles.OrderIconBar, styles.OrderIconBarInactive]}
              ></View>
            </View>
            <View style={styles.OrderDataText}>
              <Text style={styles.OrderPointInActive}>Packed</Text>
              <Text style={styles.OrderSubText}></Text>
            </View>
          </View>

          {/* Step 4 */}
          <View style={styles.OrderBlock}>
            <View style={styles.OrderIcon}>
              <View
                style={[styles.OrderIconCircle, styles.OrderIconCircleInactive]}
              >
                {/* <AntDesign name="check" size={18} color="white" /> */}
              </View>
              <View
                style={[styles.OrderIconBar, styles.OrderIconBarInactive]}
              ></View>
            </View>
            <View style={styles.OrderDataText}>
              <Text style={styles.OrderPointInActive}>Shipped</Text>
              <Text style={styles.OrderSubText}></Text>
            </View>
          </View>

          {/* Step 5 */}
          <View style={styles.OrderBlock}>
            <View style={styles.OrderIcon}>
              <View
                style={[styles.OrderIconCircle, styles.OrderIconCircleInactive]}
              >
                {/* <AntDesign name="check" size={18} color="white" /> */}
              </View>
            </View>
            <View style={styles.OrderDataText}>
              <Text style={styles.OrderPointInActive}>Delivered</Text>
              <Text style={styles.OrderSubText}>
                Estimated delivery date: August 25, 2023
              </Text>
            </View>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.OrderBottom}>
          <Text style={styles.OrderSummaryText}>Payment Summary</Text>
          <View style={styles.OrderSummaryBlock}>
            <Text style={styles.OrderSummaryTextHeading}>Bills to</Text>
            <Text style={styles.OrderSummaryTextSubHeading}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Text>
          </View>
          <View style={styles.OrderSummaryBlock}>
            <Text style={styles.OrderSummaryTextHeading}>Method</Text>
            <Text style={styles.OrderSummaryTextSubHeading}>
              VISA **** 1234
            </Text>
          </View>
        </View>

        {/* Btn */}
        <View style={styles.CancleBtnArea}>
          <Pressable
            style={styles.CancleBtnBlock}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.CancleBtnText}>Cancle Order</Text>
          </Pressable>
        </View>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.ModalContainer}>
          <Pressable
            style={styles.ModalTop}
            onTouchEnd={onTouchEnd}
          ></Pressable>
          <View style={styles.CancleBlock}>
            <Text style={styles.CancleHeading}>
              If you cancle now, you may not be able to purchase this product
              again.
            </Text>
            <View style={styles.CancleBtnBlockData}>
              <Pressable
                style={[styles.CancleBtn, styles.CancleBtn1]}
                onPress={() => setModalVisible(false)}
              >
                <Text
                  style={[styles.CancleButtonText, styles.CancleButtonText1]}
                >
                  I would like to keep the order
                </Text>
              </Pressable>
              <Pressable style={[styles.CancleBtn, styles.CancleBtn2]}>
                <Text style={styles.CancleButtonText}>Cancle Order</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </O_ScreenLayout>
  );
}

const styles = StyleSheet.create({
  Container: {
    padding: 20,
  },
  OrderTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  OrderText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 20,
    width: "50%",
  },
  OrderInvoice: {
    backgroundColor: White,
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 100,
    elevation: 5,
  },
  OrderInvoiceText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: PrimaryColor,
  },
  OrderBody: {},
  OrderBlock: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
    justifyContent: "center",
  },
  OrderIcon: {
    width: "15%",
    position: "relative",
    alignItems: "center",
  },
  OrderIconCircle: {
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: PrimaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  OrderIconCircleInactive: {
    backgroundColor: TextColor,
  },
  OrderIconBar: {
    width: 2,
    height: 70,
    backgroundColor: PrimaryColor,
    position: "absolute",
    top: 0,
    zIndex: -1,
  },
  OrderIconBarInactive: {
    backgroundColor: TextColor,
  },
  OrderDataText: {
    width: "85%",
  },
  OrderPointActive: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    color: Black,
  },
  OrderPointInActive: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    color: TextColor,
  },
  OrderSubText: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: TextColor,
  },
  OrderBottom: {
    marginBottom: 20,
  },
  OrderSummaryText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 20,
    marginBottom: 10,
  },
  OrderSummaryBlock: {
    paddingBottom: 5,
  },
  OrderSummaryTextHeading: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
  },
  OrderSummaryTextSubHeading: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    color: TextColor,
  },
  CancleBtnArea: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  CancleBtnBlock: {
    backgroundColor: White,
    width: 150,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    paddingVertical: 15,
    elevation: 5,
  },
  CancleBtnText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: PrimaryColor,
  },

  // Modal
  ModalContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  ModalTop: {
    width: "100%",
    height: "70%",
    backgroundColor: Shadow,
  },
  CancleBlock: {
    backgroundColor: BackgroundColor,
    width: "100%",
    height: "30%",
    position: "relative",
  },
  CancleHeading: {
    padding: 20,
    fontFamily: "Inter-Regular",
    fontSize: 15,
    lineHeight: 15 * 1.5,
  },
  CancleBtnBlockData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
  },
  CancleBtn: {
    width: "47%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  CancleButtonText: {
    padding: 10,
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 14 * 1.5,
    color: PrimaryColor,
  },
  CancleBtn1: {
    backgroundColor: PrimaryColor,
  },
  CancleBtn2: {
    borderWidth: 1.5,
    borderColor: PrimaryColor,
  },
  CancleButtonText1: {
    color: White,
  },
});
