import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  ListRenderItemInfo,
  Modal,
  Dimensions,
  FlatList,
} from "react-native";
import U_ScreenLayout from "../U_ScreenLayout";
import {
  Black,
  PrimaryColor,
  SuccessText,
  White,
} from "../../../../Constant/Color";
import {
  Back_2,
  Back_3,
  BlankImage,
  HomeIcon_4,
} from "../../../../Constant/Images";
import { SnackBar } from "../../../../Component/CustomSnackbar";
import * as DocumentPicker from "expo-document-picker";
import { useUser } from "../../../../store/user";
import { getUser } from "../../../../store/userAsync";
import {
  BASE_URL,
  autoCompleteUrl,
  autocompleteDetails,
  googleApiKey,
  routes,
} from "../../../../Constant/URL";
import { SearchbarEditable } from "../../../../Component/SearchBar";
import TouchableRipple from "../../../../Component/TouchableRipple";
import ProgressBar from "../../../../Component/ProgressBar";
import ChooseFile from "../../../../Component/ChooseFile";
import { useState } from "react";
import React from "react";
export interface Userinfo {
  userId: string;
  firstname: string;
  lastname: string;
  short_bio: string;
  mobile: any;
  gender: string;
  email: string;
  address: string;
  userType: string;
}

export default function U_EditProfile() {
  const [showatePicker, setShowDatePicker] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useUser();
  const navigation = useNavigation<any>();
  const [fileName, setFileName] = useState("No File Chosen");
  const [isSearchOpen, setisSearchOpen] = useState(false);
  const [location, setLocation] = useState<Location[]>([]);
  const [currentAddress, setCurrentaddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [getuserInfo, setUserInfo] = useState<Userinfo[]>([]);
  const [fNmae, setFname] = useState("");
  const [reload, setReload] = React.useState({});
  const [mainFile, setMainfile] = useState<any>(null);

  const [files, setFiles] = React.useState<
    DocumentPicker.DocumentPickerAsset[]
  >([]);
  // SnackBar Alert

  const [formData, setFormData] = useState({
    organizername: "",
    firstname: "",
    lastname: "",
    address: "",
    longitude: "",
    latitude: "",
    short_bio: "",
    mobile: "",
    gender: "",
    user_id: user?.userId,
  });
  const BannerImage = React.useMemo(() => {
    if (files.length > 0) {
      setMainfile({
        type: files[0].mimeType as string,
        name: files[0].name,
        uri: files[0].uri,
      });
      return { uri: files[0].uri };
    }
    return BlankImage;
  }, [files]);
  React.useEffect(() => {
    (async () => {
      setUser(await getUser());
    })();
  }, [user?.userId]);
  React.useEffect(() => {
    (async () => {
      let response = await fetch(`${routes.getProfile}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user?.userId }),
      });
      let json = await response.json();
      console.log(json.result.userinfo);
      setUserInfo(json.result.userinfo);

      setFormData({
        ...formData,
        // organizername: json.result.userinfo[0].organizer_name,
        firstname: json.result.userinfo[0].firstname,
        lastname: json.result.userinfo[0].lastname,
        address: json.result.userinfo[0].address,
        longitude: json.result.userinfo[0].latitude,
        latitude: json.result.userinfo[0].longitude,
        short_bio: json.result.userinfo[0].short_bio,
        mobile: json.result.userinfo[0].mobile,
        gender: json.result.userinfo[0].gender,
        user_id: user?.userId,
      });
    })();
  }, [user?.userId]);

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
      address: String(payload.result.formatted_address),
    });

    // SetLocationDetails({ latitude: lat, longitude: lng, address })
  }

  function handleValueChange(value: string, key: string) {
    setFormData({ ...formData, [key]: value });
  }

  const SuccessAlert = async () => {
    setFormData({
      ...formData,
      user_id: user?.userId as string,
    });

    let response = await fetch(BASE_URL + "update_profile", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    let json = await response.json();

    console.log(json);
    //console.log(form)
    if (json.status == "success") {
      SnackBar.show({
        text: json.result,
        type: "LONG",
        actionText: "Ok",
        onActionPress: () => {
          SnackBar.hide();
        },
        backgroundColor: SuccessText,
      });
    }

    const formDataupdate = new FormData();

    formDataupdate.append("userId", user?.userId as string);

    formDataupdate.append("profilePic", mainFile);

    let responseone = await fetch(BASE_URL + "updateProfilePics", {
      method: "POST",
      body: formDataupdate,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    let json1 = await response.json();

    navigation.navigate("U_MyProfileScreen");
  };

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
            address: String(item.label),
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
    <U_ScreenLayout
      HeaderHidden
      VideoHidden
      ProductBuyHidden
      ProductCartHidden
      ProductCheckoutHidden
      //BannerHidden
      title="Edit Profile"
      BannerImage={BannerImage}
    >
      <View style={styles.Container}>
        <View style={styles.InputBlock}>
          <Text style={styles.Heading}>Prayer Profile Image</Text>
          <View style={styles.Input}>
            <ChooseFile files={files} setFiles={setFiles}></ChooseFile>
          </View>
        </View>

        {/* <View style={styles.InputBlock}>
          <Text style={styles.Heading}>Organizer Name</Text>
          <View style={styles.Input}>
            <TextInput

              style={styles.InputField}
              onChangeText={(text) => handleValueChange(text, "organizername")}
              placeholder="Type Here"
            ></TextInput>
            <Image
              style={styles.InputImg}
              source={Back_2}
              resizeMode="contain"
            />
          </View>
        </View> */}

        <View style={styles.InputBlock}>
          <Text style={styles.Heading}>First Name</Text>
          <View style={styles.Input}>
            <TextInput
              defaultValue={
                getuserInfo && getuserInfo[0] ? getuserInfo[0].firstname : ""
              }
              style={styles.InputField}
              onChangeText={(text) => handleValueChange(text, "firstname")}
              placeholder="Type Here"
            ></TextInput>
            <Image
              style={styles.InputImg}
              source={Back_2}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.InputBlock}>
          <Text style={styles.Heading}>Last Name</Text>
          <View style={styles.Input}>
            <TextInput
              defaultValue={
                getuserInfo && getuserInfo[0] ? getuserInfo[0].lastname : ""
              }
              style={styles.InputField}
              onChangeText={(text) => handleValueChange(text, "lastname")}
              placeholder="Type Here"
            ></TextInput>
            <Image
              style={styles.InputImg}
              source={Back_2}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.InputBlock}>
          <Text style={styles.Heading}>Mobile</Text>
          <View style={styles.Input}>
            <TextInput
              defaultValue={
                getuserInfo && getuserInfo[0] ? getuserInfo[0].mobile : ""
              }
              style={styles.InputField}
              onChangeText={(text) => handleValueChange(text, "mobile")}
              placeholder="Type Here"
            ></TextInput>
            <Image
              style={styles.InputImg}
              source={Back_2}
              resizeMode="contain"
            />
          </View>
        </View>

        <Pressable onPress={handleSearch} style={styles.InputBlock}>
          <Text style={styles.Heading}>Address</Text>
          <View style={styles.Input}>
            <TextInput
              editable={false}
              style={styles.InputField}
              defaultValue={
                getuserInfo && getuserInfo[0] ? getuserInfo[0].address : ""
              }
              value={formData.address.slice(0, 40)}
              //onChangeText={(text) => handleFormDataChange("location", text)}
              placeholder="Type Here"
              //value={getuserInfo[0].mobile}
            ></TextInput>
            <Image
              style={styles.InputImg}
              source={Back_2}
              resizeMode="contain"
            />
          </View>
        </Pressable>

        <View style={styles.InputBlock}>
          <Text style={styles.Heading}>Gender</Text>
          <View style={styles.Input}>
            <TextInput
              style={styles.InputField}
              onChangeText={(text) => handleValueChange(text, "gender")}
              defaultValue={
                getuserInfo && getuserInfo[0] ? getuserInfo[0].gender : ""
              }
              placeholder="Type Here"
            ></TextInput>
            <Image
              style={styles.InputImg}
              source={Back_2}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.InputBlock}>
          <Text style={styles.Heading}>About</Text>
          <View style={[styles.Input, styles.CommentInput]}>
            <TextInput
              defaultValue={
                getuserInfo && getuserInfo[0] ? getuserInfo[0].short_bio : ""
              }
              style={[styles.InputField, styles.CommentArea]}
              multiline={true}
              onChangeText={(text) => handleValueChange(text, "short_bio")}
              placeholder="Type Your Message"
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
      </View>

      <Modal
        animationType="slide"
        onRequestClose={() => setisSearchOpen(false)}
        visible={isSearchOpen}
      >
        <View style={styles.searchPopup}>
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
        </View>
      </Modal>

      <ProgressBar loading={loading} />
    </U_ScreenLayout>
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

  ModalBlock: {
    flex: 1,
    height: "100%",
  },
  ModalTop: {
    height: "37%",
    backgroundColor: Black,
    opacity: 0.5,
  },
  ModalBottom: {
    height: "37%",
    backgroundColor: Black,
    opacity: 0.5,
  },
  ModalContainer: {
    height: "26%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  ModalLeft: {
    width: 15,
    backgroundColor: Black,
    opacity: 0.5,
  },
  ModalRight: {
    width: 15,
    backgroundColor: Black,
    opacity: 0.5,
  },
  ModalBack: {
    width: Dimensions.get("window").width - 30,
    backgroundColor: White,
    height: "100%",
    padding: 20,
    justifyContent: "center",
  },
  ModalHeading: {
    fontFamily: "Inter-SemiBold",
    fontSize: 20,
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  ModalSubHeading: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
  },
  ModalBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30,
  },
  ModalBackBtn: {
    height: 45,
    width: "35%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PrimaryColor,
  },
  ModalBackBtnText: {
    color: White,
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
  },
  ModalLogoutBtn: {
    height: 45,
    width: "35%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: PrimaryColor,
  },
  ModalLogoutBtnText: {
    color: PrimaryColor,
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
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
  searchPopup: {
    padding: 8,
    flex: 1,
  },
});
