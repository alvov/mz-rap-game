import * as React from "react";
import {connect} from "react-redux";
import {selectState as selectCategories} from "../ducks/categories";
import {SoundCategory} from "./SoundCategory/SoundCategory";
import {NewsContainer} from "./News/NewsContainer";
import {Player} from "./Player/Player";
import {selectState as selectPlayback} from "../ducks/playback";
import {LOOP_DURATION_SEC} from "../consts";
import type {Category} from "../types";
import type {RootState} from "../ducks";
import {TitlePage} from "./TitlePage/TitlePage";
import {Share} from "./Share/Share";
import {
  selectHasRecord,
  selectRecordLink,
  selectRecordLinkIsLoading,
  selectIsPlayingRecord
} from "../ducks/record";
import {stopAllLoops} from "../ducks/loops";
import {clearRecord} from "../ducks/record";
import {stopAllShots} from "../ducks/shots";
import {stopAllNews} from "../ducks/news";
import {Loading} from "./Loading/Loading";
import * as analytic from "../analytics";

import * as styles from "./Dashboard.css";

type DashboardComponentStateProps = {|
  +categories: $Call<typeof selectCategories, RootState>,
  +playback: $Call<typeof selectPlayback, RootState>,
  +hasRecord: $Call<typeof selectHasRecord, RootState>,
  +recordLink: $Call<typeof selectRecordLink, RootState>,
  +recordLinkIsLoading: $Call<typeof selectRecordLinkIsLoading, RootState>,
  +isPlayingRecord: $Call<typeof selectIsPlayingRecord, RootState>
|}

type DashboardComponentDispatchProps = {|
  +stopAllLoops: typeof stopAllLoops,
  +stopAllShots: typeof stopAllShots,
  +stopAllNews: typeof stopAllNews,
  +clearRecord: typeof clearRecord
|}

type DashboardComponentProps = DashboardComponentStateProps & DashboardComponentDispatchProps

type DashboardComponentState = {|
  +playbackPercent: number,
  +isStart: boolean
|}

export class DashboardComponent extends React.Component<DashboardComponentProps, DashboardComponentState> {
  percentUpdateTimer: IntervalID | null;

  constructor(props: DashboardComponentProps) {
    super(props);

    this.percentUpdateTimer = null;
    this.state = {
      playbackPercent: 0,
      isStart: false
    };
  }

  startGame = () => {
    analytic.GAGameStart();
    this.props.stopAllLoops();
    this.props.stopAllShots();
    this.props.stopAllNews();
    this.props.clearRecord();
    this.setState(() => ({
      isStart: true
    }))
  };

  render() {
    const {categories, hasRecord, recordLink, recordLinkIsLoading} = this.props;
    const {isStart} = this.state;

    const defaultLink: string = `${location.origin}${location.pathname}`;
    let shareContainerRecordClass = "";

    if (!isStart) {
      return (
        <TitlePage startGame={this.startGame}/>
      )
    }

    if (recordLink) {
      shareContainerRecordClass = styles.shareContainerRecord;
    }

    return (
      <div className={styles.dashboard}>
        <div className={styles.loopsContainer}>
          {categories.map(category => this.renderSoundCategory(category))}
        </div>
        <div className={styles.playerContainer}>
          <Player/>
        </div>
        <div className={styles.newsContainer}>
          <NewsContainer/>
        </div>
        <div className={styles.separator}/>
        <div className={`${styles.shareContainer} ${shareContainerRecordClass}`}>
          {recordLinkIsLoading ? (
              <Loading />
            ) : (
              <Share
                link={recordLink || defaultLink}
                theme="inline"
                isRecordLink={!!recordLink}
              />
            )
          }
        </div>
      </div>
    );
  }

  renderSoundCategory(category: Category) {
    const {id, name, color} = category;
    const {playbackPercent} = this.state;
    return (
      <SoundCategory
        key={id}
        id={id}
        title={name}
        color={color}
        playbackPercent={playbackPercent}
      />
    );
  }

  componentDidUpdate(prevProps: DashboardComponentProps, prevState: DashboardComponentState) {
    if (prevProps.playback.timestamp !== this.props.playback.timestamp) {
      this.setPercent(0);
      if (this.percentUpdateTimer !== null) {
        clearInterval(this.percentUpdateTimer);
      }
      if (this.props.playback.timestamp !== null) {
        this.percentUpdateTimer = setInterval(() => {
          this.setPercent();
        }, 100);
      }
    }
    if (prevState.isStart !== this.state.isStart && this.state.isStart) {
      window.scrollTo(0, 0);
    }
  }

  componentWillUnmount() {
    if (this.percentUpdateTimer !== null) {
      clearInterval(this.percentUpdateTimer);
    }
  }

  setPercent(percent?: number) {
    if (percent !== undefined) {
      this.setState({
        playbackPercent: percent,
      });
    } else {
      const playbackPercent = Math.min((
        Date.now() - (this.props.playback.timestamp !== null ? this.props.playback.timestamp : 0))
        / 1000 / LOOP_DURATION_SEC,
        1,
      );
      this.setState({
        playbackPercent,
      });
    }
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    categories: selectCategories(state),
    playback: selectPlayback(state),
    hasRecord: selectHasRecord(state),
    recordLink: selectRecordLink(state),
    recordLinkIsLoading: selectRecordLinkIsLoading(state),
    isPlayingRecord: selectIsPlayingRecord(state)
  };
};

const mapDispatchToProps: DashboardComponentDispatchProps = {
  stopAllLoops,
  stopAllShots,
  stopAllNews,
  clearRecord
};

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
