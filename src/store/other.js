import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const authUserAtom = atomWithStorage('user',{});
export const roadmapAtom = atom();