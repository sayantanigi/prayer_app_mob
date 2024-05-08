import React from "react";
import { View, Image, Pressable, StyleSheet } from "react-native";
import { White } from "../Constant/Color";
import { useNavigation } from "@react-navigation/native";
import { HeaderIcon_1, HeaderIcon_2 } from "../Constant/Images";

export const Header = ({ setDrawer, title }: any) => {
  const navigation = useNavigation<any>();
  const [status, setStatus] = React.useState({});

  return (
    <View style={styles.HeaderContainer}>
      {/* Logo Portion */}
      <Image
        source={HeaderIcon_1}
        resizeMode="contain"
        style={{ width: 100, height: 60 }}
      ></Image>

      {/* Menu Icon */}
      <Pressable onPress={() => setDrawer(true)} style={styles.MenuContainer}>
        <Image style={styles.MenuIcon} source={HeaderIcon_2} resizeMode="contain" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderContainer: {
    height: 60,
    backgroundColor: White,
    elevation: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 25,
    paddingRight: 10,
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
