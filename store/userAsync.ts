import AsyncStorage from "@react-native-async-storage/async-storage"

export async function setUser(user: any) {
    try {
        return await AsyncStorage.setItem("@userdata", JSON.stringify(user))
    } catch {
        return {}
    }
}
export async function getUser() {
    try {
        return JSON.parse(await AsyncStorage.getItem("@userdata") as string)
    } catch(err) {
        console.log(err)
        return {}
    }
}
export async function clearUser() {
    try {
        return await AsyncStorage.clear()
    } catch {
        return {}
    }
}

