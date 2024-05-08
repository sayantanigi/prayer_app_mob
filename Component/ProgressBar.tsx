import React from "react";
import { ActivityIndicator, Modal, View } from "react-native";

interface Prop {
  loading: boolean;
}

export default function ProgressBar({ loading }: Prop) {
  return (
    <Modal transparent={true} visible={loading}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#1e1e1e78",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={"#fff"} />
      </View>
    </Modal>
  );
}
