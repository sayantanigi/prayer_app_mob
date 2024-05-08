import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, ViewProps, Pressable, Linking, StyleProp, ViewStyle, TextStyle } from "react-native";

interface Link extends ViewProps {
  to: string;
  style: StyleProp<ViewStyle> | StyleProp<TextStyle>
}

export default function Link(props: Link) {
  const navigation = useNavigation<any>();

  function handleLink() {
    if (props.to.includes("https://")) {
      Linking.openURL(props.to);
    } else {
      navigation.navigate(props.to);
    }
  }
  return (
    <>
      {typeof props.children == "string" ? (
        <Text {...props} onPress={handleLink} />
      ) : (
        <Pressable {...props} onPress={handleLink} />
      )}
    </>
  );
}
