import React from "react"
import { Modal, View, Text, Pressable } from "react-native"

interface PropType {
    alert: string,
    setAlert: any,
    type: "LONG" | "SHORT"
}
export const TIME_LENGTH = {
    "LONG": 2000,
    "SHORT": 500
}
export default function SnackBar({ alert, setAlert, type }: PropType) {

    if (alert.length > 0) {
        setTimeout(function () {
            setAlert("")
        }, TIME_LENGTH[type])
    }

    return (
        <Modal visible={alert.length > 0} transparent={true}>
            <Pressable
                onPress={() => setAlert(false)}
                style={{
                    flex: 1,
                    padding: 12,
                    zIndex: 99
                }}>
                <View style={{
                    width: "100%",
                    marginTop: "auto",
                    padding: 12,
                    minHeight: 60,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#000000',
                    elevation: 8
                }}>
                    <Text style={{ color: '#ffffff', fontSize: 15 }}>{alert}</Text>
                </View>

            </Pressable>
        </Modal>
    )
}