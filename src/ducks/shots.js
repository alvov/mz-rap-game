import {LoopState} from "../consts";
import type {LoopStateEnum, Shot} from "../types";
import type {RootState} from "./index";

export const SET_SHOTS = "shots/SET_SHOTS";
export const SET_SHOT_STATE = "shots/SET_SHOT_STATE";
export const SET_SHOT_DURATION = "shots/SET_SHOT_DURATION";
export const STOP_ALL_SHOTS = "shots/STOP_ALL_SHOTS";

export type ShotsState = Shot[];

const initialState: ShotsState = [];

type SetShotsAction = {|
  +type: typeof SET_SHOTS,
  +payload: Shot[],
|}

export function setShots(shots: Shot[]): SetShotsAction {
  return {
    type: SET_SHOTS,
    payload: shots,
  };
}

export type ShotStateById = {|
  +id: string,
  +state: LoopStateEnum,
|}
type SetShotStateAction = {|
  +type: typeof SET_SHOT_STATE,
  +payload: ShotStateById,
|}

export function setShotState(shotState: ShotStateById): SetShotStateAction {
  return {
    type: SET_SHOT_STATE,
    payload: shotState,
  };
}

export type ShotDurationById = {|
  +id: string,
  +duration: number,
|}
type SetShotDurationAction = {|
  +type: typeof SET_SHOT_DURATION,
  +payload: ShotDurationById,
|}

export function setShotDuration(shotDuration: ShotDurationById): SetShotDurationAction {
  return {
    type: SET_SHOT_DURATION,
    payload: shotDuration,
  };
}

type StopAllShotsAction = {|
  +type: typeof STOP_ALL_SHOTS,
|}

export function stopAllShots(): StopAllShotsAction {
  return {
    type: STOP_ALL_SHOTS,
  };
}

type ShotsAction = SetShotsAction |
  SetShotStateAction |
  SetShotDurationAction |
  StopAllShotsAction;

export function shotsReducer(state: ShotsState = initialState, action: ShotsAction): ShotsState {
  switch (action.type) {
    case SET_SHOTS:
      return [
        ...action.payload,
      ];
    case SET_SHOT_STATE: {
      const payload = action.payload;
      return state.reduce((result, shot) => {
        if (shot.id === payload.id) {
          result.push({
            ...shot,
            state: payload.state,
          });
        } else {
          result.push(shot);
        }
        return result;
      }, []);
    }
    case SET_SHOT_DURATION: {
      const payload = action.payload;
      return state.reduce((result, shot) => {
        if (shot.id === payload.id) {
          result.push({
            ...shot,
            duration: payload.duration,
          });
        } else {
          result.push(shot);
        }
        return result;
      }, []);
    }
    case STOP_ALL_SHOTS: {
      return state.map(shot => {
        shot.state = LoopState.Off;
        return shot;
      });
    }
    default:
      return state;
  }
}

export function selectState(rootState: RootState): ShotsState {
  return rootState.shots;
}

export function selectShotsByCategory(rootState: RootState, categoryId: string): Shot[] {
  return selectState(rootState).filter(shot => shot.categoryId === categoryId);
}

export function selectShotsByState(rootState: RootState, state: LoopStateEnum): Shot[] {
  return selectState(rootState).filter(shot => shot.state === state);
}

export function selectAllShotsLoaded(rootState: RootState): boolean {
  const shots = selectShotsByState(rootState, LoopState.Loading);
  return !shots.length;
}
