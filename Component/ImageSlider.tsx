import React from "react";
import { ReactElement } from "react";
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  FlatList,
} from "react-native";
import { PrimaryColor, White } from "../Constant/Color";

interface ImageSlider {
  data: any[];
  renderItem: (data: any) => ReactElement;
  style?: StyleProp<ViewStyle>;
  slideStyle?: ViewStyle;
  interval?: number;
  activeIndicatorColor?: string;
  indicatorStyle?: ViewStyle;
  indicatorColor?: string;
}

export default function ImageSlider(props: ImageSlider) {
  const listRef = React.useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const totalSlide = props.data.length - 1;
  function RenderTemplate({ item }: any) {
    return (
      <View style={[styles.itemWrapper, props.slideStyle]}>
        {props.renderItem(item)}
      </View>
    );
  }

  React.useEffect(() => {
    let intervalId = setTimeout(() => {
      let newCurrent = activeIndex < totalSlide ? activeIndex + 1 : 0;
      listRef.current?.scrollToIndex({
        animated: true,
        index: newCurrent,
      });
      setActiveIndex(newCurrent);
    }, props.interval ?? 1500);

    return () => clearTimeout(intervalId);
  }, [props.interval, activeIndex]);

  return (
    <View>
      <FlatList
        ref={listRef}
        horizontal
        style={[styles.listView, props.style]}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        snapToInterval={
          (props.slideStyle?.width as any) ?? Dimensions.get("window").width
        }
        disableIntervalMomentum
        data={props.data}
        renderItem={RenderTemplate}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(
            event.nativeEvent.contentOffset.x /
              event.nativeEvent.layoutMeasurement.width +
              0.5
          );
          setActiveIndex(index);
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          zIndex: 1,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          height: 40,
        }}
      >
        {new Array(props.data.length).fill(0).map((_, index) => (
          <View
            key={index}
            style={[
              {
                width: 10,
                height: 10,
                backgroundColor:
                  activeIndex == index
                    ? props.activeIndicatorColor ?? PrimaryColor
                    : props.indicatorColor ?? White,
                borderRadius: 50,
              },
              props.indicatorStyle,
            ]}
          ></View>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  listView: {},
  itemWrapper: {
    width: Dimensions.get("window").width,
  },
});
