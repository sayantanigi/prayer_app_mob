import { useNavigation, useRoute } from "@react-navigation/native";
import U_ScreenLayout from "../U_ScreenLayout";
import {
  View,
  StyleSheet,
  Image,
  Modal,
  Text,
  Dimensions,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  BackgroundColor,
  PrimaryColor,
  Shadow,
  SuccessBack,
  SuccessText,
  TextColor,
  White,
} from "../../../../Constant/Color";
import { useSwipe } from "../../../../hooks/onSwipe";
import { SnackBar } from "../../../../Component/SnackBar";
import { Back_1 } from "../../../../Constant/Images";
import { routes } from "../../../../Constant/URL";
import HTML from "react-native-render-html";
interface Donationdetail {
  id: string;
  d_title: string;
  d_description: string;
  d_amount: string;
  d_image: string;
  created_date: string;
}
export default function U_DonationPaidScreen() {
  const navigation = useNavigation<any>();
  const [selectedAmount, setSelectedAmount] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const { onTouchStart, onTouchEnd } = useSwipe(handleBottomSwipe);
  const data = useRoute();
  const [getNonprofitOrganization, setNonprofitOrganization] = useState<
    Donationdetail[]
  >([]);
  // SnackBar Alert
  const SuccessAlert = () => {
    console.log(selectedAmount);
    setModalVisible(false);

    navigation.navigate("U_Paymentscreen", selectedAmount);

    // navigation.goBack();
  };

  // Gesture Handle
  function handleBottomSwipe() {
    setModalVisible(!modalVisible);
  }

  useEffect(() => {
    (async () => {
      let response = await fetch(`${routes.getdonation_details}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ donation_id: data.params }),
      });
      let json = await response.json();
      setNonprofitOrganization(json.result.donation_details);

      // setJoinImages(json.result.organizationList1.joined);
    })();
  }, []);

  return (
    <U_ScreenLayout
      HeaderHidden
      BannerHidden
      VideoHidden
      ProductBuyHidden
      ProductCartHidden
      ProductCheckoutHidden
      title="Donation"
    >
      <View style={styles.Block}>
        <View style={styles.BlockHeading}>
          <Text style={styles.DataBlockHeading}>
            {getNonprofitOrganization[0]?.d_title}
          </Text>
          <Text style={styles.DataBlockSubHeading}>
            By Life of Giving Organization
          </Text>
        </View>

        <View style={styles.ImageContainer}>
          <Image
            style={styles.ImageBody}
            source={{ uri: getNonprofitOrganization[0]?.d_image }}
            resizeMode="cover"
          />
          <Image style={styles.ImageBack} source={Back_1} resizeMode="cover" />
        </View>

        <View style={styles.BlockData}>
          <Text style={styles.DataBlockHeading}>About</Text>
          <Text style={styles.DataBlockSubHeading}>
            <HTML
              source={{ html: getNonprofitOrganization[0]?.d_description }}
            ></HTML>
          </Text>
        </View>

        <View style={styles.BlockData}>
          <Text style={styles.DataBlockHeading}>Participants</Text>
          <View style={styles.DonationCovers}>
            <View style={styles.DonationCoverImgs}>
              <Image
                style={[styles.DonationCoverImg, styles.DonationImg1]}
                source={require("../../../../assets/Images/Images/Cover1.png")}
                resizeMode="cover"
              />
              <Image
                style={[styles.DonationCoverImg, styles.DonationImg2]}
                source={require("../../../../assets/Images/Images/Cover2.png")}
                resizeMode="cover"
              />
              <Image
                style={[styles.DonationCoverImg, styles.DonationImg3]}
                source={require("../../../../assets/Images/Images/Cover3.png")}
                resizeMode="cover"
              />
              <Image
                style={[styles.DonationCoverImg, styles.DonationImg4]}
                source={require("../../../../assets/Images/Images/Cover4.png")}
                resizeMode="cover"
              />
              <Image
                style={[styles.DonationCoverImg, styles.DonationImg5]}
                source={require("../../../../assets/Images/Images/Cover5.png")}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.DonationCoverText}>+ 238 More</Text>
          </View>
        </View>

        <Pressable
          style={styles.DonateBtn}
          onPress={() => setModalVisible(true)}
        >
          <Image style={styles.DonateImg} source={Back_1} />
          <Text style={styles.DonateText}>Donate Now</Text>
        </Pressable>
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
          <View style={styles.ModalBody}>
            <View style={styles.ModalData}>
              {/* Drag to close section */}
              <View style={styles.DragContainer} onTouchEnd={onTouchEnd}>
                <View style={styles.DragBar}></View>
              </View>

              {/* Data */}
              <KeyboardAvoidingView>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={styles.DataBlockHeading}>
                    How much do you wish to Donate?
                  </Text>

                  <View style={styles.ModalDonationData}>
                    <Pressable
                      style={[
                        styles.ModalDonateSec,
                        selectedAmount === "$50" ? styles.selected : {},
                      ]}
                      onPress={() => setSelectedAmount("50")}
                    >
                      <Text style={styles.ModalDonatePrice}>$50</Text>
                    </Pressable>
                    <Pressable
                      style={[
                        styles.ModalDonateSec,
                        selectedAmount === "$100" ? styles.selected : {},
                      ]}
                      onPress={() => setSelectedAmount("100")}
                    >
                      <Text style={styles.ModalDonatePrice}>$100</Text>
                    </Pressable>
                    <Pressable
                      style={[
                        styles.ModalDonateSec,
                        selectedAmount === "$200" ? styles.selected : {},
                      ]}
                      onPress={() => setSelectedAmount("200")}
                    >
                      <Text style={styles.ModalDonatePrice}>$200</Text>
                    </Pressable>
                    {/* OR */}
                    <View style={styles.ModalDonateDiv}>
                      <View style={styles.ModalDonateBar}></View>
                      <Text style={styles.ModalDonatePriceBar}>OR</Text>
                    </View>
                    <TextInput
                      style={styles.ModalTextInput}
                      keyboardType="number-pad"
                      placeholder="Enter Price Manually"
                      value={selectedAmount} // Remove the dollar sign for input
                      onChangeText={(text) => setSelectedAmount(`${text}`)}
                    ></TextInput>
                  </View>

                  <Pressable
                    style={styles.ModalDonateBtn}
                    onPress={SuccessAlert}
                  >
                    <Image style={styles.ModalDonateImg} source={Back_1} />
                    <Text style={styles.ModalDonateText}>Donate</Text>
                  </Pressable>
                </ScrollView>
              </KeyboardAvoidingView>
            </View>
          </View>
        </View>
      </Modal>
    </U_ScreenLayout>
  );
}

const styles = StyleSheet.create({
  Block: {
    padding: 20,
  },
  BlockHeading: {
    width: Dimensions.get("window").width - 40,
    alignSelf: "center",
  },
  DataBlockHeading: {
    fontFamily: "Inter-SemiBold",
    fontSize: 22,
    color: PrimaryColor,
  },
  DataBlockSubHeading: {
    fontFamily: "Inter-Regular",
    fontSize: 13,
    lineHeight: 13 * 1.5,
    color: TextColor,
  },
  ImageContainer: {
    width: Dimensions.get("window").width - 40,
    alignSelf: "center",
    height: 200,
    position: "relative",
    marginTop: 50,
    marginBottom: 20,
  },
  ImageBody: {
    position: "absolute",
    zIndex: 1,
    width: "60%",
    height: 220,
    bottom: 0,
    right: 20,
  },
  ImageBack: {
    height: "100%",
    width: "100%",
    zIndex: 0,
    borderRadius: 15,
  },
  BlockData: {
    width: Dimensions.get("window").width - 40,
    alignSelf: "center",
    marginBottom: 20,
  },
  DonationCovers: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15,
  },
  DonationCoverImgs: {
    position: "relative",
  },
  DonationCoverImg: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  DonationImg1: {
    zIndex: 1,
  },
  DonationImg2: {
    position: "absolute",
    left: 20,
    zIndex: 0,
  },
  DonationImg3: {
    position: "absolute",
    left: 40,
    zIndex: -1,
  },
  DonationImg4: {
    position: "absolute",
    left: 60,
    zIndex: -2,
  },
  DonationImg5: {
    position: "absolute",
    left: 80,
    zIndex: -3,
  },
  DonationCoverText: {
    fontFamily: "Inter-Regular",
    color: TextColor,
    fontSize: 12,
    paddingLeft: 90,
  },

  // Donate Button
  DonateBtn: {
    width: Dimensions.get("window").width - 40,
    alignSelf: "center",
    height: 60,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  DonateImg: {
    width: "100%",
    height: 60,
    borderRadius: 100,
  },
  DonateText: {
    position: "absolute",
    fontFamily: "Inter-SemiBold",
    fontSize: 17,
    color: White,
  },

  // Modal
  ModalContainer: {
    backgroundColor: Shadow,
    height: "100%",
  },
  ModalBody: {
    position: "absolute",
    width: "100%",
    height: "70%",
    backgroundColor: BackgroundColor,
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  ModalData: {
    padding: 20,
    paddingTop: 10,
    position: "relative",
  },
  DragContainer: {
    height: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  DragBar: {
    width: 50,
    height: 4,
    borderRadius: 50,
    backgroundColor: TextColor,
    opacity: 0.7,
  },
  ModalDonationData: {},
  ModalDonateSec: {
    width: Dimensions.get("window").width - 40,
    alignSelf: "center",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderColor: TextColor,
    borderWidth: 1.5,
    marginVertical: 5,
  },
  ModalDonatePrice: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    color: TextColor,
  },
  ModalDonateDiv: {
    width: Dimensions.get("window").width - 40,
    alignSelf: "center",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    position: "relative",
  },
  ModalDonateBar: {
    width: Dimensions.get("window").width - 40,
    height: 1.5,
    backgroundColor: TextColor,
    position: "absolute",
  },
  ModalDonatePriceBar: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    color: TextColor,
    backgroundColor: BackgroundColor,
    paddingLeft: 20,
    paddingRight: 20,
  },
  ModalTextInput: {
    width: Dimensions.get("window").width - 40,
    alignSelf: "center",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderColor: TextColor,
    borderWidth: 1.5,
    marginVertical: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  ModalDonateBtn: {
    width: Dimensions.get("window").width - 40,
    alignSelf: "center",
    height: 60,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  ModalDonateImg: {
    width: "100%",
    height: 60,
    borderRadius: 100,
  },
  ModalDonateText: {
    position: "absolute",
    fontFamily: "Inter-SemiBold",
    fontSize: 17,
    color: White,
  },
  selected: {
    backgroundColor: "green", // Change this to your desired color
  },
});
