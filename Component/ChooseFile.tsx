import { Pressable, View, StyleSheet, Text } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { White } from "../Constant/Color";
import React from "react";
import { Entypo } from "@expo/vector-icons";

interface ChooseFile {
  setFiles: React.Dispatch<
    React.SetStateAction<DocumentPicker.DocumentPickerAsset[]>
  >;
  files: DocumentPicker.DocumentPickerAsset[];
}
const ChooseFile = (props: ChooseFile) => {
  const { setFiles, files } = props;
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      multiple: false,
      type: "image/*",
    });
    if (result.canceled) return;
    setFiles(result.assets);
  };

  return (
    <View style={styles.ChooseFileBack}>
      <View style={styles.ChooseFileContainer}>
        <Pressable style={styles.ChooseFileInput} onPress={pickDocument}>
          <Entypo name="attachment" size={24} color="black" />
        </Pressable>

        {files.length == 0 ? (
          <View style={styles.ChooseFileData}>
            <Text style={styles.ChooseFileText}>Choose File</Text>
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

export default ChooseFile;
