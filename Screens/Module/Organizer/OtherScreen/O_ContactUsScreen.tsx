import { useNavigation } from "@react-navigation/native";
import O_ScreenLayout from "../O_ScreenLayout";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import {
  ErrorText,
  PrimaryColor,
  SuccessBack,
  SuccessText,
  TextColor,
  White,
} from "../../../../Constant/Color";
import MapView, { Marker } from "react-native-maps";
import {
  Back_2,
  Back_3,
  BlankImage,
  HomeIcon_4,
  Icon_1,
  Icon_2,
  Icon_3,
} from "../../../../Constant/Images";
import ProgressBar from "../../../../Component/ProgressBar";
import { BASE_URL } from "../../../../Constant/URL";
import { SnackBar } from "../../../../Component/CustomSnackbar";

export default function O_ContactUsScreen() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  // SnackBar Alert
  const SuccessAlert = async () => {
    const formData = new FormData();

    if (form.name === "" || form.name == null) {
      SnackBar.show({
        text: "Please enter name.",
        type: "LONG",
        actionText: "Ok",

        onActionPress: () => {
          SnackBar.hide();
        },
        backgroundColor: PrimaryColor,
      });
      return;
    } else if (form.email === "" || form.email == null) {
      SnackBar.show({
        text: "Please enter email.",
        type: "LONG",
        actionText: "Ok",
        onActionPress: () => {
          SnackBar.hide();
        },
        backgroundColor: PrimaryColor,
      });
      return;
    } else {
      setLoading(true);
      formData.append("name", form.name as string);
      formData.append("email", form.email);
      formData.append("subject", form.subject);
      formData.append("message", form.message);

      console.log(formData);
      let response = await fetch(BASE_URL + "save_contact", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let json = await response.json();

      console.log(json);
      //console.log(form)
      if (json.status == "success") {
        setLoading(false);
        SnackBar.show({
          text: json.result,
          type: "LONG",
          actionText: "Ok",
          onActionPress: () => {
            SnackBar.hide();
          },
          backgroundColor: SuccessText,
        });
        navigation.goBack();
      } else {
        setLoading(false);
        SnackBar.show({
          text: json.result,
          type: "LONG",
          actionText: "Ok",
          onActionPress: () => {
            SnackBar.hide();
          },
          backgroundColor: ErrorText,
        });
      }
    }
  };

  function handleValueChange(value: string, key: string) {
    setForm({ ...form, [key]: value });
  }

  return (
    <O_ScreenLayout
      HeaderHidden
      VideoHidden
      ProductBuyHidden
      ProductCartHidden
      ProductCheckoutHidden
      title="Contact Us"
      BannerHeading="Contact Us"
      BannerImage={BlankImage}
    >
      <View style={styles.Container}>
        <View style={styles.InputBlock}>
          <Text style={styles.Heading}>Full Name</Text>
          <View style={styles.Input}>
            <TextInput
              style={styles.InputField}
              placeholder="Enter Your Full name"
              onChangeText={(text) => handleValueChange(text, "name")}
            ></TextInput>
            <Image
              style={styles.InputImg}
              source={Back_2}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.InputBlock}>
          <Text style={styles.Heading}>Email</Text>
          <View style={styles.Input}>
            <TextInput
              style={styles.InputField}
              keyboardType="email-address"
              placeholder="Type Your Email Address"
              onChangeText={(text) => handleValueChange(text, "email")}
            ></TextInput>
            <Image
              style={styles.InputImg}
              source={Back_2}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.InputBlock}>
          <Text style={styles.Heading}>Subject</Text>
          <View style={styles.Input}>
            <TextInput
              style={styles.InputField}
              placeholder="Type Your Subject"
              onChangeText={(text) => handleValueChange(text, "subject")}
            ></TextInput>
            <Image
              style={styles.InputImg}
              source={Back_2}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.InputBlock}>
          <Text style={styles.Heading}>Message</Text>
          <View style={[styles.Input, styles.CommentInput]}>
            <TextInput
              style={[styles.InputField, styles.CommentArea]}
              multiline={true}
              placeholder="Type Your Message"
              onChangeText={(text) => handleValueChange(text, "message")}
            ></TextInput>
            <Image
              style={[styles.InputImg, styles.CommentAreaImg]}
              source={Back_3}
              resizeMode="contain"
            />
          </View>
        </View>
        <Pressable style={styles.SubmitBtn} onPress={SuccessAlert}>
          <Text style={styles.SubmitBtnText}>Submit</Text>
          <Image style={styles.SubmitBtnBack} source={HomeIcon_4} />
        </Pressable>

        {/* Map */}
        {/* <View
                    style={styles.MapContainer}>
                    <MapView
                        initialRegion={{
                            latitude: 23.5367742,
                            longitude: 87.2872733,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                        style={styles.Map} >
                        <Marker
                            coordinate={{
                                latitude: 23.5367742,
                                longitude: 87.2872733,
                            }}
                            pinColor={PrimaryColor}
                        />
                    </MapView>
                </View> */}

        {/* Our Details */}
        {/* <View style={styles.DetailsBlock}>
                    <View style={styles.DetailsImgContainer}>
                        <View style={styles.DetailsImgBlock}>
                            <Image style={styles.DetailsImg} source={Icon_1}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                    <View style={styles.DetailsText}>
                        <Text style={styles.HeadingText}>Location</Text>
                        <Text style={styles.SubHeading} numberOfLines={1}>Webel IT Park E&G Module, Durgapur, West Bengal 713208</Text>
                    </View>
                </View>
                <View style={styles.DetailsBlock}>
                    <View style={styles.DetailsImgContainer}>
                        <View style={styles.DetailsImgBlock}>
                            <Image style={styles.DetailsImg} source={Icon_2}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                    <View style={styles.DetailsText}>
                        <Text style={styles.HeadingText}>Call Us</Text>
                        <Text style={styles.SubHeading} numberOfLines={1}>+91 8101-244-343</Text>
                    </View>
                </View>
                <View style={styles.DetailsBlock}>
                    <View style={styles.DetailsImgContainer}>
                        <View style={styles.DetailsImgBlock}>
                            <Image style={styles.DetailsImg} source={Icon_3}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                    <View style={styles.DetailsText}>
                        <Text style={styles.HeadingText}>Email</Text>
                        <Text style={styles.SubHeading} numberOfLines={1}>info@Prayerapp.co.in</Text>
                    </View>
                </View> */}
      </View>
      <ProgressBar loading={loading} />
    </O_ScreenLayout>
  );
}

