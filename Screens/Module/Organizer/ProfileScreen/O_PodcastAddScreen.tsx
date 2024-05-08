import { useNavigation } from "@react-navigation/native";
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
import { SuccessBack, SuccessText, White } from "../../../../Constant/Color";
import {
  Back_2,
  Back_3,
  BlankImage,
  HomeIcon_4,
} from "../../../../Constant/Images";
import { SnackBar } from "../../../../Component/CustomSnackbar";
import ChooseFile from "../../../../Component/ChooseFile";
import * as DocumentPicker from "expo-document-picker";
import ChooseMp3File from "../../../../Component/ChooseMp3File";
import { getUser, setUser } from "../../../../store/userAsync";
import { useUser } from "../../../../store/user";
import { BASE_URL } from "../../../../Constant/URL";
import ProgressBar from "../../../../Component/ProgressBar";
export default function O_PodcastAddScreen() {
  const [mainFile, setMainfile] = useState<any>(null);
  const [user, setUser] = useUser();
  const [getAudiofile, setVideoMainfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    user_id: "",
    cover_image: "",
    podcast_file: "",
    podcast_name: "",
    podcast_singer_name: "",
    podcast_description: "",
  });
  const navigation = useNavigation<any>();
  const [files, setFiles] = React.useState<
    DocumentPicker.DocumentPickerAsset[]
  >([]);

  const [files1, setFiles1] = React.useState<
    DocumentPicker.DocumentPickerAsset[]
  >([]);

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
  const AudioVideofile = React.useMemo(() => {
    if (files1.length > 0) {
      setVideoMainfile({
        type: files1[0].mimeType as string,
        name: files1[0].name,
        uri: files1[0].uri,
      });
      return { uri: files1[0].uri };
    }
    return BlankImage;
  }, [files1]);
  function handleValueChange(value: string, key: string) {
    setForm({ ...form, [key]: value });
  }

  // SnackBar Alert

  const SuccessAlert = async () => {
    const formData = new FormData();

    formData.append("user_id", user?.userId as string);
    formData.append("cover_image", mainFile);
    formData.append("podcast_file", getAudiofile);
    formData.append("podcast_name", form.podcast_name);
    formData.append("podcast_singer_name", form.podcast_singer_name);
    formData.append("podcast_description", form.podcast_description);
    setLoading(true);
    let response = await fetch(BASE_URL + "add_podcast", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    let json = await response.json();
    setLoading(false);
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
    navigation.goBack();
  };

  return (
    <O_ScreenLayout
      HeaderHidden
      VideoHidden
      ProductBuyHidden
      ProductCartHidden
      ProductCheckoutHidden
      title="Add Podcast"
      BannerHeading="Add your Podcast"
      BannerImage={BannerImage}
    >
      <View style={styles.Container}>
        <View style={styles.InputBlock}>
          <Text style={styles.Heading}>Podcast Image Cover</Text>
          <View style={styles.Input}>
            <ChooseFile files={files} setFiles={setFiles}></ChooseFile>
          </View>
        </View>
        <View style={styles.InputBlock}>
          <Text style={styles.Heading}>Podcast File</Text>
          <View style={styles.Input}>
            <ChooseMp3File files={files1} setFiles={setFiles1}></ChooseMp3File>
          </View>
        </View>
        <View style={styles.InputBlock}>
          <Text style={styles.Heading}>Podcast Name</Text>
          <View style={styles.Input}>
            <TextInput
              style={styles.InputField}
              onChangeText={(text) => handleValueChange(text, "podcast_name")}
              placeholder="Podcast Name"
            ></TextInput>
            <Image
              style={styles.InputImg}
              source={Back_2}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.InputBlock}>
          <Text style={styles.Heading}>Podcast Singer Name</Text>
          <View style={styles.Input}>
            <TextInput
              style={styles.InputField}
              onChangeText={(text) =>
                handleValueChange(text, "podcast_singer_name")
              }
              placeholder="Podcast Singer Name"
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
              placeholder="Type Your Message"
              onChangeText={(text) =>
                handleValueChange(text, "podcast_description")
              }
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
});
