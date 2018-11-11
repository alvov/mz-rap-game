import * as React from "react";
import {connect} from "react-redux";
import cn from "classnames";
import {
  selectIsRecording,
  setIsRecording,
  setIsPlayingRecord,
  setGenerateLink,
  selectIsPlayingRecord,
  selectHasRecord,
} from "../../ducks/record";
import {selectAllLoopsLoaded} from "../../ducks/loops";
import {selectAllShotsLoaded} from "../../ducks/shots";
import type {RootState} from "../../ducks";

import * as styles from "./Player.css";

type PlayerComponentStateProps = {|
  +allLoaded: boolean,
  +isRecording: $Call<typeof selectIsRecording, RootState>,
  +isPlayingRecord: $Call<typeof selectIsPlayingRecord, RootState>,
  +hasRecord: $Call<typeof selectHasRecord, RootState>
|}

type PlayerComponentDispatchProps = {|
  +setIsRecording: typeof setIsRecording,
  +setIsPlayingRecord: typeof setIsPlayingRecord,
  +setGenerateLink: typeof setGenerateLink
|}

type PlayerComponentProps = PlayerComponentStateProps & PlayerComponentDispatchProps;

export class PlayerComponent extends React.Component<PlayerComponentProps> {
  shouldComponentUpdate(prevProps: PlayerComponentProps) {
    return prevProps.allLoaded !== this.props.allLoaded ||
      prevProps.isRecording !== this.props.isRecording ||
      prevProps.isPlayingRecord !== this.props.isPlayingRecord;
  }

  render() {
    const {isRecording, isPlayingRecord, allLoaded, hasRecord} = this.props;
    return (
      <div className={styles.player}>
        <button
          className={cn(styles.button, styles.recButton, {
            [styles.active]: isRecording,
          })}
          disabled={isPlayingRecord || !allLoaded}
          onClick={this.onClickRecord}
        >
          <span className={styles.icon}/>
          Rec
        </button>
        <button
          className={cn(styles.button, styles.playButton, {
            [styles.active]: isPlayingRecord,
          })}
          disabled={!hasRecord || !allLoaded}
          onClick={this.onClickPlay}
        >
          <span className={styles.icon}/>
          Играть запись
        </button>
      </div>
    );
  }

  componentDidUpdate(prevProps: PlayerComponentProps) {
    if (prevProps.isRecording !== this.props.isRecording) {
      if (!this.props.isRecording) {
        this.props.setGenerateLink();
      }
    }
  }

  onClickRecord = () => {
    if (this.props.isRecording) {
      this.props.setIsRecording(false);
    } else {
      this.props.setIsRecording(true);
    }
  };

  onClickPlay = () => {
    if (this.props.isPlayingRecord) {
      this.props.setIsPlayingRecord(false);
    } else {
      this.props.setIsPlayingRecord(true);
    }
  };
}

const mapStateToProps = (state: RootState): PlayerComponentStateProps => ({
  allLoaded: selectAllLoopsLoaded(state) && selectAllShotsLoaded(state),
  isRecording: selectIsRecording(state),
  isPlayingRecord: selectIsPlayingRecord(state),
  hasRecord: selectHasRecord(state),
});

const mapDispatchToProps: PlayerComponentDispatchProps = {
  setIsRecording,
  setIsPlayingRecord,
  setGenerateLink
};

export const Player = connect(mapStateToProps, mapDispatchToProps)(PlayerComponent);
