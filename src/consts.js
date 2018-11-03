import type { LoopStateEnum } from "./types";

export const LoopState: { [string]: LoopStateEnum } = {
    Off: "off",
    Loading: "loading",
    NextOn: "nextOn",
    NextOff: "nextOff",
    Active: "active",
};

export const MAXIMUM_RECORD_TURNS = 32;
export const MAXIMUM_NEWS_READ = 15;
export const BPM = 90;
export const BEATS_IN_LOOP = 16;
export const LOOP_DURATION_SEC = BEATS_IN_LOOP / (BPM / 60);
