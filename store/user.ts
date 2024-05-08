import { atom, useAtom } from "jotai";
export interface User {
  userId: string;
  name: string;
  short_bio: string;
  mobile: string;
  gender: string;
  email: string;
  address: string;
  userType: string;
  videos_file: string;
  video_cover_image: string;
  videos_name: string;
  videos_description: string;
  view_count: string;
}

export interface AcademicInfo {
  college: string;
  course: string;
  rank: string;
  graduation_year: string;
  gpa: string;
  act_score: string;
}

export interface ReferenceInfo {
  coachName: string;
  coachEmail: string;
}

export interface GuardianInfo {
  guardian_name: string;
  guardian_email: string;
  guardian_phone: string;
  guardian_relation: string;
}
export const userStore = atom<User | null>(null);

export const useUser = () => useAtom(userStore);
