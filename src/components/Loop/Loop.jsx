import * as React from "react";
import cn from "classnames";
import {Progress} from "../Progress/ProgressCircle";
import {LoopState} from "../../consts";
import type {LoopStateEnum} from "../../types";
import * as analytic from '../../analytics';

import * as styles from "./Loop.css";

type LoopProps = {|
  +name: string,
  +state: LoopStateEnum,
  +playbackPercent: number,
  +id: string,
  +onClick?: (string) => void
|}

export class Loop extends React.Component<LoopProps> {
  render() {
    const {name, state, playbackPercent, onClick} = this.props;
    return (
      <button
        className={cn(styles.loop, {
          [styles.loading]: state === LoopState.Loading,
          [styles.nextOn]: state === LoopState.NextOn,
          [styles.active]: state === LoopState.Active,
          [styles.nextOff]: state === LoopState.NextOff,
          [styles.clickable]: typeof onClick === "function",
        })}
        onClick={this.onClick}
      >
        <div className={styles.background}/>
        <div className={styles.indicator}/>
        <div className={styles.progress}>
          <Progress
            size="38%"
            strokeWidth={4}
            percent={state !== LoopState.Off ? playbackPercent : 0}
          />
        </div>
        <div className={styles.name}>
          {name}
        </div>
      </button>
    );
  }

  onClick = () => {
    analytic.GAInteractTrack(this.props.id);
    if (this.props.onClick) {
      this.props.onClick(this.props.id);
    }
  }
}
