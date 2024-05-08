import React from "react";
import { TextInput, StyleSheet, Text, Pressable, ViewStyle, TextInputProps, View } from "react-native";
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { TouchableRipple } from "react-native-paper";


interface IFilterButton {
    onPress?: () => void
}
interface ISearchBar extends TextInputProps {
    onPress?: () => void;
    label?: string;
    onBackButtonPress?: () => void;
    style?: ViewStyle;
    onSelect?:()=>void;
}
export function FilterButton({
    onPress
}: IFilterButton) {
    return (
        <TouchableRipple
            onPress={onPress}
            style={styles.filterButton}>
            <FontAwesome
                name="sliders" style={styles.filterIcon} />
        </TouchableRipple>
    )
}

export function BackButton({
    onPress
}: IFilterButton) {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.filterButton, { backgroundColor: "transparent" }]}>
            <AntDesign

                name="arrowleft"
                style={[styles.filterIcon, { color: "#000" }]} />
        </Pressable>
    )
}


export default function Searchbar({
    onPress,
    label,
    style,
    onSelect
}: ISearchBar) {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.searchbar, style]}>

            <Text>{label || "Search"}</Text>
            <FontAwesome
                style={{
                    fontSize: 15
                }}
                name="search" />
        </Pressable>
    )
}
export function SearchbarEditable({
    onPress,
    label,
    onBackButtonPress,
    onChangeText,
    


}: ISearchBar) {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.searchbar, { width: "100%" }]}>
            <BackButton onPress={onBackButtonPress} />
            <TextInput
                onChangeText={onChangeText}
                style={{ flexGrow: 1 }}
                
                placeholder={label || "Search"} />
            <FontAwesome
                style={{
                    fontSize: 15
                }}
                name="search" />

                
        </Pressable>

        
    )
}

const styles = StyleSheet.create({
    searchbar: {
        width: "85%",
        height: 40,
        backgroundColor: "#ececec",
        flexDirection: "row",
        alignItems: "center",
        padding: 7,
        justifyContent: "space-between"
    },
    filterIcon: {
        fontSize: 21,
        color: "#fff",
        fontWeight: "200"
    },
    filterButton: {
        height: 40,
        width: 40,
        alignItems: "center",
        backgroundColor: "#000",
        borderRadius: 20,
        justifyContent: "center"
    }
})