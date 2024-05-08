import { atom, useAtom, useSetAtom } from "jotai";

export const tempstore = atom<any>({})

export const useTempStore = () => useAtom(tempstore)

export const useTempStoreSet = () => useSetAtom(tempstore)