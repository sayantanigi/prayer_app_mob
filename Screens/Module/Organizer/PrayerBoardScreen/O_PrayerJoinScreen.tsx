import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import O_ScreenLayout from "../O_ScreenLayout";
import {
  PrimaryColor,
  SuccessBack,
  SuccessText,
  TextColor,
  White,
} from "../../../../Constant/Color";
import {
  Back_2,
  Back_4,
  Back_5,
  BlankImage,
  HomeIcon_4,
} from "../../../../Constant/Images";
import { SnackBar } from "../../../../Component/CustomSnackbar";
import { useUser } from "../../../../store/user";
import { getUser } from "../../../../store/userAsync";
import ProgressBar from "../../../../Component/ProgressBar";
import { routes } from "../../../../Constant/URL";
export interface PrayerValue {
  name: string;
  images: string;
  eventid: string;
}
export default function O_PrayerJoinScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const [user, setUser] = useUser();
  const [shouldShow, setShouldShow] = useState(true);
  const [userPrayername, setPrayername] = useState<PrayerValue>();
  const [userPrayerImages, setPrayerImages] = useState();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    user_id: "",
    event_id: "",
    fullname: "",
    phno: "",
    gender: "Male",
    nationality: "",
  });
  function handleValueChange(value: string, key: string) {
    setFormData({ ...formData, [key]: value });
  }

  // SnackBar Alert

  useEffect(() => {
    (async () => {
      const paramsObject = JSON.parse(JSON.stringify(route.params));
      setPrayername(paramsObject);
      setUser(await getUser());
      setFormData({
        ...formData,
        user_id: String(user?.userId),
        event_id: String(paramsObject?.eventid),
      });
    })();
  }, [user?.userId, route.params]);

  const SuccessAlert = async () => {
    console.log(formData);
    if (formData.fullname === "" || formData.fullname == null) {
      SnackBar.show({
        text: "Please add Full name.",
        type: "LONG",
        actionText: "Ok",
        onActionPress: () => {
          SnackBar.hide();
        },
        backgroundColor: "#A52A2A",
      });
    } else {
      setLoading(true);
      console.log(formData);
      let response = await fetch(`${routes.userJoinedPrayer}`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      let json = await response.json();
      let payload = json.status;

      if (payload === "success") {
        SnackBar.show({
          text: json.result,
          type: "LONG",
          actionText: "Ok",
          onActionPress: () => {
            SnackBar.hide();
          },
          backgroundColor: "#009d4f",
        });
        //navigation.goBack();
        navigation.navigate("O_HomeScreen");
      }
    }
  };

  return (
    <O_ScreenLayout
      HeaderHidden
      VideoHidden
      ProductBuyHidden
      ProductCartHidden
      ProductCheckoutHidden
      title="Join Prayer"
      BannerHeading={userPrayername?.name}
      BannerSubHeading="Where the prayer event is taking place"
      BannerImage={
        userPrayername && userPrayername.images
          ? { uri: userPrayername.images }
          : null
      }
    >
      <View style={styles.Conatiner}>
        <View style={styles.InputBlock}>
          <Text style={styles.Heading}>Full Name</Text>
          <View style={styles.Input}>
            <TextInput
              onChangeText={(text) => handleValueChange(text, "fullname")}
              style={styles.InputField}
              placeholder="Enter Your Full name"
            ></TextInput>
            <Image
              style={styles.InputImg}
              source={Back_2}
              resizeMode="contain"
            />
          </View>
        </View>
        {/* <View style={styles.InputBlock}>
          <Text style={styles.Heading}>Phone Number</Text>
          <View style={styles.Input}>
            <TextInput
              onChangeText={(text) => handleValueChange(text, "phno")}
              style={styles.InputField}
              keyboardType="number-pad"
              placeholder="Type Your Phone Number"
            ></TextInput>
            <Image
              style={styles.InputImg}
              source={Back_2}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.InputBlock}>
          <Text style={styles.Heading}>Choose Gender</Text>
          {shouldShow ? (
            <>
              <View style={styles.OptionContainer}>
                <View style={styles.OptionBlock}>
                  <Text style={styles.OptionText}>Male</Text>
                  <Image
                    style={styles.OptionBlockBack}
                    source={Back_4}
                    resizeMode="contain"
                  />
                </View>
                <Pressable
                  style={styles.OptionBlock}
                  onPress={() => {
                    setShouldShow(!shouldShow);
                    handleValueChange("Female", "gender");
                  }}
                >
                  <Text style={styles.OptionText}>Female</Text>
                  <Image
                    style={styles.OptionBlockBack}
                    source={Back_5}
                    resizeMode="contain"
                  />
                </Pressable>
              </View>
            </>
          ) : (
            <View style={styles.OptionContainer}>
              <Pressable
                style={styles.OptionBlock}
                onPress={() => {
                  setShouldShow(!shouldShow);
                  handleValueChange("Male", "gender");
                }}
              >
                <Text style={styles.OptionText}>Male</Text>
                <Image
                  style={styles.OptionBlockBack}
                  source={Back_5}
                  resizeMode="contain"
                />
              </Pressable>
              <View style={styles.OptionBlock}>
                <Text style={styles.OptionText}>Female</Text>
                <Image
                  style={styles.OptionBlockBack}
                  source={Back_4}
                  resizeMode="contain"
                />
              </View>
            </View>
          )}
        </View>
        <View style={styles.InputBlock}>
          <Text style={styles.Heading}>Nationality</Text>
          <View style={styles.Input}>
            <TextInput
              onChangeText={(text) => handleValueChange(text, "nationality")}
              style={styles.InputField}
              placeholder="Type Your Nationality"
            ></TextInput>
            <Image
              style={styles.InputImg}
              source={Back_2}
              resizeMode="contain"
            />
          </View>
        </View> */}
        <Pressable style={styles.PrayerJoinBtn} onPress={SuccessAlert}>
          <Text style={styles.JoinPrayerBtnText}>Join</Text>
          <Image style={styles.JoinPrayerBtnBack} source={HomeIcon_4} />
        </Pressable>
        <ProgressBar loading={loading} />
      </View>
    </O_ScreenLayout>
  );
}

const styles = StyleSheet.create({
  Conatiner: {
    width: "100%",
    flex: 1,
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
  PrayerJoinBtn: {
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
  JoinPrayerBtnText: {
    color: White,
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    zIndex: 1,
  },
  JoinPrayerBtnBack: {
    borderRadius: 50,
    width: 120,
    height: 50,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  OptionContainer: {
    width: 300,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
  },
  OptionBlock: {
    width: 170,
    height: 70,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  OptionText: {
    position: "absolute",
    zIndex: 1,
    fontFamily: "Inter-Regular",
    color: TextColor,
  },
  OptionBlockBack: {
    width: 170,
    height: 70,
  },
});
