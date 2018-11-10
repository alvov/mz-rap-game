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
        link: "https://zona.media/news/2015/26/10/tazik",
        text: "Челябинец утонул в тазу с бельем",
    },
    {
        id: "1",
        link: "https://zona.media/news/2015/16/07/kolesa",
        text: "Сотрудника транспортной полиции Челябинска, который снимал колеса с чужого «Мерседеса», задержали рабочие-мигранты",
    },
    {
        id: "2",
        link: "https://zona.media/news/2017/05/31/kuzbass",
        text: "Житель Кузбасса украл железнодорожный шлагбаум, чтобы сделать дома водопровод",
    },
    {
        id: "3",
        link: "https://zona.media/news/2014/03/09/v-amurskoy-oblasti-osuzhden-pokhititel-elektronnogo-brasleta-u-osuzhdennogo-",
        text: "В Амурской области суд вынес условный приговор похитителю электронного браслета у осужденного",
    },
    {
        id: "4",
        link: "https://zona.media/news/2014/12/11/only-lovers-left-alive",
        text: "Жительницы закрытого города Вилючинска угрожали взорвать здание полиции, требуя освободить своих сожителей",
    },
    {
        id: "5",
        link: "https://zona.media/news/2014/28/11/hitriuga",
        text: "Алтайский участковый сначала попросил знакомого собрать для него конопли, а потом задержал его",
    },
    {
        id: "6",
        link: "https://zona.media/news/2015/29/01/iznasiloval-za-krazhu",
        text: "Тюменский полицейский изнасиловал отказавшуюся признаваться в магазинной краже женщину",
    },
    {
        id: "7",
        link: "https://zona.media/news/2015/03/02/vydumka-gibdd",
        text: "Алтайские полицейские составляли протоколы о превышении скорости на жителей, не имеющих ни машины, ни прав",
    },
    {
        id: "8",
        link: "https://zona.media/news/2015/26/02/omsk_forma",
        text: "Омский полицейский осужден за продажу формы на рынке",
    },
    {
        id: "9",
        link: "https://zona.media/news/2015/14/10/veloblogger-s-toporom",
        text: "В Красноярске неизвестные напали с топором на блогера-велосипедиста, разоблачающего автомобилистов",
    },
    {
        id: "10",
        link: "https://zona.media/news/2016/23/03/shaverma",
        text: "В Петербурге недовольный качеством шаурмы мужчина напал с ножом на повара",
    },
    {
        id: "11",
        link: "https://zona.media/news/2018/05/17/zub",
        text: "В Петербурге житель Ленобласти сломал зуб о шаурму и в отместку попытался ограбить кафе",
    },
    {
        id: "12",
        link: "https://zona.media/news/2014/05/09/v-nizhegorodskoy-oblasti-arestovan-politseyskiy-izbivshiy-obrativshegosya-s-zayavleniem-o-propazhe-k",
        text: "В Нижегородской области арестован полицейский, избивший обратившегося с заявлением о пропаже кота мужчину",
    },
    {
        id: "13",
        link: "https://zona.media/news/2017/12/01/ond",
        text: "Житель города Дно, планировавший убийство обидчика, по ошибке застрелил случайного прохожего, который приехал на похороны матери",
    },
    {
        id: "14",
        link: "https://zona.media/news/2017/11/22/kuzb",
        text: "В Кемеровской области похоронный агент украл тело из морга ради 7 тысяч рублей",
    },
    {
        id: "15",
        link: "https://zona.media/news/2015/21/09/mest-gribnika",
        text: "Житель Архангельской области убил женщину, которая собирала грибы на его поляне",
    },
    {
        id: "16",
        link: "https://zona.media/news/2017/10/01/chervi",
        text: "Иркутский губернатор подарил детям из малообеспеченных семей конфеты с белыми червями",
    },
    {
        id: "17",
        link: "https://zona.media/news/2016/05/09/pizza",
        text: "Осужденный из оренбургской колонии получил пять лет за заказ суши и пиццы на имя следователей и прокуроров",
    },
    {
        id: "18",
        link: "https://zona.media/news/2016/10/04/psikhanul",
        text: "Омича осудили за убийство знакомого, избиение подростка, попытку тройного убийства, разбой и изнасилование, совершенные в один день",
    },
    {
        id: "19",
        link: "https://zona.media/news/2017/08/08/most",
        text: "Уральца, прикрепившего к себе подушку для имитации «взрывчатки», осудили за ложную угрозу взорвать мост",
    },
    {
        id: "20",
        link: "https://zona.media/news/2016/11/10/babushka",
        text: "Под Ростовом у семьи украли контейнер с телом бабушки, скончавшейся по пути на море",
    },
    {
        id: "21",
        link: "https://zona.media/news/2015/05/08/cherdaki-politsii",
        text: "На чердаке райотдела полиции в Краснодарском крае 40 лет лежал труп человека",
    },
    {
        id: "22",
        link: "https://zona.media/news/2015/08/10/ugnali-skoruyu-ukrali-seyf",
        text: "Архангельские подростки угнали «скорую помощь», чтобы вывезти украденный сейф",
    },
];
