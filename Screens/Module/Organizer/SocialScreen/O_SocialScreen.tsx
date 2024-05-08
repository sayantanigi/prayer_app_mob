import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
  Modal,
} from "react-native";
import {
  BackgroundColor,
  Black,
  PrimaryColor,
  Shadow,
  SuccessText,
  TextColor,
  White,
} from "../../../../Constant/Color";
import * as ImagePicker from "expo-image-picker";
import { useSwipe } from "../../../../hooks/onSwipe";
import { AntDesign } from "@expo/vector-icons";
import {
  BlankImage,
  HomeIcon_4,
  Icon_15,
  Icon_16,
  Icon_24,
  Icon_25,
  Icon_26,
  Icon_33,
  Icon_34,
} from "../../../../Constant/Images";
import { useUser } from "../../../../store/user";
import { getUser } from "../../../../store/userAsync";
import { SnackBar } from "../../../../Component/CustomSnackbar";
import { BASE_URL, routes } from "../../../../Constant/URL";
import * as DocumentPicker from "expo-document-picker";
import O_ScreenLayout from "../O_ScreenLayout";

export interface UserProfile {
  fullname: string;
  profilePic: string;
  userId: string;
}
export interface SocialList {
  id: string;
  organizername: string;
  firstname: string;
  lastname: string;
  profilePic: string;
  social_img: string;
  created_date: string;
  liked: string;
  comment: string;
}
export default function O_SocialScreen() {
  const navigation = useNavigation<any>();
  const [image, setImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { onTouchStart, onTouchEnd } = useSwipe(handleBottomSwipe);
  const [user, setUser] = useUser();
  const [mainFile, setMainfile] = useState<any>(null);
  const [getUserList, setUserList] = useState<UserProfile[]>([]);
  const [getSocialList, setSocialList] = useState<SocialList[]>([]);
  const [likeShow, setLikeShow] = useState(true);
  const [likeStatus, setLikeStatus] = useState<any>({});

  const [files, setFiles] = React.useState<
    DocumentPicker.DocumentPickerAsset[]
  >([]);
  // Image Picker
  const BannerImage = React.useMemo(() => {
    if (files.length > 0) {
      setMainfile({
        type: files[0].mimeType as string,
        name: files[0].name,
        uri: files[0].uri,
      });
      return { uri: files[0].uri };
    }
    // return BlankImage;
  }, [files]);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      multiple: false,
      type: "image/*",
    });
    if (result.canceled) return;
    setFiles(result.assets);
  };
  const uriToBlob = async (uri: any) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };
  React.useEffect(() => {
    (async () => {
      let response = await fetch(`${routes.getSocial_user_list}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let json = await response.json();
      setUserList(json.result);
    })();
  }, [user?.userId]);

  React.useEffect(() => {
    (async () => {
      setUser(await getUser());
      let response = await fetch(`${routes.getsocialListByUser}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user?.userId }),
      });
      let json = await response.json();
      setSocialList(json.result === "No Data Found" ? [] : json.result);
    })();
  }, [user?.userId]);

  // Gesture Handle
  function handleBottomSwipe() {
    setModalVisible(!modalVisible);
  }

  const SuccessAlert = async () => {
    const data = new FormData();
    console.log(mainFile);
    data.append("user_id", user?.userId as string);

    data.append("social_img", mainFile, "image.jpg");

    let response = await fetch(BASE_URL + "add_social_post", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    let json = await response.json();

    console.log(json);
    //console.log(form)
    if (json.status === "success") {
      handleBottomSwipe();
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
  };
  async function Profilereload(uderid: string) {
    let response = await fetch(`${routes.getsocialListByUser}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: uderid }),
    });
    let json = await response.json();
    setSocialList(json.result);
  }

  async function likeData(value: string, postid: string) {
    let response = await fetch(`${routes.getuser_post_like}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user?.userId,
        post_id: postid,
        isLiked: value,
      }),
    });

    console.log({
      user_id: user?.userId,
      post_id: postid,
      islike: value,
    });
    let json = await response.json();
    console.log(JSON.stringify(json));

    if (json.status === "success") {
    }
  }

  return (
    <O_ScreenLayout
      HeaderHidden
      BannerHidden
      VideoHidden
      ProductBuyHidden
      ProductCartHidden
      ProductCheckoutHidden
      title="Social"
    >
      <View style={styles.Container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          style={styles.TopSection}
        >
          {/* Add Image */}
          <Pressable
            style={styles.AddImageBlock}
            onPress={() => setModalVisible(true)}
          >
            <View style={styles.AddImageContainer}>
              <Image
                style={styles.AddImage}
                source={Icon_24}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.AddImageText}>Add</Text>
          </Pressable>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
          >
            {/* Single Profile Block */}

            {Array.isArray(getUserList) &&
              getUserList?.map(function (item: UserProfile, index: number) {
                return (
                  <Pressable
                    key={index}
                    onPress={() => Profilereload(item.userId)}
                    style={styles.ProfileBlock}
                  >
                    <Image
                      style={styles.ProfileImage}
                      source={{ uri: item.profilePic }}
                      resizeMode="cover"
                    />
                    <Text style={styles.ProfileText}>{item.fullname}</Text>
                  </Pressable>
                );
              })}
          </ScrollView>
        </ScrollView>

        {/* Single Post Block */}
        {/* {new Array(5).fill(0).map((item, Postindex) => (
          <View key={Postindex} style={styles.PostBlock}>
            <View style={styles.PostTop}>
              <Image
                style={styles.PostProfile}
                source={BlankImage}
                resizeMode="cover"
              />
              <Text style={styles.PostName}>User Name</Text>
            </View>

            <Image style={styles.PostImage} source={BlankImage} />

            <View style={styles.PostBottom}>
              <Pressable style={styles.PostLikeBtn}>
                <Image
                  style={styles.PostImg}
                  source={Icon_16}
                  resizeMode="contain"
                />
                <Text style={styles.PostText}>200</Text>
              </Pressable>
              <Pressable
                style={styles.PostCommentBtn}
                onPress={() => navigation.navigate("U_SocialCommentScreen")}
              >
                <Image
                  style={styles.PostImg}
                  source={Icon_25}
                  resizeMode="contain"
                />
                <Text style={styles.PostText}>25</Text>
              </Pressable>
              <Pressable style={styles.PostShareBtn}>
                <Image
                  style={styles.PostImg}
                  source={Icon_26}
                  resizeMode="contain"
                />
              </Pressable>
            </View>
          </View>
        ))} */}

        {getSocialList &&
          getSocialList?.length > 0 &&
          getSocialList?.map(function (item: SocialList, index: number) {
            const isLiked = likeStatus[item.id] ?? item.liked === "1";

            return (
              <View key={index} style={styles.PostBlock}>
                <View style={styles.PostTop}>
                  <Image
                    style={styles.PostProfile}
                    source={{ uri: item.profilePic }}
                    resizeMode="cover"
                  />
                  <Text style={styles.PostName}>
                    {item.firstname} {item.lastname}
                  </Text>
                </View>

                <Image
                  style={styles.PostImage}
                  source={{ uri: item.social_img }}
                />

                <View style={styles.PostBottom}>
                  <Pressable
                    onPress={() => {
                      setLikeStatus({ ...likeStatus, [item.id]: !isLiked });
                      likeData(isLiked ? "0" : "1", item.id);
                    }}
                    style={styles.PostLikeBtn}
                  >
                    <Image
                      source={isLiked ? Icon_15 : Icon_16}
                      style={{ height: 20, width: 20 }}
                      resizeMode="contain"
                    />
                    <Text style={styles.PostText}>{item.liked}</Text>
                  </Pressable>

                  {/* <Pressable style={styles.PostLikeBtn}>
                  <Image
                    style={styles.PostImg}
                    source={Icon_16}
                    resizeMode="contain"
                  />
                  <Text style={styles.PostText}>{item.liked}</Text>
                </Pressable> */}

                  {/* {likeShow ? (
                  <>
                    <Pressable
                      onPress={() => {
                        setLikeShow(!likeShow);
                        likeData("1", item.id);
                      }}
                      style={styles.PostLikeBtn}
                    >
                      <Image
                        source={Icon_16}
                        style={{ height: 20, width: 20 }}
                        resizeMode="contain"
                      />
                      <Text style={styles.PostText}>{item.liked}</Text>
                    </Pressable>
                  </>
                ) : (
                  <Pressable
                    style={styles.PostLikeBtn}
                    onPress={() => {
                      setLikeShow(!likeShow);

                      likeData("0", item.id);
                    }}
                  >
                    <Image
                      source={Icon_15}
                      style={{ height: 20, width: 20 }}
                      resizeMode="contain"
                    />
                    <Text style={styles.PostText}>{item.liked}</Text>
                  </Pressable>
                )} */}

                  <Pressable
                    style={styles.PostCommentBtn}
                    onPress={() =>
                      navigation.navigate("U_SocialCommentScreen", item.id)
                    }
                  >
                    <Image
                      style={styles.PostImg}
                      source={Icon_25}
                      resizeMode="contain"
                    />
                    <Text style={styles.PostText}>{item.comment}</Text>
                  </Pressable>
                  <Pressable style={styles.PostShareBtn}>
                    <Image
                      style={styles.PostImg}
                      source={Icon_26}
                      resizeMode="contain"
                    />
                  </Pressable>
                </View>
              </View>
            );
          })}
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

              {/* After Upload Image */}
              {BannerImage && (
                <View style={styles.UploadBlock}>
                  <Image source={BannerImage} style={styles.UploadImage} />
                  <View style={styles.UploadBtnContainer}>
                    <Pressable style={styles.UploadBtn} onPress={SuccessAlert}>
                      <Text style={styles.UploadBtnText}>Submit</Text>
                      <Image style={styles.UploadBtnBack} source={HomeIcon_4} />
                    </Pressable>
                  </View>
                </View>
              )}

              <View style={styles.ModalAddContainer}>
                <Text style={styles.ModalAddText}>Add Post</Text>
                <Pressable style={styles.ModalAddBtn} onPress={pickDocument}>
                  <AntDesign name="plus" size={25} color="white" />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </O_ScreenLayout>
  );
}

