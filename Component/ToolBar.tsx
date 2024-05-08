import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { White } from "../Constant/Color";
import { useNavigation } from "@react-navigation/native";
import { HeaderIcon_2, Icon_29 } from "../Constant/Images";

interface ToolBar {
  title?: string;
}

export const ToolBar = ({ setDrawer, title }: any) => {
  const navigation = useNavigation<any>();
  const [status, setStatus] = React.useState({});

  return (
    <View style={styles.ToolBarContainer}>
      {/* Back Icon */}
      {navigation.canGoBack() ? (
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.ToolBarBackIconBlock}
        >
          <Image
            style={styles.ToolBarBackIcon}
            source={Icon_29}
            resizeMode="contain"
          ></Image>
        </Pressable>
      ) : (
        <></>
      )}

      {/* Title Text */}
      <View style={styles.ToolBarHeadingBlock}>
        <Text style={styles.ToolBraHeading}>{title}</Text>
      </View>

      {/* Menu Icon */}
      <Pressable onPress={() => setDrawer(true)} style={styles.MenuContainer}>
        <Image style={styles.MenuIcon} source={HeaderIcon_2} resizeMode="contain" />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  ToolBarContainer: {
    height: 60,
    backgroundColor: White,
    elevation: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 10,
  },
  ToolBarBackIconBlock: {
    width: "10%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  ToolBarBackIcon: {
    height: 25,
    width: 25,
  },
  ToolBarHeadingBlock: {
    width: "70%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  ToolBraHeading: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  MenuContainer: {
    width: "20%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  MenuIcon: {
    height: 65,
    width: 65,
  },
});
