import * as React from "react";
import {connect} from "react-redux";
import {Howl, Howler} from "howler";
import {
  selectState as selectLoops,
  setLoops,
  setLoopState, stopAllLoops,
} from "../../ducks/loops";
import {
  selectState as selectShots,
  setShotDuration,
  setShotState, stopAllShots,
} from "../../ducks/shots";
import {
  selectState as selectNews,
  setNewsDuration,
  setNewsState, stopAllNews,
} from "../../ducks/news";
import {
  addLoops as addLoopsToRecord,
  addShot as addShotToRecord,
  selectIsPlayingRecord,
  selectIsRecording,
  selectLoopsStartTimestamp,
  selectRecordLoops,
  selectRecordShots,
  setIsPlayingRecord,
  setIsRecording,
} from "../../ducks/record";
import {selectState as selectPlayback, setCursor} from "../../ducks/playback";
import {mp3, ogg} from "../../../assets";
// import {Reader} from "../../reader/Reader";
import {LOOP_DURATION_SEC, LoopState, VOLUME} from "../../consts";
import type {RootState} from "../../ducks";
// import {getNewsDurationMs} from "../../utils/utils";

const checkLoopEndTimeMs = 40;
const scheduleAheadTimeSec = 0.01;

type SoundManagerComponentStateProps = {|
  +loops: $Call<typeof selectLoops, RootState>,
  +shots: $Call<typeof selectShots, RootState>,
  +news: $Call<typeof selectNews, RootState>,
  +isRecording: $Call<typeof selectIsRecording, RootState>,
  +isPlayingRecord: $Call<typeof selectIsPlayingRecord, RootState>,
  +recordLoops: $Call<typeof selectRecordLoops, RootState>,
  +recordShots: $Call<typeof selectRecordShots, RootState>,
  +loopsStartTimestamp: $Call<typeof selectLoopsStartTimestamp, RootState>,
  +playback: $Call<typeof selectPlayback, RootState>,
|}

type SoundManagerComponentDispatchProps = {|
  +setLoops: typeof setLoops,
  +setLoopState: typeof setLoopState,
  +setShotState: typeof setShotState,
  +setShotDuration: typeof setShotDuration,
  +setNewsDuration: typeof setNewsDuration,
  +setNewsState: typeof setNewsState,
  +setCursor: typeof setCursor,
  +addLoopsToRecord: typeof addLoopsToRecord,
  +addShotToRecord: typeof addShotToRecord,
  +setIsRecording: typeof setIsRecording,
  +setIsPlayingRecord: typeof setIsPlayingRecord,
  +stopAllLoops: typeof stopAllLoops,
  +stopAllShots: typeof stopAllShots,
  +stopAllNews: typeof stopAllNews,
|}

type SoundManagerComponentProps = SoundManagerComponentStateProps & SoundManagerComponentDispatchProps;

export class SoundManagerComponent extends React.Component<SoundManagerComponentProps> {
  ctxCurrentTime: number | null = null;
  areLoopsPlaying: boolean = false;
  +howls: { [string]: Class<Howl> } = {};
  // newsReader: Reader;
  checkInterval: IntervalID | void;
  recordLoopsPlaybackTimeout: TimeoutID | null = null;
  recordShotsTimeoutsQueue: TimeoutID[] = [];

  constructor(props: SoundManagerComponentProps) {
    super(props);

    for (const loop of this.props.loops) {
      this.howls[loop.id] = new Howl({
        src: [ogg[loop.src], mp3[loop.src]],
        preload: true,
        volume: VOLUME,
        onload: () => {
          this.props.setLoopState([{id: loop.id, state: LoopState.Off}]);
        },
      });
    }

    for (const shot of this.props.shots) {
      this.howls[shot.id] = new Howl({
        src: [ogg[shot.src], mp3[shot.src]],
        preload: true,
        volume: shot.volume === undefined ? VOLUME : shot.volume,
        onload: () => {
          this.props.setShotState({id: shot.id, state: LoopState.Off});
          this.props.setShotDuration({id: shot.id, duration: this.howls[shot.id].duration()});
        },
        onend: () => {
          this.props.setShotState({id: shot.id, state: LoopState.Off});
        }
      });
    }

    // this.newsReader = new Reader({
    //   onReady: (voices) => undefined,
    //   onEnd: this.onNewsEnd,
    // });
    // for (const news of this.props.news) {
    //   const duration = getNewsDurationMs(news.text);
    //   this.props.setNewsDuration({ id: news.id, duration });
    // }
  }

