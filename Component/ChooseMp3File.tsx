import { Pressable, View, StyleSheet, Text } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { White } from "../Constant/Color";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

interface ChooseMp3File {
  setFiles: React.Dispatch<
    React.SetStateAction<DocumentPicker.DocumentPickerAsset[]>
  >;
  files: DocumentPicker.DocumentPickerAsset[];
}

const ChooseMp3File = (props: ChooseMp3File) => {
  const getFileInfo = async (fileUri: string) => {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    return fileInfo;
  };

  const isLessThanTheMB = (fileSize: number, smallerThanSizeMB: number) => {
    const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB;
    return isOk;
  };
  const { setFiles, files } = props;
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      multiple: false,
      type: ["audio/mpeg", "video/*"],
    });
    if (result.canceled) return;
    if (result.assets.length === 0) return;
    const fileInfo = await getFileInfo(result.assets[0]?.uri);
    if (!fileInfo.exists) {
      alert("Dont Exits");
      return;
    }
    if (result.assets[0].mimeType?.split("/").shift() === "video") {
      const isLt5MB = isLessThanTheMB(fileInfo.size, 5);
      if (!isLt5MB) {
        alert(`Video size must be smaller than 5MB!`);
        return;
      }
    }

    setFiles(result.assets);
  };

  console.log(files);

  return (
    <View style={styles.ChooseFileBack}>
      <View style={styles.ChooseFileContainer}>
        <Pressable style={styles.ChooseFileInput} onPress={pickDocument}>
          <Entypo name="attachment" size={24} color="black" />
        </Pressable>

        {files.length == 0 ? (
          <View style={styles.ChooseFileData}>
            <Text style={styles.ChooseFileText}>
              Upload Your (Video/Audio) File
            </Text>
          </View>
        ) : (
          <></>
        )}
        {files.map((file, index) => (
          <View style={styles.ChooseFileData} key={index}>
            <Text style={styles.ChooseFileText}>{file.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ChooseFileBack: {},
  ChooseFileContainer: {
    backgroundColor: White,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
    borderRadius: 10,
    height: 55,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  ChooseFileInput: {
    backgroundColor: "#F3F3F3",
    width: "15%",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  ChooseFileData: {
    width: "80%",
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  ChooseFileText: {
    fontFamily: "Inter-Regular",
    fontSize: 13,
  },
});

export default ChooseMp3File;
