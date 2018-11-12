import * as React from "react";
import cn from "classnames";
import {connect} from "react-redux";
import {
  getGeneratedRecord,
  selectGeneratedRecord,
  selectIsPlayingRecord,
  setIsPlayingRecord, setRecordFromGenerated,
} from "../../ducks/record";
import {selectState as selectNews} from '../../ducks/news';
import {selectState as selectShots} from '../../ducks/shots';
import type {RootState} from "../../ducks";
import type {GeneratedRecord} from '../../ducks/record';
import {Progress} from "../Progress/ProgressCircle";
import {getNewsDurationMs, getRecordFromUrl} from "../../utils/utils";
import {LOOP_DURATION_SEC} from "../../consts";

import * as styles from "./TitlePage.css";

type TitlePlayerStateProps = {|
  +record: GeneratedRecord | null,
  +isPlayingRecord: $Call<typeof selectIsPlayingRecord, RootState>,
  +news: $Call<typeof selectNews, RootState>,
  +shots: $Call<typeof selectShots, RootState>,
|}

type TitlePlayerDispatchProps = {|
  +getGeneratedRecord: typeof getGeneratedRecord,
  +setIsPlayingRecord: typeof setIsPlayingRecord,
  +setRecordFromGenerated: typeof setRecordFromGenerated,
|}

type TitlePlayerProps = TitlePlayerStateProps & TitlePlayerDispatchProps;

type TitlePlayerState = {|
  +playbackPercent: number,
|}

export class TitlePlayerComponents extends React.Component<TitlePlayerProps, TitlePlayerState> {
  percentUpdateTimer: IntervalID | null = null;
  startTimestamp: number | null = null;

  constructor(props: TitlePlayerProps) {
    super(props);

    this.state = {
      playbackPercent: 0,
    };
  }

  componentDidMount() {
    const recordParam = getRecordFromUrl();
    if (typeof recordParam !== 'string') return;
    this.props.getGeneratedRecord({guid: recordParam});
  }

  handleRecord = () => {
    if (this.props.isPlayingRecord) {
      this.props.setIsPlayingRecord(false);
    } else {
      this.props.setIsPlayingRecord(true);
    }
  };

  componentDidUpdate(prevProps: TitlePlayerProps) {
    if (prevProps.record !== this.props.record) {
      const { record } = this.props;
      if (!record) return null;

      this.props.setRecordFromGenerated();
    }

    if (prevProps.isPlayingRecord !== this.props.isPlayingRecord) {
      if (this.props.isPlayingRecord) {
        this.percentUpdateTimer = setInterval(() => {
          this.setPercent();
        }, 200);
        this.startTimestamp = Date.now();
      } else {
        if (this.percentUpdateTimer !== null) {
          clearInterval(this.percentUpdateTimer);
        }
        this.setPercent(0);
        this.startTimestamp = null;
      }
    }
  }

  componentWillUnmount() {
    if (this.percentUpdateTimer !== null) {
      clearInterval(this.percentUpdateTimer);
    }
  }

  shouldComponentUpdate(nextProps: TitlePlayerProps, nextState: TitlePlayerState) {
    return nextProps.record !== this.props.record ||
      nextProps.isPlayingRecord !== this.props.isPlayingRecord ||
      nextState.playbackPercent !== this.state.playbackPercent;
  }

  render() {
    const { record, isPlayingRecord } = this.props;
    if (!record) return null;
    const { playbackPercent } = this.state;
    return (
      <div
        onClick={this.handleRecord}
        className={cn(styles.progress, {
          [styles.isPlaying]: isPlayingRecord,
        })}
      >
        <Progress
          size="120px"
          strokeWidth={4}
          stroke="#e8615b"
          bgStroke="transparent"
          percent={playbackPercent}
        />
      </div>
    );
  }

  setPercent(percent?: number) {
    if (percent !== undefined) {
      this.setState({
        playbackPercent: percent,
      });
    } else {
      const playbackPercent = Math.min(
        (Date.now() - (this.startTimestamp !== null ? this.startTimestamp : 0)) / this.getApproximateDurationMs(),
        1,
      );
      this.setState({playbackPercent});
    }
  }

  getApproximateDurationMs() {
    const { record, news, shots } = this.props;
    if (!record) {
      return 0;
    }
    const { loops: recordLoops, shots: recordShots, loopsStartTimestamp } = record;
    const loopsCount = recordLoops.filter(recordLoop => recordLoop.length !== 0).length;
    const loopsDuration = loopsStartTimestamp + loopsCount * LOOP_DURATION_SEC * 1000;
    const lastShot = recordShots.reduce((maxStartShot, shot) => {
      if (shot.start > maxStartShot.start) {
        maxStartShot = shot;
      }
      return maxStartShot;
    });
    let shotsDuration = lastShot.start;
    if (lastShot) {
      const newsShot = news.find(({ id }) => lastShot.id === id);
      const shot = shots.find(({ id }) => lastShot.id === id);
      if (newsShot) {
        shotsDuration += getNewsDurationMs(newsShot.text);
      } else if (shot) {
        shotsDuration += shot.duration;
      }
    }
    return Math.max(loopsDuration, shotsDuration);
  }
}

const mapStateToProps = (state: RootState): TitlePlayerStateProps => ({
  record: selectGeneratedRecord(state),
  isPlayingRecord: selectIsPlayingRecord(state),
  news: selectNews(state),
  shots: selectShots(state),
});

const mapDispatchToProps: TitlePlayerDispatchProps = {
  getGeneratedRecord,
  setIsPlayingRecord,
  setRecordFromGenerated,
};

export const TitlePlayer = connect(mapStateToProps, mapDispatchToProps)(TitlePlayerComponents);
