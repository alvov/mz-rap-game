import * as React from "react";
import {connect} from "react-redux";
import {Loop} from "../Loop/Loop";
import {Shot} from "../Loop/Shot";
import {selectLoopsByCategory, setLoopState} from "../../ducks/loops";
import type {RootState} from "../../ducks";
import {selectShotsByCategory, setShotState} from "../../ducks/shots";
import {LoopState} from "../../consts";

import * as styles from "./SoundCategory.css";
import {selectIsPlayingRecord} from "../../ducks/record";

type SoundCategoryComponentStateProps = {|
  +loops: $Call<typeof selectLoopsByCategory, RootState, string>,
  +shots: $Call<typeof selectShotsByCategory, RootState, string>,
  +isPlayingRecord: $Call<typeof selectIsPlayingRecord, RootState>,
|}

type SoundCategoryComponentDispatchProps = {|
  +setLoopState: typeof setLoopState,
  +setShotState: typeof setShotState,
|}

type SoundCategoryComponentOwnProps = {|
  +id: string,
  +title: string,
  +color: string,
  +playbackPercent: number,
|}

type SoundCategoryComponentProps = SoundCategoryComponentStateProps &
  SoundCategoryComponentDispatchProps &
  SoundCategoryComponentOwnProps;

export class SoundCategoryComponent extends React.Component<SoundCategoryComponentProps> {
  render() {
    const {title, color, loops, shots, playbackPercent, isPlayingRecord} = this.props;
    return (
      <div className={styles.category} style={{color}}>
        <div className={styles.list}>
          {loops.map((loop, index) =>
            <Loop
              key={loop.id}
              id={loop.id}
              name={`${title} ${index + 1}`}
              state={loop.state}
              playbackPercent={playbackPercent}
              onClick={isPlayingRecord ? undefined : this.onClickLoop}
            />
          )}
          {shots.map((shot, index) =>
            <Shot
              key={shot.id}
              id={shot.id}
              name={`${title} ${index + 1}`}
              state={shot.state}
              duration={shot.duration}
              onClick={isPlayingRecord ? undefined : this.onClickShot}
            />
          )}
        </div>
      </div>
    );
  }

  onClickLoop = (loopId: string) => {
    const loop = this.props.loops.find(({id}) => id === loopId);
    if (loop === undefined) {
      return;
    }
    const groupId = loop.groupId;
    const currentLoop = this.props.loops.find(loop =>
      loop.groupId === groupId && (
        loop.state === LoopState.Active ||
        loop.state === LoopState.NextOn
      )
    );
    // switch off current loop from the same group
    let switchOffLoop = [];
    if (currentLoop && currentLoop !== loop) {
      let currentLoopNextState;
      if (currentLoop.state === LoopState.Active) {
        currentLoopNextState = LoopState.NextOff;
      } else {
        currentLoopNextState = LoopState.Off;
      }
      switchOffLoop.push({id: currentLoop.id, state: currentLoopNextState});
    }
    let newState = LoopState.Off;
    if (loop.state === LoopState.Off) {
      newState = LoopState.NextOn;
    } else if (loop.state === LoopState.NextOn) {
      newState = LoopState.Off;
    } else if (loop.state === LoopState.NextOff) {
      newState = LoopState.Active;
    } else if (loop.state === LoopState.Active) {
      newState = LoopState.NextOff;
    }
    this.props.setLoopState([
      ...switchOffLoop,
      {id: loopId, state: newState},
    ]);
  };

  onClickShot = (shotId: string) => {
    const shot = this.props.shots.find(({id}) => id === shotId);
    if (shot === undefined) {
      return;
    }
    let newState = shot.state;
    if (shot.state === LoopState.Off) {
      newState = LoopState.Active;
    } else if (shot.state === LoopState.Active) {
      newState = LoopState.Off;
    }
    this.props.setShotState({
      id: shotId,
      state: newState,
    })
  };
}

const mapStateToProps = (state: RootState, ownProps: SoundCategoryComponentOwnProps): SoundCategoryComponentStateProps => {
  return {
    loops: selectLoopsByCategory(state, ownProps.id),
    shots: selectShotsByCategory(state, ownProps.id),
    isPlayingRecord: selectIsPlayingRecord(state),
  };
};

const mapDispatchToProps: SoundCategoryComponentDispatchProps = {
  setLoopState,
  setShotState,
};

export const SoundCategory = connect(mapStateToProps, mapDispatchToProps)(SoundCategoryComponent);