  shouldComponentUpdate(nextProps: SoundManagerComponentProps) {
    return nextProps.loops !== this.props.loops ||
      nextProps.shots !== this.props.shots ||
      // nextProps.news !== this.props.news ||
      nextProps.isPlayingRecord !== this.props.isPlayingRecord ||
      nextProps.playback.cursor !== this.props.playback.cursor;
  }

  componentWillUnmount() {
    this.stopAll();
    for (const loopId of Object.keys(this.howls)) {
      this.howls[loopId].unload();
    }
  }

  render() {
    return null;
  }

  componentDidUpdate(prevProps: SoundManagerComponentProps) {
    if (this.props.loops !== prevProps.loops) {
      if (this.areLoopsPlaying) {
        const hasActiveLoops = this.props.loops.some(loop =>
          loop.state === LoopState.Active ||
          loop.state === LoopState.NextOn ||
          loop.state === LoopState.NextOff
        );
        if (!hasActiveLoops) {
          this.stopLoops();

          // stop recording when all loops were switched off
          this.props.setIsRecording(false);

          // stop playback when all loops have stopped
          this.props.setIsPlayingRecord(false);
        }
      } else {
        const hasActiveLoops = this.props.loops.some(loop => loop.state === LoopState.NextOn);
        if (hasActiveLoops) {
          this.play();
        }
      }
    }

    if (this.props.shots !== prevProps.shots) {
      for (let i = 0; i < this.props.shots.length; i++) {
        const shot = this.props.shots[i];
        const howl = this.howls[shot.id];
        if (shot.state === LoopState.Active && shot.cache !== prevProps.shots[i].cache) {
          if (howl.playing()) {
            howl.stop();
          }
          howl.play();

          if (this.props.isRecording) {
            this.props.addShotToRecord({ id: shot.id, start: Date.now() });
          }
        } else if (shot.state === LoopState.Off && howl.playing()) {
          howl.stop();
        }
      }
    }

    // if (this.props.news !== prevProps.news) {
    //   const activeNews = this.props.news.find(news => news.state === LoopState.Active);
    //   if (activeNews) {
    //     this.newsReader.read(activeNews.id, activeNews.text);
    //
    //     if (this.props.isRecording) {
    //       this.props.addShotToRecord({id: activeNews.id, start: Date.now()});
    //     }
    //   }
    // }

    if (this.props.isPlayingRecord !== prevProps.isPlayingRecord) {

      this.stopAll();

      if (this.props.isPlayingRecord) {
        if (this.props.loopsStartTimestamp === null) {
          this.setNextRecordLoops(0);
        } else {
          this.recordLoopsPlaybackTimeout = setTimeout(() => {
            this.setNextRecordLoops(0);
          }, this.props.loopsStartTimestamp);
        }

        this.recordShotsTimeoutsQueue = this.props.recordShots.reduce((timeouts, recordShot) => {
          const isShot = this.props.shots.some(({id}) => recordShot.id === id);
          const isNews = this.props.news.some(({id}) => recordShot.id === id);
          if (isShot || isNews) {
            // Hotfix for the case when recordShot.start === -1
            const recordShotStart = Math.max(recordShot.start, 0);
            timeouts.push(setTimeout(() => {
              const payload = {
                id: recordShot.id,
                state: LoopState.Active,
              };
              if (isShot) {
                this.props.setShotState(payload);
              } else {
                this.props.setNewsState(payload);
              }
            }, recordShotStart));
          }
          return timeouts;
        }, []);
      }
    } else if (this.props.isPlayingRecord) {
      if (
        prevProps.playback.cursor !== this.props.playback.cursor &&
        this.props.playback.cursor !== null
      ) {
        this.setNextRecordLoops(this.props.playback.cursor + 1);
      }
    }
  }

  play() {
    if (this.areLoopsPlaying) {
      return;
    }
    this.areLoopsPlaying = true;
    this.ctxCurrentTime = this.getCurrentTime();
    this.checkInterval = setInterval(this.checkLoopEnd, checkLoopEndTimeMs);
    this.playNextLoops();
  }

