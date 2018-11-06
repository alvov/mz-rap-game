import * as React from "react";
import { connect } from "react-redux";
import cn from "classnames";
import {
    selectIsRecording,
    setIsRecording,
    selectStartTimestamp,
    setIsPlayingRecord,
    setGenerateLink,
    selectIsPlayingRecord,
    selectRecordLoops,
    selectRecordNews,
    selectHasRecord,
} from "../../ducks/record";
import { generateShareHash } from "./utils";
import { selectAllLoaded, setLoopState, stopAllLoops } from "../../ducks/loops";
import { selectState as selectPlayback } from "../../ducks/playback";
import { LoopState } from "../../consts";
import type { RootState } from "../../ducks";
import type { RecordNews, RecordLoops } from "../../ducks/record";

import * as styles from "./Player.css";

type PlayerComponentStateProps = {|
    +allLoaded: $Call<typeof selectAllLoaded, RootState>,
    +isRecording: $Call<typeof selectIsRecording, RootState>,
    +isPlayingRecord: $Call<typeof selectIsPlayingRecord, RootState>,
    +startTimestamp: $Call<typeof selectStartTimestamp, RootState>,
    +recordLoops: $Call<typeof selectRecordLoops, RootState>,
    +recordNews: $Call<typeof selectRecordNews, RootState>,
    +playback: $Call<typeof selectPlayback, RootState>,
    +hasRecord: $Call<typeof selectHasRecord, RootState>
|}

type PlayerComponentDispatchProps = {|
    +setIsRecording: typeof setIsRecording,
    +setIsPlayingRecord: typeof setIsPlayingRecord,
    +stopAllLoops: typeof stopAllLoops,
    +setLoopState: typeof setLoopState,
    +setGenerateLink: typeof setGenerateLink
|}

type PlayerComponentProps = PlayerComponentStateProps & PlayerComponentDispatchProps;

type PlayerComponentState = {|
    shareLink: string,
|}


export class PlayerComponent extends React.Component<PlayerComponentProps, PlayerComponentState> {
    constructor(props: PlayerComponentProps) {
        super(props);

        this.state = {
            shareLink: this.generateLink(),
        };
    }

    shouldComponentUpdate(prevProps: PlayerComponentProps) {
        return prevProps.allLoaded !== this.props.allLoaded ||
            prevProps.isRecording !== this.props.isRecording ||
            prevProps.recordLoops !== this.props.recordLoops ||
            prevProps.isPlayingRecord !== this.props.isPlayingRecord ||
            prevProps.playback !== this.props.playback;
    }

    render() {
        const { isRecording, isPlayingRecord, allLoaded, hasRecord } = this.props;
        return (
            <div className={styles.player}>
                <button
                    className={cn(styles.button, styles.recButton, {
                        [styles.active]: isRecording,
                    })}
                    disabled={isPlayingRecord || !allLoaded}
                    onClick={this.onClickRecord}
                >
                    <span className={styles.icon} />
                    Rec
                </button>
                <button
                    className={cn(styles.button, styles.playButton, {
                        [styles.active]: isPlayingRecord,
                    })}
                    disabled={!hasRecord || !allLoaded}
                    onClick={this.onClickPlay}
                >
                    <span className={styles.icon} />
                    Играть запись
                </button>
            </div>
        );
    }

    componentDidUpdate(prevProps: PlayerComponentProps) {
        const { allLoaded, isPlayingRecord, playback, recordLoops } = this.props;

        // auto play on load
        if (
            prevProps.allLoaded !== allLoaded &&
            allLoaded &&
            recordLoops.length !== 0
        ) {
            this.onClickPlay();
        }

        if (isPlayingRecord) {
            if (
                prevProps.playback.cursor !== playback.cursor &&
                playback.cursor !== null
            ) {
                this.setNextLoops(playback.cursor + 1);
            }
        }
    }

    onClickRecord = () => {
        if (this.props.isRecording) {
            this.props.setIsRecording(false);

            const loops: Array<RecordLoops> = this.props.recordLoops;
            const news: Array<RecordNews> = this.props.recordNews;

            if(!loops instanceof Array) return;

            this.props.setGenerateLink({loops, news});
            this.setState({
                shareLink: this.generateLink(),
            });
        } else {
            this.props.setIsRecording(true);
        }
    };

    onClickPlay = () => {
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

    generateLink() {
        const { recordLoops: loops, recordNews: news, startTimestamp } = this.props;
        if (loops.length || news.length) {
            const urlHash = encodeURIComponent(generateShareHash({
                loops,
                news,
                startTimestamp,
            }));
            return `${location.origin}${location.pathname}?r=${urlHash}`;
        } else {
            return "";
        }
    }
}

const mapStateToProps = (state: RootState): PlayerComponentStateProps => ({
    allLoaded: selectAllLoaded(state),
    isRecording: selectIsRecording(state),
    isPlayingRecord: selectIsPlayingRecord(state),
    startTimestamp: selectStartTimestamp(state),
    recordLoops: selectRecordLoops(state),
    recordNews: selectRecordNews(state),
    playback: selectPlayback(state),
    hasRecord: selectHasRecord(state),
});

const mapDispatchToProps: PlayerComponentDispatchProps = {
    setIsRecording,
    setIsPlayingRecord,
    stopAllLoops,
    setLoopState,
    setGenerateLink
};

export const Player = connect(mapStateToProps, mapDispatchToProps)(PlayerComponent);
