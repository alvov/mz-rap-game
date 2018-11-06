import type { RootState } from "./index";
import type { ThunkDispatch } from 'redux-thunk';
import * as analytic from '../analytics';
export const SET_IS_RECORDING = "record/SET_IS_RECORDING";
export const SET_IS_PLAYING_RECORD = "record/SET_IS_PLAYING_RECORD";
export const SET_IS_GENERATE_LINK = "record/SET_IS_GENERATE_LINK";
export const ADD_LOOPS = "record/ADD_LOOPS";
export const ADD_NEWS = "record/ADD_NEWS";

export type RecordLoops = string[];
export type RecordNews = {|
    +id: string,
    +timestamp: number,
|};

export type RecordState = {|
    +startTimestamp: number | null,
    +isRecording: boolean,
    +isPlayingRecord: boolean,
    +loops: RecordLoops[],
    +news: RecordNews[],
    +recordLink: string
|};

const initialState: RecordState = {
    startTimestamp: null,
    isRecording: false,
    isPlayingRecord: false,
    loops: [],
    news: [],
    recordLink: ''
};

type SetIsRecordingAction = {|
    +type: typeof SET_IS_RECORDING,
    +payload: boolean;
|}

export function setIsRecording(value: boolean): SetIsRecordingAction {
    return {
        type: SET_IS_RECORDING,
        payload: value,
    }
}

type SetIsPlayingAction = {|
    +type: typeof SET_IS_PLAYING_RECORD,
    +payload: boolean;
|}

export function setIsPlayingRecord(value: boolean): SetIsPlayingAction {
    return {
        type: SET_IS_PLAYING_RECORD,
        payload: value,
    }
}

type AddLoopsAction = {|
    +type: typeof ADD_LOOPS,
    +payload: RecordLoops;
|}

export function addLoops(loops: RecordLoops): AddLoopsAction {
    return {
        type: ADD_LOOPS,
        payload: loops,
    }
}

type AddNewsAction = {|
    +type: typeof ADD_NEWS,
    +payload: RecordNews;
|}

export function addNews({ id, timestamp }: RecordNews): AddNewsAction {
    return {
        type: ADD_NEWS,
        payload: { id, timestamp },
    }
}

export type SetGenerateLink = {|
  +loops: Array<RecordLoops>,
  +news: Array<RecordNews>
|}

type RapRecData = {|
  +guid: string
|}

export const setGenerateLink = ({loops, news}: SetGenerateLink) => async (dispatch: ThunkDispatch): Promise<void> | void => {
  try {
    if (loops.length) {
      const url = `${location.origin}/api/rap_rec`;
      const dataJSON = {
        loops,
        shots: news
      };

      console.log(url, dataJSON);

      const res: Response = await fetch(url, {
        method: 'POST', //
        body: JSON.stringify(dataJSON), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data: RapRecData = await res.json();
      const guid = data.guid;

      if(typeof guid !== 'string') return;

      dispatch({
        type: SET_IS_GENERATE_LINK,
        payload: `${location.origin}${location.pathname}?r=${guid}`
      })
    }
  } catch(e) {
    console.log(e)
  }
};

export type GetGenerateLink = {|
  +guid: string
|}

export const getGenerateLink = ({guid}: GetGenerateLink) => async (dispatch: ThunkDispatch): Promise<void> | void => {
  try {
    if (guid) {
      const url = `${location.origin}/api/rap_rec`;

      const res: Response = await fetch(url + `?rec=${guid}`, {
        method: 'GET', //
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data: Response = await res.json();

      console.log(data);

      if(typeof guid !== 'string') return;

      dispatch({
        type: SET_IS_GENERATE_LINK,
        payload: `${location.origin}${location.pathname}?r=${guid}`
      })
    }
  } catch(e) {
    console.log(e)
  }
};

type RecordAction = SetIsRecordingAction |
    SetIsPlayingAction |
    AddLoopsAction |
    AddNewsAction;

export function recordReducer(state: RecordState = initialState, action: RecordAction): RecordState {
    switch (action.type) {
        case SET_IS_RECORDING: {
            if (action.payload) {
                analytic.GAStartRecord();
                return {
                    ...initialState,
                    isRecording: true,
                };
            } else {
                analytic.GAStopRecord();
                return {
                    ...state,
                    isRecording: false,
                };
            }
        }
        case SET_IS_PLAYING_RECORD: {
            return {
                ...state,
                isPlayingRecord: action.payload,
            };
        }
        case SET_IS_GENERATE_LINK: {
          return {
            ...state,
            recordLink: action.payload
          }
        }
        case ADD_LOOPS: {
            return {
                ...state,
                startTimestamp: state.startTimestamp === null ?
                    Date.now() :
                    state.startTimestamp,
                loops: [...state.loops, action.payload],
            };
        }
        case ADD_NEWS: {
            return {
                ...state,
                news: [...state.news, action.payload],
            };
        }
        default:
            return state;
    }
}

export function selectState(rootState: RootState): RecordState {
    return rootState.record;
}

export function selectIsRecording(state: RootState): boolean {
    return selectState(state).isRecording;
}

export function selectIsPlayingRecord(state: RootState): boolean {
    return selectState(state).isPlayingRecord;
}

export function selectStartTimestamp(state: RootState): number | null {
    return selectState(state).startTimestamp;
}

export function selectRecordLoops(state: RootState): RecordLoops[] {
    return selectState(state).loops;
}

export function selectRecordNews(state: RootState): RecordNews[] {
    return selectState(state).news;
}

export function selectRecordLink(state: RootState): string {
  return selectState(state).recordLink;
}

export function selectHasRecord(state: RootState): boolean {
    return !selectIsRecording(state) && selectRecordLoops(state).length !== 0;
}
