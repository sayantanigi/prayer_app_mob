import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  ListRenderItemInfo,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Modal,
  FlatList,
  Platform,
  SafeAreaView,
} from "react-native";
import * as Haptics from "expo-haptics";
import {
  BackgroundColor,
  HeadingColor,
  PrimaryColor,
} from "../../../../Constant/Color";
import {
  Back_2,
  Icon_17,
  Icon_18,
  Icon_19,
  Icon_20,
  Icon_21,
  Icon_22,
  Logo,
} from "../../../../Constant/Images";
import Link from "../../../../Component/Link";
import {
  autoCompleteUrl,
  autocompleteDetails,
  googleApiKey,
  routes,
} from "../../../../Constant/URL";
import TouchableRipple from "../../../../Component/TouchableRipple";
import { SearchbarEditable } from "../../../../Component/SearchBar";
import ProgressBar from "../../../../Component/ProgressBar";
import { SnackBar } from "../../../../Component/CustomSnackbar";
interface Location {
  formatted_address: string;
}
export default function U_SignUpScreen() {
  const [isSearchOpen, setisSearchOpen] = useState(false);
  const [location, setLocation] = useState<Location[]>([]);
  const [currentAddress, setCurrentaddress] = useState(null);
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [formData, setFormData] = useState({
    organizer_name: "",
    first_name: "",
    last_name: "",
    email: "",
    location: "",
    longitude: "",
    latitude: "",
    password: "",
    user_type: "1",
  });

  const navigation = useNavigation<any>();
  const [passwordShow, setPasswordshow] = useState(false);
  // Haptics
  async function handleRouting(route: string) {
    await Haptics.selectionAsync();
    navigation.navigate(route);
  }
  function handleFormDataChange(name: string, value: string) {
    setFormData({ ...formData, [name]: value });
  }

  function handleSearch() {
    setisSearchOpen(true);
  }
  async function handleLocationSearch(text: string) {
    let url = `${autoCompleteUrl}?input="${text.trim()}"&key=${googleApiKey}`;
    let response = await fetch(url);
    let json = await response.json();
    setLocation(json.predictions);
    // console.log(json)
  }
  function createLocationOptions(location: any[]) {
    let resArray = [];
    for (let i = 0; i < location.length; i++) {
      // console.log(location[i])
      resArray.push({
        value: String(i),
        label: location[i].description,
        label1: location[i].place_id,
      });
    }

    // console.log(resArray)
    return resArray;
  }
  async function handleSelectLocation(data: any) {
    let response = await fetch(
      `${autocompleteDetails}?placeid=${data}&key=${googleApiKey}`
    );
    let payload = await response.json();

    let { lat, lng } = payload.result.geometry.location;

    setFormData({
      ...formData,
      longitude: String(payload.result.geometry.location.lng),
      latitude: String(payload.result.geometry.location.lat),
      location: String(payload.result.formatted_address),
    });

    // SetLocationDetails({ latitude: lat, longitude: lng, address })
  }
  async function dataSubmit() {
    if (formData.first_name === "" || formData.first_name == null) {
      SnackBar.show({
        text: "First name is required",
        type: "LONG",
        backgroundColor: "#A52A2A",
      });
    } else if (formData.last_name === "" || formData.last_name == null) {
      SnackBar.show({
        text: "Last name is required",
        type: "LONG",
        backgroundColor: "#A52A2A",
      });
    } else if (formData.email === "" || formData.email == null) {
      SnackBar.show({
        text: "Email is required",
        type: "LONG",
        backgroundColor: "#A52A2A",
      });
    } else if (formData.password === "" || formData.password == null) {
      SnackBar.show({
        text: "Password is required",
        type: "LONG",
        backgroundColor: "#A52A2A",
      });
    } else if (formData.location === "" || formData.location == null) {
      SnackBar.show({
        text: "Address is required",
        type: "LONG",
        backgroundColor: "#A52A2A",
      });
    } else {
      setLoading(true);

      let response = await fetch(`${routes.getRegistration}`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      let json = await response.json();
      
      if (json.status == "success") {
        SnackBar.show({
          text: json.result,
          type: "LONG",
          backgroundColor: "#009d4f",
        });

        navigation.navigate("U_SignInScreen");
      } else {
        SnackBar.show({
          text: json.result,
          type: "LONG",
          backgroundColor: "#009d4f",
        });
      }
    }
  }

  function AutoCompleteLayout({
    item,
  }: ListRenderItemInfo<{
    label: number;
    value: string;
    label1: number;
  }>) {
    return (
      <TouchableRipple
        onPress={() => {
          console.log(item.label);
          // setPlaceId:String(item.label1)
          setFormData({
            ...formData,
            location: String(item.label),
          });
          handleSelectLocation(String(item.label1));
          setisSearchOpen(false);
        }}
        ripple_color={"rgba(0,0,0,0.2)"}
        style={styles.listItem}
      >
        <Text style={styles.listTitle}>{item.label}</Text>
      </TouchableRipple>
    );
  }

  return (
    <SafeAreaView style={styles.Container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.Body}
        >
          {/* Logo */}
          <View style={styles.LogoContainer}>
            <Image style={styles.Logo} source={Logo} resizeMode="contain" />
          </View>

          <Text style={styles.Heading}>
            Become an <Text style={{ color: PrimaryColor }}>User</Text>
          </Text>

          {/* Input Field */}
          <View style={styles.InputContainer}>
            {/* first name input field */}
            <View style={styles.Input}>
              <TextInput
                style={styles.InputField}
                onChangeText={(value) =>
                  handleFormDataChange("first_name", value)
                }
                placeholder="First Name"
              ></TextInput>
              <Image style={styles.InputImg} source={Back_2} />
              <View style={styles.Icon}>
                <Image source={Icon_22} style={styles.IconImage}></Image>
              </View>
            </View>

            {/* last name input field */}
            <View style={[styles.Input, styles.Gap]}>
              <TextInput
                onChangeText={(value) =>
                  handleFormDataChange("last_name", value)
                }
                style={styles.InputField}
                placeholder="Last Name"
              ></TextInput>
              <Image style={styles.InputImg} source={Back_2} />
              <View style={styles.Icon}>
                <Image source={Icon_22} style={styles.IconImage}></Image>
              </View>
            </View>

            {/* email input field */}
            <View style={[styles.Input, styles.Gap]}>
              <TextInput
                style={styles.InputField}
                onChangeText={(value) => handleFormDataChange("email", value)}
                keyboardType="email-address"
                placeholder="Email Address"
              ></TextInput>
              <Image style={styles.InputImg} source={Back_2} />
              <View style={styles.Icon}>
                <Image source={Icon_21} style={styles.IconImage}></Image>
              </View>
            </View>

            {/* address input field */}
            <Pressable
              onPress={handleSearch}
              style={[styles.Input, styles.Gap]}
            >
              <TextInput
                style={styles.InputField}
                editable={false}
                placeholder="Address"
                value={formData.location.slice(0, 40)}
                onChangeText={(text) => handleFormDataChange("location", text)}
              ></TextInput>
              <Image style={styles.InputImg} source={Back_2} />
              <View style={styles.Icon}>
                <Image source={Icon_20} style={styles.IconImage}></Image>
              </View>
            </Pressable>

            {/* password input field */}
            <View style={[styles.Input, styles.Gap]}>
              <TextInput
                onChangeText={(value) =>
                  handleFormDataChange("password", value)
                }
                secureTextEntry={!passwordShow}
                style={styles.InputField}
                placeholder="Password"
              ></TextInput>
              <Image style={styles.InputImg} source={Back_2} />
              <Pressable
                onPress={function () {
                  setPasswordshow(!passwordShow);
                }}
                style={styles.Icon}
              >
                <Image source={Icon_18} style={styles.IconImage}></Image>
              </Pressable>
            </View>

            {/* confirm password input field */}
            {/* <View style={[styles.Input, styles.Gap]}>
              <TextInput
                onChangeText={(value) =>
                  handleFormDataChange("conpassword", value)
                }
                secureTextEntry={!passwordShow}
                style={styles.InputField}
                placeholder="Confirm Password"
              ></TextInput>
              <Image style={styles.InputImg} source={Back_2} />
              <Pressable
                onPress={function () {
                  setPasswordshow(!passwordShow);
                }}
                style={styles.Icon}
              >
                <Image source={Icon_18} style={styles.IconImage}></Image>
              </Pressable>
            </View> */}

            <View
              style={{
                flexGrow: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                marginTop: 25,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  letterSpacing: 1,
                  fontFamily: "Inter-Regular",
                }}
              >
                Already have an account?{" "}
                <Link
                  style={{ color: PrimaryColor, fontFamily: "Inter-Regular" }}
                  to="U_SignInScreen"
                >
                  Sign in
                </Link>
              </Text>
            </View>

            {/* Button */}
            <Pressable onPress={() => dataSubmit()}>
              <View style={styles.Button}>
                <Image style={styles.ButtonBackImg} source={Icon_19} />
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        animationType="slide"
        onRequestClose={() => setisSearchOpen(false)}
        visible={isSearchOpen} >
        <SafeAreaView style={styles.searchPopup}>
          <SearchbarEditable
            onBackButtonPress={() => setisSearchOpen(false)}
            onChangeText={handleLocationSearch}
            label={currentAddress as any}
            // onSelect={handleSelectLocation}
          />

          <FlatList
            style={{ flex: 1 }}
            data={createLocationOptions(location)}
            keyExtractor={(item) => item.value}
            renderItem={AutoCompleteLayout}
          />
        </SafeAreaView>
      </Modal>

      <ProgressBar loading={loading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: BackgroundColor,
  },
  Body: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  LogoContainer: {},
  Logo: {
    width: 100,
    height: 80,
    alignSelf: "center",
  },
  listItem: {
    width: "100%",
    padding: 4,
    paddingVertical: 10,
  },
  listTitle: {
    fontSize: 13,
    fontFamily: "Inter-Bold",
    marginBottom: 4,
  },
  Heading: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
    alignSelf: "center",
    color: HeadingColor,
  },
  InputContainer: {},
  Input: {
    width: 280,
    height: 50,
    alignSelf: "center",
    position: "relative",
  },
  InputField: {
    zIndex: 1,
    width: 280,
    height: 50,
    paddingLeft: 25,
    paddingRight: 25,
  },
  InputImg: {
    width: 280,
    height: 50,
    position: "absolute",
    zIndex: 0,
  },
  Icon: {
    position: "absolute",
    right: -5,
    top: -5,
    zIndex: 2,
  },
  IconImage: {
    width: 60,
    height: 60,
  },
  Gap: {
    marginTop: 20,
  },
  Button: {
    alignSelf: "center",
    height: 55,
    width: 55,
    marginTop: 20,
  },
  ButtonBackImg: {
    height: 55,
    width: 55,
  },
  searchPopup: {
    padding: 8,
    flex: 1,
    marginTop: Platform.OS == "ios" ? 44 : 0,
  },
  locationWrap: {
    flex: 1,
    backgroundColor: "#f5f5fa",
    padding: 12,
  },
  locationInput: {
    flexDirection: "row",
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: PrimaryColor,
    borderRadius: 5,
    alignItems: "center",
    paddingHorizontal: 6,
    backgroundColor: "hsla(25.21,97.33%,55.88%,0.08)",
    fontFamily: "Inter-Medium",
    marginBottom: 10,
  },
});
