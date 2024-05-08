import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Pressable,
  Image
} from "react-native";
import { StatusBarBack, White } from "../Constant/Color";
import { Back_6, Icon_38 } from "../Constant/Images";

const EventTimeAccordion = ({
  children,
  weekInfo
}: {
  children: any;
  weekInfo: string
}) => {
  const [open, setOpen] = useState(false);
  const animatedController = useRef(new Animated.Value(0)).current;
  const [bodySectionHeight, setBodySectionHeight] = useState<number>(0);

  const bodyHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bodySectionHeight],
  });

  const arrowAngle = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ["0rad", `${Math.PI}rad`],
  });

  const toggleListItem = () => {
    if (open) {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 0,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 1,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    }
    setOpen(!open);
  };

  return (
    <>
      {/* Top Part */}
      <View style={styles.EventTimeAccordionHead}>
        <View style={styles.EventTimeHeadContainer}>
          <Text style={styles.EventTimeDateText}>{weekInfo}</Text>
        </View>
        <Pressable style={styles.EventCalPress} onPress={() => toggleListItem()}>
          <Image style={styles.EventCalIcon} source={Icon_38}
            resizeMode="contain"
          />
        </Pressable>
        <Image style={styles.EventTimeTableBack} source={Back_6}
          resizeMode="cover"
        />
      </View>

      {/* Data Part */}
      <Animated.View style={[styles.BodyBackground, { height: bodyHeight }]}>
        <View
          style={styles.BodyContainer}
          onLayout={(event) =>
            setBodySectionHeight(event.nativeEvent.layout.height)
          }
        >
          {children}
        </View>
      </Animated.View>
    </>
  );
};
export default EventTimeAccordion;

const styles = StyleSheet.create({
  // Event Head
  EventTimeAccordionHead: {
    position: "relative",
    alignSelf: "center",
    justifyContent: "center",
    height: 60,
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
  },
  EventTimeHeadContainer: {
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
  },
  EventTimeDateText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16.5,
    color: White,
    paddingLeft: 10,
    paddingRight: 10,
  },
  EventCalIcon: {
    width: 45,
    height: 45,
  },
  EventCalPress: {
    position: "absolute",
    right: 30,
    zIndex: 1,
  },
  EventTimeTableBack: {
    height: 60,
    width: "100%",
    borderRadius: 100
  },

  // Event Body
  BodyBackground: {
    overflow: "hidden",
  },
  BodyContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: StatusBarBack,
  },
});
