import React from "react";
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
} from "react-native";
import { SuccessText } from "../Constant/Color";

interface SwitchIOS {
  pathColor?: string;
  pathColorActive?: string;
  value?: boolean;
  onChangeValue?: (value: boolean) => void;
  buttonColor?: string;
  buttonColorActive?: string;
  disabled?: boolean;
  style?: StyleProp<PressableProps>;
}
function SwitchIOS(props: SwitchIOS) {
  const [check, setCheck] = React.useState(props.value ?? false);
  const translateX = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (check) {
      Animated.timing(translateX, {
        useNativeDriver: true,
        easing: Easing.circle,
        toValue: 30,
        duration: 300,
      }).start(() => {
        props.onChangeValue?.(check);
      });
    } else {
      Animated.timing(translateX, {
        useNativeDriver: true,
        easing: Easing.circle,
        toValue: 0,
        duration: 300,
      }).start(() => {
        props.onChangeValue?.(check);
      });
    }
  }, [check]);

  const color = translateX.interpolate({
    inputRange: [0, 30],
    outputRange: [
      props.pathColor ?? "hsla(0, 0%, 0%, 0.3)",
      props.pathColorActive ?? SuccessText,
    ],
  });
  return (
    <Pressable
      style={[
        {
          opacity: props.disabled ? 0.7 : 1,
          pointerEvents: props.disabled ? "none" : "auto",
        },
        props.style,
      ]}
      onPress={() => setCheck(!check)}
    >
      <Animated.View style={[iosStyle.switch, { backgroundColor: color }]}>
        <Animated.View
          style={[
            iosStyle.switchButton,
            { transform: [{ translateX }] },
            { backgroundColor: props.buttonColor ?? "#fff" },
          ]}
        ></Animated.View>
      </Animated.View>
    </Pressable>
  );
}
function SwitchAndroid(props: SwitchIOS) {
  const [check, setCheck] = React.useState(props.value ?? false);
  const translateX = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (check) {
      Animated.timing(translateX, {
        useNativeDriver: true,
        easing: Easing.circle,
        toValue: 22,
        duration: 300,
      }).start(() => {
        props.onChangeValue?.(check);
      });
    } else {
      Animated.timing(translateX, {
        useNativeDriver: true,
        easing: Easing.circle,
        toValue: 0,
        duration: 300,
      }).start(() => {
        props.onChangeValue?.(check);
      });
    }
  }, [check]);

  const backgroundcolor = translateX.interpolate({
    inputRange: [0, 22],
    outputRange: [
      props.pathColor ?? "hsla(0, 0%, 0%, 0.3)",
      props.pathColorActive ?? "hsla(218, 100%, 61%, 0.6)",
    ],
  });

  const color = translateX.interpolate({
    inputRange: [0, 22],
    outputRange: [
      props.buttonColor ?? "#fff",
      props.pathColorActive ?? "hsla(218, 100%, 61%, 1)",
    ],
  });

  return (
    <Pressable
      style={[
        androidStyle.switchWrap,
        {
          opacity: props.disabled ? 0.7 : 1,
          pointerEvents: props.disabled ? "none" : "auto",
        },
        props.style,
      ]}
      onPress={() => setCheck(!check)}
    >
      <Animated.View
        style={[androidStyle.switch, { backgroundColor: backgroundcolor }]}
      ></Animated.View>
      <Animated.View
        style={[androidStyle.switchButtonWrap, { transform: [{ translateX }] }]}
      >
        <Pressable
          onPress={() => setCheck(!check)}
          style={androidStyle.switchButtonWrap}
        >
          <Animated.View
            style={[androidStyle.switchButton, { backgroundColor: color }]}
          ></Animated.View>
        </Pressable>
      </Animated.View>
    </Pressable>
  );
}

const iosStyle = StyleSheet.create({
  switch: {
    width: 55,
    height: 25,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 15,
    padding: 4,
  },
  switchButton: {
    height: 25,
    width: 25,
    backgroundColor: "#fff",
    borderRadius: 13,
    flexShrink: 1,
    aspectRatio: 1,
  },
});
const androidStyle = StyleSheet.create({
  switch: {
    width: 45,
    height: 15,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 15,
    padding: 4,
    overflow: "visible",
  },
  switchButton: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    borderRadius: 12,
    aspectRatio: 1,
    elevation: 3,
  },
  switchWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchButtonWrap: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0)",
    position: "absolute",
    left: -7,
    borderRadius: 25,
  },
});

export const Switch = Platform.select({
  ios: SwitchIOS,
  default: SwitchIOS,
});
