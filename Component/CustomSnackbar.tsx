import React from "react";
import { ReactElement, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
interface ProviderType {
    children: ReactElement
}
interface ConfigType {
    textColor?: string;
    text?: string;
    backgroundColor?: string;
    actionText?: string;
    onActionPress?: () => any;
    actionTextColor?: string;
    type?: "SHORT" | "MEDIUM" | "LONG"
}
function config(config: ConfigType) {
    let state = config
    let subscribers = new Set<(newValue: ConfigType) => void>()

    return {
        get: () => state,
        set: (newValue: ConfigType) => {
            state = { ...state, ...newValue }
            subscribers.forEach((func) => {
                func(state)
            })
        },
        subscribe: (func: (newValue: ConfigType) => void) => {
            subscribers.add(func)
        }
    }
}
const SnackBarConfig = config({
    text: '',
    textColor: '#ffffff',
    backgroundColor: '#000000',
    actionText: '',
    actionTextColor: '#21b676',
    type: "SHORT",
    onActionPress: () => {

    }
})
let previousTimeOutId : any;
function useConfig(state: ReturnType<typeof config>) {
    const [config, setConfig] = useState(state.get())

    useEffect(() => {
        state.subscribe(setConfig)
    }, [])

    return [config]
}

const timeMap = {
    "SHORT": 1000,
    "MEDIUM": 2000,
    "LONG": 4000
}
function hideSnackBar() {
    let previousTimeOutId = setTimeout(() => {
        SnackBarConfig.set({ text: '' })
        if(previousTimeOutId) {
            clearTimeout(previousTimeOutId)
        }
    }, timeMap[SnackBarConfig.get().type ?? "SHORT"])
}
export const SnackBar = {
    show: (config: Partial<ConfigType>) => {
        if(previousTimeOutId) {
            clearTimeout(previousTimeOutId)
        }
        SnackBarConfig.set(config)
        hideSnackBar();

    },
    hide: () => {
        SnackBarConfig.set({ text: ""})
    }
}
function SnackBarComponent() {
    const [config] = useConfig(SnackBarConfig)
    return (
        <View
            style={{ ...styles.SnackBarContainer, display: config.text?.length! > 0 ? 'flex' : "none" }}
        >
            <View style={[styles.SnackBar, { backgroundColor: config.backgroundColor}]}>
                <Text style={styles.SnackBarText}>
                    {config.text}
                </Text>
                <Text onPress={config.onActionPress} style={{ ...styles.SnackBarAction, color: config.actionTextColor }}>
                    {config.actionText}
                </Text>
            </View>
        </View>
    )
}

export function SnackBarProvider({ children }: ProviderType) {
    return (
        <>
            {children}
            <SnackBarComponent />
        </>
    )
}
const styles = StyleSheet.create({
    SnackBarContainer: {
        padding: 8,
        justifyContent: "flex-end",
        width: '100%',
        height: 55,
        position: 'absolute',
        bottom: 0,
        left: 0

    },
    SnackBar: {
        width: '100%',
        height: 55,
        marginVertical: 12,
        backgroundColor: '#000000',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between',
        elevation: 3

    },
    SnackBarText: {
        color: '#ffffff',
        fontSize: 15
    },
    SnackBarAction: {
        textTransform: 'uppercase',
        fontWeight: "bold"
    }
})