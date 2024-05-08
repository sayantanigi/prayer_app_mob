import { Animated, Dimensions, PanResponder, StyleSheet, View } from "react-native";
import { PrimaryColor as colorPrimary } from "../Constant/Color";
import React from "react";


const windowWidth = Dimensions.get('window').width - 40;
interface RangeIOS {
    onChange?: (value: number) => void;
    value?: number;
}
function RangeIOS(props: RangeIOS) {
    const pan = React.useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const trackRef = React.useRef<View>(null);

    const panResponder = React.useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
            onPanResponderRelease: (e, gestureState) => {

                pan.extractOffset();
            },
        }),
    ).current;

    const translateX = pan.x.interpolate({
        inputRange: [0, windowWidth - 26],
        outputRange: [0, windowWidth - 26],
        extrapolate: 'clamp'
    })
    const width = pan.x.interpolate({
        inputRange: [0, windowWidth],
        outputRange: [0, windowWidth],
        extrapolate: "clamp"
    })
   
     

    React.useEffect(() => {
        if (props.value) {
            let sliderWidth = props.value * windowWidth / 100
            pan.x.setValue(sliderWidth)
        }
    }, [props.value])

    return (
        <View


            style={iosStyle.rangeWrap}>
            <View
                pointerEvents="none"
                style={iosStyle.rangeTrack}>
                <Animated.View
                    ref={trackRef}
                    style={[iosStyle.rangeTrackActive, { width }]}>

                </Animated.View>
            </View>
            <Animated.View
                {...panResponder.panHandlers}
                onTouchEnd={() => {
                    console.log("Touch End")
                    trackRef.current!.measure((...measurement) => {
                        let width = measurement[2]
                        let sliderWidth = width;
                        let percentage = sliderWidth / windowWidth * 100;
                        props.onChange?.(+percentage.toFixed(2))
                    })
                }}
                style={[iosStyle.rangeThumb, { transform: [{ translateX }] }]}>

            </Animated.View>
        </View>
    )
}

const iosStyle = StyleSheet.create({
    rangeWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8
    },
    rangeTrack: {
        width: windowWidth,
        height: 4,
        borderRadius: 7,
        backgroundColor: 'hsla(0,0%,0%,0.1)',
        overflow: 'hidden'
    },
    rangeTrackActive: {
        width: 0,
        height: 4,
        backgroundColor: colorPrimary
    },
    rangeThumb: {
        height: 26,
        width: 26,
        borderRadius: 13,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        position: 'absolute',
        left: 0
    }
})

export const Range = RangeIOS