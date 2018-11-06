import * as React from "react";
import { Progress } from "../Progress/ProgressCircle";

import * as styles from "./News.css";

type NewsProps = {|
    +id: string,
    +text: string,
    +progress: number,
    +onClick: (string) => void,
|}

export class News extends React.Component<NewsProps> {
    render() {
        const { text, progress } = this.props;
        return (
            <div
                className={styles.news}
                onClick={this.onClick}
            >
                <div className={styles.progress}>
                    <Progress
                        size="40px"
                        strokeWidth={4}
                        stroke="#e8615b"
                        bgStroke="transparent"
                        percent={progress}
                    />
                </div>
                {text}
            </div>
        );
    }

    onClick = (event: MouseEvent) => {
        const target = event.target;
        if (!(target instanceof window.HTMLAnchorElement)) {
            this.props.onClick(this.props.id);
        }
    }
}
