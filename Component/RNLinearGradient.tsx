import React, { ReactElement } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type Color = `hsl(${number},${number}%,${number}%)`;

interface RNLinearGradient {
  colors: Color[];
  children: ReactElement | ReactElement[];
  style?: StyleProp<ViewStyle>;
  direction: "row" | "column";
}
function stringToHsl(color: Color) {
  let arrayFormat = color
    .replace("hsl(", "")
    .replace(")", "")
    .replace(/%/g, "")
    .split(",");

  return {
    h: parseInt(arrayFormat[0]),
    s: parseInt(arrayFormat[1]),
    l: parseInt(arrayFormat[2]),
  };
}

function getColorDistance(color1: Color, color2: Color) {
  let color1Format = stringToHsl(color1);
  let color2Format = stringToHsl(color2);

  let colors: (typeof color1Format)[] = [color1Format];
  while (true) {
    let lastColor = colors[colors.length - 1];
    let resTemplate = { ...lastColor };

    if (
      lastColor.h == color2Format.h &&
      lastColor.s == color2Format.s &&
      lastColor.l == color2Format.l
    ) {
      break;
    }

    if (lastColor.h != color2Format.h) {
      resTemplate.h =
        lastColor.h > color2Format.h ? lastColor.h - 1 : lastColor.h + 1;
    }
    if (lastColor.s != color2Format.s) {
      resTemplate.s =
        lastColor.s > color2Format.s ? lastColor.s - 1 : lastColor.s + 1;
    }

    if (lastColor.l != color2Format.l) {
      resTemplate.l =
        lastColor.l > color2Format.l ? lastColor.l - 1 : lastColor.l + 1;
    }

    colors.push(resTemplate);
  }
  return colors;
}
export default function RNLinearGradient(props: RNLinearGradient) {
  const colorsToRender = React.useMemo(() => {
    let colors: { h: number; s: number; l: number }[] = [];

    props.colors.forEach((color1, index) => {
      let color2 = props.colors[index + 1];

      if (!color1 || !color2) return;

      let result = getColorDistance(color1, color2);

      colors = [...colors, ...result];
    });
    return colors;
  }, [props.colors]);
  return (
    <View style={[props.style, { overflow: "hidden" }]}>
      {props.children}
      <View style={[styles.colorRenderBox, { flexDirection: props.direction }]}>
        {colorsToRender.map((color, index) => (
          <View
            style={{
              width: props.direction == "column" ? "100%" : 1,
              height: props.direction == "column" ? 1 : "100%",
              backgroundColor: `hsl(${color.h},${color.s}%,${color.l}%)`,
              flexGrow: 1,
              marginBottom: props.direction == "column" ? -1 : 0,
              marginRight: props.direction == "column" ? -1 : 0,
            }}
            key={index}
          ></View>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  colorRenderBox: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    flexWrap: "wrap",
    alignContent: "stretch",
  },
});