const styles = StyleSheet.create({
  Container: {
    padding: 20,
  },

  // Input Block
  InputBlock: {
    marginBottom: 10,
  },
  Heading: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14.5,
    paddingBottom: 10,
    paddingLeft: 25,
  },
  Input: {
    width: 300,
    height: 60,
    alignSelf: "center",
    position: "relative",
  },
  InputField: {
    zIndex: 1,
    width: 300,
    height: 60,
    paddingLeft: 25,
    paddingRight: 25,
  },
  InputImg: {
    width: 300,
    height: 60,
    position: "absolute",
    zIndex: 0,
  },
  CommentInput: {
    height: 180,
  },
  CommentArea: {
    height: 180,
    verticalAlign: "top",
    textAlign: "left",
    paddingTop: 20,
  },
  CommentAreaImg: {
    height: 180,
  },

  // Button
  SubmitBtn: {
    elevation: 10,
    backgroundColor: White,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: 120,
    height: 50,
    position: "relative",
    alignSelf: "center",
    marginTop: 10,
  },
  SubmitBtnText: {
    color: White,
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    zIndex: 1,
  },
  SubmitBtnBack: {
    borderRadius: 50,
    width: 120,
    height: 50,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  // Map
  MapContainer: {
    marginTop: 30,
    marginBottom: 30,
  },
  Map: {
    width: Dimensions.get("window").width - 40,
    height: 250,
  },

  // Our Details
  DetailsBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width - 40,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: White,
    padding: 10,
    marginBottom: 15,
  },
  DetailsImgContainer: {
    width: 60,
  },
  DetailsImgBlock: {
    height: 60,
    width: 60,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: White,
    alignItems: "center",
    justifyContent: "center",
  },
  DetailsImg: {
    width: 25,
    height: 25,
  },
  DetailsText: {
    justifyContent: "center",
    alignItems: "flex-start",
    textAlign: "left",
    width: 260,
  },
  HeadingText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14.5,
    paddingBottom: 10,
  },
  SubHeading: {
    color: TextColor,
    fontFamily: "Inter-Regular",
    fontSize: 12,
  },
});
