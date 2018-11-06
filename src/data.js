import { LoopState } from "./consts";
import type { Category, Loop, News } from "./types";

export const categories: Category[] = [
    {
        id: "beats",
        name: "Бит",
        color: "#c67331"
    },
    {
        id: "hihats",
        name: "Хай-хэт",
        color: "#ce9937",
    },
    {
        id: "bass",
        name: "Бас",
        color: "#356de9",
    },
    {
        id: "tune",
        name: "Синт",
        color: "#7639ca",
    },
];

export const loops: Loop[] = [
    {
        id: "bt1",
        categoryId: "beats",
        groupId: "beats",
        src: "beat1",
        state: LoopState.Loading,
    },
    {
        id: "bt2",
        categoryId: "beats",
        groupId: "beats",
        src: "beat2",
        state: LoopState.Loading,
    },
    {
        id: "bt3",
        categoryId: "beats",
        groupId: "beats",
        src: "beat3",
        state: LoopState.Loading,
    },
    {
        id: "bt4",
        categoryId: "beats",
        groupId: "beats",
        src: "beat4",
        state: LoopState.Loading,
    },
    {
        id: "h1",
        categoryId: "hihats",
        groupId: "hihats",
        src: "hats1",
        state: LoopState.Loading,
    },
    {
        id: "h2",
        categoryId: "hihats",
        groupId: "hihats",
        src: "hats2",
        state: LoopState.Loading,
    },
    {
        id: "h3",
        categoryId: "hihats",
        groupId: "hihats",
        src: "hats3",
        state: LoopState.Loading,
    },
    {
        id: "h4",
        categoryId: "hihats",
        groupId: "hihats",
        src: "hats4",
        state: LoopState.Loading,
    },
    {
        id: "b1",
        categoryId: "bass",
        groupId: "bass",
        src: "bass1",
        state: LoopState.Loading,
    },
    {
        id: "b2",
        categoryId: "bass",
        groupId: "bass",
        src: "bass2",
        state: LoopState.Loading,
    },
    {
        id: "b3",
        categoryId: "bass",
        groupId: "bass",
        src: "bass3",
        state: LoopState.Loading,
    },
    {
        id: "b4",
        categoryId: "bass",
        groupId: "bass",
        src: "bass4",
        state: LoopState.Loading,
    },
    {
        id: "t1",
        categoryId: "tune",
        groupId: "tune",
        src: "tema1",
        state: LoopState.Loading,
    },
    {
        id: "t2",
        categoryId: "tune",
        groupId: "tune",
        src: "tema2",
        state: LoopState.Loading,
    },
    {
        id: "t3",
        categoryId: "tune",
        groupId: "tune",
        src: "tema3",
        state: LoopState.Loading,
    },
    {
        id: "t4",
        categoryId: "tune",
        groupId: "tune",
        src: "tema4",
        state: LoopState.Loading,
    },
];

export const news: News[] = [
    {
        id: "0",
        text: "Навальный вышел на свободу после 50 суток ареста",
    },
    {
        id: "1",
        text: "В Москве подожгли храм и воскресную школу",
    },
    {
        id: "2",
        text: "В Красноярском крае пенсионерку обязали выплатить 160 тысяч рублей за продажу односельчанам самодельных «Маши и медведя»",
    },
    {
        id: "3",
        text: "В новосибирской школе девятиклассник напал с ножом на сверстника",
    },
    {
        id: "4",
        text: "Вице-президент Mail.ru предложил создать орган, проверяющий шутки на экстремизм",
    },
    {
        id: "5",
        text: "В Забайкалье следователя заподозрили в хищении вещдоков по делу о хищении вещдоков",
    },
    {
        id: "6",
        text: "В Москве двое полицейских задержаны за стрельбу из травматического пистолета по прохожему",
    },
    {
        id: "7",
        text: "Троих жителей Чебоксар заподозрили в нападении на полицейских после драки в караоке",
    },
    {
        id: "8",
        text: "В Брянской области пресвитера адвентистов оштрафовали после жалобы православной местной жительницы",
    },
    {
        id: "9",
        text: "В Краснодаре после конфликта лесоруба и местной жительницы, выступающей против вырубки леса, один судья осудил обоих",
    },
    {
        id: "10",
        text: "Волгоградского следователя, пообещавшего разбить голову пожилой потерпевшей, заподозрили в превышении полномочий",
    },
    {
        id: "11",
        text: "В Подмосковье пятерых человек арестовали по обвинению в похищении предпринимателей",
    },
];
