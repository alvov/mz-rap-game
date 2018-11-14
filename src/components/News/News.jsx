import * as React from "react";
import cn from "classnames";
import {Progress} from "../Progress/ProgressCircle";
import {LoopState} from "../../consts";
import type {LoopStateEnum} from "../../types";

import * as styles from "./News.css";

type NewsProps = {|
  +id: string,
  +text: string,
  +state: LoopStateEnum,
  +duration: number,
  +onClick?: (string) => void,
|}

type NewsState = {|
  +playbackPercent: number,
|}

export class News extends React.Component<NewsProps, NewsState> {
  percentUpdateTimer: IntervalID | null = null;
  startTimestamp: number | null = null;

  constructor(props: NewsProps) {
    super(props);

    this.state = {
      playbackPercent: 0,
    };
  }

  componentDidUpdate(prevProps: NewsProps) {
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
    const {text, onClick} = this.props;
    const {playbackPercent} = this.state;
    return (
      <div
        className={cn(styles.news, {
          [styles.clickable]: typeof onClick === "function",
        })}
        onClick={this.onClick}
      >
        <div className={styles.progress}>
          <Progress
            size="40px"
            strokeWidth={4}
            stroke="#e8615b"
            bgStroke="transparent"
            percent={playbackPercent}
          />
        </div>
        {text}
      </div>
    );
  }

  onClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.id);
    }
  };

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
}