const styles = StyleSheet.create({
  Container: {},
  TopSection: {
    marginBottom: 20,
  },

  // Add Image Block
  AddImageBlock: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  AddImageContainer: {
    backgroundColor: White,
    borderRadius: 100,
    height: 60,
    width: 60,
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  AddImage: {
    width: 22,
    height: 22,
  },
  AddImageText: {
    fontFamily: "Inter-Medium",
    fontSize: 12,
    marginTop: 5,
  },

  // Profile Block
  ProfileBlock: {
    padding: 20,
    paddingLeft: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  ProfileImage: {
    height: 60,
    width: 60,
    borderRadius: 100,
  },
  ProfileText: {
    fontFamily: "Inter-Medium",
    fontSize: 12,
    marginTop: 5,
  },

  // Post Block
  PostBlock: {
    width: Dimensions.get("window").width - 40,
    alignSelf: "center",
    backgroundColor: White,
    shadowColor: Black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    borderRadius: 15,
    marginBottom: 20,
  },
  PostTop: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  PostProfile: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  PostName: {
    paddingLeft: 10,
    fontFamily: "Inter-Medium",
    fontSize: 14,
  },
  PostImage: {
    width: "100%",
    height: 300,
  },
  PostBottom: {
    padding: 10,
    paddingBottom: 15,
    paddingTop: 15,
    flexDirection: "row",
  },
  PostLikeBtn: {
    backgroundColor: White,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 50,
    height: 40,
    marginRight: 10,
  },
  PostCommentBtn: {
    backgroundColor: White,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 50,
    height: 40,
    marginRight: 10,
  },
  PostShareBtn: {
    backgroundColor: White,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 100,
    height: 40,
    width: 40,
  },
  PostImg: {
    width: 15,
    height: 15,
  },
  PostText: {
    paddingLeft: 10,
    fontFamily: "Inter-Medium",
    fontSize: 13,
  },

  // Modal
  ModalContainer: {
    backgroundColor: Shadow,
    height: "100%",
  },
  ModalBody: {
    position: "absolute",
    width: "100%",
    height: "55%",
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
  ModalAddContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 30,
  },
  ModalAddBtn: {
    shadowColor: Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 60,
    width: 60,
    backgroundColor: PrimaryColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  ModalAddText: {
    fontFamily: "Inter-Medium",
    fontSize: 15,
    marginBottom: 10,
  },

  // Upload Image
  UploadBlock: {
    position: "absolute",
    top: 30,
    left: 20,
    right: 20,
    bottom: 20,
    marginBottom: 0,
    zIndex: 1,
    height: "auto",
    backgroundColor: BackgroundColor,
  },
  UploadImage: {
    width: Dimensions.get("window").width - 60,
    height: 300,
    borderRadius: 15,
    alignSelf: "center",
  },
  UploadBtnContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  UploadBtn: {
    elevation: 10,
    backgroundColor: White,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: 120,
    height: 50,
    position: "relative",
    alignSelf: "center",
    marginTop: 30,
  },
  UploadBtnText: {
    color: White,
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    zIndex: 1,
  },
  UploadBtnBack: {
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
