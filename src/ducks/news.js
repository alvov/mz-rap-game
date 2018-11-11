import type {LoopStateEnum, News} from "../types";
import type {RootState} from "./index";
import {LoopState} from "../consts";

export const SET_NEWS = "news/SET_NEWS";
export const SET_NEWS_STATE = "news/SET_NEWS_STATE";
export const SET_NEWS_DURATION = "news/SET_NEWS_DURATION";
export const STOP_ALL_NEWS = "news/STOP_ALL_NEWS";

export type NewsState = News[];

const initialState: NewsState = [];

type SetNewsAction = {|
  +type: typeof SET_NEWS,
  +payload: News[],
|}

export function setNews(news: News[]): SetNewsAction {
  return {
    type: SET_NEWS,
    payload: news,
  };
}

export type NewsStateById = {|
  +id: string,
  +state: LoopStateEnum,
|}
type SetNewsStateAction = {|
  +type: typeof SET_NEWS_STATE,
  +payload: NewsStateById,
|}

export function setNewsState(newsState: NewsStateById): SetNewsStateAction {
  return {
    type: SET_NEWS_STATE,
    payload: newsState,
  }
}

export type NewsDurationById = {|
  +id: string,
  +duration: number,
|}
type SetNewsDurationAction = {|
  +type: typeof SET_NEWS_DURATION,
  +payload: NewsDurationById,
|}

export function setNewsDuration(newsDuration: NewsDurationById): SetNewsDurationAction {
  return {
    type: SET_NEWS_DURATION,
    payload: newsDuration,
  };
}

type StopAllNewsAction = {
  type: typeof STOP_ALL_NEWS,
}
export function stopAllNews(): StopAllNewsAction {
  return {
    type: STOP_ALL_NEWS,
  }
}

type NewsAction = SetNewsAction | SetNewsStateAction | SetNewsDurationAction;

export function newsReducer(state: NewsState = initialState, action: NewsAction): NewsState {
  switch (action.type) {
    case SET_NEWS:
      return [
        ...action.payload,
      ];
    case SET_NEWS_STATE: {
      const payload = action.payload;
      return state.reduce((newState, news) => {
        if (news.id === payload.id) {
          news.state = payload.state;
        } else if (payload.state === LoopState.Active) {
          // turn off another active news
          news.state = LoopState.Off;
        }
        newState.push(news);
        return newState;
      }, []);
    }
    case SET_NEWS_DURATION: {
      const payload = action.payload;
      return state.reduce((newState, news) => {
        if (news.id === payload.id) {
          news.duration = payload.duration;
        }
        newState.push(news);
        return newState;
      }, []);
    }
    case STOP_ALL_NEWS: {
      return state.map(news => {
        news.state = LoopState.Off;
        return news;
      });
    }
    default:
      return state;
  }
}

export function selectState(rootState: RootState): NewsState {
  return rootState.news;
}
