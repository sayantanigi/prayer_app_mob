import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import { useUser } from "../../../../store/user";
import { googleApiKey, routes } from "../../../../Constant/URL";
import { useNavigation } from "@react-navigation/native";
import { PrimaryColor } from "../../../../Constant/Color";

export const DeleteAccount: React.FC = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [user, setUser] = useUser();
  const navigation = useNavigation<any>();

  useEffect(() => {
    (async () => {
      console.log(user?.userId);
    })();
  }, [user?.userId]);

  async function SuccessAlert() {
    let p_category = await fetch(`${routes.getDeleteAccount}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user?.userId,
      }),
    });
    let p_result = await p_category.json();
    if (p_result.status === "success") {
      Alert.alert("Success", p_result.result);
      navigation.navigate("O_SignInScreen");
    } else {
      Alert.alert("Error", p_result.result);
    }
  }

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            setIsDeleting(true);
            try {
              // Make API request to delete account
              SuccessAlert();
            } catch (error) {
              Alert.alert(
                "Error",
                "Failed to delete account. Please try again later."
              );
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>
        Are you sure you want to delete your account?
      </Text>

      <View style={styles.BtnContainer}>
        <Pressable
          style={styles.BtnBlock1}
          onPress={handleDeleteAccount}
          disabled={isDeleting}
        >
          <Text style={styles.BtnText}>Delete</Text>
        </Pressable>
        <Pressable
          style={styles.BtnBlock2}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.BtnText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Heading: {
    fontFamily: "Inter-Regular",
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: "center",
    marginBottom: 20,
  },
  BtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width - 40,
    gap: 20,
  },
  BtnBlock1: {
    width: 100,
    height: 50,
    borderRadius: 100,
    backgroundColor: PrimaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  BtnBlock2: {
    width: 100,
    height: 50,
    borderRadius: 100,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  BtnText: {
    color: "white",
    fontFamily: "Inter-SemiBold",
    fontSize: 13,
  },
});
