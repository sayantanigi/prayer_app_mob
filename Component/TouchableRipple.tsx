import {
    Animated,
    GestureResponderEvent,
    Pressable,
    PressableProps,
    StyleProp,
    Text,
    ViewStyle,
} from "react-native";
import React, { ReactElement } from "react";
interface TouchableRipple extends PressableProps {
    children: ReactElement | ReactElement[];
    style?: StyleProp<ViewStyle>;
    ripple_color?: string;
}
export default function TouchableRipple(props: TouchableRipple) {
    const scale = React.useRef(new Animated.Value(1)).current;
    const [position, setPosition] = React.useState({ left: 0, top: 0 });
    const opacity = React.useRef(new Animated.Value(0)).current;
    function handleRippleEffect(e: GestureResponderEvent) {
        setPosition({
            left: e.nativeEvent.locationX,
            top: e.nativeEvent.locationY,
        });
        opacity.setValue(1);
        Animated.timing(scale, {
            toValue: 1000,
            duration: 1000,
            useNativeDriver: true,
        }).start();
        Animated.timing(opacity, {
            toValue: 0,
            useNativeDriver: true,
            duration: 1000,
            delay: 50,
        }).start(() => {
            scale.setValue(1);
        });
    }
    return (
        <Pressable
            {...props}
            onPressIn={handleRippleEffect}
            style={[props.style, { overflow: "hidden" }]}
        >
            {props.children}
            <Animated.View
                pointerEvents={"none"}
                style={{
                    backgroundColor: props.ripple_color ?? "rgba(255, 255, 255, 0.5)",
                    position: "absolute",
                    height: "4%",
                    zIndex: 1,
                    borderRadius: 20,
                    transform: [{ scale }],
                    aspectRatio: 1,
                    left: position.left,
                    top: position.top,
                    opacity: opacity,
                }}
            ></Animated.View>
        </Pressable>
    );
}