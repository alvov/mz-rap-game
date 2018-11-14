import type {RootState} from "./index";
import type {ThunkDispatch} from 'redux-thunk';
import * as analytic from '../analytics';
import {getShareLink} from "../utils/utils";
import {API_URL} from "../consts";

export const SET_IS_RECORDING = "record/SET_IS_RECORDING";
export const SET_IS_PLAYING_RECORD = "record/SET_IS_PLAYING_RECORD";
export const SET_GENERATED_LINK = "record/SET_GENERATED_LINK";
export const SET_GENERATED_RECORD = "record/SET_GENERATED_RECORD";
export const ADD_LOOPS = "record/ADD_LOOPS";
export const ADD_SHOT = "record/ADD_SHOT";
export const SET_RECORD_FROM_GENERATED = "record/SET_RECORD_FROM_GENERATED";
export const SET_GENERATED_LINK_LOADING = "record/SET_GENERATED_LINK_LOADING";
export const CLEAR_RECORD = "record/CLEAR_RECORD";

export type RecordLoops = string[];
export type RecordShot = {|
  +id: string,
  +start: number,
  +end?: number,
|};

export type GeneratedRecord = {|
  +loops: RecordLoops[],
  +shots: RecordShot[],
  +loopsStartTimestamp: number | null,
|}

export type RecordState = {|
  +startTimestamp: number | null,
  +isRecording: boolean,
  +isPlayingRecord: boolean,
  +loops: RecordLoops[],
  +shots: RecordShot[],
  +loopsStartTimestamp: number | null,
  +recordLink: string,
  +generatedRecord: GeneratedRecord | null,
  +recordLinkIsLoading: boolean
|};

const initialState: RecordState = {
  startTimestamp: null,
  loopsStartTimestamp: null,
  isRecording: false,
  isPlayingRecord: false,
  loops: [],
  shots: [],
  recordLink: '',
  generatedRecord: null,
  recordLinkIsLoading: false
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

type AddShotAction = {|
  +type: typeof ADD_SHOT,
  +payload: RecordShot;
|}

export function addShot({id, start, end}: RecordShot): AddShotAction {
  return {
    type: ADD_SHOT,
    payload: {id, start, end},
  }
}

export type SetGenerateLink = {|
  +loops: Array<RecordLoops>,
  +loopsStartTimestamp: number,
  +shots: Array<RecordShot>
|}

type RapRecData = {|
  +guid: string
|}

export const setGenerateLink = () => async (dispatch: ThunkDispatch, getState: () => RootState): Promise<void> | void => {
  try {
    const state = getState();
    const loops = selectRecordLoops(state);
    const loopsStartTimestamp = selectLoopsStartTimestamp(state);
    const shots = selectRecordShots(state);
    if (loops.length === 0 && shots.length === 0) {
      return;
    }
    const dataJSON: SetGenerateLink = {
      loops,
      loopsStartTimestamp: loopsStartTimestamp === null ? 0 : loopsStartTimestamp,
      shots,
    };

    dispatch({
      type: SET_GENERATED_LINK_LOADING
    });

    const res: Response = await fetch(API_URL, {
      method: 'POST', //
      body: JSON.stringify(dataJSON), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) return;

    const data: RapRecData = await res.json();
    const guid = data.guid;

    if (typeof guid !== 'string') return;

    dispatch({
      type: SET_GENERATED_LINK,
      payload: getShareLink(guid),
    })
  } catch (e) {
    console.error("Error with recording a song: ", e);
  }
};

export type GetGenerateLink = {|
  +guid: string
|}

type GeneratedRecData = {|
  +data: GeneratedRecord
|}

export const getGeneratedRecord = ({guid}: GetGenerateLink) => async (dispatch: ThunkDispatch): Promise<void> | void => {
  try {
    const res: Response = await fetch(API_URL + `?rec=${guid}`, {
      method: 'GET', //
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) return;

    const jsonRes: GeneratedRecData = await res.json();
    const data = jsonRes.data;

    dispatch({
      type: SET_GENERATED_RECORD,
      payload: data
    });
  } catch (e) {
    console.error("Error with loading recorded song: ", e);
  }
};

type ClearRecordAction = {|
  +type: typeof CLEAR_RECORD
|}

export function clearRecord(): ClearRecordAction {
  return {
    type: CLEAR_RECORD,
  }
}

type SetRecordFromGeneratedAction = {|
  +type: typeof SET_RECORD_FROM_GENERATED
|}

export function setRecordFromGenerated(): SetRecordFromGeneratedAction {
  return {
    type: SET_RECORD_FROM_GENERATED,
  }
}

type RecordAction = SetIsRecordingAction |
  SetIsPlayingAction |
  AddLoopsAction |
  AddShotAction |
  SetRecordFromGeneratedAction;

export function recordReducer(state: RecordState = initialState, action: RecordAction): RecordState {
  switch (action.type) {
    case SET_IS_RECORDING: {
      if (action.payload) {
        analytic.GAStartRecord();
        return {
          ...initialState,
          recordLink: state.recordLink,
          isRecording: true,
        };
      } else {
        analytic.GAStopRecord();
        return {
          ...state,
          startTimestamp: null,
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
    case SET_GENERATED_LINK: {
      return {
        ...state,
        recordLink: action.payload,
        recordLinkIsLoading: false
      }
    }
    case SET_GENERATED_LINK_LOADING: {
      return {
        ...state,
        recordLinkIsLoading: true
      }
    }
    case SET_GENERATED_RECORD: {
      return {
        ...state,
        generatedRecord: action.payload
      }
    }
    case ADD_LOOPS: {
      const startTimestamp = state.startTimestamp === null
        ? Date.now()
        : state.startTimestamp;
      const loopsStartTimestamp = state.loopsStartTimestamp === null
        ? Date.now() - startTimestamp
        : state.loopsStartTimestamp;
      const loops = [...state.loops, action.payload];
      return {
        ...state,
        loops,
        startTimestamp,
        loopsStartTimestamp,
      };
    }
    case ADD_SHOT: {
      const startTimestamp = state.startTimestamp === null
        ? action.payload.start
        : state.startTimestamp;
      const shot = {
        ...action.payload,
        // Hotfix for avoiding negative start times
        start: Math.max(action.payload.start - startTimestamp, 0),
      };
      return {
        ...state,
        shots: [...state.shots, shot],
        startTimestamp,
      };
    }
    case SET_RECORD_FROM_GENERATED: {
      return {
        ...state,
        ...state.generatedRecord,
      };
    }
    case CLEAR_RECORD: {
      return initialState;
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

export function selectLoopsStartTimestamp(state: RootState): number | null {
  return selectState(state).loopsStartTimestamp;
}

export function selectRecordLoops(state: RootState): RecordLoops[] {
  return selectState(state).loops;
}

export function selectRecordShots(state: RootState): RecordShot[] {
  return selectState(state).shots;
}

export function selectRecordLink(state: RootState): string {
  return selectState(state).recordLink;
}

export function selectRecordLinkIsLoading(state: RootState): boolean {
  return selectState(state).recordLinkIsLoading;
}

export function selectHasRecord(state: RootState): boolean {
  return !selectIsRecording(state) && (
    selectRecordLoops(state).length !== 0 ||
    selectRecordShots(state).length !== 0
  );
}

export function selectGeneratedRecord(state: RootState): GeneratedRecord | null {
  return selectState(state).generatedRecord;
}
