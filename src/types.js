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
import news6 from "../assets/mp3/news-6.mp3";
import news7 from "../assets/mp3/news-7.mp3";
import news8 from "../assets/mp3/news-8.mp3";
import news9 from "../assets/mp3/news-9.mp3";
import news10 from "../assets/mp3/news-10.mp3";
import news11 from "../assets/mp3/news-11.mp3";
import news12 from "../assets/mp3/news-12.mp3";
import news13 from "../assets/mp3/news-13.mp3";
import news14 from "../assets/mp3/news-14.mp3";
import news15 from "../assets/mp3/news-15.mp3";
import news16 from "../assets/mp3/news-16.mp3";
import news17 from "../assets/mp3/news-17.mp3";
import news18 from "../assets/mp3/news-18.mp3";
import news19 from "../assets/mp3/news-19.mp3";
import news20 from "../assets/mp3/news-20.mp3";

export type LoopStateEnum = "off" | "loading" | "nextOn" | "nextOff" | "active";

export type Category = {|
  id: string,
  name: string,
  color: string,
|};

export type Loop = {|
  id: string,
  state: LoopStateEnum,
  categoryId: string,
  groupId: string,
  src: LoopKeyEnum,
|};

export type Shot = {|
  id: string,
  state: LoopStateEnum,
  duration: number,
  src: LoopKeyEnum,
  cache?: string,
  volume?: number,
  categoryId?: string,
  // $FlowFixMe
  meta?: any,
|};

export type News = {|
  id: string,
  state: LoopStateEnum,
  duration: number,
  link: string,
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
  "tema4" |
  "fx1" |
  "fx2" |
  "fx3" |
  "fx4" |
  "news1" |
  "news2" |
  "news3" |
  "news4" |
  "news5" |
  "news6" |
  "news7" |
  "news8" |
  "news9" |
  "news10" |
  "news11" |
  "news12" |
  "news13" |
  "news14" |
  "news15" |
  "news16" |
  "news17" |
  "news18" |
  "news19" |
  "news20" |
  "news21" |
  "news22" |
  "news23";

export type ShareThemeEnum = "default" | "inline";
