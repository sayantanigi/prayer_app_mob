import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import O_ScreenLayout from "../O_ScreenLayout";
import {
  ErrorText,
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
import ChooseFile from "../../../../Component/ChooseFile";
import { SnackBar } from "../../../../Component/CustomSnackbar";
import * as DocumentPicker from "expo-document-picker";
import moment from "moment";
import { useUser } from "../../../../store/user";
import { getUser } from "../../../../store/userAsync";
import { BASE_URL } from "../../../../Constant/URL";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ProgressBar from "../../../../Component/ProgressBar";

export default function O_PrayerAddScreen() {
  const [showatePicker, setShowDatePicker] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useUser();
  const navigation = useNavigation<any>();
  const [fileName, setFileName] = useState("No File Chosen");
  const [mainFile, setMainfile] = useState<any>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = React.useState({});

  const [date, setDate] = useState(new Date());
  const [files, setFiles] = React.useState<
    DocumentPicker.DocumentPickerAsset[]
  >([]);
  // SnackBar Alert

  const [form, setForm] = useState({
    user_id: "",
    prayer_name: "",
    prayer_subheading: "",
    prayer_datetime: "",
    prayer_description: "",
    prayer_location: "",
  });

  useEffect(() => {
    (async () => {
      setUser(await getUser());
    })();
  }, []);
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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (dateTime: any) => {
    const formattedDateTime = moment(dateTime).format("YYYY-MM-DDTHH:mm");
    //console.log("A date has been picked: ", formattedDateTime);
    //setInputValue(moment(date).format("YYYY-MM-DD HH:mm"));
    setInputValue(formattedDateTime);
    //setDate(); // Fix: Update the type of 'date' to be a string
    hideDatePicker();
  };
  function handleValueChange(value: string, key: string) {
    setForm({ ...form, [key]: value });
  }

  const SuccessAlert = async () => {
    const formData = new FormData();

    if (form.prayer_name === "" || form.prayer_name == null) {
      SnackBar.show({
        text: "Please add Prayer name.",
        type: "LONG",
        actionText: "Ok",

        onActionPress: () => {
          SnackBar.hide();
        },
        backgroundColor: PrimaryColor,
      });
      return;
    } else if (
      form.prayer_subheading === "" ||
      form.prayer_subheading == null
    ) {
      SnackBar.show({
        text: "Please add Prayer Sub Heading.",
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
      formData.append("user_id", user?.userId as string);
      formData.append("prayer_name", form.prayer_name);
      formData.append("prayer_subheading", form.prayer_subheading);
      formData.append("prayer_datetime", inputValue);
      formData.append("prayer_description", form.prayer_description);
      formData.append("prayer_image", mainFile);

      let response = await fetch(BASE_URL + "add_prayer", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      let json = await response.json();

      // console.log(json);
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

  return (
    <O_ScreenLayout
      HeaderHidden
      VideoHidden
      ProductBuyHidden
      ProductCartHidden
      ProductCheckoutHidden
      title="Add Prayer"
      BannerHeading="Add your Prayer Details"
      BannerImage={BannerImage}
    >
      <View style={styles.Container}>
        <View style={styles.InputBlock}>
          <Text style={styles.Heading}>Prayer Cover Image</Text>
          <View style={styles.Input}>
            <ChooseFile files={files} setFiles={setFiles}></ChooseFile>
          </View>
        </View>
        <View style={styles.InputBlock}>
          <Text style={styles.Heading}>Prayer Name</Text>
          <View style={styles.Input}>
            <TextInput
              style={styles.InputField}
              onChangeText={(text) => handleValueChange(text, "prayer_name")}
              placeholder="Prayer Name"
            ></TextInput>
            <Image
              style={styles.InputImg}
              source={Back_2}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.InputBlock}>
          <Text style={styles.Heading}>Prayer Sub Heading</Text>
          <View style={styles.Input}>
            <TextInput
              style={styles.InputField}
              onChangeText={(text) =>
                handleValueChange(text, "prayer_subheading")
              }
              placeholder="Prayer Sub Heading"
            ></TextInput>
            <Image
              style={styles.InputImg}
              source={Back_2}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.InputBlock}>
          <Text style={styles.Heading}>Date & Time</Text>
          <View style={styles.Input}>
            <Pressable
              style={styles.DateTimeInputField}
              onPress={() => showDatePicker()}
            ></Pressable>
            <TextInput
              editable={false}
              style={styles.DateTimeInnerInputField}
              value={inputValue}
              onChangeText={(text) =>
                handleValueChange(text, "prayer_datetime")
              }
              keyboardType="decimal-pad"
              placeholder="Date & Time"
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
              style={[styles.InputField, styles.CommentArea]}
              multiline={true}
              onChangeText={(text) =>
                handleValueChange(text, "prayer_description")
              }
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

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
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
  DateTimeInnerInputField: {
    zIndex: 1,
    width: 300,
    height: 60,
    paddingLeft: 25,
    paddingRight: 25,
    position: "absolute",
  },
  DateTimeInputField: {
    width: 300,
    height: 60,
    position: "absolute",
    zIndex: 10,
    paddingLeft: 300,
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
});
