import * as React from "react";
import { connect } from "react-redux";
import {
  getGeneratedRecord,
  selectGeneratedRecord,
  addLoops,
  addNews,
  selectIsPlayingRecord,
  setIsPlayingRecord,
  selectRecordLoops,
  selectRecordNews
} from "../../ducks/record";
import { stopAllLoops, setLoopState } from "../../ducks/loops";
import type { RootState } from "../../ducks";
import type { GeneratedRecord } from '../../ducks/record'

import * as styles from "./TitlePage.css";
import {Progress} from "../Progress/ProgressCircle";
import {getRecordFromUrl} from "../Player/utils";
import {LoopState} from "../../consts";
import {Reader} from "../../reader/Reader";
import {selectState as selectNews} from "../../ducks/news";

type TitlePlayerStateProps = {|
  +news: $Call<typeof selectNews, RootState>,
  +record: GeneratedRecord,
  +isPlayingRecord: $Call<typeof selectIsPlayingRecord, RootState>,
  +recordLoops: $Call<typeof selectRecordLoops, RootState>,
  +recordNews: $Call<typeof selectRecordNews, RootState>,
|}

type TitlePlayerDispatchProps = {|
  +getGeneratedRecord: typeof getGeneratedRecord,
  +addLoops: typeof addLoops,
  +addNews: typeof addNews,
  +stopAllLoops: typeof stopAllLoops,
  +setIsPlayingRecord: typeof setIsPlayingRecord,
  +setLoopState: typeof setLoopState
|}

type NewsContainerComponentState = {|
  +currentNews: {
    id: string,
    progress: number,
  } | null
|}

type TitlePlayerProps = TitlePlayerStateProps & TitlePlayerDispatchProps;

export class TitlePlayerComponents extends React.Component<TitlePlayerProps, NewsContainerComponentState> {
  readTimeoutsQueue: TimeoutID[];
  newsReader: Reader;
  constructor(props: TitlePlayerProps) {
    super(props);

    this.state = {
      currentNews: null,
    };

    this.readTimeoutsQueue = [];

    this.newsReader = new Reader({
      onReady: () => undefined,
      onProgress: this.onProgress,
      onEnd: this.onEnd,
    });
  }

  onProgress = (id: string, progress: number) => {
    this.setState({
      currentNews: {
        id,
        progress,
      },
    });
  };

  onEnd = () => {
    this.setState({
      currentNews: null,
    });
  };

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

  componentDidUpdate(prevProps: TitlePlayerProps) {
    if (prevProps.isPlayingRecord !== this.props.isPlayingRecord) {
      if (this.props.isPlayingRecord) {
        this.readTimeoutsQueue = this.props.recordNews.reduce((timeouts, recordNews) => {
          const news = this.props.news.find(({ id }) => recordNews.id === id);
          if (news) {
            timeouts.push(setTimeout(() => {
              this.newsReader.read(news.text, news.id);
            }, recordNews.timestamp));
          }
          return timeouts;
        }, []);
      } else {
        this.newsReader.stop();
        for (const timeout of this.readTimeoutsQueue) {
          clearTimeout(timeout);
        }
        this.readTimeoutsQueue = [];
      }
    }
  }

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
    const { record } = this.props;
    if(!record.loops.length && !record.shots.length) return null;
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
          percent={0}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): TitlePlayerStateProps => ({
  record: selectGeneratedRecord(state),
  isPlayingRecord: selectIsPlayingRecord(state),
  recordLoops: selectRecordLoops(state),
  recordNews: selectRecordNews(state),
  news: selectNews(state),
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
