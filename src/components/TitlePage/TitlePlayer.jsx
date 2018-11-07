import * as React from "react";
import { connect } from "react-redux";
import {
  getGeneratedRecord,
  selectGeneratedRecord,
  addLoops,
  addNews,
  selectIsPlayingRecord,
  setIsPlayingRecord,
  selectRecordLoops
} from "../../ducks/record";
import { stopAllLoops, setLoopState } from "../../ducks/loops";
import type { RootState } from "../../ducks";
import type { GeneratedRecord } from '../../ducks/record'

import * as styles from "./TitlePage.css";
import {Progress} from "../Progress/ProgressCircle";
import {getRecordFromUrl} from "../Player/utils";
import {LoopState} from "../../consts";

type TitlePlayerStateProps = {|
  +record: GeneratedRecord,
  +isPlayingRecord: $Call<typeof selectIsPlayingRecord, RootState>,
  +recordLoops: $Call<typeof selectRecordLoops, RootState>,
|}

type TitlePlayerDispatchProps = {|
  +getGeneratedRecord: typeof getGeneratedRecord,
  +addLoops: typeof addLoops,
  +addNews: typeof addNews,
  +stopAllLoops: typeof stopAllLoops,
  +setIsPlayingRecord: typeof setIsPlayingRecord,
  +setLoopState: typeof setLoopState
|}

type TitlePlayerProps = TitlePlayerStateProps & TitlePlayerDispatchProps;

export class TitlePlayerComponents extends React.Component<TitlePlayerProps> {
  componentDidMount() {
    const recordParam: ?string = getRecordFromUrl();
    if(typeof recordParam !== 'string') return;
    this.props.getGeneratedRecord({guid: recordParam});
  }

  componentWillReceiveProps(nextProps: TitlePlayerProps) {
    if(nextProps.record !== this.props.record) {
      const { record } = nextProps;
      if(!record) return null;
      record.loops.forEach(recordedLoops => {
        this.props.addLoops(recordedLoops)
      });
      record.shots.forEach(recordedNews => {
        this.props.addNews(recordedNews)
      });
    }
  }

  handleRecord = () => {
    this.props.stopAllLoops();
    if (this.props.isPlayingRecord) {
      this.props.setIsPlayingRecord(false);
    } else {
      this.props.setIsPlayingRecord(true);
      this.setNextLoops(0);
    }
  };

  setNextLoops(cursor: number) {
    const { recordLoops } = this.props;
    const newLoopStates = [];
    // schedule stop
    if (recordLoops[cursor - 1]) {
      for (const prevLoopId of recordLoops[cursor - 1]) {
        if (!recordLoops[cursor] || !recordLoops[cursor].includes(prevLoopId)) {
          newLoopStates.push({ id: prevLoopId, state: LoopState.NextOff });
        }
      }
    }
    // schedule play
    if (recordLoops[cursor]) {
      for (const loopId of recordLoops[cursor]) {
        if (!recordLoops[cursor - 1] || !recordLoops[cursor - 1].includes(loopId)) {
          newLoopStates.push({ id: loopId, state: LoopState.NextOn });
        }
      }
    }
    this.props.setLoopState(newLoopStates);
  }

  render() {
    if(!this.props.record) return null;
    return (
      <div
        onClick={this.handleRecord}
        className={styles.progress}
      >
        <Progress
          size="120px"
          strokeWidth={2}
          stroke="#e8615b"
          bgStroke="transparent"
          percent={0.5}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): TitlePlayerStateProps => ({
  record: selectGeneratedRecord(state),
  isPlayingRecord: selectIsPlayingRecord(state),
  recordLoops: selectRecordLoops(state)
});

const mapDispatchToProps: TitlePlayerDispatchProps = {
  getGeneratedRecord,
  addLoops,
  addNews,
  stopAllLoops,
  setIsPlayingRecord,
  setLoopState
};

export const TitlePlayer = connect(mapStateToProps, mapDispatchToProps)(TitlePlayerComponents);