  stopAll() {
    if (this.recordLoopsPlaybackTimeout !== null) {
      clearTimeout(this.recordLoopsPlaybackTimeout);
    }
    for (const timeout of this.recordShotsTimeoutsQueue) {
      clearTimeout(timeout);
    }
    this.recordShotsTimeoutsQueue = [];

    for (const loopId of Object.keys(this.howls)) {
      this.howls[loopId].stop();
    }

    this.props.stopAllLoops();
    this.props.stopAllShots();
    this.props.stopAllNews();
  }

  stopLoops() {
    if (!this.areLoopsPlaying) {
      return;
    }
    clearInterval(this.checkInterval);
    for (const loop of this.props.loops) {
      if (this.howls[loop.id]) {
        this.howls[loop.id].stop();
      }
    }
    this.props.setCursor(null);
    this.areLoopsPlaying = false;
  }

  playNextLoops() {
    const {loops, isRecording, playback} = this.props;
    const loopsForPlay = [];
    const loopsForRecord = [];
    const newLoopStates = [];
    for (const loop of loops) {
      // loops which must play next
      if (loop.state === LoopState.Active || loop.state === LoopState.NextOn) {
        loopsForPlay.push(loop.id);
        if (loop.state === LoopState.NextOn) {
          newLoopStates.push({id: loop.id, state: LoopState.Active});
        }
        loopsForRecord.push(loop.id);
        // loops which must stop now
      } else if (loop.state === LoopState.NextOff) {
        newLoopStates.push({id: loop.id, state: LoopState.Off});
      }
    }

    this.ctxCurrentTime = this.getCurrentTime();

    for (const loopId of loopsForPlay) {
      this.howls[loopId].play();
    }

    if (isRecording) {
      this.props.addLoopsToRecord(loopsForRecord);
    }

    if (newLoopStates.length) {
      this.props.setLoopState(newLoopStates);
    }

    // cursor may have already updated because of the previous call to `setLoopState`
    if (this.areLoopsPlaying) {
      const newCursor = playback.cursor !== null ?
        playback.cursor + 1 :
        0;
      if (newCursor === Number.MAX_SAFE_INTEGER) {
        this.stopLoops();
      } else {
        this.props.setCursor(newCursor);
      }
    }
  }

  setNextRecordLoops(cursor: number) {
    const {recordLoops} = this.props;
    const newLoopStates = [];
    // schedule stop
    if (recordLoops[cursor - 1]) {
      for (const prevLoopId of recordLoops[cursor - 1]) {
        if (!recordLoops[cursor] || !recordLoops[cursor].includes(prevLoopId)) {
          newLoopStates.push({id: prevLoopId, state: LoopState.NextOff});
        }
      }
    }
    // schedule play
    if (recordLoops[cursor]) {
      for (const loopId of recordLoops[cursor]) {
        if (!recordLoops[cursor - 1] || !recordLoops[cursor - 1].includes(loopId)) {
          newLoopStates.push({id: loopId, state: LoopState.NextOn});
        }
      }
    }
    this.props.setLoopState(newLoopStates);
  }

  getCurrentTime() {
    return Howler.ctx ? Howler.ctx.currentTime : Date.now() / 1000;
  }

  checkLoopEnd = () => {
    if (this.ctxCurrentTime + LOOP_DURATION_SEC < this.getCurrentTime() + scheduleAheadTimeSec) {
      this.playNextLoops();
    }
  };

  // onNewsEnd = (id: string | null) => {
  //   if (id !== null) {
  //     this.props.setNewsState({id, state: LoopState.Off});
  //   }
  // };
}

const mapStateToProps = (state: RootState): SoundManagerComponentStateProps => {
  return {
    loops: selectLoops(state),
    shots: selectShots(state),
    news: selectNews(state),
    isRecording: selectIsRecording(state),
    isPlayingRecord: selectIsPlayingRecord(state),
    recordLoops: selectRecordLoops(state),
    recordShots: selectRecordShots(state),
    loopsStartTimestamp: selectLoopsStartTimestamp(state),
    playback: selectPlayback(state),
  };
};

const mapDispatchToProps: SoundManagerComponentDispatchProps = {
  setLoops,
  setLoopState,
  setShotState,
  setShotDuration,
  setNewsDuration,
  setNewsState,
  setCursor,
  addLoopsToRecord,
  addShotToRecord,
  setIsRecording,
  setIsPlayingRecord,
  stopAllLoops,
  stopAllShots,
  stopAllNews,
};

export const SoundManager = connect(mapStateToProps, mapDispatchToProps)(SoundManagerComponent);
