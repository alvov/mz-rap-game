import { LoopState } from "./consts";
import type { Category, Loop, News } from "./types";

export const categories: Category[] = [
    {
        id: "beats",
        name: "Бит",
        color: "#af5c14",
    },
    {
        id: "hihats",
        name: "Хай-хэт",
        color: "#be8b1a",
    },
    {
        id: "bass",
        name: "Бас",
        color: "#3462c3",
    },
    {
        id: "tune",
        name: "Синт",
        color: "#7b45af",
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
        link: "https://zona.media/news/2018/10/14/free",
        text: "Навальный вышел на свободу после 50 суток ареста",
    },
    {
        id: "1",
        link: "https://zona.media/news/2018/10/13/fire",
        text: "В Москве подожгли храм и воскресную школу",
    },
    {
        id: "2",
        link: "https://zona.media/news/2018/10/08/masha",
        text: "В Красноярском крае пенсионерку обязали выплатить 160 тысяч рублей за продажу односельчанам самодельных «Маши и медведя»",
    },
    {
        id: "3",
        link: "https://zona.media/news/2018/10/09/school",
        text: "В новосибирской школе девятиклассник напал с ножом на сверстника",
    },
    {
        id: "4",
        link: "https://zona.media/news/2018/10/05/mailru-jokes",
        text: "Вице-президент Mail.ru предложил создать орган, проверяющий шутки на экстремизм",
    },
    {
        id: "5",
        link: "https://zona.media/news/2018/10/03/shagdarov",
        text: "В Забайкалье следователя заподозрили в хищении вещдоков по делу о хищении вещдоков",
    },
    {
        id: "6",
        link: "https://zona.media/news/2018/10/01/policemen",
        text: "В Москве двое полицейских задержаны за стрельбу из травматического пистолета по прохожему",
    },
    {
        id: "7",
        link: "https://zona.media/news/2018/09/19/karaoke",
        text: "Троих жителей Чебоксар заподозрили в нападении на полицейских после драки в караоке",
    },
    {
        id: "8",
        link: "https://zona.media/news/2018/09/18/hm",
        text: "В Брянской области пресвитера адвентистов оштрафовали после жалобы православной местной жительницы",
    },
    {
        id: "9",
        link: "https://zona.media/news/2018/09/11/hutorok",
        text: "В Краснодаре после конфликта лесоруба и местной жительницы, выступающей против вырубки леса, один судья осудил обоих",
    },
    {
        id: "10",
        link: "https://zona.media/news/2018/09/07/sledovatel-bik",
        text: "Волгоградского следователя, пообещавшего разбить голову пожилой потерпевшей, заподозрили в превышении полномочий",
    },
    {
        id: "11",
        link: "https://zona.media/news/2018/09/06/90s",
        text: "В Подмосковье пятерых человек арестовали по обвинению в похищении предпринимателей",
    },
];
