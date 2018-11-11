import * as React from "react";
import cn from "classnames";
import type {LoopStateEnum} from "../../types";
import {LoopState} from "../../consts";
import {Progress} from "../Progress/ProgressBar";
import * as analytic from "../../analytics";
import * as styles from "./Loop.css";

type ShotProps = {|
  +id: string,
  +state: LoopStateEnum,
  +name: string,
  +duration: number,
  +onClick?: (string) => void
|}

type ShotState = {|
  +playbackPercent: number,
|}

export class Shot extends React.Component<ShotProps, ShotState> {
  percentUpdateTimer: IntervalID | null;
  startTimestamp: number | null;

  constructor(props: ShotProps) {
    super(props);

    this.percentUpdateTimer = null;
    this.startTimestamp = null;
    this.state = {
      playbackPercent: 0,
    };
  }

  componentDidUpdate(prevProps: ShotProps) {
    if (prevProps.state !== this.props.state) {
      if (this.props.state === LoopState.Active) {
        this.percentUpdateTimer = setInterval(() => {
          this.setPercent();
        }, 100);
        this.startTimestamp = Date.now();
      } else if (this.props.state === LoopState.Off) {
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

  render() {
    const {name, state, onClick} = this.props;
    const {playbackPercent} = this.state;
    return (
      <button
        className={cn(styles.loop, styles.shot, {
          [styles.loading]: state === LoopState.Loading,
          [styles.active]: state === LoopState.Active,
          [styles.clickable]: typeof onClick === "function",
        })}
        onClick={this.onClick}
      >
        <div className={styles.background}/>
        <div className={styles.progress}>
          <Progress percent={playbackPercent}/>
        </div>
        <div className={styles.name}>
          {name}
        </div>
      </button>
    );
  }

  setPercent(percent?: number) {
    if (percent !== undefined) {
      this.setState({
        playbackPercent: percent,
      });
    } else {
      const playbackPercent = Math.min(
        (Date.now() - (this.startTimestamp !== null ? this.startTimestamp : 0)) / this.props.duration / 1000,
        1,
      );
      this.setState({playbackPercent});
    }
  }

  onClick = () => {
    analytic.GAInteractTrack(this.props.id);
    if (this.props.onClick) {
      this.props.onClick(this.props.id);
    }
  }
}
