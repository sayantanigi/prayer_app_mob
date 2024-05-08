import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";

export const currencyFormatter = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
});
export const atomWithAsyncStorage = <T extends unknown>(
  key: string,
  initialValue: T
) => {
  const baseAtom = atom(initialValue);
  baseAtom.onMount = (setValue) => {
    (async () => {
      const item = await AsyncStorage.getItem(key);
      setValue(JSON.parse(item!));
    })();
  };
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update: T) => {
      const nextValue =
        typeof update === "function" ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      AsyncStorage.setItem(key, JSON.stringify(nextValue));
    }
  );
  return derivedAtom;
};
