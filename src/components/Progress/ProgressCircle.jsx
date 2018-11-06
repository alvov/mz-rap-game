import * as React from "react";
import * as styles from "./Progress.css";

type ProgressProps = {|
    +percent: number,
    +size: string,
    +strokeWidth: number,
    +stroke?: string,
    +bgStroke?: string,
|}

const radius = 20;

export function Progress(props: ProgressProps) {
    const { size, strokeWidth, stroke = "#ffffff", bgStroke = stroke, percent } = props;
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const offset = circumference * (1 - percent);
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        >
            <circle
                stroke={bgStroke}
                strokeWidth={strokeWidth}
                fill="transparent"
                r={radius - strokeWidth / 2}
                cx={radius}
                cy={radius}
                opacity={0.3}
            />
            <circle
                className={styles.circle}
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={offset}
                fill="transparent"
                r={radius - strokeWidth / 2}
                cx={radius}
                cy={radius}
            />
        </svg>
    );
}
