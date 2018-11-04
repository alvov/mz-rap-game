import beat1 from "../assets/mp3/beat-1.mp3";
import beat2 from "../assets/mp3/beat-2.mp3";
import beat3 from "../assets/mp3/beat-3.mp3";
import beat4 from "../assets/mp3/beat-4.mp3";
import hats1 from "../assets/mp3/hats-1.mp3";
import hats2 from "../assets/mp3/hats-2.mp3";
import hats3 from "../assets/mp3/hats-3.mp3";
import hats4 from "../assets/mp3/hats-4.mp3";
import bass1 from "../assets/mp3/bass-1.mp3";
import bass2 from "../assets/mp3/bass-2.mp3";
import bass3 from "../assets/mp3/bass-3.mp3";
import bass4 from "../assets/mp3/bass-4.mp3";
import tema1 from "../assets/mp3/tema-1.mp3";
import tema2 from "../assets/mp3/tema-2.mp3";
import tema3 from "../assets/mp3/tema-3.mp3";
import tema4 from "../assets/mp3/tema-4.mp3";

export type LoopStateEnum = "off" | "loading" | "nextOn" | "nextOff" | "active";

export type Category = {|
    id: string,
    name: string,
    color: string,
|};

export type Loop = {|
    id: string,
    categoryId: string,
    groupId: string,
    src: LoopKeyEnum,
    state: LoopStateEnum,
|};

export type News = {|
    id: string,
    text: string,
|};

export type LoopKeyEnum =
    "beat1" |
    "beat2" |
    "beat3" |
    "beat4" |
    "hats1" |
    "hats2" |
    "hats3" |
    "hats4" |
    "bass1" |
    "bass2" |
    "bass3" |
    "bass4" |
    "tema1" |
    "tema2" |
    "tema3" |
    "tema4";

export type ShareThemeEnum = "default" | "inline";
