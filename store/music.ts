import { atom, useAtom } from "jotai";
import { Audio } from "expo-av";

export interface PodcastPlayer {
  coverImage: any;
  artist: string;
  audio: any;
  title: string;
  details: string;
  isliked: string;
  p_id: string;
}

const musicStore = atom<PodcastPlayer | null>(null);

export const useMusicStore = () => useAtom(musicStore);
