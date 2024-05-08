import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export function useSwipe(onSwipeBottom?: any, rangeOffset = 4) {

    let firstTouch = 0
    function onTouchStart(e: any) {
        firstTouch = e.nativeEvent.pageY
    }

    function onTouchEnd(e: any) {
        const positionY = e.nativeEvent.pageY
        const range = windowWidth / rangeOffset

        if (positionY - firstTouch > range) {
            onSwipeBottom && onSwipeBottom()
        }
    }

    return { onTouchStart, onTouchEnd };
}
export function useSwipeHorizontal(onSwipeRight?: any, rangeOffset = 4) {

    let firstTouch = 0
    function onTouchStart(e: any) {
        firstTouch = e.nativeEvent.pageX
    }

    function onTouchEnd(e: any) {
        const positionX = e.nativeEvent.pageX
        const range = windowWidth / rangeOffset

        if (positionX - firstTouch > range) {
            onSwipeRight && onSwipeRight()
        }
    }

    return { onTouchStart, onTouchEnd };
}
